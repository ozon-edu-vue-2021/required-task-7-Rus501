import usersData from "../data.json";
import renderUser from "../modules/renderUser";
import renderUserCard from "../modules/renderUserCard";

const app = document.querySelector("#app");
const usersContainer = document.querySelector(".users-container");
const userCardContainer = document.querySelector(".user-card-container");
const globalFriendsList = [];

// initial rendering
usersData.forEach((user) => {
  const userElement = renderUser(user.name);
  usersContainer.append(userElement);

  user.friendsNames = addFriendsNames(user);
  user.nonFriends = addNonFriends(user);

  globalFriendsList.push(...user.friendsNames);
});

const usersMentions = {};

globalFriendsList.forEach((friend) => {
  usersMentions[friend] = (usersMentions[friend] || 0) + 1;
});

const friendsMentionsSorted = Object.fromEntries(
  Object.entries(usersMentions).sort(([nameA, countA], [nameB, countB]) => {
    if (countA === countB) return sortByNames(nameA, nameB);
    return countB - countA;
  })
);

function sortByNames(nameA, nameB) {
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
}

function addFriendsNames(user) {
  return [
    usersData[user.friends[0] - 1]?.name,
    usersData[user.friends[1] - 1]?.name,
    usersData[user.friends[2] - 1]?.name
  ];
}

function addNonFriends(user) {
  const nonFriends = [];
  const namesToSkip = [user.name, ...user.friendsNames];

  usersData.forEach((user) => {
    if (!namesToSkip.includes(user.name)) nonFriends.push(user.name);
  });

  return nonFriends;
}

const usersElements = usersContainer.querySelectorAll(".user");

function showUserCard() {
  const clickedUser = usersData.find((user) => user.name === this.innerText);
  const userCardContent = renderUserCard(clickedUser, friendsMentionsSorted);
  userCardContainer.innerHTML = "";
  userCardContainer.append(userCardContent);

  app.classList.add("overflow-type");
  userCardContainer.classList.add("visible");

  const arrowBack = document.querySelector(".user-card__back-arrow");
  arrowBack.addEventListener("click", hideUserCard, { once: true });
}

function hideUserCard() {
  app.classList.remove("overflow-type");
  userCardContainer.classList.remove("visible");
}

usersElements.forEach((user) => user.addEventListener("click", showUserCard));
