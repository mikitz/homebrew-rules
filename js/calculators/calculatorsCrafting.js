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
function customMagicItem() {
    // Clear Output
    document.getElementById('output1').innerHTML = ''
    // Log
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    // Get the Spell Level
    var spellLevelName = document.getElementById('spell-level').value
        // Get the int from the spell level
        if (spellLevelName.length > 3) {
            spellLevel = 0.5
        } else {
            spellLevel = parseInt(spellLevelName.charAt(0))
        }
    console.log(`Spell Level: ${spellLevel}`)
    // Get the # of Charges
    var numCharges = parseInt(document.getElementById('numOfCharges').value)
    console.log(`# of Charges: ${numCharges}`)
    // Alert the user if the number of charges exceeds the spells level
    if (spellLevel === 0.5 && numCharges > 1){
        alert(`The number of charges cannot exceed 1 for cantrips.`)
        return
    } else if (spellLevel < numCharges && spellLevel !== 0.5) {
        alert(`The number of charges cannot exceed the spell's level. The max number of charges for an item made from a level-${spellLevel} spell is ${spellLevel}.`)
        return
    } else if (spellLevelName === "Cantrip" && numCharges > 1) {
        alert("The number of charges cannot exceed the spell's level. Cantrip items cannot support more than 1 charge.")
        return
    }
    // Pull the cost for the spell scroll
    var cSpellScroll = parseInt(item_prices.find(i => i["Spell Scrolls"] == spellLevelName)["Cost (To Purchase)"])
    console.log(`Cost - Spell Scroll: ${cSpellScroll}`)
    // Pull the cost for the spell slot
    var cSpellSlot = parseInt(item_prices.find(i => i["Spell Scrolls"] == spellLevelName)["Cost (For Service) + Materials"])
    console.log(`Cost - Spell Slot: ${cSpellSlot}`)
    // Calculate cost of spell scrolls
    var pSpellScrolls = parseInt(numCharges * cSpellScroll)
    console.log(`Price - Spell Scrolls: ${pSpellScrolls}`)
    // Calculate cost of spell slots
    var pSpellSlots = parseInt(numCharges * cSpellSlot)
    console.log(`Price - Spell Slots: ${pSpellSlots}`)
    // Calculate total price
    var pTotal = parseInt(pSpellScrolls + pSpellSlots)
    console.log(`Price - Total: ${pTotal}`)
    // Calculate total time to make
    var tTotal = parseInt((spellLevel * 8) * numCharges)
    console.log(`Time - Workhours: ${tTotal}`)
    // Calculate the # of workdays the character has to wait
    var tDays = parseInt(tTotal / 8)
    console.log(`Time - Workdays: ${tDays}`)
    // Print the output
    var p = document.createElement('p')
    p.innerHTML = `<h2>Output</h2>
                    <b>Total Price:</b> ${pTotal.toLocaleString()} gp <br>
                    <b>Total Days:</b> ${tDays.toLocaleString()} workdays <br>
                    <b>Total Workhours:</b> ${tTotal.toLocaleString()} workhours<br>
                    <b>Cost for Spell Scrolls:</b> ${pSpellScrolls.toLocaleString()} gp<br>
                    <b>Cost for Spell Slots:</b> ${pSpellSlots.toLocaleString()} gp <br>`
    document.getElementById("output1").appendChild(p)
}