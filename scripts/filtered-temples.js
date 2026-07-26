//Creates a Date object containing today's date and time
const today = new Date();

//Gets only the current year (for example, 2026).
const year = today.getFullYear();

document.getElementById("currentyear").innerHTML = year;

document.getElementById("modified").innerHTML = document.lastModified;

// Array of Temple Object

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Barranquilla Colombia Temple",
        location: "Barranquilla, Atlantico Colombia",
        dedicated: "9, December 2018",
        area: 25349,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/barranquilla-colombia-temple/barranquilla-colombia-temple-1846-main.jpg"

    },
    {
        templeName: "Accra Ghana Temple",
        location: "Accra Ghana",
        dedicated: " 11 January 2004",
        area: 17500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
    },
    {
        templeName: "Abidjan Ivory Coast Temple",
        location: "Abidjan Cote d'Ivoire",
        dedicated: " 25, May 2025",
        area: 17362,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/abidjan-ivory-coast-temple/abidjan-ivory-coast-temple-58993-main.jpg"
    }
];

// Display the temple card
const templesContainer = document.querySelector("#temples")

// defining a function
function displayTemples(temple) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = temple.templeName;
    
    const location = document.createElement("p");
    location.textContent = `Location: ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;

    const area = document.createElement("p");
    area.textContent = `Size: ${temple.area} sq ft`;
   
    figure.appendChild(figcaption);
    figure.appendChild(location);
    figure.appendChild(dedicated);
    figure.appendChild(area);
    figure.appendChild(img);

    templesContainer.appendChild(figure);
}


const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

//Listen for a click
menuButton.addEventListener('click', function () {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open')
});

// navigation bar
const homeLink = document.querySelector("#home");
const oldLink = document.querySelector("#old");
const newLink = document.querySelector("#new");
const largeLink = document.querySelector("#large");
const smallLink = document.querySelector("#small");

oldLink.addEventListener("click", function () {
    templesContainer.innerHTML = "";

    // Filter old temples here
    const oldTemples = temples.filter(function (temple) {
        const year = temple.dedicated.split(",")[0];

        return year < 1900;
        
    });
    // Display old temples here

    oldTemples.forEach(displayTemples);
});

newLink.addEventListener("click", function () {
    templesContainer.innerHTML = "";

    // Filter old temples here
    const newTemples = temples.filter(function (temple) {
        const year = temple.dedicated.split(",")[0];

        return year > 2000;

    });
    // Display old temples here

    newTemples.forEach(displayTemples);
});

largeLink.addEventListener("click", function () {
    templesContainer.innerHTML = "";

    const largeTemples = temples.filter(function (temple) {
    
       return temple.area > 90000;

    });
    // Display old temples here

    largeTemples.forEach(displayTemples);
});

smallLink.addEventListener("click", function () {
    templesContainer.innerHTML = "";

    const smallTemples = temples.filter(function (temple) {

        return temple.area < 10000;

    });
    // Display old temples here

    smallTemples.forEach(displayTemples);

});

homeLink.addEventListener("click", function () {
    templesContainer.innerHTML = "";

    // Display all temples here

    temples.forEach(displayTemples);

});


temples.forEach(displayTemples);
