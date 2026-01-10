# 🎮 EduQuest - Platformă Educațională Familială

O platformă educațională gamificată pentru **întreaga familie** - copii și adulți, cu sistem adaptiv de dificultate și feedback în timp real.

![EduQuest](https://img.shields.io/badge/EduQuest-v2.0-purple)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub%20Pages-green)
![Mobile Ready](https://img.shields.io/badge/Mobile-Ready-blue)

## 🌐 Demo Live

**[Accesează EduQuest](https://licuvas.github.io/EduQuest/)**

## 🌟 Caracteristici

- **🎯 Misiuni Personalizate** - Exerciții adaptate nivelului fiecărui utilizator
- **🧠 Sistem Adaptiv** - Dificultatea se ajustează automat bazat pe performanță
- **🏆 Gamification** - Puncte, badge-uri, nivele și streak-uri
- **📊 Analiză Feedback** - Tracking progres și insights
- **📱 Mobile-First** - Optimizat pentru telefoane
- **👨‍👩‍👧‍👧 Multi-Profil** - Suport pentru copii și adulți
- **🎮 Jocuri Interactive** - Memory, drag-drop și puzzle-uri

## 👥 Profiluri Familie

| Membru | Nivel | Mascotă | Subiecte |
|--------|-------|---------|----------|
| **Rebecca** | Clasa III | 🎮 Roblox Avatar | Română, Matematică, Engleză, Informatică |
| **Brianna** | Clasa I | 🎮 Roblox Avatar | Română, Matematică, Engleză |
| **Tata** | Avansat | 👨‍💻 | AHK, C++, Python, Engleză |
| **Nicoleta** | A Doua Șansă | 👩‍🎓 | Mat, Ro, En, Fr, It, Istorie, Geo |

## 🚀 Utilizare

### Varianta Online (GitHub Pages)
Accesează direct link-ul demo de mai sus - nu e nevoie de instalare!

### Varianta Locală

```bash
# Clonează repository-ul
git clone https://github.com/LicuVas/EduQuest.git
cd EduQuest

# Pornește serverul local
python server.py
# sau deschide direct app/index.html în browser
```

**Accesează:** http://localhost:8080

## 📁 Structura Proiectului

```
EduQuest/
├── app/                    # Frontend Web (GitHub Pages ready)
│   ├── index.html         # Selectare profil
│   ├── dashboard.html     # Dashboard principal
│   ├── exercise.html      # Exerciții interactive
│   ├── assessment.html    # Evaluare inițială
│   ├── games/             # Jocuri interactive
│   │   └── memory.html    # Joc de memorie
│   ├── admin/             # Administrare
│   │   └── reset.html     # Reset progres
│   ├── styles/            # CSS
│   └── js/                # JavaScript
│       ├── app.js         # Logică aplicație
│       ├── exercise.js    # 145 template-uri exerciții
│       └── interactive.js # Module jocuri
├── tools/                  # Utilitare (opțional)
│   └── feedback_analyzer.py
├── config.json            # Configurare
└── README.md
```

## 🔧 Configurare (Opțional)

Pentru funcții avansate (AI Tutor), editează `config.json`:

```json
{
    "api": {
        "provider": "grok",
        "api_key": "YOUR_API_KEY"
    }
}
```

## 📚 Materii

- **Română** - Citire, scriere, gramatică
- **Matematică** - Aritmetică, probleme, geometrie
- **Engleză** - Vocabular, traduceri, conversație
- **Bonus** - Logică, puzzle-uri, știință

## 🎮 Sistem de Puncte

| Acțiune | Puncte |
|---------|--------|
| Exercițiu simplu | 10-15 |
| Exercițiu mediu | 15-25 |
| Exercițiu greu | 25-35 |
| Streak 3 zile | Badge 🔥 |
| Streak 7 zile | Badge ⚡ |

## 📊 Sistem de Feedback

Aplicația urmărește automat:
- **Acuratețe** - Procentul de răspunsuri corecte
- **Timp** - Durata pentru fiecare exercițiu
- **Dificultate** - Ajustare automată bazată pe performanță

Datele sunt sincronizate automat cu Firebase pentru acces cross-device.

## 📈 Roadmap

- [x] Interfață web mobilă
- [x] Sistem de misiuni
- [x] 145 template-uri exerciții
- [x] Jocuri interactive (memory, drag-drop)
- [x] Sistem adaptiv dificultate
- [x] Multi-profil familie
- [x] GitHub Pages deployment
- [x] Sincronizare cloud (Firebase)
- [ ] Recompense reale (puncte → timp Roblox)
- [ ] Export rapoarte PDF

## 🔐 Admin

Accesează `/admin/reset.html` pentru:
- Reset progres utilizatori
- Vizualizare statistici

## 📱 Compatibilitate

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Android Chrome
- ✅ Telefoane, tablete, desktop
- ✅ Funcționează offline (după prima încărcare)

---

**Creat cu ❤️ pentru întreaga familie**

*"Fiecare pas mic te duce spre visuri mari!"* ✨
