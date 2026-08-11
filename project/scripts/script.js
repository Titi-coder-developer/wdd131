// ==========================
// LUBRICANT PRODUCTS ARRAY
// ==========================

const lubricants = [
    {
        name: "Kapper P25",
        image: "images/Kaper-Oil.webp",
        description: "Premium engine oil designed to provide excellent engine performance and protection."
    },

    {
        name: "Oleum SL",
        image: "images/oleumSl.webp",
        description: "High-quality engine oil formulated for smooth engine operation and longer engine life."
    },

    {
        name: "Motorcycle Oil P1",
        image: "images/mobilecycleoil.webp",
        description: "Specially formulated motorcycle oil for reliable engine protection and smooth performance."
    },

    {
        name: "Dextron III P4",
        image: "images/dexronIII.webp",
        description: "High-performance automatic transmission fluid for smooth gear operation and protection."
    },

    {
        name: "Dextron II P4",
        image: "images/dexron II.webp",
        description: "Quality transmission fluid designed for reliable performance and smooth operation."
    },

    {
        name: "SAE 5W/40",
        image: "images/SAE-5W40_1L-4L.webp",
        description: "Quality engine oil that provides excellent wear protection and dependable engine performance."
    },

    {
        name: "AFT",
        image: "images/aft.webp",
        description: "High-quality fluid formulated for reliable equipment performance and protection."
    },

    {
        name: "Hydraulic Oil",
        image: "images/Hydraulic-e5.webp",
        description: "Reliable hydraulic oil for efficient system performance and equipment durability."
    },

    {
        name: "Oil Filter",
        image: "images/filter.webp",
        description: "Quality filters designed to help keep engines clean and support longer equipment life."
    }
];


// ==========================
// DISPLAY LUBRICANT PRODUCTS
// ==========================
const lubricantContainer = document.querySelector("#lubricant-products");

function displayProduct(product) {
    const article = document.createElement("article");

    article.classList.add("product-item");

    article.innerHTML = `
        <img src="${product.image}" loading="lazy" alt="${product.name}">

        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        </div>
    `;

    lubricantContainer.appendChild(article);
}

if (lubricantContainer) {
    lubricants.forEach(displayProduct);
}

// ==========================
// CONTACT FORM
// ==========================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (name === "" || email === "" || subject === "" || message === "") {

            alert("Please complete all the required fields.");

        } else {

            const contactMessage = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            localStorage.setItem(
                "contactMessage",
                JSON.stringify(contactMessage)
            );

            alert(`Thank you, ${name}! Your message has been received.`);

            contactForm.reset();
        }
    });
}