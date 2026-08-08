import sys
import os
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_company_fundamentals_stage():
    from app.services.fundamentals_service import fetch_company_fundamentals

    tickers_to_test = ["RELIANCE.NS", "TCS.NS"]

    for ticker in tickers_to_test:
        logger.info(f"1. Fetching company fundamentals profile for {ticker}...")
        data = fetch_company_fundamentals(ticker)

        logger.info("   Extraction Summary:")
        logger.info(f"   Company: {data['name']} ({data['ticker']}) | Sector: {data['sector']} | Industry: {data['industry']}")
        logger.info(f"   Current Price: ₹{data['current_price']:.2f}")

        val = data['valuation']
        logger.info(f"   Valuation: Market Cap=₹{val['market_cap']:,} | P/E={val['pe_ratio']} | Fwd P/E={val['forward_pe']} | P/B={val['pb_ratio']}")

        prof = data['profitability']
        logger.info(f"   Profitability: EPS={prof['eps_trailing']} | Revenue Growth={prof['revenue_growth']} | Margin={prof['profit_margins']}")

        assert data['name'], "Company name missing!"
        assert data['valuation'], "Valuation dict missing!"

    logger.info("STAGE 5 COMPANY FUNDAMENTALS PASSED ALL VERIFICATIONS!")

if __name__ == "__main__":
    test_company_fundamentals_stage()
