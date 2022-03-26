// Function to build each page
function buildPage(clickedElement){
    console.log("-----------------------------------------------------------------")
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
    data.forEach(element => { // Loop through the content
        console.log("**********")
        // ***************
        //     Set Up
        // ***************
        // Anchor
        let anchor
        let newAnchor
        if (element.ANCHOR) anchor = document.getElementById(element.ANCHOR) // Get the anchor from the DOM
        if (!anchor && element.ANCHOR) {
            anchor = document.createElement('h2') // If there is no anchor, create it
            anchor.setAttribute('class', 'anchor')
            anchor.innerText = element.ANCHOR
            anchor.id = element.ANCHOR
            newAnchor = true
        }
        // Sub-anchor
        let subAnchor
        let newSubAnchor
        if (element.ANCHOR_SUB) subAnchor = document.getElementById(`${element.ANCHOR_SUB}-${element.ANCHOR}`)
        if (!subAnchor && element.ANCHOR_SUB) {
            subAnchor = document.createElement('h3')
            subAnchor.setAttribute('class', 'anchor-sub')
            subAnchor.innerText = element.ANCHOR_SUB
            subAnchor.id = `${element.ANCHOR_SUB}-${element.ANCHOR}`
            newSubAnchor = true
        }
        // Sub-sub-anchor
        let subSubAnchor
        let newSubSubAnchor
        if (element.ANCHOR_SUB_2) subSubAnchor = document.getElementById(element.ANCHOR_SUB_2)
        if (!subSubAnchor && element.ANCHOR_SUB_2) {
            subSubAnchor = document.createElement('h4')
            subSubAnchor.setAttribute('class', 'anchor-sub-sub')
            subSubAnchor.innerText = element.ANCHOR_SUB_2
            subSubAnchor.id = element.ANCHOR_SUB_2
            newSubSubAnchor = true
        }
        // InnerHTML
        let paragraphContent
        if (element.INNER_HTML) paragraphContent = document.getElementById(element.INNER_HTML)
        if (!paragraphContent && element.INNER_HTML) {
            paragraphContent = document.createElement('p')
            paragraphContent.innerHTML = element.INNER_HTML
            paragraphContent.id = `${element.ANCHOR}-innerHTML`
        }
        // Table(s)
        let tables = element.TABLES
        if (tables) {
            tables = (element.TABLES).split(", ")
        }
        // ***************
        //  Append to DOM
        // ***************
        // New Nodes
        if (newAnchor) contentDiv.appendChild(anchor) // Append the newly created Anchor if one was created
        if (newSubAnchor) contentDiv.appendChild(subAnchor) // Append the newly created Anchor-sub if one was created
        if (newSubSubAnchor) contentDiv.appendChild(subSubAnchor) // Append the newly created Anchor-sub-sub if one was created
        // Paragraph Content
        if (element.ANCHOR_SUB_2 && paragraphContent) insertAfter(subSubAnchor, paragraphContent) // Insert the paragraph content after the Anchor-sub-sub
        else if (element.ANCHOR_SUB && paragraphContent) insertAfter(subAnchor, paragraphContent) // Insert the paragraph content after the Anchor-sub
        else if (element.ANCHOR && paragraphContent) insertAfter(anchor, paragraphContent) // Insert the paragraph content after the Anchor
        // Table(s)

    });
    
    // buildTopNav() // Bulid the top nav for the page
}