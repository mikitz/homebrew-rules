// Function to select the contents of an element
// Source: https://www.codegrepper.com/code-examples/javascript/frameworks/nextjs/copy+a+table+to+clipboard+javascript
function selectElementContents(el) {
	var body = document.body, range, sel;
	if (document.createRange && window.getSelection) {
		range = document.createRange()
		sel = window.getSelection()
		sel.removeAllRanges()
		try {
			range.selectNodeContents(el)
			sel.addRange(range)
		} catch (e) {
			range.selectNode(el)
			sel.addRange(range)
		}
        document.execCommand("copy");
	} else if (body.createTextRange) {
		range = body.createTextRange()
		range.moveToElementText(el)
		range.select()
        range.execCommand("Copy")
	}
}
// Define a function to convert a string to Title case
String.prototype.toTitleCase = function () {
    // Define a list of words not to be capitalized
    const doNotCapitalize = ['a', 'an', 'the', 'for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'at', 'around', 'by', 'after', 'along', 'for', 'from', 'of', 'on', 'to', 'with', 'without']
    // Split the string by spaces
    return this.replace(/\w\S*/g, function(txt){
        if (doNotCapitalize.includes(txt)){
            return txt
        } else {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }        
    });
};
// Function to scroll to an HTML hash
function scrollTo(hash) {
    location.hash = "#" + hash;
}
// Function to insert an element after a reference element
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// Function to add Tippy
function addTippy(elemeentID, message){
    tippy(`#${elemeentID}`, {
        content: message,
    })
}

// Convertts a string into Camel Case
// Source: https://stackoverflow.com/a/2970667
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
// Function for the proper ordinal
// Source: https://stackoverflow.com/a/13627586/3725925
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
// Function to return text color based on background color
// Source: https://stackoverflow.com/a/41491220/3725925
function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 150) ?
        darkColor : lightColor;
}
// Function to make a color darker or
// Version 4.0
// Source: https://stackoverflow.com/a/13542669/3725925
function colorTransformer(p,c0,c1,l) {
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
// Function to make a toast
function makeToast(content, kind){
    new Toast({
        message: content,
        type: kind
    })
}
// Function to convert to military time
function convertTime(hour){
    if (hour < 10){
        var time = `0${hour}00`
    } else {
        var time = `${hour}00`
    }
    return time
}
// Function to make it easier to add a Tippy
function addTippy(id, content){
    tippy(`#${id}`, {
        content: `${content}`,
      });
}
// Function to get a selected value from a radio group
function getSelectedValueFromRadioGroup(radioGroupName){
    let initialize = document.getElementsByName(radioGroupName)
    initialize.forEach(element => {
        if (element.checked){ initialize = element.value }
    })
    return initialize
}
// Function to export to CSV
function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
// Function to help with sleeping
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Function to update the historical log of a given input
function updateLog(type, name){
    // FIRESTORE PULL
    import('/src/pages/profile/firebaseInit.js').then((init)=> { 
        // IMPORTS
            let db = init.db
            let auth = init.auth
            let onAuthStateChanged = init.onAuthStateChanged
            let collection = init.collection
            let getDocs = init.getDocs
    // Work with the FireStore Database
        onAuthStateChanged(auth, (user) => { // Check if User is logged in
            if (user){
                let transactions = []
                let attribute = ''
                if (type === 'campaign'){
                    attribute = localStorage.getItem('selectedCampaign')
                } else {
                    attribute = localStorage.getItem('selectedCharacter')
                }
                const colRef = collection(db, `${type}s`, user.uid, attribute, name, `${name}_history`) // Define the collection for which we want all docs from
                getDocs(colRef).then((snapshot) => { // Get all the docs within the above collection
                    snapshot.forEach(doc => { // Loop through each doc
                        if (doc.id != 'placeholder'){ // Skip the placeholder doc
                            transactions.push(doc.data()) // Push the doc's data to the array
                        }
                    });
                    if (transactions.length != 0) {
                        // Populate the table
                        displayColumns(transactions, 'styled-table', `${name}-table`)
                    } else {
                        // Set table to empty
                        document.getElementById(`${name}-table`).innerHTML = `No data present for <b>${attribute}</b>. Try applying <b>${name}</b> changes for the history to appear here.`
                        console.log('No table data in the xp ledger.')
                    }
                }).catch(error => { console.log(error) }) // getDoc Errors
            }
        })
    }).catch(error => { console.log(error) }) // Auth Errors
}
function roughSizeOfObject( object ) {
    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}
// Function to get the number of users
function getNumberOfUsers(){
    import('/src/pages/profile/firebaseInit.js').then((init)=> { 
        // IMPORTS
            let db = init.db
            let getDocs = init.getDocs
            let collection = init.collection
        // GET DATA
        const userCollection = collection(db, "users")
        let numUsers = 0
        getDocs(userCollection).then((snapshot) => {
            snapshot.forEach(element => {
                numUsers += 1
            })
            // VARIABLES
            const numUsersRemaining = 333 - numUsers
            // UPDATE DOM
            document.getElementById('num-users').innerHTML = numUsers
            document.getElementById('num-users-remaining-until-payments').innerHTML = numUsersRemaining
        }).catch(error => { console.log(error) }) // Auth Errors  
    }).catch(error => { console.log(error) }) // Auth Errors  
}
// Function to round a number
Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
}
// Declare a function to select a random value from a dictionary
// Source: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
// Function to get a random integer
// Source: https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return parseInt((Math.floor(Math.random() * ((max+1) - min)) + min))
}
// Function to set to a selection
// Source: https://stackoverflow.com/questions/78932/how-do-i-programmatically-set-the-value-of-a-select-box-element-using-javascript
function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
// Clears an HTML element
function clear(id){
    document.getElementById(id).innerHTML = ""
}
// Clears "output1"
function clear_output1(){
    document.getElementById('output1').innerHTML = ""
}
// Define a function to convert a string to Title case
String.prototype.toTitleCase = function () {
    // Define a list of words not to be capitalized
    const doNotCapitalize = ['a', 'an', 'the', 'for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'at', 'around', 'by', 'after', 'along', 'for', 'from', 'of', 'on', 'to', 'with', 'without']
    // Split the string by spaces
    return this.replace(/\w\S*/g, function(txt){
        if (doNotCapitalize.includes(txt)){
            return txt
        } else {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }        
    });
};
// Function to remove an element from an array
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
// Define a dice function to roll multiple dice
function fMultiRoll(number_of_dice, dice_sides, multiplier) {
    // Define an empty array to store the rolls
    aRolls = []
    // Parse integers
    var number_of_dice = parseInt(number_of_dice)
    var dice_sides = parseInt(dice_sides)
    var multiplier = parseInt(multiplier)
    // Set total to zero
    //var total = 0
    // Loop through all the dice and return random integers
    if (number_of_dice > 1) {
        for (x = 0; x < number_of_dice; x++) {
            a = getRndInteger(1, dice_sides)
            aRolls.push(a)
            // total += a
        }
        // Get the sum of the array
        var total = aRolls.reduce((a, b) => a + b, 0) * multiplier
    } else {
        var total = getRndInteger(1, dice_sides)
    }
    return parseInt(total)
}
// Define a function to replace a string by index range
// Source: https://stackoverflow.com/a/12568270/3725925
function replaceRange(str, start, end, substitute) {
    return str.substring(0, start) + substitute + str.substring(end);
}

// Function to convert inches to f'in"
function convertInches(inches) {
    let feetFromInches = Math.floor(inches / 12);//There are 12 inches in a foot
    let inchesRemainder = inches % 12;
 
    let result = feetFromInches + "'" + inchesRemainder + '\"';
    return result
}

// Define a function to populate an HTML element
function populateElement(id, contents, type){
    // Print the output
    var p = document.createElement(type)
    p.innerHTML = contents
    document.getElementById(id).appendChild(p)
}
// Function to parse JSON data and turn it into an HTML table
// Source: https://stackoverflow.com/a/21065846/3725925
function JSONtoHTMLTable(){
    var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');

    // Builds the HTML Table out of myList json data from Ivy restful service.
    function buildHtmlTable(arr) {
    var table = _table_.cloneNode(false),
        columns = addAllColumnHeaders(arr, table);
    for (var i = 0, maxi = arr.length; i < maxi; ++i) {
        var tr = _tr_.cloneNode(false);
        for (var j = 0, maxj = columns.length; j < maxj; ++j) {
        var td = _td_.cloneNode(false);
        cellValue = arr[i][columns[j]];
        td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
        tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
    }

    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records
    function addAllColumnHeaders(arr, table) {
    var columnSet = [],
        tr = _tr_.cloneNode(false);
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var key in arr[i]) {
        if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
            columnSet.push(key);
            var th = _th_.cloneNode(false);
            th.appendChild(document.createTextNode(key));
            tr.appendChild(th);
        }
        }
    }
    table.appendChild(tr);
    return columnSet;
    }
}

// Function to roll on a table and pull the value from the specified key
function rollTableKey(table, keyLast){
    // Get the first key
        if (table.length > 0) {
            var columnsIn = table[0]
            for(var keyFirst in columnsIn) {
                break
            }
        } else {
            var keyFirst = 'No Columns'
        } 
        // Log the first key
        console.log(`First Key: ${keyFirst}`)
    // Get the last key
        if (table.length > 0) {
            var columnsIn = table[0]
            var x = 0
            for(var keyLast in columnsIn) {
                x = x + 1
                if (x = columnsIn.length - 1) {
                    break
                }
            }
        } else {
            var keyLast = 'No Columns'
        } 
        // Log the last key
        console.log(`Last Key: ${keyLast}`)
    // Get number of sides
        const NewRegEx = /\d\d*/gm
        var sides = keyFirst.match(NewRegEx)
        sides = parseInt(sides[0])
        // Log it
        console.log(`Sides: ${sides}`)
    // Roll the die
        var roll = getRndInteger(1, sides)
        console.log(`Roll Table Roll: ${roll}`)
    // Find the result 
        console.log(`FIRST ROW`)
        console.log(Object.values(table)[0])
        console.log(`FIRST VALUE`)
        console.log(Object.values(table)[0][keyFirst])
        if (typeof Object.values(table)[0][keyFirst] == 'string' || Object.values(table)[0][keyFirst] instanceof String) {
            // Loop through the first key values and determine if roll is in the range
            for (r = 0; r < table.length; r++) {
                var blah = Object.values(table)[r][keyFirst]
                console.log(`BLAH: ${blah}`)
                // Parse the range
                    // Get the first number
                    const RegEx1 = /^(\d+)/gm
                    var firstNum = blah.match(RegEx1)
                    firstNum = firstNum[0]
                    console.log(`FIRST NUMBER: ${firstNum}`)
                    // Get the second number
                    const RegEx2 = /(\d+)$/gm
                    var secondNum = blah.match(RegEx2)
                    secondNum = secondNum[0]
                    console.log(`SECOND NUMBER: ${secondNum}`)
                // Determine if the roll was within the range
                if (roll <= parseInt(secondNum) && roll >= parseInt(firstNum)) {
                    var result = Object.values(table)[r][keyLast] 
                    break
                }
            }
        } else {
            // Pull the exact result
            var result = table.find(r => r[keyFirst] == roll)[`${keyLast}`]
        }
        // Log it
        console.log(`RESULT: ${result}`)
        console.log(`------------`)
        return result
}
// Function to pull a rolled result from a given table with max 2 columns
function rollTable(table){
    // Get the first key
        if (table.length > 0) {
            var columnsIn = table[0]
            for(var keyFirst in columnsIn) {
                break
            }
        } else {
            var keyFirst = 'No Columns'
        } 
        // Log the first key
        // console.log(`First Key: ${keyFirst}`)
    // Get the last key
        if (table.length > 0) {
            var columnsIn = table[0]
            var x = 0
            for(var keyLast in columnsIn) {
                x = x + 1
                if (x = columnsIn.length - 1) {
                    break
                }
            }
        } else {
            var keyLast = 'No Columns'
        } 
        // Log the last key
        // console.log(`Last Key: ${keyLast}`)
    // Get number of sides
        const NewRegEx = /\d\d*/gm
        var sides = keyFirst.match(NewRegEx)
        sides = parseInt(sides[0])
        // Log it
        // console.log(`Sides: ${sides}`)
    // Roll the die
        var roll = getRndInteger(1, sides)
        // console.log(`Roll Table Roll: ${roll}`)
    // Find the result 
        // console.log(`FIRST ROW`)
        // console.log(Object.values(table)[0])
        // console.log(`FIRST VALUE`)
        // console.log(Object.values(table)[0][keyFirst])
        if (typeof Object.values(table)[0][keyFirst] == 'string' || Object.values(table)[0][keyFirst] instanceof String) {
            // Loop through the first key values and determine if roll is in the range
            for (r = 0; r < table.length; r++) {
                var blah = Object.values(table)[r][keyFirst]
                // console.log(`BLAH: ${blah}`)
                // Parse the range
                    // Get the first number
                    const RegEx1 = /^(\d+)/gm
                    var firstNum = blah.match(RegEx1)
                    firstNum = firstNum[0]
                    // console.log(`FIRST NUMBER: ${firstNum}`)
                    // Get the second number
                    const RegEx2 = /(\d+)$/gm
                    var secondNum = blah.match(RegEx2)
                    secondNum = secondNum[0]
                    // console.log(`SECOND NUMBER: ${secondNum}`)
                // Determine if the roll was within the range
                if (roll <= parseInt(secondNum) && roll >= parseInt(firstNum)) {
                    var result = Object.values(table)[r][keyLast] 
                    break
                }
            }
        } else {
            // Pull the exact result
            var result = table.find(r => r[keyFirst] == roll)[`${keyLast}`]
        }
        // Log it
        // console.log(`RESULT: ${result}`)
        // console.log(`------------`)
        return result
}

// Function to roll dice inside a string
function rollDice(myString){
    // Extract dice groups from encounter
    const NewRegEx = /(?:\d+d\d*\+?\d*)/gm
    var aDice = myString.match(NewRegEx)
    // Check to see if aDice is not empty
    if (aDice) {
        var encounterF = myString
        // Log for debugging
        // Loop through aDice and calculate totals for each element
        for (i = 0; i < aDice.length; i++) {
            // Extract number of dice
            const RegEx = /\d+(?=d)/g
            var num_dice = parseInt(RegEx.exec(aDice[i]))
            // Extrect Dice Sides
            const MoreRegEx = /(?<=d)(\d*)/g
            var num_of_sides = MoreRegEx.exec(aDice[i])
            num_of_sides = parseInt(num_of_sides[0])
            // Extract Modifier
            const EvenMoreRegEx = /(?<=\+)(\d*)/g
            var modifier = EvenMoreRegEx.exec(aDice[i])
            if (modifier) {modifier = parseInt(modifier[0])}
            else {modifier = 0}
            // Total
            var total = fMultiRoll(num_dice, num_of_sides, 1)
            total = total + modifier
            encounterF = encounterF.replace(aDice[i], total)
        }
    } else {
        encounterF = myString
    }
    return encounterF
}

// Function to roll dice expressed as ndx
function rollShit(myString){
    // Extract number of dice
    const RegEx = /\d+(?=d)/g
    var num_dice = RegEx.exec(myString)
    console.log(`Number of Dice: ${num_dice}`)
    // Extrect Dice Sides
    const MoreRegEx = /(?<=d)(\d*)/g
    var num_of_sides = MoreRegEx.exec(myString)
    num_of_sides = num_of_sides[0]
    console.log(`Number of Sides: ${num_of_sides}`)
    // Extract Modifier
    const EvenMoreRegEx = /(?<=\+)(\d*)/g
    var modifier = EvenMoreRegEx.exec(myString)
    if (modifier) {modifier = parseInt(modifier[0])}
    else {modifier = 0}
    // Total
    var total = fMultiRoll(num_dice, num_of_sides, 1)
    total = total + modifier
    // Log for debugging
    console.log(`${myString}'s total is ${total}`)
    // Return
    return parseInt(total)
}

// Function to replace creatures with links
function appendLink(myString) {
    // Extract creatures from the encounter 
    // Push regex matches to a list while looping through the whole DB
    var lCreatures = []
    var newregex = new RegExp('[\(*\)*]', 'gm')
    var creatureExtract = bestiary_basic.forEach(function(element){
        var nameFixed = element.name_lower.replace(newregex, '\\$&')
        console.log("NAME FIXED:", nameFixed)
        var reFull = new RegExp(`\\s(${nameFixed})`, "g")
        // RegEx still doesn't find "half-ogre (ogrillon)" or "vampire spawn"
            // Instead if finds "vampire"
        var inc = reFull.exec(myString)
        if (inc) {
            // Sort inc by length to swap out longer strings first
            inc = inc.sort(function(a, b){return b.length - a.length})
            // Loop through inc and append each element to lCreatures
            // for (m = 0; m < inc.length; m++) {
            //     lCreatures.push(inc[m])
            // }
            // Push the grouped match
            lCreatures.push(inc[1])
            console.log("INC:", inc)
        }
    })
    // Manipulate the list
    console.log("CREATURE LIST:", lCreatures)
        // Remove duplicates
        lCreatures = lCreatures.filter (function (value, index, array) { 
            return array.indexOf (value) == index;
        });
        console.log("CREATURE LIST FILTERED:", lCreatures)
        // Check if any of the elements are in the other elements
        // Loop through the list
        for (z = 0; z < lCreatures.length; z++) {
            var item = lCreatures[z].toLowerCase()
            var bookExtract = bestiary_basic.find(r => r.name_lower == item).book_lower
            console.log(`ITEM: ${item}`)
            // Escape special RegEx characters
            var newregex = new RegExp('[\(*\)*]', 'gm')
            console.log(`ITEM REPLACE: ${item}\n` + 
                        `ENCOUNTER: ${myString}`)
            // Extract all matches of the item
            var regex = new RegExp(`(${item})`, "g")
            var regMatch = myString.match(regex)
            console.log("REGMATCH")
            console.log(regMatch)
            // Log their indecies to a list
            var lIndecies = []
            while ((match = regex.exec(myString)) != null) {
                lIndecies.push(match.index)
            }
            console.log("INDEX LIST")
            console.log(lIndecies)
            // Loop through the matches by index checking
            for (m = 0; m < regMatch.length; m++) {
                // Needed variables
                var idxStart = lIndecies[m]
                var word = regMatch[m]
                var idxEnd = idxStart + word.length
                var idxRange = myString.substring(idxStart, idxEnd)
                var idxExtra = myString.substring(idxStart - 1, idxEnd + 1)
                // Check for undesirables
                var inclu = ['<','_','%','0', '>', '#'].some(el => idxExtra.includes(el))
                var incluNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
                // Replace creatures with links
                if (!inclu) {
                    wordX = bestiary_basic.find(y => y.name_lower == word).name.toLowerCase()
                    myString = replaceRange(myString, idxStart, idxEnd, linkGenerator5eTools(wordX, bookExtract))
                }                             
                // Log for debugging
                console.log(`INDEX VARS
                Start: ${idxStart}
                End: ${idxEnd}
                Word: ${word}
                Substring: ${idxRange}
                Extra: ${idxExtra}`)
            }
        }
    return myString
}

// Function to copy text of a specified element
// Source: https://stackoverflow.com/a/54498963/3725925
function copyElementText(ID) {
    if (typeof(ID) == 'object'){
        var ID = ID.id
        ID = ID.replace("name", 'char')
    }
    var text = document.getElementById(ID).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}

// FUnction to clear a generated table
function clear_table(){
    document.getElementById('table_output').innerHTML = ""
}
// Function to lower case all but first letter
// Source: https://stackoverflow.com/a/40195890/3725925
function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}

// Functions to compare values and sort a table
// Source: https://stackoverflow.com/a/55462779/3725925
function compareValues(a, b) {
    // return -1/0/1 based on what you "know" a and b
    // are here. Numbers, text, some custom case-insensitive
    // and natural number ordering, etc. That's up to you.
    // A typical "do whatever JS would do" is:
    return (a<b) ? -1 : (a>b) ? 1 : 0;
  }
  // Function to sort table by clicked column
  function sortTable(colnum) {
    // get all the rows in this table:
    let rows = Array.from(table.querySelectorAll(`tr`));
  
    // but ignore the heading row:
    rows = rows.slice(1);
  
    // set up the queryselector for getting the indicated
    // column from a row, so we can compare using its value:
    let qs = `td:nth-child(${colnum}`;
  
    // and then just... sort the rows:
    rows.sort( (r1,r2) => {
      // get each row's relevant column
      let t1 = r1.querySelector(qs);
      let t2 = r2.querySelector(qs);
  
      // and then effect sorting by comparing their content:
      return compareValues(t1.textContent,t2.textContent);
    });
  
    // and then the magic part that makes the sorting appear on-page:
    rows.forEach(row => table.appendChild(row));
  }
// Function to do something
function popSearcher(tableName, keyName, population){
    // Key
    // Loop through the first key's values and determine if population is in the range
    for (r = 0; r < tableName.length; r++) {
        var blah = Object.values(tableName)[r].Population
        // Parse the range
            // Get the first number
            const RegEx1 = /^(\d+)/gm
            var firstNum = blah.match(RegEx1)
            firstNum = firstNum[0]
            // Get the second number
            const RegEx2 = /(\d+)$/gm
            var secondNum = blah.match(RegEx2)
            secondNum = secondNum[0]
        // Determine if the population is within the range
        if (population <= parseInt(secondNum) && population >= parseInt(firstNum)) {
            // Get it
            var final = Object.values(tableName)[r][keyName]
            // Return
            return final
        }
    }
}
// Function to round a number to certain number of decimal places
// Source: https://www.codegrepper.com/code-examples/javascript/javascript+math.ciel+to+2+decimal+places
function round(num, places) {
    num = parseFloat(num);
    places = (places ? parseInt(places, 10) : 0)
    if (places > 0) {
        let length = places;
        places = "1";
        for (let i = 0; i < length; i++) {
            places += "0";
            places = parseInt(places, 10);
        }
    } else {
        places = 1;
    }
    return Math.round((num + Number.EPSILON) * (1 * places)) / (1 * places)
}