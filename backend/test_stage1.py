import sys
import os
import logging

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_data_layer():
    from app.database.session import init_db, SessionLocal
    from app.services.market_data_service import fetch_and_store_ticker_ohlcv, get_stored_ohlcv, get_tracked_ticker_summaries

    logger.info("1. Initializing database tables...")
    init_db()
    db = SessionLocal()

    tickers_to_test = ["RELIANCE.NS", "TCS.NS", "INFY.NS"]
    try:
        for ticker in tickers_to_test:
            logger.info(f"2. Fetching & storing 1-month OHLCV data for {ticker}...")
            res = fetch_and_store_ticker_ohlcv(db, ticker, period="1mo", interval="1d")
            logger.info(f"   Fetched {ticker}: processed {res['records_processed']} bars, {res['new_records']} new DB records.")

        logger.info("3. Querying stored history for RELIANCE.NS...")
        bars = get_stored_ohlcv(db, "RELIANCE.NS", limit=5)
        logger.info(f"   Retrieved {len(bars)} bars for RELIANCE.NS.")
        for b in bars[:3]:
            logger.info(f"   Bar: {b.timestamp.strftime('%Y-%m-%d')} | Open: ₹{b.open:.2f} | Close: ₹{b.close:.2f} | Vol: {b.volume}")

        logger.info("4. Querying tracked ticker summaries...")
        summaries = get_tracked_ticker_summaries(db)
        for s in summaries:
            logger.info(f"   Summary: Ticker={s['ticker']}, Bars={s['total_bars']}, Range={s['first_date'].strftime('%Y-%m-%d')} to {s['last_date'].strftime('%Y-%m-%d')}, LatestClose=${s['latest_close']:.2f}")

        logger.info("STAGE 1 DATA LAYER PASSED SUCCESSFULLY!")
    finally:
        db.close()

if __name__ == "__main__":
    test_data_layer()
