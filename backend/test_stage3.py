import sys
import os
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_technical_indicators_stage():
    from app.database.session import init_db, SessionLocal
    from app.services.market_data_service import fetch_and_store_ticker_ohlcv, get_stored_ohlcv
    from app.services.indicator_service import compute_all_indicators_df, generate_signal_summary
    import pandas as pd

    logger.info("1. Initializing database tables...")
    init_db()
    db = SessionLocal()

    ticker = "RELIANCE.NS"
    try:
        logger.info(f"2. Fetching & storing historical price data for {ticker}...")
        fetch_and_store_ticker_ohlcv(db, ticker, period="6mo", interval="1d")

        logger.info("3. Querying price history from database...")
        bars = get_stored_ohlcv(db, ticker, limit=500)
        logger.info(f"   Retrieved {len(bars)} bars.")

        data_list = [{
            "timestamp": b.timestamp,
            "open": b.open,
            "high": b.high,
            "low": b.low,
            "close": b.close,
            "volume": b.volume
        } for b in bars]

        df = pd.DataFrame(data_list)

        logger.info("4. Computing RSI, MACD, SMA, EMA, and Bollinger Bands...")
        df_calc = compute_all_indicators_df(df)

        latest_bar = df_calc.iloc[-1].to_dict()
        signals = generate_signal_summary(latest_bar)

        logger.info("5. Verifying Indicator Output Metrics:")
        logger.info(f"   Latest Close Price: ₹{latest_bar['close']:.2f}")
        logger.info(f"   RSI (14): {latest_bar['rsi_14']:.2f} -> Signal: {signals['rsi_summary']}")
        logger.info(f"   MACD: {latest_bar['macd']:.2f} | Signal Line: {latest_bar['macd_signal']:.2f} | Hist: {latest_bar['macd_hist']:.2f}")
        logger.info(f"   SMA 20: ₹{latest_bar['sma_20']:.2f} | SMA 50: ₹{latest_bar['sma_50']:.2f}")
        logger.info(f"   Bollinger Bands: Lower=₹{latest_bar['bb_lower']:.2f} | Mid=₹{latest_bar['bb_middle']:.2f} | Upper=₹{latest_bar['bb_upper']:.2f}")
        logger.info(f"   COMBINED TECHNICAL BIAS: {signals['overall_signal']}")

        assert 'rsi_14' in latest_bar, "RSI missing!"
        assert 'macd' in latest_bar, "MACD missing!"
        assert 'bb_upper' in latest_bar, "Bollinger Bands missing!"

        logger.info("STAGE 3 TECHNICAL INDICATORS PASSED ALL VERIFICATIONS!")

    finally:
        db.close()

if __name__ == "__main__":
    test_technical_indicators_stage()
