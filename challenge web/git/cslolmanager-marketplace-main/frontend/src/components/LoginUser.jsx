import '../styles/LoginUser.css'
import Head from "../partials/Head.jsx";
import Footer from "../partials/Footer.jsx";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function LoginUser() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [pseudo, setPseudo] = useState(""); // Ajouté pour respecter ton DB.md
    const [mode, setMode] = useState("login");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const API_BASE = "http://localhost:8000/auth";
        const endpoint = mode === "login" ? `${API_BASE}/login` : `${API_BASE}/register`;

        // Corps de la requête adapté au mode
        const bodyData = {
            email: email,
            password: mdp,
            ...(mode === "register" && { pseudo: pseudo }) // Pseudo envoyé uniquement en register
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(data.message || "Identifiants incorrects ou erreur serveur");
            }

            if (mode === "login") {
                const meRes = await fetch(`${API_BASE}/me`, { credentials: "include" });
                const meData = await meRes.json();

                if (meData.success) {
                    setUser(meData.data.user);
                }

                navigate("/");
                return;
            }

            setSuccess("Compte créé avec succès ! Connectez-vous dès maintenant.");
            setMode("login");
            setMdp("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login-user-wrapper'>
            <Head />
            <div className='login-user-form-wrapper'>
                <h2 className='login-user-title'>
                    {mode === "login" ? "Connexion" : "Création de compte Severum"}
                </h2>

                <form className='login-user-form' onSubmit={handleSubmit}>
                    {/* Affichage conditionnel du pseudo selon ton schéma */}
                    {mode === "register" && (
                        <input
                            type='text'
                            placeholder='Pseudo'
                            value={pseudo}
                            onChange={e => setPseudo(e.target.value)}
                            required
                        />
                    )}

                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type='password'
                        placeholder='Mot de passe'
                        value={mdp}
                        onChange={e => setMdp(e.target.value)}
                        required
                    />

                    {error && <p className='login-error' style={{color: 'red'}}>{error}</p>}
                    {success && <p className='login-success' style={{color: 'green'}}>{success}</p>}

                    <button type='submit' disabled={loading}>
                        {loading ? "Chargement..." : mode === "login" ? "Entrer dans Severum" : "S'inscrire"}
                    </button>
                </form>

                {/* Switcher login/register ... */}
            </div>
            <Footer />
        </div>
    );
}
