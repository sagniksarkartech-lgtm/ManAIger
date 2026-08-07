"""
registry.py
===========
Central Agent Registry for the MANAIGER AI platform.

What Is a Registry?
-------------------
A Registry is a design pattern that acts as a look-up table (a catalogue)
mapping a string key → a class or factory.  Instead of writing:

    if agent_type == "email":
        agent = EmailAgent()
    elif agent_type == "invoice":
        agent = InvoiceAgent()
    # ...

…you write ONE registration line per agent, and the routing logic
stays clean forever.

Open/Closed Principle in action
--------------------------------
Adding a new agent (e.g. "ApprovalAgent") requires:
  1. Create approval_agent.py  — subclass BaseAgent ✓
  2. Add ONE line here         — AGENT_REGISTRY["approval"] = ApprovalAgent

That's it.  RouterAgent, FastAPI routes, and everything else AUTOMATICALLY
supports the new agent.  No existing code is modified.

Lazy Instantiation & Caching
-----------------------------
Agent instances are created on first use and then cached in a module-level
dict.  This means:
  - No expensive __init__ calls at import time
  - Each agent type is instantiated at most once per process lifetime
  - Future: swap caching for a DI container if per-request isolation needed

Thread Safety Note
------------------
Python's GIL makes dict reads/writes effectively atomic for simple keys,
so the cache is safe for typical FastAPI async workloads.  If you later
move to multi-process workers, replace the cache with a process-local
LRU or a proper DI scope.
"""

from typing import Dict, Optional, Type, TYPE_CHECKING

# Import concrete agent classes ─────────────────────────────────────────────
# We import the CLASSES (not instances) so the Registry stores blueprints,
# not live objects.
from .base_agent import BaseAgent
from .email_agent import EmailAgent
from .invoice_agent import InvoiceAgent

# If you later need type-only imports to avoid circular imports at runtime:
# if TYPE_CHECKING:
#     from .approval_agent import ApprovalAgent


# ---------------------------------------------------------------------------
# AGENT_REGISTRY
# ---------------------------------------------------------------------------
# Maps a stable string key → the corresponding concrete agent CLASS.
#
# Convention for keys:
#   - Lowercase, no spaces (e.g. "email", "invoice", "approval")
#   - The key is what callers pass in the request payload: {"type": "email"}
#
# To register a new agent, add ONE line:
#   AGENT_REGISTRY["<key>"] = <AgentClass>
#
# Do NOT instantiate here — the classes themselves are stored.
# ---------------------------------------------------------------------------

AGENT_REGISTRY: Dict[str, Type[BaseAgent]] = {
    "email":   EmailAgent,
    "invoice": InvoiceAgent,
    # "approval": ApprovalAgent,   ← uncomment when ApprovalAgent is ready
    # "scheduler": SchedulerAgent, ← uncomment when SchedulerAgent is ready
}


# ---------------------------------------------------------------------------
# Instance Cache
# ---------------------------------------------------------------------------
# Stores lazily-created agent instances so each agent type is built once.
# Key: same string key as AGENT_REGISTRY.
# Value: a live BaseAgent instance.
# ---------------------------------------------------------------------------

_instance_cache: Dict[str, BaseAgent] = {}


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def get_agent(agent_type: str) -> Optional[BaseAgent]:
    """
    Retrieve (and lazily create) an agent instance by type key.

    This is the ONLY function RouterAgent (and tests) should call.
    It handles both lookup and caching transparently.

    Parameters
    ----------
    agent_type : str
        The string key as registered in AGENT_REGISTRY.
        e.g. "email", "invoice"

    Returns
    -------
    BaseAgent instance  — if the key is registered
    None                — if the key is unknown (caller decides how to handle)

    Examples
    --------
    >>> agent = get_agent("email")
    >>> agent.name
    'EmailAgent'

    >>> unknown = get_agent("xyz")
    >>> unknown is None
    True
    """
    # Return cached instance if already created
    if agent_type in _instance_cache:
        return _instance_cache[agent_type]

    # Look up the class in the registry
    agent_class: Optional[Type[BaseAgent]] = AGENT_REGISTRY.get(agent_type)

    if agent_class is None:
        # Unknown type — caller is responsible for handling None
        return None

    # Instantiate once, cache for future calls
    instance: BaseAgent = agent_class()
    _instance_cache[agent_type] = instance
    return instance


def list_agents() -> Dict[str, Dict[str, str]]:
    """
    Return a catalogue of all registered agents with their metadata.

    Useful for:
    - A GET /agents endpoint that lists available agents
    - Admin dashboards
    - Auto-generated docs

    Returns
    -------
    Dict[str, Dict[str, str]]
        e.g. {
            "email":   {"name": "EmailAgent",   "description": "…"},
            "invoice": {"name": "InvoiceAgent", "description": "…"},
        }
    """
    return {
        key: agent_class().metadata()
        for key, agent_class in AGENT_REGISTRY.items()
    }


def is_registered(agent_type: str) -> bool:
    """
    Check whether an agent type is registered without creating an instance.

    Useful for input validation before routing.

    Parameters
    ----------
    agent_type : str
        The string key to check.

    Returns
    -------
    bool
        True if registered, False otherwise.
    """
    return agent_type in AGENT_REGISTRY
