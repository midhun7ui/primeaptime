function getValue(id) {
  return parseInt(document.getElementById(id).value) || 0;
}

function setValue(id, val) {
  document.getElementById(id).value = val || 0;
}

function calculateStock14() {
  const todayProd = getValue('todayProd14');
  setValue('housingCurrent14', getValue('housingTotal14') - todayProd);
  setValue('tpaCurrent14', getValue('tpaTotal14') - todayProd);
  setValue('sealCurrent14', getValue('sealTotal14') - todayProd);
}

function save14WayData() {
  calculateStock14();

  const data = {
    housingTotal14: getValue('housingTotal14'),
    tpaTotal14: getValue('tpaTotal14'),
    sealTotal14: getValue('sealTotal14'),
    todayProd14: getValue('todayProd14'),

    housingReturn14: getValue('housingReturn14'),
    tpaReturn14: getValue('tpaReturn14'),
    sealReturn14: getValue('sealReturn14'),

    housingRejection14: getValue('housingRejection14'),
    tpaRejection14: getValue('tpaRejection14'),
    sealRejection14: getValue('sealRejection14'),

    housingWastage14: getValue('housingWastage14'),
    tpaWastage14: getValue('tpaWastage14'),
    sealWastage14: getValue('sealWastage14'),

    housingCurrent14: getValue('housingCurrent14'),
    tpaCurrent14: getValue('tpaCurrent14'),
    sealCurrent14: getValue('sealCurrent14'),

    timestamp: new Date().toLocaleString()
  };

  localStorage.setItem('14WayData', JSON.stringify(data));

  const history = JSON.parse(localStorage.getItem('14WayHistory') || '[]');
  history.push(data);
  localStorage.setItem('14WayHistory', JSON.stringify(history));
}

function load14WayData() {
  const saved = JSON.parse(localStorage.getItem('14WayData'));
  if (!saved) return;

  for (const id in saved) {
    if (document.getElementById(id)) {
      setValue(id, saved[id]);
    }
  }

  calculateStock14();
}

function show14WayHistory() {
  const history = JSON.parse(localStorage.getItem('14WayHistory') || '[]');
  const div = document.getElementById('history14');
  div.innerHTML = '<h3>History</h3>' + history.map(entry => `
    <div>
      <strong>${entry.timestamp}</strong><br>
      Housing Total: ${entry.housingTotal14}, TPA Total: ${entry.tpaTotal14}, Seal Total: ${entry.sealTotal14}<br>
      Today Prod: ${entry.todayProd14}, Return: ${entry.housingReturn14}/${entry.tpaReturn14}/${entry.sealReturn14}<br>
      Current Stock: ${entry.housingCurrent14}/${entry.tpaCurrent14}/${entry.sealCurrent14}
    </div><hr>
  `).join('');
}

function clear14WayHistory() {
  localStorage.removeItem('14WayHistory');
  document.getElementById('history14').innerHTML = '';
}

function reset14WayData() {
  localStorage.removeItem('14WayData');
  location.reload();
}

function print14WayData() {
  window.print();
}

window.addEventListener('load', () => {
  load14WayData();

  ['housingTotal14', 'tpaTotal14', 'sealTotal14', 'todayProd14'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateStock14);
  });
});
