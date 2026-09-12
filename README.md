<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



#urulakkuperi 🎯


## Basic Details
### Team Name: pointless


### Team Members

- Member 1: Talarin Miranda - SNMIMT Maliankara
- Member 2:  - Sayoojya K.S - SNMIMT Maliankara

### Project Description
URULAKKUPPERI is an intentionally useless AI argument simulator inspired by the familiar Kerala characters we see around us. Choose a character, make a claim, and watch the AI argue back with its own personality, memory, and increasing stubbornness.

It supports Malayalam, Manglish, English, and voice interaction, turning everyday opinions into unnecessarily serious arguments.
### The Problem (that doesn't exist)

People have opinions. Sometimes, tragically, nobody is around to tell them they're wrong. URULAKKUPPERI solves this completely unnecessary crisis.

### The Solution (that nobody asked for)

An AI that argues with you for absolutely no productive reason. Pick a character, say something, and watch it disagree using personality, memory, stubbornness, Malayalam/Manglish humor, and increasingly questionable logic.

## Technical Details
### Technologies/Components Used
For Software:
- Languages: TypeScript, JavaScript, HTML, CSS
- Frameworks: React, Vite, Tailwind CSS
- Libraries/APIs: Google Gemini API, Web Speech API
- AI: Gemini for contextual arguments and character-based responses
- Voice: Browser speech recognition + text-to-speech
- Tools: Google Antigravity, GitHub, Vercel
-Deployment: Vercel



### Implementation
For Software:
# Installation
npm install

Create a .env file in the project root:
GEMINI_API_KEY=your_api_key_here

# Run
npm run dev

### Project Documentation
For Software:

URULAKKUPPERI is a character-driven AI argument simulator inspired by the everyday personalities and conversations familiar to us in Kerala. Instead of creating generic AI personas, we turned recognizable characters around us—like the “Njangalude kaalathu…” Ammachi, the overly confident uncle, the “Njan parayunnilla, but…” aunty, and the tech-savvy friend—into interactive AI personalities.

Built during the 18-hour TinkerHub Useless Projects 3.0 makeathon, the project combines conversational AI, character design, voice interaction, and regional humor to create something intentionally unnecessary but genuinely entertaining.

Users choose a character and present an opinion or claim. Gemini understands the context and responds with a character-specific counterargument rather than simply repeating “no.” The AI remembers earlier statements, notices contradictions, and becomes progressively more stubborn through a 0–100 stubbornness system, moving from calm disagreement to increasingly chaotic arguments.

The experience supports English, Malayalam, Manglish, and mixed-language conversations, along with voice interaction, making the characters feel closer to the way people actually communicate around us.

The goal was not to build another generic chatbot, but to turn familiar Kerala social personalities and everyday arguments into a playful AI experience—something that feels culturally recognizable, conversational, and completely useless.

# Screenshots 

<img width="1521" height="713" alt="Screenshot 2026-09-12 102645" src="https://github.com/user-attachments/assets/735770eb-3970-4737-ae32-6327da6efa9d" />

*The landing page introducing URULAKKUPPERI and its unnecessarily serious mission to argue with you.*

<img width="1532" height="707" alt="Screenshot 2026-09-12 033954" src="https://github.com/user-attachments/assets/7fa280e0-784a-4b48-8ded-a400f4e6ae53" />

*The character selection screen where users choose which Kerala-inspired personality they want to argue with.*

<img width="1535" height="730" alt="Screenshot 2026-09-12 034048" src="https://github.com/user-attachments/assets/ce564a35-4295-47d6-98cf-976ceee31fda" />

*The main argument screen showing the selected character, AI responses, conversation, and increasing stubbornness.*
# Diagrams

                    ┌─────────────────────┐
                    │       USER          │
                    │  Makes a claim /    │
                    │  gives an opinion   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   CHOOSE CHARACTER  │
                    │                     │
                    │ Ammachi / Uncle /   │
                    │ Aunty / Tech Bro /  │
                    │ Average Malayali / │
                    │ Final Boss          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   CONVERSATION      │
                    │      CONTEXT        │
                    │                     │
                    │ Previous messages   │
                    │ + current claim     │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
      ┌──────────────────┐        ┌──────────────────┐
      │   CHARACTER      │        │   STUBBORNNESS   │
      │   PERSONALITY    │        │      SYSTEM      │
      │                  │        │                  │
      │ Tone + behaviour │        │ 0 ────────► 100 │
      └────────┬─────────┘        └────────┬─────────┘
               │                           │
               └─────────────┬─────────────┘
                             ▼
                    ┌─────────────────────┐
                    │    GEMINI AI        │
                    │                     │
                    │ Understands claim   │
                    │ + context + persona │
                    │ + stubbornness       │
                    │                     │
                    │ Generates a         │
                    │ counterargument      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    AI RESPONSE      │
                    │                     │
                    │ Malayalam /         │
                    │ Manglish / English  │
                    │ + character humour  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   USER RESPONDS     │
                    │                     │
                    │ Argument continues  │
                    └──────────┬──────────┘
                               │
                               └──────► LOOP
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  FINAL VERDICT   │
                              │                  │
                              │ YOU WON / LOST   │
                              │      / DRAW      │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │    CERTIFICATE   │
                              │                  │
                              │ Certified        │
                              │ Argument Survivor│
                              └──────────────────┘
*URULAKKUPPERI workflow showing how a user's claim passes through the selected character and Gemini, while conversation memory and stubbornness shape the AI's response and final verdict.*
### Project Demo
# Video
[Add your demo video link here]
*Explain what the video demonstrates*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- [Name 1]: [Specific contributions]
- [Name 2]: [Specific contributions]
- [Name 3]: [Specific contributions]

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



