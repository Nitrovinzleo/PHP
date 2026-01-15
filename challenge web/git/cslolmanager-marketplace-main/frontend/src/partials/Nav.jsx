import '../styles/Nav.css'
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
    const [searchTerm, setSearchTerm] = useState("");
    const [champion, setChampion] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(100);
    /*
    const { user, setUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    async function logout() {
        await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        setUser(null);
        navigate("/login");
    }
    */
    // gérer la soumission du filtre
    const handleFilter = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const filters = { searchTerm, champion, category, price };
        console.log("Filtres envoyés :", filters);

        // Ici, vous pourriez appeler une API ou une fonction parente
    };

    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                <div className="search-bar-wrapper">
                    <input
                        id="main-search"
                        name="search-bar"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Rechercher..."
                        style={{
                            backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'%23ff0005\' viewBox=\'0 0 16 16\'><path d=\'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\'/></svg>')",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '12px center',
                            paddingLeft: '40px',
                            width: '100%',
                            boxSizing: 'border-box',
                            height: '38px'
                        }}
                    />
                </div>

                <div className="champion-search-wrapper">
                    <input
                        name="champion-search"
                        type="search"
                        value={champion}
                        onChange={(e) => setChampion(e.target.value)}
                        placeholder="Champion"
                    />
                </div>

                <div className="category-search-wrapper">
                    <input
                        name="category-search"
                        type="search"
                        placeholder="Catégorie"
                    />
                </div>

                <div className="price-range-wrapper">
                    <label htmlFor="price-range">
                        <label>
                            Prix : {price}€
                            <input
                                type="range"
                                min="1"
                                max="500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                    </label>
                </div>

                <div className="filter-button-wrapper">
                    <button onClick={handleFilter}>Filtrer</button>
                </div>
            </nav>
        </div>
    );
}