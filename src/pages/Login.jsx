
import React, { useState } from "react";
import Register from "./Register";
import Home from "./Home";
import "./login.css";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [showHome, setShowHome] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowHome(true);
        } catch (err) {
            setError("E-mail ou senha inválidos.");
        }
    };

    if (showHome) {
        return <Home onLogout={() => setShowHome(false)} />;
    }
    if (showRegister) {
        return <Register onRegisterSuccess={() => setShowHome(true)} onBackToLogin={() => setShowRegister(false)} />;
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
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
                <button type="submit">Entrar</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p style={{ marginTop: 16, textAlign: 'center' }}>
                Não tem uma conta?{' '}
                <span
                    style={{ color: '#646cff', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setShowRegister(true)}
                >
                    Criar conta
                </span>
            </p>
        </div>
    );
}

export default Login;
