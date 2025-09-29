import { addTaskToFirebase, getTasksFromFirebase } from "./firebase";
import { addTask as addTaskLocal, getTasks as getLocalTasks, initDB } from "./db";

// Salva tarefa, escolhendo o destino conforme conexão
export async function saveTask(task) {
    if (navigator.onLine) {
        await addTaskToFirebase(task);
    } else {
        await addTaskLocal({ ...task, pendingSync: true });
    }
}

// Busca todas as tarefas (Firebase se online, local se offline)
export async function getAllTasks() {
    if (navigator.onLine) {
        return await getTasksFromFirebase();
    } else {
        return await getLocalTasks();
    }
}

// Sincroniza tarefas pendentes do IndexedDB para Firebase
export async function syncTasks() {
    if (navigator.onLine) {
        const tasks = await getLocalTasks();
        const pending = tasks.filter(t => t.pendingSync);
        for (const task of pending) {
            await addTaskToFirebase(task);
        }
        // Limpa tarefas pendentes do IndexedDB
        const db = await initDB();
        for (const task of pending) {
            await db.delete('tasks', task.id);
        }
    }
}

// Sincroniza automaticamente ao voltar online
window.addEventListener('online', () => {
    syncTasks();
});