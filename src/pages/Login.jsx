import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError("E-mail ou senha inválidos.");
        }
    };

    return (
        <div className="login-container slide-up">
            <h2>🔐 Entrar</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="📧 Digite seu e-mail..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="🔒 Digite sua senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="btn-primary">
                    🚀 Entrar
                </button>
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
            <p style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Não tem uma conta?{' '}
                <span
                    style={{
                        color: 'var(--primary-blue)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--border-radius-sm)',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => navigate("/register")}
                    onMouseOver={(e) => e.target.style.background = 'rgb(37 99 235 / 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                    ✨ Criar conta
                </span>
            </p>
        </div>
    );
}

export default Login;
