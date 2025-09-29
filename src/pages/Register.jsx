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
            navigate("/"); // Vai para Home após cadastro
        } catch (err) {
            setError("Erro ao criar conta.");
        }
    };

    return (
        <div className="login-container">
            <h2>Cadastro</h2>
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
                <button type="submit">Criar Conta</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p style={{ marginTop: 16, textAlign: 'center' }}>
                Já tem uma conta?{' '}
                <span
                    style={{ color: '#646cff', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate("/login")}
                >
                    Fazer login
                </span>
            </p>
        </div>
    );
}

export default Register;
