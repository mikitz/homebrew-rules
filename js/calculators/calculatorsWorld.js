// Function to set the dropdown to the saved index
function setDropdown(){
    // Set up the dropdown by ID
    const idxMagicness = document.getElementById("magicness")
    // Pull data from localStorage
    let dMagicness = localStorage.getItem('magicness')
    // Set the selected index
    idxMagicness.selectedIndex = parseInt(dMagicness)
}
// Calculate level demographics
function calculate_level_demographics(){ 
    document.getElementById("output").innerHTML = ""
    document.getElementById('table_output_body').innerHTML = ""

    // USER INTPUTS
        // Get the level
        var a = document.getElementById("lvl")
        var level = a.options[a.selectedIndex].text
        // Turn level into an int if it's not "All"
        if (level != "All") {level = parseInt(level)}
        // Get the population
        var pop = parseInt(document.getElementById("population").value)
        // Get wealth
        var wealth = document.getElementById('wealth').value
        // Get magicness
        var magicness = document.getElementById('magicness').value

    // PULL NECESSARY DATA
        // Pull the wealth mod
        var modWealth = tableWealth.find(i => i.WEALTH == wealth).MODIFIER
        // Pull the magicness mod
        var modMagicness = tableMagicness.find(i => i.MAGICNESS == magicness).MODIFIER

    // CALCULATE
        // Calculate the demographics
        if (level === "All") {
            document.getElementById('output').innerHTML = `Population: ${pop.toLocaleString()}`
            // Loop through each level and calculate its population
            for (lvl = 1; lvl < 20 + 1; lvl++) {
                // Get the respective percentage
                var perc = oaData.find(i => i.lvl == lvl).perc_of_pop
                var demographics = parseInt(Math.round(pop * perc))
                demographics = parseInt(Math.round((demographics * modMagicness) * modWealth))
                // Log it
                console.log(`Level ${lvl}: ${demographics}`)
                // // Build it
                // var vMessage = `Level ${lvl.toLocaleString()}: ${demographics.toLocaleString()} person(s)`
                // // Output it
                // var ul = document.createElement('li')
                // ul.innerHTML = vMessage
                // document.getElementById('output_list').appendChild(ul)

                // Create a new row in the table
                var row = document.createElement('tr')
                row.setAttribute('id', `lvl-${lvl}`)
                document.getElementById('table_output_body').appendChild(row)
                // Add the level to the row
                const tLevel = document.createElement('td')
                tLevel.setAttribute("style", "padding: 5px 5px")
                tLevel.innerHTML = lvl
                row.appendChild(tLevel)
                // Add the popuulation to the row
                const tPop = document.createElement('td')
                tPop.setAttribute("style", "padding: 5px 5px")
                tPop.innerHTML = demographics
                row.appendChild(tPop)
                // Append the row to the table
            }
        } else {
            // Get the respective percentage
            var perc = oaData.find(i => i.lvl == level).perc_of_pop
            var demographics = parseInt(Math.round(pop * perc))
            // Print the output
            var p = document.createElement('p')
            p.innerHTML = `Level ${level.toLocaleString()}: ${demographics.toLocaleString()} person(s)`
            document.getElementById("output").appendChild(p)
        }
    
}
// Function to add a City
function addCity(){
    // USER INPUTS
        // Population
        const pop = parseInt(document.getElementById("population").value)
        // Wealth
        const wealth = document.getElementById('wealth').value
        // Magicness
        const magicness = document.getElementById('magicness').value
        // Name
        const name = document.getElementById('name').value
    // LOCAL STORAGE PULL
        // Check if city_list exists
        if (!localStorage.getItem('city_list')) {
            // Set an empty array if not
            localStorage.setItem('city_list', '[]')
        }
        // Parse the JSON to read it
        let cityList = JSON.parse(localStorage.getItem('city_list'))
        // console.log(cityList)
    // ERROR STOP
        // See if name is blank
        if (!name || !pop) {
            alert("Please enter a name and/or population before you save the city")
            return
        }
    // LOCAL STORAGE PUSH
        // JSON Object
        const city = {"NAME": name,
                    "POPULATION": pop,
                    "WEALTH": wealth,
                    "MAGICNESS": magicness}
        // Push to the array        
        cityList.push(city)
        // Set local storage
        localStorage.setItem('city_list', JSON.stringify(cityList))
    // SET DROPDOWN
    setCityDropdown()
}
// Function to set the Cities select dropdown
function setCityDropdown(){
    // LOCAL STORAGE PULL
        // Cities
        const cities = JSON.parse(localStorage.getItem('city_list'))
    // DROPDOWN
        // Cities Dropdown
        var citiesDrop = document.getElementById('city-list')
        // Clear it
        citiesDrop.innerHTML = ''
        // Add Select City
        const selectCity = document.createElement('option')
        // Set its inner html
        selectCity.innerHTML = 'Select a City'
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