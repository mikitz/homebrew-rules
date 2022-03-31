// Function to calculate how much gold-value a PC can craft per day
function goldPerDay(){
    // Inputs
    const profBonus = parseInt(document.getElementById('proficiency-bonus').value)
    const itemCost = parseInt(document.getElementById('item-cost').value)
    const intMod = parseInt(document.getElementById('intelligence-modifier').value)
    const outputElement = document.getElementById('right-column') // Get the output element
    outputElement.innerHTML = '' // Clear the output element
    if ( !profBonus || !intMod ) return alert("One of the inputs is empty.")
    // Compute
    const gold = (profBonus + intMod) * 10
    // Update DOM
    if (!itemCost) {
        outputElement.innerHTML = `<h3>Output</h3>
                                    <b>Gold per Work-day:</b> ${gold}gp <br>
                                    <b>Gold per Work-hour:</b> ${(gold / 8).toLocaleString()}gp`
        return
    }
    outputElement.innerHTML = `<h3>Output</h3>
                                    <b>Gold per Work-day:</b> ${gold}gp <br>
                                    <b>Gold per Work-hour:</b> ${(gold / 8).toLocaleString()}gp <br>
                                    <b>Work-hours for This Item:</b> ${Math.ceil(itemCost / (gold / 8)).toLocaleString()} Work-hours <br>
                                    <b>Work-days for This Item:</b> ${Math.ceil(itemCost / gold).toLocaleString()} Work-days`
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
    const itemCost = parseInt((spellLevel * numCharges) * 100) // Calculate the cost of the item
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
// Function to 
function craftingAConstruct(){
    // Inputs
    const profBonus = parseInt(document.getElementById('proficiency-bonus').value) // Get the Proficiency Bonus that the user input
    const creatureCR = parseInt(document.getElementById('creature-CR').value) // Get the Creature CR that the user input
    const intMod = parseInt(document.getElementById('intelligence-modifier').value) // Get the Intelligence Mod. that the user input
    const outputElement = document.getElementById('right-column') // Get the output element
    outputElement.innerHTML = '' // Clear the output element 
    // Compute
    let controlGemCost
    let crLimit
    for (let index = 0; index < gemstonesAndControlGems.length; index++) {
        if (index == 0) continue // Skip the first entry
        const element = gemstonesAndControlGems[index] // Get the current element
        const currentCRLimit = element['CONTROL-GEM-CR-LIMIT'] // Get the current element's CR Limit
        const prevCRLimit = gemstonesAndControlGems[index - 1]['CONTROL-GEM-CR-LIMIT'] // Get the previous element's CR Limit
        if (index == (gemstonesAndControlGems.length) - 1) { 
            controlGemCost = element['CONTROL-GEM-PRICE'] // If the last element
            crLimit = element['CONTROL-GEM-CR-LIMIT']
            break
        }
        const nextCRLimit = gemstonesAndControlGems[index + 1]['CONTROL-GEM-CR-LIMIT'] // Get the next element's CR Limit
        if (creatureCR <= currentCRLimit) {
            controlGemCost = element['CONTROL-GEM-PRICE']
            crLimit = element['CONTROL-GEM-CR-LIMIT']
            break
        }
    }
    const materialsCost = ( creatureCR * ( creatureCR + 1 ) * 100 ) /2
    const totalCost = controlGemCost + materialsCost
    // Update DOM
    if (!profBonus || !intMod) {
        outputElement.innerHTML = `<h3>Output</h3>
                                <b>Control Gem Cost:</b> ${controlGemCost.toLocaleString()} gp <br>
                                <b>Materials Cost:</b> ${materialsCost.toLocaleString()} gp <br>
                                <b>Total Cost:</b> ${totalCost.toLocaleString()} gp`
        return
    }
    const gold = (profBonus + intMod) * 10
    outputElement.innerHTML = `<h3>Output</h3>
                                <b>Control Gem Cost:</b> ${controlGemCost.toLocaleString()} gp <br>
                                <b>Materials Cost:</b> ${materialsCost.toLocaleString()} gp <br>
                                <b>Total Cost:</b> ${totalCost.toLocaleString()} gp <br>
                                <b>Work-hours for This Item:</b> ${Math.ceil(totalCost / (gold / 8)).toLocaleString()} Work-hours <br>
                                <b>Work-days for This Item:</b> ${Math.ceil(totalCost / gold).toLocaleString()} Work-days`
}
// Function to compute how much time is needed to repair a controlled construct to full HP
function repairingAConstruct(){
    // Inputs
    const totalHP = parseInt(document.getElementById('total-HP').value) // Get the Proficiency Bonus that the user input
    const currentHP = parseInt(document.getElementById('current-HP').value) // Get the Creature CR that the user input
    const creatureSize = document.getElementById('creature-size').value // Get the Intelligence Mod. that the user input
    const outputElement = document.getElementById('right-column') // Get the output element
    outputElement.innerHTML = '' // Clear the output element 
    // Compute
    if (!totalHP || !currentHP || !creatureSize) return alert("At least one of the below inputs is empty. They must all have values.")
    const timeForSize = parseInt(repairTimeBySize.find(i => i['SIZE'] == creatureSize)["TIME_PER_HIT_POINT_(SECONDS)"])
    const remainingHP = totalHP - currentHP
    const timeToHeal = timeForSize * remainingHP
    const fancyTime = fancyTimeFormat(timeToHeal)
    const hours = Math.ceil(timeToHeal / 3600)
    outputElement.innerHTML = `<h3>Output</h3>
                                <b>Remaining HP:</b> ${remainingHP.toLocaleString()} HP <br>
                                <b>Remaining Hours (rounded up):</b> ${hours.toLocaleString()} hrs <br>
                                <b>Remaining Time (hh:mm:ss):</b> ${fancyTime} <br>`
}