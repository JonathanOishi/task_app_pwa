import React, { useEffect, useState } from "react";
import { getTasksFromFirebase, auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Profile() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(auth.currentUser);
        async function fetchTasks() {
            const allTasks = await getTasksFromFirebase();
            setTasks(allTasks.filter(task => task.user === auth.currentUser?.uid));
        }
        fetchTasks();
    }, []);

    const completed = tasks.filter(task => task.completed);
    const deleted = tasks.filter(task => task.deleted);

    return (
        <div className="login-container slide-up">
            <div className="nav-buttons">
                <button className="logout-btn" onClick={() => navigate("/")}>
                    🏠 Voltar para Home
                </button>
            </div>

            <h2>📊 Perfil do Usuário</h2>

            {user && (
                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3>👤 Informações do Usuário</h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                        <strong>📧 E-mail:</strong> {user.email}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', margin: 'var(--spacing-sm) 0 0 0' }}>
                        <strong>📅 Membro desde:</strong> {new Date(user.metadata.creationTime).toLocaleDateString('pt-BR')}
                    </p>
                </div>
            )}

            {/* Estatísticas gerais */}
            <div className="task-stats">
                <div className="stat-item">
                    <span className="stat-number">{tasks.length}</span>
                    <span className="stat-label">Total de Tarefas</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{completed.length}</span>
                    <span className="stat-label">Concluídas</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{deleted.length}</span>
                    <span className="stat-label">Apagadas</span>
                </div>
            </div>

            <div className="profile-stats" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                {/* Tarefas Concluídas */}
                <div className="card">
                    <div className="task-header">
                        <h3>✅ Tarefas Concluídas</h3>
                        <span className="badge badge-success">{completed.length}</span>
                    </div>
                    {completed.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 'var(--spacing-lg) 0' }}>
                            🎯 Nenhuma tarefa concluída ainda.
                        </p>
                    ) : (
                        <ul className="task-list" style={{ maxHeight: '300px' }}>
                            {completed.map(task => (
                                <li key={task.id} className="task-item slide-up" style={{ opacity: 0.8 }}>
                                    <div>
                                        <strong>{task.title}</strong>
                                        <br />
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            🕐 {task.time} |
                                            <span className={`badge badge-${task.urgency === 'alta' ? 'danger' : task.urgency === 'normal' ? 'warning' : 'success'} ${task.urgency}`} style={{ marginLeft: 'var(--spacing-xs)' }}>
                                                {task.urgency === 'alta' ? '🔴 Alta' : task.urgency === 'normal' ? '🟡 Normal' : '🟢 Baixa'}
                                            </span>
                                        </span>
                                    </div>
                                    <div style={{ marginTop: 'var(--spacing-sm)' }}>
                                        <span className="badge badge-success">✅ Concluída</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Tarefas Apagadas */}
                <div className="card">
                    <div className="task-header">
                        <h3>🗑️ Tarefas Apagadas</h3>
                        <span className="badge badge-danger">{deleted.length}</span>
                    </div>
                    {deleted.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 'var(--spacing-lg) 0' }}>
                            🎉 Nenhuma tarefa foi apagada.
                        </p>
                    ) : (
                        <ul className="task-list" style={{ maxHeight: '300px' }}>
                            {deleted.map(task => (
                                <li key={task.id} className="task-item slide-up" style={{ opacity: 0.6, textDecoration: 'line-through' }}>
                                    <div>
                                        <strong style={{ color: 'var(--error)' }}>{task.title}</strong>
                                        <br />
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            🕐 {task.time} |
                                            <span className={`badge badge-${task.urgency === 'alta' ? 'danger' : task.urgency === 'normal' ? 'warning' : 'success'} ${task.urgency}`} style={{ marginLeft: 'var(--spacing-xs)' }}>
                                                {task.urgency === 'alta' ? '🔴 Alta' : task.urgency === 'normal' ? '🟡 Normal' : '🟢 Baixa'}
                                            </span>
                                        </span>
                                    </div>
                                    <div style={{ marginTop: 'var(--spacing-sm)' }}>
                                        <span className="badge badge-danger">🗑️ Apagada</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;