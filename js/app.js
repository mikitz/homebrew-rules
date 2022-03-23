// Function to populate the top nav
function populateSideNav() {
    let sideNavElement = document.getElementById('side-nav') // Get the side nav element
    pages.forEach(element => {
        let htmlPage = (element.NAME).replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
            // Button
            let button = document.createElement('button') // Create the button
            button.id = htmlPage // Set its ID
            button.classList.add('dropdown-btn') // Append the appropriate class
            button.addEventListener('click', function() { populateContent(htmlPage) }) // Set a click listener
            // Icon
            let icon = document.createElement('i')
            icon.setAttribute('class', element.ICON)
            icon.style.marginRight = '5px'
            icon.style.textAlign = 'right'
            button.appendChild(icon)
            // Inner Text
            let span = document.createElement('span')
            span.innerText = element.NAME
            button.appendChild(span)
            // Append button to the side navigation
            sideNavElement.appendChild(button)
    });
}
// Function to populate the homebrew content
function populateContent(htmlPage) {
    let content = document.getElementById('content') // Get the content element that gets populated with the proper HTML
    // Active Class Toggle
    pages.forEach(element => {
        let ID = (element.NAME).replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
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