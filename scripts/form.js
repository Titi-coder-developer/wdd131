const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Populate product dropdown
const productSelect = document.getElementById("product");

if (productSelect) {
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Review counter
const currentPage = window.location.pathname;

let reviews = Number(localStorage.getItem("reviews")) || 0;

if (currentPage.includes("review.html")) {
    reviews++;
    localStorage.setItem("reviews", reviews);
}

const reviewCount = document.getElementById("reviewCount");

if (reviewCount) {
    reviewCount.textContent = reviews;
}

// Footer
const currentYear = document.getElementById("currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const modified = document.getElementById("modified");

if (modified) {
    modified.textContent = "Last Modification: " + document.lastModified;
}