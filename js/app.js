// Function to populate the top nav
function populateSideNav() {
    let sideNavElement = document.getElementById('side-nav') // Get the side nav element
    pages.forEach(element => {
        let htmlPage = (element.NAME).replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
            // Button
            let button = document.createElement('button') // Create the button
            button.id = htmlPage // Set its ID
            button.classList.add('dropdown-btn') // Append the appropriate class
            button.addEventListener('click', function() { buildPage(this) })
            // Icon
            let icon = document.createElement('i')
            icon.setAttribute('class', element.ICON)
            icon.style.marginRight = '10px'
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
// Function to build each page
function buildPage(clickedElement){
    // ================
    //     Setup
    // ================
    let ID
    let title
    let contentDiv = document.getElementById('content') // Get the content element
    contentDiv.innerHTML = '' // Clear it to prepare for the new page
    // Check if it's Home
    if (!clickedElement) {
        ID = 'home'
        title = 'Home'
    } else {
        ID = clickedElement.id // Grab the ID from the clicked element
        title = clickedElement.innerText // Grab the innerText, which is the page title, from the clicked element
    }
    // Active Page
    pages.forEach(element => {
        let pageID = (element.NAME).replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
        if ( ID == pageID ) { document.getElementById(pageID).classList.add('active') } // Set active class 
        else { document.getElementById(pageID).classList.remove('active') } // Set active class
    });
    // ================
    //     The Page
    // ================
    // Header 1
    let h1 = document.createElement('h1') // Create a new H1 element
    h1.innerText = title // Set the H1 innerText to the page title
    h1.setAttribute('class', 'page-heading') // Set the H1 class to anchor
    contentDiv.appendChild(h1) // Append it to the page
    // The Content
    const data = pageContent.filter(i => i.PAGE === title)
    console.log("Data:", data)
    data.forEach(element => { // Loop through the content
        // Anchor
        let anchor
        if (element.ANCHOR) anchor = document.getElementById(element.ANCHOR) // Get the anchor from the DOM
        if (!anchor && element.ANCHOR) {
            anchor = document.createElement('h2') // If there is no anchor, create it
            anchor.setAttribute('class', 'anchor')
            anchor.innerText = element.ANCHOR
        }
        // Sub-anchor
        let subAnchor
        if (element.ANCHOR_SUB) subAnchor = document.getElementById(element.ANCHOR_SUB)
        if (!subAnchor && element.ANCHOR_SUB) {
            subAnchor = document.createElement('h3')
            subAnchor.setAttribute('class', 'anchor-sub')
            subAnchor.innerText = element.ANCHOR_SUB
        }
        // Sub-sub-anchor
        let subSubAnchor
        if (element.ANCHOR_SUB_2) subSubAnchor = document.getElementById(element.ANCHOR_SUB_2)
        if (!subAnchor && element.ANCHOR_SUB_2) {
            subSubAnchor = document.createElement('h4')
            subSubAnchor.setAttribute('class', 'anchor-sub-sub')
            subSubAnchor.innerText = element.ANCHOR_SUB_2
        }
        // InnerHTML
        let paragraphContent
        if (element.INNER_HTML) paragraphContent = document.getElementById(element.INNER_HTML)
        if (!paragraphContent && element.INNER_HTML) {
            paragraphContent = document.createElement('p')
            paragraphContent.innerHTML = element.INNER_HTML
        }
        // Append to the appropraiate anchor
        if (element.ANCHOR_SUB_2) { 
            subAnchor.appendChild(subSubAnchor)
        }
        else if (element.ANCHOR_SUB) {
            anchor.appendChild(subAnchor)
        }
        else if (element.ANCHOR) {
            contentDiv.appendChild(anchor)
        }
        contentDiv.appendChild(paragraphContent)
    });

    buildTopNav() // Bulid the top nav for the page
}