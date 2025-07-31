
const navbarToggle = document.querySelector('.navbar-togle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

function confirmSelection() {
  const way = document.getElementById("way").value;

  switch (way) {
    case "16way":
      window.location.href = "16way.html";
      break;
    case "52way":
      window.location.href = "52way.html";
      break;
    case "38way":
      window.location.href = "38way.html";
      break;
    case "14way":
      window.location.href = "14way.html";
      break;
    case "8way":
      window.location.href = "8way.html";
      break;
    case "4way":
      window.location.href = "4way.html";
      break;
    default:
      alert("Invalid selection!");
  }
}