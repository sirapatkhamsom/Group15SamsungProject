// Register form validation (demo only — stores locally, no real backend)
const registerForm = document.getElementById('registerForm');
const registerSuccess = document.getElementById('registerSuccess');

function setRegError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  registerSuccess.classList.remove('show');

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  let valid = true;

  setRegError('regName', '');
  setRegError('regEmail', '');
  setRegError('regPassword', '');
  setRegError('regConfirm', '');

  if (!name) {
    setRegError('regName', 'กรุณากรอกชื่อ-นามสกุล');
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setRegError('regEmail', 'กรุณากรอกอีเมล');
    valid = false;
  } else if (!emailPattern.test(email)) {
    setRegError('regEmail', 'รูปแบบอีเมลไม่ถูกต้อง');
    valid = false;
  }

  if (!password) {
    setRegError('regPassword', 'กรุณากรอกรหัสผ่าน');
    valid = false;
  } else if (password.length < 6) {
    setRegError('regPassword', 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
    valid = false;
  }

  if (!confirmPassword) {
    setRegError('regConfirm', 'กรุณายืนยันรหัสผ่าน');
    valid = false;
  } else if (password !== confirmPassword) {
    setRegError('regConfirm', 'รหัสผ่านไม่ตรงกัน');
    valid = false;
  }

  if (valid) {
    const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    users.push({ name, email, registeredAt: new Date().toISOString() });
    localStorage.setItem('demoUsers', JSON.stringify(users));

    registerSuccess.classList.add('show');
    registerForm.reset();
  }
});
