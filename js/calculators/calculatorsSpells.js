// Function to populate the Character list
function populateCharacterDropdown(){
// Do the thing
import('/src/pages/profile/firebaseInit.js').then((init)=> {
    // Declare collection
    let db = init.db
    let getDoc = init.getDoc
    let doc = init.doc
    let auth = init.auth
    let onAuthStateChanged = init.onAuthStateChanged
    // User is logged in
    onAuthStateChanged(auth, (user) => {
        if (user){
            const selectedCharacter = localStorage.getItem('selectedCharacter') // Get the currently Selected Campaign from FireStore
            // ====================
            //    CAMPAIGN LIST
            // ====================
            const docRef = doc(db, "characters", user.uid) // Get just the doc for the current user
            getDoc(docRef).then((snapshot) => {
                // GET DATA
                    let characters = snapshot.data().characters // Get the characters object array from FireStore
                // UPDATE DOM
                    const dropdown = document.getElementById('character-list-dropdown') // Get the Campaign Dropdown
                    characters.forEach(element => { // Loop through each campaign
                        const option = document.createElement('option')
                        option.value = element // Set the value to the given campaign's name
                        option.innerText = element // Set the innerText to the given campaign's name
                        dropdown.appendChild(option) // Append the option to the dropdown
                    })
                    if (selectedCharacter){
                        dropdown.value = selectedCharacter // Set the dropdown's value to the selected campaign
                    } else {
                        dropdown.value = 'choose'
                    }
                    
            }).catch(error => {
                console.log(error)
            })
        }
    })
}).catch(error => {
    console.log(error)
}) 
}
// Function to generate the tables
function generateSpellTables(){
// USER INPUTS
    let selectedCharacter = ''
    let selectedClass = ''
    // TYPE
        var get = document.getElementsByName('get') // Get all the elements with this name
        get.forEach(element => { // Loop through each one
            if (element.checked){ get = element.value } // Set Get based on which is selected
        })
    // GET APPROPRIATE INPUTS
        if (get == 'generate'){
            selectedCharacter = document.getElementById('character-list-dropdown').value // Selected Character
            selectedClass = document.getElementById('class-dropdown').value // Get the selected Class
            if (selectedClass == 'choose'){
                alert("You must select a class.")
                return
            }
            generateTable(selectedClass) // Generate the tables
            new Toast({
                message: `${selectedCharacter}'s ${selectedClass} tables have been generated, saved, and exported! You may proceed with your arcane musings.`,
                type: 'success'
            })
        } else {
            selectedCharacter = document.getElementById('character-list-dropdown').value // Selected Character
            if (selectedCharacter == 'choose'){
                alert("Please select a character.")
                return
            }
            loadTables(selectedCharacter)
            new Toast({
                message: `${selectedCharacter}'s tables have been loaded and exported! You may proceed with your arcane musings.`,
                type: 'success'
            })
        }        
// Function to Generate Tables
function generateTable(selectedClass){
    // Filter by Class
        const spells = dbSpells.filter(i => i.CLASSES.includes(selectedClass)) // Filter the spells down to a table jsut for the selected class
    // Filter by School of Magic
        const conjuration = spells.filter(i => i.SCHOOL === 'conjuration') // Get a table of just conjuration spells
        const necromancy = spells.filter(i => i.SCHOOL === 'necromancy') // Get a table of just necromancy spells
        const evocation = spells.filter(i => i.SCHOOL === 'evocation') // Get a table of just evocation spells
        const abjuration = spells.filter(i => i.SCHOOL === 'abjuration') // Get a table of just abjuration spells
        const transmutation = spells.filter(i => i.SCHOOL === 'transmutation') // Get a table of just transmutation spells
        const divination = spells.filter(i => i.SCHOOL === 'divination') // Get a table of just divination spells
        const enchantment = spells.filter(i => i.SCHOOL === 'enchantment') // Get a table of just enchantment spells
        const illusion = spells.filter(i => i.SCHOOL === 'illusion') // Get a table of just illusion spells
    // Multiply Each Entry by 6, one for each combination
        // Create emtpy arrays to which we will push modified elements
            const conjurationMapped = []
            const necromancyMapped = []
            const evocationMapped = []
            const abjurationMapped = []
            const transmutationMapped = []
            const divinationMapped = []
            const enchantmentMapped = []
            const illusionMapped = []
            // Create a list to loop through to more cleanly create all the tables
            const schoolList = ['conjurationMapped', 'necromancyMapped', 'evocationMapped', 'abjurationMapped', 'transmutationMapped', 'divinationMapped', 'enchantmentMapped', 'illusionMapped']
        // Loop through each school's unmodified array and push modified elements to its Mapped array
        schoolList.forEach(schoolMapped => {
            const school = schoolMapped.replace("Mapped", "") // Extract just the school's name
            // console.log("School:", school)
            for (let index = 0; index < eval(school).length; index++) { // Loop through each element of the specified school
                const element = eval(school)[index]; // Get the element
                let combos = ['SVM', 'VMS', 'MSV', 'MVS', 'VSM', 'SMV'] // Define our array of combinations
                let results = ['Total Success', 'Minor Success', 'Pyrrhic Success', 'Minor Failure', 'Major Failure', 'Catastropic Failure'] // Define our array of outcomes
                for (let idx = 0; idx < 6; idx++) { // Loop through each number of copies that we need for each element
                    // VARIABLES
                        const number = index // Compute the index of the future array
                        const randCombo = randomProperty(combos) // Randomly select a combination
                        const randOutcome = randomProperty(results) // Randomly select an outcome
                        // console.log(`${number} Random Outcome (${element.NAME}):`, randOutcome)
                        // console.log(`${number} Random Combo (${element.NAME}):`, randCombo)
                    // MODIFY ARRAY
                        const outcomeIndex = results.indexOf(randOutcome) // Get the index of the OUTCOME we just added
                        results.splice(outcomeIndex, 1) // Remove that OUTCOME based on its index
                        const comboIndex = combos.indexOf(randCombo) // Get the index of the COMBINATION we just added
                        combos.splice(comboIndex, 1) // Remove that COMBINATION based on its index
                    // CREATE THE NEW ELEMENT
                        const elementModified = {
                            "NAME": element.NAME,
                            "OUTCOME": randOutcome,
                            "COMBINATION": randCombo,
                            "LEVEL": element.LEVEL,
                            "SCHOOL": element.SCHOOL,
                            "LINK": element.LINK,
                            "ID": number,
                            "DISCOVERED": false,
                            "OUTCOME_DESCRIPTION": ""
                        }
                    // APPEND TO THE ARRAY
                        eval(schoolMapped).push(elementModified) // Push the modified element to the modified array
                }
            }
            // console.log(`${school} Mapped:`, eval(schoolMapped))
            if (eval(school).length != 0){
                const output = document.createElement('div')
                output.id = school
                output.style.marginTop = '10px'
                document.getElementById('output').appendChild(output)
                displayColumns(eval(schoolMapped), 'styled-table', school)
            }
        });
        // EXPORT TABLES
        const schools = ['conjuration', 'necromancy', 'evocation', 'abjuration', 'transmutation', 'divination', 'enchantment', 'illusion']
        schools.forEach(school => {
            const csvString = [
                [ // Row Headers
                  "ID",
                  "Name",
                  "School",
                  "Level",
                  "Combination",
                  "Outcome",
                  "Outcome Description",
                  "Link",
                  "Discovered"
                ],
                ...eval(`${school}Mapped`).map(item => [ // Use the Key names in the specified array and put them in order of the above
                    `"${item.ID}"`,
                    `"${item.NAME}"`,
                    `"${item.SCHOOL}"`,
                    `"${item.LEVEL}"`,
                    `"${item.COMBINATION}"`,
                    `"${item.OUTCOME}"`,
                    `"${item.OUTCOME_DESCRIPTION}"`,
                    `"${item.LINK}"`,
                    `"${item.DISCOVERED}"`
                ])]
               .map(e => e.join(",")) 
               .join("\n");
            // EXPORT THE TABLE
            var blob = new Blob([csvString], { type : 'text/csv;charset=utf-8;'})
            const filename = `${school}.csv`
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        });
        // FIRESTORE
        import('/src/pages/profile/firebaseInit.js').then((init)=> { 
            // IMPORTS
                let db = init.db
                let auth = init.auth
                let onAuthStateChanged = init.onAuthStateChanged
                let collection = init.collection
                let addDoc = init.addDoc
            // Work with the FireStore Database
            onAuthStateChanged(auth, (user) => { // Check if User is logged in
                if (user){
                    // SET THE DATA
                    schoolList.forEach(element => {
                        const school = element.replace("Mapped", "") // Extract just the school's name
                        const collectionRef = collection(db, 'characters', user.uid, selectedCharacter, school, `${school}_table`) // Create the School's collection
                        eval(element).forEach(element => {
                            addDoc(collectionRef, element)
                        });
                    });
                    // POPULATE THE DROPDOWNS
                    populateMagicalExperimentDropdown()
                }
            })
        }).catch(error => { console.log(error) }) // Auth Errors
        
}
// Function to Load Tables
function loadTables(selectedCharacter){
    const schoolList = ['conjuration', 'necromancy', 'evocation', 'abjuration', 'transmutation', 'divination', 'enchantment', 'illusion']
    let conjuration = []
    let necromancy = []
    let evocation = []
    let abjuration = []
    let transmutation = []
    let divination = []
    let enchantment = []
    let illusion = []
    // FIRESTORE
    import('/src/pages/profile/firebaseInit.js').then((init)=> { 
        // IMPORTS
            let db = init.db
            let auth = init.auth
            let onAuthStateChanged = init.onAuthStateChanged
            let collection = init.collection
            let getDocs = init.getDocs
        // Work with the FireStore Database
        onAuthStateChanged(auth, (user) => { // Check if User is logged in
            if (user){
                schoolList.forEach(school => {
                    const collectionRef = collection(db, 'characters', user.uid, selectedCharacter, school, `${school}_table`) // Create the School's collection
                    getDocs(collectionRef).then((snapshot) => { // Get all the docs in the above collection
                        snapshot.forEach(doc => { // Loop through each doc
                            eval(school).push(doc.data()) // Push the doc's data to the appropriate array
                        });
                        const csvString = [
                            [ // Row Headers
                              "ID",
                              "Name",
                              "School",
                              "Level",
                              "Combination",
                              "Outcome",
                              "Outcome Description",
                              "Link",
                              "Discovered"
                            ],
                            ...eval(school).map(item => [ // Use the Key names in the specified array and put them in order of the above
                                `"${item.ID}"`,
                                `"${item.NAME}"`,
                                `"${item.SCHOOL}"`,
                                `"${item.LEVEL}"`,
                                `"${item.COMBINATION}"`,
                                `"${item.OUTCOME}"`,
                                `"${item.OUTCOME_DESCRIPTION}"`,
                                `"${item.LINK}"`,
                                `"${item.DISCOVERED}"`
                            ])
                          ]
                           .map(e => e.join(",")) 
                           .join("\n");
                        // EXPORT THE TABLE
                        var blob = new Blob([csvString], { type : 'text/csv;charset=utf-8;'})
                        const filename = `${selectedCharacter} - ${school}.csv`
                        if (navigator.msSaveBlob) { // IE 10+
                            navigator.msSaveBlob(blob, filename);
                        } else {
                            var link = document.createElement("a");
                            if (link.download !== undefined) { // feature detection
                                // Browsers that support HTML5 download attribute
                                var url = URL.createObjectURL(blob);
                                link.setAttribute("href", url);
                                link.setAttribute("download", filename);
                                link.style.visibility = 'hidden';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }
                        }
                    })
                });
            }
        })
    }).catch(error => { console.log(error) }) // Auth Errors
}
}
// Function to populate the Number Dropdown
function populateMagicalExperimentDropdown(){
// SCHOOL DROPDOWN
    // TODO: Only add schools for which the PC has spells. (12/22/2021)

// NUMBER DROPDOWN
    // TODO: Only add in numbers which the player may choose -- base this on the level of the PC and filter out spells that the PC cannot cast. (12/22/2021)

// COMBINATION DROPDOWN
    // TODO: Modify the combos that have been discovered based on the the school and number (12/22/2021)
}
// Function to perform a magical experiment
function performMagicalExperiement(){
// TODO: finish this! Lots of things to consider that I've forgotten (12/22/2021)
// USER INPUTS
    const school = document.getElementById('school-dropdown').value.toLowerCase()
    const number = parseInt(document.getElementById('range-dropdown').value)
    const combination = document.getElementById('combination-dropdown').value
    const selectedCharacter = document.getElementById('character-list-dropdown').value
    // Handle unselected options
    if (school == 'choose' || number == 'choose' || combination == 'choose' || selectedCharacter == 'choose') {
        alert("Please ensure you have selected a character, a school, a number, a combination, and a spell level.")
        return
    }
    console.log("School:", school)
    console.log("ID:", number)
    console.log("Combination:", combination)
    console.log("Selected Character:", selectedCharacter)
// FIRESTORE
import('/src/pages/profile/firebaseInit.js').then((init)=> { 
    // IMPORTS
        let db = init.db
        let auth = init.auth
        let onAuthStateChanged = init.onAuthStateChanged
        let collection = init.collection
        let query = init.query
        let where = init.where
        let getDocs = init.getDocs
        let doc = init.doc
        let updateDoc = init.updateDoc
    // Work with the FireStore Database
    onAuthStateChanged(auth, (user) => { // Check if User is logged in
        if (user){
            // GET DATA
                const colRef = collection(db, 'characters', user.uid, selectedCharacter, school, `${school}_table`) // Get the collection from which to query
                const querySnapshot = query(colRef, where("COMBINATION", "==", combination), where("ID", "==", number)) // Query the above collection where the comination equals the combination the user input and the number the user input
                getDocs(querySnapshot).then((snapshot) => { // Get all the docs that match
                    snapshot.forEach(docu => { // Loop through each doc
                        // GET DATA
                        const data = docu.data() // Get the doc's data
                        const ID = docu.id // Get the doc's ID
                        const outcome = data.OUTCOME // Get the doc's outcome
                        const name = data.NAME
                        const level = data.LEVEL
                        // UPDATE DOC
                        const docRef = doc(db, 'characters', user.uid, selectedCharacter, school, `${school}_table`, ID)
                        updateDoc(docRef, {
                            DISCOVERED: true
                        })
                        // UPDATE DOM
                        const output = document.getElementById('experiment-output')
                        output.innerHTML = `<b>Outcome:</b> ${outcome}<br>
                                            <b>Combination:</b> ${combination}<br>
                                            <b>Spell Name:</b> ${name}<br>
                                            <b>Spell Level:</b> ${level}<br>
                                            <b>Spell School:</b> ${school.toTitleCase()}<br>
                                            <b>Spell Number:</b> ${number}`
                    });

                }).catch(error => { console.log(error) }) // Get Docs Errors
        }
    })
}).catch(error => { console.log(error) }) // Auth Errors
}