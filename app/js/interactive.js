// Interactive Exercises Module - Drag & Drop, Timer, Games

// ============================================
// DRAG AND DROP EXERCISES
// ============================================

const DragDrop = {
    currentExercise: null,
    droppedItems: new Map(),

    // Initialize a drag-drop exercise
    init(config) {
        this.currentExercise = config;
        this.droppedItems.clear();
        this.render();
    },

    render() {
        const container = document.getElementById('interactiveArea');
        if (!container) return;

        const { items, targets, type } = this.currentExercise;

        container.innerHTML = `
            <div class="drag-drop-container">
                <div class="drag-items">
                    ${items.map((item, i) => `
                        <div class="drag-item" draggable="true" data-id="${i}" data-value="${item.value}">
                            ${item.display}
                        </div>
                    `).join('')}
                </div>
                <div class="drop-targets">
                    ${targets.map((target, i) => `
                        <div class="drop-target" data-target="${i}" data-answer="${target.answer}">
                            <div class="target-label">${target.label}</div>
                            <div class="target-zone"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        const items = document.querySelectorAll('.drag-item');
        const targets = document.querySelectorAll('.drop-target');

        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.id);
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });

            // Touch support
            item.addEventListener('touchstart', (e) => {
                item.classList.add('dragging');
            });
        });

        targets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault();
                target.classList.add('drag-over');
            });

            target.addEventListener('dragleave', () => {
                target.classList.remove('drag-over');
            });

            target.addEventListener('drop', (e) => {
                e.preventDefault();
                target.classList.remove('drag-over');
                const itemId = e.dataTransfer.getData('text/plain');
                const item = document.querySelector(`[data-id="${itemId}"]`);
                if (item) {
                    const zone = target.querySelector('.target-zone');
                    zone.appendChild(item);
                    item.classList.add('dropped');
                    this.droppedItems.set(itemId, target.dataset.target);
                }
            });
        });
    },

    checkAnswers() {
        let correct = 0;
        const targets = document.querySelectorAll('.drop-target');

        targets.forEach(target => {
            const zone = target.querySelector('.target-zone');
            const items = zone.querySelectorAll('.drag-item');
            const expectedAnswer = target.dataset.answer;

            items.forEach(item => {
                if (item.dataset.value === expectedAnswer) {
                    item.classList.add('correct');
                    correct++;
                } else {
                    item.classList.add('wrong');
                }
            });
        });

        return {
            correct,
            total: this.currentExercise.items.length
        };
    }
};

// ============================================
// TIMER / SPEED CHALLENGE
// ============================================

const Timer = {
    timeLeft: 0,
    interval: null,
    callback: null,
    isPaused: false,

    start(seconds, onTick, onComplete) {
        this.timeLeft = seconds;
        this.callback = onComplete;
        this.isPaused = false;

        this.updateDisplay();

        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateDisplay();

                if (onTick) onTick(this.timeLeft);

                if (this.timeLeft <= 0) {
                    this.stop();
                    if (this.callback) this.callback();
                }
            }
        }, 1000);
    },

    pause() {
        this.isPaused = true;
    },

    resume() {
        this.isPaused = false;
    },

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    addTime(seconds) {
        this.timeLeft += seconds;
        this.updateDisplay();
    },

    updateDisplay() {
        const timerEl = document.getElementById('timerDisplay');
        if (timerEl) {
            const mins = Math.floor(this.timeLeft / 60);
            const secs = this.timeLeft % 60;
            timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            // Color coding
            if (this.timeLeft <= 10) {
                timerEl.classList.add('timer-critical');
            } else if (this.timeLeft <= 30) {
                timerEl.classList.add('timer-warning');
                timerEl.classList.remove('timer-critical');
            } else {
                timerEl.classList.remove('timer-warning', 'timer-critical');
            }
        }
    },

    getTimeLeft() {
        return this.timeLeft;
    }
};

// ============================================
// SPEED CHALLENGE MODE
// ============================================

const SpeedChallenge = {
    score: 0,
    questionsAnswered: 0,
    totalQuestions: 10,
    basePoints: 10,
    bonusMultiplier: 1,

    init(options = {}) {
        this.score = 0;
        this.questionsAnswered = 0;
        this.totalQuestions = options.questions || 10;
        this.basePoints = options.basePoints || 10;
        this.bonusMultiplier = 1;
    },

    calculatePoints(timeLeft, isCorrect) {
        if (!isCorrect) return 0;

        // Base points + time bonus
        let points = this.basePoints;

        // Time bonus: more points for faster answers
        if (timeLeft > 8) points += 5;
        else if (timeLeft > 5) points += 3;
        else if (timeLeft > 2) points += 1;

        // Streak bonus
        points *= this.bonusMultiplier;

        return Math.round(points);
    },

    recordAnswer(isCorrect, timeLeft) {
        this.questionsAnswered++;

        if (isCorrect) {
            const points = this.calculatePoints(timeLeft, true);
            this.score += points;
            this.bonusMultiplier = Math.min(this.bonusMultiplier + 0.2, 3);
            return { points, streak: this.bonusMultiplier };
        } else {
            this.bonusMultiplier = 1;
            return { points: 0, streak: 1 };
        }
    },

    getResults() {
        return {
            score: this.score,
            questionsAnswered: this.questionsAnswered,
            totalQuestions: this.totalQuestions,
            accuracy: Math.round((this.score / (this.totalQuestions * this.basePoints * 1.5)) * 100)
        };
    }
};

// ============================================
// MATCHING GAME (Memory-style)
// ============================================

const MatchingGame = {
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    isLocked: false,

    init(pairs) {
        this.cards = [];
        this.flipped = [];
        this.matched = [];
        this.moves = 0;
        this.isLocked = false;

        // Create card pairs
        pairs.forEach((pair, i) => {
            this.cards.push({ id: i * 2, pairId: i, content: pair.a, type: 'a' });
            this.cards.push({ id: i * 2 + 1, pairId: i, content: pair.b, type: 'b' });
        });

        // Shuffle cards
        this.cards = this.shuffle(this.cards);
        this.render();
    },

    shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    },

    render() {
        const container = document.getElementById('gameArea');
        if (!container) return;

        container.innerHTML = `
            <div class="matching-game">
                <div class="game-stats">
                    <span>Mișcări: <strong id="moveCount">0</strong></span>
                    <span>Perechi: <strong id="pairCount">0/${this.cards.length / 2}</strong></span>
                </div>
                <div class="cards-grid">
                    ${this.cards.map(card => `
                        <div class="memory-card" data-id="${card.id}" data-pair="${card.pairId}">
                            <div class="card-inner">
                                <div class="card-front">?</div>
                                <div class="card-back">${card.content}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
    },

    flipCard(card) {
        if (this.isLocked) return;
        if (this.flipped.includes(card)) return;
        if (this.matched.includes(card.dataset.id)) return;

        card.classList.add('flipped');
        this.flipped.push(card);

        if (this.flipped.length === 2) {
            this.moves++;
            document.getElementById('moveCount').textContent = this.moves;
            this.checkMatch();
        }
    },

    checkMatch() {
        this.isLocked = true;
        const [card1, card2] = this.flipped;

        if (card1.dataset.pair === card2.dataset.pair) {
            // Match!
            this.matched.push(card1.dataset.id, card2.dataset.id);
            card1.classList.add('matched');
            card2.classList.add('matched');

            document.getElementById('pairCount').textContent =
                `${this.matched.length / 2}/${this.cards.length / 2}`;

            this.flipped = [];
            this.isLocked = false;

            if (this.matched.length === this.cards.length) {
                setTimeout(() => this.onComplete(), 500);
            }
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flipped = [];
                this.isLocked = false;
            }, 1000);
        }
    },

    onComplete() {
        const container = document.getElementById('gameArea');
        container.innerHTML += `
            <div class="game-complete">
                <h2>🎉 Felicitări!</h2>
                <p>Ai găsit toate perechile în ${this.moves} mișcări!</p>
                <button class="btn btn--primary" onclick="MatchingGame.restart()">Joacă din nou</button>
            </div>
        `;
    },

    restart() {
        // Reshuffle and reinitialize
        this.cards = this.shuffle(this.cards);
        this.flipped = [];
        this.matched = [];
        this.moves = 0;
        this.isLocked = false;
        this.render();
    }
};

// ============================================
// SORTING GAME
// ============================================

const SortingGame = {
    items: [],
    correctOrder: [],
    currentOrder: [],

    init(items, type = 'numbers') {
        this.correctOrder = [...items].sort((a, b) => a - b);
        this.items = this.shuffle([...items]);
        this.currentOrder = [...this.items];
        this.render();
    },

    shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    },

    render() {
        const container = document.getElementById('gameArea');
        if (!container) return;

        container.innerHTML = `
            <div class="sorting-game">
                <p class="game-instruction">Aranjează numerele în ordine crescătoare (de la mic la mare)!</p>
                <div class="sorting-items" id="sortingItems">
                    ${this.currentOrder.map((item, i) => `
                        <div class="sort-item" draggable="true" data-index="${i}" data-value="${item}">
                            ${item}
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn--primary" onclick="SortingGame.check()">Verifică Ordinea</button>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        const items = document.querySelectorAll('.sort-item');
        let draggedItem = null;

        items.forEach(item => {
            item.addEventListener('dragstart', () => {
                draggedItem = item;
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                draggedItem = null;
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedItem !== item) {
                    const container = document.getElementById('sortingItems');
                    const items = [...container.children];
                    const fromIndex = items.indexOf(draggedItem);
                    const toIndex = items.indexOf(item);

                    if (fromIndex < toIndex) {
                        container.insertBefore(draggedItem, item.nextSibling);
                    } else {
                        container.insertBefore(draggedItem, item);
                    }

                    this.updateOrder();
                }
            });
        });
    },

    updateOrder() {
        const items = document.querySelectorAll('.sort-item');
        this.currentOrder = [...items].map(item => parseInt(item.dataset.value));
    },

    check() {
        const isCorrect = JSON.stringify(this.currentOrder) === JSON.stringify(this.correctOrder);
        const items = document.querySelectorAll('.sort-item');

        items.forEach((item, i) => {
            if (parseInt(item.dataset.value) === this.correctOrder[i]) {
                item.classList.add('correct');
            } else {
                item.classList.add('wrong');
            }
        });

        setTimeout(() => {
            if (isCorrect) {
                alert('🎉 Corect! Bravo!');
            } else {
                alert('❌ Mai încearcă! Ordinea corectă este de la mic la mare.');
                items.forEach(item => item.classList.remove('correct', 'wrong'));
            }
        }, 500);
    }
};

// Export for use
window.InteractiveGames = {
    DragDrop,
    Timer,
    SpeedChallenge,
    MatchingGame,
    SortingGame
};
