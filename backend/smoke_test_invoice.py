"""
smoke_test_invoice.py
=====================
Integration smoke tests for GeminiService invoice parsing, InvoiceAgent,
and RouterAgent integration.

Run from backend/ directory:
    python smoke_test_invoice.py
"""

import asyncio
import json
import sys

sys.path.insert(0, ".")

from app.agents.invoice_agent import InvoiceAgent
from app.agents.router_agent import RouterAgent
from app.services.gemini_service import GeminiService


async def run_invoice_smoke_tests():
    print("=" * 70)
    print("  MANAIGER - Gemini AI InvoiceAgent Integration Smoke Tests")
    print("=" * 70)

    agent = InvoiceAgent()
    print(f"\nAgent Name       : {agent.name}")
    print(f"Agent Description: {agent.description}")

    # ------------------------------------------------------------------
    # Test 1: Empty Content Guard
    # ------------------------------------------------------------------
    print("\n--- Test 1: Empty Content Guard ---")
    res1 = await agent.process_async({})
    print(f"Result: {json.dumps(res1, indent=2)}")
    assert res1["success"] is False, "Expected success=False for empty input"
    assert "error" in res1, "Expected error key in response"
    print("[PASS] Test 1: Empty content guard verified successfully.")

    # ------------------------------------------------------------------
    # Test 2: JSON Fence Cleaning & Schema Validation
    # ------------------------------------------------------------------
    print("\n--- Test 2: Markdown Fence Stripping & JSON Validation ---")
    service = GeminiService()
    fenced_json = '''```json
    {
      "vendor": "Acme Industrial Corp",
      "invoice_number": "INV-2026-8812",
      "amount": 2750.50,
      "due_date": "2026-09-15",
      "currency": "USD",
      "summary": "Industrial parts supply invoice."
    }
    ```'''
    validated = service._clean_and_validate_invoice_json(fenced_json)
    print(f"Validated Dict: {json.dumps(validated, indent=2)}")
    assert validated is not None, "Expected valid parsed JSON"
    assert validated["vendor"] == "Acme Industrial Corp"
    assert validated["invoice_number"] == "INV-2026-8812"
    assert validated["amount"] == 2750.50
    assert validated["due_date"] == "2026-09-15"
    assert validated["currency"] == "USD"
    print("[PASS] Test 2: Markdown fence stripping and JSON validation verified.")

    # ------------------------------------------------------------------
    # Test 3: Local Regex Fallback Parsing
    # ------------------------------------------------------------------
    print("\n--- Test 3: Local Regex Fallback Extractor ---")
    sample_text = (
        "Vendor: Nexus Tech Solutions\n"
        "Invoice No: INV-9901\n"
        "Total Amount Due: $1,420.00\n"
        "Due Date: 2026-11-01\n"
        "Currency: USD"
    )
    fallback_res = service._extract_invoice_locally(sample_text)
    print(f"Fallback Extraction Result: {json.dumps(fallback_res, indent=2)}")
    assert fallback_res["vendor"] == "Nexus Tech Solutions"
    assert fallback_res["invoice_number"] == "INV-9901"
    assert fallback_res["amount"] == 1420.0
    assert fallback_res["due_date"] == "2026-11-01"
    assert fallback_res["currency"] == "USD"
    print("[PASS] Test 3: Local regex fallback extractor verified.")

    # ------------------------------------------------------------------
    # Test 4: Live Invoice Processing via InvoiceAgent.process_async()
    # ------------------------------------------------------------------
    print("\n--- Test 4: Live Invoice Analysis via InvoiceAgent ---")
    live_invoice_text = (
        "INVOICE #INV-2026-773\n"
        "Supplier: Global Cloud Logistics LLC\n"
        "Amount Due: $5,800.00 USD\n"
        "Payment Due: 2026-10-30\n"
        "Description: Managed database hosting services for Q3 2026."
    )
    res_live = await agent.process_async({"invoice_text": live_invoice_text})
    print(f"Live Invoice Process Result: {json.dumps(res_live, indent=2)}")
    assert res_live["success"] is True, f"Expected success=True, got {res_live}"
    assert res_live["vendor"] is not None
    assert res_live["invoice_number"] is not None
    assert res_live["amount"] is not None
    assert res_live["due_date"] is not None
    assert res_live["currency"] is not None
    print("[PASS] Test 4: Live InvoiceAgent processing verified.")

    # ------------------------------------------------------------------
    # Test 5: RouterAgent Dispatching to InvoiceAgent
    # ------------------------------------------------------------------
    print("\n--- Test 5: RouterAgent Dispatching Invoice Payload ---")
    router = RouterAgent()
    routed_res = router.process({
        "type": "invoice",
        "invoice_text": live_invoice_text
    })
    print(f"RouterAgent Invoice Result: {json.dumps(routed_res, indent=2)}")
    assert routed_res["success"] is True
    assert routed_res.get("routed_by") == "RouterAgent"
    print("[PASS] Test 5: RouterAgent dispatching to InvoiceAgent verified.")

    print("\n" + "=" * 70)
    print("  All Invoice Agent Smoke Tests Passed Successfully!")
    print("=" * 70)


if __name__ == "__main__":
    asyncio.run(run_invoice_smoke_tests())
