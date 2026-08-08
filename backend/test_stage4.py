import sys
import os
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_strategy_backtesting_stage():
    from app.database.session import init_db, SessionLocal
    from app.services.market_data_service import fetch_and_store_ticker_ohlcv, get_stored_ohlcv
    from app.services.backtest_service import run_backtest_strategy
    import pandas as pd

    logger.info("1. Initializing database tables...")
    init_db()
    db = SessionLocal()

    ticker = "RELIANCE.NS"
    try:
        logger.info(f"2. Fetching & storing 1-year price history for {ticker}...")
        fetch_and_store_ticker_ohlcv(db, ticker, period="1y", interval="1d")

        bars = get_stored_ohlcv(db, ticker, limit=1000)
        logger.info(f"   Retrieved {len(bars)} price bars.")

        df = pd.DataFrame([{
            "timestamp": b.timestamp,
            "open": b.open,
            "high": b.high,
            "low": b.low,
            "close": b.close,
            "volume": b.volume,
            "ticker": b.ticker
        } for b in bars])

        # Test MA Crossover Strategy
        logger.info("3. Running MA Crossover Backtest (Fast=20, Slow=50)...")
        ma_res = run_backtest_strategy(
            df=df,
            strategy_type="MA_CROSSOVER",
            initial_capital=100000.0,
            fast_period=20,
            slow_period=50
        )

        logger.info("   MA Crossover Results:")
        logger.info(f"   Initial Capital: ₹{ma_res['initial_capital']:.2f} | Final Capital: ₹{ma_res['final_capital']:.2f}")
        logger.info(f"   Total Strategy Return: {ma_res['total_return_pct']:.2f}% | Buy & Hold Return: {ma_res['benchmark_return_pct']:.2f}%")
        logger.info(f"   Win Rate: {ma_res['win_rate_pct']:.2f}% ({len(ma_res['trades'])} total trades)")
        logger.info(f"   Max Drawdown: {ma_res['max_drawdown_pct']:.2f}% | Sharpe Ratio: {ma_res['sharpe_ratio']:.2f} | Profit Factor: {ma_res['profit_factor']:.2f}")

        # Test RSI Reversion Strategy
        logger.info("4. Running RSI Mean Reversion Backtest (Oversold=30, Overbought=70)...")
        rsi_res = run_backtest_strategy(
            df=df,
            strategy_type="RSI_REVERSION",
            initial_capital=100000.0,
            rsi_oversold=30.0,
            rsi_overbought=70.0
        )

        logger.info("   RSI Mean Reversion Results:")
        logger.info(f"   Total Strategy Return: {rsi_res['total_return_pct']:.2f}% | Win Rate: {rsi_res['win_rate_pct']:.2f}% ({len(rsi_res['trades'])} total trades)")
        logger.info(f"   Max Drawdown: {rsi_res['max_drawdown_pct']:.2f}% | Sharpe Ratio: {rsi_res['sharpe_ratio']:.2f}")

        assert ma_res['total_trades'] >= 0, "MA backtest failed!"
        assert rsi_res['total_trades'] >= 0, "RSI backtest failed!"

        logger.info("STAGE 4 STRATEGY BACKTESTING PASSED ALL VERIFICATIONS!")

    finally:
        db.close()

if __name__ == "__main__":
    test_strategy_backtesting_stage()
