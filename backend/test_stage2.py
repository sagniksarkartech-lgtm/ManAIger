import sys
import os
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_pnl_dashboard_stage():
    from app.database.session import init_db, SessionLocal
    from app.services.portfolio_service import (
        create_position,
        close_position,
        delete_position,
        get_portfolio_summary
    )
    from app.services.market_data_service import fetch_and_store_ticker_ohlcv

    logger.info("1. Initializing database tables...")
    init_db()
    db = SessionLocal()

    try:
        # Pre-seed stock prices for test calculations
        logger.info("2. Seeding market price data for RELIANCE.NS and TCS.NS...")
        fetch_and_store_ticker_ohlcv(db, "RELIANCE.NS", period="1mo", interval="1d")
        fetch_and_store_ticker_ohlcv(db, "TCS.NS", period="1mo", interval="1d")

        # 3. Log a Long position: RELIANCE.NS @ 1250.0, qty 10
        logger.info("3. Logging new Long position: RELIANCE.NS @ ₹1250.0 (Qty: 10)...")
        pos1 = create_position(
            db=db,
            ticker="RELIANCE.NS",
            entry_price=1250.0,
            quantity=10.0,
            notes="Test Long Position Stage 2"
        )
        logger.info(f"   Position logged: ID={pos1.id}, Ticker={pos1.ticker}, Entry={pos1.entry_price}, Qty={pos1.quantity}")

        # 4. Log a Short position: TCS.NS @ 2500.0, qty -5
        logger.info("4. Logging new Short position: TCS.NS @ ₹2500.0 (Qty: -5)...")
        pos2 = create_position(
            db=db,
            ticker="TCS.NS",
            entry_price=2500.0,
            quantity=-5.0,
            notes="Test Short Position Stage 2"
        )
        logger.info(f"   Position logged: ID={pos2.id}, Ticker={pos2.ticker}, Entry={pos2.entry_price}, Qty={pos2.quantity}")

        # 5. Fetch portfolio summary
        logger.info("5. Fetching Portfolio Summary with real-time P&L metrics...")
        summary = get_portfolio_summary(db)
        logger.info(f"   Total Portfolio Cost: ₹{summary['total_cost']:.2f}")
        logger.info(f"   Current Portfolio Value: ₹{summary['current_portfolio_value']:.2f}")
        logger.info(f"   Total Unrealized P&L: ₹{summary['total_unrealized_pnl']:.2f} ({summary['total_unrealized_pnl_pct']:.2f}%)")
        logger.info(f"   Open Positions Count: {summary['open_positions_count']}")

        for p in summary['positions']:
            logger.info(f"   -> Position #{p['id']} [{p['ticker']}] Entry: ₹{p['entry_price']} | Current: ₹{p['current_price']} | Unrealized P&L: ₹{p['unrealized_pnl']:.2f}")

        # 6. Close position 1 at ₹1350
        logger.info(f"6. Closing Long Position #{pos1.id} at exit price ₹1350.0...")
        closed_p = close_position(db=db, position_id=pos1.id, exit_price=1350.0)
        logger.info(f"   Closed Position #{closed_p.id}. Status={closed_p.status}, Exit Price=₹{closed_p.exit_price}")

        # 7. Re-check portfolio summary
        logger.info("7. Verifying updated Portfolio Summary post-closure...")
        updated_summary = get_portfolio_summary(db)
        logger.info(f"   Total Realized P&L: ₹{updated_summary['total_realized_pnl']:.2f}")
        logger.info(f"   Open Count: {updated_summary['open_positions_count']}, Closed Count: {updated_summary['closed_positions_count']}")

        # Assertions
        assert updated_summary['total_realized_pnl'] == (1350.0 - 1250.0) * 10.0, "Realized P&L calculation mismatch!"
        logger.info("STAGE 2 P&L DASHBOARD PASSED ALL VERIFICATIONS!")

    finally:
        db.close()

if __name__ == "__main__":
    test_pnl_dashboard_stage()
