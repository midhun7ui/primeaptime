function calculateStock1() {
  const housingTotal = +document.getElementById('housingTotal1').value || 0;
  const leverTotal = +document.getElementById('leverTotal1').value || 0;
  const todayProd = +document.getElementById('todayProd1').value || 0;

  const housingCurrent = housingTotal - todayProd;
  const leverCurrent = leverTotal - todayProd;

  document.getElementById('housingCurrent1').value = housingCurrent;
  document.getElementById('leverCurrent1').value = leverCurrent;
}

function calculateStock2() {
  const housingTotal = +document.getElementById('housingTotal2').value || 0;
  const leverTotal = +document.getElementById('leverTotal2').value || 0;
  const todayProd = +document.getElementById('todayProd2').value || 0;

  const housingCurrent = housingTotal - todayProd;
  const leverCurrent = leverTotal - todayProd;

  document.getElementById('housingCurrent2').value = housingCurrent;
  document.getElementById('leverCurrent2').value = leverCurrent;
}

function saveTable1() {
  const data = {
    housingTotal: +document.getElementById('housingTotal1').value || 0,
    leverTotal: +document.getElementById('leverTotal1').value || 0,
    todayProd: +document.getElementById('todayProd1').value || 0,
    return: +document.getElementById('return1').value || 0,
    rejection: +document.getElementById('rejection1').value || 0,
    wastage: +document.getElementById('wastage1').value || 0,
    housingCurrent: +document.getElementById('housingCurrent1').value || 0,
    leverCurrent: +document.getElementById('leverCurrent1').value || 0,
    timestamp: new Date().toLocaleString()
  };
  localStorage.setItem('table1', JSON.stringify(data));

  let history = JSON.parse(localStorage.getItem('table1History')) || [];
  history.push(data);
  localStorage.setItem('table1History', JSON.stringify(history));
  alert('Data saved for 13707581');
}

function saveTable2() {
  const data = {
    housingTotal: +document.getElementById('housingTotal2').value || 0,
    leverTotal: +document.getElementById('leverTotal2').value || 0,
    todayProd: +document.getElementById('todayProd2').value || 0,
    return: +document.getElementById('return2').value || 0,
    rejection: +document.getElementById('rejection2').value || 0,
    wastage: +document.getElementById('wastage2').value || 0,
    housingCurrent: +document.getElementById('housingCurrent2').value || 0,
    leverCurrent: +document.getElementById('leverCurrent2').value || 0,
    timestamp: new Date().toLocaleString()
  };
  localStorage.setItem('table2', JSON.stringify(data));

  let history = JSON.parse(localStorage.getItem('table2History')) || [];
  history.push(data);
  localStorage.setItem('table2History', JSON.stringify(history));
  alert('Data saved for 13707967');
}

function showHistory(id) {
  const history = JSON.parse(localStorage.getItem(id)) || [];
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = history.map((entry, i) => `
    #${i + 1} [${entry.timestamp}]
    Total Stock: H:${entry.housingTotal}, L:${entry.leverTotal}
    Today Prod: ${entry.todayProd}, Return: ${entry.return}
    Rejection: ${entry.rejection}, Wastage: ${entry.wastage}
    Current Stock: H:${entry.housingCurrent}, L:${entry.leverCurrent}
  `).join('\n\n');
}

window.onload = () => {
  const table1 = JSON.parse(localStorage.getItem('table1'));
  const table2 = JSON.parse(localStorage.getItem('table2'));

  if (table1) {
    document.getElementById('housingTotal1').value = table1.housingTotal;
    document.getElementById('leverTotal1').value = table1.leverTotal;
    document.getElementById('todayProd1').value = table1.todayProd;
    document.getElementById('return1').value = table1.return;
    document.getElementById('rejection1').value = table1.rejection;
    document.getElementById('wastage1').value = table1.wastage;
    document.getElementById('housingCurrent1').value = table1.housingCurrent;
    document.getElementById('leverCurrent1').value = table1.leverCurrent;
  }

  if (table2) {
    document.getElementById('housingTotal2').value = table2.housingTotal;
    document.getElementById('leverTotal2').value = table2.leverTotal;
    document.getElementById('todayProd2').value = table2.todayProd;
    document.getElementById('return2').value = table2.return;
    document.getElementById('rejection2').value = table2.rejection;
    document.getElementById('wastage2').value = table2.wastage;
    document.getElementById('housingCurrent2').value = table2.housingCurrent;
    document.getElementById('leverCurrent2').value = table2.leverCurrent;
  }
};