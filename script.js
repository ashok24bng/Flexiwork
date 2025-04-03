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
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

// YouTube ad videos (international)
const youtubeAds = [
    {
        id: "dQw4w9WgXcQ", // Example: Rick Astley - Never Gonna Give You Up
        title: "International Ad 1"
    },
    {
        id: "JGwWNGJdvx8", // Example: Ed Sheeran - Shape of You
        title: "International Ad 2"
    },
    {
        id: "OPf0YbXqDm0", // Example: Mark Ronson - Uptown Funk
        title: "International Ad 3"
    },
    {
        id: "kJQP7kiw5Fk", // Example: Luis Fonsi - Despacito
        title: "International Ad 4"
    },
    {
        id: "RgKAFK5djSk", // Example: Wiz Khalifa - See You Again
        title: "International Ad 5"
    },
    {
        id: "09R8_2nJtjg", // Example: Maroon 5 - Sugar
        title: "International Ad 6"
    },
    {
        id: "HP8S_1Y5j8E", // Example: Justin Bieber - Sorry
        title: "International Ad 7"
    },
    {
        id: "YqeW9_5kURI", // Example: Major Lazer - Lean On
        title: "International Ad 8"
    },
    {
        id: "YQHsXMglC9A", // Example: Adele - Hello
        title: "International Ad 9"
    },
    {
        id: "JGwWNGJdvx8", // Example: Ed Sheeran - Shape of You
        title: "International Ad 10"
    }
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

// Update session management variables
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
let sessionTimeout;

// Update loadUserData function
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    const savedLoginState = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLoginState === 'true') {
        try {
            currentUser = JSON.parse(savedUser);
            isLoggedIn = true;
            console.log('User data loaded successfully:', currentUser);
            return currentUser;
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }
    return null;
}

// Add function to update last activity timestamp
function updateLastActivity() {
    localStorage.setItem('lastActivity', Date.now().toString());
}

// Update initializeSessionTimeout function
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

// Update resetSessionTimeout function
function resetSessionTimeout() {
    if (isLoggedIn) {
        updateLastActivity();
        initializeSessionTimeout();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    // Initialize UI elements
    initializeUIElements();
    
    // Load user data and check login state
    const savedUser = localStorage.getItem('currentUser');
    const savedLoginState = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLoginState === 'true') {
        try {
            console.log('User is logged in, showing dashboard');
            currentUser = JSON.parse(savedUser);
            isLoggedIn = true;
            showDashboardPage();
        } catch (error) {
            console.error('Error loading user data:', error);
            isLoggedIn = false;
            showLandingPage();
        }
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
        localStorage.setItem('lastActivity', Date.now().toString());
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

// Update session management
function initializeActivityTracking() {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach(eventType => {
        document.addEventListener(eventType, updateLastActivity);
    });
}

// Check session status
function checkSession() {
    if (!isLoggedIn) return;
    
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) return;
    
    const currentTime = Date.now();
    const timeSinceLastActivity = currentTime - parseInt(lastActivity);
    
    // Log out if inactive for 5 minutes (300000 milliseconds)
    if (timeSinceLastActivity > 300000) {
        console.log('Session expired due to inactivity');
        logout();
        showAlert('Your session has expired due to inactivity. Please log in again.', 'warning');
    }
}

// Start session checker
setInterval(checkSession, 60000); // Check every minute

// Logout function
function logout() {
    console.log('Logging out user');
    
    // Clear user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivity');
    
    // Reset state
    isLoggedIn = false;
    currentUser = null;
    
    // Show landing page
    showLandingPage();
    
    // Show success message
    showAlert('Logged out successfully!', 'success');
}

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
    
    // Initialize activity tracking
    initializeActivityTracking();
    
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
            console.log('Logout button clicked');
            logout();
        });
    }
}

// Show landing page
function showLandingPage() {
    console.log('Showing landing page');
    const landingPage = document.getElementById('landingPage');
    const dashboardPage = document.getElementById('dashboardPage');
    const startWorkPage = document.getElementById('startWorkPage');
    const mainNav = document.querySelector('.navbar:not(#dashboardNav)');
    const dashboardNav = document.getElementById('dashboardNav');
    
    if (landingPage) {
        landingPage.style.display = 'block';
        landingPage.classList.remove('d-none');
    }
    
    if (dashboardPage) {
        dashboardPage.style.display = 'none';
        dashboardPage.classList.add('d-none');
    }
    
    if (startWorkPage) {
        startWorkPage.style.display = 'none';
        startWorkPage.classList.add('d-none');
    }
    
    if (mainNav) {
        mainNav.style.display = 'block';
        mainNav.classList.remove('d-none');
    }
    
    if (dashboardNav) {
        dashboardNav.style.display = 'none';
        dashboardNav.classList.add('d-none');
    }
}

// Show dashboard page
function showDashboardPage() {
    console.log('Showing dashboard page');
    
    // Check if user is logged in
    if (!isLoggedIn || !currentUser) {
        console.error('Attempted to show dashboard while not logged in');
        showLandingPage();
        return;
    }
    
    // Hide landing page and show dashboard
    const landingPage = document.getElementById('landingPage');
    const dashboardPage = document.getElementById('dashboardPage');
    const startWorkPage = document.getElementById('startWorkPage');
    const mainNav = document.querySelector('.navbar:not(#dashboardNav)');
    const dashboardNav = document.getElementById('dashboardNav');
    
    if (landingPage) {
        landingPage.style.display = 'none';
        landingPage.classList.add('d-none');
    }
    
    if (dashboardPage) {
        dashboardPage.style.display = 'block';
        dashboardPage.classList.remove('d-none');
    }
    
    if (startWorkPage) {
        startWorkPage.style.display = 'none';
        startWorkPage.classList.add('d-none');
    }
    
    // Update navigation visibility
    if (mainNav) {
        mainNav.style.display = 'none';
        mainNav.classList.add('d-none');
    }
    
    if (dashboardNav) {
        dashboardNav.style.display = 'block';
        dashboardNav.classList.remove('d-none');
        
        // Update user section in dashboard nav
        const userSection = dashboardNav.querySelector('#userSection');
        const authButtons = dashboardNav.querySelector('.auth-buttons');
        
        if (userSection) {
            userSection.style.display = 'flex';
            userSection.classList.remove('d-none');
        }
        if (authButtons) {
            authButtons.style.display = 'none';
            authButtons.classList.add('d-none');
        }
    }
    
    // Update user display
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay && currentUser) {
        usernameDisplay.textContent = currentUser.name;
    }
    
    // Update dashboard data
    updateDashboardData();
    
    // Force a reflow to ensure display changes take effect
    document.body.offsetHeight;
    
    // Scroll to top of dashboard
    window.scrollTo(0, 0);
    
    // Log success
    console.log('Dashboard page displayed successfully');
}

// Show start work page
function showStartWorkPage() {
    console.log('Showing start work page');
    
    // Check if user is logged in
    if (!isLoggedIn || !currentUser) {
        console.error('User is not logged in or currentUser is null');
        showAlert('Please log in to access the Data Entry Work page', 'error');
        return;
    }
    
    // Hide other pages and show start work page
    const landingPage = document.getElementById('landingPage');
    const dashboardPage = document.getElementById('dashboardPage');
    const startWorkPage = document.getElementById('startWorkPage');
    const mainNav = document.querySelector('.navbar:not(#dashboardNav)');
    const dashboardNav = document.getElementById('dashboardNav');
    
    if (landingPage) {
        landingPage.style.display = 'none';
        landingPage.classList.add('d-none');
    }
    
    if (dashboardPage) {
        dashboardPage.style.display = 'none';
        dashboardPage.classList.add('d-none');
    }
    
    if (startWorkPage) {
        startWorkPage.style.display = 'block';
        startWorkPage.classList.remove('d-none');
        
        // Update work page data
        updateWorkPageData();
        
        // Load initial sample data
        refreshSampleData();
    }
    
    // Update navigation visibility
    if (mainNav) {
        mainNav.style.display = 'none';
        mainNav.classList.add('d-none');
    }
    
    if (dashboardNav) {
        dashboardNav.style.display = 'block';
        dashboardNav.classList.remove('d-none');
        
        // Ensure user section is visible
        const userSection = dashboardNav.querySelector('.user-section');
        if (userSection) {
            userSection.style.display = 'flex';
            userSection.classList.remove('d-none');
        }
    }
}

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
        alert('Passwords do not match');
        return;
    }
    
    // Simulate registration (in a real app, this would be an API call)
    if (name && email && password) {
        isLoggedIn = true;
        currentUser = {
            name: name,
            email: email,
            plan: 'free',
            earningWallet: 0,
            referralBonus: 0,
            entriesToday: 0,
            totalEntries: 0,
            totalEarnings: 0,
            transactions: [],
            referrals: [],
            bankDetails: null,
            referralCode: generateReferralCode() // Generate referral code for new user
        };
        
        // Process referral if provided
        if (referralCode) {
            processReferral(referralCode);
        }
        
        // Save user data
        saveUserData();
        
        // Update UI
        updateUI();
        
        // Close modal
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (registerModal) {
            registerModal.hide();
        }
    }
});

// Generate a random referral code
function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

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
            plan: 'free', // Initial plan
            bonusEarned: 0
        });
        
        // Check if eligible for professional upgrade
        const premiumReferrals = checkReferralEligibility();
        if (premiumReferrals >= 5 && currentUser.plan !== 'professional') {
            showAlert('Congratulations! You are now eligible for a free upgrade to Professional Plan!', 'success');
        }
        
        // Save user data
        saveUserData();
    }
}

// Navigation
homeLink.addEventListener('click', function(e) {
    if (isLoggedIn) {
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
    showStartWorkPage();
});

backToDashboard.addEventListener('click', function(e) {
    e.preventDefault();
    showDashboardPage();
});

function updateUserData() {
    if (!currentUser) return;
    
    // Update user display
    document.getElementById('usernameDisplay').textContent = currentUser.name;
    document.getElementById('dashboardUsername').textContent = currentUser.name;
    document.getElementById('workPageUsername').textContent = currentUser.name;
    
    // Update plan display
    const planDisplay = currentUser.plan === 'free' ? 'Free Plan' : 
                      currentUser.plan === 'premium3' ? 'Premium Plan (3 months)' : 'Professional Plan (1 year)';
    document.getElementById('userPlanDisplay').textContent = planDisplay;
    document.getElementById('workPagePlan').textContent = planDisplay;
    
    // Update rate badge
    const rate = currentUser.plan === 'free' ? '₹0.50' : 
                 currentUser.plan === 'premium3' ? '₹1' : '₹3';
    document.getElementById('currentRateBadge').textContent = `Rate: ${rate} per entry`;
    
    // Update max daily entries
    const maxEntries = currentUser.plan === 'free' ? 10 : 50;
    document.getElementById('maxDailyEntries').textContent = maxEntries;
    document.getElementById('entriesCounter').textContent = `Entries today: ${currentUser.entriesToday}/${maxEntries}`;
    
    // Update progress bar
    const progressPercent = (currentUser.entriesToday / maxEntries) * 100;
    document.getElementById('dailyProgressBar').style.width = `${progressPercent}%`;
}

// Dashboard functionality
function initializeDashboard() {
    updateDashboardData();
    setupDashboardEventListeners();
}

// Update dashboard data
function updateDashboardData() {
    if (!currentUser) return;
    
    // Update username and basic info
    document.getElementById('dashboardUsername').textContent = currentUser.name;
    document.getElementById('usernameDisplay').textContent = currentUser.name;
    
    // Update current plan details
    const currentPlanName = document.getElementById('currentPlanName');
    const currentPlanRate = document.getElementById('currentPlanRate');
    const currentPlanMaxEntries = document.getElementById('currentPlanMaxEntries');
    const currentPlanAdsStatus = document.getElementById('currentPlanAdsStatus');
    const currentPlanSupport = document.getElementById('currentPlanSupport');
    const currentPlanReferral = document.getElementById('currentPlanReferral');
    const currentPlanExpiry = document.getElementById('currentPlanExpiry');

    // Set plan name and expiry
    if (currentUser.plan === 'premium') {
        currentPlanName.textContent = 'Premium Plan';
        currentPlanRate.textContent = '₹1.00';
        currentPlanMaxEntries.textContent = '50';
        currentPlanAdsStatus.innerHTML = '<i class="fas fa-check text-success me-2"></i>No ads for 3 months';
        currentPlanSupport.innerHTML = '<i class="fas fa-check text-success me-2"></i>Priority support';
        currentPlanReferral.innerHTML = '<i class="fas fa-check text-success me-2"></i>10% referral bonus';
        if (currentUser.planExpiry) {
            const expiry = new Date(currentUser.planExpiry);
            currentPlanExpiry.textContent = `Valid until ${expiry.toLocaleDateString()}`;
        }
    } else if (currentUser.plan === 'professional') {
        currentPlanName.textContent = 'Professional Plan';
        currentPlanRate.textContent = '₹3.00';
        currentPlanMaxEntries.textContent = '50';
        currentPlanAdsStatus.innerHTML = '<i class="fas fa-check text-success me-2"></i>No ads for 1 year';
        currentPlanSupport.innerHTML = '<i class="fas fa-check text-success me-2"></i>Priority support';
        currentPlanReferral.innerHTML = '<i class="fas fa-check text-success me-2"></i>10% referral bonus';
        if (currentUser.planExpiry) {
            const expiry = new Date(currentUser.planExpiry);
            currentPlanExpiry.textContent = `Valid until ${expiry.toLocaleDateString()}`;
        }
    } else {
        currentPlanName.textContent = 'Free Plan';
        currentPlanRate.textContent = '₹0.50';
        currentPlanMaxEntries.textContent = '10';
        currentPlanAdsStatus.innerHTML = '<i class="fas fa-check text-success me-2"></i>60-second ads after each entry';
        currentPlanSupport.innerHTML = '<i class="fas fa-check text-success me-2"></i>Basic support';
        currentPlanReferral.innerHTML = '<i class="fas fa-times text-danger me-2"></i>No referral bonus';
        currentPlanExpiry.textContent = '';
    }
    
    // Update earnings and other stats
    const rate = getRatePerEntry();
    const todayEarnings = (currentUser.entriesToday || 0) * rate;
    document.getElementById('dashboardTodayEarnings').textContent = todayEarnings.toFixed(2);
    document.getElementById('workPageTodayEarnings').textContent = todayEarnings.toFixed(2);
    document.getElementById('totalEarnings').textContent = ((currentUser.totalEntries || 0) * rate).toFixed(2);
    document.getElementById('earningWallet').textContent = (currentUser.earningWallet || 0).toFixed(2);
    document.getElementById('referralBonus').textContent = (currentUser.referralBonus || 0).toFixed(2);
    
    // Update entries
    document.getElementById('entriesToday').textContent = currentUser.entriesToday || 0;
    document.getElementById('totalEntries').textContent = currentUser.totalEntries || 0;
    document.getElementById('referralCount').textContent = currentUser.referrals?.length || 0;
    
    // Update wallet modal
    document.getElementById('modalEarningWallet').textContent = (currentUser.earningWallet || 0).toFixed(2);
    document.getElementById('modalBonusWallet').textContent = (currentUser.referralBonus || 0).toFixed(2);
    
    // Update withdrawal button state
    document.getElementById('withdrawEarningsBtn').disabled = (currentUser.earningWallet || 0) < 300;
    
    // Update transaction history
    updateTransactionHistory();
    
    // Update referred users
    updateReferredUsers();

    // Update referral link
    updateReferralLink();

    // Update bank details if available
    if (currentUser.bankDetails) {
        document.getElementById('accountName').value = currentUser.bankDetails.name;
        document.getElementById('accountNumber').value = currentUser.bankDetails.number;
        document.getElementById('ifscCode').value = currentUser.bankDetails.ifsc;
    }
}

// Setup dashboard event listeners
function setupDashboardEventListeners() {
    // Wallet buttons
    document.getElementById('withdrawEarningsBtn').addEventListener('click', () => showWithdrawalModal('earning'));
    document.getElementById('withdrawBonusBtn').addEventListener('click', () => showWithdrawalModal('bonus'));

    // Bank details form
    document.getElementById('bankDetailsForm').addEventListener('submit', handleBankDetailsSubmit);

    // Withdrawal form
    document.getElementById('withdrawalForm').addEventListener('submit', handleWithdrawalSubmit);

    // Copy referral link
    document.getElementById('copyReferralLink').addEventListener('click', copyReferralLink);
}

// Show wallet modal
function showWalletModal() {
    const modal = new bootstrap.Modal(document.getElementById('walletModal'));
    updateWalletModalData();
    modal.show();
}

// Update wallet modal data
function updateWalletModalData() {
    // Update wallet balances
    document.getElementById('modalEarningWallet').textContent = currentUser.earningWallet.toFixed(2);
    document.getElementById('modalBonusWallet').textContent = currentUser.bonusWallet.toFixed(2);

    // Update bank details if available
    if (currentUser.bankDetails) {
        document.getElementById('accountName').value = currentUser.bankDetails.name;
        document.getElementById('accountNumber').value = currentUser.bankDetails.number;
        document.getElementById('ifscCode').value = currentUser.bankDetails.ifsc;
    }

    // Enable/disable withdrawal buttons
    document.getElementById('withdrawEarningsBtn').disabled = currentUser.earningWallet < 300 || !currentUser.bankDetails;
    document.getElementById('withdrawBonusBtn').disabled = currentUser.bonusWallet <= 0 || !currentUser.bankDetails;

    // Update withdrawal history
    updateWithdrawalHistory();
}

// Show withdrawal modal
function showWithdrawalModal(walletType) {
    const modal = new bootstrap.Modal(document.getElementById('withdrawalModal'));
    document.getElementById('walletType').value = walletType;
    
    // Update amount field based on wallet type
    const amountInput = document.getElementById('withdrawalAmount');
    const minAmountText = document.getElementById('minAmountText');
    
    if (walletType === 'earning') {
        amountInput.value = Math.min(currentUser.earningWallet, 300);
        minAmountText.style.display = 'block';
    } else {
        amountInput.value = currentUser.bonusWallet;
        minAmountText.style.display = 'none';
    }
    
    // Update bank details display
    if (currentUser.bankDetails) {
        document.getElementById('withdrawalAccountName').textContent = currentUser.bankDetails.name;
        document.getElementById('withdrawalAccountNumber').textContent = currentUser.bankDetails.number;
        document.getElementById('withdrawalIfscCode').textContent = currentUser.bankDetails.ifsc;
    }
    
    modal.show();
}

// Handle bank details submission
function handleBankDetailsSubmit(e) {
    e.preventDefault();
    currentUser.bankDetails = {
        name: document.getElementById('accountName').value,
        number: document.getElementById('accountNumber').value,
        ifsc: document.getElementById('ifscCode').value
    };
    
    // Save user data immediately after updating
    saveUserData();
    
    updateWalletModalData();
    showAlert('Bank details saved successfully!');
}

// Handle withdrawal submission
function handleWithdrawalSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('withdrawalAmount').value);
    const walletType = document.getElementById('walletType').value;
    
    // Validate withdrawal
    if (walletType === 'earning' && amount < 300) {
        showAlert('Minimum withdrawal amount is ₹300');
        return;
    }

    if (walletType === 'earning' && amount > currentUser.earningWallet) {
        showAlert('Insufficient balance in earning wallet');
        return;
    }

    if (walletType === 'bonus' && amount > currentUser.bonusWallet) {
        showAlert('Insufficient balance in bonus wallet');
        return;
    }

    if (!currentUser.bankDetails) {
        showAlert('Please add bank details before making a withdrawal');
        return;
    }

    // Create withdrawal record
    const withdrawal = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        amount: amount,
        walletType: walletType,
        status: 'pending',
        processedDate: null,
        bankDetails: {
            name: currentUser.bankDetails.name,
            number: currentUser.bankDetails.number,
            ifsc: currentUser.bankDetails.ifsc
        }
    };

    // Add to transactions
    currentUser.transactions.push({
        date: withdrawal.date,
        type: 'withdrawal',
        amount: amount,
        walletType: walletType,
        status: 'pending',
        withdrawalId: withdrawal.id
    });

    // Update wallet balance
    if (walletType === 'earning') {
        currentUser.earningWallet -= amount;
    } else {
        currentUser.bonusWallet -= amount;
    }

    // Save user data immediately after updating
    saveUserData();

    // Update UI
    updateWalletModalData();
    bootstrap.Modal.getInstance(document.getElementById('withdrawalModal')).hide();
    showAlert('Withdrawal request submitted successfully! Processing time: 24 hours');
}

// Update transaction history
function updateTransactionHistory() {
    const tbody = document.getElementById('transactionHistory');
    if (currentUser.transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No transactions yet</td></tr>';
        return;
    }

    tbody.innerHTML = currentUser.transactions.map(transaction => `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>₹${transaction.amount.toFixed(2)}</td>
            <td><span class="badge bg-${transaction.status === 'pending' ? 'warning' : 'success'}">${transaction.status}</span></td>
            <td>${transaction.walletType === 'earning' ? 'Earning Wallet' : 'Bonus Wallet'}</td>
        </tr>
    `).join('');
}

// Update referred users
function updateReferredUsers() {
    const tbody = document.getElementById('referredUsers');
    if (currentUser.referredUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No referrals yet</td></tr>';
        return;
    }

    tbody.innerHTML = currentUser.referredUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.joinDate}</td>
            <td><span class="badge bg-${user.status === 'active' ? 'success' : 'warning'}">${user.status}</span></td>
            <td>₹${user.bonusEarned.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Update referral link
function updateReferralLink() {
    if (!currentUser || !currentUser.referralCode) {
        console.error('No referral code found for current user');
        return;
    }
    
    const baseUrl = window.location.origin;
    const referralLink = `${baseUrl}/register?ref=${currentUser.referralCode}`;
    const referralLinkInput = document.getElementById('referralLink');
    if (referralLinkInput) {
        referralLinkInput.value = referralLink;
        console.log('Referral link updated:', referralLink); // Debug log
    } else {
        console.error('Referral link input element not found');
    }
}

// Copy referral link
function copyReferralLink() {
    const referralLink = document.getElementById('referralLink');
    referralLink.select();
    document.execCommand('copy');
    showAlert('Referral link copied to clipboard!');
}

// Helper function to get rate per entry based on plan
function getRatePerEntry() {
    return currentUser.plan === 'free' ? 0.50 : 
           currentUser.plan === 'premium' ? 1.00 : 3.00;
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

// Update work page data
function updateWorkPageData() {
    console.log('Updating work page data'); // Debug log
    
    // Check if user is logged in
    if (!isLoggedIn || !currentUser) {
        console.error('User is not logged in or currentUser is null');
        return;
    }
    
    // Update plan and rate display
    const workPagePlan = document.getElementById('workPagePlan');
    const workPageRate = document.getElementById('workPageRate');
    const workPageTodayEarnings = document.getElementById('workPageTodayEarnings');
    const entriesCounter = document.getElementById('entriesCounter');
    const workProgressBar = document.getElementById('workProgressBar');
    
    if (workPagePlan) {
        workPagePlan.textContent = currentUser.plan === 'free' ? 'Free Plan' : 
            currentUser.plan === 'premium' ? 'Premium Plan' : 'Professional Plan';
    }
    
    if (workPageRate) {
        const rate = getRatePerEntry();
        workPageRate.textContent = rate.toFixed(2);
    }
    
    if (workPageTodayEarnings) {
        const todayEarnings = (currentUser.entriesToday || 0) * getRatePerEntry();
        workPageTodayEarnings.textContent = todayEarnings.toFixed(2);
    }
    
    if (entriesCounter) {
        const maxEntries = currentUser.plan === 'free' ? 10 : 50;
        entriesCounter.textContent = `${currentUser.entriesToday || 0}/${maxEntries}`;
    }
    
    if (workProgressBar) {
        const maxEntries = currentUser.plan === 'free' ? 10 : 50;
        const progressPercentage = ((currentUser.entriesToday || 0) / maxEntries) * 100;
        workProgressBar.style.width = `${progressPercentage}%`;
    }
    
    console.log('Work page data updated successfully'); // Debug log
}

// Display sample data
function displaySampleData() {
    const tbody = document.getElementById('sampleDataBody');
    const currentData = sampleData[currentSampleIndex];
    
    tbody.innerHTML = `
        <tr>
            <td>${currentData.companyName}</td>
            <td>${currentData.city}</td>
            <td>${currentData.country}</td>
            <td>${currentData.zipCode}</td>
            <td>${currentData.businessId}</td>
        </tr>
    `;
}

// Function to refresh sample data
function refreshSampleData() {
    // Get a random index different from the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * sampleData.length);
    } while (newIndex === currentSampleIndex);
    
    currentSampleIndex = newIndex;
    const currentData = sampleData[currentSampleIndex];
    
    // Update the form labels with new data
    document.querySelector('label[for="companyName"]').textContent = `Company Name (${currentData.companyName})`;
    document.querySelector('label[for="city"]').textContent = `City (${currentData.city})`;
    document.querySelector('label[for="country"]').textContent = `Country (${currentData.country})`;
    document.querySelector('label[for="zipCode"]').textContent = `Zip Code (${currentData.zipCode})`;
    document.querySelector('label[for="businessId"]').textContent = `Business ID (${currentData.businessId})`;

    // Clear any existing input in the form fields
    document.getElementById('companyName').value = '';
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
    document.getElementById('zipCode').value = '';
    document.getElementById('businessId').value = '';
}

// Generate random data
function generateRandomData() {
    const companies = ['Tech Solutions', 'Global Enterprises', 'Innovative Systems', 'Digital Solutions', 'Future Tech'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];
    const countries = ['India', 'India', 'India', 'India', 'India'];
    const zipCodes = ['400001', '110001', '560001', '500001', '600001'];
    
    const randomIndex = Math.floor(Math.random() * companies.length);
    
    return {
        companyName: companies[randomIndex],
        city: cities[randomIndex],
        country: countries[randomIndex],
        zipCode: zipCodes[randomIndex],
        businessId: `BIZ${Math.floor(100000 + Math.random() * 900000)}`
    };
}

// Data validation function
function validateEntry(formData) {
    const errors = [];
    
    // Extract data inside brackets from labels
    const companyNameLabel = document.querySelector('label[for="companyName"]').textContent;
    const cityLabel = document.querySelector('label[for="city"]').textContent;
    const countryLabel = document.querySelector('label[for="country"]').textContent;
    const zipCodeLabel = document.querySelector('label[for="zipCode"]').textContent;
    const businessIdLabel = document.querySelector('label[for="businessId"]').textContent;

    // Function to extract text between brackets
    function getTextBetweenBrackets(text) {
        const match = text.match(/\((.*?)\)/);
        return match ? match[1] : '';
    }

    // Get the expected values (text between brackets)
    const expectedCompanyName = getTextBetweenBrackets(companyNameLabel);
    const expectedCity = getTextBetweenBrackets(cityLabel);
    const expectedCountry = getTextBetweenBrackets(countryLabel);
    const expectedZipCode = getTextBetweenBrackets(zipCodeLabel);
    const expectedBusinessId = getTextBetweenBrackets(businessIdLabel);
    
    // Check each field against the expected values
    if (formData.companyName !== expectedCompanyName) {
        errors.push({
            field: 'companyName',
            message: `Company name should be "${expectedCompanyName}"`
        });
    }
    
    if (formData.city !== expectedCity) {
        errors.push({
            field: 'city',
            message: `City should be "${expectedCity}"`
        });
    }
    
    if (formData.country !== expectedCountry) {
        errors.push({
            field: 'country',
            message: `Country should be "${expectedCountry}"`
        });
    }
    
    if (formData.zipCode !== expectedZipCode) {
        errors.push({
            field: 'zipCode',
            message: `Zip code should be "${expectedZipCode}"`
        });
    }
    
    if (formData.businessId !== expectedBusinessId) {
        errors.push({
            field: 'businessId',
            message: `Business ID should be "${expectedBusinessId}"`
        });
    }
    
    return errors;
}

// Show error modal with specific field errors
function showErrorModal(errors) {
    const errorList = document.getElementById('errorList');
    errorList.innerHTML = errors.map(error => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${error.message}</span>
            <button class="btn btn-sm btn-outline-primary" onclick="highlightField('${error.field}')">
                <i class="fas fa-arrow-right"></i>
            </button>
        </li>
    `).join('');
    
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

// Highlight the field with error
function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add('error-highlight');
    field.focus();
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
        field.classList.remove('error-highlight');
    }, 2000);
}

// Handle form submission
document.getElementById('dataEntryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    
    // Get form data
    const formData = {
        companyName: document.getElementById('companyName').value.trim(),
        city: document.getElementById('city').value.trim(),
        country: document.getElementById('country').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        businessId: document.getElementById('businessId').value.trim()
    };

    console.log('Form data:', formData); // Debug log

    // Check if any field is empty
    if (!formData.companyName || !formData.city || !formData.country || !formData.zipCode || !formData.businessId) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Validate entry
    const errors = validateEntry(formData);
    if (errors.length > 0) {
        showErrorModal(errors);
        return;
    }

    // Store form data for later use
    window.pendingFormData = formData;

    // Show ad modal for Free Plan
    if (currentUser.plan === 'free') {
        showAdModal(formData);
    } else {
        // For Premium/Professional plans, directly process the entry
        processEntry(formData);
    }
});

// Process entry function
function processEntry(formData) {
    // Calculate earnings based on user's plan
    const rate = getRatePerEntry();
    const earnings = rate;
    
    // Update user data
    currentUser.entriesToday = (currentUser.entriesToday || 0) + 1;
    currentUser.totalEntries = (currentUser.totalEntries || 0) + 1;
    currentUser.earningWallet = (currentUser.earningWallet || 0) + earnings;
    currentUser.totalEarnings = (currentUser.totalEarnings || 0) + earnings;
    
    // Add transaction record
    const transaction = {
        date: new Date().toLocaleDateString(),
        type: 'Data Entry',
        amount: earnings,
        status: 'Completed',
        details: `Entry #${currentUser.totalEntries}`
    };
    
    // Initialize transactions array if it doesn't exist
    if (!currentUser.transactions) {
        currentUser.transactions = [];
    }
    
    // Add new transaction to the beginning of the array
    currentUser.transactions.unshift(transaction);
    
    // Save user data immediately
    saveUserData();
    
    // Update all UI elements
    updateAllDisplays(earnings);
    
    // Reset form and show new data
    resetFormAndShowNewData();
    
    // Show success message
    showAlert(`Entry submitted successfully! Earned ₹${earnings.toFixed(2)}`, 'success');
}

// Function to update all displays
function updateAllDisplays(earnings) {
    // Update dashboard earnings
    document.getElementById('dashboardTodayEarnings').textContent = (currentUser.entriesToday * getRatePerEntry()).toFixed(2);
    document.getElementById('totalEarnings').textContent = currentUser.totalEarnings.toFixed(2);
    document.getElementById('earningWallet').textContent = currentUser.earningWallet.toFixed(2);
    document.getElementById('totalEntries').textContent = currentUser.totalEntries;
    
    // Update work page earnings
    document.getElementById('workPageTodayEarnings').textContent = (currentUser.entriesToday * getRatePerEntry()).toFixed(2);
    
    // Update entries counter and progress bar
    const maxEntries = currentUser.plan === 'free' ? 10 : 50;
    document.getElementById('entriesCounter').textContent = `${currentUser.entriesToday}/${maxEntries}`;
    const progressPercent = (currentUser.entriesToday / maxEntries) * 100;
    document.getElementById('workProgressBar').style.width = `${progressPercent}%`;
    
    // Update wallet modal displays
    document.getElementById('modalEarningWallet').textContent = currentUser.earningWallet.toFixed(2);
    document.getElementById('modalBonusWallet').textContent = (currentUser.referralBonus || 0).toFixed(2);
    
    // Update transaction history
    updateTransactionHistory();
}

// Function to reset form and show new data
function resetFormAndShowNewData() {
    // Reset form
    const form = document.getElementById('dataEntryForm');
    form.reset();
    
    // Clear form fields explicitly
    document.getElementById('companyName').value = '';
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
    document.getElementById('zipCode').value = '';
    document.getElementById('businessId').value = '';
    
    // Show new data for next entry
    refreshSampleData();
}

// Load YouTube IFrame API
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    // Player will be initialized when needed
    console.log('YouTube API Ready');
}

// Update showAdModal function
function showAdModal(formData) {
    const adModal = new bootstrap.Modal(document.getElementById('adModal'));
    const timerElement = document.getElementById('adTimer');
    const continueButton = document.getElementById('continueButton');
    const adStatus = document.getElementById('adStatus');
    let timeLeft = 30;
    let timerInterval;
    let videoStarted = false;
    let isPaused = false;

    // Initialize YouTube player
    player = new YT.Player('youtubePlayer', {
        height: '360',
        width: '640',
        videoId: 'IVY8V2vRCMA',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    function onPlayerReady(event) {
        event.target.playVideo();
        videoStarted = true;
        startTimer();
    }

    function onPlayerStateChange(event) {
        if (event.data !== YT.PlayerState.PLAYING) {
            clearInterval(timerInterval);
            isPaused = true;
        } else if (videoStarted) {
            isPaused = false;
            startTimer();
        }
    }

    // Handle visibility changes
    function handleVisibilityChange() {
        if (document.hidden || !document.hasFocus()) {
            clearInterval(timerInterval);
            isPaused = true;
            if (player) {
                player.pauseVideo();
            }
            adStatus.textContent = 'Ad paused - Please return to this window';
        } else {
            if (player) {
                player.playVideo();
                isPaused = false;
                startTimer();
                adStatus.textContent = 'Please watch the ad to continue...';
            }
        }
    }

    // Add visibility change listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);
    window.addEventListener('focus', () => {
        if (player) {
            player.playVideo();
            isPaused = false;
            startTimer();
        }
    });

    // Disable continue button initially
    continueButton.disabled = true;
    continueButton.innerHTML = '<i class="fas fa-lock me-2"></i>Watch Ad to Continue';

    // Update timer display
    timerElement.textContent = `${timeLeft} seconds remaining`;

    // Start timer function
    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (player && player.getPlayerState() === YT.PlayerState.PLAYING && !isPaused) {
                timeLeft--;
                timerElement.textContent = `${timeLeft} seconds remaining`;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    continueButton.disabled = false;
                    continueButton.innerHTML = '<i class="fas fa-check me-2"></i>Continue';
                    adStatus.textContent = 'Ad completed! Click Continue to proceed';
                    
                    // Process the entry and update earnings
                    processEntry(window.pendingFormData);
                }
            }
        }, 1000);
    }

    // Show the modal
    adModal.show();

    // Handle continue button click
    continueButton.onclick = function() {
        if (!continueButton.disabled) {
            // Remove event listeners
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleVisibilityChange);
            window.removeEventListener('focus', handleVisibilityChange);
            
            // Stop and destroy the player
            if (player) {
                player.stopVideo();
                player.destroy();
            }

            // Hide modal
            adModal.hide();

            // Update all displays
            updateAllDisplays(getRatePerEntry());
        }
    };

    // Clean up when modal is closed
    document.getElementById('adModal').addEventListener('hidden.bs.modal', function() {
        // Remove event listeners
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleVisibilityChange);
        window.removeEventListener('focus', handleVisibilityChange);
        
        clearInterval(timerInterval);
        if (player) {
            player.stopVideo();
            player.destroy();
        }
    });
}

// Update withdrawal history
function updateWithdrawalHistory() {
    const tbody = document.getElementById('withdrawalHistory');
    const withdrawals = currentUser.transactions.filter(t => t.type === 'withdrawal');
    
    if (withdrawals.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No withdrawal history yet</td></tr>';
        return;
    }

    tbody.innerHTML = withdrawals.map(withdrawal => `
        <tr>
            <td>${withdrawal.date}</td>
            <td>₹${withdrawal.amount.toFixed(2)}</td>
            <td>${withdrawal.walletType === 'earning' ? 'Earning Wallet' : 'Bonus Wallet'}</td>
            <td>
                <span class="badge bg-${withdrawal.status === 'pending' ? 'warning' : 'success'}">
                    ${withdrawal.status}
                </span>
            </td>
            <td>${withdrawal.processedDate || '-'}</td>
        </tr>
    `).join('');
}

// Plan upgrade functionality
function checkReferralEligibility() {
    if (!currentUser.referrals) return 0;
    // Count premium referrals
    return currentUser.referrals.filter(ref => ref.plan === 'premium' && ref.status === 'active').length;
}

// Update referral progress in upgrade modal
function updateReferralProgress() {
    const premiumReferrals = (currentUser.referrals || []).filter(ref => ref.plan === 'premium').length;
    const progressPercentage = (premiumReferrals / 5) * 100;
    
    document.getElementById('premiumReferralCount').textContent = premiumReferrals;
    const progressBar = document.getElementById('referralProgressBar');
    progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    
    // Enable/disable Professional upgrade button based on referral count
    const upgradeToProfessionalBtn = document.getElementById('upgradeToProfessionalBtn');
    if (premiumReferrals >= 5) {
        upgradeToProfessionalBtn.disabled = false;
        upgradeToProfessionalBtn.innerHTML = '<i class="fas fa-arrow-up me-2"></i>Claim Free Upgrade';
    } else {
        upgradeToProfessionalBtn.disabled = true;
        upgradeToProfessionalBtn.innerHTML = '<i class="fas fa-lock me-2"></i>Get 5 Premium Referrals';
    }
}

// Event listener for upgrade buttons
document.getElementById('upgradeToPremiumBtn').addEventListener('click', function() {
    if (currentUser.plan === 'professional') {
        alert('You are already on a higher plan!');
        return;
    }
    
    if (confirm('Upgrade to Premium Plan for ₹2999 for 3 months?')) {
        // Process premium upgrade
        currentUser.plan = 'premium';
        currentUser.planExpiry = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)); // 90 days
        saveUserData();
        updateDashboardData();
        alert('Successfully upgraded to Premium Plan!');
        
        // Add transaction record
        addTransaction({
            date: new Date(),
            type: 'Plan Upgrade',
            amount: 2999,
            status: 'Completed',
            details: 'Upgraded to Premium Plan'
        });
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('upgradeModal')).hide();
    }
});

document.getElementById('upgradeToProfessionalBtn').addEventListener('click', function() {
    if (currentUser.plan === 'professional') {
        alert('You are already on the Professional Plan!');
        return;
    }
    
    const premiumReferrals = (currentUser.referrals || []).filter(ref => ref.plan === 'premium').length;
    if (premiumReferrals >= 5) {
        // Process free professional upgrade
        currentUser.plan = 'professional';
        currentUser.planExpiry = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)); // 365 days
        saveUserData();
        updateDashboardData();
        alert('Congratulations! You have been upgraded to the Professional Plan for free!');
        
        // Add transaction record
        addTransaction({
            date: new Date(),
            type: 'Plan Upgrade',
            amount: 0,
            status: 'Completed',
            details: 'Free upgrade to Professional Plan (Referral Reward)'
        });
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('upgradeModal')).hide();
    } else {
        alert(`You need ${5 - premiumReferrals} more Premium referrals to get a free Professional upgrade!`);
    }
});

// Update the modal when it's opened
document.getElementById('upgradeModal').addEventListener('show.bs.modal', function() {
    updateReferralProgress();
});

// Function to load sample data into the form labels
function loadSampleData() {
    const sampleData = {
        companyName: "Future Enterprises",
        city: "Kolkata",
        country: "India",
        zipCode: "700001",
        businessId: "FUT175533"
    };

    // Update the form labels with sample data
    document.querySelector('label[for="companyName"]').textContent = `Company Name (${sampleData.companyName})`;
    document.querySelector('label[for="city"]').textContent = `City (${sampleData.city})`;
    document.querySelector('label[for="country"]').textContent = `Country (${sampleData.country})`;
    document.querySelector('label[for="zipCode"]').textContent = `Zip Code (${sampleData.zipCode})`;
    document.querySelector('label[for="businessId"]').textContent = `Business ID (${sampleData.businessId})`;

    // Clear any existing input in the form fields
    document.getElementById('companyName').value = '';
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
    document.getElementById('zipCode').value = '';
    document.getElementById('businessId').value = '';
}

// Call loadSampleData when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadSampleData();
});

// Initialize UI
updateUI(); 
