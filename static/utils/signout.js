async function signout() {
    const response = await fetch('/users/signout');
    const result = await response.text();
    if (result == 'done') {
        window.location.href = "/"
    }
    else {
        alert('Please Authenticate');
    }
}