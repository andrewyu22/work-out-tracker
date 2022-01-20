async function signupFormHandler() {
    // Get all data using DOM to get first/last/username/email/password
    const first = document.querySelector('#firstName').value.trim();
    const last = document.querySelector('#lastName').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // Check if they all selected data have values
    if (first && last && username && email && password) {
        // call /api/users/ the POST route to create a new User
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name: first,
                last_name: last,
                username,
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