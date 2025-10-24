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
        <div className="login-container slide-up">
            <div className="nav-buttons">
                <button className="logout-btn" onClick={handleLogout}>
                    🚪 Logout
                </button>
                <button className="logout-btn" onClick={onGoToProfile}>
                    👤 Perfil
                </button>
            </div>

            <h2>📝 Minhas Tarefas</h2>

            {/* Estatísticas das tarefas */}
            <div className="task-stats">
                <div className="stat-item">
                    <span className="stat-number">{tasks.filter(t => !t.completed && !t.deleted).length}</span>
                    <span className="stat-label">Pendentes</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{tasks.filter(t => t.completed).length}</span>
                    <span className="stat-label">Concluídas</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{tasks.filter(t => t.urgency === 'alta' && !t.completed && !t.deleted).length}</span>
                    <span className="stat-label">Urgentes</span>
                </div>
            </div>

            <form className="login-form" onSubmit={handleAddTask}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="📋 Digite o título da tarefa..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                        className="form-input"
                        title="Horário da tarefa"
                    />
                </div>

                <div className="form-group">
                    <select
                        value={urgency}
                        onChange={e => setUrgency(e.target.value)}
                        className="form-input"
                        title="Nível de urgência"
                    >
                        <option value="baixa">🟢 Baixa Prioridade</option>
                        <option value="normal">🟡 Prioridade Normal</option>
                        <option value="alta">🔴 Alta Prioridade</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary">
                    ➕ Adicionar Tarefa
                </button>
            </form>

            {tasks.length > 0 && (
                <div className="task-container">
                    <div className="task-header">
                        <h3>📋 Lista de Tarefas</h3>
                        {!navigator.onLine && (
                            <span className="offline-indicator">📡 Offline</span>
                        )}
                    </div>

                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className={`task-item ${task.urgency} slide-up`}>
                                <div>
                                    <strong>{task.title}</strong>
                                    <br />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        🕐 Horário: {task.time}
                                    </span>
                                    <br />
                                    <span style={{ marginTop: 'var(--spacing-sm)', display: 'inline-block' }}>
                                        Urgência: <span className={`badge badge-${task.urgency === 'alta' ? 'danger' : task.urgency === 'normal' ? 'warning' : 'success'} ${task.urgency}`}>
                                            {task.urgency === 'alta' ? '🔴 Alta' : task.urgency === 'normal' ? '🟡 Normal' : '🟢 Baixa'}
                                        </span>
                                    </span>
                                </div>

                                <div style={{ marginTop: 'var(--spacing-md)' }}>
                                    {task.completed ? (
                                        <span className="badge badge-success">✅ Concluída</span>
                                    ) : task.deleted ? (
                                        <span className="badge badge-danger">🗑️ Apagada</span>
                                    ) : (
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                            <button
                                                className="btn-success btn-small"
                                                onClick={() => handleCompleteTask(task)}
                                                title="Marcar como concluída"
                                            >
                                                ✅ Concluir
                                            </button>
                                            <button
                                                className="btn-danger btn-small"
                                                onClick={() => handleDeleteTask(task)}
                                                title="Deletar tarefa"
                                            >
                                                🗑️ Deletar
                                            </button>
                                        </div>
                                    )}
                                    {task.pendingSync && (
                                        <span className="offline-indicator" style={{ marginLeft: 'var(--spacing-sm)' }}>
                                            📡 Pendente sync
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {tasks.length === 0 && (
                <div className="card" style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
                    <h3>🎯 Nenhuma tarefa ainda</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Comece adicionando sua primeira tarefa usando o formulário acima!
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;
