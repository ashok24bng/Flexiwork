// Function to show the dashboard page
function showDashboardPage() {
    landingPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    userSection.style.display = 'block';
    usernameDisplay.textContent = currentUser.name;

    // Display the dashboard header options
    dashboardNav.style.display = 'block';
    dashboardNavLink.style.display = 'block';
    startWorkNavLink.style.display = 'block';
    profileButton.style.display = 'block';
    logoutBtn.style.display = 'block';

    // Hide the main navigation (assuming mainNav is the header for the landing page)
    mainNav.style.display = 'none';
}

// Function to show the landing page
function showLandingPage() {
    landingPage.style.display = 'block';
    dashboardPage.style.display = 'none';
    userSection.style.display = 'none';

    // Hide the dashboard header options
    dashboardNav.style.display = 'none';
    dashboardNavLink.style.display = 'none';
    startWorkNavLink.style.display = 'none';
    profileButton.style.display = 'none';
    logoutBtn.style.display = 'none';

    // Show the main navigation (assuming mainNav is the header for the landing page)
    mainNav.style.display = 'block';
}
