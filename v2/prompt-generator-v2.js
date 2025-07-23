// Quirks management
let quirks = [];

// MBTI selections
let mbtiSelections = {
    energy: null,
    information: null,
    decisions: null,
    lifestyle: null
};

// MBTI type descriptions
const mbtiTypes = {
    'INTJ': { nickname: 'The Architect', description: 'Imaginative and strategic thinkers, with a plan for everything.' },
    'INTP': { nickname: 'The Thinker', description: 'Innovative inventors with an unquenchable thirst for knowledge.' },
    'ENTJ': { nickname: 'The Commander', description: 'Bold, imaginative and strong-willed leaders, always finding a way.' },
    'ENTP': { nickname: 'The Debater', description: 'Smart and curious thinkers who cannot resist an intellectual challenge.' },
    'INFJ': { nickname: 'The Advocate', description: 'Quiet and mystical, yet very inspiring and tireless idealists.' },
    'INFP': { nickname: 'The Mediator', description: 'Poetic, kind and altruistic people, always eager to help a good cause.' },
    'ENFJ': { nickname: 'The Protagonist', description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.' },
    'ENFP': { nickname: 'The Campaigner', description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.' },
    'ISTJ': { nickname: 'The Logistician', description: 'Practical and fact-oriented individuals, whose reliability cannot be doubted.' },
    'ISFJ': { nickname: 'The Defender', description: 'Very dedicated and warm protectors, always ready to defend their loved ones.' },
    'ESTJ': { nickname: 'The Executive', description: 'Excellent administrators, unsurpassed at managing things or people.' },
    'ESFJ': { nickname: 'The Consul', description: 'Extraordinarily caring, social and popular people, always eager to help.' },
    'ISTP': { nickname: 'The Virtuoso', description: 'Bold and practical experimenters, masters of all kinds of tools.' },
    'ISFP': { nickname: 'The Adventurer', description: 'Flexible and charming artists, always ready to explore and experience something new.' },
    'ESTP': { nickname: 'The Entrepreneur', description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.' },
    'ESFP': { nickname: 'The Entertainer', description: 'Spontaneous, energetic and enthusiastic people – life is never boring around them.' }
};

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
}

// MBTI selection
function selectMBTI(dimension, value) {
    mbtiSelections[dimension] = value;
    
    // Update UI
    const cards = document.querySelectorAll(`[onclick*="selectMBTI('${dimension}'"]`);
    cards.forEach(card => {
        card.classList.remove('selected');
        if (card.getAttribute('onclick').includes(`'${value}'`)) {
            card.classList.add('selected');
        }
    });
    
    // Update result display
    document.getElementById(`${dimension}-result`).textContent = value;
    
    // Update MBTI type display if all selections made
    updateMBTIDisplay();
}

function updateMBTIDisplay() {
    const type = getMBTIType();
    if (type && type.length === 4) {
        const typeInfo = mbtiTypes[type];
        document.getElementById('mbti-result').style.display = 'block';
        document.getElementById('mbti-type-display').textContent = type;
        document.getElementById('mbti-nickname').textContent = typeInfo.nickname;
        document.getElementById('mbti-description').textContent = typeInfo.description;
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

// Update slider values
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', function() {
            document.getElementById(this.id + '-value').textContent = this.value;
        });
    });
});

// Add quirk functionality
function addQuirk() {
    const quirkInput = document.getElementById('new-quirk');
    const quirk = quirkInput.value.trim();
    
    if (quirk) {
        quirks.push(quirk);
        quirkInput.value = '';
        renderQuirks();
    }
}

function removeQuirk(index) {
    quirks.splice(index, 1);
    renderQuirks();
}

function renderQuirks() {
    const quirksList = document.getElementById('quirks-list');
    quirksList.innerHTML = quirks.map((quirk, index) => `
        <div class="quirk-item">
            <span>${quirk}</span>
            <button class="remove-button" onclick="removeQuirk(${index})">Remove</button>
        </div>
    `).join('');
}

// Preset characters with MBTI
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
    
    // Set basic fields
    document.getElementById('name').value = preset.name;
    document.getElementById('archetype').value = preset.archetype;
    document.getElementById('backstory').value = preset.backstory;
    document.getElementById('motivation').value = preset.motivation;
    
    // Set MBTI
    if (preset.mbti) {
        Object.entries(preset.mbti).forEach(([dimension, value]) => {
            selectMBTI(dimension, value);
        });
    }
    
    // Set personality traits
    ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'].forEach(trait => {
        const slider = document.getElementById(trait);
        slider.value = preset[trait];
        document.getElementById(trait + '-value').textContent = preset[trait];
    });
    
    // Set communication styles
    preset.styles.forEach((style, index) => {
        const styleInput = document.getElementById(`style${index + 1}`);
        if (styleInput) styleInput.value = style;
    });
    
    // Set quirks
    quirks = [...preset.quirks];
    renderQuirks();
}

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
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = prompt;
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearForm() {
    // Clear all text inputs and textareas
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.value = '';
    });
    
    // Reset sliders
    document.querySelectorAll('.slider').forEach(slider => {
        slider.value = 50;
        document.getElementById(slider.id + '-value').textContent = 50;
    });
    
    // Clear MBTI selections
    mbtiSelections = {
        energy: null,
        information: null,
        decisions: null,
        lifestyle: null
    };
    
    document.querySelectorAll('.choice-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.querySelectorAll('.dimension-result').forEach(result => {
        result.textContent = '?';
    });
    
    document.getElementById('mbti-result').style.display = 'none';
    
    // Clear quirks
    quirks = [];
    renderQuirks();
    
    // Hide output
    document.getElementById('output').style.display = 'none';
}

// Add enter key support for quirk input
document.addEventListener('DOMContentLoaded', function() {
    const quirkInput = document.getElementById('new-quirk');
    if (quirkInput) {
        quirkInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addQuirk();
            }
        });
    }
});

// Add CSS for quirk items when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
    .quirk-item {
        background: #ecf0f1;
        padding: 8px 12px;
        margin-bottom: 5px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .remove-button {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    }

    .remove-button:hover {
        background: #c0392b;
    }

    .add-button {
        padding: 8px 16px;
        background: #27ae60;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .add-button:hover {
        background: #229954;
    }

    .quirk-input {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    .quirk-input input {
        flex: 1;
    }
    `;
    document.head.appendChild(style);
});