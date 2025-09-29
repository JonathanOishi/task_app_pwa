import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics, logEvent, setUserId, setUserProperties } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

let analytics = null;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
export { app, db, analytics };

// Autenticação
export async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (analytics) {
        logEvent(analytics, "login", { method: "email" });
        setUserId(analytics, userCredential.user.uid);
        setUserProperties(analytics, { email: userCredential.user.email });
    }
    return userCredential;
}

export async function register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (analytics) {
        logEvent(analytics, "sign_up", { method: "email" });
        setUserId(analytics, userCredential.user.uid);
        setUserProperties(analytics, { email: userCredential.user.email });
    }
    return userCredential;
}

export async function logout() {
    await signOut(auth);
    if (analytics) logEvent(analytics, "logout");
}

// Tarefas
export async function addTaskToFirebase(task) {
    await setDoc(doc(db, "tasks", task.id), task);
    if (analytics) logEvent(analytics, "add_task", { urgency: task.urgency });
}

export async function getTasksFromFirebase() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    if (analytics) logEvent(analytics, "get_tasks");
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
