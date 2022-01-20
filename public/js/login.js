async function loginFormHandler() {
  // Get all data using DOM to get email/password
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // Check if they all selected data have values
  if (email && password) {
      // call /api/users/log the POST route to valid login and create session
      const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
      });
      // if API call is ok, go to homepage
      if (response.ok) {
          document.location.replace('/');
      } else {
          // Else alert error
          alert(response.statusText);
      }
  }
}