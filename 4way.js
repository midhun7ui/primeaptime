import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqnhWsCm-h2hVViW2zKFCnK6_iC-j9DeE",
  authDomain: "aptiv-stock-holder.firebaseapp.com",
  projectId: "aptiv-stock-holder",
  storageBucket: "aptiv-stock-holder.firebasestorage.app",
  messagingSenderId: "706055335339",
  appId: "1:706055335339:web:e64c0697b2aa08516c76ee",
  measurementId: "G-GQDNDYZRND",
  databaseURL: "https://aptiv-stock-holder-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const inputIds4 = [
  'housingTotal4', 'housingIncoming4', 'housingReturn4', 'housingReject4', 'housingCurrent4',
  'cpaTotal4', 'cpaIncoming4', 'cpaReturn4', 'cpaReject4', 'cpaCurrent4',
  'tpaTotal4', 'tpaIncoming4', 'tpaReturn4', 'tpaReject4', 'tpaCurrent4',
  'sealTotal4', 'sealIncoming4', 'sealReturn4', 'sealReject4', 'sealCurrent4',
  'todayProd4'
];

window.calculateStock4 = function () {
  const todayProd = parseInt(document.getElementById('todayProd4').value) || 0;
  ['housing', 'cpa', 'tpa', 'seal'].forEach(type => {
    const total = parseInt(document.getElementById(`${type}Total4`).value) || 0;
    const incoming = parseInt(document.getElementById(`${type}Incoming4`).value) || 0;
    const current = total + incoming - todayProd;
    document.getElementById(`${type}Current4`).value = current;
  });
};

window.save4WayData = function () {
  const data = {};
  inputIds4.forEach(id => {
    data[id] = document.getElementById(id).value;
  });

  localStorage.setItem('4WayData', JSON.stringify(data));
  set(ref(db, "stockData4way"), data)
  .then(() => console.log("✅ Firebase write success"))
  .catch(err => console.error("❌ Firebase write failed:", err));
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
};

window.view4WayHistory = function () {
  const container = document.getElementById('historyModal4');
  const history = JSON.parse(localStorage.getItem('4WayHistory') || '[]');
  container.textContent = history.length === 0 ? "⚠️ No history available." : history.slice().reverse().join('\n\n');
};

window.delete4WayHistory = function () {
  if (confirm("Delete all saved history?")) {
    localStorage.removeItem('4WayHistory');
    document.getElementById('historyModal4').textContent = '🗑️ History deleted.';
  }
};

window.reset4WayForm = function () {
  if (confirm("Reset all form inputs?")) {
    inputIds4.forEach(id => {
      const el = document.getElementById(id);
      el.value = el.readOnly ? '' : '0';
    });
    localStorage.removeItem('4WayData');
    document.getElementById('historyModal4').textContent = '';
    calculateStock4();
  }
};

window.print4WayTable = function () {
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
};

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

