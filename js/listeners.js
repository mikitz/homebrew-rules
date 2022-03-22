function listenersCrafting(){
    // ====================
    //    Crafting  Time
    // ====================
    // Get elements
    const elements = document.querySelectorAll('.num-input')
    // Loop through each element
    elements.forEach(element => {
        // Add the listener
        element.addEventListener('input', function(){
            calculate_crafting_time()
        })
    });
    // ====================
    //   Custom Magic Item
    // ====================
    // Get Elements
    const elementsMagicItem = document.querySelectorAll('.dropdown')
    // Loop through them
    elements.forEach(element => {
        // Add Listener
        element.addEventListener('change', function(){
            customMagicItem()
        })
    });
    // ====================
    //  Crafting Constructs
    // ====================

    // =====================================
    //  Adding More Charges to a Magic Item
    // =====================================

}

function listenersMechanics(){
    // ====================
    //    Jail Sentence
    // ====================
    document.getElementById('charges-input').addEventListener('input', function() { calcJailSentence() }) // Charges input
    // =========================
    //  Cargo Transport Revenue
    // =========================

    // ======================
    //    Sailing Duration
    // ======================
    // Get all the elements
    const dropdowns = document.querySelectorAll('.dropdown')
    // Loop through them
    dropdowns.forEach(element => {
        element.addEventListener('change', function(){
            calculate_sail_duration_and_cargo_revenue()
        })
    });
    // Get all the elements
    const numInputs = document.querySelectorAll('.text-input')
    // Loop through them
    numInputs.forEach(element => {
        element.addEventListener('input', function(){
            calculate_sail_duration_and_cargo_revenue()
        })
    });
    // ======================
    //    Mercenary Cost
    // ======================
    document.getElementById('quantity-input').addEventListener('input', function() { calculateCost() }) // Quantity Input
    document.getElementById('cr-input').addEventListener('change', function(){ calculateCost() }) // CR Input
    // ================
    //     Business
    // ================

    // ======================
    //     Bounty Reward
    // ======================
    document.getElementById('most-wanted-input').addEventListener('change', function(){ calculate_bounty() }) // Most Wanted Status input
    document.getElementById('cr-input').addEventListener('change', function(){ calculate_bounty() }) // CR input
}

function listenersSkills(){
    // ====================
    //       Training
    // ====================
    // TRAINING HOURS REQUIRED
        // Get Success Elements
        const successes = document.querySelectorAll('.success')
        // Loop through
        successes.forEach(element => {
            // Add Listener
            element.addEventListener('input', function(){
                calculateTrainingHours()
            })
        });
    // TRAINING ROLLER
        // Get Success Elements
        const rollers = document.querySelectorAll('.roller')
        // Loop through
        rollers.forEach(element => {
            // Add Listener
            element.addEventListener('input', function(){
                trainingRoller()
            })
        });
}

function listenersSpells(){
    // =====================
    //   Spell Experiments
    // =====================
    // Function for the listeners
    function spellExperiementsListeners(){
        // Generate Radio Button        
        document.getElementById('generate').addEventListener('change', function() {
            var get = document.getElementsByName('get') // Get all the elements with this name
            get.forEach(element => { // Loop through each one
                if (element.checked){ get = element.value } // Set Get based on which is selected
            })
            const getSpan = document.getElementById('get-type') // Get the span to populate
            if (get == 'generate'){
                getSpan.innerHTML = ``
                getSpan.innerHTML = `<select id="character-list-dropdown">
                                        <option value="choose">Select Character</option>
                                    </select>
                                    <select id="class-dropdown">
                                        <option value="choose">Select Class</option>
                                        <option value="Artificer">Artificer</option>
                                        <option value="Bard">Bard</option>
                                        <option value="Cleric">Cleric</option>
                                        <option value="Druid">Druid</option>
                                        <option value="Paladin">Paladin</option>
                                        <option value="Ranger">Ranger</option>
                                        <option value="Sorcerer">Sorcerer</option>
                                        <option value="Warlock">Warlock</option>
                                        <option value="Wizard">Wizard</option>
                                    </select>`
                document.getElementById('gen-load-button').innerText = 'Generate Table'
            } else {
                getSpan.innerHTML = ``
                getSpan.innerHTML = `<select id="character-list-dropdown">
                                        <option value="choose">Select Character</option>
                                    </select>`
                document.getElementById('gen-load-button').innerText = 'Load Table'
            }
            populateCharacterDropdown()
        })
        // Load Radio Button
        document.getElementById('load').addEventListener('change', function() {
            var get = document.getElementsByName('get') // Get all the elements with this name
            get.forEach(element => { // Loop through each one
                if (element.checked){ get = element.value } // Set Get based on which is selected
            })
            const getSpan = document.getElementById('get-type') // Get the span to populate
            if (get == 'generate'){
                getSpan.innerHTML = ``
                getSpan.innerHTML = `<select id="character-list-dropdown">
                                        <option value="choose">Select Character</option>
                                    </select>
                                    <select id="class-dropdown">
                                        <option value="choose">Select Class</option>
                                        <option value="Artificer">Artificer</option>
                                        <option value="Bard">Bard</option>
                                        <option value="Cleric">Cleric</option>
                                        <option value="Druid">Druid</option>
                                        <option value="Paladin">Paladin</option>
                                        <option value="Ranger">Ranger</option>
                                        <option value="Sorcerer">Sorcerer</option>
                                        <option value="Warlock">Warlock</option>
                                        <option value="Wizard">Wizard</option>
                                    </select>`
                document.getElementById('gen-load-button').innerText = 'Generate Table'
            } else {
                getSpan.innerHTML = ``
                getSpan.innerHTML = `<select id="character-list-dropdown">
                                        <option value="choose">Select Character</option>
                                    </select>`
                document.getElementById('gen-load-button').innerText = 'Load Table'
            }
            populateCharacterDropdown()
        })
        document.getElementById('gen-load-button').addEventListener('click', function(){ generateSpellTables() }) // Generate/Load Button
        // document.getElementById('perform-magical-experiment-button').addEventListener('click', function(){ performMagicalExperiement() }) // Perform Magical Experiment Button
    }
}

function listenersWorld(){
    // ====================
    //  Level Demographics
    // ====================
    // Get Dropdowns
    const dropdowns = document.querySelectorAll('.dropdown')
    // Loop through the dropdowns
    dropdowns.forEach(element => {
        // Add Listener
        element.addEventListener('change', function(){
            calculate_level_demographics()
        })
    });
    // Listener function for the city-list select dropdown
    function cityListListener(){
        // Get value
        const value = document.getElementById('city-list').value
        // If not custom 
        if (value != 'custom'){
            // LOCAL STORAGE PULL
                // Cities
                const cities = JSON.parse(localStorage.getItem('city_list'))
                // Name
                const name = cities.find(i => i.NAME === value).NAME
                // Population
                const population = cities.find(i => i.NAME === value).POPULATION
                // Wealth
                const wealth = cities.find(i => i.NAME === value).WEALTH
                // Magicness
                const magicness = cities.find(i => i.NAME === value).MAGICNESS
            // ADJUST INPUTS
                // Change Name
                document.getElementById('name').value = name
                // Change Population
                document.getElementById('population').value = population
                // Change Wealth
                document.getElementById('wealth').value = wealth
                // Change Magicness
                document.getElementById('magicness').value = magicness
        } else {
            // Change Name
            document.getElementById('name').value = ''
            // Change Population
            document.getElementById('population').value = ''
            // Change Wealth
            document.getElementById('wealth').value = 'wretched'
            // Change Magicness
            document.getElementById('magicness').value = "low-magic"
        }
    }
}