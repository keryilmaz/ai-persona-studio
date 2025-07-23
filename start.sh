#!/bin/bash

echo "Starting Agent Persona Generator..."
echo ""
echo "Options:"
echo "1. Open web interface (recommended)"
echo "2. Run Python example"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "Python3 found ✓"
else
    echo "Python3 not found. Please install Python 3 to use the Python implementation."
fi

echo ""
echo "Opening web interface..."
echo "File: agent-persona-generator.html"
echo ""

# Try to open in default browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open agent-persona-generator.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open agent-persona-generator.html 2>/dev/null || echo "Please open agent-persona-generator.html in your browser"
else
    echo "Please open agent-persona-generator.html in your browser"
fi

echo ""
echo "To run the Python example:"
echo "  python3 agent_prompt_generator.py"
echo ""
echo "Happy character creating! 🎭"