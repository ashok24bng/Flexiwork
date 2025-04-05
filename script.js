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

// Generate a random referral code
function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
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
    console.log('Updating work page data');
    
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
    
    console.log('Work page data updated successfully');
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
    console.log('Form submitted');
    
    // Get form data
    const formData = {
        companyName: document.getElementById('companyName').value.trim(),
        city: document.getElementById('city').value.trim(),
        country: document.getElementById('country').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        businessId: document.getElementById('businessId').value.trim()
    };

    console.log('Form data:', formData);

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

// Save user data to localStorage
function saveUserData() {
    try {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        updateLastActivity();
    } catch (error) {
        console.error('Error saving user data:', error);
        showAlert('Error saving user data. Please try again.', 'error');
    }
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

// Show ad modal
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
    if (!currentUser.referredUsers || currentUser.referredUsers.length === 0) {
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
        console.log('Referral link updated:', referralLink);
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
    
    // Simulate registration
    if (name && email && password) {
        isLoggedIn = true;
        currentUser = {
            id: generateUserId(),
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
            referredUsers: [],
            bankDetails: null,
            referralCode: generateReferralCode()
        };
        
        // Process referral if provided
        if (referralCode) {
            processReferral(referralCode);
        }
        
        // Save user data
        saveUserData();
        
        // Close modal
        const registerModalInstance = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (registerModalInstance) {
            registerModalInstance.hide();
        }
        
        // Show dashboard
        showDashboardPage();
        
        // Show success message
        showAlert('Registered successfully!', 'success');
        
        // Reset form
        this.reset();
    }
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
        
        // Save user data
        saveUserData();
    }
}
