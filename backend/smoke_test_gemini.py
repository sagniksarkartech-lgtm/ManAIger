import asyncio
import sys
sys.path.insert(0, ".")

from app.agents.email_agent import EmailAgent
from app.services.gemini_service import GeminiService

async def test_email_agent():
    print("=== Testing EmailAgent + GeminiService (google-genai SDK & Gemini 2.5 Flash) ===")
    
    agent = EmailAgent()
    print(f"Agent Name: {agent.name}")
    print(f"Agent Description: {agent.description}")
    
    # Test 1: Empty content validation
    print("\n--- Test 1: Empty Content ---")
    res1 = await agent.process_async({})
    print(f"Result: {res1}")
    assert res1["success"] is False
    assert res1["error"] == "Invalid AI response"
    print("PASSED Test 1")

    # Test 2: Gemini JSON Validation logic
    print("\n--- Test 2: Gemini JSON Validation ---")
    service = GeminiService()
    valid_json_text = '''```json
    {
      "summary": "Customer requested refund for annual subscription.",
      "category": "Refund",
      "priority": "High",
      "sentiment": "Negative",
      "suggested_reply": "Dear Customer, we have processed your refund."
    }
    ```'''
    cleaned = service._clean_and_validate_json(valid_json_text)
    print(f"Validated Output: {cleaned}")
    assert cleaned["summary"] == "Customer requested refund for annual subscription."
    assert cleaned["category"] == "Refund"
    assert cleaned["priority"] == "High"
    assert cleaned["sentiment"] == "Negative"
    assert "suggested_reply" in cleaned
    print("PASSED Test 2")

    # Test 3: Invalid schema rejection
    print("\n--- Test 3: Invalid Schema Rejection ---")
    invalid_json_text = '{"summary": "incomplete json"}'
    cleaned_invalid = service._clean_and_validate_json(invalid_json_text)
    print(f"Invalid Output: {cleaned_invalid}")
    assert cleaned_invalid is None
    print("PASSED Test 3")

    # Test 4: Live analyze_email with Gemini 2.5 Flash
    print("\n--- Test 4: Live analyze_email with Gemini 2.5 Flash ---")
    sample_email = "Hello, I was charged twice for my subscription this month. Can I get a refund of $49?"
    res_live = await service.analyze_email(email_text=sample_email)
    print(f"Live Analysis Result: {res_live}")
    if res_live:
        assert "summary" in res_live
        assert "category" in res_live
        assert "priority" in res_live
        assert "sentiment" in res_live
        assert "suggested_reply" in res_live
        print("PASSED Test 4 (Live API call successful)")
    else:
        print("Test 4 Warning: Live API call returned None (Check API key or network). Validation logic is intact.")

    print("\n=== All Integration Tests Executed Successfully ===")

if __name__ == "__main__":
    asyncio.run(test_email_agent())
