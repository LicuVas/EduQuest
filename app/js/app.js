// EduQuest - Main Application Script

// User profiles - all family members
const PROFILES = {
    rebecca: {
        name: 'Rebecca',
        nickname: 'Rebi',
        grade: 4,
        avatarImg: 'images/mascots/Re_Roblox.png',
        avatarEmoji: '🎮',
        gradient: 'var(--gradient-rebecca)',
        subjects: ['romana', 'matematica', 'engleza', 'informatica'],
        style: 'technical'
    },
    brianna: {
        name: 'Brianna',
        nickname: 'Bri',
        grade: 2,
        avatarImg: 'images/mascots/Bri_Roblox.png',
        avatarEmoji: '🎮',
        gradient: 'var(--gradient-brianna)',
        subjects: ['romana', 'matematica', 'engleza'],
        style: 'artistic'
    },
    tata: {
        name: 'Tata',
        nickname: 'Tata',
        grade: 'Avansat',
        avatarEmoji: '👨‍💻',
        gradient: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
        subjects: ['autohotkey', 'english_grammar', 'cpp', 'python'],
        style: 'technical'
    },
    nicoleta: {
        name: 'Nicoleta',
        nickname: 'Mama',
        grade: 'Clasa a XII-a · seral',
        avatarEmoji: '👩‍🎓',
        gradient: 'linear-gradient(135deg, #e17055 0%, #fdcb6e 100%)',
        subjects: ['matematica', 'romana', 'engleza', 'franceza', 'italiana', 'istorie', 'geografie'],
        style: 'balanced',
        // Secțiunea „Școala” din dashboard: materiale pentru școala de la seral (site separat)
        school: {
            title: 'Școala · clasa a XII-a seral',
            links: [
                {
                    href: 'https://teste-scoala-seral.pages.dev/',
                    icon: '📝',
                    label: 'Teste de antrenament pe materii',
                    desc: 'TIC: sistemul de operare, fișiere, foldere. Celelalte materii apar acolo pe rând.'
                },
                {
                    href: 'https://teste-scoala-seral.pages.dev/contabilitate/plan-de-conturi/',
                    icon: '📒',
                    label: 'Planul de conturi · scris mare',
                    desc: 'Toate cele 619 de conturi, cu buton de mărit scrisul și căutare după număr sau cuvânt.'
                }
            ]
        }
    }
};

// Sample quests for each profile
const SAMPLE_QUESTS = {
    rebecca: [
        { id: 1, subject: 'romana', title: 'Citește un text scurt', points: 15, completed: false },
        { id: 2, subject: 'matematica', title: 'Adunări și scăderi până la 1 000 000', points: 20, completed: false },
        { id: 3, subject: 'engleza', title: 'Învață 8 cuvinte noi', points: 15, completed: false },
        { id: 4, subject: 'matematica', title: 'Fracții și numere zecimale', points: 25, completed: false },
        { id: 5, subject: 'informatica', title: 'Fișiere și foldere', points: 20, completed: false }
    ],
    brianna: [
        { id: 1, subject: 'romana', title: 'Citește o propoziție', points: 10, completed: false },
        { id: 2, subject: 'matematica', title: 'Adunări până la 100', points: 15, completed: false },
        { id: 3, subject: 'engleza', title: 'Culorile și numerele 1-20', points: 10, completed: false },
        { id: 4, subject: 'romana', title: 'Scrie 3 propoziții scurte', points: 15, completed: false },
        { id: 5, subject: 'matematica', title: 'Scăderi cu trecere peste 10', points: 20, completed: false }
    ],
    tata: [
        { id: 1, subject: 'autohotkey', title: 'AHK Script Review', points: 25, completed: false },
        { id: 2, subject: 'english_grammar', title: 'Grammar Practice', points: 20, completed: false },
        { id: 3, subject: 'cpp', title: 'C++ Exercise', points: 30, completed: false },
        { id: 4, subject: 'python', title: 'Python Challenge', points: 25, completed: false },
        { id: 5, subject: 'python', title: 'Code Review: script Python', points: 35, completed: false }
    ],
    nicoleta: [
        { id: 1, subject: 'matematica', title: 'Ecuații de gradul I', points: 20, completed: false },
        { id: 2, subject: 'romana', title: 'Comentariu de text literar', points: 20, completed: false },
        { id: 3, subject: 'engleza', title: 'Tenses: present, past, future', points: 15, completed: false },
        { id: 4, subject: 'istorie', title: 'România în secolul XX', points: 20, completed: false },
        { id: 5, subject: 'geografie', title: 'România: relief și hidrografie', points: 15, completed: false }
    ]
};

// Subject icons
const SUBJECT_ICONS = {
    romana: '📕',
    matematica: '🔢',
    engleza: '🇬🇧',
    informatica: '💻',
    autohotkey: '⌨️',
    english_grammar: '📖',
    cpp: '🔧',
    python: '🐍',
    franceza: '🇫🇷',
    italiana: '🇮🇹',
    istorie: '🏛️',
    geografie: '🗺️',
    bonus: '⭐'
};

// Motivational quotes
const QUOTES = [
    "Fiecare pas mic te duce spre visuri mari! ✨",
    "Ești mai deșteaptă decât crezi! 🌟",
    "Învățăm ceva nou în fiecare zi! 📚",
    "Greșelile ne ajută să creștem! 🌱",
    "Tu poți face orice îți propui! 💪",
    "Curiozitatea este superputerea ta! 🦸‍♀️",
    "Azi e o zi minunată pentru învățat! ☀️"
];

// Level system
const LEVELS = [
    { name: 'Explorator', xp: 0, icon: '🌱' },
    { name: 'Aventurier', xp: 100, icon: '⚔️' },
    { name: 'Campion', xp: 300, icon: '🏆' },
    { name: 'Legendă', xp: 600, icon: '👑' },
    { name: 'Maestru', xp: 1000, icon: '🌟' }
];

// Get current user - URL params take priority over localStorage
function getCurrentUser() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user') || localStorage.getItem('eduquest_profile') || 'rebecca';
}

// Get user profile
function getProfile(userId) {
    return PROFILES[userId] || PROFILES.rebecca;
}

// Get user stats
function getStats(userId) {
    const stats = localStorage.getItem(`eduquest_stats_${userId}`);
    return stats ? JSON.parse(stats) : { totalPoints: 0, questsCompleted: 0, streak: 0 };
}

// Save user stats
function saveStats(userId, stats) {
    localStorage.setItem(`eduquest_stats_${userId}`, JSON.stringify(stats));
}

// Get user quests with progress from localStorage
function getUserQuests(userId) {
    const savedQuests = localStorage.getItem(`eduquest_quests_${userId}`);
    if (savedQuests) {
        const parsed = JSON.parse(savedQuests);
        // Fără misiuni bonus până există EXERCISES.bonus (altfel click → ecran gol).
        const bonusReady = typeof EXERCISES !== 'undefined' && EXERCISES && EXERCISES.bonus;
        return bonusReady ? parsed : parsed.filter(q => q.subject !== 'bonus');
    }
    // Return default quests (all incomplete)
    return SAMPLE_QUESTS[userId] || [];
}

// Save user quests progress
function saveUserQuests(userId, quests) {
    localStorage.setItem(`eduquest_quests_${userId}`, JSON.stringify(quests));
}

// Mark a quest as completed
function completeQuest(userId, questId) {
    const quests = getUserQuests(userId);
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
        quest.completed = true;
        saveUserQuests(userId, quests);

        // Update stats
        const stats = getStats(userId);
        stats.totalPoints = (stats.totalPoints || 0) + quest.points;
        stats.questsCompleted = (stats.questsCompleted || 0) + 1;
        saveStats(userId, stats);

        return true;
    }
    return false;
}

// Reset all progress for a user
function resetUserProgress(userId) {
    localStorage.removeItem(`eduquest_stats_${userId}`);
    localStorage.removeItem(`eduquest_quests_${userId}`);
    localStorage.removeItem(`eduquest_achievements_${userId}`);
    localStorage.removeItem(`eduquest_difficulty_${userId}`);
    localStorage.removeItem(`eduquest_feedback_${userId}`);
}

// Get user level
function getLevel(points) {
    let level = LEVELS[0];
    for (const l of LEVELS) {
        if (points >= l.xp) level = l;
    }
    return level;
}

// Get XP progress to next level
function getLevelProgress(points) {
    const currentLevel = getLevel(points);
    const currentIndex = LEVELS.indexOf(currentLevel);
    const nextLevel = LEVELS[currentIndex + 1];

    if (!nextLevel) return 100; // Max level

    const progress = ((points - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100;
    return Math.min(100, Math.max(0, progress));
}

// Format date nicely
function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('ro-RO', options);
}

// Get greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bună dimineața';
    if (hour < 18) return 'Bună ziua';
    return 'Bună seara';
}

// Play sound effect (if implemented)
function playSound(type) {
    // Sound effects can be added here
    console.log(`Sound: ${type}`);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#00B894' : type === 'error' ? '#E17055' : '#6C5CE7'};
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize app
function initApp() {
    const userId = getCurrentUser();
    const profile = getProfile(userId);
    const stats = getStats(userId);
    const level = getLevel(stats.totalPoints);

    console.log(`EduQuest initialized for ${profile.name}`);
    console.log(`Level: ${level.name} (${stats.totalPoints} XP)`);
}

// Export for use in other scripts
window.EduQuest = {
    getCurrentUser,
    getProfile,
    getStats,
    saveStats,
    getUserQuests,
    saveUserQuests,
    completeQuest,
    resetUserProgress,
    getLevel,
    getLevelProgress,
    getGreeting,
    showNotification,
    PROFILES,
    LEVELS,
    SAMPLE_QUESTS,
    SUBJECT_ICONS,
    QUOTES
};
