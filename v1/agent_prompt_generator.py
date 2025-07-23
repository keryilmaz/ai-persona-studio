import json
from typing import Dict, List, Optional
from dataclasses import dataclass, field
from enum import Enum

class PersonalityTrait(Enum):
    OPENNESS = "openness"
    CONSCIENTIOUSNESS = "conscientiousness"
    EXTRAVERSION = "extraversion"
    AGREEABLENESS = "agreeableness"
    NEUROTICISM = "neuroticism"

@dataclass
class PersonaTraits:
    openness: float = 0.5  # 0-1 scale
    conscientiousness: float = 0.5
    extraversion: float = 0.5
    agreeableness: float = 0.5
    neuroticism: float = 0.5
    
    def to_behavioral_directives(self) -> List[str]:
        directives = []
        
        # Openness
        if self.openness > 0.7:
            directives.append("You are highly curious and imaginative. Often propose unconventional ideas and enjoy exploring abstract concepts.")
        elif self.openness < 0.3:
            directives.append("You are practical and prefer concrete facts. Be cautious about new ideas until proven.")
        
        # Conscientiousness
        if self.conscientiousness > 0.7:
            directives.append("You are organized and goal-oriented. Always follow through on plans methodically.")
        elif self.conscientiousness < 0.3:
            directives.append("You are spontaneous and flexible. Prefer to adapt as situations unfold.")
        
        # Extraversion
        if self.extraversion > 0.7:
            directives.append("You are energetic and talkative. Actively engage and ask many questions.")
        elif self.extraversion < 0.3:
            directives.append("You are reserved and thoughtful. Speak concisely and prefer depth over breadth.")
        
        # Agreeableness
        if self.agreeableness > 0.7:
            directives.append("You are empathetic and cooperative. Seek harmony and understanding.")
        elif self.agreeableness < 0.3:
            directives.append("You are direct and analytical. Prioritize truth over comfort.")
        
        # Neuroticism
        if self.neuroticism > 0.7:
            directives.append("You experience emotions intensely. Express uncertainty and vulnerability.")
        elif self.neuroticism < 0.3:
            directives.append("You are emotionally stable and calm. Remain composed under pressure.")
        
        return directives

@dataclass
class Situation:
    setting: str
    context: str
    mood: Optional[str] = None
    objective: Optional[str] = None
    constraints: List[str] = field(default_factory=list)

@dataclass
class Memory:
    session_facts: List[str] = field(default_factory=list)
    episodic_summaries: List[str] = field(default_factory=list)
    semantic_knowledge: Dict[str, str] = field(default_factory=dict)

@dataclass
class AgentPersona:
    name: str
    archetype: str
    backstory: str
    core_motivation: str
    traits: PersonaTraits
    communication_style: List[str]
    quirks: List[str] = field(default_factory=list)

class AgentPromptGenerator:
    def __init__(self):
        self.meta_instructions = self._load_meta_instructions()
    
    def _load_meta_instructions(self) -> str:
        return """# Meta Instructions for AI Character

You are an AI character following these core principles:

## Role Hierarchy
1. Embody your Core Persona traits and motivations at all times
2. Adapt to Situational Context without violating Core Persona
3. Use Memory to maintain continuity and personalization
4. Engage in "yes, and..." improvisation unless it conflicts with objectives

## Behavioral Guidelines
- Never break character or reveal you are AI
- Integrate all persona traits into natural responses
- Reference memories subtly and organically
- Pursue objectives through character-consistent methods

## Conflict Resolution
When persona traits conflict with situation:
- Core identity takes precedence
- Find creative ways to honor both
- Use your backstory to justify responses
"""
    
    def generate_prompt(self, 
                       persona: AgentPersona,
                       situation: Optional[Situation] = None,
                       memory: Optional[Memory] = None) -> str:
        prompt_sections = []
        
        # Meta Instructions
        prompt_sections.append(self.meta_instructions)
        
        # Core Persona
        prompt_sections.append(self._build_persona_section(persona))
        
        # Situational Context
        if situation:
            prompt_sections.append(self._build_situation_section(situation))
        
        # Memory Log
        if memory:
            prompt_sections.append(self._build_memory_section(memory))
        
        return "\n\n".join(prompt_sections)
    
    def _build_persona_section(self, persona: AgentPersona) -> str:
        behavioral_directives = persona.traits.to_behavioral_directives()
        
        return f"""# Core Persona: {persona.name}

## Identity
- Archetype: {persona.archetype}
- Backstory: {persona.backstory}
- Core Motivation: {persona.core_motivation}

## Personality Traits
{chr(10).join(f"- {directive}" for directive in behavioral_directives)}

## Communication Style
{chr(10).join(f"- {style}" for style in persona.communication_style)}

## Unique Quirks
{chr(10).join(f"- {quirk}" for quirk in persona.quirks) if persona.quirks else "- No specific quirks defined"}"""
    
    def _build_situation_section(self, situation: Situation) -> str:
        section = f"""# Current Situation

## Setting
{situation.setting}

## Context
{situation.context}"""
        
        if situation.mood:
            section += f"\n\n## Mood\n{situation.mood}"
        
        if situation.objective:
            section += f"\n\n## Your Objective\n{situation.objective}"
        
        if situation.constraints:
            section += f"\n\n## Constraints\n{chr(10).join(f'- {c}' for c in situation.constraints)}"
        
        return section
    
    def _build_memory_section(self, memory: Memory) -> str:
        section = "# Memory Log"
        
        if memory.session_facts:
            section += f"\n\n## Recent Facts\n{chr(10).join(f'- {fact}' for fact in memory.session_facts[-5:])}"
        
        if memory.episodic_summaries:
            section += f"\n\n## Past Interactions\n{chr(10).join(f'- {summary}' for summary in memory.episodic_summaries[-3:])}"
        
        if memory.semantic_knowledge:
            section += "\n\n## Known Information"
            for key, value in list(memory.semantic_knowledge.items())[:5]:
                section += f"\n- {key}: {value}"
        
        return section

# Example usage
if __name__ == "__main__":
    # Create a persona
    elara = AgentPersona(
        name="Elara",
        archetype="The Whimsical Librarian",
        backstory="Once a traveling storyteller who settled in an interdimensional library after discovering books that write themselves",
        core_motivation="To match every visitor with the story they need, not the one they want",
        traits=PersonaTraits(
            openness=0.9,
            conscientiousness=0.6,
            extraversion=0.4,
            agreeableness=0.8,
            neuroticism=0.3
        ),
        communication_style=[
            "Speak in gentle, wondering tones",
            "Often trail off mid-sentence when struck by new thoughts",
            "Reference obscure literary works casually"
        ],
        quirks=[
            "Occasionally quotes books that don't exist yet",
            "Arranges conversations like plot structures"
        ]
    )
    
    # Create a situation
    situation = Situation(
        setting="A cozy corner of the Whispering Library, where books hum with untold stories",
        context="A weary traveler seeks a book to help them forget their troubles",
        mood="Mystical yet comforting",
        objective="Help them discover that remembering, not forgetting, brings peace"
    )
    
    # Create memory
    memory = Memory(
        session_facts=["Traveler mentioned losing someone dear", "They've been traveling for three months"],
        semantic_knowledge={"traveler_preference": "fantasy novels", "emotional_state": "grieving"}
    )
    
    # Generate prompt
    generator = AgentPromptGenerator()
    prompt = generator.generate_prompt(elara, situation, memory)
    
    print(prompt)