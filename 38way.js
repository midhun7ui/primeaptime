function calculateCurrentStock() {
  const housingTotal = parseInt(document.getElementById('housingTotal').value) || 0;
  const cpaTotal = parseInt(document.getElementById('cpaTotal').value) || 0;
  const todayProduction = parseInt(document.getElementById('todayProduction').value) || 0;

  document.getElementById('housingCurrent').value = housingTotal - todayProduction;
  document.getElementById('cpaCurrent').value = cpaTotal - todayProduction;
}

function saveData() {
  const data = {
    housingTotal: document.getElementById('housingTotal').value,
    housingCurrent: document.getElementById('housingCurrent').value,
    housingReturn: document.getElementById('housingReturn').value,
    housingRejection: document.getElementById('housingRejection').value,
    housingWastage: document.getElementById('housingWastage').value,

    cpaTotal: document.getElementById('cpaTotal').value,
    cpaCurrent: document.getElementById('cpaCurrent').value,
    cpaReturn: document.getElementById('cpaReturn').value,
    cpaRejection: document.getElementById('cpaRejection').value,
    cpaWastage: document.getElementById('cpaWastage').value,

    todayProduction: document.getElementById('todayProduction').value
  };

  localStorage.setItem('38WayData', JSON.stringify(data));

  const history = JSON.parse(localStorage.getItem('38WayHistory') || "[]");
  history.push({
    date: new Date().toLocaleString(),
    todayProduction: data.todayProduction,
    housingTotal: data.housingTotal,
    housingCurrent: data.housingCurrent,
    housingReturn: data.housingReturn,
    cpaTotal: data.cpaTotal,
    cpaCurrent: data.cpaCurrent,
    cpaReturn: data.cpaReturn
  });
  localStorage.setItem('38WayHistory', JSON.stringify(history));

  alert("Data saved.");
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('38WayData'));
  if (!data) return;

  for (let key in data) {
    const input = document.getElementById(key);
    if (input) input.value = data[key];
  }
  calculateCurrentStock();
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem('38WayHistory') || "[]");
  const historyBox = document.getElementById('historyBox');
  if (history.length === 0) {
    historyBox.textContent = "No history available.";
    return;
  }

  let content = history.map(entry => 
    `${entry.date} | Total: H:${entry.housingTotal}, C:${entry.cpaTotal} | ` +
    `Current: H:${entry.housingCurrent}, C:${entry.cpaCurrent} | ` +
    `Return: H:${entry.housingReturn}, C:${entry.cpaReturn} | Production: ${entry.todayProduction}`
  ).join('\n');

  historyBox.textContent = content;
}

function deleteHistory() {
  if (confirm("Are you sure you want to delete all history?")) {
    localStorage.removeItem('38WayHistory');
    document.getElementById('historyBox').textContent = "History cleared.";
  }
}

function printPage() {
  const dateTime = new Date().toLocaleString();
  const originalTitle = document.title;
  document.title = `38Way_Stock_${dateTime}`;
  window.print();
  document.title = originalTitle;
}

window.onload = () => {
  loadData();
  ['housingTotal', 'cpaTotal', 'todayProduction'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateCurrentStock);
  });
};
