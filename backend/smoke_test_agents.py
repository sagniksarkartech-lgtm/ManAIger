import sys
sys.path.insert(0, ".")

from app.agents import BaseAgent, EmailAgent, InvoiceAgent, RouterAgent
from app.agents import get_agent, list_agents, is_registered

print("=== Smoke Test: MANAIGER Agent Framework ===\n")

# 1. Instantiation check
email_agent = EmailAgent()
invoice_agent = InvoiceAgent()
router = RouterAgent()

print(f"EmailAgent.name        : {email_agent.name}")
print(f"EmailAgent.description : {email_agent.description}")
print(f"InvoiceAgent.name      : {invoice_agent.name}")
print(f"RouterAgent.name       : {router.name}\n")

# 2. Direct agent process()
print("--- EmailAgent.process() ---")
print(email_agent.process({"content": "Test email", "sender": "a@b.com", "subject": "Hello"}))

print("\n--- InvoiceAgent.process() ---")
print(invoice_agent.process({"filename": "inv_001.pdf", "vendor": "Acme Corp"}))

# 3. RouterAgent dispatch - email
print("\n--- RouterAgent -> email ---")
print(router.process({"type": "email", "content": "Test routing", "sender": "x@y.com"}))

# 4. RouterAgent dispatch - invoice
print("\n--- RouterAgent -> invoice ---")
print(router.process({"type": "invoice", "filename": "inv_002.pdf"}))

# 5. RouterAgent dispatch - unknown type
print("\n--- RouterAgent -> unknown ---")
print(router.process({"type": "unknown_agent"}))

# 6. RouterAgent dispatch - missing type
print("\n--- RouterAgent -> missing type ---")
print(router.process({}))

# 7. Registry helpers
print("\n--- list_agents() ---")
for key, meta in list_agents().items():
    print(f"  [{key}] -> {meta}")

print(f"\nis_registered('email')   : {is_registered('email')}")
print(f"is_registered('xyz')     : {is_registered('xyz')}")

# 8. Resolve without processing
print(f"\nrouter.resolve('invoice'): {router.resolve('invoice')}")

print("\n=== All checks passed ===")
