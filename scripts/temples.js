const hamburgerToggle = document.querySelector('#hamburger');
const hamburgerIcon = document.querySelector('#hamburger > div');
const nav = document.querySelector('nav');

hamburgerToggle.addEventListener('click', () => {
    if (nav.style.display !== 'block') {
        nav.style.display = 'block';
        hamburgerIcon.style.transform = 'rotate(90deg)';
        hamburgerIcon.style.width = '1em';
    } else {
        nav.style.display = 'none';
        hamburgerIcon.style.transform = 'rotate(0deg)';
    }
});