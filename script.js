// Simulate user authentication state
let isLoggedIn = false;
let currentUser = {
    id: '07301133-629c-490c-891f-4ce86ad0459b',
    name: 'Demo User',
    email: 'demo@example.com',
    plan: 'free',
    earningWallet: 0,
    referralBonus: 0,
    entriesToday: 0,
    totalEntries: 0,
    totalEarnings: 0,
    transactions: [],
    referrals: [],
    bankDetails: null
};

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
const backToDashboard = document.getElementById('backToDashboard');
const dashboardPage = document.getElementById('dashboardPage');
const startWorkPage = document.getElementById('startWorkPage');
const landingPage = document.getElementById('landingPage');
const dashboardNav = document.getElementById('dashboardNav');
const mainNav = document.querySelector('.navbar:not(#dashboardNav)');
let loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
let registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

// YouTube ad videos (international)
const youtubeAds = [
    { id: "dQw4w9WgXcQ", title: "International Ad 1" },
    { id: "JGwWNGJdvx8", title: "International Ad 2" },
    { id: "OPf0YbXqDm0", title: "International Ad 3" },
    { id: "kJQP7kiw5Fk", title: "International Ad 4" },
    { id: "RgKAFK5djSk", title: "International Ad 5" },
    { id: "09R8_2nJtjg", title: "International Ad 6" },
    { id: "HP8S_1Y5j8E", title: "International Ad 7" },
    { id: "YqeW9_5kURI", title: "International Ad 8" },
    { id: "YQHsXMglC9A", title: "International Ad 9" },
    { id: "JGwWNGJdvx8", title: "International Ad 10" }
];

let currentAdIndex = 0;
let adTimer;
let remainingSeconds = 60;
let isAdVisible = true;

// Sample data with accurate city-country combinations
const sampleData = [
    {
        companyName: "Tech Innovators",
        city: "Bhopal",
        country: "India",
        zipCode: "462001",
        businessId: "TEC972571"
    },
    {
        companyName: "Future Enterprises",
        city: "Kolkata",
        country: "India",
        zipCode: "700001",
        businessId: "FUT175533"
    },
    {
        companyName: "Digital Enterprises",
        city: "Hyderabad",
        country: "India",
        zipCode: "500001",
        businessId: "DIG524664"
    },
    {
        companyName: "Innovative Systems",
        city: "Kolkata",
        country: "India",
        zipCode: "700001",
        businessId: "INN937637"
    },
    {
        companyName: "Tech Solutions Inc",
        city: "Ahmedabad",
        country: "India",
        zipCode: "380001",
        businessId: "TEC963213"
    }
];

let currentSampleIndex = 0;

// Load user data from localStorage
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const lastActivity = localStorage.getItem('lastActivity');
    
    if (savedUser && savedLoginState === 'true') {
        try {
            // Check if session has expired
            if (lastActivity) {
                const currentTime = Date.now();
                const timeSinceLastActivity = currentTime - parseInt(lastActivity);
                
                if (timeSinceLastActivity > SESSION_TIMEOUT) {
                    // Session expired due to inactivity
                    console.log('Session expired due to inactivity');
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('lastActivity');
                    return null;
                }
            }
            
            currentUser = JSON.parse(savedUser);
            isLoggedIn = true;
            console.log('User data loaded successfully:', currentUser);
            
            // Update last activity time to extend session
            updateLastActivity();
            
            return currentUser;
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }
    return null;
}

// Update last activity timestamp
function updateLastActivity() {
    localStorage.setItem('lastActivity', Date.now().toString());
}

// Initialize session timeout
function initializeSessionTimeout() {
    // Clear any existing timeout
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
    }
    
    // Set new timeout
    sessionTimeout = setTimeout(() => {
        if (isLoggedIn) {
            logout();
            showAlert('You have been logged out due to inactivity', 'warning');
        }
    }, SESSION_TIMEOUT);
}

// Reset session timeout on user activity
function resetSessionTimeout() {
    if (isLoggedIn) {
        updateLastActivity();
        initializeSessionTimeout();
    }
}

// Initialize activity tracking
function initializeActivityTracking() {
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    
    activityEvents.forEach(eventType => {
        document.addEventListener(eventType, function() {
            if (isLoggedIn) {
                updateLastActivity();
                resetSessionTimeout();
            }
        });
    });
}

// Check session status periodically
function checkSession() {
    if (!isLoggedIn) return;
    
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) return;
    
    const currentTime = Date.now();
    const timeSinceLastActivity = currentTime - parseInt(lastActivity);
    
    if (timeSinceLastActivity > SESSION_TIMEOUT) {
        console.log('Session expired due to inactivity');
        logout();
        showAlert('Your session has expired due to inactivity. Please log in again.', 'warning');
    }
}

// Logout function
function logout() {
    console.log('Logging out user');
    
    // Clear user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivity');
    
    // Clear any existing timeout
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
    }
    
    // Reset state
    isLoggedIn = false;
    currentUser = null;
    
    // Show landing page
    showLandingPage();
    
    // Show success message
    showAlert('Logged out successfully!', 'success');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    // Initialize UI elements
    initializeUIElements();
    
    // Load user data and check login state
    const user = loadUserData();
    
    if (user) {
        console.log('User is logged in, showing dashboard');
        showDashboardPage();
    } else {
        console.log('No user logged in, showing landing page');
        isLoggedIn = false;
        showLandingPage();
    }
    
    // Initialize activity tracking
    initializeActivityTracking();
    
    // Start session checker
    setInterval(checkSession, 60000); // Check every minute
});

// Generate a random user ID
function generateUserId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAlert('Please enter both email and password', 'error');
        return;
    }
    
    // Create or load user data
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            // Update user data if email matches
            if (currentUser.email === email) {
                currentUser.name = email.split('@')[0]; // Update name if needed
            } else {
                // Create new user if email doesn't match
                currentUser = {
                    id: generateUserId(),
                    name: email.split('@')[0],
                    email: email,
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
            }
        } catch (error) {
            console.error('Error parsing saved user data:', error);
            // Create new user if there's an error
            currentUser = {
                id: generateUserId(),
                name: email.split('@')[0],
                email: email,
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
        }
    } else {
        // Create new user if no saved user exists
        currentUser = {
            id: generateUserId(),
            name: email.split('@')[0],
            email: email,
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
    }
    
    // Update login state
    isLoggedIn = true;
    
    // Save to localStorage
    try {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        updateLastActivity();
    } catch (error) {
        console.error('Error saving user data:', error);
        showAlert('Error saving user data. Please try again.', 'error');
        return;
    }
    
    // Initialize session timeout
    initializeSessionTimeout();
    
    // Close login modal
    const loginModalInstance = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModalInstance) {
        loginModalInstance.hide();
    }
    
    // Show dashboard
    showDashboardPage();
    
    // Show success message
    showAlert('Logged in successfully!', 'success');
    
    // Reset form
    this.reset();
});

// Initialize UI elements
function initializeUIElements() {
    // Initialize modals
    const loginModalElement = document.getElementById('loginModal');
    const registerModalElement = document.getElementById('registerModal');
    
    if (loginModalElement) {
        loginModal = new bootstrap.Modal(loginModalElement, {
            backdrop: 'static',
            keyboard: false
        });
        
        // Add event listener for modal hidden event
        loginModalElement.addEventListener('hidden.bs.modal', function() {
            if (isLoggedIn) {
                showDashboardPage();
            }
        });
    }
    
    if (registerModalElement) {
        registerModal = new bootstrap.Modal(registerModalElement, {
            backdrop: 'static',
            keyboard: false
        });
    }
    
    // Add event listeners for navigation
    const startWorkBtn = document.getElementById('startWorkBtn');
    if (startWorkBtn) {
        startWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start work button clicked');
            showStartWorkPage();
        });
    }
    
    const backToDashboardBtn = document.getElementById('backToDashboard');
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back to dashboard button clicked');
            showDashboardPage();
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

// Function to show the dashboard page
function showDashboardPage() {
    landingPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    userSection.style.display = 'block';
    usernameDisplay.textContent = currentUser.name;
    // Hide the header
    mainNav.style.display = 'none';
}

// Function to show the landing page
function showLandingPage() {
    landingPage.style.display = 'block';
    dashboardPage.style.display = 'none';
    userSection.style.display = 'none';
    // Show the header
    mainNav.style.display = 'block';
}

// Function to show the start work page
function showStartWorkPage() {
    startWorkPage.style.display = 'block';
    dashboardPage.style.display = 'none';
}

// Function to show alerts
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// Function to generate referral code
function generateReferralCode() {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
}
