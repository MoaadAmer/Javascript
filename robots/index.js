import { loadData, saveData } from "./dbService.js";

renderUsers();

async function getUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const responseAsJson = await response.json();
    return responseAsJson.users;
  } catch (error) {}
}

async function renderUsers() {
  let users = JSON.parse(loadData("users"));
  if (!users) {
    console.log("no data available, fetching data from server");
    users = await getUsers();
    saveData("users", JSON.stringify(users));
  }
  const container = document.querySelector(".container");
  container.innerHTML = users
    .map(
      (user) =>
        `
      <div class="card">
        <ul>
          <li>First Name ${user.firstName}</li>
          <li>Last Name: ${user.lastName}</li>
          <li>Age : ${user.age}</li>
          <li>Gender : ${user.gender}</li>
          <li>BirthDate : ${user.bithdate}</li>
        </ul>
        <img src="https://robohash.org/${user.firstName}" alt="robot pictures" />
      </div>
    `
    )
    .join("");
}
