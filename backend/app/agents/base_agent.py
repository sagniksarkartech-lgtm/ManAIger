"""
base_agent.py
=============
Defines the abstract contract that every AI agent in the MANAIGER platform
must fulfil.

Design Principles
-----------------
- Open/Closed Principle (SOLID-O):
    The base class is OPEN for extension (subclass freely) but CLOSED for
    modification (never change this contract once stable).

- Liskov Substitution Principle (SOLID-L):
    Any concrete agent can be used wherever BaseAgent is expected, without
    the caller needing to know which agent it is dealing with.

- Dependency Inversion (SOLID-D):
    High-level modules (RouterAgent, FastAPI routes) depend on this
    abstraction, NOT on concrete agent classes.

Why ABC?
--------
Python's Abstract Base Class (ABC) mechanism raises a TypeError at
class-INSTANTIATION time if a subclass forgets to implement an
abstract method.  This catches missing implementations early — before
any request ever arrives — which is far better than a runtime AttributeError.
"""

from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseAgent(ABC):
    """
    Abstract base class for all MANAIGER AI agents.

    Every specialised agent (EmailAgent, InvoiceAgent, …) inherits from this
    class and must implement the three elements below:

    Attributes
    ----------
    name : str
        Human-readable identifier for the agent, e.g. "EmailAgent".
        Used in logging, observability dashboards, and API responses.

    description : str
        One-sentence summary of what this agent is responsible for.
        Surfaced in the /docs endpoint and the AgentRegistry metadata.

    Methods
    -------
    process(data)
        The single entry-point for invoking an agent.  All agents share
        this identical signature so the RouterAgent can call any agent
        without knowing its concrete type.
    """

    # ------------------------------------------------------------------
    # Abstract Properties
    # Every subclass MUST declare these as class-level attributes or
    # @property implementations.  Omitting either raises TypeError on
    # class instantiation.
    # ------------------------------------------------------------------

    @property
    @abstractmethod
    def name(self) -> str:
        """
        Unique, human-readable name for this agent.
        Convention: PascalCase, ending in 'Agent' (e.g. 'EmailAgent').
        """
        ...

    @property
    @abstractmethod
    def description(self) -> str:
        """
        One-sentence description of this agent's responsibility.
        Shown in registry listings and auto-generated API docs.
        """
        ...

    # ------------------------------------------------------------------
    # Abstract Methods
    # ------------------------------------------------------------------

    @abstractmethod
    def process(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Primary processing entry-point.

        All agents share this signature so the RouterAgent and future
        orchestration layers can call any agent polymorphically.

        Parameters
        ----------
        data : Dict[str, Any]
            Arbitrary payload passed by the caller.  Each concrete agent
            is responsible for extracting the keys it cares about.
            Unknown keys should be silently ignored (be liberal in what
            you accept).

        Returns
        -------
        Dict[str, Any]
            A structured result dict.  At minimum it must contain:
              - "agent"   : str   – the agent's name
              - "status"  : str   – "success" | "error" | "pending"
            Additional keys are agent-specific.
        """
        ...

    # ------------------------------------------------------------------
    # Concrete Helpers (available to all subclasses)
    # ------------------------------------------------------------------

    def metadata(self) -> Dict[str, str]:
        """
        Returns a standard metadata snapshot for this agent.

        Used by the AgentRegistry to expose an agent catalogue endpoint
        without needing to instantiate agents just for their metadata.

        Returns
        -------
        Dict[str, str]
            e.g. {"name": "EmailAgent", "description": "…"}
        """
        return {
            "name": self.name,
            "description": self.description,
        }
