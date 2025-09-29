import React, { useState, useEffect } from "react";
import { saveTask, getAllTasks, syncTasks } from "../services/taskService";
import { logout, auth } from "../services/firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Home({ onLogout, onGoToProfile }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [urgency, setUrgency] = useState("normal");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTasks() {
            const allTasks = await getAllTasks();
            const userId = auth.currentUser?.uid;
            setTasks(allTasks.filter(task => task.user === userId));
        }
        fetchTasks();

        const syncAndReload = async () => {
            await syncTasks();
            const allTasks = await getAllTasks();
            const userId = auth.currentUser?.uid;
            setTasks(allTasks.filter(task => task.user === userId));
        };

        window.addEventListener("online", syncAndReload);

        return () => {
            window.removeEventListener("online", syncAndReload);
        };
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title || !time) return;
        const newTask = {
            id: Date.now().toString(),
            title,
            time,
            urgency,
            completed: false,
            deleted: false,
            user: auth.currentUser?.uid,
        };
        await saveTask(newTask);
        setTitle("");
        setTime("");
        setUrgency("normal");
        const allTasks = await getAllTasks();
        const userId = auth.currentUser?.uid;
        setTasks(allTasks.filter(task => task.user === userId));
    };

    const handleCompleteTask = async (task) => {
        const updatedTask = { ...task, completed: true, pendingSync: !navigator.onLine };
        await saveTask(updatedTask);
        const allTasks = await getAllTasks();
        const userId = auth.currentUser?.uid;
        setTasks(allTasks.filter(task => task.user === userId));
    };

    const handleDeleteTask = async (task) => {
        const updatedTask = { ...task, deleted: true, pendingSync: !navigator.onLine };
        await saveTask(updatedTask);
        const allTasks = await getAllTasks();
        const userId = auth.currentUser?.uid;
        setTasks(allTasks.filter(task => task.user === userId));
    };

    const handleLogout = async () => {
        await logout();
        if (onLogout) onLogout();
    };

    return (
        <div className="login-container">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 400 }}>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                <button className="logout-btn" onClick={onGoToProfile}>Perfil</button>
            </div>
            <h2>Minhas Tarefas</h2>
            <form className="login-form" onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    required
                />
                <select value={urgency} onChange={e => setUrgency(e.target.value)}>
                    <option value="baixa">Baixa</option>
                    <option value="normal">Normal</option>
                    <option value="alta">Alta</option>
                </select>
                <button type="submit">Adicionar Tarefa</button>
            </form>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.urgency}`}>
                        <strong>{task.title}</strong> <br />
                        Horário: {task.time} <br />
                        Urgência: <span>{task.urgency}</span>
                        {task.completed ? (
                            <span style={{ color: "green", marginLeft: 8 }}>Concluída</span>
                        ) : task.deleted ? (
                            <span style={{ color: "#d32f2f", marginLeft: 8 }}>Apagada</span>
                        ) : (
                            <>
                                <button
                                    style={{ marginLeft: 8 }}
                                    onClick={() => handleCompleteTask(task)}
                                >
                                    Concluir
                                </button>
                                <button
                                    style={{ marginLeft: 8, color: "red" }}
                                    onClick={() => handleDeleteTask(task)}
                                >
                                    Deletar
                                </button>
                            </>
                        )}
                        {task.pendingSync && <span style={{ color: "red", marginLeft: 8 }}>Offline</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
