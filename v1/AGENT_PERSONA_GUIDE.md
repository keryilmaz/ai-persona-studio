# AI Agent Persona Generator Guide

## Overview
This system creates rich, dynamic AI character prompts using personality psychology frameworks and improvisational storytelling techniques.

## Key Concepts

### 1. **Composite Prompt Architecture**
Rather than a single monolithic prompt, the system assembles prompts from modular components:
- Meta Instructions (the "operating system")
- Core Persona (immutable identity)
- Situational Context (dynamic scene setting)
- Memory System (continuity engine)

### 2. **Personality Framework Integration**
Uses Big Five personality traits translated into concrete behaviors:
- **Openness**: Curiosity and imagination levels
- **Conscientiousness**: Organization and discipline
- **Extraversion**: Social energy and engagement
- **Agreeableness**: Cooperation and empathy
- **Neuroticism**: Emotional intensity and expression

### 3. **Improv-Based Design**
- Seed with situations, not scripts
- Enable "yes, and..." responses
- Allow emergent storytelling
- Balance freedom with objectives

## How to Use

### Web Interface
1. Open `agent-persona-generator.html` in a browser
2. Fill in character details or use preset buttons
3. Adjust personality sliders (0-100 scale)
4. Add communication styles and quirks
5. Optionally add situational context
6. Click "Generate Agent Prompt"

### Python Implementation
```python
from agent_prompt_generator import AgentPromptGenerator, AgentPersona, PersonaTraits, Situation

# Create a persona
persona = AgentPersona(
    name="Your Character",
    archetype="The Archetype",
    backstory="Character history...",
    core_motivation="What drives them",
    traits=PersonaTraits(openness=0.8, conscientiousness=0.6),
    communication_style=["Style element 1", "Style element 2"]
)

# Generate prompt
generator = AgentPromptGenerator()
prompt = generator.generate_prompt(persona)
```

## Best Practices

1. **Trait Balance**: Extreme values (>80 or <20) create more distinctive characters
2. **Backstory Matters**: Use it to justify unusual trait combinations
3. **Specific Quirks**: Make them observable and actionable
4. **Clear Objectives**: In situations, objectives guide improvisation

## Memory System Design

The three-tier memory system allows for:
- **Session Memory**: Current conversation context
- **Episodic Memory**: Summarized past interactions
- **Semantic Memory**: Extracted facts and preferences

This enables continuity without overwhelming the context window.

## Growth Through Experience

Characters can evolve through:
1. Accumulating memories across sessions
2. Human-reviewed integration of learnings
3. Version-controlled persona updates
4. Controlled evolution preventing drift

## Examples Included

The interface includes four preset characters:
- **Elara**: Whimsical Librarian (high openness, low neuroticism)
- **Marcus Stone**: Noir Detective (high conscientiousness, low agreeableness)
- **Master Chen**: Wise Mentor (high agreeableness, low neuroticism)
- **Zara Flux**: Curious Explorer (maximum openness, high extraversion)

Study these presets to understand effective trait combinations and style choices.