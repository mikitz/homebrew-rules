// Function to calculate how many training success the user needs
function calculateTrainingHours(skillLevel, intelligenceModifier, abilityModifier){
    let hoursStart // Declare the hoursStart object
    if (skillLevel == 'Proficiency') hoursStart = 100 // Set to 100 if Skill Level is Proficiency
    else if (skillLevel == 'Expertise') hoursStart = 200 // Set to 200 if Skill Level is Expertise
    const hoursFinal = hoursStart - ((abilityModifier * 10) + (intelligenceModifier * 10)) // Calculate the total successful traning hours needed
    return hoursFinal // Return those hours
}
// Function to roll any give number of training hours for Proficiency
function trainingProficiency(){
    // INPUTS
    let currentSuccesses = parseInt(document.getElementById('current-successes').value) // Get the number of current successes
    const abilityMod = parseInt(document.getElementById('ability-score-modifier').value) // Get the ability modifier
    const numHours = parseInt(document.getElementById('number-of-hours-used-for-training').value) // Get the number of hours
    const intMod = parseInt(document.getElementById('intelligence-modifier').value) // Get the intelligence modifier
    const outputElement = document.getElementById('right-column') // Get the outpu element
    const successesNeeded = calculateTrainingHours('Proficiency', intMod, abilityMod)
    outputElement.innerHTML = '' // Clear the output element
    let check // Declare a variable for the check
    const DC = 15 // Set the DC for proficiency
    // ROLL DICE
    var [nat1s, nat20s, successes, failures, rolls, checks]  = [[], [], [], [], [], []] // Define our lists
    for (x = 0; x < numHours; x++) { // Loop through each hour to roll a die
        let roll = getRndInteger(1, 20)
        // Check for nat1s and nat20s
        if (roll == 1) {
            nat1s.push(roll)
            rolls.push(roll)
            continue
        } else if (roll == 20) {
            nat20s.push(roll)
            rolls.push(roll)
            continue
        }
        rolls.push(roll)
        // Add modifiers to determine success and fail
        check = roll + abilityMod
        if (check >= DC) {
            successes.push(check)
            checks.push(check)
            continue
        } else {
            failures.push(check)
        }
        checks.push(check)
    }
    // COMPUTE
    const successesFinal = (successes.length + (nat20s.length * 2)) - nat1s.length // Calculate total successes
    const remainingSuccesses = successesNeeded - currentSuccesses - successesFinal
    currentSuccesses = currentSuccesses + successesFinal
    // Populate the element
    outputElement.innerHTML = `<h3>Output</h3>
                                <b>Nat 20s:</b> ${nat20s.length}<br>
                                <b>Nat 1s:</b> ${nat1s.length}<br>
                                <b>Successes:</b> ${successes.length}<br>
                                <b>Failures:</b> ${failures.length}<br>
                                <b>Total Successes:</b> ${successesFinal}<br>
                                <b>Remaining Successes:</b> ${remainingSuccesses}<br>
                                <b>Current Successes:</b> ${currentSuccesses}<br>
                                <i>If <b>Remaining Successes</b> is a negative integer, the absolute value of it may be added back to <b>Training Hours</b> and used again.</i>`
}
// Function to roll any give number of training hours for Proficiency
function trainingExpertise(){
    // INPUTS
    let currentSuccesses = parseInt(document.getElementById('current-successes').value) // Get the number of current successes
    const abilityMod = parseInt(document.getElementById('ability-score-modifier').value) // Get the ability modifier
    const numHours = parseInt(document.getElementById('number-of-hours-used-for-training').value) // Get the number of hours
    const intMod = parseInt(document.getElementById('intelligence-modifier').value) // Get the intelligence modifier
    const outputElement = document.getElementById('right-column') // Get the outpu element
    const successesNeeded = calculateTrainingHours('Expertise', intMod, abilityMod)
    outputElement.innerHTML = '' // Clear the output element
    let check // Declare a variable for the check
    const DC = 20 // Set the DC for proficiency
    // ROLL DICE
    var [nat1s, nat20s, successes, failures, rolls, checks]  = [[], [], [], [], [], []] // Define our lists
    for (x = 0; x < numHours; x++) { // Loop through each hour to roll a die
        let roll = getRndInteger(1, 20)
        // Check for nat1s and nat20s
        if (roll == 1) {
            nat1s.push(roll)
            rolls.push(roll)
            continue
        } else if (roll == 20) {
            nat20s.push(roll)
            rolls.push(roll)
            continue
        }
        rolls.push(roll)
        // Add modifiers to determine success and fail
        check = roll + abilityMod
        if (check >= DC) {
            successes.push(check)
            checks.push(check)
            continue
        } else {
            failures.push(check)
        }
        checks.push(check)
    }
    // COMPUTE
    const successesFinal = (successes.length + (nat20s.length * 2)) - nat1s.length // Calculate total successes
    const remainingSuccesses = successesNeeded - currentSuccesses - successesFinal
    currentSuccesses = currentSuccesses + successesFinal
    // Populate the element
    outputElement.innerHTML = `<h3>Output</h3>
                                <b>Nat 20s:</b> ${nat20s.length}<br>
                                <b>Nat 1s:</b> ${nat1s.length}<br>
                                <b>Successes:</b> ${successes.length}<br>
                                <b>Failures:</b> ${failures.length}<br>
                                <b>Total Successes:</b> ${successesFinal}<br>
                                <b>Remaining Successes:</b> ${remainingSuccesses}<br>
                                <b>Current Successes:</b> ${currentSuccesses}<br>
                                <i>If <b>Remaining Successes</b> is a negative integer, the absolute value of it may be added back to <b>Training Hours</b> and used again.</i>`
}