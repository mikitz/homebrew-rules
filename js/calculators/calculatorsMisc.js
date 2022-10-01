// ====================
//     D&D Specific
// ====================
// Function to calculate the number of creatures needed to defeat/kill for a party of x size to reach y level
function howManyCreaturesToAnyLevel(){
    // Get the CR
    var b = document.getElementById("creature-CR")
    var CR = b.options[b.selectedIndex].text
    // Get the Desired Level
    var a = document.getElementById("desired-level")
    var level = a.options[a.selectedIndex].text
    // Get the number of party memebers
    var party = parseInt(document.getElementById("number-of-party-members").value)
    // Pull the XP per creature based on the cr
    var cXP = XP_by_CR.find(i => i.CR == CR).XP
    // Pull the XP needed for the given level
    var nXP = beyond_1st_level.find(c => c.level == level).XP
    // Compute the total number of creatures
    var nrCreatures = (nXP / cXP) * party
    var rCreatures = Math.ceil(nrCreatures).toLocaleString()
    // Build the message
    var vMessage = `With <b>${party} party members</b>, you (and your group) will have to kill <b>${rCreatures} CR ${CR}</b> creatures in order to reach <b>level ${level}</b>.`
    document.getElementById('right-column').innerHTML = vMessage
}
// Function to populate the dom with creature inputs
function popCreatureInputs(){
    // USER INPUTS
        // Number of Creature Types
        let quantity = parseInt(document.getElementById('number-of-different-CRs-in-the-encounter').value)
        if (quantity > 20){
            quantity = 20
        }
        // Creatures Div
        const creaturesDiv = document.getElementById('creatures')
            // Clear the div
            creaturesDiv.innerHTML = ''
    // LOOP THROUGH QUANTITY
    for (let index = 1; index < quantity + 1; index++) {
        // NEW ELEMENT
            // Creature div
                // Create it
                const div = document.createElement('div')
                // Set ID
                div.id = `creature-${index}-div`
                // Set innerHTML
                div.innerHTML = `<div><b>Creature ${index}</b></div>
                <label for="creature${index}-cr">CR:</label>
                <select name="creature${index}-cr" id="creature${index}-cr">
                    <option value="0">0</option>
                    <option value="0.125">1/8</option>
                    <option value="0.25">1/4</option>
                    <option value="0.5">1/2</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
            </select><br>
            <label for="creature-${index}-quantity">Quantity:</label>
                <input type="number" id="creature-${index}-quantity" name="creature-${index}-quantity">`
        // PUSH TO DOM
            // Push it to the creatures div
            creaturesDiv.appendChild(div)
    }
}
// Function to add XP
function xpCalculator(){
    // Get selected campaign
    const campaignName = localStorage.getItem('selectedCampaign')
    // USER INPUTS
        // Number of Creatures
        var quantity = parseInt(document.getElementById('number-of-different-CRs-in-the-encounter').value)
        if (quantity > 20){
            quantity = 20
        }
        // Total XP
        let totalXP = 0
        // Total Creatures
        let totalCreatures = 0
        // Party Level
        const partyLevel = localStorage.getItem(`${campaignName}.party-level`)
        // Party Size
        const partySize = parseInt(document.getElementById('party-size').value)
    // LOOP THROUGH QUANTITY
    for (let index = 1; index < quantity + 1; index++) {
        // USER INPUTS
            // CR
            const cr = parseFloat(document.getElementById(`creature${index}-cr`).value)
            console.log(`Creature ${index} CR:`, cr)
            // Quantity
            const creatureQuantity = parseInt(document.getElementById(`creature-${index}-quantity`).value)
            console.log(`Creature ${index} Quantity:`, creatureQuantity)
        // DATABASE PULL
            // Creature XP
            const xp = monsterStats.find(n => n.CR_NUMBER === cr).XP
            console.log(`CREATURE ${index} XP:`, xp)
        // COMPUTE
            // Total XP for this creature
            const creatureTotalXP = xp * creatureQuantity
            console.log(`CREATURE ${index} TOTAL XP:`, creatureTotalXP)
            // Add creature total XP to total XP
            totalXP += creatureTotalXP
            // Add creature quantity to total creatures
            totalCreatures += creatureQuantity
    }
    console.log("TOTAL XP:", totalXP)
    // COMPUTE
        // Total XP per character in the party
        const totalPCxp = Math.round(totalXP / partySize)
        console.log("XP per PC:", totalPCxp)
    // PUSH TO DOM
        // Clear the element
        document.getElementById('right-column').innerHTML = ''
        // Set its innerHTML
        document.getElementById('right-column').innerHTML = `<h2>Output</h2>
                                                    <b>Creatures Defeated:</b> ${totalCreatures}<br>
                                                    <b>Total XP:</b> ${totalXP.toLocaleString()}<br>
                                                    <b>Party Size:</b> ${partySize}<br>
                                                    <b>Total XP per PC:</b> ${totalPCxp.toLocaleString()}`
}
// Function to roll any given number of checksPC
function rollMultipleChecks(){
    // USER INPUTS
        // Prof. Bonus
        var prof = parseInt(document.getElementById('PC-proficiency-bonus').value)
        // Ability Mod.
        var abilityMod = parseInt(document.getElementById('PC-ability-score-modifier').value)
        // Quantity
        var quantity = parseInt(document.getElementById('quantity').value)
        // DC
        var DC = parseInt(document.getElementById('difficulty-class').value)
    // Roll the dice
        // Define the lists
        var [nat1sPC, nat20sPC, successesPC, failuresPC, rollsPC, checksPC]  = [[], [], [], [], [], []]
        // Loop through each hour to roll a die
        for (x = 0; x < quantity; x++) {
            var roll = getRndInteger(1, 20)
            // Check for nat1sPC and nat20sPC
            if (roll == 1) {
                nat1sPC.push(roll)
                rollsPC.push(roll)
                continue
            } else if (roll == 20) {
                nat20sPC.push(roll)
                rollsPC.push(roll)
                continue
            }
            rollsPC.push(roll)
            // Add modifiers to determine success and fail
            check = roll + prof + abilityMod
            if (check >= DC) {
                successesPC.push(check)
                checksPC.push(check)
                continue
            } else {
                failuresPC.push(check)
            }
            checksPC.push(check)
        }
        // Log the lists
        console.log("Rolls:", rollsPC)
        console.log("Nat 1s:", nat1sPC)
        console.log("Nat 20s:", nat20sPC)
        console.log("Checks:", checksPC)
        console.log("Successes:", successesPC)
        console.log("Failures:", failuresPC)
    // Calculate total successesPC
    var successesFinal = (successesPC.length + (nat20sPC.length * 2)) - nat1sPC.length
    // Build the message
    var vMessage = `<h2>Output</h2>
                    Nat 20s: ${nat20sPC.length}<br>
                    Nat 1s: ${nat1sPC.length}<br>
                    Successes: ${successesPC.length}<br>
                    Failures: ${failuresPC.length}<br>
                    <b>Total Successes: ${successesFinal}</b>`
    // Populate the element
    document.getElementById('right-column').innerHTML = vMessage
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
                    var npcObj = {"number-of-rolls": quantity,
                                            "DC": DC,
                                            "PC-ability-mod": abilityMod,
                                            "PC-prof-bonus": prof,
                                            "outcome": document.getElementById('output_rolls').innerHTML,
                                            "note": note,
                                            "date": today}
                    // SET THE DATA
                    addDoc(collection(db, `campaigns`, user.uid, campaignName, `multiple_checks`, 'multiple_checks_history'), npcObj)
                }
            })
        }).catch(error => { console.log(error) }) // Auth Errors
    }
}
// Function to roll any given number of opposed checksPC
function rollMultipleOpposedChecks(){
    // USER INPUTS
        // GENERAL
            // Quantity
            var quantity = parseInt(document.getElementById('quantity').value)
        // PLAYER CHARACTER
            // Prof. Bonus
            var profPC = parseInt(document.getElementById('PC-ability-score-modifier').value)
            // Ability Mod.
            var abilityModPC = parseInt(document.getElementById('PC-proficiency-bonus').value)
        // NON-PLAYER CHARACTER
            // Prof. Bonus
            var profNPC = parseInt(document.getElementById('NPC-proficiency-bonus').value)
            // Ability Mod.
            var abilityModNPC = parseInt(document.getElementById('NPC-ability-score-modifier').value)
    // Define the lists
        // PLAYER CHARACTER
        var [nat1sPC, nat20sPC, successesPC, failuresPC, rollsPC, checksPC]  = [[], [], [], [], [], []]
        // NON-PLAYER CHARACTER
        var [nat1sNPC, nat20sNPC, successesNPC, failuresNPC, rollsNPC, checksNPC]  = [[], [], [], [], [], []]
    // Loop through the quantities
    for (x = 0; x < quantity; x++) {
        // Roll the d20s
        var rPC = getRndInteger(1, 20)
        var rNPC = getRndInteger(1, 20)
        // ADD MODIFIERS
            // Player Character
            var checkPC = rPC + profPC + abilityModPC
            // Non-player Character 
            var checkNPC = rNPC + profNPC + abilityModNPC
        // SUCCESSES
            // PC Success
            if (checkPC >= checkNPC){
                successesPC.push(checkPC)
            }
            // NPC Success
            else {
                successesNPC.push(checkNPC)
            }
    }
    // Log the lists
    console.log("PC Successes:", successesPC)
    console.log("NPC Successes:", successesNPC)
    // Calculate total successesPC
    var successesFinal = (successesPC.length + (nat20sPC.length * 2)) - nat1sPC.length
    // Build the message
    var vMessage = `<h2>Output</h2>
                    PC Successes: ${successesPC.length}<br>
                    NPC Successes: ${successesNPC.length}<br>`
    // Populate the element
    document.getElementById('right-column').innerHTML = vMessage
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
                    var npcObj = {"number-of-rolls": quantity,
                                            "DC": DC,
                                            "PC-ability-mod": abilityMod,
                                            "PC-prof-bonus": prof,
                                            "outcome": document.getElementById('output_rolls').innerHTML,
                                            "note": note,
                                            "date": today}
                    // SET THE DATA
                    addDoc(collection(db, `campaigns`, user.uid, campaignName, `multiple_opposed_checks`, 'multiple_opposed_checks_history'), npcObj)
                }
            })
        }).catch(error => { console.log(error) }) // Auth Errors
    }
}
// ==========================
//     Dice Probabilities
// ==========================
// Calculates the probability of obtaining a single specific outcome across n rolls of a d-sided die
function singleSpecificOutcomeProbCalc() {
    // Clear Output
    document.getElementById('right-column').innerHTML = ""
    // Get number of dice
    var n = parseFloat(document.getElementById("number-of-dice-(n)").value)
    // Get sides on each die
    var d = parseFloat(document.getElementById("number-of-sides-on-each-die-(d)").value)
    // Calculate
    var prob = parseFloat(1 - ((d - 1) / d)**n)
    probString = parseFloat(prob*100).toFixed(2)+"%"
    // Fraction
    var frac = new Fraction(prob.toFixed(2))
    frac = frac.toLocaleString()
    console.log(`Fraction: ${frac}`)
    // Print the probability
    var p = document.createElement('p')
    p.innerHTML = `Probability: ${probString}<br>Fraction: ${frac}`
    document.getElementById("right-column").appendChild(p)
}
// Calculates the probability of obtaining an outcome of o or greater, on at least one of n d-sided dice
function singleSpecificOutcomeOrGreaterProbCalc() {
    // Clear Output
    document.getElementById('right-column').innerHTML = ""
    // Get number of dice
    var n = parseFloat(document.getElementById("number-of-dice-(n)").value)
    // Get sides on each die
    var d = parseFloat(document.getElementById("number-of-sides-on-each-die-(d)").value)
    // Get the value that defines a success
    var o = parseFloat(document.getElementById("outcome-or-greater-desired-(o)").value)
    // Calculate
    var prob = parseFloat(1 - ((d - (d - o + 1)) / d)**n)
    probString = parseFloat(prob*100).toFixed(2)+"%"
    // Fraction
    var frac = new Fraction(prob.toFixed(2))
    frac = frac.toLocaleString()
    console.log(`Fraction: ${frac}`)
    // Print the probability
    var p = document.createElement('p')
    p.innerHTML = `Probability: ${probString}<br>Fraction: ${frac}`
    document.getElementById("right-column").appendChild(p)
}
function calcProbComplex(O, K, N, S){
    // VARIABLES
        // Probability of Success
        const pS = ( ( S - O ) + 1 ) / S
        console.log(`pS: ${pS}`)
        // Probability of Failure
        const pF = ( O - 1 ) / S
        console.log(`pF: ${pF}`)
        // nCr
        const combin = nCr(N, K)
        console.log(`nCr: ${combin}`)
    // CALCULATE
        // Calculate the probability of O K times
        let probability = ( pS ** K ) * ( pF ** ( N - K ) ) * combin
        console.log(`pS ** K: ${pS ** K}`)
        console.log(`pF ** ( N - K): ${pF ** ( N - K)}`)
        console.log(`Prob of K = ${K}: ${probability}`)
        // Calculate the prob for the remaining Ks to add it to the above
        console.log(`FOR LOOP THOUGHT Ks`)
        for (let k = K + 1; k < N + 1; k++) {
            // nCr
            const combin = nCr(N, k)
            console.log(`nCr: ${combin}`)
            // Calculate prob.
            const prob = ( pS ** k ) * ( pF ** ( N - k ) ) * combin
            console.log(`Prob of K = ${k}: ${prob}`)
            // Add the new prob to the total prob
            probability += prob  
        }
    // Return the probability
    return probability
}
// Function that is run on click that implements the above
function calculateMoreComplexProbability(){
    // Clear Output
    document.getElementById('right-column').innerHTML = ""
    // USER INPUTS
        // Get number of dice
        var N = parseFloat(document.getElementById("number-of-dice-(n)").value)
        // Get sides on each die
        var S = parseFloat(document.getElementById("number-of-sides-on-each-die-(d)").value)
        // Get the value that defines a success
        var O = parseFloat(document.getElementById("outcome-or-greater-desired-(o)").value)
        // Get the number of success needed
        var K = parseFloat(document.getElementById("number-of-successes-needed-(k)").value)
    // FUNCTION
        // Use the above function
        const probability = calcProbComplex(O, K, N, S)
    // CONVER TO READABLE STRING
        // Probability
        console.log(`Prob.: ${probability}`)
        probString = parseFloat(probability*100).toFixed(2)+"%"
        // Fraction
        var frac = new Fraction(probability.toFixed(2))
        frac = frac.toLocaleString()
        console.log(`Fraction: ${frac}`)
    // PRINT
        // Creat a new P element
        var p = document.createElement('p')
        // Set its innerHTML
        p.innerHTML = `Probability: ${probString}<br>Fraction: ${frac}`
        // Append the newly created element to the DOM
        document.getElementById("right-column").appendChild(p)
}
// =========================
//     RPG Miscellaneous
// =========================
// Function to calculate the weight of currency
function currencyWeight(){
    // Clear output
    document.getElementById('right-column').innerHTML = ''
    // Get number of pieces
    var pieces = parseInt(document.getElementById("pieces").value)
    // Divide it by 50
    var weightPounds = (pieces / 50).toFixed(2)
    // Conver to KG
    var weightKG = (weightPounds / 2.205).toFixed(2)
    // Set up the message
    var vMessage = `<h3>Output</h3>
                    ${pieces} pieces weigh ${weightPounds} lbs (${weightKG} kg).`
    // Populate the element
    populateElement('right-column', vMessage, 'p')
}
// Calculate the distance to the horizon
function horizonCalculator(){
    // Clear Output
    document.getElementById('right-column').innerHTML = ''
    // Get height
    var h = document.getElementById("height-of-the-observer-(h)-in-feet").value
    // Get radius
    var r = (document.getElementById("radius-of-the-planet-(R)").value) * 5280
    // Compute
    var l = Math.round(Math.sqrt(2 * r * h))
    // Print the probability
    var p = document.createElement('p')
    p.innerHTML = `<h3>Output</h3>
                    ${l} feet <br>
                    ${(l/5280).toFixed(2)} miles`
    document.getElementById("right-column").appendChild(p)	
}