# StudyForge Learning Platform

A browser-based study toolkit for creating and practicing custom learning sets. This repository is maintained under **[nih00002](https://github.com/nih00002/StudyForge-Learning-Platform)** as a source-code project, **not a hosted application**.

## Overview

StudyForge is implemented with HTML, CSS, and modular JavaScript. It provides study-set creation and several practice modes, with Firebase Authentication and Cloud Firestore used for accounts and study data when a Firebase project is configured.

## Features in the source code

| Area | Functionality |
| --- | --- |
| Study sets | Create, review, and delete sets and associated cards |
| Flashcards | Card flipping, navigation, shuffle, and progress |
| Write | Answer recall with feedback |
| Spell | Spelling practice using the browser's speech synthesis where supported |
| Learn | Mixed practice questions and checkpoints |
| MCQ tests | Multiple-choice questions and review after completion |
| Import/export | Anki-style tab-separated text and CSV; MCQ CSV import |
| Accounts | Email/password registration and sign-in through Firebase Authentication |

MCQ CSV import expects `Question, Option_A, Option_B, Option_C, Option_D`, where **Option_A is treated as the correct answer in the input file**. The interface can shuffle answer choices when displaying a question. This format is a project convention, not a generic MCQ interchange standard.

## Tech stack

- JavaScript ES modules, HTML, CSS
- Tailwind CSS (CDN)
- Firebase Authentication and Cloud Firestore (requires **your own** Firebase project)
- PapaParse for CSV parsing (CDN)
- Browser Web Speech API for spelling audio

## Repository layout

```text
StudyForge-Learning-Platform/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── router.js
│   ├── firebase-config.example.js
│   ├── pages/
│   │   ├── create-set.js
│   │   ├── dashboard.js
│   │   ├── home.js
│   │   ├── login.js
│   │   ├── signup.js
│   │   ├── set-detail.js
│   │   └── study-*.js
│   └── utils/helpers.js
├── .gitignore
├── NOTICE.md
└── README.md
```

## Local setup (optional)

**The repository does not include a functioning Firebase backend or live site.** To run the full app yourself:

1. Create or use a Firebase project you control. Add a Firebase Web App, enable **Email/Password** in Firebase Authentication, and configure Cloud Firestore.
2. Copy `js/firebase-config.example.js` to `js/firebase-config.js` (this file is ignored by Git). Replace the example values with your **own** Firebase Web App configuration. Do not use the Firebase project that belonged to the previous source archive.
3. Before storing any real data, establish Firestore Security Rules that enforce authentication and data ownership for both study sets and their cards. **Do not use open development rules for a public application.**
4. Serve the project directory using a local static server (opening `index.html` directly as a `file://` URL is not sufficient for ES module imports):

   ```bash
   python -m http.server 8000
   ```

5. Visit `http://localhost:8000` on your computer. The page uses CDN modules, so an internet connection is required for Firebase, Tailwind, and PapaParse.

Firebase configuration is required for the application's authentication and saved study-set features. **No hosting or deployment is configured or claimed.**

## Quick checks

You can run the included offline source checks with Node.js (no packages to install):

```bash
node tests/smoke.mjs
```

## Validation and limitations

The source has been organized, duplicate copies removed, and JavaScript syntax checked. A live Firebase integration or complete browser-based end-to-end test has **not** been performed on this customized copy. The original archive's production-readiness claims were not independently verifiable and have been removed.

The code also uses HTML templates to render stored content. Some common rendering paths have escaping safeguards, but further security review and comprehensive testing are needed before exposing the service to untrusted users.

## Attribution and licensing

See [NOTICE.md](NOTICE.md) for the supplied source's provenance and licensing caveat. No new open-source license has been asserted because the original archive contained no explicit license.

## Repository

https://github.com/nih00002/StudyForge-Learning-Platform
