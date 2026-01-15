import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaHeadset, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            {/* Coins décoratifs */}
            <div className="corner corner-top-left"></div>
            <div className="corner corner-top-right"></div>
            <div className="corner corner-bottom-left"></div>
            <div className="corner corner-bottom-right"></div>

            <div className="footer-container">
                <div className="footer-content">
                    {/* Colonne 1 : À propos */}
                    <div className="footer-column">
                        <div className="footer-logo">CSLOL<span>Manager</span></div>
                        <p>Votre boutique en ligne de comptes et services League of Legends. Sécurité et fiabilité garanties.</p>
                        <div className="social-links">
                            <a href="https://streamable.com/ldn14q?src=player-page-share" className="social-link" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://www.youtube.com/watch?v=pyBEvMXVfL0" className="social-link" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://www.youtube.com/shorts/qpGfb2JKwIw" className="social-link" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://www.youtube.com/shorts/1ZOadogSITM" className="social-link" aria-label="Discord">
                                <FaDiscord />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 : Liens rapides */}
                    <div className="footer-column">
                        <h3>Liens rapides</h3>
                        <ul className="footer-links">
                            <li><a href="/">Accueil</a></li>
                            <li><a href="/boutique">Boutique</a></li>
                            <li><a href="/comptes">Comptes</a></li>
                            <li><a href="http://localhost/MVC/index.php">LegitRiotShop</a></li>
                            <li><a href="/a-propos">À propos</a></li>
                            <li><a href="https://www.tiktok.com/@.alex2531/video/7594205180137147670">Contact</a></li>
                        </ul>
                    </div>

                    

                    {/* Colonne 4 : Avis clients */}
                <div className="footer-column">
                    <h3>Avis Clients</h3>
                    <div className="reviews-section">
                        <div className="review-stars">★★★★★</div>
                        <p className="review-text">4.9/5 sur 127 avis</p>
                        <button className="review-button">
                            Laisser un avis
                        </button>
                        <div className="trustpilot-widget">
                            <span>Confiance certifiée</span>
                            <div className="trustpilot-stars">★★★★★</div>
                        </div>
                    </div>
                </div>
                </div>

                {/* Barre de copyright */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CSLOL Manager. Tous droits réservés.</p>
                    <p>CSLOL Manager n'est pas affilié à Riot Games, Inc. League of Legends est une marque déposée de Riot Games, Inc.</p>
                    <div className="footer-legal">
                        <a href="https://streamable.com/ldn14q?src=player-page-share">Mentions légales</a>
                        <a href="https://streamable.com/ldn14q?src=player-page-share">Politique de confidentialité</a>
                        <a href="https://streamable.com/ldn14q?src=player-page-share    ">Politique des cookies</a>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
}