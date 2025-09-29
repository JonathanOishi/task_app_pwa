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
            navigate("/"); // Vai para Home após login
        } catch (err) {
            setError("E-mail ou senha inválidos.");
        }
    };

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
                    onClick={() => navigate("/register")}
                >
                    Criar conta
                </span>
            </p>
        </div>
    );
}

export default Login;
