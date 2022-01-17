async function loginFormHandler() {
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
      console.log("IN THIS FUNCTION;");
      const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
          document.location.replace('/');
      } else {
          alert(response.statusText);
      }
  }
}