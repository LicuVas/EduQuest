// Firebase Cloud Sync for EduQuest
// This module handles synchronization between localStorage and Firebase

// Firebase configuration - EduQuest
const firebaseConfig = {
    apiKey: "AIzaSyAOum6BKaaRHT6Y-dftX-hSKM0doxAfPMU",
    authDomain: "eduquest-4cf1e.firebaseapp.com",
    databaseURL: "https://eduquest-4cf1e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eduquest-4cf1e",
    storageBucket: "eduquest-4cf1e.firebasestorage.app",
    messagingSenderId: "48897730816",
    appId: "1:48897730816:web:77da7cf31717c6713eabe5"
};

// Initialize Firebase (will be set after SDK loads)
let database = null;
let isOnline = false;

// Initialize Firebase when SDK is loaded
function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.log('Firebase SDK not loaded yet');
        return false;
    }

    try {
        // Check if already initialized
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        database = firebase.database();
        isOnline = true;
        console.log('Firebase initialized successfully');

        // Set up connection state listener
        const connectedRef = database.ref('.info/connected');
        connectedRef.on('value', (snap) => {
            isOnline = snap.val() === true;
            console.log('Firebase connection:', isOnline ? 'online' : 'offline');
            updateConnectionIndicator();
        });

        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        isOnline = false;
        return false;
    }
}

// Update connection indicator in UI
function updateConnectionIndicator() {
    const indicator = document.getElementById('sync-indicator');
    if (indicator) {
        indicator.className = isOnline ? 'sync-online' : 'sync-offline';
        indicator.title = isOnline ? 'Sincronizat cu cloud' : 'Offline - date locale';
    }
}

// ==================== CLOUD SYNC FUNCTIONS ====================

// Save user data to Firebase
async function syncToCloud(userId, dataType, data) {
    if (!database || !isOnline) {
        console.log('Offline - saving locally only');
        return false;
    }

    try {
        const path = `users/${userId}/${dataType}`;
        await database.ref(path).set({
            ...data,
            lastUpdated: Date.now()
        });
        console.log(`Synced ${dataType} for ${userId} to cloud`);
        return true;
    } catch (error) {
        console.error('Sync to cloud failed:', error);
        return false;
    }
}

// Load user data from Firebase
async function syncFromCloud(userId, dataType) {
    if (!database || !isOnline) {
        console.log('Offline - using local data');
        return null;
    }

    try {
        const path = `users/${userId}/${dataType}`;
        const snapshot = await database.ref(path).once('value');
        const data = snapshot.val();
        console.log(`Loaded ${dataType} for ${userId} from cloud`);
        return data;
    } catch (error) {
        console.error('Sync from cloud failed:', error);
        return null;
    }
}

// ==================== ENHANCED LOCAL STORAGE WITH SYNC ====================

// Get user stats with cloud sync
async function getStatsWithSync(userId) {
    // Try cloud first
    const cloudData = await syncFromCloud(userId, 'stats');

    if (cloudData) {
        // Update local storage with cloud data
        localStorage.setItem(`eduquest_stats_${userId}`, JSON.stringify(cloudData));
        return cloudData;
    }

    // Fallback to local
    const local = localStorage.getItem(`eduquest_stats_${userId}`);
    return local ? JSON.parse(local) : { totalPoints: 0, questsCompleted: 0, streak: 0 };
}

// Save user stats with cloud sync
async function saveStatsWithSync(userId, stats) {
    // Always save locally first
    localStorage.setItem(`eduquest_stats_${userId}`, JSON.stringify(stats));

    // Then sync to cloud
    await syncToCloud(userId, 'stats', stats);
}

// Get user quests with cloud sync
async function getQuestsWithSync(userId) {
    // Try cloud first
    const cloudData = await syncFromCloud(userId, 'quests');

    if (cloudData && cloudData.items) {
        // Update local storage with cloud data
        localStorage.setItem(`eduquest_quests_${userId}`, JSON.stringify(cloudData.items));
        return cloudData.items;
    }

    // Fallback to local, then to defaults
    const local = localStorage.getItem(`eduquest_quests_${userId}`);
    if (local) {
        return JSON.parse(local);
    }

    return SAMPLE_QUESTS[userId] || [];
}

// Save user quests with cloud sync
async function saveQuestsWithSync(userId, quests) {
    // Always save locally first
    localStorage.setItem(`eduquest_quests_${userId}`, JSON.stringify(quests));

    // Then sync to cloud
    await syncToCloud(userId, 'quests', { items: quests });
}

// Get feedback history with cloud sync
async function getFeedbackWithSync(userId) {
    const cloudData = await syncFromCloud(userId, 'feedback');

    if (cloudData && cloudData.items) {
        localStorage.setItem(`eduquest_feedback_${userId}`, JSON.stringify(cloudData.items));
        return cloudData.items;
    }

    const local = localStorage.getItem(`eduquest_feedback_${userId}`);
    return local ? JSON.parse(local) : [];
}

// Save feedback with cloud sync
async function saveFeedbackWithSync(userId, feedback) {
    // Get existing feedback
    let history = await getFeedbackWithSync(userId);
    history.push(feedback);

    // Keep last 100 entries
    if (history.length > 100) {
        history = history.slice(-100);
    }

    localStorage.setItem(`eduquest_feedback_${userId}`, JSON.stringify(history));
    await syncToCloud(userId, 'feedback', { items: history });
}

// ==================== ADMIN FUNCTIONS ====================

// Reset user progress (local + cloud)
async function resetUserProgressWithSync(userId) {
    // Clear local
    localStorage.removeItem(`eduquest_stats_${userId}`);
    localStorage.removeItem(`eduquest_quests_${userId}`);
    localStorage.removeItem(`eduquest_achievements_${userId}`);
    localStorage.removeItem(`eduquest_difficulty_${userId}`);
    localStorage.removeItem(`eduquest_feedback_${userId}`);

    // Clear cloud
    if (database && isOnline) {
        try {
            await database.ref(`users/${userId}`).remove();
            console.log(`Reset cloud data for ${userId}`);
        } catch (error) {
            console.error('Failed to reset cloud data:', error);
        }
    }
}

// Get all users data (for admin dashboard)
async function getAllUsersData() {
    const usersData = {};

    for (const userId of Object.keys(PROFILES)) {
        usersData[userId] = {
            profile: PROFILES[userId],
            stats: await getStatsWithSync(userId),
            quests: await getQuestsWithSync(userId),
            feedback: await getFeedbackWithSync(userId)
        };
    }

    return usersData;
}

// ==================== REAL-TIME LISTENERS ====================

// Listen for changes to a user's data
function listenToUserData(userId, callback) {
    if (!database) return null;

    const userRef = database.ref(`users/${userId}`);
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data && callback) {
            callback(data);
        }
    });

    return userRef; // Return ref so it can be detached later
}

// Stop listening
function stopListening(ref) {
    if (ref) {
        ref.off();
    }
}

// ==================== INITIALIZATION ====================

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Firebase SDK to load
    setTimeout(() => {
        if (initFirebase()) {
            // Add sync indicator to page
            addSyncIndicator();
        }
    }, 500);
});

// Add visual sync indicator
function addSyncIndicator() {
    if (document.getElementById('sync-indicator')) return;

    const indicator = document.createElement('div');
    indicator.id = 'sync-indicator';
    indicator.className = isOnline ? 'sync-online' : 'sync-offline';
    indicator.innerHTML = '<span class="sync-dot"></span>';
    indicator.title = isOnline ? 'Sincronizat cu cloud' : 'Offline';

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #sync-indicator {
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: help;
        }
        #sync-indicator.sync-online {
            background: rgba(39, 174, 96, 0.9);
            color: white;
        }
        #sync-indicator.sync-offline {
            background: rgba(231, 76, 60, 0.9);
            color: white;
        }
        .sync-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: currentColor;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(indicator);
}

// Export functions
window.FirebaseSync = {
    init: initFirebase,
    isOnline: () => isOnline,
    getStats: getStatsWithSync,
    saveStats: saveStatsWithSync,
    getQuests: getQuestsWithSync,
    saveQuests: saveQuestsWithSync,
    getFeedback: getFeedbackWithSync,
    saveFeedback: saveFeedbackWithSync,
    resetUser: resetUserProgressWithSync,
    getAllUsers: getAllUsersData,
    listen: listenToUserData,
    stopListening: stopListening
};
