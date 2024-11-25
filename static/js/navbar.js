// Funkce pro toggle navbaru (otevření/zavření)
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('navbarToggler').addEventListener('click', function() {
        var navbarNav = document.getElementById('navbarNav');
        navbarNav.classList.toggle('show'); // Toggle třídy 'show' pro mobilní navbar
    });
});