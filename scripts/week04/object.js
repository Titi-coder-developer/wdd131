//Step 1: Create the course object
let aCourse = {
    code: "WDD131",
    title: "Dynamic Web Fundamentals",
    credits: 2,
    //Step 2: Add the sections array
    sections: [
        {
            sectionNumber: "001",
            enrolled: 95,
            instructor: "Roberto Diaz Rodriguez"
        },
        
        {
            sectionNumber: "002",
            enrolled: 80,
            instructor: "Sarah Gobble"
        }
    ]
};

//Step 3: Display the course name
function setCourseInformation(course) {
    document.querySelector("#courseName").innerHTML = `${course.code} - ${course.title}`;
}

// Step 4: Display the section
function renderSections(course) {
    const tbody = document.querySelector("#sections tbody");
    let rows = "";
    for (const section of course.sections) {
        rows += `<tr>
      <td>${section.sectionNumber}</td>
      <td>${section.enrolled}</td>
      <td>${section.instructor}</td>
    </tr>`
    }
    tbody.innerHTML = rows;
}



setCourseInformation(aCourse);
renderSections(aCourse);
