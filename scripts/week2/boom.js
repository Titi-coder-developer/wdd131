
// select elements from the DOM
const inputElement = document.querySelector("#favchap");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("#list");

// Create chaptersArray
let chaptersArray = getChapterList() || [];

// Display saved chapter when the page 
chaptersArray.forEach((chapter) => {
    displayList(chapter);
});

// create displayList()
function displayList(item) {
    const li = document.createElement("li");
    li.textContent = item;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", function () {
        listElement.removeChild(li);
        deleteChapter(li.textContent);
        inputElement.focus();
    });

    li.appendChild(deleteBtn);

    listElement.appendChild(li);
}
// wait for button clicks
buttonElement.addEventListener("click", function () {

    if (inputElement.value != "") {

        displayList(inputElement.value);

        chaptersArray.push(inputElement.value);

        setChapterList();

        inputElement.value = "";

        inputElement.focus();
    }

});

function setChapterList() {
    
    localStorage.setItem("myFavBOMList", JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem("myFavBOMList"));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);

    chaptersArray = chaptersArray.filter((item) => item !== chapter);

    setChapterList();
}