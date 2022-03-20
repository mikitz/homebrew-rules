const pages = ['Home', 'Ability Scores',  'Combat',  'Crafting',  'Items',  'Mechanics',  'Skills',  'Spells',  'Tools',  'World']

// Function to populate the top nav
function populateNav() {
    // ===============
    //     Top Nav
    // ===============
    let sideNavElement = document.getElementById('side-nav') // Get the side nav element
    pages.forEach(element => {
        let htmlPage = element.replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
            let a = document.createElement('button')
            a.innerText = element
            a.id = htmlPage
            a.classList.add('dropdown-btn')
            a.addEventListener('click', function() { populateContent(htmlPage) }) 
            sideNavElement.appendChild(a)
    });
}
// Function to populate the homebrew content
function populateContent(htmlPage) {
    let content = document.getElementById('content') // Get the content element that gets populated with the proper HTML
    // Active Class Toggle
    pages.forEach(element => {
        let ID = element.replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
        if ( ID == htmlPage ) {
            document.getElementById(ID).classList.add('active') // Set active class
        } else {
            document.getElementById(ID).classList.remove('active') // Set active class
        }
    });
    $(content).load(`html/${htmlPage}.html`) // Populate the innerHTML based on the selected method
}
// Function to set the listeners
function indexListeners() {
    let topNavCheckboxes = document.getElementsByName('top-nav')
    topNavCheckboxes.forEach(element => {
        element.addEventListener('change', function() { populateContent() })
    });
}