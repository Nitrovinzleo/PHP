import { useEffect, useState } from "react";
import "../styles/Panier.css";
import Footer from "../partials/Footer.jsx";
import Head from "../partials/Head.jsx";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const API_URL = "http://localhost:8000";

export default function Panier() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/cart`, { 
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!res.ok) throw new Error("Erreur lors du chargement du panier");
            
            const data = await res.json();
            setCart(data.data?.items || []);
            setError(null);
        } catch (error) {
            console.error("Erreur chargement panier", error);
            setError("Impossible de charger le panier. Veuillez réessayer plus tard.");
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/cart/remove`, {
                method: "POST",
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id_produit: productId })
            });
            
            if (!response.ok) throw new Error("Erreur lors de la suppression");
            
            await fetchCart();
        } catch (error) {
            console.error("Erreur suppression article", error);
            setError("Erreur lors de la suppression de l'article");
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        const quantity = Math.max(1, parseInt(newQuantity) || 1);
        
        try {
            const response = await fetch(`${API_URL}/cart/update`, {
                method: "POST",
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id_produit: productId,
                    quantite: quantity
                })
            });
            
            if (!response.ok) throw new Error("Erreur lors de la mise à jour");
            
            await fetchCart();
        } catch (error) {
            console.error("Erreur mise à jour quantité", error);
            setError("Erreur lors de la mise à jour de la quantité");
        }
    };

    const incrementQuantity = (productId, currentQty) => {
        updateQuantity(productId, currentQty + 1);
    };

    const decrementQuantity = (productId, currentQty) => {
        if (currentQty > 1) {
            updateQuantity(productId, currentQty - 1);
        }
    };

    const validateOrder = () => {
        // Implémentez la logique de validation de commande ici
        alert("Fonctionnalité de commande à implémenter");
    };

    const total = cart.reduce(
        (sum, item) => sum + (Number(item.produit?.prix) || 0) * (item.quantite || 0),
        0
    );

    if (loading) {
        return (
            <div className="cart-container">
                <Head />
                <div className="loading" style={{ height: '300px' }}></div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <Head />
            <div className="cart-wrapper">
                <div className="cart-header">
                    <h1>Votre Panier</h1>
                    <p>{cart.length} article{cart.length > 1 ? 's' : ''} dans votre panier</p>
                </div>

            {error && <div className="error-message">{error}</div>}

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <FaShoppingCart size={48} style={{ marginBottom: '1rem', opacity: 0.7 }} />
                    <h2>Votre panier est vide</h2>
                    <p>Parcourez nos produits et ajoutez des articles à votre panier</p>
                    <button 
                        className="btn btn-outline" 
                        onClick={() => window.history.back()}
                        style={{ marginTop: '1rem' }}
                    >
                        <FaArrowLeft style={{ marginRight: '8px' }} />
                        Continuer vos achats
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.produit.id_produit} className="cart-item">
                                <img 
                                    src={item.produit.image_url || '/placeholder-product.jpg'} 
                                    alt={item.produit.nom_produit}
                                    className="cart-item-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder-product.jpg';
                                    }}
                                />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.produit.nom_produit}</h3>
                                    <p className="cart-item-description">
                                        {item.produit.description || 'Aucune description disponible'}
                                    </p>
                                    <div className="cart-item-quantity">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => decrementQuantity(item.produit.id_produit, item.quantite)}
                                            aria-label="Réduire la quantité"
                                        >
                                            <FaMinus size={12} />
                                        </button>
                                        <span className="quantity-display">{item.quantite}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => incrementQuantity(item.produit.id_produit, item.quantite)}
                                            aria-label="Augmenter la quantité"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-actions">
                                    <span className="cart-item-price">
                                        {(item.produit.prix * item.quantite).toFixed(2)} €
                                    </span>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeItem(item.produit.id_produit)}
                                        aria-label="Supprimer l'article"
                                    >
                                        <FaTrash />
                                        <span>Supprimer</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="cart-total">
                            <span>Total</span>
                            <span className="cart-total-amount">{total.toFixed(2)} €</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Frais de livraison calculés à l'étape suivante
                        </p>
                        <div className="cart-actions">
                            <button 
                                className="btn btn-outline"
                                onClick={() => window.history.back()}
                            >
                                <FaArrowLeft style={{ marginRight: '8px' }} />
                                Continuer mes achats
                            </button>
                            <button 
                                className="btn btn-primary"
                                onClick={validateOrder}
                            >
                                Passer la commande
                            </button>
                        </div>
                    </div>
                </>
            )}
                <Footer />
            </div>
        </div>
    );
}
