// Function to build and populate the top nav
function buildTopNav(){
    // GET ELEMENTS
        const anchors = document.querySelectorAll('.anchor') // Get all the anchor elements
        const anchorSubs = document.querySelectorAll('.anchor-sub') // Get all the sub-anchor elements
        const topNav = document.getElementById('side-nav') // Get the Top Nav element
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
                            div2.appendChild(a) // Append a to div2
                        }
                        div.appendChild(div2) // Append div2 to div
                    topNav.appendChild(div) // Append div to topnav
                }
        })
    // PROFILE
        // If the current page is the profile page
        if (window.location.href.includes("profile")){
            // LOGIN
                function loginFunction(){
                    const div = document.createElement('div') // Create new div
                    div.setAttribute('class', 'dropdown right') // Set its class
                    const button = document.createElement('button') // Create a new button
                    button.setAttribute('class', 'dropbtn') // Set its class
                    button.innerHTML = 'Login' // Set innerHTML
                    button.id = 'login-button' // Set ID
                    // Set onclick
                    button.addEventListener('click', function() { 
                        var modal = document.getElementById("modal-login"); // Alert the user that they don't have enouhg funds via a modal
                        modal.style.display = "block"; // Display the modal
                        var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
                        // USER CLICKS
                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function() {
                                modal.style.display = "none";
                            }
                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function(event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }
                    })
                    div.appendChild(button) // Append button to div
                    topNav.appendChild(div) // Append div to topnav
                }
                loginFunction()
            // SIGN UP
                function signUpFunction() {
                    const div = document.createElement('div') // Create new div
                    div.setAttribute('class', 'dropdown right') // Set its class
                    const button = document.createElement('button') // Create a new button
                    button.setAttribute('class', 'dropbtn') // Set its class
                    button.innerHTML = 'Signup' // Set innerHTML
                    button.id = 'signup-button' // Set ID
                    // Set onclick
                    button.addEventListener('click', function() { 
                        var modal = document.getElementById("modal-signup"); // Alert the user that they don't have enouhg funds via a modal
                        modal.style.display = "block"; // Display the modal
                        var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
                        // USER CLICKS
                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function() {
                                modal.style.display = "none";
                            }
                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function(event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }
                    })
                    div.appendChild(button) // Append button to div
                    topNav.appendChild(div) // Append div to topnav
                }
                signUpFunction()
            // LOGOUT
                function logoutFunction() {
                    const div = document.createElement('div') // Create new div
                    div.setAttribute('class', 'dropdown right') // Set its class
                    const button = document.createElement('button') // Create a new button
                    button.setAttribute('class', 'dropbtn') // Set its class
                    button.innerHTML = 'Logout' // Set innerHTML
                    button.id = 'logout-button' // Set ID
                    div.appendChild(button) // Append button to div
                    topNav.appendChild(div) // Append div to topnav
                }
                logoutFunction()
        }
}