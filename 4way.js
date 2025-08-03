// Firebase setup
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

const inputIds4 = [
  'housingTotal4', 'housingIncoming4', 'housingReturn4', 'housingReject4', 'housingCurrent4',
  'cpaTotal4', 'cpaIncoming4', 'cpaReturn4', 'cpaReject4', 'cpaCurrent4',
  'tpaTotal4', 'tpaIncoming4', 'tpaReturn4', 'tpaReject4', 'tpaCurrent4',
  'sealTotal4', 'sealIncoming4', 'sealReturn4', 'sealReject4', 'sealCurrent4',
  'todayProd4'
];

// 🧮 Calculate current stock
function calculateStock4() {
  const todayProd = parseInt(document.getElementById('todayProd4').value) || 0;
  ['housing', 'cpa', 'tpa', 'seal'].forEach(type => {
    const total = parseInt(document.getElementById(`${type}Total4`).value) || 0;
    const incoming = parseInt(document.getElementById(`${type}Incoming4`).value) || 0;
    const current = total + incoming - todayProd;
    document.getElementById(`${type}Current4`).value = current;
  });
}

// 💾 Save all data
function save4WayData() {
  const data = {};
  inputIds4.forEach(id => {
    data[id] = document.getElementById(id).value;
  });

  // Save to localStorage
  localStorage.setItem('4WayData', JSON.stringify(data));

  // Save to Firebase
  db.ref("stockData4way").set(data);

  // Save to History
  const timestamp = new Date().toLocaleString();
  const history = JSON.parse(localStorage.getItem('4WayHistory') || '[]');

  const entry = [
    `#${history.length + 1} - ${timestamp}`,
    `Total      → H: ${data.housingTotal4}, C: ${data.cpaTotal4}, T: ${data.tpaTotal4}, S: ${data.sealTotal4}`,
    `Incoming   → H: ${data.housingIncoming4}, C: ${data.cpaIncoming4}, T: ${data.tpaIncoming4}, S: ${data.sealIncoming4}`,
    `Current    → H: ${data.housingCurrent4}, C: ${data.cpaCurrent4}, T: ${data.tpaCurrent4}, S: ${data.sealCurrent4}`,
    `Return     → H: ${data.housingReturn4}, C: ${data.cpaReturn4}, T: ${data.tpaReturn4}, S: ${data.sealReturn4}`,
    `Rejection  → H: ${data.housingReject4}, C: ${data.cpaReject4}, T: ${data.tpaReject4}, S: ${data.sealReject4}`,
    `Production → ${data.todayProd4}`
  ].join('\n');

  history.push(entry);
  localStorage.setItem('4WayHistory', JSON.stringify(history));

  alert("✅ Data Saved!");

  view4WayHistory();
}

// 📜 Show history
function view4WayHistory() {
  const container = document.getElementById('historyModal4');
  const history = JSON.parse(localStorage.getItem('4WayHistory') || '[]');

  if (history.length === 0) {
    container.textContent = "⚠️ No history available.";
  } else {
    container.textContent = history.reverse().join('\n\n');
  }
}

// 🗑️ Delete history
function delete4WayHistory() {
  if (confirm("Delete all saved history?")) {
    localStorage.removeItem('4WayHistory');
    document.getElementById('historyModal4').textContent = '🗑️ History deleted.';
  }
}

// 🔄 Reset inputs
function reset4WayForm() {
  if (confirm("Reset all form inputs?")) {
    inputIds4.forEach(id => {
      const el = document.getElementById(id);
      el.value = el.readOnly ? '' : '0';
    });
    localStorage.removeItem('4WayData');
    document.getElementById('historyModal4').textContent = '';
    calculateStock4();
  }
}

// 🖨️ Print table
function print4WayTable() {
  const tableClone = document.querySelector('.lines-box').cloneNode(true);
  tableClone.querySelectorAll('input').forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value;
    input.parentNode.replaceChild(span, input);
  });

  const win = window.open('', '', 'width=800,height=600');
  win.document.write(`
    <html><head><title>Print 4-Way Stock</title>
    <style>
      body { font-family: Arial; padding: 20px; }
      h2 { text-align: center; }
      table { width: 100%; border-collapse: collapse; margin: auto; }
      td, th { border: 1px solid #000; padding: 8px; text-align: center; }
      .buttons { display: none; }
    </style>
    </head><body>
    ${tableClone.innerHTML}
    </body></html>
  `);
  win.document.close();
  win.focus();
  win.print();
  win.close();
}

// 📥 Load on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('4WayData') || '{}');
  inputIds4.forEach(id => {
    const el = document.getElementById(id);
    if (saved[id] !== undefined) el.value = saved[id];
  });

  ['housing', 'cpa', 'tpa', 'seal'].forEach(type => {
    document.getElementById(`${type}Total4`).addEventListener('input', calculateStock4);
    document.getElementById(`${type}Incoming4`).addEventListener('input', calculateStock4);
  });

  document.getElementById('todayProd4').addEventListener('input', calculateStock4);
  calculateStock4();
  view4WayHistory();
});