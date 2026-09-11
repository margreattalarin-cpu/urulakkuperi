<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# URULAKKUPPERI (ഉരുളക്കുപ്പേരി) 🎯


## Basic Details
### Team Name:pointless


### Team Members

- Member 1: Talarin Miranda- SNMIMT Maliankara
- Member 2: Sayoojya K.S-SNMIMT Maliankara

### Project Description
URULAKKUPPERI is a satirical Kerala debate comedy web application where users can state any opinion, only to be relentlessly contradicted by stubborn Malayali AI archetypes (Ammachi, WhatsApp Uncle, Judgemental Aunty, Bangalore Tech Bro, and Cynical Cinema Critic). It features real-time browser voice input (Speech-to-Text) and natural Malayalam/Manglish speech synthesis (TTS), wrapped in a vibrant retro Kerala tea-shop comic aesthetic.

### The Problem (that doesn't exist)
People in real life, family gatherings, and WhatsApp groups actually expect rational, calm, open-minded debates where the other person listens to facts, admits mistakes, and gracefully concedes that you have a point.

### The Solution (that nobody asked for)
URULAKKUPPERI: An AI argument simulator that guarantees 100% contrarian defiance. No matter how universally accepted your point is (e.g. *"Water is wet"*, *"The sun rises in the east"*), the AI refuses to agree, moves the goalposts, cites unverified WhatsApp University forwards, and claps back with punchy, sarcastic 1-2 sentence comebacks in conversational Malayalam and Manglish spoken aloud with authentic Kerala pronunciation.

## Technical Details
### Technologies/Components Used
For Software:
- Languages: TypeScript, JavaScript, HTML5, CSS3
- Frameworks: React 19, Vite, Express.js
- Libraries: `@google/genai` (Google Gemini API), Lucide React, Canvas Confetti, Tailwind CSS
- Tools: Web Speech API (`SpeechRecognition` for voice input, `SpeechSynthesis` for Malayalam/Manglish TTS), PostCSS

For Hardware:
- *N/A (Pure Software Web Application)*

### Implementation
For Software:
# Installation
```bash
# Clone repository
git clone https://github.com/margreattalarin-cpu/useless_project_temp.git
cd useless_project_temp

# Install dependencies
npm install
```

# Run
```bash
# Set up environment variables (.env)
cp .env.example .env
# Add your GEMINI_API_KEY in .env

# Start both backend server (port 3001) and Vite client (port 5173)
npm run dev
```

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot1](<img width="1526" height="722" alt="Screenshot 2026-09-12 033932" src="https://github.com/user-attachments/assets/25d7df80-596f-4c77-afcf-6b298147cf16" />
)
*Hero Landing Page: Hand-painted Kerala comedy poster typography ("URULAKKUPPERI" / "ഉരുളക്കുപ്പേരി"), character selection cards, and debate controls.*

![Screenshot2](<img width="1532" height="707" alt="Screenshot 2026-09-12 033954" src="https://github.com/user-attachments/assets/a1a74f2b-73ff-4f0c-878e-d5eafd577027" />
)
*Live Argument Arena: WhatsApp-style casual debate screen with dynamic stubbornness meter (88%), confidence tracker, and real-time fallacy tagging ("Unverified UNESCO Forward").*

<img width="1530" height="722" alt="Screenshot 2026-09-12 034304" src="https://github.com/user-attachments/assets/af1cb169-7d79-4154-9ad0-7b556b9ab2a2" />

*Speech Interaction: Push-to-talk voice recognition (STT) with audio level waves and natural Malayalam/Manglish speech output (TTS).*

# Diagrams
![Workflow](https://mermaid.ink/img/pako:eNptkctuwjAMhl_F8nkh-wAuVFs3aEKbxoWbh5Dk0FppkzhJjWrfvZSmjZOm9if_f7a_bE5VJY1Fv9Pq5Kxgd_Q4Ojhj7w4jFzrn9u7gC08s9f61b17qFvhR021v3vI84G5YF_iX5954N76yG-5m3r111jM_031lD_T_W_v1v7q-4b-1z563H_V3Xv3w1-rfP-7b78_b7_X9e__-e-_eew_4e_gE8_gL1w?type=png)

```mermaid
graph TD
    A[User Voice Input / Mic] -->|Push-to-Talk| B[Browser SpeechRecognition]
    B -->|Transcribed Text| C[React 19 Frontend App]
    C -->|POST /api/argument| D[Node.js Express Backend]
    D -->|Context & Character Persona| E[Google Gemini AI Engine]
    E -->|Structured Satirical Comeback JSON| D
    D -->|Fallacy, Metric Updates, Counterargument| C
    C --> F[Chat UI & Animated Stubbornness Meter]
    C --> G[Intelligent TTS Voice Router]
    G -->|Malayalam Unicode Script| H[ml-IN Neural Voice: Sobhana/Midhun]
    G -->|Manglish Latin Script| I[en-IN Indian English Voice: Neerja/Prabhat]
    G -->|Standard English| J[en-US Character Voice: Zira/David]
```
*Architecture & Data Workflow: End-to-end flow from browser push-to-talk speech input to Gemini contrarian logic and script-aware TTS speech output.*

For Hardware:

# Schematic & Circuit
*N/A (Software Project)*

# Build Photos
*N/A (Software Project)*

### Project Demo
# Video
[Add your demo video link here]
*Demonstrates starting a debate, voice recognition, real-time Gemini contrarian comebacks, and Malayalam speech synthesis.*

# Additional Demos
- Web Application: `http://localhost:5173`
- Backend API Status: `http://localhost:3001/api/health`
- Character Catalog API: `http://localhost:3001/api/characters`

## Team Contributions
- [Team Lead Name]: [Full-stack architecture, Gemini AI integration, Malayalam/Manglish TTS engine, UI styling]
- [Member 2 Name]: [Voice input implementation, character prompts design, testing]
- [Member 3 Name]: [Documentation, asset design, audio effects]

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
