// Contact form validation
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function setError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.classList.remove('show');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  setError('name', '');
  setError('email', '');
  setError('message', '');

  if (!name) {
    setError('name', 'กรุณากรอกชื่อ-นามสกุล');
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('email', 'กรุณากรอกอีเมล');
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError('email', 'รูปแบบอีเมลไม่ถูกต้อง');
    valid = false;
  }

  if (!message) {
    setError('message', 'กรุณากรอกข้อความ');
    valid = false;
  }

  if (valid) {
    successMsg.classList.add('show');
    form.reset();
  }
});

// Color Customizer
// วางไฟล์รูปสินค้าจริงไว้ที่ assets/colors/ โดยใช้ชื่อไฟล์ตรงกับ `file` ด้านล่าง
const colors = [
  { name: 'Titanium Black',       hex: '#3a3a3c', file: 'titanium-black.png' },
  { name: 'Titanium Whitesilver', hex: '#d9d7d2', file: 'titanium-whitesilver.png' },
  { name: 'Titanium Gray',        hex: '#8a8a8d', file: 'titanium-gray.png' },
  { name: 'Titanium Jadegreen',   hex: '#7a8a72', file: 'titanium-jadegreen.png' },
  { name: 'Titanium Jetblack',    hex: '#161616', file: 'titanium-jetblack.png' },
  { name: 'Titanium Pinkgold',    hex: '#d8b8a8', file: 'titanium-pinkgold.png' },
  { name: 'Titanium Silverblue',  hex: '#8fa3b3', file: 'titanium-silverblue.png' },
];

const productImage = document.getElementById('productImage');
const colorName = document.getElementById('colorName');
const palette = document.getElementById('colorPalette');
let activeColorIndex = 0;

function renderPalette() {
  colors.forEach((color, index) => {
    const swatch = document.createElement('button');
    swatch.className = 'color-swatch';
    swatch.style.background = color.hex;
    swatch.setAttribute('aria-label', color.name);
    swatch.addEventListener('click', () => selectColor(index));
    palette.appendChild(swatch);
  });
}

function selectColor(index) {
  if (index === activeColorIndex && productImage.classList.contains('visible')) return;
  activeColorIndex = index;

  [...palette.children].forEach((swatch, i) => {
    swatch.classList.toggle('active', i === index);
  });

  productImage.classList.remove('visible');
  colorName.classList.remove('visible');

  setTimeout(() => {
    const color = colors[index];
    productImage.src = 'assets/colors/' + color.file;
    productImage.alt = 'Galaxy S25 Ultra - ' + color.name;
    colorName.textContent = color.name;
    productImage.classList.add('visible');
    colorName.classList.add('visible');
  }, 350);
}

renderPalette();
palette.children[activeColorIndex].classList.add('active');
const firstColor = colors[activeColorIndex];
productImage.src = 'assets/colors/' + firstColor.file;
productImage.alt = 'Galaxy S25 Ultra - ' + firstColor.name;
colorName.textContent = firstColor.name;
requestAnimationFrame(() => {
  productImage.classList.add('visible');
  colorName.classList.add('visible');
});

// AI Live Translate Simulator
const translatePhrases = [
  { th: 'นี่คือเทคโนโลยีสมาร์ทโฟนที่ดีที่สุดของซัมซุงในปีนี้', en: "This is Samsung's best smartphone technology this year." },
  { th: 'กล้อง AI ช่วยให้ถ่ายภาพกลางคืนคมชัดยิ่งขึ้น', en: 'The AI camera helps you capture sharper night photos.' },
  { th: 'แบตเตอรี่ใช้งานได้ยาวนานตลอดทั้งวัน', en: 'The battery lasts all day long.' },
  { th: 'Galaxy AI ช่วยแปลภาษาได้แบบเรียลไทม์', en: 'Galaxy AI translates language in real time.' },
];

const translateSelect = document.getElementById('translateSelect');
const chatWindow = document.getElementById('chatWindow');
const translateBtn = document.getElementById('translateBtn');

function appendTranslateExchange(phrase) {
  const userRow = document.createElement('div');
  userRow.className = 'chat-row chat-user';
  userRow.innerHTML = '<span class="chat-sender">คุณส่ง (Thai)</span><p class="chat-bubble"></p>';
  userRow.querySelector('.chat-bubble').textContent = phrase.th;
  chatWindow.appendChild(userRow);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  translateBtn.disabled = true;
  setTimeout(() => {
    const aiRow = document.createElement('div');
    aiRow.className = 'chat-row chat-ai';
    aiRow.innerHTML = '<span class="chat-sender">Galaxy AI แปล (English) 🤖</span><p class="chat-bubble"></p>';
    aiRow.querySelector('.chat-bubble').textContent = phrase.en;
    chatWindow.appendChild(aiRow);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    translateBtn.disabled = false;
  }, 600);
}

translateBtn.addEventListener('click', () => {
  appendTranslateExchange(translatePhrases[translateSelect.value]);
});

appendTranslateExchange(translatePhrases[0]);

// AI Photo Remaster compare slider
const compareSlider = document.getElementById('compareSlider');
const compareBefore = document.getElementById('compareBefore');
const compareHandle = document.getElementById('compareHandle');
let isDraggingCompare = false;

function setComparePosition(percent) {
  percent = Math.min(100, Math.max(0, percent));
  compareBefore.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  compareHandle.style.left = percent + '%';
}

function getComparePercent(clientX) {
  const rect = compareSlider.getBoundingClientRect();
  return ((clientX - rect.left) / rect.width) * 100;
}

compareSlider.addEventListener('pointerdown', (e) => {
  isDraggingCompare = true;
  compareSlider.setPointerCapture(e.pointerId);
  setComparePosition(getComparePercent(e.clientX));
});
compareSlider.addEventListener('pointermove', (e) => {
  if (isDraggingCompare) setComparePosition(getComparePercent(e.clientX));
});
compareSlider.addEventListener('pointerup', () => { isDraggingCompare = false; });
compareSlider.addEventListener('pointercancel', () => { isDraggingCompare = false; });

setComparePosition(50);
