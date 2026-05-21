
import { Link } from "react-router-dom";
import heroDinnerware from "../assets/hero-dinnerware.svg";
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
                    <div className="hero-stats fade-in-up delay-5">
                        <span className="pill subtle">Premium stoneware</span>
                        <span className="pill subtle">Free local delivery</span>
                        <span className="pill subtle">Bright, modern kitchens</span>
                    </div>
                </div>

                <div className="hero-visual fade-in-right delay-3">
                    <div className="visual-grid">
                        <div className="visual-card card-1 floating">
                            <img src={heroDinnerware} alt="Modern dinnerware set" loading="eager" />
                        </div>
                        <div className="visual-card card-2 floating-delayed">
                            <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
                                alt="Wooden kitchen utensils"
                                loading="eager"
                            />
                        </div>
                        <div className="visual-card card-3 floating-slow">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
                                alt="Stacked ceramic plates"
                                loading="eager"
                            />
                        </div>
                        <div className="visual-bg-circle"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
