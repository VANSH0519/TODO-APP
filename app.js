// Constants
const todoList = document.getElementById("todo-list");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const logoutButton = document.getElementById("logout-button");
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");
const signupUsernameInput = document.getElementById("signup-username");
const signupPasswordInput = document.getElementById("signup-password");

// Check if a user is logged in on page load
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    // User is logged in
    loginButton.style.display = "none";
    signupButton.style.display = "none";
    logoutButton.style.display = "block";
    loadTodoList(currentUser);
} else {
    // No user is logged in
    loginButton.style.display = "block";
    signupButton.style.display = "block";
    logoutButton.style.display = "none";
}

// Event Listeners
addButton.addEventListener("click", addTask);
loginButton.addEventListener("click", () => openModal(loginModal));
signupButton.addEventListener("click", () => openModal(signupModal));
logoutButton.addEventListener("click", logout);
loginForm.addEventListener("submit", login);
signupForm.addEventListener("submit", signup);

// Functions
function openModal(modal) {
    modal.style.display = "block";
}

function closeModals() {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
}

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = { text: taskText, completed: false };
        currentUser.tasks.push(task);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        taskInput.value = "";
        loadTodoList(currentUser);
    }
}

function loadTodoList(user) {
    todoList.innerHTML = "";
    user.tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}">${task.text}</label>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(listItem);

        // Add event listener for checkbox change
        const checkbox = listItem.querySelector(`#task-${index}`);
        checkbox.addEventListener("change", () => {
            user.tasks[index].completed = checkbox.checked;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        });

        // Add event listener for delete button
        const deleteButton = listItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            user.tasks.splice(index, 1);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            loadTodoList(currentUser);
        });
    });
}

function login(e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (username !== "" && password !== "") {
        // Simulated authentication logic (replace with your own)
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            closeModals();
            window.location.reload(); // Reload the page to update UI
        } else {
            alert("Invalid username or password.");
        }
    }
}

function signup(e) {
    e.preventDefault();
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();
    if (username !== "" && password !== "") {
        // Simulated user registration (replace with your own)
        if (!localStorage.getItem(username)) {
            const newUser = { username, password, tasks: [] };
            localStorage.setItem(username, JSON.stringify(newUser));
            alert("Account created successfully. Please log in.");
            signupUsernameInput.value = "";
            signupPasswordInput.value = "";
            closeModals();
        } else {
            alert("Username already exists. Please choose another.");
        }
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.reload(); // Reload the page to update UI
}
