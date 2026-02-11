
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <div className="hero-text-block">
                    <span className="hero-eyebrow fade-in-up delay-1">Utensils Shop Rwanda</span>
                    <h1 className="hero-title fade-in-up delay-2">
                        Igikoni cyawe <br />
                        <span className="highlight-text">kigezweho.</span>
                    </h1>
                    <p className="hero-description fade-in-up delay-3">
                        Discover premium kitchen tools that blend aesthetic beauty with professional performance.
                        Byabindi byiza ukeneye.
                    </p>
                    <div className="hero-actions fade-in-up delay-4">
                        <Link to="/products" className="primary-btn large shimmer-effect">
                            Tangira guhaha
                        </Link>
                        <Link to="/about" className="ghost-btn large">
                            Byinshi
                        </Link>
                    </div>
                </div>

                <div className="hero-visual fade-in-right delay-3">
                    <div className="visual-card card-1 floating">
                        <img src="https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80" alt="Knife" />
                    </div>
                    <div className="visual-card card-2 floating-delayed">
                        <img src="/assets/spatula.png" alt="Spatula" />
                    </div>
                    <div className="visual-bg-circle"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
