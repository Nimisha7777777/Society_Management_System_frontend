import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentClientSlide, setCurrentClientSlide] = useState(0);

    // Carousel images
    const carouselImages = [
        {
            url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=600&fit=crop',
            alt: 'Modern Society Building'
        },
        {
            url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
            alt: 'Luxury Apartments'
        },
        {
            url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=600&fit=crop',
            alt: 'Community Amenities'
        },
        {
            url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop',
            alt: 'Garden and Recreation'
        }
    ];

    // Auto-scroll carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
            title: 'Resident Management',
            description: 'Efficiently manage resident profiles, flat assignments, and member directories with ease.'
        },
        {
            icon: <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
            title: 'Maintenance Management',
            description: 'Track, assign, and resolve maintenance requests in real-time.'
        },
        {
            icon: <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
            title: 'Amenity Booking',
            description: 'Book clubhouses, gyms, pools, and halls with a simple, conflict-free system.'
        },

            
        {
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            title: 'Guard & Visitor Management',
            description: 'Digitally track visitor entries, approvals, and enhance security with guard access.'
        },
        {
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            title: 'Society Notices',
            description: 'Publish important announcements and notices visible instantly to all residents.'
        },
        {
            icon: (
                <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            title: 'Complaints Tracking',
            description: 'Track complaint status, timelines, and resolution history transparently.'
        }
    ];

    const amenities = [
        {
            name: 'Clubhouse',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
        },
        {
            name: 'Swimming Pool',
            image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop'
        },
        {
            name: 'Fitness Center',
            image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop'
        },
        {
            name: 'Community Hall',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop'
        }
    ];

    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Society Admin - Green Valley Apartments',
            rating: 5,
            text: 'This platform made managing our society extremely smooth and transparent. Residents are happier than ever!',
            avatar: 'https://i.pravatar.cc/150?img=12'
        },
        {
            name: 'Priya Sharma',
            role: 'Resident - Sunshine Residency',
            rating: 5,
            text: 'Complaints and parking are now handled effortlessly. The booking system is a game-changer!',
            avatar: 'https://i.pravatar.cc/150?img=5'
        },
        {
            name: 'Amit Patel',
            role: 'Chairman - Palm Gardens',
            rating: 5,
            text: 'Financial transparency and automated billing have reduced disputes significantly. Highly recommended!',
            avatar: 'https://i.pravatar.cc/150?img=8'
        }
    ];


    // Real society clients with improved logos
    const clients = [
        {
            name: 'Hiranandani Gardens',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hiranandani_logo.svg/200px-Hiranandani_logo.svg.png',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23667eea" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3EH%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'Lodha Group',
            logo: 'https://www.lodhagroup.in/images/lodha-logo.svg',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23764ba2" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3EL%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'Prestige Group',
            logo: 'https://www.prestigeconstructions.com/images/logo.png',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23667eea" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3EP%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'DLF Limited',
            logo: 'https://www.dlf.in/images/DLF-Logo.svg',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23764ba2" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3ED%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'Godrej Properties',
            logo: 'https://www.godrejproperties.com/assets/images/godrej-logo.svg',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23667eea" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3EG%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'Brigade Group',
            logo: 'https://www.brigade.co.in/images/brigade-logo.svg',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23764ba2" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3EB%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'Sobha Limited',
            logo: 'https://www.sobha.com/assets/images/sobha-logo.svg',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23667eea" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3ES%3C/text%3E%3C/svg%3E'
        },
        {
            name: 'Phoenix Mills',
            logo: 'https://www.thephoenixmills.com/images/phoenix-logo.svg',
            fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23764ba2" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial"%3EPH%3C/text%3E%3C/svg%3E'
        }
    ];

    // Auto-scroll clients carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentClientSlide((prev) => (prev + 1) % Math.ceil(clients.length / 4));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Scroll to About Us section
    const scrollToAboutUs = () => {
        const aboutSection = document.getElementById('about-us-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Scroll to Contact section
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Seamless Operations for Your Society
                    </h1>
                    <p className="hero-subtitle">
                        Manage residents, amenities, complaints, visitors & maintenance — all in one place.
                    </p>
                    <div className="hero-cta-buttons">
                        <button className="cta-primary" onClick={() => navigate('/register-society')}>
                            Register Your Society
                        </button>
                        <button className="cta-secondary" onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className="cta-secondary" onClick={() => navigate('/register')}>
                            Register as Resident
                        </button>
                    </div>
                </div>
            </section>

            {/* Image Carousel */}
            <section className="carousel-section">
                <div className="carousel-container">
                    {carouselImages.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image.url})` }}
                        >
                            <div className="carousel-caption">{image.alt}</div>
                        </div>
                    ))}
                    <div className="carousel-dots">
                        {carouselImages.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-container">
                    <h2 className="section-title">Powerful Features for Modern Societies</h2>
                    <p className="section-subtitle">Everything you need to manage your community efficiently</p>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon-wrapper">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Booking Section */}
            <section className="amenities-section">
                <div className="section-container">
                    <h2 className="section-title">Book Amenities Instantly</h2>
                    <p className="section-subtitle">Reserve community facilities with just a few clicks</p>
                    <div className="amenities-grid">
                        {amenities.map((amenity, index) => (
                            <div key={index} className="amenity-card">
                                <div className="amenity-image" style={{ backgroundImage: `url(${amenity.image})` }}>
                                    <div className="amenity-overlay"></div>
                                </div>
                                <h3 className="amenity-name">{amenity.name}</h3>
                                <button className="amenity-book-btn">Book Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Clients Section */}
            <section className="clients-section">
                <div className="section-container">
                    <h2 className="section-title">Our Clients</h2>
                    <p className="section-subtitle">Trusted by India's leading real estate developers</p>
                    <div className="clients-carousel">
                        <div
                            className="clients-track"
                            style={{ transform: `translateX(-${currentClientSlide * 100}%)` }}
                        >
                            {Array.from({ length: Math.ceil(clients.length / 4) }).map((_, slideIndex) => (
                                <div key={slideIndex} className="clients-slide">
                                    {clients.slice(slideIndex * 4, slideIndex * 4 + 4).map((client, index) => (
                                        <div key={index} className="client-logo-card">
                                            <img
                                                src={client.logo}
                                                alt={client.name}
                                                onError={(e) => { e.target.src = client.fallback; }}
                                            />
                                            <p>{client.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="carousel-nav-dots">
                        {Array.from({ length: Math.ceil(clients.length / 4) }).map((_, index) => (
                            <span
                                key={index}
                                className={`nav-dot ${index === currentClientSlide ? 'active' : ''}`}
                                onClick={() => setCurrentClientSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="section-container">
                    <h2 className="section-title">Happy Customers</h2>
                    <p className="section-subtitle">Trusted by thousands of societies across the country</p>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="star">⭐</span>
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.name}</h4>
                                        <p className="author-role">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section (Scroll Target) */}
            <section id="about-us-section" className="about-section">
                <div className="section-container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">About Our Platform</h2>
                            <p className="about-description">
                                We provide a comprehensive, cloud-based society management solution designed to streamline operations
                                and enhance community living. Our platform offers role-based access, ensuring security and transparency
                                for admins, residents, and staff.
                            </p>
                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <svg className="highlight-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <h4>Secure & Reliable</h4>
                                        <p>Enterprise-grade security with encrypted data</p>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <svg className="highlight-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <h4>Role-Based Access</h4>
                                        <p>Customized permissions for every user type</p>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <svg className="highlight-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <h4>Cloud-Ready</h4>
                                        <p>Access from anywhere, anytime on any device</p>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <svg className="highlight-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <h4>Easy to Use</h4>
                                        <p>Intuitive interface designed for everyone</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop"
                                alt="Modern Society Community"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact-section" className="contact-section">
                <div className="section-container">
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">We're here to help your society thrive</p>
                    <div className="contact-grid">
                        <div className="contact-card">
                            <svg className="contact-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3>Email Us</h3>
                            <p>support@urbannest.com</p>
                            <p>sales@urbannest.com</p>
                        </div>
                        <div className="contact-card">
                            <svg className="contact-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                            <p>Mon-Sat: 9 AM - 6 PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="section-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>Urban Nest</h3>
                            <p>Making society management seamless and efficient</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Contact Us</h4>
                                <p>📞 +91 98765 43210</p>
                                <p>✉️ support@urbannest.com</p>
                            </div>
                            <div className="footer-column">
                                <h4>Company</h4>
                                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToAboutUs(); }}>About Us</a>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>Contact</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 Urban Nest. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
