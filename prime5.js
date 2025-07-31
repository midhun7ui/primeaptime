let isEditing = false;
const countDisplay = document.getElementById('count');
const countInput = document.getElementById('countInput');

// Load saved count on page load
window.onload = () => {
  const savedCount = localStorage.getItem('countValue');
  if (savedCount !== null) {
    countDisplay.textContent = savedCount;
  }
};

// Toggle edit/save and auto-save count
function toggleEdit(button) {
  if (!isEditing) {
    countInput.value = countDisplay.textContent;
    countDisplay.style.display = 'none';
    countInput.style.display = 'inline-block';
    button.textContent = 'Save';
  } else {
    const newValue = parseInt(countInput.value);
    if (!isNaN(newValue)) {
      countDisplay.textContent = newValue;
      localStorage.setItem('countValue', newValue); // ✅ Auto-save here
    }
    countDisplay.style.display = 'block';
    countInput.style.display = 'none';
    button.textContent = 'Edit';
  }
  isEditing = !isEditing;
}

// Drag functionality
let isDragging = false;
let offsetX, offsetY;

function startDrag(e) {
  const box = document.getElementById('countBox');
  isDragging = true;
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;

  document.onmousemove = dragBox;
  document.onmouseup = stopDrag;
}

function dragBox(e) {
  if (!isDragging) return;
  const box = document.getElementById('countBox');
  box.style.position = 'absolute';
  box.style.top = `${e.clientY - offsetY}px`;
  box.style.left = `${e.clientX - offsetX}px`;
}

function stopDrag() {
  isDragging = false;
  document.onmousemove = null;
  document.onmouseup = null;
}