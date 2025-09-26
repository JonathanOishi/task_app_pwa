import React, { useState, useEffect } from "react";
import "./login.css";
import app, { analytics, auth } from "../services/firebase";
import { signOut } from "firebase/auth";

function Home({ onLogout }) {
    useEffect(() => {
        // Exibe informações do app e analytics no console
        if (app) {
            console.log("Firebase App Name:", app.name);
            console.log("Firebase App Config:", app.options);
        }
        if (analytics) {
            console.log("Firebase Analytics está inicializado.");
        } else {
            console.log("Firebase Analytics NÃO está inicializado.");
        }
    }, []);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [urgency, setUrgency] = useState("normal");

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!title || !time) return;
        setTasks([
            ...tasks,
            { title, time, urgency, id: Date.now() }
        ]);
        setTitle("");
        setTime("");
        setUrgency("normal");
    };

    const handleLogout = async () => {
        await signOut(auth);
        if (onLogout) onLogout();
    };

    return (
        <div className="login-container">
            <button
                style={{
                    alignSelf: 'flex-end',
                    marginBottom: 12,
                    background: '#fff',
                    color: '#1976d2',
                    border: '1.5px solid #1976d2',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 16,
                    padding: '0.5rem 1.2rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s'
                }}
                onClick={handleLogout}
            >
                Logout
            </button>
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
            <ul style={{ width: "100%", marginTop: 24 }}>
                {tasks.map(task => (
                    <li key={task.id} style={{
                        background: "#f5f5f5",
                        borderRadius: 6,
                        padding: 12,
                        marginBottom: 10,
                        borderLeft: `6px solid ${task.urgency === 'alta' ? '#d32f2f' : task.urgency === 'normal' ? '#fbc02d' : '#388e3c'}`
                    }}>
                        <strong>{task.title}</strong> <br />
                        Horário: {task.time} <br />
                        Urgência: <span style={{ color: task.urgency === 'alta' ? '#d32f2f' : task.urgency === 'normal' ? '#fbc02d' : '#388e3c' }}>{task.urgency}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
