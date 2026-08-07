import asyncio
import sys
sys.path.insert(0, ".")

from app.agents.email_agent import EmailAgent
from app.services.gemini_service import GeminiService, SYSTEM_PROMPT

async def test_email_agent():
    print("=== Testing EmailAgent + GeminiService Integration ===")
    
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

    # Test 2: Invalid JSON cleaner validation
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
    assert cleaned["category"] == "Refund"
    assert cleaned["priority"] == "High"
    assert cleaned["sentiment"] == "Negative"
    print("PASSED Test 2")

    # Test 3: Invalid schema rejection
    print("\n--- Test 3: Invalid Schema Rejection ---")
    invalid_json_text = '{"summary": "incomplete json"}'
    cleaned_invalid = service._clean_and_validate_json(invalid_json_text)
    print(f"Invalid Output: {cleaned_invalid}")
    assert cleaned_invalid is None
    print("PASSED Test 3")

    print("\n=== All Integration Tests Passed Successfully ===")

if __name__ == "__main__":
    asyncio.run(test_email_agent())
