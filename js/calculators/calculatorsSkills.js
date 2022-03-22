// Function to calculate how many training success the user needs
function calculateTrainingHours(){
    // Get the skill level
    var a = document.getElementById('skill')
    var skillLevel = a.options[a.selectedIndex].text
    // Get the ability score mod.
    var abilityMod = parseInt(document.getElementById('ability').value)
    // Get the int. mod.
    var intMod = parseInt(document.getElementById('int').value)
    // Determine number of starting hours and the DC
    if (skillLevel == 'Proficiency') {
        var hoursStart = 100
        var DC = 15
    } else {
        var hoursStart = 200
        var DC = 20
    }
    // Calculate the total successful traning hours needed
    var hoursFinal = hoursStart - ((abilityMod * 10) + (intMod * 10))
    // Assemble the message
    var vMessage = `<h2>Output</h2>
                Successful Hours Needed: ${hoursFinal}<br>
                DC: ${DC}`
    // Populate the element
    document.getElementById('output_successes').innerHTML = vMessage
}
// Function to roll any give number of training hours
function trainingRoller(){
    // Get the skill level
    const skillLevel = document.getElementById('skill1').value
    // Campaign Name
    const campaignName = localStorage.getItem('selectedCampaign')
    // Note
    const note = document.getElementById('note').value
    // Get proficiency bonus
    if (skillLevel == 'expertise') {
        var prof = parseInt(document.getElementById('prof').value)
    } else {
        var prof = 0
    }
    // Get the ability score mod.
    var abilityMod = parseInt(document.getElementById('ability1').value)
    // Get the number of hours
    var hours = parseInt(document.getElementById('hours').value)
    // Determine number of starting hours and the DC
    if (skillLevel == 'proficiency') {
        var DC = 15
    } else {
        var DC = 20
    }
    // Log it
    // console.log(`INPUT VARS
    //             Skill Level: ${skillLevel}
    //             Ability Mod: ${abilityMod}
    //             Proficiency: ${prof}
    //             Hours: ${hours}
    //             DC: ${DC}`)
    // Roll the dice
        // Define the lists
        var [nat1s, nat20s, successes, failures, rolls, checks]  = [[], [], [], [], [], []]
        // Loop through each hour to roll a die
        for (x = 0; x < hours; x++) {
            var roll = getRndInteger(1, 20)
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
            check = roll + prof + abilityMod
            if (check >= DC) {
                successes.push(check)
                checks.push(check)
                continue
            } else {
                failures.push(check)
            }
            checks.push(check)
        }
        // Log the lists
        // console.log(`-----ROLLS-----`)
        // console.log(rolls)
        // console.log(`-----NAT 1s-----`)
        // console.log(nat1s)
        // console.log(`-----NAT 20s-----`)
        // console.log(nat20s)
        // console.log(`-----CHECKS-----`)
        // console.log(checks)
        // console.log(`-----SUCCESSES-----`)
        // console.log(successes)
        // console.log(`-----FAILURES-----`)
        // console.log(failures)
    // Calculate total successes
    var successesFinal = (successes.length + (nat20s.length * 2)) - nat1s.length
    // Build the message
    var vMessage = `<h2>Output</h2>
                    Nat 20s: ${nat20s.length}<br>
                    Nat 1s: ${nat1s.length}<br>
                    Successes: ${successes.length}<br>
                    Failures: ${failures.length}<br>
                    <b>Total Successes: ${successesFinal}</b>`
    // Populate the element
    document.getElementById('output_rolls').innerHTML = vMessage
    // APPEND TO THE DB
    if (campaignName){
        // FIRESTORE
        import('/src/pages/profile/firebaseInit.js').then((init)=> { 
            // IMPORTS
                let db = init.db
                let auth = init.auth
                let onAuthStateChanged = init.onAuthStateChanged
                let addDoc = init.addDoc
                let collection = init.collection
            // Work with the FireStore Database
            onAuthStateChanged(auth, (user) => { // Check if User is logged in
                if (user){
                    // UPDATE DATA
                    var date = new Date(); // Instantiate a new Date objectzsz
                    const today = date.toLocaleDateString() // Today's date
                    // Set up the NPC object
                    var npcObj = {"skill-level-desired": skillLevel,
                                            "DC": DC,
                                            "ability-mod": abilityMod,
                                            "prof-bonus": prof,
                                            "hours": hours,
                                            "outcome": vMessage,
                                            "note": note,
                                            "date": today}
                    // SET THE DATA
                    addDoc(collection(db, `campaigns`, user.uid, campaignName, `training`, 'training_history'), npcObj)
                }
            })
        }).catch(error => { console.log(error) }) // Auth Errors
    }
}