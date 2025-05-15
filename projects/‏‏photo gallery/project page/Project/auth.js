// ===== SIMPLER AUTHENTICATION SYSTEM =====

// Get saved users or create empty array if none exist
let users = JSON.parse(localStorage.getItem('users')) || [];

// Check if someone is logged in when page loads
window.onload = function() {
    // Get logged in user from storage (if any)
    let loggedInUser = localStorage.getItem('currentUser');
    
    // If someone is logged in, show gallery
    if (loggedInUser) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('galleryPage').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = 'Welcome, ' + loggedInUser + '!';
    }
};

// REGISTER: When register button is clicked
function register() {
    // 1. Get what user typed in the form
    let username = document.getElementById('newUsername').value;
    let password = document.getElementById('newPassword').value;
    
    // 2. Basic validation - check if fields are empty
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // 3. Check if username already exists
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            alert('Username already exists!');
            return;
        }
    }
    
    // 4. Add new user
    let newUser = {
        username: username,
        password: password
    };
    users.push(newUser);
    
    // 5. Save to storage
    localStorage.setItem('users', JSON.stringify(users));
    
    // 6. Clear form and show success message
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    alert('Registration successful! You can now log in.');
}

// LOGIN: When login button is clicked
function login() {
    // 1. Get what user typed in the form
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    // 2. Basic validation - check if fields are empty
    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return;
    }
    
    // 3. Check if username and password match
    let userFound = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            userFound = true;
            break;
        }
    }
    
    // 4. If user is found, log them in
    if (userFound) {
        // Save logged in user
        localStorage.setItem('currentUser', username);
        
        // Show gallery, hide login page
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('galleryPage').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = 'Welcome, ' + username + '!';
    } else {
        // Show error
        alert('Wrong username or password!');
    }
}

// LOGOUT: When logout button is clicked
function logout() {
    // Remove logged in user
    localStorage.removeItem('currentUser');
    
    // Show login page, hide gallery
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('galleryPage').style.display = 'none';
    
    // Clear login form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Show registration form
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Show login form
function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}