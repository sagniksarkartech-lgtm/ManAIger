import sys
import os
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_price_forecasting_stage():
    from app.database.session import init_db, SessionLocal
    from app.services.market_data_service import fetch_and_store_ticker_ohlcv, get_stored_ohlcv
    from app.services.forecast_service import generate_price_forecast
    import pandas as pd

    logger.info("1. Initializing database tables...")
    init_db()
    db = SessionLocal()

    ticker = "RELIANCE.NS"
    try:
        logger.info(f"2. Fetching & storing 1-year price history for {ticker}...")
        fetch_and_store_ticker_ohlcv(db, ticker, period="1y", interval="1d")

        bars = get_stored_ohlcv(db, ticker, limit=1000)
        logger.info(f"   Retrieved {len(bars)} bars.")

        df = pd.DataFrame([{
            "timestamp": b.timestamp,
            "open": b.open,
            "high": b.high,
            "low": b.low,
            "close": b.close,
            "volume": b.volume
        } for b in bars])

        logger.info("3. Generating 30-day probabilistic price forecast with confidence intervals...")
        res = generate_price_forecast(df, forecast_days=30, validation_days=90)

        acc = res['model_accuracy']
        logger.info("4. Model Historical Backtest Accuracy (on past 90-day test window):")
        logger.info(f"   MAPE (Mean Absolute % Error): {acc['mape_pct']:.2f}%")
        logger.info(f"   MAE (Mean Absolute Error): ₹{acc['mae']:.2f}")
        logger.info(f"   Directional Trend Accuracy: {acc['directional_accuracy_pct']:.2f}%")

        logger.info("5. 30-Day Forecast Range Projections:")
        logger.info(f"   Current Price: ₹{res['current_price']:.2f}")
        day_30 = res['forecast'][-1]
        logger.info(f"   Day 30 Median Target: ₹{day_30['expected_price']:.2f}")
        logger.info(f"   Day 30 80% Confidence Range: ₹{day_30['lower_bound_80']:.2f} to ₹{day_30['upper_bound_80']:.2f}")
        logger.info(f"   Day 30 95% Confidence Range: ₹{day_30['lower_bound_95']:.2f} to ₹{day_30['upper_bound_95']:.2f}")

        # Assertions
        assert day_30['lower_bound_95'] <= day_30['lower_bound_80'] <= day_30['expected_price'] <= day_30['upper_bound_80'] <= day_30['upper_bound_95'], "Confidence bound hierarchy error!"
        assert len(res['forecast']) == 30, "Forecast length mismatch!"

        logger.info("STAGE 6 FORECASTING MODULE PASSED ALL VERIFICATIONS!")

    finally:
        db.close()

if __name__ == "__main__":
    test_price_forecasting_stage()
