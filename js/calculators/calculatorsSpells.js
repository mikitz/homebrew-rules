// Function to generate the tables
function spellExperiments(){
    // USER INPUTS
    const selectedClass = document.getElementById('class-dropdown').value // Get the selected Class
    // GET APPROPRIATE INPUTS
    if (selectedClass == 'choose') return alert("You must select a class.") // Return if no class is selected
    generateTable(selectedClass) // Generate the tables
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
// Function to get the outcome for a casting a spell of a higher level
function outcome(){
    // Inputs
    let numberOfSuccesses = parseInt(document.getElementById('number-of-successes').value) // Get the number of successes
    let numberOfFailures = parseInt(document.getElementById('number-of-failures').value) // Get the number of failures
    const spellLevel = parseInt(document.getElementById('spell-level').value) // Get the spell level that was attempted
    const outputElement = document.getElementById('right-column') // Get the output element
    let outcome // Set up our outcome element
    outputElement.innerHTML = '' // Clear the output element
    // Handle Empty Inputs
    if (!spellLevel) return alert("Please input a Spell Level.")
    if (!numberOfSuccesses) numberOfSuccesses = 0
    if (!numberOfFailures) numberOfFailures = 0
    // Compute
    const totalChecks = numberOfFailures + numberOfSuccesses // Compute the total number of checks
    const failPercent = parseFloat(numberOfFailures / (totalChecks)) * 100 // Comput the failure percentage
    if (failPercent == 0.0) outcome = `Total Success!`
    else if (failPercent == 100.0) outcome = `<b>Catastrophic Failure:</b> All creatures and objects within a radius of <i>${spellLevel * 2 * 5} feet</i> suffer <i>${fMultiRoll(spellLevel * 2, 12)} force damage</i> and 3 levels of exhaustion!`
    else if (failPercent >= 50.0) outcome = `<b>Major Failure:</b> All creatures and objects within a radius of <i>${spellLevel * 5} feet</i> suffer <i>${fMultiRoll(spellLevel, 12)} force damage</i> and 2 levels of exhaustion!`
    else if (failPercent <= 50.0) outcome = `<b>Minor Failure:</b> All creatures and objects within a radius of <i>${spellLevel * 5} feet</i> suffer <i>${fMultiRoll(spellLevel, 6)} force damage</i> and 1 level of exhaustion!`
    // Update DOM
    outputElement.innerHTML = outcome // Set the output element's innerHTML
}