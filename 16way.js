function saveAndCalculate() {
  const items = ["green", "housing", "connecter", "tpa", "retainer", "blue"];
  const prod = +document.getElementById("prod-16way").value || 0;
  localStorage.setItem("prod-16way", prod);

  const history = JSON.parse(localStorage.getItem("history-16way")) || [];

  items.forEach(item => {
    const total = +document.getElementById(`total-${item}`).value || 0;
    const rejection = +document.getElementById(`rejection-${item}`).value || 0;
    const returnVal = +document.getElementById(`return-${item}`).value || 0;
    const wastage = +document.getElementById(`wastage-${item}`).value || 0;

    const current = total - prod;
    document.getElementById(`stock-${item}`).innerText = current;

    localStorage.setItem(`item-${item}`, JSON.stringify({
      total, rejection, returnVal, wastage
    }));

    history.push({
      date: new Date().toLocaleString(),
      item, total, prod, rejection, returnVal, wastage, current
    });
  });

  localStorage.setItem("history-16way", JSON.stringify(history));
}

function loadSavedData() {
  const items = ["green", "housing", "connecter", "tpa", "retainer", "blue"];

  items.forEach(item => {
    const saved = JSON.parse(localStorage.getItem(`item-${item}`));
    if (saved) {
      document.getElementById(`total-${item}`).value = saved.total || "";
      document.getElementById(`rejection-${item}`).value = saved.rejection || "";
      document.getElementById(`return-${item}`).value = saved.returnVal || "";
      document.getElementById(`wastage-${item}`).value = saved.wastage || "";
    }
  });

  const savedProd = localStorage.getItem("prod-16way");
  if (savedProd !== null) {
    document.getElementById("prod-16way").value = savedProd;
  }

  saveAndCalculate();
}

function exportToExcel() {
  const table = document.querySelector("table");
  const html = table.outerHTML.replace(/ /g, '%20');
  const a = document.createElement('a');
  a.href = 'data:application/vnd.ms-excel,' + html;
  a.download = 'stock_table_16way.xls';
  a.click();
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem("history-16way")) || [];
  let output = `<h3>History</h3><table border="1"><tr><th>Date</th><th>Item</th><th>Total</th><th>Production</th><th>Return</th><th>Rejection</th><th>Wastage</th><th>Current</th></tr>`;
  history.forEach(entry => {
    output += `<tr>
      <td>${entry.date}</td>
      <td>${entry.item}</td>
      <td>${entry.total}</td>
      <td>${entry.prod}</td>
      <td>${entry.returnVal}</td>
      <td>${entry.rejection}</td>
      <td>${entry.wastage}</td>
      <td>${entry.current}</td>
    </tr>`;
  });
  output += `</table>`;
  document.getElementById("history-output").innerHTML = output;
}

function clearHistory() {
  localStorage.removeItem("history-16way");
  document.getElementById("history-output").innerHTML = "<p>History deleted.</p>";
}

window.onload = loadSavedData;