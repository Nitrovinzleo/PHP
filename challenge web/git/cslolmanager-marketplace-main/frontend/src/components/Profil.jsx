import '../styles/Profil.css'
import Head from "../partials/Head.jsx";
import Footer from '../partials/Footer.jsx'
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000"

export default function Profil () {

    const [user, setUser] = useState({
        pseudo: "",
        bio: "",
        avatar_url: "",
        role: []
    });
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async () => {
        try {
            const res = await fetch(`${API_URL}/user/info`, { credentials: "include" });
            const data = await res.json();

            if (data.success) {
                setUser({
                    pseudo: data.data.pseudo,
                    bio: data.data.bio,
                    avatar_url: data.data.avatar_url,
                    role: data.data.role
                });
            }
        } catch (error) {
            console.error("Erreur lors du chargement des infos.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (loading) return <p>Chargement du profil...</p>;

    return (
        <div className="page-wrapper">
            <Head />
            <div className="user-profile-wrapper">
                <div className="user-profile-avatar-wrapper">
                    <img
                        src={user.avatar_url || "/default-avatar.png"}
                        alt={`Avatar de ${user.pseudo}`}
                    />
                </div>

                <div className="user-username-wrapper">
                    <p className="user-username">{user.pseudo}</p>
                    {/* Badge Vendeur si le rôle est présent */}
                    {user.role.includes("ROLE_SELLER") && <span className="badge">Vendeur</span>}
                </div>

                <div className="user-bio-wrapper">
                    <p className="bio-label">Ma Bio :</p>
                    <textarea
                        className="user-bio"
                        value={user.bio}
                        readOnly
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}