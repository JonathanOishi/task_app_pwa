import React, { useState } from "react";
import "./login.css";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register({ onRegisterSuccess, onBackToLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess("Conta criada com sucesso!");
            setEmail("");
            setPassword("");
            if (onRegisterSuccess) onRegisterSuccess();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <button
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#111',
                    fontSize: 18,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    marginBottom: 12,
                    fontWeight: 700
                }}
                onClick={onBackToLogin}
                title="Voltar para login"
            >
                ← Voltar
            </button>
            <h2>Criar Conta</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: '#388e3c', textAlign: 'center' }}>{success}</p>}
            </form>
        </div>
    );
}

export default Register;
