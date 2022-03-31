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
// Function to populate the Number Dropdown
function populateMagicalExperimentDropdown(){
// SCHOOL DROPDOWN
    // TODO: Only add schools for which the PC has spells. (12/22/2021)

// NUMBER DROPDOWN
    // TODO: Only add in numbers which the player may choose -- base this on the level of the PC and filter out spells that the PC cannot cast. (12/22/2021)

// COMBINATION DROPDOWN
    // TODO: Modify the combos that have been discovered based on the the school and number (12/22/2021)
}