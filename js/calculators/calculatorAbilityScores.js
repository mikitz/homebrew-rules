function trainingAbilityScore(){
    // Inputs
    const currentScore = parseInt(document.getElementById('current-ability-score').value)
    const desiredScore = parseInt(document.getElementById('desired-ability-score').value)
    const outputElement = document.getElementById('right-column')
    outputElement.innerHTML = ''

    const output = `<h3>Output</h3>
                    <b>Current Score:</b> ${currentScore}<br>
                    <b>Desired Score:</b> ${desiredScore}`
    outputElement.innerHTML = output
}