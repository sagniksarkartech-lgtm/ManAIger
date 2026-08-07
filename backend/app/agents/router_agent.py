"""
router_agent.py
===============
RouterAgent — the orchestration dispatcher for the MANAIGER AI platform.

Responsibility
--------------
The RouterAgent's ONLY job is:
    1. Read the "type" field from an incoming payload
    2. Ask the AgentRegistry which agent handles that type
    3. Delegate the payload to that agent's process() method
    4. Return the agent's result (with routing metadata attached)

What RouterAgent does NOT do
-----------------------------
- It does NOT contain any if-else branching on agent types.
- It does NOT know how EmailAgent or InvoiceAgent work internally.
- It does NOT call Gemini or any external service.
- It does NOT implement business logic.

Design Patterns Used
--------------------
Strategy Pattern
    Each registered agent is a "strategy" for processing a specific
    payload type.  RouterAgent selects the strategy dynamically.

Chain of Responsibility (future)
    RouterAgent can be extended to pass the result of one agent as
    input to another, forming a processing pipeline.

Why RouterAgent Inherits BaseAgent?
-------------------------------------
This makes RouterAgent a first-class citizen in the agent ecosystem:
- It can be registered in a higher-level registry
- It can be tested with the same interface as any other agent
- It enables recursive orchestration (a router that routes to routers)
- It enforces consistent observability (name, description, metadata())
"""

from typing import Any, Dict, List, Optional

from .base_agent import BaseAgent
from . import registry as agent_registry


class RouterAgent(BaseAgent):
    """
    Orchestration agent that dispatches incoming payloads to the
    correct specialised agent based on a "type" discriminator field.

    Usage Example
    -------------
    router = RouterAgent()

    result = router.process({"type": "email", "content": "Hello…"})
    # → delegates to EmailAgent.process({"type": "email", "content": "Hello…"})

    result = router.process({"type": "invoice", "filename": "inv_001.pdf"})
    # → delegates to InvoiceAgent.process({…})

    result = router.process({"type": "unknown"})
    # → returns an error dict without raising an exception
    """

    # ------------------------------------------------------------------
    # BaseAgent abstract property implementations
    # ------------------------------------------------------------------

    @property
    def name(self) -> str:
        return "RouterAgent"

    @property
    def description(self) -> str:
        return (
            "Orchestration dispatcher: reads the 'type' field of a payload "
            "and routes it to the correct specialised agent via the AgentRegistry."
        )

    # ------------------------------------------------------------------
    # Core Processing Method
    # ------------------------------------------------------------------

    def process(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Dispatch an incoming payload to the appropriate agent.

        Parameters
        ----------
        data : Dict[str, Any]
            Must contain a "type" key whose value matches a key in
            AGENT_REGISTRY (e.g. "email", "invoice").

            All other keys are forwarded untouched to the target agent.

        Returns
        -------
        Dict[str, Any]
            The target agent's result dict, enriched with a "routed_by"
            field so observability tools can trace the dispatch path.

            On error:
            {
                "agent":   "RouterAgent",
                "status":  "error",
                "error":   "<reason>",
                "available_types": ["email", "invoice", …]
            }
        """
        # ── Step 1: Extract the routing discriminator ────────────────────
        agent_type: Optional[str] = data.get("type")

        if not agent_type:
            return self._error("Missing required field: 'type'")

        # ── Step 2: Validate against the registry (no if-else!) ─────────
        if not agent_registry.is_registered(agent_type):
            return self._error(
                f"Unknown agent type: '{agent_type}'. "
                f"Registered types: {self._available_types()}"
            )

        # ── Step 3: Retrieve the agent instance from the registry ────────
        # get_agent() handles lazy instantiation + caching internally.
        agent: Optional[BaseAgent] = agent_registry.get_agent(agent_type)

        if agent is None:
            # Defensive: should never reach here after is_registered() check,
            # but guards against race conditions or registry corruption.
            return self._error(
                f"Registry returned None for registered type '{agent_type}'. "
                "This is a bug — please report it."
            )

        # ── Step 4: Delegate to the target agent's process() ─────────────
        # The entire original payload (including "type") is forwarded.
        # Each agent uses .get() to extract only the keys it cares about,
        # so the extra "type" key is harmlessly ignored.
        result: Dict[str, Any] = agent.process(data)

        # ── Step 5: Enrich result with routing provenance ─────────────────
        # "routed_by" lets observability tools reconstruct the dispatch path
        # without having to parse agent names.
        result["routed_by"] = self.name

        return result

    # ------------------------------------------------------------------
    # Helper Methods
    # ------------------------------------------------------------------

    def _error(self, reason: str) -> Dict[str, Any]:
        """
        Build a standardised error response.

        Using a helper method keeps the error schema consistent across
        all error paths and makes it trivial to extend (e.g. add a
        trace_id field later).
        """
        return {
            "agent": self.name,
            "status": "error",
            "error": reason,
            "available_types": self._available_types(),
        }

    def _available_types(self) -> List[str]:
        """Return a sorted list of all registered agent type keys."""
        return sorted(agent_registry.AGENT_REGISTRY.keys())

    # ------------------------------------------------------------------
    # Convenience: resolve without calling process()
    # ------------------------------------------------------------------

    def resolve(self, agent_type: str) -> Optional[BaseAgent]:
        """
        Return the agent instance for a given type without processing a payload.

        Useful for:
        - Unit tests that want the agent object itself
        - Admin endpoints that introspect which agent handles what
        - Future pipeline builders that compose agents manually

        Parameters
        ----------
        agent_type : str
            e.g. "email", "invoice"

        Returns
        -------
        BaseAgent instance — if registered
        None              — if not registered
        """
        return agent_registry.get_agent(agent_type)
