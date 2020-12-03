function onSignIn(googleUser) {

    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log("Email: " + profile.getEmail());

    var name = profile.getName();
    var email = profile.getEmail();
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:54321/mainhome', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send('name=' + name + '&email=' + email);
}