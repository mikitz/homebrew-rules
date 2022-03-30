function trainingAbilityScore(){
    // Inputs
    const currentScore = parseInt(document.getElementById('current-ability-score').value) // Get the user's current ability score
    const desiredScore = parseInt(document.getElementById('desired-ability-score').value) // Get the user's desired ability score
    const outputElement = document.getElementById('right-column') // Get the outpu element
    outputElement.innerHTML = '' // Clear the output element
    // Calculate
    if ( currentScore >= desiredScore || !currentScore || !desiredScore ) return alert("Your Desired Score must be greater than your Current Score.") // Alert the user if their desired ability score is higher than their current score
    const numSuccesses = additionFactorialize(desiredScore) - additionFactorialize(currentScore) // Compute the number of required successes
    // Update DOM
    outputElement.innerHTML = `<h3>Output</h3>
                                <b>Current Score:</b> ${currentScore}<br>
                                <b>Desired Score:</b> ${desiredScore}<br>
                                <b>Number of Successes Needed:</b> ${numSuccesses}`
}