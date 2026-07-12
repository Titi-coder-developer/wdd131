//Creates a Date object containing today's date and time
const today = new Date();

//Gets only the current year (for example, 2026).
const year = today.getFullYear();

document.getElementById("currentyear").innerHTML = year;

document.getElementById("modified").innerHTML = document.lastModified;



const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

//Listen for a click
menuButton.addEventListener('click', function () {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open')
});