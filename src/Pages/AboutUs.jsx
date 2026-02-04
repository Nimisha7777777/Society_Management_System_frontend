import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: '🏘️',
            title: 'For Residents',
            description: 'Access all society information, pay maintenance, book amenities, and raise complaints seamlessly from your device.'
        },
        {
            icon: '👨‍💼',
            title: 'For Admins',
            description: 'Manage residents, track finances, handle complaints, and oversee all society operations from a unified dashboard.'
        },
        {
            icon: '🛡️',
            title: 'For Security',
            description: 'Track visitor entries, manage gate passes, and maintain security logs with ease.'
        },
        {
            icon: '🏗️',
            title: 'For Developers',
            description: 'Robust API integration and scalable architecture for building on top of our platform.'
        }
    ];

    const values = [
        {
            icon: '💡',
            title: 'Innovation',
            description: 'Leveraging cutting-edge technology to simplify society management'
        },
        {
            icon: '🤝',
            title: 'Trust',
            description: 'Building transparent systems that foster community engagement'
        },
        {
            icon: '🌱',
            title: 'Sustainability',
            description: 'Going paperless and digital for a greener tomorrow'
        },
        {
            icon: '🎯',
            title: 'Excellence',
            description: 'Committed to delivering the best user experience'
        }
    ];

    return (
        <div className="about-us-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-hero-title">About Urban Nest</h1>
                    <p className="about-hero-subtitle">
                        Revolutionizing society management with digital innovation
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="about-content-wrapper">
                    <div className="mission-content">
                        <h2 className="about-section-title">Our Mission</h2>
                        <p className="mission-text">
                            Urban Nest is a comprehensive Online Society Management System designed to bring
                            efficiency, transparency, and convenience to residential communities. We believe in
                            empowering societies with digital tools that make everyday management tasks seamless
                            and stress-free.
                        </p>
                        <p className="mission-text">
                            Our platform bridges the gap between residents, admins, security, and management teams,
                            creating a unified ecosystem where communication flows smoothly, operations are streamlined,
                            and community living is enhanced.
                        </p>
                    </div>
                    <div className="mission-image">
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                            alt="Team collaboration"
                        />
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="vision-section">
                <div className="about-content-wrapper">
                    <h2 className="about-section-title centered">Our Vision</h2>
                    <div className="vision-card">
                        <div className="vision-icon">🌟</div>
                        <h3>Digital & Paperless Society Management</h3>
                        <p>
                            We envision a future where every residential society operates digitally —
                            where paperwork is eliminated, processes are automated, and residents enjoy
                            a modern, connected living experience. Our goal is to make society management
                            so simple that it becomes invisible, allowing communities to focus on what truly
                            matters: building relationships and creating memorable experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="who-we-serve-section">
                <div className="about-content-wrapper">
                    <h2 className="about-section-title centered">Who We Serve</h2>
                    <p className="section-description">
                        Urban Nest is built for everyone in the society ecosystem
                    </p>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="about-feature-card">
                                <div className="about-feature-icon">{feature.icon}</div>
                                <h3 className="about-feature-title">{feature.title}</h3>
                                <p className="about-feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="values-section">
                <div className="about-content-wrapper">
                    <h2 className="about-section-title centered">Our Values</h2>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section">
                <div className="about-content-wrapper">
                    <h2 className="about-section-title centered">Why Choose Urban Nest?</h2>
                    <div className="why-choose-grid">
                        <div className="why-choose-item">
                            <div className="why-icon">✅</div>
                            <div>
                                <h4>Secure & Reliable</h4>
                                <p>Enterprise-grade security with encrypted data storage</p>
                            </div>
                        </div>
                        <div className="why-choose-item">
                            <div className="why-icon">✅</div>
                            <div>
                                <h4>Role-Based Access</h4>
                                <p>Customized permissions for every stakeholder</p>
                            </div>
                        </div>
                        <div className="why-choose-item">
                            <div className="why-icon">✅</div>
                            <div>
                                <h4>Cloud-Ready</h4>
                                <p>Access from anywhere on any device</p>
                            </div>
                        </div>
                        <div className="why-choose-item">
                            <div className="why-icon">✅</div>
                            <div>
                                <h4>Easy to Use</h4>
                                <p>Intuitive interface designed for everyone</p>
                            </div>
                        </div>
                        <div className="why-choose-item">
                            <div className="why-icon">✅</div>
                            <div>
                                <h4>24/7 Support</h4>
                                <p>Always available to help your community</p>
                            </div>
                        </div>
                        <div className="why-choose-item">
                            <div className="why-icon">✅</div>
                            <div>
                                <h4>Cost-Effective</h4>
                                <p>Affordable pricing for societies of all sizes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta-section">
                <div className="about-content-wrapper">
                    <h2 className="cta-title">Ready to Transform Your Society?</h2>
                    <p className="cta-description">
                        Join hundreds of societies already using Urban Nest for seamless management
                    </p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary" onClick={() => navigate('/register')}>Get Started Today</button>
                        <button className="cta-btn secondary" onClick={() => navigate('/demo')}>Schedule a Demo</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
