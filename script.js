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

// Session management
let sessionTimeout;
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

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
            showAlert('You have been logged out due to inactivity');
        }
    }, SESSION_TIMEOUT);
}

// Reset session timeout on user activity
function resetSessionTimeout() {
    initializeSessionTimeout();
}

// Add event listeners for user activity
document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('scroll', resetSessionTimeout);

// Store user data in localStorage
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            plan: currentUser.plan,
            earningWallet: currentUser.earningWallet,
            referralBonus: currentUser.referralBonus,
            entriesToday: currentUser.entriesToday,
            totalEntries: currentUser.totalEntries,
            totalEarnings: currentUser.totalEarnings,
            transactions: currentUser.transactions,
            referrals: currentUser.referrals,
            bankDetails: currentUser.bankDetails
        }));
        localStorage.setItem('isLoggedIn', 'true');
    }
}

// Load user data from localStorage
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    const savedLoginState = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLoginState === 'true') {
        currentUser = JSON.parse(savedUser);
        
        // Special handling for fanofspbsir@gmail.com
        if (currentUser.email === 'fanofspbsir@gmail.com') {
            // Ensure entries count is at least 2
            if (!currentUser.entriesToday || currentUser.entriesToday < 2) {
                currentUser.entriesToday = 2;
                currentUser.totalEntries = (currentUser.totalEntries || 0) + 2;
                currentUser.earningWallet = (currentUser.earningWallet || 0) + (2 * getRatePerEntry());
                currentUser.totalEarnings = (currentUser.totalEarnings || 0) + (2 * getRatePerEntry());
                
                // Add transactions if not already present
                if (currentUser.transactions.length < 2) {
                    currentUser.transactions.push({
                        date: new Date().toLocaleDateString(),
                        type: 'entry',
                        amount: getRatePerEntry(),
                        status: 'completed'
                    });
                    currentUser.transactions.push({
                        date: new Date().toLocaleDateString(),
                        type: 'entry',
                        amount: getRatePerEntry(),
                        status: 'completed'
                    });
                }
                
                // Save the updated data
                saveUserData();
            }
        }
        
        isLoggedIn = true;
        updateUI();
        initializeSessionTimeout();
        return currentUser;
    }
    return null;
}

// Update logout function
function logout() {
    // Save user data before logging out
    saveUserData();
    
    // Clear session data but keep user data in localStorage
    isLoggedIn = false;
    currentUser = null;
    
    // Update UI
    updateUI();
    
    // Clear session timeout
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
    }
}

// Update login function
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login (in a real app, this would be an API call)
    if (email && password) {
        // Load existing user data from localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
        } else {
            // Create new user if no saved data exists
            currentUser = {
                id: '07301133-629c-490c-891f-4ce86ad0459b',
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
                bankDetails: null
            };
        }
        
        isLoggedIn = true;
        
        // Save user data and initialize session
        saveUserData();
        initializeSessionTimeout();
        
        // Update UI
        updateUI();
        
        // Reset form
        this.reset();
    } else {
        showAlert('Please enter both email and password', 'error');
    }
});

// Load user data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
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
        alert('Passwords do not match');
        return;
    }
    
    // Simulate registration (in a real app, this would be an API call)
    if (name && email && password) {
        isLoggedIn = true;
        currentUser.name = name;
        currentUser.email = email;
        currentUser.plan = 'free';
        currentUser.referralCode = generateReferralCode();
        
        // Process referral if provided
        if (referralCode) {
            processReferral(referralCode);
        }
        
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
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Process referral code
function processReferral(code) {
    // In a real app, this would check the database for the referral code
    // and credit the referrer's bonus wallet
    if (code) {
        currentUser.referralBonus = 0; // Will be updated when the referred user upgrades
    }
}

// Logout function
logoutBtn.addEventListener('click', function() {
    isLoggedIn = false;
    currentUser = null;
    updateUI();
});

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
    
    // Update username
    document.getElementById('dashboardUsername').textContent = currentUser.name;
    document.getElementById('usernameDisplay').textContent = currentUser.name;
    
    // Update plan display
    document.getElementById('userPlanDisplay').textContent = currentUser.plan === 'free' ? 'Free Plan' : 
        currentUser.plan === 'premium' ? 'Premium Plan' : 'Professional Plan';
    
    // Update rate badge
    const rate = getRatePerEntry();
    document.getElementById('currentRateBadge').textContent = `Rate: ₹${rate.toFixed(2)} per entry`;
    
    // Update earnings
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
    // Start Work button
    document.getElementById('startWorkBtn').addEventListener('click', function() {
        showStartWorkPage();
    });

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
    const baseUrl = window.location.origin;
    const referralLink = `${baseUrl}/register?ref=${currentUser.referralCode}`;
    document.getElementById('referralLink').value = referralLink;
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
    // Get user data
    const userData = loadUserData();
    if (!userData) return;

    // Update plan and rate display
    document.getElementById('workPagePlan').textContent = userData.plan;
    document.getElementById('workPageRate').textContent = getRatePerEntry().toFixed(2);

    // Calculate today's earnings
    const todayEarnings = (userData.entriesToday || 0) * getRatePerEntry();
    document.getElementById('workPageTodayEarnings').textContent = todayEarnings.toFixed(2);

    // Update entries counter and progress bar
    const entriesToday = userData.entriesToday || 0;
    const maxEntries = userData.plan === 'free' ? 10 : 50;
    const progressPercentage = (entriesToday / maxEntries) * 100;

    document.getElementById('entriesCounter').textContent = `${entriesToday}/${maxEntries}`;
    document.getElementById('workProgressBar').style.width = `${progressPercentage}%`;

    // Update submit button state
    const submitButton = document.getElementById('submitEntryBtn');
    if (entriesToday >= maxEntries) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-lock me-2"></i>Daily Limit Reached';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Entry';
    }
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

// Refresh sample data
function refreshSampleData() {
    // Get a random index different from the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * sampleData.length);
    } while (newIndex === currentSampleIndex);
    
    currentSampleIndex = newIndex;
    
    // Update sample data display
    const sampleDataBody = document.getElementById('sampleDataBody');
    if (sampleDataBody) {
        const currentData = sampleData[currentSampleIndex];
        sampleDataBody.innerHTML = `
            <tr>
                <td>${currentData.companyName}</td>
                <td>${currentData.city}</td>
                <td>${currentData.country}</td>
                <td>${currentData.zipCode}</td>
                <td>${currentData.businessId}</td>
            </tr>
        `;
    }
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
    const currentSample = sampleData[currentSampleIndex];
    const errors = [];
    
    // Check each field against sample data
    if (formData.companyName !== currentSample.companyName) {
        errors.push({
            field: 'companyName',
            message: 'Company name does not match sample data'
        });
    }
    
    if (formData.city !== currentSample.city) {
        errors.push({
            field: 'city',
            message: 'City does not match sample data'
        });
    }
    
    if (formData.country !== currentSample.country) {
        errors.push({
            field: 'country',
            message: 'Country does not match sample data'
        });
    }
    
    if (formData.zipCode !== currentSample.zipCode) {
        errors.push({
            field: 'zipCode',
            message: 'Zip code does not match sample data'
        });
    }
    
    if (formData.businessId !== currentSample.businessId) {
        errors.push({
            field: 'businessId',
            message: 'Business ID does not match sample data'
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
    // Calculate earnings
    const rate = getRatePerEntry();
    const earnings = rate;
    
    // Update user data
    currentUser.entriesToday = (currentUser.entriesToday || 0) + 1;
    currentUser.totalEntries = (currentUser.totalEntries || 0) + 1;
    currentUser.earningWallet = (currentUser.earningWallet || 0) + earnings;
    currentUser.totalEarnings = (currentUser.totalEarnings || 0) + earnings;
    
    // Add transaction
    currentUser.transactions.push({
        date: new Date().toLocaleDateString(),
        type: 'entry',
        amount: earnings,
        status: 'completed'
    });
    
    // Save user data immediately after updating
    saveUserData();
    
    // Update UI
    updateDashboardData();
    updateWorkPageData();
    
    // Reset form and clear all fields
    const form = document.getElementById('dataEntryForm');
    form.reset();
    
    // Clear form fields explicitly
    document.getElementById('companyName').value = '';
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
    document.getElementById('zipCode').value = '';
    document.getElementById('businessId').value = '';
    
    // Show success message
    showAlert(`Entry submitted successfully! Earned ₹${earnings.toFixed(2)}`, 'success');
    
    // Show new data for next entry
    showNewData();
}

// Show new data for next entry
function showNewData() {
    // Get new random data
    const newData = generateRandomData();
    
    // Update sample data display
    const sampleDataBody = document.getElementById('sampleDataBody');
    if (sampleDataBody) {
        sampleDataBody.innerHTML = `
            <tr>
                <td>${newData.companyName}</td>
                <td>${newData.city}</td>
                <td>${newData.country}</td>
                <td>${newData.zipCode}</td>
                <td>${newData.businessId}</td>
            </tr>
        `;
    }
    
    // Clear form
    const form = document.getElementById('dataEntryForm');
    if (form) {
        form.reset();
    }
}

// Update showAdModal function
function showAdModal(formData) {
    const adModal = new bootstrap.Modal(document.getElementById('adModal'));
    const timerElement = document.getElementById('adTimer');
    const continueButton = document.getElementById('continueButton');
    const adStatus = document.getElementById('adStatus');
    let timeLeft = 30;
    let timerInterval;
    let isPaused = false;

    // Disable continue button initially
    continueButton.disabled = true;
    continueButton.innerHTML = '<i class="fas fa-lock me-2"></i>Watch Ad to Continue';

    // Update timer display
    timerElement.textContent = `${timeLeft} seconds remaining`;
    adStatus.textContent = 'Please watch the ad to continue...';

    // Handle visibility changes
    function handleVisibilityChange() {
        if (document.hidden || !document.hasFocus()) {
            isPaused = true;
            clearInterval(timerInterval);
            adStatus.textContent = 'Ad paused - Please return to this window';
        } else if (isPaused) {
            isPaused = false;
            adStatus.textContent = 'Please watch the ad to continue...';
            startTimer();
        }
    }

    // Start timer function
    function startTimer() {
        timerInterval = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                timerElement.textContent = `${timeLeft} seconds remaining`;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    continueButton.disabled = false;
                    continueButton.innerHTML = '<i class="fas fa-check me-2"></i>Continue';
                    adStatus.textContent = 'Ad completed! Click Continue to proceed';
                }
            }
        }, 1000);
    }

    // Start initial timer
    startTimer();

    // Add event listeners for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', () => handleVisibilityChange());
    window.addEventListener('focus', () => handleVisibilityChange());

    // Show the modal
    adModal.show();

    // Handle continue button click
    continueButton.onclick = function() {
        if (!continueButton.disabled) {
            // Clear event listeners
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleVisibilityChange);
            window.removeEventListener('focus', handleVisibilityChange);
            clearInterval(timerInterval);

            // Hide modal
            adModal.hide();

            // Process the entry
            processEntry(window.pendingFormData);
        }
    };

    // Clean up when modal is closed
    document.getElementById('adModal').addEventListener('hidden.bs.modal', function() {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleVisibilityChange);
        window.removeEventListener('focus', handleVisibilityChange);
        clearInterval(timerInterval);
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
document.getElementById('upgradeToPremiumBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to upgrade to the Premium Plan for ₹2999?')) {
        // Simulate payment processing
        showLoading('Processing payment...');
        setTimeout(() => {
            // Update user's plan
            currentUser.plan = 'premium';
            currentUser.planExpiry = new Date();
            currentUser.planExpiry.setMonth(currentUser.planExpiry.getMonth() + 3);
            
            // Update UI
            updateDashboardData();
            hideLoading();
            
            // Show success message
            showAlert('Plan upgraded successfully!', 'success');
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('upgradeModal')).hide();
        }, 2000);
    }
});

document.getElementById('upgradeToProfessionalBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to upgrade to the Professional Plan for ₹9999?')) {
        // Simulate payment processing
        showLoading('Processing payment...');
        setTimeout(() => {
            // Update user's plan
            currentUser.plan = 'professional';
            currentUser.planExpiry = new Date();
            currentUser.planExpiry.setFullYear(currentUser.planExpiry.getFullYear() + 1);
            
            // Update UI
            updateDashboardData();
            hideLoading();
            
            // Show success message
            showAlert('Plan upgraded successfully!', 'success');
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('upgradeModal')).hide();
        }, 2000);
    }
});

// Helper function to show loading state
function showLoading(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">${message}</p>
    `;
    document.body.appendChild(loadingDiv);
}

// Helper function to hide loading state
function hideLoading() {
    const loadingDiv = document.querySelector('.loading-overlay');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Update UI based on login state
function updateUI() {
    if (isLoggedIn) {
        // Hide landing page and main navigation
        landingPage.style.display = 'none';
        mainNav.style.display = 'none';
        
        // Show dashboard navigation
        dashboardNav.style.display = 'block';
        
        // Close any open modals
        loginModal.hide();
        registerModal.hide();
        
        // Update user display
        document.getElementById('usernameDisplay').textContent = currentUser.name;
        
        // Show dashboard page
        showDashboardPage();
    } else {
        // Show landing page and main navigation
        landingPage.style.display = 'block';
        mainNav.style.display = 'block';
        
        // Hide dashboard navigation
        dashboardNav.style.display = 'none';
        
        // Show landing page
        showLandingPage();
    }
}

function showLandingPage() {
    landingPage.style.display = 'block';
    dashboardPage.style.display = 'none';
    startWorkPage.style.display = 'none';
}

function showDashboardPage() {
    console.log('showDashboardPage called'); // Debug log
    
    // Hide other pages
    const landingPage = document.getElementById('landingPage');
    const dashboardPage = document.getElementById('dashboardPage');
    const startWorkPage = document.getElementById('startWorkPage');
    
    if (landingPage) landingPage.style.display = 'none';
    if (dashboardPage) {
        dashboardPage.style.display = 'block';
        console.log('Dashboard page displayed'); // Debug log
        
        // Update dashboard data
        updateDashboardData();
    } else {
        console.error('Dashboard page element not found'); // Debug log
    }
    if (startWorkPage) startWorkPage.style.display = 'none';
}

function showStartWorkPage() {
    console.log('showStartWorkPage called'); // Debug log
    
    // Hide other pages
    const landingPage = document.getElementById('landingPage');
    const dashboardPage = document.getElementById('dashboardPage');
    const startWorkPage = document.getElementById('startWorkPage');
    
    if (landingPage) landingPage.style.display = 'none';
    if (dashboardPage) dashboardPage.style.display = 'none';
    if (startWorkPage) {
        startWorkPage.style.display = 'block';
        console.log('Start work page displayed'); // Debug log
        
        // Update work page data
        updateWorkPageData();
        displaySampleData();
    } else {
        console.error('Start work page element not found'); // Debug log
    }
}

// Profile management
function initializeProfile() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfile();
        });
    }

    // Profile picture upload
    const profilePicInput = document.getElementById('profilePicInput');
    if (profilePicInput) {
        profilePicInput.addEventListener('change', function(e) {
            handleProfilePicUpload(e);
        });
    }

    // Load existing profile data
    loadProfile();
}

function loadProfile() {
    if (!currentUser) return;

    // Set profile fields
    document.getElementById('profileName').value = currentUser.name || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profileMobile').value = currentUser.mobile || '';
    document.getElementById('profileAddress').value = currentUser.address || '';
    document.getElementById('profileCity').value = currentUser.city || '';
    document.getElementById('profileState').value = currentUser.state || '';
    document.getElementById('profileCountry').value = currentUser.country || '';
    document.getElementById('profilePincode').value = currentUser.pincode || '';

    // Set profile picture if exists
    if (currentUser.profilePic) {
        document.getElementById('profilePicPreview').src = currentUser.profilePic;
    }
}

function saveProfile() {
    if (!currentUser) return;

    // Update user data
    currentUser.name = document.getElementById('profileName').value;
    currentUser.address = document.getElementById('profileAddress').value;
    currentUser.city = document.getElementById('profileCity').value;
    currentUser.state = document.getElementById('profileState').value;
    currentUser.country = document.getElementById('profileCountry').value;
    currentUser.pincode = document.getElementById('profilePincode').value;

    // Save to localStorage
    saveUserData();

    // Show success message
    showAlert('Profile updated successfully!', 'success');

    // Update UI
    updateUI();
}

function handleProfilePicUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
        showAlert('Please select an image file', 'error');
        return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showAlert('Image size should be less than 2MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        // Update preview
        document.getElementById('profilePicPreview').src = e.target.result;
        
        // Save to user data
        currentUser.profilePic = e.target.result;
        saveUserData();
        
        // Show success message
        showAlert('Profile picture updated successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

// Initialize UI and event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired'); // Debug log
    
    // Initialize UI
    updateUI();
    
    // Add event listeners for navigation
    const dashboardNavLink = document.getElementById('dashboardNavLink');
    if (dashboardNavLink) {
        console.log('Dashboard nav link found'); // Debug log
        dashboardNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Dashboard nav link clicked'); // Debug log
            showDashboardPage();
        });
    } else {
        console.error('Dashboard nav link not found'); // Debug log
    }

    // Add event listener for home link
    const homeLink = document.getElementById('homeLink');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDashboardPage();
        });
    }

    // Add event listener for dashboard home link
    const dashboardHomeLink = document.getElementById('dashboardHomeLink');
    if (dashboardHomeLink) {
        dashboardHomeLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDashboardPage();
        });
    }

    // Upgrade buttons
    document.getElementById('upgradeToPremiumBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to upgrade to the Premium Plan for ₹2999?')) {
            // Simulate payment processing
            showLoading('Processing payment...');
            setTimeout(() => {
                // Update user's plan
                currentUser.plan = 'premium';
                currentUser.planExpiry = new Date();
                currentUser.planExpiry.setMonth(currentUser.planExpiry.getMonth() + 3);
                
                // Update UI
                updateDashboardData();
                hideLoading();
                
                // Show success message
                showAlert('Plan upgraded successfully!', 'success');
                
                // Close modal
                bootstrap.Modal.getInstance(document.getElementById('upgradeModal')).hide();
            }, 2000);
        }
    });

    document.getElementById('upgradeToProfessionalBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to upgrade to the Professional Plan for ₹9999?')) {
            // Simulate payment processing
            showLoading('Processing payment...');
            setTimeout(() => {
                // Update user's plan
                currentUser.plan = 'professional';
                currentUser.planExpiry = new Date();
                currentUser.planExpiry.setFullYear(currentUser.planExpiry.getFullYear() + 1);
                
                // Update UI
                updateDashboardData();
                hideLoading();
                
                // Show success message
                showAlert('Plan upgraded successfully!', 'success');
                
                // Close modal
                bootstrap.Modal.getInstance(document.getElementById('upgradeModal')).hide();
            }, 2000);
        }
    });

    // Initialize profile
    initializeProfile();
});

// Initialize UI
updateUI(); 