export default function renderUser(name) {
  const template = document.querySelector('.user');

  const user = template.cloneNode(true)
  user.querySelector('p').textContent = name
  
  return user;
}
