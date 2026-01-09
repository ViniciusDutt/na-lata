# Na Lata 🥫

**Na Lata** is a daily puzzle game where players must restore the correct order of a **4×2 grid of cans** using logic, memory, and spatial reasoning.

Each day presents a **new unique puzzle**, encouraging short, repeatable play sessions.

---

## 🌐 Live Demo

Play the game here:  
👉 https://na-lata.vercel.app

---

## 🎮 Gameplay Overview

The game starts with **8 cans placed in a randomized order**.  
The goal is to rearrange them into their **correct positions**.

Players can drag and drop cans to swap their positions until the puzzle is solved.

---

## 🕹️ Game Modes

### ⏱️ Time Attack Mode
- Players race against the clock
- Every move immediately updates the number of cans in the correct position
- The game ends when:
  - All cans are correctly placed, or
  - Time runs out

This mode emphasizes speed and quick decision-making.

---

### 🎯 Limited Attempts Mode
- Players can rearrange cans freely
- Feedback is **not shown immediately**
- Players must click a **check button** to see how many cans are in the correct position
- The player has **15 total attempts** to find the correct arrangement

This mode focuses on strategy, deduction, and planning.

---

## 📅 Daily Puzzle Logic

- Each day generates a **new fixed puzzle**
- The puzzle order is based on the **current date**, acting as a deterministic seed
- This guarantees:
  - One unique puzzle per day
  - The same solution for all players on that day

---

## 🧩 Features

- Drag & drop interactions
- Two distinct gameplay modes
- Daily puzzle system
- Immediate vs delayed feedback mechanics
- Clean, responsive UI

---

## 🧪 Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **@dnd-kit** (drag and drop)

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
