// ==========================
// MOBILE MENU
// ==========================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });
}


// ==========================
// CURRENT YEAR
// ==========================

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==========================
// LAST MODIFIED
// ==========================

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}