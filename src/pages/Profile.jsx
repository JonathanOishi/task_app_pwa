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
        <div className="login-container">
            <button className="logout-btn" onClick={() => navigate("/")}>Voltar para Home</button>
            <h2>Dashboard do Perfil</h2>
            {user && (
                <div style={{ marginBottom: 24 }}>
                    <strong>Usuário:</strong> {user.email}
                </div>
            )}
            <div className="profile-stats">
                <div>
                    <h3>Tarefas Concluídas</h3>
                    <ul className="task-list">
                        {completed.length === 0 && <li>Nenhuma tarefa concluída.</li>}
                        {completed.map(task => (
                            <li key={task.id} className="task-item">
                                <strong>{task.title}</strong> - {task.time}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Tarefas Apagadas <span style={{ color: "#d32f2f" }}>({deleted.length})</span></h3>
                    <ul className="task-list">
                        {deleted.length === 0 && <li>Nenhuma tarefa apagada.</li>}
                        {deleted.map(task => (
                            <li key={task.id} className="task-item" style={{ textDecoration: "line-through", color: "#d32f2f" }}>
                                <strong>{task.title}</strong> - {task.time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;