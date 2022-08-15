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
        const elementTest = clickedElement.id
        if (elementTest) {
            if ((clickedElement.id).includes("-icon")) ID = (clickedElement.id).replace("-icon", "").replaceAll("_", " ")
            else ID = clickedElement.id // Grab the ID from the clicked element
            title = clickedElement.innerText // Grab the innerText, which is the page title, from the clicked element
            if (!title) title = ID.toTitleCase()
        }
        else {
            ID = clickedElement.replaceAll("_", " ")
            title = ID.toTitleCase()
        }
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
    h1.id = `page-header` // Set the ID
    h1.setAttribute('class', 'page-heading') // Set the H1 class to anchor
    contentDiv.appendChild(h1) // Append it to the page
    // The Content
    const data = pageContent.filter(i => i.PAGE === title)
    data.forEach(element => { // Loop through the content
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
        let tableDiv
        if (tables) {
            tables = (element.TABLES).split(", ")
            tableDiv = document.createElement('div')
            tableDiv.id = `${anchor}-${subAnchor}-${subSubAnchor}-tables`
            tableDiv.setAttribute('class', 'table-right-column')
        }
        // Calculator
        let calculator = element.CALC
        let calcIcon
        if (calculator) {
            // Calculator Icon
            calcIcon = document.createElement('i')
            calcIcon.setAttribute('class', "fa-solid fa-calculator fa-sm")
            calcIcon.addEventListener('click', function() { showCalculatorDialog(this.parentElement) })
            // subAnchor.append(calcIcon)
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
        // Calculator
        if (element.ANCHOR_SUB_2 && calculator) subSubAnchor.append(calcIcon) // Insert the calculator icon content after the Anchor-sub-sub
        else if (element.ANCHOR_SUB && calculator) subAnchor.append(calcIcon) // Insert the calculator icon content after the Anchor-sub
        else if (element.ANCHOR && calculator) anchor.append(calcIcon) // Insert the calculator icon content after the Anchor
        // Table(s)
        if (tables) {
            for (let index = 0; index < tables.length; index++) {
                // Set up
                const element = tables[index]; // Define an element object
                if (element == 'TBD') continue // Skip this table if it is "TBD"
                let tablename = camelize(element.replaceAll("&", "and")) // Camelize the Table Name to look it up in data.js
                // Table Header

                let copyIcon = document.createElement('i')
                copyIcon.setAttribute('class', 'fa-solid fa-copy')

                let h4 = document.createElement('h4')
                h4.innerText = `${element} Table`
                h4.setAttribute('class', 'table-header')
                // h4.classList.add('rotating')

                let dropdownIcon = document.createElement('i')
                dropdownIcon.setAttribute('class', 'fa fa-caret-down')
                dropdownIcon.style.paddingLeft = '15px'
                // dropdownIcon.classList.add('rotating')
                h4.appendChild(dropdownIcon)
                // h4.appendChild(copyIcon)
                // Appending to the DOM
                contentDiv.appendChild(h4) // Append the Table Name Header
                buildTable(tablename, 'styled-table') // Append the Table
                // Listener
                let theTable = document.getElementById(`${tablename}-table`)
                theTable.style.display = 'none'
                h4.addEventListener('click', function() {
                    if (theTable.style.display === "block") {
                        theTable.style.display = "none";
                    } else {
                        theTable.style.display = "block";
                    }
                })
                copyIcon.addEventListener('click', function() { selectElementContents(theTable) })
                // applyDataTable(`${tablename}-table`); // Format the table to be a DataTable
            }
        }
    });
    buildTopNav() // Build the Top Nav
    console.log("🚀 ~ file: app.js ~ line 165 ~ buildPage ~ ID", ID)
    if (ID != 'home') {
        const url = window.location
        const parser = new URL(url || window.location);
        parser.searchParams.set('page', ID);
        window.history.pushState(ID, "", parser.href)
        const hash = getHashFromURL(window.location)
        if (hash) {
            const urlWithHashRemoved = url.href.replace(hash, "")
            window.history.pushState(ID, "", urlWithHashRemoved)
        }
    } else {
        const url = window.location
        const parser = new URL(url || window.location);
        parser.searchParams.set('page', 'home');
        window.history.pushState(ID, "", parser.href)
    }
}
// Function to set up the calculator dialog
function showCalculatorDialog(element) {
    function findRow(ID){
        let data = pageContent.find(i => i.ANCHOR_SUB_2 == ID)
        if (data) return data
        data = pageContent.find(i => i.ANCHOR_SUB == ID)
        if (data) return data
        data = pageContent.find(i => i.ANCHOR == ID)
        return data
    }
    document.getElementById('right-column').innerHTML = ''
    document.getElementById('modal-form').innerHTML = ''
    // ====================
    //   Set Up the Modal
    // ====================
    let ID = (element.innerText).replace(/-\w+/gm, "").replace(/-\w+\s\w+/gm, "")
    if (ID.toUpperCase() === ID) ID = ID.toTitleCase() // Format the ID
    if (ID == 'Running A Business') ID = 'Running a Business'
    console.log("ID:", ID)
    const idCamel = camelize(ID) // Convert the ID into camel case
    const modal = document.getElementById('calc-modal') // Get the modal element
    const closeModal = document.getElementById('close-modal') // Get the upper-right X
    closeModal.addEventListener('click', function() { modal.style.display = 'none' }) // Let the X in the upper-right corner close the modal
    window.onclick = function(event) { if (event.target == modal) modal.style.display = 'none' } // Make the modal close if the user clicks outside of it
    modal.style.display = 'block' // Display the Modal
    let modalForm = document.getElementById('modal-form')
    // ============
    //   Get Data
    // ============
    const data = findRow(ID) // Get the row from the table where this is in a cell
    const calculator = data.CALC // Get the calculator function name
    // const inputs = (data.INPUTS).split(", ") // Get the inputs needed for the function as a list
    const inputs = JSON.parse(data.INPUTS)
    // ==============
    //   Update DOM
    // ==============
    document.getElementById('calc-title').innerText = `${ID} Calculator` // Set the Title
    inputs.forEach(element => { // Loop through the Inputs
        let htmlID = IDify(element.NAME) // Convert the element into an  HTML ID

        let label = document.createElement('label')
        label.innerText = (element.NAME).toTitleCase()
        label.for = htmlID

        const type = element.TYPE
        let input
        if (type == 'number') {
            input = document.createElement('input') // Set up the Input element
            input.id = htmlID // Set its ID
            input.placeholder = (element.NAME).toTitleCase() // Add in the place holder
            input.type = 'number'
        }
        if (type == 'select') {
            input = document.createElement('select') // Create the select element
            input.id = htmlID // Set its ID
            const options = ((element.OPTIONS).replace("[", "").replace("]", "").replaceAll("'", "")).split(",")
            options.forEach(element => {
                let option = document.createElement('option')
                option.innerText = element
                option.value = element
                input.appendChild(option)
            });
        }
        if (type == 'text') {
            input = document.createElement('input') // Set up the Input element
            input.id = htmlID // Set its ID
            input.placeholder = (element.NAME).toTitleCase() // Add in the place holder
            input.type = 'text'
        }

        modalForm.appendChild(label) // Add a Label
        modalForm.innerHTML += '<br>' // Add a line break
        modalForm.appendChild(input) // Append to the form
        modalForm.innerHTML += '<br>' // Add a line break
    })
    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Calculate'
    submit.addEventListener('click', function(e) { 
        e.preventDefault()
        eval(calculator)
    })
    submit.addEventListener('keypress', function(e) { 
        if(e.key === 13) eval(calculator)
    })
    modalForm.innerHTML += '<br>' // Add a line break
    modalForm.appendChild(submit)
    // ===============
    //   Special DOM
    // ===============
    // If the modal is for calculating level distribution
    if (ID == 'Demographics Calculator') { 
        // Add "Save Location" Button
        const submit = document.createElement('button')
        submit.value = 'Save Location'
        submit.innerText = 'Save Location'
        submit.addEventListener('click', function(e) { 
            e.preventDefault()
            saveLocation()
            eval(calculator)
        })
        modalForm.appendChild(submit)
        // Update DOM
        document.getElementById('location').addEventListener('change', function () { setInputsBasedOnSelectedLocation() })
        setCityDropdown() // Set up the City Dropddown
    }
    // If the modal is for the business roll
    if (ID == 'Running a Business') { 
        // Add "Save Business" Button
        const submit = document.createElement('button')
        submit.value = 'Save Business'
        submit.innerText = 'Save Business'
        submit.addEventListener('click', function(e) { 
            e.preventDefault()
            saveBusiness()
            eval(calculator)
        })
        modalForm.appendChild(submit)
        // Add a Profit Share Employees div
        const div = document.createElement('div')
        div.id = 'profit-share-employees-html'
        insertAfter(document.getElementById('number-of-profit-share-employees'), div) // Insert the div before the buttons
        // Update DOM
        document.getElementById('number-of-profit-share-employees').addEventListener('input', function() { populateProfitShare() })
        document.getElementById('business').addEventListener('change', function() { changeBusinessInputsBasedOnSelectedBusiness() })
        populateBusinessDropdown() // Set up the business dropdown
    }
    // If the modal is for XP Calculator
    if (ID == 'Xp Calculator') {
        // Add the creature div
        const div = document.createElement('div')
        div.id = 'creatures'
        insertAfter(document.getElementById('number-of-different-CRs-in-the-encounter'), div)
        document.getElementById('number-of-different-CRs-in-the-encounter').addEventListener('input', function() { popCreatureInputs() })
    }
}
// Function to return the page name from the URL
function getPageNameFromURL(url) {
    const parser = new URL(url || window.location);
    return parser.searchParams.get('page')
}
// Function to return the hash from the URL
function getHashFromURL(url) {
    const HREF = url.href
    if (HREF.includes('#')) {
        const hashIndex = HREF.indexOf('#', -1)
        const urlLength = HREF.length
        return HREF.slice(hashIndex, urlLength)
    }
}