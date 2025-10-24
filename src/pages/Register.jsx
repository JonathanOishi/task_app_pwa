import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/firebase";
import "./login.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(email, password);
            navigate("/");
        } catch (err) {
            setError("Erro ao criar conta.");
        }
    };

    return (
        <div className="login-container slide-up">
            <h2>👤 Criar Conta</h2>
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
                        minLength="6"
                        title="A senha deve ter pelo menos 6 caracteres"
                    />
                </div>
                <button type="submit" className="btn-primary">
                    ✨ Criar Conta
                </button>
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
            <p style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Já tem uma conta?{' '}
                <span
                    style={{
                        color: 'var(--primary-blue)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--border-radius-sm)',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => navigate("/login")}
                    onMouseOver={(e) => e.target.style.background = 'rgb(37 99 235 / 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                    🚪 Fazer login
                </span>
            </p>
        </div>
    );
}

export default Register;
