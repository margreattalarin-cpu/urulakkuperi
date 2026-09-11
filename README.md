<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# URULAKKUPPERI (ഉരുളക്കുപ്പേരി) 🎯
> *"Where every opinion is wrong."*

## Basic Details
### Team Name: URULAKKUPPERI

### Project Description
A satirical Kerala debate comedy web application where you can argue any opinion against stubborn Malayali AI archetypes (Ammachi, WhatsApp Uncle, Judgemental Aunty, Bangalore Tech Bro, Cynical Cinema Critic, etc.). Features real-time browser speech recognition (voice input) and natural Malayalam/Manglish speech synthesis (TTS).

### The Problem (that doesn't exist)
People in real life and Kerala family WhatsApp groups actually expect rational, calm, open-minded conversations where the other party admits you have a good point.

### The Solution (that nobody asked for)
URULAKKUPPERI: An AI argument engine that refuses to agree with you under any circumstances. No matter what opinion you hold, the AI contradicts you with relentless stubbornness, moves the goalposts, cites ridiculous WhatsApp forwards, and claps back with punchy, sarcastic Kerala comebacks (strictly under 30 words) spoken aloud in natural conversational Malayalam or Manglish.

---

## Technical Details
### Technologies/Components Used
For Software:
- **Languages**: TypeScript, JavaScript, HTML5, CSS3
- **Frontend Framework**: React 19, Vite, Tailwind CSS
- **Backend Framework**: Node.js, Express.js
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Speech Technologies**: Web Speech API (`SpeechRecognition` for voice input, `SpeechSynthesis` for Malayalam/Manglish speech output)
- **UI & Animation**: Lucide React, Canvas Confetti

---

## Key Features
- **Satirical Malayali Archetypes**:
  - **Ammachi**: Nostalgic matriarch who guilt-trips and compares everything to *"njangalude kaalathu"*.
  - **WhatsApp Uncle**: Dean of WhatsApp University citing unverified NASA/UNESCO forwards.
  - **Judgemental Aunty**: Passive-aggressive relative comparing you to Sharmaji's son in Dubai.
  - **Bangalore Tech Bro**: Jargon-spewing founder talking about synergy, 10M DAUs, and pivots.
  - **Cynical Cinema Critic**: Dissects commercial hits and declares all popular movies derivative.
- **Natural Malayalam/Manglish TTS**:
  - Automatically routes Malayalam script to Malayalam-capable neural voices (`ml-IN`).
  - Routes Manglish conversations to Indian English phonetics (`en-IN`).
  - Preserves standard English speech synthesis for English debates.
- **Voice Input (Speech-to-Text)**: Push-to-talk mic button for speech input directly in browser.
- **Kerala Retro Visual Identity**: Hand-painted comic poster typography, tea-shop warmth, vibrant colors.

---

## Implementation
### Installation
```bash
git clone https://github.com/margreattalarin-cpu/useless_project_temp.git
cd useless_project_temp
npm install
```

### Environment Setup
Create a `.env` file in the root directory (see `.env.example`):
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run Locally
```bash
npm run dev
```
- Web Client: `http://localhost:5173`
- Backend Server: `http://localhost:3001`

---

Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
