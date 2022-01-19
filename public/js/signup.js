async function signupFormHandler() {
    const first = document.querySelector('#firstName').value.trim();
    const last = document.querySelector('#lastName').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
<<<<<<< HEAD
    console.log(email, password);
    if (first && last && email && password) {
=======
    if (first && last && username && email && password) {
>>>>>>> main
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

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}