// ✅ Firebase Init
const firebaseConfig = {
  apiKey: "AIzaSyAH6RdsXd6WUJRJlzSjrH0kpclmQ4tP4",
  authDomain: "prime-aptiv.firebaseapp.com",
  projectId: "prime-aptiv",
  storageBucket: "prime-aptiv.appspot.com",
  messagingSenderId: "540333723166",
  appId: "1:540333723166:web:d07a8489be82b55a2b280f",
  measurementId: "G-T9LZQ9YF6T",
  databaseURL: "https://prime-aptiv-default-rtdb.firebaseio.com"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ Calculation
function calculateStock8() {
  const tp = +document.getElementById("todayProduction8").value || 0;

  const hTotal = +document.getElementById("housingTotal8").value || 0;
  const hIncoming = +document.getElementById("housingIncoming8").value || 0;
  document.getElementById("housingCurrent8").value = hTotal + hIncoming - tp;

  const tTotal = +document.getElementById("tpaTotal8").value || 0;
  const tIncoming = +document.getElementById("tpaIncoming8").value || 0;
  document.getElementById("tpaCurrent8").value = tTotal + tIncoming - 2 * tp;
}

// ✅ Save to LocalStorage + Firebase + History
function save8WayData() {
  calculateStock8();

  const data = {
    time: new Date().toLocaleString(),

    housingTotal8: document.getElementById("housingTotal8").value,
    housingIncoming8: document.getElementById("housingIncoming8").value,
    housingReturn8: document.getElementById("housingReturn8").value,
    housingRejection8: document.getElementById("housingRejection8").value,
    housingCurrent8: document.getElementById("housingCurrent8").value,

    tpaTotal8: document.getElementById("tpaTotal8").value,
    tpaIncoming8: document.getElementById("tpaIncoming8").value,
    tpaReturn8: document.getElementById("tpaReturn8").value,
    tpaRejection8: document.getElementById("tpaRejection8").value,
    tpaCurrent8: document.getElementById("tpaCurrent8").value,

    todayProduction8: document.getElementById("todayProduction8").value
  };

  localStorage.setItem("8WayData", JSON.stringify(data));
  const history = JSON.parse(localStorage.getItem("8WayHistory") || "[]");
  history.push(data);
  localStorage.setItem("8WayHistory", JSON.stringify(history));

  db.ref("stockData8way").push(data);

  alert("✅ Saved to Firebase + LocalStorage + History");
}

// ✅ Load from LocalStorage
function load8WayData() {
  const data = JSON.parse(localStorage.getItem("8WayData"));
  if (!data) return;
  for (const key in data) {
    const el = document.getElementById(key);
    if (el) el.value = data[key];
  }
  calculateStock8();
}

// ✅ Show History
function showHistory() {
  const history = JSON.parse(localStorage.getItem("8WayHistory") || "[]");
  const div = document.getElementById("history8");
  if (history.length === 0) {
    div.textContent = "No history available.";
    return;
  }
  div.innerHTML = history.map(entry => `
🕒 ${entry.time}
🏠 Housing ➜ Total: ${entry.housingTotal8}, Incoming: ${entry.housingIncoming8}, Return: ${entry.housingReturn8}, Rejection: ${entry.housingRejection8}, Current: ${entry.housingCurrent8}
⚙️ TPA ➜ Total: ${entry.tpaTotal8}, Incoming: ${entry.tpaIncoming8}, Return: ${entry.tpaReturn8}, Rejection: ${entry.tpaRejection8}, Current: ${entry.tpaCurrent8}
📦 Today's Production: ${entry.todayProduction8}
----------------------------------
  `).reverse().join('');
}

// ✅ Delete History
function deleteHistory() {
  if (confirm("Delete all local history?")) {
    localStorage.removeItem("8WayHistory");
    document.getElementById("history8").textContent = "🗑️ History deleted.";
  }
}

// ✅ Reset All
function resetAll() {
  if (confirm("Reset all values and localStorage?")) {
    localStorage.removeItem("8WayData");
    localStorage.removeItem("8WayHistory");
    document.querySelectorAll("input").forEach(input => input.value = "0");
    document.getElementById("history8").textContent = "";
    calculateStock8();
  }
}

// ✅ Auto-run on page load
window.addEventListener("load", () => {
  load8WayData();
  document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("input", calculateStock8);
  });
});