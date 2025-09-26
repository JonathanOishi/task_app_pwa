// src/services/firebase.js
// Inicialização do Firebase para um app Vite + React (JavaScript)
// Lê as variáveis de ambiente definidas no arquivo .env.local (prefixadas com VITE_)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializa app Firebase (idempotente: chamar múltiplas vezes não recria apps)
const app = initializeApp(firebaseConfig);

// Inicializa serviços que vamos usar no projeto
export const auth = getAuth(app);
export const db = getFirestore(app);

// Inicializa Analytics somente se estiver no browser (evita erro em SSR ou testes)
export let analytics = null;
if (typeof window !== "undefined") {
    try {
        analytics = getAnalytics(app);
    } catch (err) {
        // Se ocorrer erro (ex.: ambiente sem suporte), apenas logamos em dev e seguimos.
        // console.warn("Firebase Analytics não inicializado:", err);
    }
}

export default app;
