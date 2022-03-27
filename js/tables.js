// Function to lower case all but first letter
// Source: https://stackoverflow.com/a/40195890/3725925
function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}
// Define a function to convert a string to Title case
// Source: https://stackoverflow.com/a/5574446/3725925
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
// Function to build a table from a Dictionary
function buildTable(tablename, tableclass) {
    tableData = eval(tablename)
    // GET COL NAMES
        // Get the Keys of the table
        var vKeys = Object.keys(tableData[0])
        // Make a new list for the keys
        var lKeys = []
        // Iterate over the keys
        vKeys.forEach((element) => {
            // Replace underscores with space
            var key = element.replace("_", " ")
            // Transform to title-case
            key = lowerCaseAllWordsExceptFirstLetters(key)
            // Check if all letter are lowercase
            if (key === key.toLowerCase()) {
                // Convert to title case
                key = key.toTitleCase()
            }
            // Push it to a new list
            lKeys.push(key)
        })    
    // CREATE TABLE
        // Table
        var table = document.createElement('table')
        table.setAttribute("id", `${tablename}-table`)
        table.setAttribute("class", tableclass)
        // HEADER
            // Create the head element
            var tableHead = document.createElement('thead')
            tableHead.setAttribute("id", "header")
            // Append row to the header
            var headerRow = document.createElement('tr')
            headerRow.setAttribute("id", 'header_row')
            tableHead.appendChild(headerRow)
            // Append the column names to the header row
            lKeys.forEach((element) => {
                var td = document.createElement('th')
                td.innerHTML = `<button class='table_button'>${element.replaceAll("-", " ").replaceAll("_", " ").toTitleCase()}</button>`
                headerRow.appendChild(td)
            })
            // Append the table header to the table
            table.appendChild(tableHead)
        // BODY
            // Create the body element
            var tableBody = document.createElement('tbody')
            tableBody.setAttribute("id", "table_body")
            // Append the table body to table
            table.appendChild(tableBody)
            // Loop through each row of the database table
            for (row = 0; row < tableData.length; row++) {
                // Append a row to the table
                var tableRow = document.createElement('tr')
                tableBody.appendChild(tableRow)
                // Loop through each key
                for (key = 0; key < vKeys.length; key++) {
                    // Key
                    var blah = vKeys[key]
                    // Pull the value
                    var value = tableData[row][blah]
                    // Create a TD element
                    var td = document.createElement('td')
                    td.innerHTML = value
                    tableRow.appendChild(td)
                }
            }
    // Apply datatable
    document.getElementById('content').appendChild(table)
    return table
}
// Function to apply datatable
function applyDataTable(elementName){
    $(document).ready(function() {
        $(`#${elementName}`).DataTable();
    } );
}