

let users = JSON.parse(localStorage.getItem('users')) || [];

window.onload = function () {
    let loggedInUser = localStorage.getItem('currentUser');

    if (loggedInUser) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('galleryPage').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = 'Welcome, ' + loggedInUser + '!';
    }
};

function register() {
    let username = document.getElementById('newUsername').value;
    let password = document.getElementById('newPassword').value;

    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            alert('Username already exists!');
            return;
        }
    }

    let newUser = {
        username: username,
        password: password
    };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    alert('Registration successful! You can now log in.');
}

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return;
    }

    let userFound = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            userFound = true;
            break;
        }
    }

    if (userFound) {
        localStorage.setItem('currentUser', username);

        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('galleryPage').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = 'Welcome, ' + username + '!';
    } else {
        alert('Wrong username or password!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');

    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('galleryPage').style.display = 'none';

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}