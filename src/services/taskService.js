import { addTaskToFirebase, getTasksFromFirebase } from "./firebase";
import { addTask as addTaskLocal, getTasks as getLocalTasks, initDB } from "./db";

export async function saveTask(task) {
    if (navigator.onLine) {
        await addTaskToFirebase(task);
    } else {
        await addTaskLocal({ ...task, pendingSync: true });
    }
}

export async function getAllTasks() {
    if (navigator.onLine) {
        return await getTasksFromFirebase();
    } else {
        return await getLocalTasks();
    }
}

export async function syncTasks() {
    if (navigator.onLine) {
        const tasks = await getLocalTasks();
        const pending = tasks.filter(t => t.pendingSync);
        for (const task of pending) {
            await addTaskToFirebase(task);
        }
        const db = await initDB();
        for (const task of pending) {
            await db.delete('tasks', task.id);
        }
    }
}

window.addEventListener('online', () => {
    syncTasks();
});