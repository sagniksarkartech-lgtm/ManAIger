"""
agents/__init__.py
==================
Public API for the MANAIGER agents package.

Why a deliberate __init__.py?
------------------------------
By explicitly re-exporting names here, we:

1. Decouple callers from internal file structure.
   `from app.agents import EmailAgent` keeps working even if we later
   rename email_agent.py to agents/email/handler.py.

2. Document the intended public surface.
   Anything not listed here is considered an internal implementation
   detail and may change without notice.

3. Enable clean star-imports in tests:
   `from app.agents import *`  → only gets __all__ contents.

Import Layers
-------------
External code (routes, tests, scripts) should import ONLY from here:

    from app.agents import EmailAgent
    from app.agents import InvoiceAgent
    from app.agents import RouterAgent
    from app.agents import BaseAgent
    from app.agents import get_agent, list_agents, is_registered

Do NOT import directly from sub-modules in application code:
    from app.agents.email_agent import EmailAgent  ← avoid outside this pkg
"""

from .base_agent import BaseAgent
from .email_agent import EmailAgent
from .invoice_agent import InvoiceAgent
from .router_agent import RouterAgent

# Registry helpers — expose so callers never need to touch registry.py directly
from .registry import get_agent, list_agents, is_registered, AGENT_REGISTRY

__all__ = [
    # Abstract base
    "BaseAgent",

    # Concrete leaf agents
    "EmailAgent",
    "InvoiceAgent",

    # Orchestration
    "RouterAgent",

    # Registry public API
    "get_agent",
    "list_agents",
    "is_registered",
    "AGENT_REGISTRY",
]
