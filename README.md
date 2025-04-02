<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexiWork - Your Freelance Platform</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">FlexiWork</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#features">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#how-it-works">How It Works</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#pricing">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
        <div class="container">
            <div class="row align-items-center min-vh-100">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold">Welcome to FlexiWork</h1>
                    <p class="lead">Your one-stop platform for freelancing opportunities and secure payments.</p>
                    <div class="mt-4">
                        <a href="#register" class="btn btn-primary btn-lg me-3">Get Started</a>
                        <a href="#learn-more" class="btn btn-outline-primary btn-lg">Learn More</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="images/hero-image.svg" alt="FlexiWork Platform" class="img-fluid">
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Why Choose FlexiWork?</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <i class="fas fa-shield-alt fa-3x mb-3 text-primary"></i>
                        <h3>Secure Payments</h3>
                        <p>Your earnings are protected with our secure payment system.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <i class="fas fa-clock fa-3x mb-3 text-primary"></i>
                        <h3>Flexible Hours</h3>
                        <p>Work on your own schedule and manage your time effectively.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <i class="fas fa-wallet fa-3x mb-3 text-primary"></i>
                        <h3>Easy Withdrawals</h3>
                        <p>Quick and hassle-free withdrawal process to your bank account.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">How It Works</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="step-card text-center">
                        <div class="step-number">1</div>
                        <h3>Create Account</h3>
                        <p>Sign up and complete your profile with necessary details.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="step-card text-center">
                        <div class="step-number">2</div>
                        <h3>Add Bank Details</h3>
                        <p>Securely add your bank account information for payments.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="step-card text-center">
                        <div class="step-number">3</div>
                        <h3>Start Earning</h3>
                        <p>Complete tasks and withdraw your earnings anytime.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Contact Us</h2>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="contact-form">
                        <div class="mb-3">
                            <input type="text" class="form-control" placeholder="Your Name" required>
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control" placeholder="Your Email" required>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-light py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>FlexiWork</h5>
                    <p>Your trusted platform for freelancing opportunities.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <h5>Connect With Us</h5>
                    <div class="social-links">
                        <a href="#" class="text-light me-3"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-light"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html> 
