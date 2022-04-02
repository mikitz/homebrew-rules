// Calculate the reward for a bounty
function bounty(){
    // Clear Output
    document.getElementById('right-column').innerHTML = ''
    // USER INPUTS
        // Get the most wanted status
        const mostWanted = parseInt(document.getElementById("most-wanted-status").value)
        console.log("Most Wanted:", mostWanted)
        // Get the target's CR
        const cr = parseInt(document.getElementById("creature-CR").value)
    // CALCULATE
        // Bounty Reward
        if (isNaN(mostWanted)){
            var bountyReward = (cr * 100) 
        } else {
            var bountyReward = (cr * 100) * (mostWanted * 10)
        }
    // MESSAGE
        // Print the output
        var p = document.createElement('p')
        p.innerHTML = `<h2>Output</h2> Bounty Reward: ${bountyReward.toLocaleString()} gp`
        document.getElementById("right-column").appendChild(p)
}
// Function to determine the monthly profit of a business
function runningABusiness() {
    // Inputs
    let numDaysRunningBusiness = parseInt(document.getElementById('number-of-days-spent-running-the-business').value)
    if (isNaN(numDaysRunningBusiness)) numDaysRunningBusiness = 0
    let numPassionateEmployees = parseInt(document.getElementById('number-of-passionate-employees').value)
    if (isNaN(numPassionateEmployees)) numPassionateEmployees = 0
    const numProfitShareEmployees = parseInt(document.getElementById('number-of-profit-share-employees').value)
    const outputElement = document.getElementById('right-column') // Get the output element
    outputElement.innerHTML = '' // Clear the output element
    // Compute
    let listProfitShare = [] // Make a list to store the profit share percents in
    if (numProfitShareEmployees > 0){ // Check to see if there are profit-share employees
        var percentTotal = 0 // Declare our precent total for the profit share employees
        for (empID = 0; empID < numProfitShareEmployees; empID++) { // Loop through the profit-share inputs to make sure they add up to 100
            let percent = parseFloat(document.getElementById(`percent${empID}`).value) // Get the percent for this employee
            listProfitShare.push(percent) // Push the percent to the list
            percentTotal += percent // Add it to the total
        }
        let PCpercent = parseFloat(document.getElementById('PCpercent').value) // Get the PC percent
        listProfitShare.push(PCpercent) // Push the percent to the list
        percentTotal += PCpercent // Add it to the total
    }
    // Handle Input Mistakes
    if (percentTotal != 100 && percentTotal) return alert(`Your percentages do not add up to 100! They add up to ${percentTotal}. Please double check your arithmetic and try again.`) // Check if percentTotal is not 100
    // The Check
    var d100 = getRndInteger(1, 100) // Roll 1d100
    var check = d100 + numPassionateEmployees + numDaysRunningBusiness // Add the modifiers to the roll
    let outcome // Declare the object that will store the total gold
    // Determine the outcome
    if (check <= 40) {
        var rCost = getRndInteger(1, 6) * 5 // Roll for the cost
        // Granular outcomes
        if (check <= 20) outcome = -rCost * 1.5
        else if (check <= 30) outcome = -rCost * 1
        else if (check <= 40) outcome = -rCost * 0.5
    } else if (check >= 61) { 
        // Granular outcomes
        if (check <= 80) outcome = getRndInteger(1, 6) * 5
        else if (check <= 90) outcome = (getRndInteger(1, 8) + getRndInteger(1, 8)) * 5
        else if (check >= 91) outcome = (getRndInteger(1, 10) + getRndInteger(1, 10) + getRndInteger(1, 10)) * 5
    } else outcome = 0
    outputElement.innerHTML = `Roll: <code>${d100} + ${numPassionateEmployees} + ${numDaysRunningBusiness} = ${check} </code>`
    // If profit share
    if (numProfitShareEmployees > 0){
        for (perc = 0; perc < listProfitShare.length; perc++){ // Loop through the percents
            let share = (listProfitShare[perc] / 100) * outcome // Calculate their share
            // Dealing with the HTML
            let HTML // Set up PC HTML
            if (perc < listProfitShare.length - 1) HTML = `Employee ${perc}'s share of the profits is <b>${share} gp</b>.` // Set up HTML for NPC employees to append
            else HTML = `PC's share of the profits is <b>${share} gp</b>.`
            // New Div
            let div = document.createElement('div') // Create a new div
            div.innerHTML = HTML // Set its innerHTML
            outputElement.appendChild(div) // Append it to the DOM
        }
    } else outputElement.innerHTML += `<br>This month, your business earned a profit of <b>${outcome} gp</b>.`
}
// Function to populate the profit-share employees
function populateProfitShare(){
    // Clear the div
    var PSE = document.getElementById('profit-share-employees-html')
    PSE.innerHTML = ''
    // Get number of profit-share employees
    var numProfitShareEmployees = document.getElementById('number-of-profit-share-employees').value
    // Loop through the number of profit share employees
    for (empID = 0; empID < numProfitShareEmployees; empID++) {
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
// Function to save a business
function saveBusiness(){
    // Inputs
    const numDaysRunningBusiness = parseInt(document.getElementById('number-of-days-spent-running-the-business').value)
    const numPassionateEmployees = parseInt(document.getElementById('number-of-passionate-employees').value)
    const numProfitShareEmployees = parseInt(document.getElementById('number-of-profit-share-employees').value)
    const name = document.getElementById('name').value
    if (!name) return alert("Please enter a name before saving a business.") // See if name is blank
    // Local Storage Pull
    if (!localStorage.getItem('business_list')) localStorage.setItem('business_list', '[]') // Check if business_list exists
    let businessList = JSON.parse(localStorage.getItem('business_list')) // Parse the JSON to read it
    const locationIdx = businessList.findIndex(i => i.NAME == name) // Get the index of this location
    // Profit Share Employees Data
    let profitShareEmployees = []
    let pcProfitPercent = 100
    if (numProfitShareEmployees > 0) {
        for (let index = 0; index < numProfitShareEmployees; index++) { // Loop through them and grab their percents
            const element = document.getElementById(`percent${index}`)
            const percentOfShare = parseFloat(element.value)
            profitShareEmployees.push({
                "EMPLOYEE_ID": index,
                "PROFIT_PERCENT": percentOfShare
            })    
        } 
        pcProfitPercent = document.getElementById('PCpercent').value
    }
    // Update JSON
    if (locationIdx >= 0) { // Update the JSON
        businessList[locationIdx].NAME = name
        businessList[locationIdx].NUM_PASSIONATE_EMPLOYEES = numPassionateEmployees
        businessList[locationIdx].NUM_PROFIT_SHARE_EMPLOYEES = numProfitShareEmployees
        businessList[locationIdx].PROFIT_SHARE_EMPLOYEES = profitShareEmployees
        businessList[locationIdx].PC_PROFIT_PERCENT = pcProfitPercent
    } else if (locationIdx < 0) { // Append a new Location to the JSON
        const city = { // JSON Object
                "NAME": name, 
                "NUM_PASSIONATE_EMPLOYEES": numPassionateEmployees,
                "NUM_PROFIT_SHARE_EMPLOYEES": numProfitShareEmployees,
                "PROFIT_SHARE_EMPLOYEES": profitShareEmployees,
                "PC_PROFIT_PERCENT": pcProfitPercent,
            }
        businessList.push(city) // Push to the array 
    }
    localStorage.setItem('business_list', JSON.stringify(businessList)) // Set local storage
    // Update DOM
    populateBusinessDropdown() // Set up the City Dropdown with the new city that was just added
}
// Function to populate the business dropdown
function populateBusinessDropdown(){
    const businessList = JSON.parse(localStorage.getItem('business_list')) // Parse the Local Storage businesses
    const businessDropdown = document.getElementById('business') // Get the dropdown where the business names will be displayed
    businessDropdown.innerHTML = '' // Set the dropdown to emtpy
    const selectBusiness = document.createElement('option') // Create the "Select Businiess" option
    selectBusiness.innerHTML = 'Select Business' // Set its innerHTML
    selectBusiness.value = 'custom' // Set its value
    businessDropdown.appendChild(selectBusiness) // Append it to the Dropdown
    // Populate the Dropdown with the businessesz
    if (businessList) {
        businessList.forEach(element => {
            let option = document.createElement('option')
            option.value = element.NAME
            option.id = element.NAME
            option.innerHTML = element.NAME
            businessDropdown.appendChild(option)
        });
    }
}
// Function to chang ethe inputs based on the selected business
function changeBusinessInputsBasedOnSelectedBusiness() {
    // Inputs
    const name = document.getElementById('business').value
    if (name == 'custom') return // If the user selects "Select Business"
    const passionateEmployeesElement = document.getElementById('number-of-passionate-employees')
    const profitShareEmployeesElement = document.getElementById('number-of-profit-share-employees')
    const nameElement = document.getElementById('name')
    // Local Storage
    const businessList = JSON.parse(localStorage.getItem('business_list')) // Parse the Local Storage businesses
    // Update DOM
    nameElement.value = name
    passionateEmployeesElement.value = businessList.find(i => i.NAME == name).NUM_PASSIONATE_EMPLOYEES
    profitShareEmployeesElement.value = businessList.find(i => i.NAME == name).NUM_PROFIT_SHARE_EMPLOYEES
    populateProfitShare()
    // Profit Share Employees percents
    const profitShareEmployees = businessList.find(i => i.NAME == name).PROFIT_SHARE_EMPLOYEES
    profitShareEmployees.forEach(element => {
        const DOMelement = document.getElementById(`percent${element.EMPLOYEE_ID}`)
        DOMelement.value = element.PROFIT_PERCENT
    });
    document.getElementById('PCpercent').value = businessList.find(i => i.NAME == name).PC_PROFIT_PERCENT
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
function deliveryContracts() {
    // Clear Output
    document.getElementById('right-column').innerHTML = ''
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
    var a = document.getElementById("number-of-shifts")
    var vShifts = parseInt(a.options[a.selectedIndex].text)
    // Get the ship speed from the user input
    var b = document.getElementById("speed-(MPH)")
    var vSpeed = parseFloat(b.options[b.selectedIndex].value)
    // Get the distance to destination from the user input
    var vDistance = parseInt(document.getElementById("distance-to-destination").value)
    // Get the weight of the cargo from the user input
    var vWeight = parseInt(document.getElementById("cargo-weight-(pounds)").value)
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
    document.getElementById('right-column').appendChild(p)
}
// Function to determine how many horses are needed for a given party
function ridingHorses(){
    // INPUTS
    const desiredSpeed = `${parseInt(document.getElementById('desired-speed').value)} mph` // Get the user's current ability score
    const numberOfCreatures = parseInt(document.getElementById('number-of-riding-creatures').value) // Get the user's desired ability score
    const periodLength = parseInt(document.getElementById('period-length').value)
    const outputElement = document.getElementById('right-column') // Get the output element
    outputElement.innerHTML = '' // Clear the output element
    // COMPUTE
    const horsesPerRider = horsesPerRidingCreature.find(i => i.SPEED == desiredSpeed && i['PERIOD_LENGTH_(IN_HOURS)'] == periodLength)['#_OF_HORSES']
    const totalHorses = horsesPerRider * numberOfCreatures
    // UPDATE DOM
    outputElement.innerHTML = `<h3>Output</h3>
                                Each member of your party needs <b>${horsesPerRider} horses</b> for a total of <b>${totalHorses} horses</b>.`
}