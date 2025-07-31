function print4WayTable() {
  const tableContainer = document.querySelector('.lines-box').cloneNode(true);

  // Replace all inputs with their current values
  const inputs = tableContainer.querySelectorAll('input');
  inputs.forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value || '0';
    span.style.border = '1px solid #ccc';
    span.style.padding = '4px 8px';
    span.style.display = 'inline-block';
    span.style.minWidth = '40px';
    input.parentNode.replaceChild(span, input);
  });

  // Open print window with cloned, clean table
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print 4-Way Table</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { text-align: center; }
          table { border-collapse: collapse; margin: auto; width: 100%; }
          td, th { border: 1px solid #000; padding: 6px; text-align: center; }
          .buttons { display: none; }
        </style>
      </head>
      <body>
        <h2>Lines - 4 Way</h2>
        ${tableContainer.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
const inputIds4 = [
  'housingTotal4', 'cpaTotal4', 'tpaTotal4', 'sealTotal4',
  'todayProd4',
  'housingReturn4', 'cpaReturn4', 'tpaReturn4', 'sealReturn4',
  'housingReject4', 'cpaReject4', 'tpaReject4', 'sealReject4',
  'housingWaste4', 'cpaWaste4', 'tpaWaste4', 'sealWaste4',
  'housingCurrent4', 'cpaCurrent4', 'tpaCurrent4', 'sealCurrent4'
];

inputIds4.forEach(id => {
  const el = document.getElementById(id);
  if (el && !el.readOnly) {
    el.addEventListener('input', calculateStock4);
  }
});

function calculateStock4() {
  const todayProd = parseInt(document.getElementById('todayProd4').value) || 0;

  ['housing', 'cpa', 'tpa', 'seal'].forEach(type => {
    const total = parseInt(document.getElementById(`${type}Total4`).value) || 0;
    const current = total - todayProd;
    document.getElementById(`${type}Current4`).value = current;
  });
}

function save4WayData() {
  const data = {};
  inputIds4.forEach(id => {
    data[id] = document.getElementById(id).value;
  });
  localStorage.setItem('4WayData', JSON.stringify(data));

  const timestamp = new Date().toLocaleString();
  const history = JSON.parse(localStorage.getItem('4WayHistory') || '[]');

  const historyEntry = `
#${history.length + 1} - ${timestamp}
Total Stock: H:${data.housingTotal4} C:${data.cpaTotal4} T:${data.tpaTotal4} S:${data.sealTotal4}
Current Stock: H:${data.housingCurrent4} C:${data.cpaCurrent4} T:${data.tpaCurrent4} S:${data.sealCurrent4}
Today's Prod: ${data.todayProd4}
Return: H:${data.housingReturn4} C:${data.cpaReturn4} T:${data.tpaReturn4} S:${data.sealReturn4}
Reject: H:${data.housingReject4} C:${data.cpaReject4} T:${data.tpaReject4} S:${data.sealReject4}
Waste: H:${data.housingWaste4} C:${data.cpaWaste4} T:${data.tpaWaste4} S:${data.sealWaste4}
`;

  history.push(historyEntry.trim());
  localStorage.setItem('4WayHistory', JSON.stringify(history));
}

function view4WayHistory() {
  const history = JSON.parse(localStorage.getItem('4WayHistory') || '[]');
  document.getElementById('historyModal4').textContent = history.join('\n\n');
}

function delete4WayHistory() {
  if (confirm("Are you sure you want to delete all saved history?")) {
    localStorage.removeItem('4WayHistory');
    document.getElementById('historyModal4').textContent = 'History deleted.';
  }
}

function reset4WayForm() {
  if (confirm("Reset all form inputs?")) {
    inputIds4.forEach(id => {
      const el = document.getElementById(id);
      el.value = el.readOnly ? '' : '0';
    });
    localStorage.removeItem('4WayData');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('4WayData') || '{}');
  inputIds4.forEach(id => {
    if (saved[id] !== undefined) {
      document.getElementById(id).value = saved[id];
    }
  });
  calculateStock4();
});