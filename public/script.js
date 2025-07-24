document.addEventListener('DOMContentLoaded', () => {
  const apiForm = document.getElementById('apiForm');
  const userList = document.getElementById('userList');

  apiForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('apiName').value;
    const email = document.getElementById('apiEmail').value;

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name, email })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`User ${data.name} added!`);
        loadUsers();
        apiForm.reset();
      } else {
        alert(data.error || 'Submission failed.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  });

  async function loadUsers() {
    const res = await fetch('/api/users');
    const data = await res.json();
    userList.innerHTML = '';
    data.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} (${user.email})`;
      userList.appendChild(li);
    });
  }

  loadUsers();
});
