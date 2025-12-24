const usersDiv = document.getElementById("users");
const statusDiv = document.getElementById("status");
const searchInput = document.getElementById("search");

let usersData = [];

function displayUsers(users) {
  usersDiv.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>
    `;
    usersDiv.appendChild(div);
  });
}

async function fetchUsers() {
  statusDiv.innerText = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    usersData = await response.json();
    statusDiv.innerText = "";
    displayUsers(usersData);

  } catch (error) {
    statusDiv.innerText = "Error loading data ❌";
  }
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(value)
  );
  displayUsers(filteredUsers);
});

fetchUsers();
