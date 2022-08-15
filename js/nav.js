// Function to build and populate the top nav
function buildTopNav(){
    const topNav = document.getElementById('top-nav') // Get the Top Nav element
    topNav.innerHTML = '' // Clear the Top Nav
    const pageHeader = document.getElementById('page-header').innerText
    if (pageHeader == 'HOME') return
    // GET ELEMENTS
        const anchors = document.querySelectorAll('.anchor') // Get all the anchor elements
        const anchorSubs = document.querySelectorAll('.anchor-sub') // Get all the sub-anchor elements
    // LOOPS
        // Loop through the anchor elements
        anchors.forEach(element => {
            // SET UP
                let subAnchorIDs = [] // Create a list of sub-anchor IDs
                let subAnchorHTML = [] // Create a list of sub-anchor innerHTML
                // Loop through the sub anchors to create a list of those that apply to this anchor
                anchorSubs.forEach(subAnchor => { 
                    if(subAnchor.id.includes(element.id)){ // Check to see if it contains the current anchor ID
                        subAnchorIDs.push(subAnchor.id) // Append the ID to the list of sub-anchors
                        subAnchorHTML.push(subAnchor.innerHTML) // Append its innerHTML to the list
                    }
                });
            // BUILD THE ELEMENTS
                // If there are no sub-anchors
                if (subAnchorIDs.length === 0){
                    const a = document.createElement('a') // Create a new a element
                    a.href = `#${element.id}` // Set its link
                    a.innerHTML = element.innerHTML // Set inner HTML
                    topNav.appendChild(a) // Append to the parent
                } 
                // If there are sub-anchors
                else {
                    // DROPDOWN
                        const div = document.createElement('div') // Create new div
                        div.setAttribute('class', 'dropdown') // Set its class
                        const button = document.createElement('button') // Create a new button
                        button.setAttribute('class', 'dropbtn') // Set its class
                        button.innerHTML = element.innerHTML // Set innerHTML
                        const i = document.createElement('i') // Create a new i element
                        i.setAttribute('class', 'fa fa-caret-down') // Set its class
                        i.setAttribute('style', 'padding-left: 5px;') // Set left padding
                        button.appendChild(i) // Append i to button
                        div.appendChild(button) // Append button to div
                    // DROPDOWN CONTENT
                        const div2 = document.createElement('div') // Create new div
                        div2.setAttribute('class', 'dropdown-content') // Set its class
                        // Loop throug the sub-anchors
                        for (let index = 0; index < subAnchorIDs.length; index++) {
                            const a = document.createElement('a') // Create a new a element
                            a.href = `#${subAnchorIDs[index]}` // Set its href
                            a.innerHTML = subAnchorHTML[index] // Set innerHTML
                            // a.addEventListener('click', function() { scrollTo(subAnchorIDs[index], 50) })
                            div2.appendChild(a) // Append a to div2
                        }
                        div.appendChild(div2) // Append div2 to div
                    topNav.appendChild(div) // Append div to topnav
                }
        })
}
// Function to populate the top nav
function buildSideNav() {
    let sideNavElement = document.getElementById('side-nav') // Get the side nav element
    pages.forEach(element => {
        let htmlPage = (element.NAME).replaceAll(" ", "_").toLowerCase() // Format it to pull the proper file
        // -----------
        //   Button
        // -----------
        // Button
        let button = document.createElement('button') // Create the button
        button.id = htmlPage // Set its ID
        button.classList.add('dropdown-btn') // Append the appropriate class
        // Icon
        let icon = document.createElement('i')
        icon.setAttribute('class', element.ICON)
        icon.style.marginRight = '10px'
        icon.style.textAlign = 'right'
        icon.id = `${htmlPage}-icon`
        icon.addEventListener('click', function() { buildPage(this) })
        button.appendChild(icon)
        // Inner Text
        let span = document.createElement('span')
        span.innerText = element.NAME
        span.id = htmlPage
        span.addEventListener('click', function() { 
            buildPage(this)
            try {
                var dropdownContent = document.getElementById(`${htmlPage}-dropdown-content`)
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            } catch (error) {console.error("dropdownContent error:", error)}
        })
        button.appendChild(span)
        let dropdownIcon
        // Dropdown Icon
        if (element.NAME != 'Home') {
            dropdownIcon = document.createElement('i')
            dropdownIcon.setAttribute('class', 'fa fa-caret-down')
            button.appendChild(dropdownIcon)
        }
        // Append button to the side navigation
        sideNavElement.appendChild(button)
        // --------------------
        //   Dropdown Content
        // --------------------
        // Div
        let div
        if (element.NAME != 'Home') {
            div = document.createElement('div')
            div.setAttribute('class', 'dropdown-container')
            div.id = `${htmlPage}-dropdown-content`
            // Get Anchor-subs
            let pgContent = pageContent.filter(i => i.PAGE === element.NAME)
            for (let index = 0; index < pgContent.length; index++) {
                const element = pgContent[index];
                let prevElement = ''
                if (index != 0) prevElement = pgContent[index - 1]
                if (element.ANCHOR && prevElement.ANCHOR != element.ANCHOR){
                    let a = document.createElement('a')
                    a.href = `#${element.ANCHOR}`
                    a.innerText = element.ANCHOR
                    a.id = `${htmlPage}-a`
                    a.addEventListener('click', function() { handleSubAnchorClick(this) })
                    div.appendChild(a)
                }
            }
        // Dropdown Icon Listener
            dropdownIcon.addEventListener('click', function(){
                var dropdownContent = document.getElementById(`${htmlPage}-dropdown-content`)
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            })
        }
        if (element.NAME != 'Home') sideNavElement.appendChild(div)
    });
}
// Function to handle the Anchor-sub click
function handleSubAnchorClick(element){
    const ID = (element.id).replace("-a", "") // Get the ID of the header element
    const href = (element.href).replace("#", "")
    const header = document.getElementById(`page-header`).innerText // Get the inner text of the current page
    let htmlPage = (header).replaceAll(" ", "_").toLowerCase() // Get the htmlPage for the current page
    if (htmlPage != ID) { 
        buildPage(document.getElementById(ID)) // If the current page is different from the clicked page, build it
        scrollTo(href) // Scroll to the clicked Anchor-sub
    }
}