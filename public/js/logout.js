async function logout() {
  // call /api/users/logout the POST route to delete the session and logout
  const response = await fetch('/api/users/logout', {
      method: 'post',
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