// Calculate the reward for a bounty
function calculate_bounty(){
    // Clear Output
    document.getElementById('output').innerHTML = ''
    // USER INPUTS
        // Get the most wanted status
        const mostWanted = parseInt(document.getElementById("most-wanted").value)
        // Get the target's CR
        const cr = parseFloat(document.getElementById("cr").value)
    // CALCULATE
        // Bounty Reward
        if (mostWanted === 0){
            var bountyReward = (cr * 100) 
        } else {
            var bountyReward = (cr * 100) * (mostWanted * 10)
        }
    // MESSAGE
        // Print the output
        var p = document.createElement('p')
        p.innerHTML = `<h2>Output</h2> Bounty Reward: ${bountyReward.toLocaleString()} gp`
        document.getElementById("output").appendChild(p)
}
// Function to calculate SIMPLE business income
// TODO: Add to Spreadsheet: It's a yellow row 36
function simpleBusinessIncome() {
    // Get the selected campaign
    var campaignName = localStorage.getItem('selectedCampaign')
    // Clear the output
    document.getElementById('output').innerHTML = ''
    // Get number of profit-share employees
    var profitShare = document.getElementById('profit_share').value
    // Note
    const note = document.getElementById('note').value
    // Check to see if there are profit-share employees
    if (profitShare > 0){
        // Make al ist to store the profit share percents in
        var listProfitShare = []
        // Set total of these values
        var percentTotal = 0
        // Loop through the profit-share inputs to make sure they add up to 100
        for (empID = 0; empID < profitShare; empID++) {
            // Get the percent for this employee
            let percent = parseFloat(document.getElementById(`percent${empID}`).value)
            // Push the percent to the list
            listProfitShare.push(percent)
            // Add it to the total
            percentTotal += percent
        }
        // Get the PC percent
        let PCpercent = parseFloat(document.getElementById('PCpercent').value)
        // Push the percent to the list
        listProfitShare.push(PCpercent)
        // Add it to the total
        percentTotal += PCpercent
    }
    console.log(listProfitShare)
    // Check if percentTotal is less than or more than 100
    if (percentTotal > 100 || percentTotal < 100) {
        alert(`Your percentages do not add up to 100! They add up to ${percentTotal}. Please double check your arithmetic and try again.`)
        return
    }
    // Roll 1d100
    var d100 = getRndInteger(1, 100)
    console.log(`d100: ${d100}`)
    // Get the amount of passionate employees
    var employees = parseInt(document.getElementById('employees').value)
    console.log(`Employees: ${employees}`)
    // Get the number of days spent at the business running it
    var days = parseInt(document.getElementById('days').value)
    console.log(`Days: ${days}`)
    // Add the modifiers to the roll
    var check = d100 + employees + days
    console.log(`Check: ${check}`)
    // Determine the outcome
    if (check <= 40) {
        var rCost = getRndInteger(1, 6) * 5
        console.log(`Cost: ${rCost}`)
        // Granular outcomes
        if (check <= 20) {
            var outcome = -rCost * 1.5
        } else if (check <= 30) {
            var outcome = -rCost * 1
        } else if (check <= 40) {
            var outcome = -rCost * 0.5
        }
    } else if (check >= 61) { 
        // Granular outcomes
        if (check <= 80) {
            var outcome = getRndInteger(1, 6) * 5
        } else if (check <= 90) {
            var outcome = (getRndInteger(1, 8) + getRndInteger(1, 8)) * 5
        } else if (check >= 91) {
            var outcome = (getRndInteger(1, 10) + getRndInteger(1, 10) + getRndInteger(1, 10)) * 5
        }
    } else {
        var outcome = 0
    }
    console.log(`Outcome: ${outcome}`)
    // If profit share
    if (profitShare > 0){
        // Loop through the percents
        for (perc = 0; perc < listProfitShare.length; perc++){
            // Calculate their share
            let share = (listProfitShare[perc] / 100) * outcome
            // Check if it's the last element in the list
            if (perc < listProfitShare.length - 1) {
                // Set up HTML for NPC employees to append
                var HTML = `Employee ${perc}'s share of the profits is ${share} gp.`
            } else {
                // Set up PC HTML
                var HTML = `PC's share of the profits is ${share} gp.`
            }
            // Create a new div
            let div = document.createElement('div')
            div.innerHTML = HTML
            document.getElementById('output').appendChild(div)
        }
    } else {
        document.getElementById('output').innerHTML = `This month, your business earned a profit of ${outcome} gp.`
    }
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
                    var npcObj = {"number-of-days": days,
                                "number-of-employees": employees,
                                "number-of-profit-share-employees": profitShare,
                                "income": document.getElementById('output').innerHTML,
                                "note": note,
                                "date": today}
                    // SET THE DATA
                    addDoc(collection(db, `campaigns`, user.uid, campaignName, `business`, 'business_history'), npcObj)
                }
            })
        }).catch(error => { console.log(error) }) // Auth Errors
    }
}
// Function to populate the profit-share employees
function populateProfitShare(){
    // Clear the div
    var PSE = document.getElementById('profit_share_employees')
    PSE.innerHTML = ''
    // Get number of profit-share employees
    var profitShare = document.getElementById('profit_share').value
    // Loop through the number of profit share employees
    for (empID = 0; empID < profitShare; empID++) {
        // Set up the HTML to append
        var HTML = `<label for="percent${empID}">Employee ${empID}'s Percent of Profit: </label>
                    <input type="number" id="percent${empID}" name="profit_share" min="0" max="10" value="0">`
        // Create a new div
        var div = document.createElement('div')
        div.setAttribute('id', `percentDiv${empID}`)
        div.innerHTML = HTML
        PSE.appendChild(div)      
    }
    // Append PC's percent of profit
        // Set up the HTML to append
        var HTML = `<label for="PCpercent">PC's Percent of Profit: </label>
        <input type="number" id="PCpercent" name="profit_share" min="0" max="10" value="0">`
        // Create a new div
        var div = document.createElement('div')
        div.setAttribute('id', `PCpercentDiv`)
        div.innerHTML = HTML
        PSE.appendChild(div)
}
// Function to calculate the cost of a mercenary
function calculatingMercenaryCost(){
    // USER INPUTS
        // CR
        const CR = document.getElementById('mercenary-CR').value
        // Quantity
        const quantity = parseInt(document.getElementById('quantity').value)
    // CALCULATIONS
        // TIME
            // Wait Time
            const waitTime = Math.ceil((quantity / 10) * 2)
            // Min. Time
            const minTime = Math.ceil(waitTime * 2)
        // INDIVIDUAL
            // CR Cost
            const costCR = CR * 16
            // Combat Cost
            const combatCostCR = costCR * 2
            // Non-combat Minimum Time Commitment
            const minPayInd = costCR * minTime
            // Combat Minimum Time Commitment
            const minPayIndCombat = combatCostCR * minTime
        // TOTAL
            // Total CR COst
            const totalCost = costCR * quantity
            // Total Combat Cost
            const totalCombatCost = combatCostCR * quantity
            // Non-combat Minimum Time Commitment
            const totalMinPayInd = totalCost * minTime
            // Combat Minimum Time Commitment
            const totalMinPayIndCombat = totalCombatCost * minTime
    // MESSAGE
        // Set message
        var message = `<h3>Output</h3>`
        // If 10 or more Mercs
        if (quantity >= 10){
            // Add Wait Time
            message += `Wait Time: ${waitTime.toLocaleString()} days`
        }
        // Add Individual Calculations
        message += `<h4>Individual</h4>
                    Non-combat Pay: ${costCR.toLocaleString()} gp per day
                    <br>Combat Pay: ${combatCostCR.toLocaleString()} gp per day`
            if(quantity >= 10){
                message += `<br>Minimum Non-combat Pay: ${minPayInd.toLocaleString()} gp for ${minTime.toLocaleString()} days
                            <br>Minimum Combat Pay: ${minPayIndCombat.toLocaleString()} gp for ${minTime.toLocaleString()} days`
            }
        // Add Total Cost
        message += `<h4>Group Total</h4>
                    Non-combat Pay: ${totalCost.toLocaleString()} gp per day
                    <br>Combat Pay: ${totalCombatCost.toLocaleString()} gp per day`
            if(quantity >= 10){
                message += `<br>Minimum Non-combat Pay: ${totalMinPayInd.toLocaleString()} gp for ${minTime.toLocaleString()} days
                            <br>Minimum Combat Pay: ${totalMinPayIndCombat.toLocaleString()} gp for ${minTime.toLocaleString()} days`
            }
        // Append the message to the dom
        document.getElementById('right-column').innerHTML = message

}
// Calculates the duration of the sailing as well as revenue earned from the conveyance of cargo
// TODO: Add to Spreadsheet
function calculate_sail_duration_and_cargo_revenue() {
    // Clear Output
    document.getElementById('output').innerHTML = ''
    // Define some global variables
    let vHours = ''
    let vMilesPerDay = ''
    let vDaysToDestination = ''
    let vRemaining = ''
    let vMessage = '<H2>SAILING DURATION</H2> <P>'
    let vPricePerMile = 0.08
    let vPricePerPound = 0.02
    let vHandlingFee = 0
    let vShippingFee = 0
    let vRevenue = 0    
    // Get the number of sailing shifts from the user input
    var a = document.getElementById("shifts")
    var vShifts = parseInt(a.options[a.selectedIndex].text)
    // Get the ship speed from the user input
    var b = document.getElementById("speed")
    var vSpeed = parseFloat(b.options[b.selectedIndex].value)
    // Get the distance to destination from the user input
    var vDistance = parseInt(document.getElementById("distance").value)
    // Get the weight of the cargo from the user input
    var vWeight = parseInt(document.getElementById("weight").value)
    // Calcualte the number of hours sailed per day
    vHours = vShifts * 8
    // Calculate the distance travelled in a day
    vMilesPerDay = vHours * vSpeed
    // Calculate the number of days to destination
    vDaysToDestination = Math.floor(vDistance / vMilesPerDay)
    // Calculate the number of remaining hours from above
    vRemaining = Math.ceil(24 * ((vDistance / vMilesPerDay) - vDaysToDestination))
    // Calculate the Shipping Fee
    vShippingFee = +((vPricePerMile * vDistance) + (vPricePerPound * vWeight)).toFixed(2)
    // Calculate the Handling Fee
    vHandlingFee = +((vShippingFee * 0.05) * vShifts).toFixed(2)
    // Calculate total revenue
    vRevenue = vShippingFee + vHandlingFee
    // Log to the console for debugging purposes
    console.log(`VARIABLES
                Shifts: ${vShifts}
                Speed: ${vSpeed}
                Distance: ${vDistance}
                Hours: ${vHours}
                Miles per Day: ${vMilesPerDay}
                Time to Destination: ${vDaysToDestination} days and ${vRemaining} hours
                Days to Destination: ${vDistance / vMilesPerDay}`)
    // Build the message
    vMessage += `While sailing for <I>${vHours} hours</I> per day at a speed of <I>${vSpeed} MPH</I>, 
    you will cover a distance of <I>${vDistance} miles</I> in about <B>${vDaysToDestination} days and ${vRemaining} hours</B>. 
    Please note that this assumes nothing will go wrong.
    <H2>CARGO TRANSPORTATION</H2>
    Transporting cargo with a weight of <I>${vWeight} lbs</I> over a distance of <I>${vDistance} miles</I> will net you a revenue of <B>${vRevenue} gp</B>, 
    comprised of a handling fee of <I>${vHandlingFee} gp</I> and a shipping fee of <I>${vShippingFee} gp</I>.`
    // Print the message
    var p = document.createElement('p')
    p.innerHTML = vMessage
    document.getElementById('output').appendChild(p)
}