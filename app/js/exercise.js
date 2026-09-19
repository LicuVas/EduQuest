// Exercise Engine for EduQuest
// Content by profile and current school year 2026-2027

// ============================================
// CLASA II - BRIANNA
// Matematică: numere 0-100, adunări/scăderi cu trecere
// Română: propoziții, texte scurte
// Engleză: culori, numere 1-20, familie, animale
// ============================================

// ============================================
// CLASA IV - REBECCA
// Matematică: 0-1 000 000, fracții, zecimale, perimetru/arie
// Română: gramatică, lectură, compunere
// Engleză: vocabular A1+, propoziții
// Informatică: fișiere, foldere
// ============================================

const EXERCISES = {
    matematica: {
        // BRIANNA - Clasa a II-a - numere 0-100
        brianna: [
            // Adunări simple 0-10
            {
                type: 'math', q: '{a} + {b} = ?', gen: () => {
                    const a = rand(1, 5), b = rand(1, 5);
                    return { vars: { a, b }, ans: a + b, hint: '🖐️ Degete!' };
                }
            },
            {
                type: 'math', q: '{a} + {b} = ?', gen: () => {
                    const a = rand(2, 8), b = rand(1, 3);
                    return { vars: { a, b }, ans: a + b, hint: '🖐️ Numără!' };
                }
            },
            {
                type: 'math', q: '{a} + {b} = ?', gen: () => {
                    const a = rand(0, 5), b = rand(0, 5);
                    return { vars: { a, b }, ans: a + b, hint: '✋ + 🖐️' };
                }
            },
            // Scăderi simple 0-10
            {
                type: 'math', q: '{a} - {b} = ?', gen: () => {
                    const a = rand(5, 10), b = rand(1, 4);
                    return { vars: { a, b }, ans: a - b, hint: '👇 Scoate!' };
                }
            },
            {
                type: 'math', q: '{a} - {b} = ?', gen: () => {
                    const a = rand(3, 8), b = rand(1, 2);
                    return { vars: { a, b }, ans: a - b, hint: '✋ minus' };
                }
            },
            // Numărare obiecte - VIZUAL
            {
                type: 'choice', q: 'Câte? {e}', gen: () => {
                    const emojis = ['🍎', '⭐', '🌸', '🦋', '🐱', '❤️', '🌈', '🍪', '🎈', '🌻'];
                    const emoji = emojis[rand(0, emojis.length - 1)];
                    const n = rand(2, 7);
                    const display = emoji.repeat(n);
                    const opts = shuffle([n, n + 1, Math.max(1, n - 1), n + 2]).slice(0, 4);
                    return { vars: { e: display }, opts, ans: n, hint: '👆 Numără!' };
                }
            },
            {
                type: 'choice', q: 'Câte? {e}', gen: () => {
                    const emojis = ['🐶', '🐱', '🐰', '🐻', '🦊', '🐸'];
                    const emoji = emojis[rand(0, emojis.length - 1)];
                    const n = rand(3, 8);
                    const display = emoji.repeat(n);
                    const opts = shuffle([n, n + 1, Math.max(1, n - 1), n + 2]).slice(0, 4);
                    return { vars: { e: display }, opts, ans: n, hint: '🔢 1, 2, 3...' };
                }
            },
            // Comparare numere
            {
                type: 'choice', q: '📈 Care e mai MARE?', gen: () => {
                    let a = rand(1, 10), b = rand(1, 10);
                    if (a === b) b = a + 1;
                    const correct = Math.max(a, b);
                    return { vars: {}, opts: [a, b], ans: correct, hint: '🔝 Sus!' };
                }
            },
            {
                type: 'choice', q: '📉 Care e mai MIC?', gen: () => {
                    let a = rand(1, 10), b = rand(1, 10);
                    if (a === b) b = a + 1;
                    const correct = Math.min(a, b);
                    return { vars: {}, opts: [a, b], ans: correct, hint: '👇 Jos!' };
                }
            },
            // Ce urmează în șir
            {
                type: 'choice', q: '➡️ Ce urmează? {seq}, ?', gen: () => {
                    const start = rand(1, 7);
                    const seq = `${start}, ${start + 1}, ${start + 2}`;
                    const answer = start + 3;
                    const opts = shuffle([answer, answer + 1, answer - 1, answer + 2]);
                    return { vars: { seq }, opts, ans: answer, hint: '+1 +1 +1' };
                }
            },
            // Degete - VIZUAL
            {
                type: 'choice', q: '✋ = ?', gen: () => {
                    return { vars: {}, opts: shuffle([5, 4, 6, 3]), ans: 5, hint: '5️⃣' };
                }
            },
            {
                type: 'choice', q: '✌️ = ?', gen: () => {
                    return { vars: {}, opts: shuffle([2, 3, 1, 4]), ans: 2, hint: '2️⃣' };
                }
            },
            {
                type: 'choice', q: '👆 = ?', gen: () => {
                    return { vars: {}, opts: shuffle([1, 2, 3, 0]), ans: 1, hint: '1️⃣' };
                }
            },
            // Vecinii numerelor
            {
                type: 'choice', q: 'Vecin: {n} → ?', gen: () => {
                    const n = rand(2, 8);
                    const answer = n + 1;
                    return { vars: { n }, opts: shuffle([answer, n - 1, n + 2, n]), ans: answer, hint: '➡️ +1' };
                }
            },
            // ============ EXERCIȚII NOI BRIANNA MATEMATICĂ ============
            // Adunări cu 0
            {
                type: 'math', q: '{a} + 0 = ?', gen: () => {
                    const a = rand(1, 10);
                    return { vars: { a }, ans: a, hint: '➕0 = la fel!' };
                }
            },
            // Dublu
            {
                type: 'math', q: '🔄 {a} + {a} = ?', gen: () => {
                    const a = rand(1, 5);
                    return { vars: { a }, ans: a * 2, hint: 'Dublu!' };
                }
            },
            // Numere lipsă
            {
                type: 'choice', q: '{a} + ? = {c}', gen: () => {
                    const a = rand(1, 5), b = rand(1, 5);
                    const c = a + b;
                    return { vars: { a, c }, opts: shuffle([b, b+1, b-1 || 1, b+2]), ans: b, hint: '🤔 Ce lipsește?' };
                }
            },
            // Zero
            {
                type: 'choice', q: '0️⃣ Câte mere? 🍽️ (farfurie goală)', gen: () => {
                    return { vars: {}, opts: shuffle([0, 1, 2, 3]), ans: 0, hint: 'Goală = 0' };
                }
            },
            // Forme geometrice
            {
                type: 'choice', q: '🔷 Ce formă e asta?', gen: () => {
                    const shapes = [
                        { emoji: '⬜', ans: 'pătrat' },
                        { emoji: '🔺', ans: 'triunghi' },
                        { emoji: '⭕', ans: 'cerc' }
                    ];
                    const shape = shapes[rand(0, shapes.length - 1)];
                    return { vars: {}, question: `Ce formă? ${shape.emoji}`, opts: shuffle(['pătrat', 'triunghi', 'cerc', 'dreptunghi']), ans: shape.ans, hint: '🔍 Privește!' };
                }
            },
            // Ordine crescătoare
            {
                type: 'choice', q: '📈 Care e primul? 1, 2, ...', gen: () => {
                    const nums = [3, 4, 5];
                    return { vars: {}, opts: shuffle(nums.concat([6])), ans: 3, hint: '1→2→3' };
                }
            },
            // Jumătate vizuală
            {
                type: 'choice', q: '🍕 Câte felii? 🍕/2', gen: () => {
                    return { vars: {}, opts: shuffle([4, 3, 5, 6]), ans: 4, hint: '8 ÷ 2 = 4' };
                }
            },
            // Par/Impar vizual
            {
                type: 'choice', q: '👫 Se pot împărți în perechi? {n}', gen: () => {
                    const n = rand(2, 10);
                    const isPair = n % 2 === 0;
                    return { vars: { n }, opts: ['Da ✅', 'Nu ❌'], ans: isPair ? 'Da ✅' : 'Nu ❌', hint: isPair ? '👫👫' : '👫👤' };
                }
            },
            // Plus unu, minus unu
            {
                type: 'math', q: '➕1️⃣ {a} + 1 = ?', gen: () => {
                    const a = rand(0, 9);
                    return { vars: { a }, ans: a + 1, hint: 'Următorul!' };
                }
            },
            {
                type: 'math', q: '➖1️⃣ {a} - 1 = ?', gen: () => {
                    const a = rand(2, 10);
                    return { vars: { a }, ans: a - 1, hint: 'Precedentul!' };
                }
            },
            // Numere până la 20
            {
                type: 'math', q: '{a} + {b} = ?', gen: () => {
                    const a = rand(5, 12), b = rand(2, 7);
                    return { vars: { a, b }, ans: a + b, hint: '🔢 Numără!' };
                }
            },
            // Unde e mai mult?
            {
                type: 'choice', q: '🍎🍎🍎 sau 🍎🍎 - unde e MAI MULT?', gen: () => {
                    return { vars: {}, opts: ['🍎🍎🍎 (3)', '🍎🍎 (2)'], ans: '🍎🍎🍎 (3)', hint: '3 > 2' };
                }
            },
            // Completează
            {
                type: 'choice', q: '5, 6, 7, ?, 9', gen: () => {
                    return { vars: {}, opts: shuffle([8, 7, 10, 6]), ans: 8, hint: '7+1=?' };
                }
            },
            // Scădere vizuală
            {
                type: 'choice', q: '🍪🍪🍪 mănânci 🍪 - câte rămân?', gen: () => {
                    return { vars: {}, opts: shuffle([2, 1, 3, 4]), ans: 2, hint: '3-1=2' };
                }
            },
            // Clasa a II-a: 0-100
            {
                type: 'math', q: '{a} + {b} = ?', gen: () => {
                    const a = rand(20, 50), b = rand(10, 40);
                    return { vars: { a, b }, ans: a + b, hint: 'Zeci, apoi unități' };
                }
            },
            {
                type: 'math', q: '{a} - {b} = ?', gen: () => {
                    const a = rand(40, 90), b = rand(10, 35);
                    return { vars: { a, b }, ans: a - b, hint: 'Scade unitățile, apoi zecile' };
                }
            },
            {
                type: 'choice', q: 'Care e mai mare: {a} sau {b}?', gen: () => {
                    let a = rand(10, 99), b = rand(10, 99);
                    if (a === b) b = a + 1;
                    return { vars: { a, b }, opts: [a, b], ans: Math.max(a, b), hint: 'Compară zecile' };
                }
            }
        ],

        // REBECCA - Clasa a IV-a - 0-1 000 000, fracții, zecimale
        rebecca: [
            // Adunări 0-100
            {
                type: 'math', q: 'Cât face {a} + {b}?', gen: () => {
                    const a = rand(10, 50), b = rand(10, 40);
                    return { vars: { a, b }, ans: a + b, hint: 'Adună zecile, apoi unitățile!' };
                }
            },
            // Scăderi 0-100
            {
                type: 'math', q: 'Cât face {a} - {b}?', gen: () => {
                    const a = rand(30, 80), b = rand(10, 29);
                    return { vars: { a, b }, ans: a - b, hint: 'Scade unitățile, apoi zecile!' };
                }
            },
            // Înmulțiri tabla 2-5
            {
                type: 'math', q: 'Cât face {a} × {b}?', gen: () => {
                    const a = rand(2, 5), b = rand(2, 10);
                    return { vars: { a, b }, ans: a * b, hint: `${a} × ${b} = ${a} adunat de ${b} ori` };
                }
            },
            // Comparare numere mari
            {
                type: 'choice', q: 'Care număr este mai mare?', gen: () => {
                    const a = rand(50, 200), b = rand(50, 200);
                    if (a === b) { b = a + 10; }
                    return { vars: {}, opts: [a, b], ans: Math.max(a, b), hint: 'Compară cifrele de la stânga!' };
                }
            },
            // Completează șirul
            {
                type: 'choice', q: 'Continuă șirul: {seq}, ...', gen: () => {
                    const start = rand(2, 5);
                    const step = rand(2, 3);
                    const seq = `${start}, ${start + step}, ${start + step * 2}`;
                    const answer = start + step * 3;
                    const opts = shuffle([answer, answer + 1, answer - 1, answer + step]);
                    return { vars: { seq }, opts, ans: answer, hint: 'Găsește regula - cu cât crește?' };
                }
            },
            // Probleme simple
            {
                type: 'math', q: 'Ana are {a} mere. Primește încă {b}. Câte are acum?', gen: () => {
                    const a = rand(5, 20), b = rand(3, 15);
                    return { vars: { a, b }, ans: a + b, hint: 'Adunăm merele!' };
                }
            },
            // ============ EXERCIȚII NOI REBECCA MATEMATICĂ ============
            // Tabla înmulțirii extinsă
            {
                type: 'math', q: '{a} × {b} = ?', gen: () => {
                    const a = rand(2, 9), b = rand(2, 9);
                    return { vars: { a, b }, ans: a * b, hint: `Tabla lui ${a}` };
                }
            },
            {
                type: 'math', q: '{a} × {b} = ?', gen: () => {
                    const a = rand(6, 10), b = rand(2, 5);
                    return { vars: { a, b }, ans: a * b, hint: 'Gândește în grupuri!' };
                }
            },
            // Împărțiri simple
            {
                type: 'math', q: '{a} ÷ {b} = ?', gen: () => {
                    const b = rand(2, 5), c = rand(2, 8);
                    const a = b * c;
                    return { vars: { a, b }, ans: c, hint: `Câte grupuri de ${b}?` };
                }
            },
            // Adunări 0-1000
            {
                type: 'math', q: '{a} + {b} = ?', gen: () => {
                    const a = rand(100, 500), b = rand(50, 300);
                    return { vars: { a, b }, ans: a + b, hint: 'Sute+sute, zeci+zeci' };
                }
            },
            // Scăderi 0-1000
            {
                type: 'math', q: '{a} - {b} = ?', gen: () => {
                    const a = rand(200, 800), b = rand(50, 199);
                    return { vars: { a, b }, ans: a - b, hint: 'Scade de la sute' };
                }
            },
            // Ordine operații
            {
                type: 'math', q: '{a} + {b} × {c} = ?', gen: () => {
                    const a = rand(5, 20), b = rand(2, 5), c = rand(2, 4);
                    return { vars: { a, b, c }, ans: a + b * c, hint: '× se face primul!' };
                }
            },
            // Probleme cu scădere
            {
                type: 'math', q: 'Ai {a} lei. Cumperi jucăria de {b} lei. Câți lei rămân?', gen: () => {
                    const a = rand(30, 100), b = rand(10, a - 5);
                    return { vars: { a, b }, ans: a - b, hint: 'Scădem!' };
                }
            },
            // Probleme cu înmulțire
            {
                type: 'math', q: '{n} copii au câte {m} bomboane. Câte bomboane în total?', gen: () => {
                    const n = rand(3, 8), m = rand(2, 5);
                    return { vars: { n, m }, ans: n * m, hint: 'Înmulțire!' };
                }
            },
            // Comparare cu operații
            {
                type: 'choice', q: 'Ce e mai mare: {a}×{b} sau {c}×{d}?', gen: () => {
                    const a = rand(3, 6), b = rand(2, 5);
                    const c = rand(2, 5), d = rand(3, 7);
                    const r1 = a * b, r2 = c * d;
                    const ans = r1 > r2 ? `${a}×${b}` : `${c}×${d}`;
                    return { vars: { a, b, c, d }, opts: [`${a}×${b}`, `${c}×${d}`], ans, hint: 'Calculează!' };
                }
            },
            // Șiruri cu pas variabil
            {
                type: 'choice', q: 'Completează: {seq}, ?', gen: () => {
                    const start = rand(5, 15);
                    const step = rand(3, 5);
                    const seq = `${start}, ${start + step}, ${start + step * 2}`;
                    const answer = start + step * 3;
                    const opts = shuffle([answer, answer + 1, answer - 1, answer + step]);
                    return { vars: { seq }, opts, ans: answer, hint: `+${step} la fiecare` };
                }
            },
            // Perimetru
            {
                type: 'math', q: 'Perimetrul pătratului cu latura {l} cm = ?', gen: () => {
                    const l = rand(3, 10);
                    return { vars: { l }, ans: l * 4, hint: 'P = 4 × latura' };
                }
            },
            // Fracții simple
            {
                type: 'choice', q: 'Jumătate din {n} = ?', gen: () => {
                    const n = rand(2, 10) * 2;
                    const ans = n / 2;
                    return { vars: { n }, opts: shuffle([ans, ans + 1, ans - 1, ans + 2]), ans, hint: '÷ 2' };
                }
            },
            // Numere mari
            {
                type: 'choice', q: 'Ce număr are 3 sute, 4 zeci, 5 unități?', gen: () => {
                    return { vars: {}, opts: shuffle([345, 354, 435, 543]), ans: 345, hint: 'S-Z-U' };
                }
            },
            // Rotunjire
            {
                type: 'choice', q: 'Rotunjește {n} la zeci:', gen: () => {
                    const n = rand(11, 99);
                    const rounded = Math.round(n / 10) * 10;
                    return { vars: { n }, opts: shuffle([rounded, rounded + 10, rounded - 10, n]), ans: rounded, hint: '5+ → sus' };
                }
            }
        ],

        // NICOLETA - clasa a XII-a seral
        nicoleta: [
            {
                type: 'math', q: 'Rezolvă: {a}x + {b} = {c}. x = ?', gen: () => {
                    const a = rand(2, 9), x = rand(2, 12), b = rand(1, 20);
                    const c = a * x + b;
                    return { vars: { a, b, c }, ans: x, hint: 'x = (c − b) / a' };
                }
            },
            {
                type: 'math', q: '{p}% din {n} = ?', gen: () => {
                    const p = [10, 20, 25, 50][rand(0, 3)];
                    const n = rand(2, 12) * 10;
                    return { vars: { p, n }, ans: n * p / 100, hint: `${p}/100 × ${n}` };
                }
            },
            {
                type: 'choice', q: 'f(x) = 2x + 3. Cât e f(4)?', gen: () => {
                    return { vars: {}, opts: shuffle([11, 8, 10, 14]), ans: 11, hint: '2×4 + 3' };
                }
            },
            {
                type: 'choice', q: 'Aria unui dreptunghi 8 × 5 = ?', gen: () => {
                    return { vars: {}, opts: shuffle([40, 26, 13, 45]), ans: 40, hint: 'L × l' };
                }
            },
            {
                type: 'math', q: 'Sistem: x + y = {s}, x − y = {d}. x = ?', gen: () => {
                    const x = rand(5, 15), y = rand(1, 8);
                    return { vars: { s: x + y, d: x - y }, ans: x, hint: 'Adună cele două ecuații' };
                }
            }
        ]
    },

    romana: {
        // BRIANNA - Clasa a II-a - citire și propoziții
        brianna: [
            // Recunoaștere litere
            {
                type: 'choice', q: '🔤 Ce literă? {letter}', gen: () => {
                    const letters = ['A', 'B', 'C', 'D', 'E', 'I', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U'];
                    const letter = letters[rand(0, letters.length - 1)];
                    let opts = [letter];
                    while (opts.length < 4) {
                        const other = letters[rand(0, letters.length - 1)];
                        if (!opts.includes(other)) opts.push(other);
                    }
                    return { vars: { letter }, opts: shuffle(opts), ans: letter, hint: '🗣️ Spune!' };
                }
            },
            // Cu ce literă începe - VIZUAL
            {
                type: 'choice', q: '🏠 "{word}" → ?', gen: () => {
                    const words = [
                        { word: 'MAMA', letter: 'M', emoji: '👩' },
                        { word: 'TATA', letter: 'T', emoji: '👨' },
                        { word: 'CASĂ', letter: 'C', emoji: '🏠' },
                        { word: 'PISICĂ', letter: 'P', emoji: '🐱' },
                        { word: 'SOARE', letter: 'S', emoji: '☀️' },
                        { word: 'APĂ', letter: 'A', emoji: '💧' },
                        { word: 'URS', letter: 'U', emoji: '🐻' },
                        { word: 'OU', letter: 'O', emoji: '🥚' }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    let opts = [item.letter];
                    const allLetters = 'ABCDEFIMNOPRSTUB'.split('');
                    while (opts.length < 4) {
                        const l = allLetters[rand(0, allLetters.length - 1)];
                        if (!opts.includes(l)) opts.push(l);
                    }
                    return { vars: { word: item.emoji + ' ' + item.word }, opts: shuffle(opts), ans: item.letter, hint: '👂 Ascultă!' };
                }
            },
            // Găsește cuvântul
            {
                type: 'choice', q: '🔎 Începe cu {letter}?', gen: () => {
                    const items = [
                        { letter: 'M', correct: '🏐 minge', wrong: ['📖 carte', '☀️ soare', '💧 apa'] },
                        { letter: 'C', correct: '📖 carte', wrong: ['🏐 minge', '🐻 urs', '👨 tata'] },
                        { letter: 'S', correct: '☀️ soare', wrong: ['👩 mama', '🐻 urs', '💍 inel'] },
                        { letter: 'A', correct: '💧 apa', wrong: ['🏐 minge', '👨 tata', '🏠 casă'] },
                        { letter: 'P', correct: '🐱 pisică', wrong: ['☀️ soare', '🐻 urs', '👩 mama'] }
                    ];
                    const item = items[rand(0, items.length - 1)];
                    const opts = shuffle([item.correct, ...item.wrong]);
                    return { vars: { letter: item.letter }, opts, ans: item.correct, hint: '👂 Prima!' };
                }
            },
            // Vocale - VIZUAL
            {
                type: 'choice', q: '🎵 Vocală?', gen: () => {
                    const vowels = ['A', 'E', 'I', 'O', 'U'];
                    const consonants = ['B', 'C', 'D', 'M', 'N', 'P', 'R', 'S', 'T'];
                    const vowel = vowels[rand(0, vowels.length - 1)];
                    let opts = [vowel];
                    while (opts.length < 4) {
                        opts.push(consonants[rand(0, consonants.length - 1)]);
                    }
                    return { vars: {}, opts: shuffle(opts), ans: vowel, hint: 'A E I O U' };
                }
            },
            // Silabe - VIZUAL
            {
                type: 'choice', q: '👏 Silabe: "{word}"', gen: () => {
                    const words = [
                        { word: 'MA-MA', silabe: 2, emoji: '👩' },
                        { word: 'TA-TA', silabe: 2, emoji: '👨' },
                        { word: 'CA-SĂ', silabe: 2, emoji: '🏠' },
                        { word: 'SO-A-RE', silabe: 3, emoji: '☀️' },
                        { word: 'A-PĂ', silabe: 2, emoji: '💧' },
                        { word: 'OU', silabe: 1, emoji: '🥚' },
                        { word: 'PISI-CĂ', silabe: 3, emoji: '🐱' }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { word: item.emoji + ' ' + item.word }, opts: shuffle([1, 2, 3, 4]), ans: item.silabe, hint: '👏👏' };
                }
            },
            // Litere mici/mari
            {
                type: 'choice', q: '🔡 a = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['A', 'B', 'E', 'O']), ans: 'A', hint: 'a → A' };
                }
            },
            {
                type: 'choice', q: '🔡 m = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['M', 'N', 'W', 'V']), ans: 'M', hint: 'm → M' };
                }
            },
            // Imagini
            {
                type: 'choice', q: '🖼️ Ce e? 🍎', gen: () => {
                    return { vars: {}, opts: shuffle(['măr', 'pară', 'cireașă', 'banană']), ans: 'măr', hint: '🍎 = măr' };
                }
            },
            {
                type: 'choice', q: '🖼️ Ce e? 🐕', gen: () => {
                    return { vars: {}, opts: shuffle(['câine', 'pisică', 'iepure', 'urs']), ans: 'câine', hint: '🐕 = câine' };
                }
            },
            // ============ EXERCIȚII NOI ROMÂNĂ BRIANNA ============
            // Mai multe imagini-cuvinte
            {
                type: 'choice', q: '🖼️ Ce e? 🌸', gen: () => {
                    return { vars: {}, opts: shuffle(['floare', 'copac', 'iarbă', 'frunză']), ans: 'floare', hint: '🌸 = floare' };
                }
            },
            {
                type: 'choice', q: '🖼️ Ce e? 🌳', gen: () => {
                    return { vars: {}, opts: shuffle(['copac', 'floare', 'casă', 'munte']), ans: 'copac', hint: '🌳 = copac' };
                }
            },
            {
                type: 'choice', q: '🖼️ Ce e? 🦋', gen: () => {
                    return { vars: {}, opts: shuffle(['fluture', 'albină', 'pasăre', 'libelulă']), ans: 'fluture', hint: '🦋 = fluture' };
                }
            },
            {
                type: 'choice', q: '🖼️ Ce e? 🐟', gen: () => {
                    return { vars: {}, opts: shuffle(['pește', 'delfin', 'broască', 'țestoasă']), ans: 'pește', hint: '🐟 = pește' };
                }
            },
            {
                type: 'choice', q: '🖼️ Ce e? ⭐', gen: () => {
                    return { vars: {}, opts: shuffle(['stea', 'soare', 'lună', 'nor']), ans: 'stea', hint: '⭐ = stea' };
                }
            },
            // Rimele simple
            {
                type: 'choice', q: '🎵 CASĂ rimează cu...?', gen: () => {
                    return { vars: {}, opts: shuffle(['masă', 'carte', 'soare', 'apă']), ans: 'masă', hint: '-ASĂ' };
                }
            },
            {
                type: 'choice', q: '🎵 FLOARE rimează cu...?', gen: () => {
                    return { vars: {}, opts: shuffle(['soare', 'copac', 'pisică', 'casă']), ans: 'soare', hint: '-OARE' };
                }
            },
            {
                type: 'choice', q: '🎵 CARTE rimează cu...?', gen: () => {
                    return { vars: {}, opts: shuffle(['parte', 'masă', 'floare', 'soare']), ans: 'parte', hint: '-ARTE' };
                }
            },
            // Cuvinte simple (citire)
            {
                type: 'choice', q: '📖 Citește: A-PA', gen: () => {
                    return { vars: {}, opts: shuffle(['apa', 'opa', 'epa', 'upa']), ans: 'apa', hint: '💧' };
                }
            },
            {
                type: 'choice', q: '📖 Citește: MA-MA', gen: () => {
                    return { vars: {}, opts: shuffle(['mama', 'tata', 'mimi', 'momo']), ans: 'mama', hint: '👩' };
                }
            },
            {
                type: 'choice', q: '📖 Citește: SO-A-RE', gen: () => {
                    return { vars: {}, opts: shuffle(['soare', 'stare', 'sară', 'seară']), ans: 'soare', hint: '☀️' };
                }
            },
            // Vocale colorate
            {
                type: 'choice', q: '🔴 Vocala din "MĂR"?', gen: () => {
                    return { vars: {}, opts: shuffle(['Ă', 'M', 'R', 'A']), ans: 'Ă', hint: 'A E I O U Ă Â Î' };
                }
            },
            {
                type: 'choice', q: '🔴 Vocala din "OU"?', gen: () => {
                    return { vars: {}, opts: shuffle(['O', 'U', 'Ambele!', 'Niciuna']), ans: 'Ambele!', hint: 'O și U = vocale' };
                }
            },
            // Completează cuvântul
            {
                type: 'choice', q: '✏️ CA_Ă (casă)', gen: () => {
                    return { vars: {}, opts: shuffle(['S', 'M', 'T', 'R']), ans: 'S', hint: 'CA-SĂ' };
                }
            },
            {
                type: 'choice', q: '✏️ _ATA (tata)', gen: () => {
                    return { vars: {}, opts: shuffle(['T', 'M', 'P', 'C']), ans: 'T', hint: 'TA-TA' };
                }
            },
            // Singular/plural simplu
            {
                type: 'choice', q: '🍎 Un măr → Două...?', gen: () => {
                    return { vars: {}, opts: shuffle(['mere', 'măr', 'mări', 'mări']), ans: 'mere', hint: '🍎🍎' };
                }
            },
            {
                type: 'choice', q: '🐱 O pisică → Două...?', gen: () => {
                    return { vars: {}, opts: shuffle(['pisici', 'pisice', 'pisicuțe', 'pisici']), ans: 'pisici', hint: '🐱🐱' };
                }
            }
        ],

        // REBECCA - Clasa a IV-a - Gramatică
        rebecca: [
            // Părți de vorbire
            {
                type: 'choice', q: 'Ce fel de cuvânt este "{word}"?', gen: () => {
                    const words = [
                        { word: 'frumos', ans: 'adjectiv' },
                        { word: 'pisică', ans: 'substantiv' },
                        { word: 'aleargă', ans: 'verb' },
                        { word: 'mare', ans: 'adjectiv' },
                        { word: 'copil', ans: 'substantiv' },
                        { word: 'citește', ans: 'verb' },
                        { word: 'scrie', ans: 'verb' },
                        { word: 'floare', ans: 'substantiv' },
                        { word: 'vesel', ans: 'adjectiv' }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { word: item.word }, opts: ['substantiv', 'verb', 'adjectiv', 'pronume'], ans: item.ans, hint: 'Substantiv=numește, Verb=acțiune, Adjectiv=descrie' };
                }
            },
            // Plural
            {
                type: 'choice', q: 'Care este pluralul cuvântului "{word}"?', gen: () => {
                    const words = [
                        { word: 'carte', plural: 'cărți', wrong: ['carți', 'cartele', 'carturi'] },
                        { word: 'masă', plural: 'mese', wrong: ['mase', 'masuri', 'masăle'] },
                        { word: 'copil', plural: 'copii', wrong: ['copili', 'copile', 'copiluri'] },
                        { word: 'floare', plural: 'flori', wrong: ['floare', 'floari', 'florile'] }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { word: item.word }, opts: shuffle([item.plural, ...item.wrong]), ans: item.plural, hint: 'Gândește-te cum spui când sunt mai multe!' };
                }
            },
            // Antonime
            {
                type: 'choice', q: 'Care este opusul cuvântului "{word}"?', gen: () => {
                    const pairs = [
                        { word: 'mare', ans: 'mic', wrong: ['lat', 'lung', 'gros'] },
                        { word: 'bun', ans: 'rău', wrong: ['frumos', 'mare', 'vechi'] },
                        { word: 'vechi', ans: 'nou', wrong: ['mic', 'rău', 'trist'] },
                        { word: 'trist', ans: 'vesel', wrong: ['bun', 'mare', 'nou'] }
                    ];
                    const item = pairs[rand(0, pairs.length - 1)];
                    return { vars: { word: item.word }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'Opusul înseamnă exact invers!' };
                }
            },
            // ============ EXERCIȚII NOI ROMÂNĂ REBECCA ============
            // Sinonime
            {
                type: 'choice', q: 'Sinonim pentru "{word}":', gen: () => {
                    const pairs = [
                        { word: 'frumos', ans: 'drăguț', wrong: ['urât', 'mare', 'mic'] },
                        { word: 'bucuros', ans: 'fericit', wrong: ['trist', 'supărat', 'obosit'] },
                        { word: 'inteligent', ans: 'deștept', wrong: ['prost', 'lent', 'mare'] },
                        { word: 'mic', ans: 'mărunt', wrong: ['mare', 'lung', 'lat'] },
                        { word: 'repede', ans: 'rapid', wrong: ['încet', 'lent', 'greu'] }
                    ];
                    const item = pairs[rand(0, pairs.length - 1)];
                    return { vars: { word: item.word }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'Sinonim = același înțeles' };
                }
            },
            // Genul substantivelor
            {
                type: 'choice', q: 'Ce gen are substantivul "{word}"?', gen: () => {
                    const words = [
                        { word: 'carte', ans: 'feminin' },
                        { word: 'băiat', ans: 'masculin' },
                        { word: 'masă', ans: 'feminin' },
                        { word: 'copil', ans: 'masculin' },
                        { word: 'floare', ans: 'feminin' },
                        { word: 'câine', ans: 'masculin' },
                        { word: 'pisică', ans: 'feminin' },
                        { word: 'copac', ans: 'masculin' }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { word: item.word }, opts: ['masculin', 'feminin', 'neutru'], ans: item.ans, hint: 'El/Ea/El?' };
                }
            },
            // Completare propoziție
            {
                type: 'choice', q: 'Completează: "Copilul ___ la școală."', gen: () => {
                    return { vars: {}, opts: shuffle(['merge', 'merg', 'mergi', 'mergeți']), ans: 'merge', hint: 'El/Ea + verb persoana 3' };
                }
            },
            {
                type: 'choice', q: 'Completează: "Eu ___ o carte."', gen: () => {
                    return { vars: {}, opts: shuffle(['citesc', 'citește', 'citești', 'citim']), ans: 'citesc', hint: 'Eu = persoana 1' };
                }
            },
            {
                type: 'choice', q: 'Completează: "Noi ___ acasă."', gen: () => {
                    return { vars: {}, opts: shuffle(['suntem', 'sunt', 'ești', 'este']), ans: 'suntem', hint: 'Noi = persoana 1 plural' };
                }
            },
            // Timpuri verbale
            {
                type: 'choice', q: 'La ce timp este verbul: "Am mâncat"?', gen: () => {
                    return { vars: {}, opts: shuffle(['trecut', 'prezent', 'viitor', 'infinitiv']), ans: 'trecut', hint: 'S-a întâmplat deja' };
                }
            },
            {
                type: 'choice', q: 'La ce timp este verbul: "Voi merge"?', gen: () => {
                    return { vars: {}, opts: shuffle(['viitor', 'prezent', 'trecut', 'infinitiv']), ans: 'viitor', hint: 'Se va întâmpla' };
                }
            },
            // Cuvinte compuse
            {
                type: 'choice', q: '"Floarea-soarelui" este formată din:', gen: () => {
                    return { vars: {}, opts: shuffle(['2 cuvinte', '3 cuvinte', '1 cuvânt', '4 cuvinte']), ans: '2 cuvinte', hint: 'floare + soare' };
                }
            },
            // Diacritice
            {
                type: 'choice', q: 'Care variantă e corectă?', gen: () => {
                    const pairs = [
                        { correct: 'șarpe', wrong: ['sarpe', 'sharpe', 'çarpe'] },
                        { correct: 'țară', wrong: ['tara', 'tzara', 'çara'] },
                        { correct: 'învăț', wrong: ['invat', 'învat', 'învaț'] },
                        { correct: 'băiat', wrong: ['baiat', 'bãiat', 'băeat'] }
                    ];
                    const item = pairs[rand(0, pairs.length - 1)];
                    return { vars: {}, opts: shuffle([item.correct, ...item.wrong]), ans: item.correct, hint: 'ă, â, î, ș, ț' };
                }
            },
            // Punctuație
            {
                type: 'choice', q: 'Ce semn punem la final? "Unde mergi"', gen: () => {
                    return { vars: {}, opts: shuffle(['?', '.', '!', ',']), ans: '?', hint: 'E o întrebare' };
                }
            },
            {
                type: 'choice', q: 'Ce semn punem la final? "Ce frumos"', gen: () => {
                    return { vars: {}, opts: shuffle(['!', '.', '?', ':']), ans: '!', hint: 'E o exclamație' };
                }
            },
            // Diminutive
            {
                type: 'choice', q: 'Diminutivul de la "casă" este:', gen: () => {
                    return { vars: {}, opts: shuffle(['căsuță', 'case', 'casă mare', 'casier']), ans: 'căsuță', hint: 'Mic și drăguț' };
                }
            },
            {
                type: 'choice', q: 'Diminutivul de la "pisică" este:', gen: () => {
                    return { vars: {}, opts: shuffle(['pisicuță', 'pisici', 'pisoi', 'motan']), ans: 'pisicuță', hint: 'Mic și drăguț' };
                }
            },
            // Ordonare cuvinte
            {
                type: 'choice', q: 'Aranjează: "mănâncă / Pisica / pește"', gen: () => {
                    return { vars: {}, opts: shuffle(['Pisica mănâncă pește', 'mănâncă Pisica pește', 'pește mănâncă Pisica', 'Pisica pește mănâncă']), ans: 'Pisica mănâncă pește', hint: 'Subiect + Predicat + Complement' };
                }
            }
        ],

        // NICOLETA - clasa a XII-a seral
        nicoleta: [
            {
                type: 'choice', q: 'Genul literar al romanului este:', gen: () => {
                    return { vars: {}, opts: shuffle(['epic', 'liric', 'dramatic', 'didactic']), ans: 'epic', hint: 'Narațiune + personaje' };
                }
            },
            {
                type: 'choice', q: 'Figura de stil din „pădurea de argint” este:', gen: () => {
                    return { vars: {}, opts: shuffle(['metaforă', 'enumerație', 'repetiție', 'invocație']), ans: 'metaforă', hint: 'Identificare, nu comparație cu „ca”' };
                }
            },
            {
                type: 'choice', q: 'Predicatul din „Elevii învață lecția” este:', gen: () => {
                    return { vars: {}, opts: shuffle(['învață', 'Elevii', 'lecția', 'Elevii învață']), ans: 'învață', hint: 'Ce se spune despre subiect' };
                }
            },
            {
                type: 'choice', q: '„Ion” de Rebreanu este:', gen: () => {
                    return { vars: {}, opts: shuffle(['roman realist', 'nuvelă fantastică', 'poezie lirică', 'basm cult']), ans: 'roman realist', hint: 'Proză de observație socială' };
                }
            }
        ]
    },

    engleza: {
        // BRIANNA - Clasa a II-a - vocabular A1
        brianna: [
            // Culori - VIZUAL
            {
                type: 'choice', q: '🎨 RED = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['🔴 roșu', '🔵 albastru', '🟢 verde', '🟡 galben']), ans: '🔴 roșu', hint: '🔴' };
                }
            },
            {
                type: 'choice', q: '🎨 BLUE = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['🔵 albastru', '🔴 roșu', '🟢 verde', '🟡 galben']), ans: '🔵 albastru', hint: '🔵' };
                }
            },
            {
                type: 'choice', q: '🎨 GREEN = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['🟢 verde', '🔴 roșu', '🔵 albastru', '🟡 galben']), ans: '🟢 verde', hint: '🟢' };
                }
            },
            {
                type: 'choice', q: '🎨 YELLOW = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['🟡 galben', '🔴 roșu', '🔵 albastru', '🟢 verde']), ans: '🟡 galben', hint: '🟡' };
                }
            },
            // Numere - VIZUAL
            {
                type: 'choice', q: '🔢 1️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['ONE', 'TWO', 'THREE', 'FOUR']), ans: 'ONE', hint: '☝️' };
                }
            },
            {
                type: 'choice', q: '🔢 2️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['TWO', 'ONE', 'THREE', 'FIVE']), ans: 'TWO', hint: '✌️' };
                }
            },
            {
                type: 'choice', q: '🔢 3️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['THREE', 'TWO', 'FOUR', 'FIVE']), ans: 'THREE', hint: '🤟' };
                }
            },
            {
                type: 'choice', q: '🔢 5️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['FIVE', 'FOUR', 'SIX', 'THREE']), ans: 'FIVE', hint: '✋' };
                }
            },
            // Animale - VIZUAL
            {
                type: 'choice', q: '🐱 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['CAT', 'DOG', 'BIRD', 'FISH']), ans: 'CAT', hint: 'Miau!' };
                }
            },
            {
                type: 'choice', q: '🐕 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['DOG', 'CAT', 'BIRD', 'RABBIT']), ans: 'DOG', hint: 'Ham!' };
                }
            },
            {
                type: 'choice', q: '🐰 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['RABBIT', 'CAT', 'DOG', 'FISH']), ans: 'RABBIT', hint: '🥕' };
                }
            },
            // Salutări - SIMPLE
            {
                type: 'choice', q: '👋 HELLO = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['Bună!', 'Pa!', 'Mulțumesc', 'Te rog']), ans: 'Bună!', hint: '👋 Salut!' };
                }
            },
            {
                type: 'choice', q: '👋 BYE = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['Pa!', 'Bună!', 'Da', 'Nu']), ans: 'Pa!', hint: '👋 La revedere!' };
                }
            },
            // Familie
            {
                type: 'choice', q: '👩 MOM = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['Mama', 'Tata', 'Frate', 'Soră']), ans: 'Mama', hint: '👩 ❤️' };
                }
            },
            {
                type: 'choice', q: '👨 DAD = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['Tata', 'Mama', 'Frate', 'Soră']), ans: 'Tata', hint: '👨 ❤️' };
                }
            },
            // ============ EXERCIȚII NOI ENGLEZĂ BRIANNA ============
            // Mai multe culori
            {
                type: 'choice', q: '🎨 ORANGE = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['🟠 portocaliu', '🔴 roșu', '🟡 galben', '🟤 maro']), ans: '🟠 portocaliu', hint: '🟠' };
                }
            },
            {
                type: 'choice', q: '🎨 PINK = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['🩷 roz', '🔴 roșu', '🟣 mov', '⚪ alb']), ans: '🩷 roz', hint: '🩷' };
                }
            },
            {
                type: 'choice', q: '🎨 WHITE = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['⚪ alb', '⚫ negru', '🔵 albastru', '🟢 verde']), ans: '⚪ alb', hint: '⚪ ❄️' };
                }
            },
            {
                type: 'choice', q: '🎨 BLACK = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['⚫ negru', '⚪ alb', '🟤 maro', '🔵 albastru']), ans: '⚫ negru', hint: '⚫ 🌙' };
                }
            },
            // Mai multe numere
            {
                type: 'choice', q: '🔢 4️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['FOUR', 'FIVE', 'THREE', 'SIX']), ans: 'FOUR', hint: '🍀' };
                }
            },
            {
                type: 'choice', q: '🔢 6️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['SIX', 'SEVEN', 'FIVE', 'EIGHT']), ans: 'SIX', hint: '🎲' };
                }
            },
            {
                type: 'choice', q: '🔢 7️⃣ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['SEVEN', 'SIX', 'EIGHT', 'NINE']), ans: 'SEVEN', hint: '🌈' };
                }
            },
            {
                type: 'choice', q: '🔢 🔟 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['TEN', 'NINE', 'ELEVEN', 'EIGHT']), ans: 'TEN', hint: '👐' };
                }
            },
            // Mai multe animale
            {
                type: 'choice', q: '🐦 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['BIRD', 'BEE', 'BAT', 'BUG']), ans: 'BIRD', hint: '🎵' };
                }
            },
            {
                type: 'choice', q: '🐟 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['FISH', 'FROG', 'FLY', 'FOX']), ans: 'FISH', hint: '🌊' };
                }
            },
            {
                type: 'choice', q: '🐻 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['BEAR', 'BEE', 'BAT', 'BIRD']), ans: 'BEAR', hint: '🍯' };
                }
            },
            {
                type: 'choice', q: '🦁 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['LION', 'TIGER', 'CAT', 'DOG']), ans: 'LION', hint: '👑 King!' };
                }
            },
            // Fructe
            {
                type: 'choice', q: '🍎 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['APPLE', 'ORANGE', 'BANANA', 'GRAPE']), ans: 'APPLE', hint: '🍎' };
                }
            },
            {
                type: 'choice', q: '🍌 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['BANANA', 'APPLE', 'ORANGE', 'LEMON']), ans: 'BANANA', hint: '🐒' };
                }
            },
            // Obiecte simple
            {
                type: 'choice', q: '⚽ = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['BALL', 'BAT', 'BIG', 'BOX']), ans: 'BALL', hint: '⚽🏀' };
                }
            },
            {
                type: 'choice', q: '🏠 = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['HOUSE', 'HOME', 'HAT', 'HEN']), ans: 'HOUSE', hint: '🏠' };
                }
            },
            // Da/Nu
            {
                type: 'choice', q: '✅ YES = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['Da', 'Nu', 'Poate', 'Bună']), ans: 'Da', hint: '✅👍' };
                }
            },
            {
                type: 'choice', q: '❌ NO = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['Nu', 'Da', 'Poate', 'Pa']), ans: 'Nu', hint: '❌👎' };
                }
            },
            // Corpul uman
            {
                type: 'choice', q: '👀 EYES = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['ochi', 'urechi', 'nas', 'gură']), ans: 'ochi', hint: '👀 vezi!' };
                }
            },
            {
                type: 'choice', q: '👂 EAR = ?', gen: () => {
                    return { vars: {}, opts: shuffle(['ureche', 'ochi', 'nas', 'mână']), ans: 'ureche', hint: '👂 auzi!' };
                }
            }
        ],

        // REBECCA - Clasa a IV-a
        rebecca: [
            // Vocabular mai avansat
            {
                type: 'choice', q: 'Ce înseamnă "{word}" în română?', gen: () => {
                    const words = [
                        { word: 'apple', ans: 'măr', wrong: ['portocală', 'banană', 'strugure'] },
                        { word: 'house', ans: 'casă', wrong: ['mașină', 'floare', 'copac'] },
                        { word: 'happy', ans: 'fericit', wrong: ['trist', 'supărat', 'obosit'] },
                        { word: 'book', ans: 'carte', wrong: ['caiet', 'pix', 'tablă'] },
                        { word: 'school', ans: 'școală', wrong: ['casă', 'parc', 'magazin'] },
                        { word: 'friend', ans: 'prieten', wrong: ['frate', 'mamă', 'profesor'] }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { word: item.word }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'Gândește-te la cuvinte similare!' };
                }
            },
            // Traduceri inverse
            {
                type: 'choice', q: 'Cum se spune "{ro}" în engleză?', gen: () => {
                    const words = [
                        { ro: 'pisică', ans: 'cat', wrong: ['dog', 'bird', 'fish'] },
                        { ro: 'câine', ans: 'dog', wrong: ['cat', 'bird', 'rabbit'] },
                        { ro: 'carte', ans: 'book', wrong: ['pen', 'table', 'chair'] },
                        { ro: 'mamă', ans: 'mother', wrong: ['father', 'sister', 'brother'] }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { ro: item.ro }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'Încearcă să-ți amintești!' };
                }
            },
            // ============ EXERCIȚII NOI ENGLEZĂ REBECCA ============
            // Vocabular extins
            {
                type: 'choice', q: 'Ce înseamnă "{word}"?', gen: () => {
                    const words = [
                        { word: 'beautiful', ans: 'frumos', wrong: ['urât', 'mare', 'mic'] },
                        { word: 'teacher', ans: 'profesor', wrong: ['elev', 'doctor', 'pilot'] },
                        { word: 'homework', ans: 'temă', wrong: ['joacă', 'vacanță', 'sport'] },
                        { word: 'breakfast', ans: 'mic dejun', wrong: ['prânz', 'cină', 'gustare'] },
                        { word: 'bedroom', ans: 'dormitor', wrong: ['bucătărie', 'baie', 'grădină'] },
                        { word: 'weather', ans: 'vreme', wrong: ['timp', 'carte', 'casă'] },
                        { word: 'summer', ans: 'vară', wrong: ['iarnă', 'toamnă', 'primăvară'] },
                        { word: 'winter', ans: 'iarnă', wrong: ['vară', 'toamnă', 'primăvară'] }
                    ];
                    const item = words[rand(0, words.length - 1)];
                    return { vars: { word: item.word }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'Gândește-te!' };
                }
            },
            // Verbe comune
            {
                type: 'choice', q: '"I {verb}" înseamnă:', gen: () => {
                    const verbs = [
                        { verb: 'eat', ans: 'Eu mănânc', wrong: ['Eu beau', 'Eu dorm', 'Eu merg'] },
                        { verb: 'drink', ans: 'Eu beau', wrong: ['Eu mănânc', 'Eu citesc', 'Eu scriu'] },
                        { verb: 'read', ans: 'Eu citesc', wrong: ['Eu scriu', 'Eu desenez', 'Eu cânt'] },
                        { verb: 'write', ans: 'Eu scriu', wrong: ['Eu citesc', 'Eu vorbesc', 'Eu ascult'] },
                        { verb: 'run', ans: 'Eu alerg', wrong: ['Eu merg', 'Eu sar', 'Eu stau'] },
                        { verb: 'sleep', ans: 'Eu dorm', wrong: ['Eu mă trezesc', 'Eu mănânc', 'Eu merg'] }
                    ];
                    const item = verbs[rand(0, verbs.length - 1)];
                    return { vars: { verb: item.verb }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'I = Eu' };
                }
            },
            // Propoziții simple
            {
                type: 'choice', q: '"The cat is {adj}" - pisica este:', gen: () => {
                    const adj = [
                        { adj: 'small', ans: 'mică', wrong: ['mare', 'roșie', 'rapidă'] },
                        { adj: 'big', ans: 'mare', wrong: ['mică', 'verde', 'lentă'] },
                        { adj: 'black', ans: 'neagră', wrong: ['albă', 'mică', 'mare'] },
                        { adj: 'white', ans: 'albă', wrong: ['neagră', 'mare', 'mică'] }
                    ];
                    const item = adj[rand(0, adj.length - 1)];
                    return { vars: { adj: item.adj }, opts: shuffle([item.ans, ...item.wrong]), ans: item.ans, hint: 'Traducere directă' };
                }
            },
            // Întrebări
            {
                type: 'choice', q: '"What is your name?" înseamnă:', gen: () => {
                    return { vars: {}, opts: shuffle(['Cum te cheamă?', 'Câți ani ai?', 'Unde locuiești?', 'Ce faci?']), ans: 'Cum te cheamă?', hint: 'What = Ce/Cum' };
                }
            },
            {
                type: 'choice', q: '"How old are you?" înseamnă:', gen: () => {
                    return { vars: {}, opts: shuffle(['Câți ani ai?', 'Cum te cheamă?', 'Unde ești?', 'Ce faci?']), ans: 'Câți ani ai?', hint: 'How old = Câți ani' };
                }
            },
            {
                type: 'choice', q: '"Where do you live?" înseamnă:', gen: () => {
                    return { vars: {}, opts: shuffle(['Unde locuiești?', 'Cum te cheamă?', 'Câți ani ai?', 'Ce mănânci?']), ans: 'Unde locuiești?', hint: 'Where = Unde' };
                }
            },
            // Plurale
            {
                type: 'choice', q: 'Pluralul de la "cat" este:', gen: () => {
                    return { vars: {}, opts: shuffle(['cats', 'cates', 'caties', 'cat']), ans: 'cats', hint: '+s' };
                }
            },
            {
                type: 'choice', q: 'Pluralul de la "child" este:', gen: () => {
                    return { vars: {}, opts: shuffle(['children', 'childs', 'childes', 'child']), ans: 'children', hint: 'Neregulat!' };
                }
            },
            // Zile și luni
            {
                type: 'choice', q: '"Monday" înseamnă:', gen: () => {
                    return { vars: {}, opts: shuffle(['Luni', 'Marți', 'Miercuri', 'Joi']), ans: 'Luni', hint: 'Prima zi' };
                }
            },
            {
                type: 'choice', q: '"January" înseamnă:', gen: () => {
                    return { vars: {}, opts: shuffle(['Ianuarie', 'Februarie', 'Martie', 'Decembrie']), ans: 'Ianuarie', hint: 'Prima lună' };
                }
            },
            // A/An
            {
                type: 'choice', q: 'Completează: "___ apple"', gen: () => {
                    return { vars: {}, opts: shuffle(['an', 'a', 'the', 'some']), ans: 'an', hint: 'Vocală = an' };
                }
            },
            {
                type: 'choice', q: 'Completează: "___ book"', gen: () => {
                    return { vars: {}, opts: shuffle(['a', 'an', 'the', 'some']), ans: 'a', hint: 'Consoană = a' };
                }
            },
            // Prepoziții
            {
                type: 'choice', q: '"The cat is ON the table" - pisica este:', gen: () => {
                    return { vars: {}, opts: shuffle(['pe masă', 'sub masă', 'lângă masă', 'în masă']), ans: 'pe masă', hint: 'ON = pe' };
                }
            },
            {
                type: 'choice', q: '"The dog is UNDER the chair" - câinele este:', gen: () => {
                    return { vars: {}, opts: shuffle(['sub scaun', 'pe scaun', 'lângă scaun', 'pe masă']), ans: 'sub scaun', hint: 'UNDER = sub' };
                }
            },
            // Culori în propoziții
            {
                type: 'choice', q: '"The sky is blue" - cerul este:', gen: () => {
                    return { vars: {}, opts: shuffle(['albastru', 'roșu', 'verde', 'galben']), ans: 'albastru', hint: 'blue = albastru' };
                }
            },
            // Numere 11-20
            {
                type: 'choice', q: 'Cum se scrie 15 în engleză?', gen: () => {
                    return { vars: {}, opts: shuffle(['fifteen', 'fiveteen', 'fifty', 'five']), ans: 'fifteen', hint: 'five + teen' };
                }
            },
            {
                type: 'choice', q: 'Cum se scrie 20 în engleză?', gen: () => {
                    return { vars: {}, opts: shuffle(['twenty', 'twoty', 'twoteen', 'twelve']), ans: 'twenty', hint: 'two + nty' };
                }
            }
        ],

        // NICOLETA - clasa a XII-a seral
        nicoleta: [
            {
                type: 'choice', q: 'Past of „go”:', gen: () => {
                    return { vars: {}, opts: shuffle(['went', 'goed', 'gone', 'going']), ans: 'went', hint: 'Irregular' };
                }
            },
            {
                type: 'choice', q: 'Complete: She ___ to school every day.', gen: () => {
                    return { vars: {}, opts: shuffle(['goes', 'go', 'going', 'gone']), ans: 'goes', hint: 'Present Simple, 3rd person' };
                }
            },
            {
                type: 'choice', q: '„If I had time, I would travel” is:', gen: () => {
                    return { vars: {}, opts: shuffle(['2nd conditional', '1st conditional', '0 conditional', '3rd conditional']), ans: '2nd conditional', hint: 'if + past, would + V' };
                }
            },
            {
                type: 'choice', q: 'Opposite of „expensive”:', gen: () => {
                    return { vars: {}, opts: shuffle(['cheap', 'rich', 'large', 'early']), ans: 'cheap', hint: 'price' };
                }
            }
        ]
    },

    informatica: {
        rebecca: [
            {
                type: 'choice', q: 'Un folder este:', gen: () => {
                    return { vars: {}, opts: shuffle(['un loc pentru fișiere', 'un program de desen', 'o imprimantă', 'un site']), ans: 'un loc pentru fișiere', hint: 'Dosar pe disc' };
                }
            },
            {
                type: 'choice', q: 'Ca să salvezi un document apeși de obicei:', gen: () => {
                    return { vars: {}, opts: shuffle(['Ctrl+S', 'Ctrl+C', 'Alt+F4', 'Esc']), ans: 'Ctrl+S', hint: 'Save' };
                }
            },
            {
                type: 'choice', q: 'Pe internet NU trimiți:', gen: () => {
                    return { vars: {}, opts: shuffle(['parola', 'o poză cu o floare', 'un desen', 'un salut']), ans: 'parola', hint: 'Date personale' };
                }
            },
            {
                type: 'choice', q: 'Fișierul „tema.docx” e de obicei:', gen: () => {
                    return { vars: {}, opts: shuffle(['document Word', 'imagine', 'film', 'melodie']), ans: 'document Word', hint: 'Extensia .docx' };
                }
            }
        ]
    },

    autohotkey: {
        tata: [
            {
                type: 'choice', q: 'În AHK v1, `::` după o tastă definește:', gen: () => {
                    return { vars: {}, opts: shuffle(['un hotkey', 'o funcție', 'un GUI', 'un include']), ans: 'un hotkey', hint: 'Hotkey:: acțiune' };
                }
            },
            {
                type: 'choice', q: 'IniRead citește din:', gen: () => {
                    return { vars: {}, opts: shuffle(['fișier .ini', 'registrul Windows', 'clipboard', 'JSON']), ans: 'fișier .ini', hint: 'IniRead, OutVar, File, Sec, Key' };
                }
            },
            {
                type: 'choice', q: 'Send, {Enter} trimite:', gen: () => {
                    return { vars: {}, opts: shuffle(['tasta Enter', 'textul {Enter}', 'un click', 'Alt+F4']), ans: 'tasta Enter', hint: 'acolade = tastă' };
                }
            },
            {
                type: 'choice', q: 'CoordMode, Mouse, Screen măsoară față de:', gen: () => {
                    return { vars: {}, opts: shuffle(['ecran', 'fereastra activă', 'client area', 'taskbar']), ans: 'ecran', hint: 'Screen vs Window' };
                }
            }
        ]
    },

    english_grammar: {
        tata: [
            {
                type: 'choice', q: '„I have been working” is:', gen: () => {
                    return { vars: {}, opts: shuffle(['present perfect continuous', 'past simple', 'past perfect', 'future perfect']), ans: 'present perfect continuous', hint: 'have been + V-ing' };
                }
            },
            {
                type: 'choice', q: 'Correct: If I ___ you, I would wait.', gen: () => {
                    return { vars: {}, opts: shuffle(['were', 'was', 'am', 'be']), ans: 'were', hint: 'subjunctive in 2nd conditional' };
                }
            },
            {
                type: 'choice', q: 'Reported: He said, „I am tired.” → He said he ___ tired.', gen: () => {
                    return { vars: {}, opts: shuffle(['was', 'is', 'were', 'been']), ans: 'was', hint: 'backshift present → past' };
                }
            },
            {
                type: 'choice', q: 'Which is a phrasal verb?', gen: () => {
                    return { vars: {}, opts: shuffle(['give up', 'quickly run', 'very tired', 'the book']), ans: 'give up', hint: 'verb + particle' };
                }
            }
        ]
    },

    cpp: {
        tata: [
            {
                type: 'choice', q: 'În C++, `int *p;` declară:', gen: () => {
                    return { vars: {}, opts: shuffle(['un pointer la int', 'un int', 'un array', 'o referință']), ans: 'un pointer la int', hint: '* lângă tip' };
                }
            },
            {
                type: 'choice', q: 'STL container cu cheie unică sortată:', gen: () => {
                    return { vars: {}, opts: shuffle(['std::set', 'std::vector', 'std::list', 'std::stack']), ans: 'std::set', hint: 'ordered unique keys' };
                }
            },
            {
                type: 'choice', q: 'Destructorul unei clase se numește:', gen: () => {
                    return { vars: {}, opts: shuffle(['~NumeClasa', 'delete NumeClasa', 'free()', 'NumeClasa()']), ans: '~NumeClasa', hint: 'tilda' };
                }
            },
            {
                type: 'choice', q: 'cout face parte din:', gen: () => {
                    return { vars: {}, opts: shuffle(['iostream', 'cstdio', 'cmath', 'vector']), ans: 'iostream', hint: 'std::cout' };
                }
            }
        ]
    },

    python: {
        tata: [
            {
                type: 'choice', q: 'List comprehension corectă pentru pătrate 0-3:', gen: () => {
                    return { vars: {}, opts: shuffle(['[x*x for x in range(4)]', '[x*x in range(4)]', '{x*x for x range 4}', 'for x in range(4): x*x']), ans: '[x*x for x in range(4)]', hint: '[expr for x in iterable]' };
                }
            },
            {
                type: 'choice', q: 'open(path, \"rb\") deschide:', gen: () => {
                    return { vars: {}, opts: shuffle(['binar, citire', 'text, scriere', 'append', 'utf-8 write']), ans: 'binar, citire', hint: 'r=read, b=bytes' };
                }
            },
            {
                type: 'choice', q: 'requests.get(url).json() întoarce:', gen: () => {
                    return { vars: {}, opts: shuffle(['dict/list Python', 'string HTML', 'fișier', 'cod HTTP']), ans: 'dict/list Python', hint: 'parse JSON body' };
                }
            },
            {
                type: 'choice', q: 'def f(a, b=2): câte argumente poziționale obligatorii?', gen: () => {
                    return { vars: {}, opts: shuffle(['1', '2', '0', '3']), ans: '1', hint: 'doar a e obligatoriu' };
                }
            }
        ]
    },

    franceza: {
        nicoleta: [
            {
                type: 'choice', q: '„Bonjour” înseamnă:', gen: () => {
                    return { vars: {}, opts: shuffle(['Bună ziua', 'Noapte bună', 'Mulțumesc', 'La revedere']), ans: 'Bună ziua', hint: 'salut de zi' };
                }
            },
            {
                type: 'choice', q: 'Je ___ française. (être)', gen: () => {
                    return { vars: {}, opts: shuffle(['suis', 'es', 'est', 'sommes']), ans: 'suis', hint: 'je suis' };
                }
            },
            {
                type: 'choice', q: 'Articol hotărât feminin singular:', gen: () => {
                    return { vars: {}, opts: shuffle(['la', 'le', 'les', 'un']), ans: 'la', hint: 'la table' };
                }
            },
            {
                type: 'choice', q: '„avoir” la persoana I plural:', gen: () => {
                    return { vars: {}, opts: shuffle(['avons', 'avez', 'ont', 'ai']), ans: 'avons', hint: 'nous avons' };
                }
            }
        ]
    },

    italiana: {
        nicoleta: [
            {
                type: 'choice', q: '„Ciao” poate însemna:', gen: () => {
                    return { vars: {}, opts: shuffle(['salut și pa', 'doar mulțumesc', 'doar noapte bună', 'scuză-mă']), ans: 'salut și pa', hint: 'informal, ambele sensuri' };
                }
            },
            {
                type: 'choice', q: 'Io ___ italiana. (essere)', gen: () => {
                    return { vars: {}, opts: shuffle(['sono', 'sei', 'è', 'siamo']), ans: 'sono', hint: 'io sono' };
                }
            },
            {
                type: 'choice', q: 'Articol hotărât masculin singular (înainte de consoană):', gen: () => {
                    return { vars: {}, opts: shuffle(['il', 'lo', 'la', 'i']), ans: 'il', hint: 'il libro' };
                }
            },
            {
                type: 'choice', q: '„avere” la noi:', gen: () => {
                    return { vars: {}, opts: shuffle(['abbiamo', 'avete', 'hanno', 'ho']), ans: 'abbiamo', hint: 'noi abbiamo' };
                }
            }
        ]
    },

    istorie: {
        nicoleta: [
            {
                type: 'choice', q: 'Marea Unire a fost proclamată în:', gen: () => {
                    return { vars: {}, opts: shuffle(['1918', '1859', '1877', '1947']), ans: '1918', hint: '1 decembrie, Alba Iulia' };
                }
            },
            {
                type: 'choice', q: 'Unirea Principatelor (Moldova și Țara Românească):', gen: () => {
                    return { vars: {}, opts: shuffle(['1859', '1918', '1877', '1848']), ans: '1859', hint: 'Cuza' };
                }
            },
            {
                type: 'choice', q: 'România a intra în Primul Război Mondial în:', gen: () => {
                    return { vars: {}, opts: shuffle(['1916', '1914', '1918', '1941']), ans: '1916', hint: 'nu în 1914' };
                }
            },
            {
                type: 'choice', q: 'Regimul comunist în România s-a încheiat în:', gen: () => {
                    return { vars: {}, opts: shuffle(['1989', '1947', '1965', '1977']), ans: '1989', hint: 'decembrie' };
                }
            }
        ]
    },

    geografie: {
        nicoleta: [
            {
                type: 'choice', q: 'Cel mai înalt vârf din România:', gen: () => {
                    return { vars: {}, opts: shuffle(['Moldoveanu', 'Negoiu', 'Omu', 'Peleaga']), ans: 'Moldoveanu', hint: 'Făgăraș, 2544 m' };
                }
            },
            {
                type: 'choice', q: 'Dunărea se varsă în:', gen: () => {
                    return { vars: {}, opts: shuffle(['Marea Neagră', 'Marea Mediterană', 'Marea Adriatică', 'Oceanul Atlantic']), ans: 'Marea Neagră', hint: 'Delta Dunării' };
                }
            },
            {
                type: 'choice', q: 'Carpații se împart în:', gen: () => {
                    return { vars: {}, opts: shuffle(['Orientali, Meridionali, Occidentali', 'Nordici și Sudici', 'Alpi și Balcani', 'Banat și Dobrogea']), ans: 'Orientali, Meridionali, Occidentali', hint: 'trei grupe' };
                }
            },
            {
                type: 'choice', q: 'Capitala României este:', gen: () => {
                    return { vars: {}, opts: shuffle(['București', 'Cluj-Napoca', 'Iași', 'Timișoara']), ans: 'București', hint: 'sudul țării' };
                }
            }
        ]
    }
};

let quest, questions = [], qIndex = 0, score = 0, selected = null;

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function init() {
    quest = JSON.parse(localStorage.getItem('eduquest_current_quest') || '{"subject":"matematica","title":"Test","points":20}');
    const user = localStorage.getItem('eduquest_profile') || 'rebecca';

    document.getElementById('questTitle').textContent = quest.title;
    const subjectNames = {
        matematica: 'Matematică', romana: 'Limba Română', engleza: 'Limba Engleză',
        informatica: 'Informatică', autohotkey: 'AutoHotkey', english_grammar: 'English Grammar',
        cpp: 'C++', python: 'Python', franceza: 'Franceză', italiana: 'Italiană',
        istorie: 'Istorie', geografie: 'Geografie', bonus: 'Bonus'
    };
    document.getElementById('questSubject').textContent = subjectNames[quest.subject] || quest.subject;
    document.getElementById('pointsBadge').textContent = `+${quest.points} ⭐`;

    generateQuestions(user);
    showQuestion();
}

function generateQuestions(user) {
    // Add user class to body for user-specific styling
    document.body.classList.remove('user-brianna', 'user-rebecca', 'user-tata', 'user-nicoleta');
    document.body.classList.add(`user-${user}`);

    // Get user's difficulty level from localStorage (set by assessment)
    const difficultyKey = `eduquest_difficulty_${user}`;
    const userDifficulty = JSON.parse(localStorage.getItem(difficultyKey) || '{}');
    const subjectDifficulty = userDifficulty[quest.subject] || 'medium';

    // Exerciții DOAR pentru profilul curent — fără fallback pe matematica altui profil
    let templates = (EXERCISES[quest.subject] && EXERCISES[quest.subject][user]) || [];

    if (!templates.length) {
        questions = [{
            type: 'choice',
            question: 'Nu există încă exerciții pentru această materie la profilul tău.',
            options: ['Înțeleg'],
            answer: 'Înțeleg',
            hint: 'Alege o misiune din materiile profilului.',
            done: false,
            correct: null
        }];
        document.getElementById('progressDots').innerHTML = '<div class="dot dot--current" data-i="0"></div>';
        document.getElementById('totalQ').textContent = '1';
        return;
    }

    // Filter templates based on difficulty level
    // For now, we weight templates based on difficulty:
    // easy: 70% easy, 30% medium
    // medium: 20% easy, 60% medium, 20% hard
    // hard: 30% medium, 70% hard
    // Since our templates don't have explicit difficulty tags yet,
    // we'll use the template index as a proxy (first third = easy, middle = medium, last = hard)
    let weightedTemplates = [...templates];
    const thirdLen = Math.floor(templates.length / 3);

    if (subjectDifficulty === 'easy') {
        // Prioritize earlier (simpler) templates
        const easyPool = templates.slice(0, thirdLen * 2);
        weightedTemplates = [...easyPool, ...easyPool, ...templates.slice(thirdLen * 2)];
    } else if (subjectDifficulty === 'hard') {
        // Prioritize later (harder) templates
        const hardPool = templates.slice(thirdLen);
        weightedTemplates = [...templates.slice(0, thirdLen), ...hardPool, ...hardPool];
    }

    // SHUFFLE templates first for variety
    const shuffledTemplates = shuffle([...weightedTemplates]);

    questions = [];
    const usedIndices = new Set();

    // Generate 5 unique questions
    for (let i = 0; i < 5; i++) {
        let templateIndex;
        let attempts = 0;

        // Try to get a unique template from SHUFFLED array
        do {
            templateIndex = rand(0, shuffledTemplates.length - 1);
            attempts++;
        } while (usedIndices.has(templateIndex) && attempts < 20 && usedIndices.size < shuffledTemplates.length);

        usedIndices.add(templateIndex);
        const t = shuffledTemplates[templateIndex];
        const g = t.gen();

        let qText = g.question || t.q;
        Object.keys(g.vars).forEach(k => {
            qText = qText.replace(`{${k}}`, `<span class="highlight">${g.vars[k]}</span>`);
        });

        // SHUFFLE options for each question
        const shuffledOpts = g.opts ? shuffle([...g.opts]) : null;

        questions.push({
            type: t.type,
            question: qText,
            options: shuffledOpts,
            answer: g.ans,
            hint: g.hint,
            done: false,
            correct: null
        });
    }

    // SHUFFLE final question order
    questions = shuffle(questions);

    document.getElementById('progressDots').innerHTML = questions.map((_, i) =>
        `<div class="dot" data-i="${i}"></div>`
    ).join('');
    document.getElementById('totalQ').textContent = '5';
}

function showQuestion() {
    const q = questions[qIndex];
    document.getElementById('currentQ').textContent = qIndex + 1;
    document.getElementById('questionNumber').textContent = `Întrebarea ${qIndex + 1} din 5`;
    document.getElementById('questionText').innerHTML = q.question;

    document.querySelectorAll('.dot').forEach((d, i) => {
        d.className = 'dot' + (i === qIndex ? ' dot--current' : questions[i].done ? (questions[i].correct ? ' dot--completed' : '') : '');
    });

    const sec = document.getElementById('answerSection');
    if (q.type === 'choice') {
        sec.innerHTML = `<div class="options-grid">${q.options.map(o =>
            `<button class="option-btn" onclick="select(this,'${o}')" data-a="${o}">${o}</button>`
        ).join('')}</div>`;
    } else {
        sec.innerHTML = `<div style="text-align:center">
            <input type="number" class="number-input" id="numIn" inputmode="numeric" placeholder="?" autofocus>
        </div>`;
    }
    selected = null;

    // Setup hint section - colapsabil
    const hintSection = document.getElementById('hintSection');
    const hintText = document.getElementById('hintText');
    const hintBtn = document.querySelector('.hint-btn');

    if (q.hint && hintSection) {
        hintSection.style.display = 'block';
        hintText.textContent = q.hint;
        hintText.classList.remove('show');
        if (hintBtn) hintBtn.classList.remove('active');
    } else if (hintSection) {
        hintSection.style.display = 'none';
    }
}

// Toggle hint visibility - colapsabil
function toggleHint() {
    const hintText = document.getElementById('hintText');
    const hintBtn = document.querySelector('.hint-btn');

    if (hintText.classList.contains('show')) {
        hintText.classList.remove('show');
        if (hintBtn) hintBtn.classList.remove('active');
    } else {
        hintText.classList.add('show');
        if (hintBtn) hintBtn.classList.add('active');
    }
}

function select(btn, ans) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('option-btn--selected'));
    btn.classList.add('option-btn--selected');
    selected = ans;
}

function checkAnswer() {
    const q = questions[qIndex];
    let ans = selected;
    if (q.type === 'math') {
        const input = document.getElementById('numIn');
        ans = input ? parseInt(input.value) : null;
    }
    if (ans === null || ans === '' || (q.type === 'math' && isNaN(ans))) {
        // Shake animation for empty answer
        document.getElementById('answerSection').style.animation = 'shake 0.3s';
        setTimeout(() => document.getElementById('answerSection').style.animation = '', 300);
        return;
    }

    const ok = String(ans).toLowerCase() === String(q.answer).toLowerCase();
    q.done = true;
    q.correct = ok;

    if (q.type === 'choice') {
        document.querySelectorAll('.option-btn').forEach(b => {
            if (String(b.dataset.a).toLowerCase() === String(q.answer).toLowerCase()) {
                b.classList.add('option-btn--correct');
            } else if (String(b.dataset.a).toLowerCase() === String(ans).toLowerCase() && !ok) {
                b.classList.add('option-btn--wrong');
            }
        });
    }

    if (ok) score += Math.floor(quest.points / 5);
    showFeedback(ok, q.hint);
}

function showFeedback(ok, hint) {
    const ov = document.getElementById('feedbackOverlay');
    const icons = ok ? ['🎉', '⭐', '🌟', '💪', '👏'] : ['🤔', '💭'];
    document.getElementById('feedbackIcon').textContent = icons[rand(0, icons.length - 1)];
    document.getElementById('feedbackTitle').textContent = ok ?
        ['Bravo!', 'Excelent!', 'Super!', 'Foarte bine!'][rand(0, 3)] :
        'Nu exact...';
    document.getElementById('feedbackMessage').textContent = ok ?
        'Răspuns corect!' :
        `Răspunsul corect era: ${questions[qIndex].answer}`;
    document.getElementById('pointsEarned').textContent = ok ?
        `+${Math.floor(quest.points / 5)} puncte` :
        hint || 'Continuă să înveți!';
    ov.classList.add('show');
}

function nextQuestion() {
    document.getElementById('feedbackOverlay').classList.remove('show');
    qIndex++;
    if (qIndex >= 5) complete();
    else showQuestion();
}

function skipQuestion() {
    questions[qIndex].done = true;
    questions[qIndex].correct = false;
    qIndex++;
    if (qIndex >= 5) complete();
    else showQuestion();
}

function complete() {
    const ok = questions.filter(q => q.correct).length;
    const user = localStorage.getItem('eduquest_profile') || 'rebecca';
    let stats = JSON.parse(localStorage.getItem(`eduquest_stats_${user}`) || '{"totalPoints":0,"questsCompleted":0,"streak":0}');
    stats.totalPoints += score;
    stats.questsCompleted++;
    localStorage.setItem(`eduquest_stats_${user}`, JSON.stringify(stats));

    // Mark quest as completed in quest list
    try {
        const savedQuests = JSON.parse(localStorage.getItem('eduquest_quests') || '[]');
        const questIndex = savedQuests.findIndex(q => q.id === quest.id);
        if (questIndex >= 0) {
            savedQuests[questIndex].completed = true;
            localStorage.setItem('eduquest_quests', JSON.stringify(savedQuests));
        }
    } catch (e) { }

    // Send feedback to server for analysis
    sendFeedback(user, ok);

    const ov = document.getElementById('feedbackOverlay');
    document.getElementById('feedbackIcon').textContent = ok >= 4 ? '🏆' : ok >= 2 ? '🎯' : '📚';
    document.getElementById('feedbackTitle').textContent = 'Misiune Completată!';
    document.getElementById('feedbackMessage').textContent = `Ai răspuns corect la ${ok} din 5 întrebări`;
    document.getElementById('pointsEarned').textContent = `+${score} puncte câștigate!`;
    ov.querySelector('.btn').textContent = 'Înapoi la Misiuni';
    ov.querySelector('.btn').onclick = () => location.href = 'quests.html';
    ov.classList.add('show');
}

function sendFeedback(user, correctCount) {
    // Create feedback data
    const feedback = {
        user: user,
        subject: quest.subject,
        quest_id: quest.id,
        quest_title: quest.title,
        correct: correctCount,
        total: 5,
        accuracy: (correctCount / 5) * 100,
        score: score,
        questions: questions.map(q => ({
            question: q.question.replace(/<[^>]*>/g, ''),
            correct: q.correct,
            answer: q.answer
        })),
        end_time: new Date().toISOString()
    };

    // Save feedback locally (works with GitHub Pages)
    saveFeedbackLocally(feedback);

    // Try to send to server if available (optional)
    fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
    }).catch(() => {}); // Silent fail - local save is primary
}

// Save feedback to localStorage for analysis
function saveFeedbackLocally(feedback) {
    const user = feedback.user;
    const key = `eduquest_feedback_${user}`;

    // Get existing feedback history
    let history = [];
    try {
        const stored = localStorage.getItem(key);
        if (stored) history = JSON.parse(stored);
    } catch (e) {}

    // Add new feedback
    history.push({
        ...feedback,
        timestamp: new Date().toISOString()
    });

    // Keep last 100 entries per user
    if (history.length > 100) {
        history = history.slice(-100);
    }

    localStorage.setItem(key, JSON.stringify(history));

    // Update difficulty based on performance
    updateDifficultyBasedOnFeedback(feedback);
}

// Adaptive difficulty system
function updateDifficultyBasedOnFeedback(feedback) {
    const user = feedback.user;
    const subject = feedback.subject;
    const accuracy = feedback.accuracy;

    const diffKey = `eduquest_difficulty_${user}`;
    let difficulties = {};

    try {
        const stored = localStorage.getItem(diffKey);
        if (stored) difficulties = JSON.parse(stored);
    } catch (e) {}

    const current = difficulties[subject] || 'medium';
    const levels = ['easy', 'medium', 'hard'];
    const currentIdx = levels.indexOf(current);

    // Adjust difficulty based on accuracy
    if (accuracy >= 90 && currentIdx < 2) {
        difficulties[subject] = levels[currentIdx + 1];
        console.log(`${user}: ${subject} difficulty increased to ${levels[currentIdx + 1]}`);
    } else if (accuracy < 50 && currentIdx > 0) {
        difficulties[subject] = levels[currentIdx - 1];
        console.log(`${user}: ${subject} difficulty decreased to ${levels[currentIdx - 1]}`);
    }

    localStorage.setItem(diffKey, JSON.stringify(difficulties));
}

function goBack() {
    if (confirm('Sigur vrei să ieși? Progresul acestei misiuni se va pierde.')) {
        location.href = 'quests.html';
    }
}

document.addEventListener('DOMContentLoaded', init);
