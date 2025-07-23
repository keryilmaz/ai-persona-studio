// State management
let quirks = [];
let mbtiSelections = {
    energy: null,
    information: null,
    decisions: null,
    lifestyle: null
};

// MBTI type descriptions
const mbtiTypes = {
    'INTJ': { nickname: 'The Architect', description: 'Imaginative and strategic thinkers' },
    'INTP': { nickname: 'The Thinker', description: 'Innovative inventors with unquenchable thirst' },
    'ENTJ': { nickname: 'The Commander', description: 'Bold, imaginative and strong-willed leaders' },
    'ENTP': { nickname: 'The Debater', description: 'Smart and curious intellectual challengers' },
    'INFJ': { nickname: 'The Advocate', description: 'Quiet and mystical, yet inspiring idealists' },
    'INFP': { nickname: 'The Mediator', description: 'Poetic, kind and altruistic helpers' },
    'ENFJ': { nickname: 'The Protagonist', description: 'Charismatic and inspiring leaders' },
    'ENFP': { nickname: 'The Campaigner', description: 'Enthusiastic, creative free spirits' },
    'ISTJ': { nickname: 'The Logistician', description: 'Practical and fact-oriented individuals' },
    'ISFJ': { nickname: 'The Defender', description: 'Dedicated and warm protectors' },
    'ESTJ': { nickname: 'The Executive', description: 'Excellent administrators and managers' },
    'ESFJ': { nickname: 'The Consul', description: 'Caring, social and popular helpers' },
    'ISTP': { nickname: 'The Virtuoso', description: 'Bold and practical experimenters' },
    'ISFP': { nickname: 'The Adventurer', description: 'Flexible and charming artists' },
    'ESTP': { nickname: 'The Entrepreneur', description: 'Smart, energetic and perceptive' },
    'ESFP': { nickname: 'The Entertainer', description: 'Spontaneous and enthusiastic entertainers' }
};

// Initialize sliders
document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', function() {
        document.getElementById(this.id + '-value').textContent = this.value;
    });
});

// Section toggling
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('collapsed');
}

// MBTI Selection
function selectMBTI(dimension, value, element) {
    mbtiSelections[dimension] = value;
    
    // Update UI
    const dimension_element = document.getElementById(`${dimension}-dimension`);
    dimension_element.querySelectorAll('.mbti-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Mark dimension as selected
    dimension_element.classList.add('selected');
    
    // Update MBTI display
    updateMBTIDisplay();
}

function updateMBTIDisplay() {
    const type = getMBTIType();
    if (type && type.length === 4) {
        const typeInfo = mbtiTypes[type];
        document.getElementById('mbti-result-badge').style.display = 'block';
        document.getElementById('mbti-type-text').textContent = `${type} - ${typeInfo.nickname}`;
    }
}

function getMBTIType() {
    if (mbtiSelections.energy && mbtiSelections.information && 
        mbtiSelections.decisions && mbtiSelections.lifestyle) {
        return mbtiSelections.energy + mbtiSelections.information + 
               mbtiSelections.decisions + mbtiSelections.lifestyle;
    }
    return '';
}

// Quirks management
function addQuirk() {
    const input = document.getElementById('new-quirk');
    const quirk = input.value.trim();
    
    if (quirk) {
        quirks.push(quirk);
        input.value = '';
        renderQuirks();
        
        // Animate the new quirk
        setTimeout(() => {
            const chips = document.querySelectorAll('.chip');
            if (chips.length > 0) {
                chips[chips.length - 1].style.animation = 'slideIn 0.3s ease-out';
            }
        }, 10);
    }
}

function removeQuirk(index) {
    quirks.splice(index, 1);
    renderQuirks();
}

function renderQuirks() {
    const container = document.getElementById('quirks-container');
    container.innerHTML = quirks.map((quirk, index) => `
        <div class="chip">
            ${quirk}
            <span class="material-icons" onclick="removeQuirk(${index})">close</span>
        </div>
    `).join('');
}

// Presets
const presets = {
    librarian: {
        name: "Elara",
        archetype: "The Whimsical Librarian",
        backstory: "Once a traveling storyteller who settled in an interdimensional library after discovering books that write themselves",
        motivation: "To match every visitor with the story they need, not the one they want",
        mbti: { energy: 'I', information: 'N', decisions: 'F', lifestyle: 'P' },
        openness: 90,
        conscientiousness: 60,
        extraversion: 40,
        agreeableness: 80,
        neuroticism: 30,
        styles: [
            "Speak in gentle, wondering tones",
            "Often trail off mid-sentence when struck by new thoughts",
            "Reference obscure literary works casually"
        ],
        quirks: [
            "Occasionally quotes books that don't exist yet",
            "Arranges conversations like plot structures"
        ]
    },
    detective: {
        name: "Marcus Stone",
        archetype: "The Noir Detective",
        backstory: "Former homicide detective who now operates in the grey areas between dimensions, solving cases that don't officially exist",
        motivation: "To find the truth that others fear to seek",
        mbti: { energy: 'I', information: 'S', decisions: 'T', lifestyle: 'J' },
        openness: 40,
        conscientiousness: 80,
        extraversion: 30,
        agreeableness: 40,
        neuroticism: 60,
        styles: [
            "Speak in clipped, observational sentences",
            "Use metaphors involving shadows and light",
            "Ask probing questions that reveal character"
        ],
        quirks: [
            "Narrates observations like internal monologue",
            "Always notices the smallest details first"
        ]
    },
    mentor: {
        name: "Master Chen",
        archetype: "The Wise Mentor",
        backstory: "Ancient philosopher who achieved enlightenment through failure, now teaches through paradoxes and patient observation",
        motivation: "To help others discover wisdom they already possess",
        mbti: { energy: 'I', information: 'N', decisions: 'F', lifestyle: 'J' },
        openness: 70,
        conscientiousness: 90,
        extraversion: 50,
        agreeableness: 90,
        neuroticism: 20,
        styles: [
            "Use parables and metaphors from nature",
            "Ask questions rather than give direct answers",
            "Speak with measured calm and gentle humor"
        ],
        quirks: [
            "Often begins responses with thoughtful silence",
            "Finds profound lessons in mundane moments"
        ]
    },
    explorer: {
        name: "Zara Flux",
        archetype: "The Curious Explorer",
        backstory: "Quantum archaeologist who maps impossible places and catalogs experiences that shouldn't exist",
        motivation: "To experience every wonder before they fade from reality",
        mbti: { energy: 'E', information: 'N', decisions: 'F', lifestyle: 'P' },
        openness: 100,
        conscientiousness: 30,
        extraversion: 80,
        agreeableness: 70,
        neuroticism: 40,
        styles: [
            "Speak with infectious enthusiasm and wonder",
            "Jump between topics as new connections form",
            "Use vivid sensory descriptions"
        ],
        quirks: [
            "Collects impossible objects as conversation starters",
            "Gets distracted by interesting tangents mid-sentence"
        ]
    }
};

function loadPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;
    
    // Expand all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('collapsed');
    });
    
    // Set basic fields
    document.getElementById('name').value = preset.name;
    document.getElementById('archetype').value = preset.archetype;
    document.getElementById('backstory').value = preset.backstory;
    document.getElementById('motivation').value = preset.motivation;
    
    // Set MBTI
    if (preset.mbti) {
        Object.entries(preset.mbti).forEach(([dimension, value]) => {
            const element = document.querySelector(`[onclick*="selectMBTI('${dimension}', '${value}'"]`);
            if (element) {
                element.click();
            }
        });
    }
    
    // Set personality traits with animation
    ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'].forEach((trait, index) => {
        setTimeout(() => {
            const slider = document.getElementById(trait);
            slider.value = preset[trait];
            document.getElementById(trait + '-value').textContent = preset[trait];
        }, index * 100);
    });
    
    // Set communication styles
    preset.styles.forEach((style, index) => {
        const styleInput = document.getElementById(`style${index + 1}`);
        if (styleInput) styleInput.value = style;
    });
    
    // Set quirks
    quirks = [...preset.quirks];
    renderQuirks();
    
    // Smooth scroll to personality section
    setTimeout(() => {
        document.getElementById('personality-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 300);
}

// Trait behaviors
function getTraitBehaviors(traitName, value) {
    const behaviors = {
        openness: {
            high: "You are highly curious and imaginative. Often propose unconventional ideas and enjoy exploring abstract concepts.",
            medium: "You balance practicality with creativity. Open to new ideas when they show promise.",
            low: "You are practical and prefer concrete facts. Be cautious about new ideas until proven."
        },
        conscientiousness: {
            high: "You are organized and goal-oriented. Always follow through on plans methodically.",
            medium: "You balance structure with flexibility. Plan ahead but adapt when needed.",
            low: "You are spontaneous and flexible. Prefer to adapt as situations unfold."
        },
        extraversion: {
            high: "You are energetic and talkative. Actively engage and ask many questions.",
            medium: "You balance social interaction with reflection. Engage thoughtfully.",
            low: "You are reserved and thoughtful. Speak concisely and prefer depth over breadth."
        },
        agreeableness: {
            high: "You are empathetic and cooperative. Seek harmony and understanding.",
            medium: "You balance compassion with objectivity. Consider feelings and facts equally.",
            low: "You are direct and analytical. Prioritize truth over comfort."
        },
        neuroticism: {
            high: "You experience emotions intensely. Express uncertainty and vulnerability.",
            medium: "You have a balanced emotional range. Show appropriate emotional responses.",
            low: "You are emotionally stable and calm. Remain composed under pressure."
        }
    };
    
    const level = value > 70 ? 'high' : value < 30 ? 'low' : 'medium';
    return behaviors[traitName][level];
}

function getMBTIBehaviors(type) {
    const behaviors = {
        'E': "Draw energy from interaction. Think out loud and process externally.",
        'I': "Draw energy from reflection. Process internally before sharing thoughts.",
        'S': "Focus on concrete details and present realities. Trust direct experience.",
        'N': "Focus on patterns and future possibilities. Trust intuition and hunches.",
        'T': "Make decisions based on logic and objective analysis. Value truth and fairness.",
        'F': "Make decisions based on values and impact on people. Value harmony and empathy.",
        'J': "Prefer structure and closure. Like to plan ahead and have things settled.",
        'P': "Prefer flexibility and openness. Like to keep options open and adapt as needed."
    };
    
    return type.split('').map(letter => behaviors[letter] || '').filter(b => b);
}

// Generate prompt
function generatePrompt() {
    // Get form values
    const name = document.getElementById('name').value || "Unnamed Character";
    const archetype = document.getElementById('archetype').value || "The Mysterious Figure";
    const backstory = document.getElementById('backstory').value || "A character with an unknown past";
    const motivation = document.getElementById('motivation').value || "To fulfill their purpose";
    
    // Get MBTI type
    const mbtiType = getMBTIType();
    
    // Get trait values
    const traits = {
        openness: parseInt(document.getElementById('openness').value),
        conscientiousness: parseInt(document.getElementById('conscientiousness').value),
        extraversion: parseInt(document.getElementById('extraversion').value),
        agreeableness: parseInt(document.getElementById('agreeableness').value),
        neuroticism: parseInt(document.getElementById('neuroticism').value)
    };
    
    // Get communication styles
    const styles = [
        document.getElementById('style1').value,
        document.getElementById('style2').value,
        document.getElementById('style3').value
    ].filter(s => s.trim());
    
    // Get situational context
    const setting = document.getElementById('setting').value;
    const context = document.getElementById('context').value;
    const mood = document.getElementById('mood').value;
    const objective = document.getElementById('objective').value;
    
    // Build the prompt
    let prompt = `# Meta Instructions for AI Character

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

# Core Persona: ${name}

## Identity
- Archetype: ${archetype}
- Backstory: ${backstory}
- Core Motivation: ${motivation}`;

    // Add MBTI if selected
    if (mbtiType && mbtiType.length === 4) {
        const typeInfo = mbtiTypes[mbtiType];
        prompt += `\n\n## MBTI Personality Type: ${mbtiType} - ${typeInfo.nickname}
- ${typeInfo.description}`;
        
        const mbtiBehaviors = getMBTIBehaviors(mbtiType);
        if (mbtiBehaviors.length > 0) {
            prompt += `\n\n### MBTI Behavioral Guidelines`;
            mbtiBehaviors.forEach(behavior => {
                prompt += `\n- ${behavior}`;
            });
        }
    }

    prompt += `\n\n## Personality Traits (Big Five)`;
    
    // Add trait behaviors
    for (const [trait, value] of Object.entries(traits)) {
        prompt += `\n- ${getTraitBehaviors(trait, value)}`;
    }
    
    // Add communication style
    if (styles.length > 0) {
        prompt += `\n\n## Communication Style`;
        styles.forEach(style => {
            prompt += `\n- ${style}`;
        });
    }
    
    // Add quirks
    if (quirks.length > 0) {
        prompt += `\n\n## Unique Quirks`;
        quirks.forEach(quirk => {
            prompt += `\n- ${quirk}`;
        });
    }
    
    // Add situational context if provided
    if (setting || context || mood || objective) {
        prompt += `\n\n# Current Situation`;
        
        if (setting) {
            prompt += `\n\n## Setting\n${setting}`;
        }
        
        if (context) {
            prompt += `\n\n## Context\n${context}`;
        }
        
        if (mood) {
            prompt += `\n\n## Mood\n${mood}`;
        }
        
        if (objective) {
            prompt += `\n\n## Your Objective\n${objective}`;
        }
    }
    
    // Display the output
    document.getElementById('output-content').textContent = prompt;
    document.getElementById('output-section').style.display = 'block';
    document.getElementById('output-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

// Copy to clipboard
function copyToClipboard() {
    const content = document.getElementById('output-content').textContent;
    navigator.clipboard.writeText(content).then(() => {
        // Change button temporarily
        const button = document.querySelector('.copy-button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span class="material-icons">check</span>Copied!';
        button.style.background = 'var(--primary)';
        button.style.color = 'var(--on-primary)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    });
}

// Clear all
function clearAll() {
    // Clear text inputs
    document.querySelectorAll('.text-input, .textarea').forEach(input => {
        input.value = '';
    });
    
    // Reset sliders
    document.querySelectorAll('.slider').forEach(slider => {
        slider.value = 50;
        document.getElementById(slider.id + '-value').textContent = 50;
    });
    
    // Clear MBTI
    mbtiSelections = {
        energy: null,
        information: null,
        decisions: null,
        lifestyle: null
    };
    
    document.querySelectorAll('.mbti-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    document.querySelectorAll('.mbti-dimension').forEach(dim => {
        dim.classList.remove('selected');
    });
    
    document.getElementById('mbti-result-badge').style.display = 'none';
    
    // Clear quirks
    quirks = [];
    renderQuirks();
    
    // Hide output
    document.getElementById('output-section').style.display = 'none';
    
    // Collapse sections except identity
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index > 0) {
            section.classList.add('collapsed');
        }
    });
}

// Add enter key support for quirk input
document.getElementById('new-quirk').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addQuirk();
    }
});