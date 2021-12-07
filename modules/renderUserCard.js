export default function renderUserCard(
  { name, friendsNames, nonFriends },
  usersMentions
) {
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const nonFriendsList = [];

  (function getRandomNonFriends() {
    if (nonFriendsList.length === 3) return nonFriendsList;

    const lastIndex = nonFriends.length - 1;
    const randomNonFriend = nonFriends[randomInteger(0, lastIndex)];

    if (!nonFriendsList.includes(randomNonFriend))
      nonFriendsList.push(randomNonFriend);

    getRandomNonFriends();
  })();

  const popularFriendsList = [];

  (function getPopularFriends() {
    if (popularFriendsList.length === 3) return popularFriendsList;
    Object.keys(usersMentions).forEach((user) => {
      if (user !== name) popularFriendsList.push(user);
    });
  })();

  const template = document.querySelector('.user-card');
  const userCard = template.cloneNode(true)
  userCard.hidden = false

  userCard.querySelector('#name').textContent = name

  userCard.querySelector('#firstFriend').
    textContent = friendsNames[0] || 'fallback'
  userCard.querySelector('#secondFriend').
    textContent = friendsNames[1] || 'fallback'
  userCard.querySelector('#thirdFriend').
    textContent = friendsNames[2] || 'fallback'
  
  userCard.querySelector('#firstNonFriend').
    textContent = nonFriendsList[0] || 'fallback'
  userCard.querySelector('#secondNonFriend').
    textContent = nonFriendsList[1] || 'fallback'
  userCard.querySelector('#thirdNonFriend').
    textContent = nonFriendsList[2] || 'fallback'
  
  userCard.querySelector('#firstPopularPerson').
    textContent = popularFriendsList[0] || 'fallback'
  userCard.querySelector('#secondPopularPerson').
    textContent = popularFriendsList[1] || 'fallback'
  userCard.querySelector('#thirdPopularPerson').
    textContent = popularFriendsList[2] || 'fallback'
  
  return userCard;
}
