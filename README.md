<!DOCTYPE html>
<!-- saved from url=(0061)file:///C:/Users/ASUS/Downloads/Enlight%20Flexiwork.html#jobs -->
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enlight Flexiwork - High-Earning Freelance Jobs</title>
    <style>
        :root {
            --primary: #6c63ff;
            --secondary: #4d44db;
            --light: #f8f9fa;
            --dark: #343a40;
            --success: #28a745;
            --warning: #ffc107;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        
        header {
            background-color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 5%;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .logo span {
            color: var(--secondary);
        }
        
        .nav-links a {
            margin-left: 2rem;
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
        }
        
        .nav-links a:hover {
            color: var(--primary);
        }
        
        .hero {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 5rem 5%;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 2rem;
            color: #555;
        }
        
        .cta-button {
            background-color: var(--primary);
            color: white;
            padding: 0.8rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .cta-button:hover {
            background-color: var(--secondary);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
        }
        
        .section {
            padding: 4rem 5%;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2rem;
            color: var(--dark);
        }
        
        .about-content {
            display: flex;
            align-items: center;
            gap: 3rem;
        }
        
        .about-text {
            flex: 1;
        }
        
        .about-image {
            flex: 1;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .about-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .jobs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        
        .job-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
        }
        
        .job-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .job-image {
            height: 180px;
            overflow: hidden;
        }
        
        .job-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        
        .job-card:hover .job-image img {
            transform: scale(1.05);
        }
        
        .job-details {
            padding: 1.5rem;
            flex-grow: 1;
        }
        
        .job-title {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            color: var(--dark);
        }
        
        .job-description {
            color: #666;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        
        .earnings-box {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .earning-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .earning-label {
            color: #666;
            font-weight: 500;
        }
        
        .earning-value {
            font-weight: 700;
        }
        
        .registration-fee {
            color: var(--secondary);
        }
        
        .earning-potential {
            color: var(--success);
        }
        
        .withdrawal {
            color: var(--primary);
        }
        
        .download-app {
            width: 100%;
            padding: 0.8rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: auto;
        }
        
        .download-app:hover {
            background-color: var(--secondary);
        }
        
        .app-icon {
            margin-right: 0.5rem;
        }
        
        .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .badge-primary {
            background-color: rgba(108, 99, 255, 0.1);
            color: var(--primary);
        }
        
        .badge-success {
            background-color: rgba(40, 167, 69, 0.1);
            color: var(--success);
        }
        
        footer {
            background-color: var(--dark);
            color: white;
            padding: 3rem 5%;
            text-align: center;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-links a {
            color: white;
            text-decoration: none;
        }
        
        .footer-links a:hover {
            text-decoration: underline;
        }
        
        .copyright {
            color: #aaa;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .about-content {
                flex-direction: column;
            }
            
            .navbar {
                flex-direction: column;
                padding: 1rem;
            }
            
            .nav-links {
                margin-top: 1rem;
            }
            
            .nav-links a {
                margin: 0 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="navbar">
            <div class="logo">Enlight <span>Flexiwork</span></div>
            <div class="nav-links">
                <a href="file:///C:/Users/ASUS/Downloads/Enlight%20Flexiwork.html#about">About Us</a>
                <a href="file:///C:/Users/ASUS/Downloads/Enlight%20Flexiwork.html#jobs">Jobs</a>
        </div>
    </div></header>
    
    <section class="hero">
        <h1>High-Earning Freelance Opportunities</h1>
        <p>Start earning immediately with our specialized freelance jobs. No experience needed - we provide all the tools and training you need to succeed.</p>
        <button class="cta-button">Get Started</button>
    </section>
    
    <section id="about" class="section">
        <h2 class="section-title">About Enlight Flexiwork</h2>
        <div class="about-content">
            <div class="about-text">
                <h3>Direct Path to Freelance Earnings</h3>
                <p>Enlight Flexiwork connects you with high-potential freelance jobs that offer immediate earning opportunities. We've eliminated the middleman to maximize your income potential.</p>
                <p>Our four specialized job categories are carefully selected for their high demand and earning potential in today's digital economy.</p>
                <p>With transparent earning structures and daily withdrawal options, you're always in control of your income.</p>
            </div>
            <div class="about-image">
                <img src="./Enlight Flexiwork_files/photo-1552664730-d307ca884978" alt="Freelance work">
            </div>
        </div>
    </section>
    
    <section id="jobs" class="section" style="background-color: #f9f9f9;">
        <h2 class="section-title">Featured Freelance Jobs</h2>
        <div class="jobs-grid">
            <!-- Job 1: QR Code Job -->
            <div class="job-card">
                <div class="job-image">
                    <img src="./Enlight Flexiwork_files/photo-1636051028886-0059ad2383c8" alt="QR Code Job">
                </div>
                <div class="job-details">
                    <h3 class="job-title">QR Code Specialist</h3>
                    <p class="job-description">Create and manage QR code campaigns for businesses. No technical skills required - we provide full training.</p>
                    
                    <div class="earnings-box">
                        <div class="earning-row">
                            <span class="earning-label">Registration Fee:</span>
                            <span class="earning-value registration-fee">Free On Certified</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Earning Potential:</span>
                            <span class="earning-value earning-potential">₹9,000/month</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Daily Withdrawal:</span>
                            <span class="earning-value withdrawal">Available</span>
                        </div>
                    </div>
                    
                    <button class="download-app">
                        <span class="app-icon">📱</span> Download App
                    </button>
                </div>
            </div>
            
            <!-- Job 2: Retail Job -->
            <div class="job-card">
                <div class="job-image">
                    <img src="./Enlight Flexiwork_files/photo-1555529669-e69e7aa0ba9a" alt="Retail Job">
                </div>
                <div class="job-details">
                    <h3 class="job-title">Retail Solutions Expert</h3>
                    <p class="job-description">Help retailers optimize their operations and increase sales through our proven systems.</p>
                    
                    <div class="earnings-box">
                        <div class="earning-row">
                            <span class="earning-label">Registration Fee:</span>
                            <span class="earning-value registration-fee">Free On Certified</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Earning Potential:</span>
                            <span class="earning-value earning-potential">₹12,000/month</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Daily Withdrawal:</span>
                            <span class="earning-value withdrawal">Available</span>
                        </div>
                    </div>
                    
                    <button class="download-app">
                        <span class="app-icon">📱</span> Download App
                    </button>
                </div>
            </div>
            
            <!-- Job 3: E-Commerce Job -->
            <div class="job-card">
                <div class="job-image">
                    <img src="./Enlight Flexiwork_files/photo-1460925895917-afdab827c52f" alt="E-Commerce Job">
                </div>
                <div class="job-details">
                    <h3 class="job-title">E-Commerce Associate</h3>
                    <p class="job-description">Manage online stores and product listings for businesses looking to expand digitally.</p>
                    
                    <div class="earnings-box">
                        <div class="earning-row">
                            <span class="earning-label">Registration Fee:</span>
                            <span class="earning-value registration-fee">Free On Certified</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Earning Potential:</span>
                            <span class="earning-value earning-potential">₹18,000/month</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Daily Withdrawal:</span>
                            <span class="earning-value withdrawal">Available</span>
                        </div>
                    </div>
                    
                    <button class="download-app">
                        <span class="app-icon">📱</span> Download App
                    </button>
                </div>
            </div>
            
            <!-- Job 4: Translation Job -->
            <div class="job-card">
                <div class="job-image">
                    <img src="./Enlight Flexiwork_files/photo-1501504905252-473c47e087f8" alt="Translation Job">
                </div>
                <div class="job-details">
                    <h3 class="job-title">Language Translation Specialist</h3>
                    <p class="job-description">Provide translation services for businesses expanding globally. Multiple language options available.</p>
                    
                    <div class="earnings-box">
                        <div class="earning-row">
                            <span class="earning-label">Registration Fee:</span>
                            <span class="earning-value registration-fee">Free On Certified</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Earning Potential:</span>
                            <span class="earning-value earning-potential">₹25,000/month</span>
                        </div>
                        <div class="earning-row">
                            <span class="earning-label">Daily Withdrawal:</span>
                            <span class="earning-value withdrawal">Available</span>
                        </div>
                    </div>
                    
                    <button class="download-app">
                        <span class="app-icon">📱</span> Download App
                    </button>
                </div>
            </div>
        </div>
    </section>
    
    <section id="download" class="section" style="text-align: center;">
        <h2 class="section-title">Get the Enlight Flexiwork App</h2>
        <p style="max-width: 700px; margin: 0 auto 2rem;">Download our mobile app to access these freelance jobs, track your earnings, and withdraw your money directly to your bank account.</p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
           
    
    <footer id="contact">
        <div class="footer-links">
            <a href="file:///C:/Users/ASUS/Downloads/Enlight%20Flexiwork.html#about">About</a>
            <a href="file:///C:/Users/ASUS/Downloads/Enlight%20Flexiwork.html#jobs">Jobs</a>

        </div>
        <p class="copyright">© 2023 Enlight Flexiwork. All rights reserved.</p>
    </footer>

</div></section></body></html>
