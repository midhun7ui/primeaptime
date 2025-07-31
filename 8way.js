function deleteHistory() { 
  localStorage.removeItem('8WayHistory');
  document.getElementById('history8').innerHTML = '';
  alert('📜 History cleared.');
}

function resetAll() {
  if (confirm('⚠️ Are you sure you want to reset all values and history?')) {
    localStorage.removeItem('8WayData');
    localStorage.removeItem('8WayHistory');
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    document.getElementById('history8').innerHTML = '';
    calculateStock8();
    alert('🔁 All data has been reset.');
  }
}

function save8WayData() {
  const data = {
    time: new Date().toLocaleString(),
    housingTotal: document.getElementById('housingTotal8').value,
    housingReturn: document.getElementById('housingReturn8').value,
    housingRejection: document.getElementById('housingRejection8').value,
    housingWastage: document.getElementById('housingWastage8').value,
    housingCurrent: document.getElementById('housingCurrent8').value,
    tpaTotal: document.getElementById('tpaTotal8').value,
    tpaReturn: document.getElementById('tpaReturn8').value,
    tpaRejection: document.getElementById('tpaRejection8').value,
    tpaWastage: document.getElementById('tpaWastage8').value,
    tpaCurrent: document.getElementById('tpaCurrent8').value,
    todayProduction: document.getElementById('todayProduction8').value // ✅ fixed key
  };

  // Save current data
  localStorage.setItem('8WayData', JSON.stringify(data));

  // Save to history
  const history = JSON.parse(localStorage.getItem('8WayHistory') || '[]');
  history.push(data);
  localStorage.setItem('8WayHistory', JSON.stringify(history));
}

function load8WayData() {
  const data = JSON.parse(localStorage.getItem('8WayData'));
  if (data) {
    for (const key in data) {
      const el = document.getElementById(key + '8') || document.getElementById(key);
      if (el) el.value = data[key];
    }
    calculateStock8();
  }
}

function calculateStock8() {
  const housingTotal = parseInt(document.getElementById('housingTotal8').value) || 0;
  const tpaTotal = parseInt(document.getElementById('tpaTotal8').value) || 0;
  const todayProd = parseInt(document.getElementById('todayProduction8').value) || 0;

  const housingCurrent = housingTotal - todayProd;
  const tpaCurrent = tpaTotal - (todayProd * 2);

  document.getElementById('housingCurrent8').value = housingCurrent;
  document.getElementById('tpaCurrent8').value = tpaCurrent;
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem('8WayHistory') || '[]');
  const historyDiv = document.getElementById('history8');
  historyDiv.innerHTML = history.map(entry => {
    return `
🕒 ${entry.time}
🏠 Housing - Total: ${entry.housingTotal}, Return: ${entry.housingReturn}, Rejection: ${entry.housingRejection}, Wastage: ${entry.housingWastage}, Current: ${entry.housingCurrent}
⚙️ TPA - Total: ${entry.tpaTotal}, Return: ${entry.tpaReturn}, Rejection: ${entry.tpaRejection}, Wastage: ${entry.tpaWastage}, Current: ${entry.tpaCurrent}
📦 Today's Production: ${entry.todayProduction} 
------------------------------------------
`;
  }).reverse().join('');
}

// Auto-load
window.addEventListener('load', load8WayData);

// Recalculate on input
document.addEventListener('DOMContentLoaded', () => {
  ['housingTotal8', 'tpaTotal8', 'todayProduction8'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateStock8);
  });
});