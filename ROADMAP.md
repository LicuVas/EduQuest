# Daughters Education Project

## Mission

Create a comprehensive, AI-powered educational support system for Rebecca and Brianna that:
- Provides age-appropriate learning materials
- Tracks progress and homework completion
- Adapts to Romanian curriculum standards
- Makes learning engaging and interactive

---

## The Students

### Rebecca (Re, Rebi)
- **Born:** 2016-07-07
- **Age:** 10 years old (as of Sept 2026)
- **Grade:** Clasa a IV-a (4th grade, 2026-2027)
- **Archived:** programa anterioară în `curriculum/programa_clasa_III.json` (status: depasit)
- **Focus Areas:**
  - Romanian reading & writing (citire, scriere, gramatică)
  - English (A1+)
  - Mathematics (numere 0–1 000 000, fracții, zecimale, perimetru/arie)
  - Informatică (fișiere, foldere)

### Brianna (Bri, Briosh, Bryosh)
- **Born:** 2018-06-08
- **Age:** 8 years old (as of Sept 2026)
- **Grade:** Clasa a II-a (2nd grade, 2026-2027)
- **Archived:** programa anterioară în `curriculum/programa_clasa_I.json` (status: depasit)
- **Focus Areas:**
  - Romanian reading (propoziții, texte scurte)
  - English (beginner, vocabulary)
  - Mathematics (numere 0–100, adunare/scădere cu trecere)
  - Writing short sentences

---

## Core Subjects

### 1. Romanian Language (Limba Română)
- **Rebecca (Clasa a IV-a):**
  - Reading comprehension
  - Dictation (dictări)
  - Grammar (substantiv, verb, adjectiv, pronume)
  - Creative writing
  - Poezii și povești

- **Brianna (Clasa a II-a):**
  - Reading short texts
  - Writing sentences
  - Simple words and sentences
  - Nouns and verbs (intro)

### 2. English Language (Limba Engleză)
- **Rebecca:**
  - Vocabulary building (300+ words)
  - Simple sentences
  - Reading short texts
  - Basic conversation

- **Brianna:**
  - Colors, numbers, animals
  - Simple vocabulary (50-100 words)
  - Songs and rhymes
  - Visual flashcards

### 3. Mathematics (Matematică)
- **Rebecca (Clasa a IV-a):**
  - Numbers 0–1 000 000
  - All four operations
  - Fractions and decimals
  - Word problems
  - Perimeter and area

- **Brianna (Clasa a II-a):**
  - Numbers 0-100
  - Addition/subtraction to 100 (with regrouping)
  - Repeated addition (intro to multiplication)
  - Simple patterns
  - Shapes recognition

---

## System Architecture

### Phase 1: Basic Materials System
```
DaughtersEducation/
├── materials/
│   ├── rebecca/
│   │   ├── romana/
│   │   ├── engleza/
│   │   └── matematica/
│   └── brianna/
│       ├── romana/
│       ├── engleza/
│       └── matematica/
├── homework/
│   ├── assigned/
│   └── completed/
├── progress/
│   ├── rebecca_progress.json
│   └── brianna_progress.json
└── templates/
    ├── worksheet.html
    └── quiz.html
```

### Phase 2: Interactive Web System
- Local web server (Flask/FastAPI)
- Simple login for each child
- Interactive exercises
- Progress tracking dashboard
- Parent monitoring view

### Phase 3: AI-Assisted Learning
- Generate personalized worksheets
- Adaptive difficulty
- Automatic grading
- Learning gap detection
- Suggestions for improvement

---

## Material Types

1. **Worksheets (Fișe de lucru)**
   - Printable PDFs
   - Fill-in exercises
   - Coloring pages (Brianna)

2. **Interactive Quizzes**
   - Multiple choice
   - Drag and drop
   - Immediate feedback

3. **Reading Materials**
   - Short stories
   - Poezii
   - Comprehension questions

4. **Games**
   - Word matching
   - Math puzzles
   - Memory games

5. **Video Links**
   - Educational YouTube
   - Romanian children's content
   - English learning videos

---

## Progress Tracking

### For Each Child:
- Daily tasks completed
- Scores on quizzes
- Time spent learning
- Areas of strength/weakness
- Streak tracking (consecutive days)

### Parent Dashboard:
- Overview of both children
- Homework status
- Notifications for pending work
- Weekly/monthly reports

---

## Implementation Phases

### Phase 1: Foundation (Current)
- [x] Create project structure
- [ ] Define curriculum alignment for each grade
- [ ] Create first batch of materials (5 per subject)
- [ ] Set up basic progress tracking

### Phase 2: Content Development
- [ ] Build material templates
- [ ] Create 30-day curriculum plans
- [ ] Record progress in JSON/database
- [ ] Generate printable worksheets

### Phase 3: Interactive System
- [ ] Build web interface
- [ ] Add child login
- [ ] Implement exercise system
- [ ] Add gamification (stars, badges)

### Phase 4: AI Enhancement
- [ ] Auto-generate exercises
- [ ] Adaptive difficulty
- [ ] Voice interaction option
- [ ] Parent reports via AI

---

## Immediate Actions

1. [ ] Get current school curriculum for each grade
2. [ ] Find out what they're currently studying
3. [ ] Create first week of materials
4. [ ] Set up progress tracking file

---

## Resources

### Romanian Curriculum:
- Programa școlară clasa a II-a (2026-2027) — `curriculum/programa_clasa_II.json`
- Programa școlară clasa a IV-a (2026-2027) — `curriculum/programa_clasa_IV.json`
- Arhivă (depasit): `curriculum/programa_clasa_I.json`, `curriculum/programa_clasa_III.json`
- Manuale.edu.ro

### English Resources:
- Starfall.com
- ABCya.com
- British Council Kids

### Math Resources:
- Khanacademy.org (Romanian available)
- Matific
- Mathseeds

---

## Notes

- Learning should be fun, not punishment
- 15-20 minutes per subject is enough
- Mix digital and paper activities
- Reward system for consistency
- Dad (you) can review completed work via AI secretary

---

**Created:** 2026-01-08
**Updated:** 2026-09-19 (anul curent 2026-2027: Rebecca IV, Brianna II)
**Status:** Anul școlar 2026-2027
