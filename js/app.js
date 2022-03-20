const pages = ['Home', 'Ability Scores',  'Combat',  'Crafting',  'Items',  'Mechanics',  'Skills',  'Spells',  'Spells',  'Tools',  'World']

// Function to populate the top nav
function populateNav() {
    // ===============
    //     Top Nav
    // ===============
    let sideNavElement = document.getElementById('side-nav') // Get the side nav element
    pages.forEach(element => {
        let htmlPage = element.replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
        if (htmlPage == 'home') {
            let a = document.createElement('a')
            a.innerText = element
            a.id = element
        } else {
            // Dropdown Button
            let button = document.createElement('button')
            button.classList.add('dropdown-btn')
            button.innerHTML = `${element} <i class="fa fa-caret-down"></i>`
            sideNavElement.appendChild(button)
                // Div
                let div = document.createElement('div')
                div.classList.add('dropdown-container')
                    // Inner Elements
            sideNavElement.appendChild(div)
        }   
    });
    // ===============
    //     Top Nav
    // ===============
    // let topNavElement = document.getElementById('top-nav') // Get the top nav element
    // pages.forEach(element => { // Loop through each page
    //     let htmlPage = element.replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
    //     // Label
    //     let label = document.createElement('label') // Create the label
    //     label.id = `${htmlPage}-label`
    //     // Input
    //     let input = document.createElement('input')
    //     input.classList.add('checkbox')
    //     input.type = 'radio'
    //     input.name = 'top-nav'
    //     input.id = htmlPage
    //     input.value = htmlPage
    //     if (element == 'Home') { input.checked = true }
    //     label.appendChild(input)
    //     // Span
    //     let span = document.createElement('span')
    //     span.innerText = element
    //     label.appendChild(span)
    //     topNavElement.appendChild(label)
    // });
}
// Function to populate the homebrew content
function populateContent() {
    document.getElementById('nav_top').innerHTML = '' // Clear the local nav
    let category = getSelectedValueFromRadioGroup('top-nav') // Get the selected homebrew category
    category = category.replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
    let content = document.getElementById('content') // Get the content element that gets populated with the proper HTML
    $(content).load(`html/${category}.html`) // Populate the innerHTML based on the selected method
}
// Function to set the listeners
function indexListeners() {
    let topNavCheckboxes = document.getElementsByName('top-nav')
    topNavCheckboxes.forEach(element => {
        element.addEventListener('change', function() { populateContent() })
    });
}