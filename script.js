// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPK9Q5l6Tq6tTvKLzaswpND9kL1D5-c8Q",
  authDomain: "flexiwork-c314e.firebaseapp.com",
  projectId: "flexiwork-c314e",
  storageBucket: "flexiwork-c314e.firebasestorage.app",
  messagingSenderId: "458889603045",
  appId: "1:458889603045:web:c559fec1639d6d31a8710c",
  measurementId: "G-MJMDCRJ5Y9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DataEntryPro - Earn Money Online</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #4e73df;
            --secondary-color: #1cc88a;
            --dark-color: #5a5c69;
            --light-color: #f8f9fc;
        }
        
        body {
            font-family: 'Nunito', sans-serif;
            background-color: var(--light-color);
        }
        
        .hero-section {
            background: linear-gradient(135deg, var(--primary-color) 0%, #224abe 100%);
            color: white;
            padding: 5rem 0;
        }
        
        .feature-card {
            border-radius: 10px;
            transition: transform 0.3s;
            margin-bottom: 20px;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .nav-pills .nav-link.active {
            background-color: var(--primary-color);
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
        }
        
        .btn-success {
            background-color: var(--secondary-color);
            border-color: var(--secondary-color);
        }
        
        .pricing-card {
            border: none;
            border-radius: 10px;
            transition: all 0.3s;
        }
        
        .pricing-card:hover {
            transform: scale(1.03);
        }
        
        .pricing-header {
            background-color: var(--primary-color);
            color: white;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        
        .dashboard-sidebar {
            background-color: var(--primary-color);
            min-height: 100vh;
            color: white;
        }
        
        .dashboard-content {
            background-color: var(--light-color);
        }
        
        .wallet-card {
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .error-highlight {
            border: 2px solid #e74a3b !important;
        }
        
        /* New styles for page-based dashboard */
        .page-container {
            display: none;
        }
        
        .logged-in-only {
            display: none;
        }
        
        .logged-out-only {
            display: block;
        }
        
        .logged-in .logged-in-only {
            display: block;
        }
        
        .logged-in .logged-out-only {
            display: none;
        }
        
        .logged-in #landingPage {
            display: none;
        }
        
        .logged-in #dashboardPage {
            display: block;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#" id="homeLink">DataEntryPro</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto logged-out-only">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#how-it-works">How It Works</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#pricing">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#demo">Demo</a>
                    </li>
                </ul>
                <ul class="navbar-nav me-auto logged-in-only">
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="dashboardNavLink">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="startWorkNavLink">Start Work</a>
                    </li>
                </ul>
                <div class="d-flex" id="authButtons">
                    <button class="btn btn-outline-light me-2 logged-out-only" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                    <button class="btn btn-primary logged-out-only" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
                    <div class="d-flex logged-in-only" id="userSection">
                        <span class="navbar-text me-3">Welcome, <span id="usernameDisplay">User</span></span>
                        <button class="btn btn-danger" id="logoutBtn">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Landing Page (Visible when logged out) -->
    <div id="landingPage">
        <!-- Hero Section -->
        <section class="hero-section text-center">
            <div class="container">
                <h1 class="display-4 fw-bold mb-4">Earn Money with Data Entry</h1>
                <p class="lead mb-5">Join thousands of people earning money from home by completing simple data entry tasks</p>
                <button class="btn btn-light btn-lg me-2" data-bs-toggle="modal" data-bs-target="#registerModal">Get Started</button>
            </div>
        </section>

        <!-- About Us Section -->
        <section id="about" class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h2 class="fw-bold mb-4">About Us</h2>
                        <p class="lead">DataEntryPro is a leading platform connecting businesses with remote data entry professionals.</p>
                        <p>Founded in 2015, we've helped over 50,000 people earn supplemental income from home while providing businesses with accurate data entry services.</p>
                        <p>Our mission is to create flexible earning opportunities for anyone with basic computer skills and an internet connection.</p>
                    </div>
                    <div class="col-lg-6">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="About Us" class="img-fluid rounded shadow">
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section id="how-it-works" class="py-5 bg-light">
            <div class="container">
                <h2 class="text-center fw-bold mb-5">How It Works</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card feature-card h-100">
                            <div class="card-body text-center">
                                <div class="bg-primary bg-gradient text-white rounded-circle p-3 mb-3 mx-auto" style="width: 70px; height: 70px;">
                                    <i class="fas fa-user-plus fa-2x"></i>
                                </div>
                                <h5>1. Register</h5>
                                <p>Create your free account and complete your profile</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card feature-card h-100">
                            <div class="card-body text-center">
                                <div class="bg-primary bg-gradient text-white rounded-circle p-3 mb-3 mx-auto" style="width: 70px; height: 70px;">
                                    <i class="fas fa-tasks fa-2x"></i>
                                </div>
                                <h5>2. Complete Tasks</h5>
                                <p>Enter data accurately according to the instructions</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card feature-card h-100">
                            <div class="card-body text-center">
                                <div class="bg-primary bg-gradient text-white rounded-circle p-3 mb-3 mx-auto" style="width: 70px; height: 70px;">
                                    <i class="fas fa-money-bill-wave fa-2x"></i>
                                </div>
                                <h5>3. Earn Money</h5>
                                <p>Get paid for each approved data entry submission</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- ... rest of landing page sections ... -->
            </div>
        </section>

        <!-- ... rest of landing page content ... -->

        <!-- Footer -->
        <footer class="bg-dark text-white py-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h5>DataEntryPro</h5>
                        <p>Earn money from home with simple data entry tasks.</p>
                    </div>
                    <div class="col-md-3">
                        <h5>Quick Links</h5>
                        <ul class="list-unstyled">
                            <li><a href="#about" class="text-white">About Us</a></li>
                            <li><a href="#how-it-works" class="text-white">How It Works</a></li>
                            <li><a href="#pricing" class="text-white">Pricing</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <h5>Contact</h5>
                        <ul class="list-unstyled">
                            <li><i class="fas fa-envelope me-2"></i> support@dataentrypro.com</li>
                            <li><i class="fas fa-phone me-2"></i> +91 1234567890</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="text-center">
                    <p class="mb-0">&copy; 2023 DataEntryPro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>

    <!-- Dashboard Page (Visible when logged in) -->
    <div id="dashboardPage" class="page-container">
        <div class="container-fluid">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-3 col-lg-2 dashboard-sidebar p-0">
                    <div class="p-4">
                        <div class="text-center mb-4">
                            <img src="https://via.placeholder.com/100" class="rounded-circle mb-2" alt="Profile">
                            <h5 id="dashboardUsername">John Doe</h5>
                            <p class="text-white-50 small">Free Plan</p>
                        </div>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link active text-white" href="#" data-section="dashboard"><i class="fas fa-tachometer-alt me-2"></i> Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#" data-section="startWork"><i class="fas fa-keyboard me-2"></i> Start Work</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#" data-section="wallet"><i class="fas fa-wallet me-2"></i> Wallet</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#" data-section="bankDetails"><i class="fas fa-university me-2"></i> Bank Details</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#" data-section="withdrawals"><i class="fas fa-money-bill-wave me-2"></i> Withdrawals</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#" data-section="referrals"><i class="fas fa-user-friends me-2"></i> Referrals</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <!-- Main Content -->
                <div class="col-md-9 col-lg-10 dashboard-content p-4">
                    <!-- Dashboard Section -->
                    <div id="dashboardSection">
                        <h4 class="mb-4">Overview</h4>
                        <div class="row mb-4">
                            <div class="col-md-4">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">
                                        <h6 class="card-title">Total Entries</h6>
                                        <h2 class="mb-0" id="totalEntries">0</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">
                                        <h6 class="card-title">Total Earnings</h6>
                                        <h2 class="mb-0" id="totalEarnings">₹0</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-info text-white mb-4">
                                    <div class="card-body">
                                        <h6 class="card-title">Total Withdrawals</h6>
                                        <h2 class="mb-0" id="totalWithdrawals">₹0</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">Recent Data Entry Earnings</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Entries</th>
                                                <th>Rate</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="dataEntryEarnings">
                                            <tr>
                                                <td colspan="5" class="text-center">No entries yet</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Referral Program</h5>
                            </div>
                            <div class="card-body">
                                <p>Earn 10% of any premium plan purchased by your referrals!</p>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="referralLink" value="https://dataentrypro.com/ref/username123" readonly>
                                    <button class="btn btn-primary" type="button" id="copyReferralBtn">Copy</button>
                                </div>
                                <div class="alert alert-info">
                                    <i class="fas fa-info-circle me-2"></i> Share your referral link with friends and earn bonuses when they join with premium plans.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Start Work Section -->
                    <div id="startWorkSection" style="display: none;">
                        <!-- ... same data entry form as before ... -->
                    </div>
                    
                    <!-- Wallet Section -->
                    <div id="walletSection" style="display: none;">
                        <!-- ... same wallet section as before ... -->
                    </div>
                    
                    <!-- Bank Details Section -->
                    <div id="bankDetailsSection" style="display: none;">
                        <!-- ... same bank details section as before ... -->
                    </div>
                    
                    <!-- Withdrawals Section -->
                    <div id="withdrawalsSection" style="display: none;">
                        <!-- ... same withdrawals section as before ... -->
                    </div>
                    
                    <!-- Referrals Section -->
                    <div id="referralsSection" style="display: none;">
                        <!-- ... same referrals section as before ... -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
        <!-- ... same login modal as before ... -->
    </div>

    <!-- Register Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
        <!-- ... same register modal as before ... -->
    </div>

    <!-- Ad Modal -->
    <div class="modal fade" id="adModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <!-- ... same ad modal as before ... -->
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // User database (in a real app, this would be server-side)
        const userDatabase = {};
        
        // Session management
        const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
        let sessionTimeout;
        
        // DOM Elements
        const authButtons = document.getElementById('authButtons');
        const userSection = document.getElementById('userSection');
        const usernameDisplay = document.getElementById('usernameDisplay');
        const logoutBtn = document.getElementById('logoutBtn');
        const homeLink = document.getElementById('homeLink');
        const dashboardNavLink = document.getElementById('dashboardNavLink');
        const startWorkNavLink = document.getElementById('startWorkNavLink');
        const dashboardPage = document.getElementById('dashboardPage');
        const landingPage = document.getElementById('landingPage');
        
        // Dashboard sections
        const dashboardSections = {
            dashboard: document.getElementById('dashboardSection'),
            startWork: document.getElementById('startWorkSection'),
            wallet: document.getElementById('walletSection'),
            bankDetails: document.getElementById('bankDetailsSection'),
            withdrawals: document.getElementById('withdrawalsSection'),
            referrals: document.getElementById('referralsSection')
        };
        
        // Generate a random user ID
        function generateUserId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        
        // Generate a random referral code
        function generateReferralCode() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 8; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Check if user is logged in from localStorage
            const savedUser = localStorage.getItem('currentUser');
            const savedLoginState = localStorage.getItem('isLoggedIn');
            
            if (savedUser && savedLoginState === 'true') {
                try {
                    currentUser = JSON.parse(savedUser);
                    updateUI();
                    showDashboardPage();
                } catch (error) {
                    console.error('Error loading user data:', error);
                    showLandingPage();
                }
            } else {
                showLandingPage();
            }
            
            // Initialize activity tracking
            initializeActivityTracking();
        });
        
        // Update UI based on login state
        function updateUI() {
            if (currentUser) {
                document.body.classList.add('logged-in');
                dashboardNavLink.click(); // Show dashboard by default
            } else {
                document.body.classList.remove('logged-in');
            }
        }
        
        // Initialize activity tracking
        function initializeActivityTracking() {
            const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
            
            activityEvents.forEach(eventType => {
                document.addEventListener(eventType, function() {
                    if (currentUser) {
                        updateLastActivity();
                        resetSessionTimeout();
                    }
                });
            });
        }
        
        // Update last activity timestamp
        function updateLastActivity() {
            localStorage.setItem('lastActivity', Date.now().toString());
        }
        
        // Reset session timeout
        function resetSessionTimeout() {
            if (sessionTimeout) {
                clearTimeout(sessionTimeout);
            }
            
            sessionTimeout = setTimeout(() => {
                if (currentUser) {
                    logout();
                    showAlert('You have been logged out due to inactivity', 'warning');
                }
            }, SESSION_TIMEOUT);
        }
        
        // Login function
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showAlert('Please enter both email and password', 'error');
                return;
            }
            
            // Check if user exists and password matches (in a real app, this would be a server call)
            if (userDatabase[email] && userDatabase[email].password === password) {
                // User exists and password matches
                currentUser = userDatabase[email];
                
                // Save to localStorage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.setItem('isLoggedIn', 'true');
                updateLastActivity();
                
                // Initialize session timeout
                resetSessionTimeout();
                
                // Close modal and show dashboard
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                showDashboardPage();
                showAlert('Logged in successfully!', 'success');
            } else {
                showAlert('Invalid email or password', 'error');
            }
        });
        
        // Register function
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const referralCode = document.getElementById('referralCode').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            // Check if user already exists
            if (userDatabase[email]) {
                showAlert('Email already registered', 'error');
                return;
            }
            
            // Create new user
            currentUser = {
                id: generateUserId(),
                name: name,
                email: email,
                password: password, // In a real app, this would be hashed
                plan: 'free',
                earningWallet: 0,
                referralBonus: 0,
                entriesToday: 0,
                totalEntries: 0,
                totalEarnings: 0,
                transactions: [],
                referrals: [],
                referredUsers: [],
                bankDetails: null,
                referralCode: generateReferralCode()
            };
            
            // Process referral if provided
            if (referralCode) {
                processReferral(referralCode);
            }
            
            // Save to database
            userDatabase[email] = currentUser;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('isLoggedIn', 'true');
            updateLastActivity();
            
            // Initialize session timeout
            resetSessionTimeout();
            
            // Close modal and show dashboard
            bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
            showDashboardPage();
            showAlert('Registered successfully!', 'success');
        });
        
        // Process referral code
        function processReferral(code) {
            // In a real app, this would check the database for the referral code
            if (code) {
                // Initialize referrals array if it doesn't exist
                if (!currentUser.referrals) {
                    currentUser.referrals = [];
                }
                
                // Add new referral
                currentUser.referrals.push({
                    code: code,
                    date: new Date().toLocaleDateString(),
                    status: 'active',
                    plan: 'free',
                    bonusEarned: 0
                });
            }
        }
        
        // Logout function
        function logout() {
            // Clear user data
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('lastActivity');
            
            // Clear any existing timeout
            if (sessionTimeout) {
                clearTimeout(sessionTimeout);
            }
            
            // Reset state
            currentUser = null;
            
            // Show landing page
            showLandingPage();
            
            // Show success message
            showAlert('Logged out successfully!', 'success');
        }
        
        // Show landing page
        function showLandingPage() {
            document.getElementById('landingPage').style.display = 'block';
            document.getElementById('dashboardPage').style.display = 'none';
        }
        
        // Show dashboard page
        function showDashboardPage() {
            if (!currentUser) {
                showLandingPage();
                return;
            }
            
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('dashboardPage').style.display = 'block';
            
            // Update dashboard data
            updateDashboardData();
        }
        
        // Update dashboard data
        function updateDashboardData() {
            if (!currentUser) return;
            
            document.getElementById('dashboardUsername').textContent = currentUser.name;
            document.getElementById('usernameDisplay').textContent = currentUser.name;
            document.getElementById('totalEntries').textContent = currentUser.totalEntries;
            document.getElementById('totalEarnings').textContent = `₹${currentUser.totalEarnings}`;
            document.getElementById('totalWithdrawals').textContent = `₹${currentUser.totalWithdrawals || 0}`;
            
            // Update data entry earnings table
            const dataEntryEarnings = document.getElementById('dataEntryEarnings');
            if (currentUser.dataEntryHistory && currentUser.dataEntryHistory.length > 0) {
                dataEntryEarnings.innerHTML = currentUser.dataEntryHistory.map(entry => `
                    <tr>
                        <td>${entry.date}</td>
                        <td>${entry.count}</td>
                        <td>₹${entry.rate} per entry</td>
                        <td>₹${entry.amount}</td>
                        <td><span class="badge bg-success">Paid</span></td>
                    </tr>
                `).join('');
            } else {
                dataEntryEarnings.innerHTML = '<tr><td colspan="5" class="text-center">No entries yet</td></tr>';
            }
        }
        
        // Show alert message
        function showAlert(message, type = 'success') {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
            alertDiv.style.zIndex = '9999';
            alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            document.body.appendChild(alertDiv);
            
            // Auto dismiss after 3 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }
        
        // Navigation
        homeLink.addEventListener('click', function(e) {
            if (currentUser) {
                e.preventDefault();
                showDashboardPage();
            }
        });
        
        dashboardNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDashboardPage();
        });
        
        startWorkNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDashboardSection('startWork');
        });
        
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        
        function showDashboardSection(section) {
            // Hide all sections
            Object.values(dashboardSections).forEach(sec => sec.style.display = 'none');
            
            // Show selected section
            dashboardSections[section].style.display = 'block';
        }
        
        // Copy referral link
        document.getElementById('copyReferralBtn').addEventListener('click', function() {
            const referralLink = document.getElementById('referralLink');
            referralLink.select();
            document.execCommand('copy');
            showAlert('Referral link copied to clipboard!');
        });
    </script>
</body>
</html>
