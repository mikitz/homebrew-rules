// Function to calculate how much gold-value a PC can craft per day
function goldPerDay(){
    // Inputs
    const profBonus = parseInt(document.getElementById('proficiency-bonus').value)
    const intMod = parseInt(document.getElementById('intelligence-modifier').value)
    const outputElement = document.getElementById('right-column') // Get the outpu element
    outputElement.innerHTML = '' // Clear the output element
    if ( !profBonus || !intMod ) return alert("One of the inputs is empty.")
    // Compute
    const gold = (profBonus + intMod) * 10
    // Update DOM
    outputElement.innerHTML = `<h3>Output</h3>
                                <b>Gold per 8 Work-hours:</b> ${gold}gp<br>
                                <b>Gold per Work-hour:</b> ${(gold / 8).toLocaleString()}gp`
}
// Calculates how long it will take to craft a certain item
function calculate_crafting_time(){
    // Clear Output
    document.getElementById('output').innerHTML = ''
    // Get gold
    var g = parseInt(document.getElementById("gold").value)
    // Get prof. bonus
    var p = parseInt(document.getElementById("prof").value)
    // Get int. mod.
    var i = parseInt(document.getElementById("int").value)
    // Calculate amount of gold per 8 hours of work (1 workday)
    var wd = (p + i)*10
    // Calculate the amount of gold per 1 hour (1 workhour)
    var wh = Math.round(wd/8)
    // Calculate the # of hours for this specific item
    var whi = Math.round(g / wh)
    // Calcualte the workdays for this specific item
    var wdi = (whi / 8).toFixed(2)
    // Print the output
    var p = document.createElement('p')
    p.innerHTML = `<h2>Output</h2>
                    Gold per Workday: ${wd} gp <br>
                    Gold per Workhour: ${wh} gp <br>
                    Workhours for this Item: ${whi} hours <br>
                    Workdays for this Item: ${wdi} days`
    document.getElementById("output").appendChild(p)
}
// Function to Calculate the cost of a custom magic item based on a spell
function turningASpellIntoAMagicItem() {
    // Inputs
    document.getElementById('right-column').innerHTML = '' // Clear the output
    let spellLevel = parseInt(document.getElementById('spell-level').value) // Get the spell level
    let spellLevelName = document.getElementById('spell-level').value
    if (spellLevelName == 'Cantrip') spellLevel = 0.5
    if (spellLevelName != 'Cantrip') spellLevelName = ordinal_suffix_of(spellLevel)
    const numCharges = parseInt(document.getElementById('number-of-charges').value) // Get the number of charges
    // Alert the user if the number of charges exceeds the spells level
    if (spellLevel === 0.5 && numCharges > 1) return alert(`The number of charges cannot exceed 1 for cantrips.`)
    else if (spellLevel < numCharges && spellLevel !== 0.5) return alert(`The number of charges cannot exceed the spell's level. The max number of charges for an item made from a level-${spellLevel} spell is ${spellLevel}.`)
    // Compute
    const cSpellScroll = parseInt(spellScrollsBySpellLevel.find(i => i["SPELL-LEVEL"] == spellLevelName)["COST-(TO-BUY)"]) // Pull the cost for the spell scroll
    const cSpellSlot = parseInt(spellScrollsBySpellLevel.find(i => i["SPELL-LEVEL"] == spellLevelName)["COST-(FOR-SERVICE)"]) // Pull the cost for the spell slot
    const pSpellScrolls = parseInt(numCharges * cSpellScroll) // Calculate cost of spell scrolls
    const pSpellSlots = parseInt(numCharges * cSpellSlot) // Calculate cost of spell slots
    const tTotal = parseInt((spellLevel * 8) * numCharges) // Calculate total time to make
    const tDays = parseInt(tTotal / 8) // Calculate the # of workdays the character has to wait
    const itemCost = parseInt((spellLevel * numCharges) * 1000) // Calculate the cost of the item
    const pTotal = parseInt(pSpellScrolls + pSpellSlots + itemCost) // Calculate total price
    // Update DOM
    document.getElementById("right-column").innerHTML = `<h2>Output</h2>
                        <b>Total Price:</b> ${pTotal.toLocaleString()} gp <br>
                        <b>Total Days:</b> ${tDays.toLocaleString()} workdays <br>
                        <b>Total Workhours:</b> ${tTotal.toLocaleString()} workhours<br>
                        <b>Cost for Spell Scrolls:</b> ${pSpellScrolls.toLocaleString()} gp<br>
                        <b>Cost for Spell Slots:</b> ${pSpellSlots.toLocaleString()} gp <br>
                        <b>Item Cost:</b> ${itemCost.toLocaleString()} gp`
}
// Functiont to compute the cost of adding more charges
function addingMoreChargesToAMagicItem(){
    // Inputs
    document.getElementById('right-column').innerHTML = '' // Clear the output
    let spellLevel = parseInt(document.getElementById('spell-level').value) // Get the spell level
    let spellLevelName = document.getElementById('spell-level').value
    if (spellLevelName == 'Cantrip') spellLevel = 0.5
    if (spellLevelName != 'Cantrip') spellLevelName = ordinal_suffix_of(spellLevel)
    const numCharges = parseInt(document.getElementById('number-of-charges').value) // Get the number of charges
    // Alert the user if the number of charges exceeds the spells level
    if (spellLevel === 0.5 && numCharges > 1) return alert(`The number of charges cannot exceed 1 for cantrips.`)
    else if (spellLevel < numCharges && spellLevel !== 0.5) return alert(`The number of charges cannot exceed the spell's level. The max number of charges for an item made from a level-${spellLevel} spell is ${spellLevel}.`)
    // Compute
    const cSpellScroll = parseInt(spellScrollsBySpellLevel.find(i => i["SPELL-LEVEL"] == spellLevelName)["COST-(TO-BUY)"]) // Pull the cost for the spell scroll
    const cSpellSlot = parseInt(spellScrollsBySpellLevel.find(i => i["SPELL-LEVEL"] == spellLevelName)["COST-(FOR-SERVICE)"]) // Pull the cost for the spell slot
    const pSpellScrolls = parseInt(numCharges * cSpellScroll) // Calculate cost of spell scrolls
    const pSpellSlots = parseInt(numCharges * cSpellSlot) // Calculate cost of spell slots
    const tTotal = parseInt((spellLevel * 8) * numCharges) // Calculate total time to make
    const tDays = parseInt(tTotal / 8) // Calculate the # of workdays the character has to wait
    const pTotal = parseInt(pSpellScrolls + pSpellSlots) // Calculate total price
    // Update DOM
    document.getElementById("right-column").innerHTML = `<h2>Output</h2>
                        <b>Total Price:</b> ${pTotal.toLocaleString()} gp <br>
                        <b>Total Days:</b> ${tDays.toLocaleString()} workdays <br>
                        <b>Total Workhours:</b> ${tTotal.toLocaleString()} workhours<br>
                        <b>Cost for Spell Scrolls:</b> ${pSpellScrolls.toLocaleString()} gp<br>
                        <b>Cost for Spell Slots:</b> ${pSpellSlots.toLocaleString()} gp <br>`
}