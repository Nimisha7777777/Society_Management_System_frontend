import React, { useState } from 'react';
import './TakeDemo.css';

const TakeDemo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        location: '',
        contactNumber: ''
    });

    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState('');

    // Get user's current location
    const getCurrentLocation = () => {
        setIsLocating(true);
        setLocationError('');

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Use reverse geocoding to get city name
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    const city = data.address.city || data.address.town || data.address.village || data.address.state || '';
                    const location = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

                    setFormData(prev => ({
                        ...prev,
                        city: city,
                        location: location
                    }));

                    setIsLocating(false);
                } catch (error) {
                    setFormData(prev => ({
                        ...prev,
                        location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                    }));
                    setLocationError('Location detected, but city name lookup failed');
                    setIsLocating(false);
                }
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError('Location permission denied. Please enable location access.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError('Location information unavailable.');
                        break;
                    case error.TIMEOUT:
                        setLocationError('Location request timed out.');
                        break;
                    default:
                        setLocationError('An unknown error occurred.');
                }
                setIsLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // UI-only form - no backend submission
        alert(`Thank you for your interest, ${formData.name}! Our team will contact you soon at ${formData.email}.`);
        setFormData({
            name: '',
            email: '',
            password: '',
            city: '',
            location: '',
            contactNumber: ''
        });
    };

    return (
        <div className="take-demo-container">
            {/* Hero Section */}
            <section className="demo-hero">
                <div className="demo-hero-content">
                    <h1 className="demo-hero-title">Schedule Your Live Demo</h1>
                    <p className="demo-hero-subtitle">
                        See how Urban Nest can transform your society management
                    </p>
                </div>
            </section>

            {/* Demo Form Section */}
            <section className="demo-form-section">
                <div className="demo-content-wrapper">
                    <div className="demo-info">
                        <h2 className="demo-info-title">Request a Personalized Demo</h2>
                        <p className="demo-info-text">
                            Fill out the form to schedule a personalized demo of Urban Nest.
                            Our team will walk you through all the features and show you how
                            our platform can streamline your society operations.
                        </p>

                        <div className="demo-benefits">
                            <h3>What You'll Get:</h3>
                            <ul className="benefits-list">
                                <li>
                                    <svg className="benefit-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <strong>Personalized Walkthrough</strong>
                                        <p>See features tailored to your society's needs</p>
                                    </div>
                                </li>
                                <li>
                                    <svg className="benefit-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <strong>Live Q&A Session</strong>
                                        <p>Ask questions and get instant answers</p>
                                    </div>
                                </li>
                                <li>
                                    <svg className="benefit-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <strong>Custom Pricing</strong>
                                        <p>Get a quote based on your requirements</p>
                                    </div>
                                </li>
                                <li>
                                    <svg className="benefit-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <strong>Implementation Support</strong>
                                        <p>Learn how we help you get started</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="demo-stats">
                            <div className="stat-item">
                                <h4>500+</h4>
                                <p>Societies Onboarded</p>
                            </div>
                            <div className="stat-item">
                                <h4>50,000+</h4>
                                <p>Active Residents</p>
                            </div>
                            <div className="stat-item">
                                <h4>4.8/5</h4>
                                <p>Customer Rating</p>
                            </div>
                        </div>
                    </div>

                    <div className="demo-form-card">
                        <h3 className="form-title">Schedule Your Demo</h3>
                        <p className="form-subtitle">Fill in your details and we'll get back to you shortly</p>

                        <form onSubmit={handleSubmit} className="demo-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Your city"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactNumber">Contact Number *</label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location (Coordinates)</label>
                                <div className="location-input-wrapper">
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Click button to detect location"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="locate-btn"
                                        onClick={getCurrentLocation}
                                        disabled={isLocating}
                                    >
                                        {isLocating ? (
                                            <>
                                                <span className="spinner"></span> Locating...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="locate-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Get Location
                                            </>
                                        )}
                                    </button>
                                </div>
                                {locationError && <p className="error-text">{locationError}</p>}
                            </div>

                            <button type="submit" className="submit-btn">
                                Schedule Demo Now
                            </button>

                            <p className="form-note">
                                * We respect your privacy. Your information will not be shared with third parties.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Why Demo Section */}
            <section className="why-demo-section">
                <div className="demo-content-wrapper">
                    <h2 className="section-title">Why Schedule a Demo?</h2>
                    <div className="why-demo-grid">
                        <div className="why-demo-card">
                            <svg className="why-demo-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <h3>Understand Your Needs</h3>
                            <p>We'll discuss your society's unique challenges and show you relevant solutions</p>
                        </div>
                        <div className="why-demo-card">
                            <svg className="why-demo-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <h3>See It In Action</h3>
                            <p>Watch real-time demonstrations of all features and workflows</p>
                        </div>
                        <div className="why-demo-card">
                            <svg className="why-demo-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3>Fast Implementation</h3>
                            <p>Learn how quickly you can get your society up and running</p>
                        </div>
                        <div className="why-demo-card">
                            <svg className="why-demo-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3>Expert Guidance</h3>
                            <p>Get tips and best practices from our experienced team</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TakeDemo;
