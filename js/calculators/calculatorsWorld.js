// Calculate level demographics
function demographicsCalculator(){ 
    document.getElementById("right-column").innerHTML = ""
    // USER INTPUTS
        // Get the population
        var pop = parseInt(document.getElementById("population").value)
        // Get wealth
        var wealth = document.getElementById('wealth').value
        // Get magicness
        var magicness = document.getElementById('magicness').value

    // PULL NECESSARY DATA
        // Pull the wealth mod
        var modWealth = cityWealth.find(i => i.WEALTH == wealth).MODIFIER
        // Pull the magicness mod
        var modMagicness = cityMagicness.find(i => i.MAGICNESS == magicness).MODIFIER

    // CALCULATE
        // Calculate the demographics
        const table = document.createElement('div')
        table.classList.add('flex-container')
        // Loop through each level and calculate its population
        for (lvl = 1; lvl < 20 + 1; lvl++) {
            // Get the respective percentage
            var perc = levelDemographicsData.find(i => i.LEVEL == lvl).PERCENTAGE_OF_POPULATION
            var demographics = parseInt(Math.round(pop * perc))
            demographics = parseInt(Math.round((demographics * modMagicness) * modWealth))
            if (demographics == 0) continue // Skip this one if it's 0
            // Create a new row in the table
            var row = document.createElement('div')
            row.setAttribute('class', 'flex-item')
            row.setAttribute('id', `lvl-${lvl}`)
            table.appendChild(row)
            // Add the level to the row
            const tLevel = document.createElement('span')
            // tLevel.setAttribute("style", "padding: 5px 5px")
            tLevel.innerHTML = `<b>Level ${lvl}:</b>`
            row.appendChild(tLevel)
            // Add the popuulation to the row
            const tPop = document.createElement('span')
            // tPop.setAttribute("style", "padding: 5px 5px")
            tPop.innerHTML = ` <i>${demographics}</i>`
            row.appendChild(tPop)
            // Append the row to the table
        }
        document.getElementById('right-column').appendChild(table)
}
// Function to add a City
function saveLocation(){
    // Inputs
    const pop = parseInt(document.getElementById("population").value)
    const wealth = document.getElementById('wealth').value
    const magicness = document.getElementById('magicness').value
    const name = document.getElementById('name').value
    if (!name || !pop) return alert("Please enter a name and/or population before saving a location.") // See if name is blank
    // Local Storage Pull
    if (!localStorage.getItem('location_list')) localStorage.setItem('location_list', '[]') // Check if location_list exists
    let cityList = JSON.parse(localStorage.getItem('location_list')) // Parse the JSON to read it
    const locationIdx = cityList.findIndex(i => i.NAME == name) // Get the index of this location
    console.log("Location Index:", locationIdx)
    if (locationIdx >= 0) { // Update the JSON
        cityList[locationIdx].NAME = name
        cityList[locationIdx].POPULATION = pop
        cityList[locationIdx].WEALTH = wealth
        cityList[locationIdx].MAGICNESS = magicness
    } else if (locationIdx < 0) { // Append a new Location to the JSON
        const city = { // JSON Object
                "NAME": name, 
                "POPULATION": pop,
                "WEALTH": wealth,
                "MAGICNESS": magicness
            }
        cityList.push(city) // Push to the array 
    }
    localStorage.setItem('location_list', JSON.stringify(cityList)) // Set local storage
    // Update DOM
    setCityDropdown() // Set up the City Dropdown with the new city that was just added
}
// Function to set the Cities select dropdown
function setCityDropdown(){
    // LOCAL STORAGE PULL
        // Cities
        const cities = JSON.parse(localStorage.getItem('location_list'))
    // DROPDOWN
        // Cities Dropdown
        const citiesDrop = document.getElementById('location')
        // Clear it
        citiesDrop.innerHTML = ''
        // Add Select City
        const selectCity = document.createElement('option')
        // Set its inner html
        selectCity.innerHTML = 'Select Location'
        // Set its value
        selectCity.value = 'custom'
        // Append to the dropdown
        citiesDrop.appendChild(selectCity)
    // LOOP
        if (cities) {
            // Loop through each item annd append to dropdown
            cities.forEach(element => {
                // City Name
                const name = element.NAME
                // Set up a new option
                let option = document.createElement('option')
                // Set its value
                option.value = name
                // Set its id
                option.id = name
                // Set inner HTML
                option.innerHTML = name
                // Append the option to the dropdown
                citiesDrop.appendChild(option)
            })
        }
}
// Function to set population and name based on selected city
function setInputsBasedOnSelectedLocation(){
    // Inputs
    const name = document.getElementById('location').value
    if (name == 'custom') return // If the user selects "Select Location"
    const popInput = document.getElementById("population")
    const wealthInput = document.getElementById('wealth')
    const magicnessInput = document.getElementById('magicness')
    const nameInput = document.getElementById('name')
    
    // Local Storage
    const cities = JSON.parse(localStorage.getItem('location_list')) // Get the location list from local storage
    const pop = cities.find(i => i.NAME == name).POPULATION
    const wealth = cities.find(i => i.NAME == name).WEALTH
    const magicness = cities.find(i => i.NAME == name).MAGICNESS
    // Update DOM
    popInput.value = pop
    wealthInput.value = wealth
    magicnessInput.value = magicness
    nameInput.value = name
}