# ===============
#    Functions
# ===============
# Source: https://www.w3resource.com/python-exercises/string/python-data-type-string-exercise-96.php
from re import sub
def camel_case(s):
    s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
    return ''.join([s[0].lower(), s[1:]])
# ===============
#    Load File
# ===============
import pandas as pd # Import Pandas
xlsx = pd.ExcelFile('Homebrew Rules Tables.xlsx') # Read the XLSX using Pandas
sheets = xlsx.sheet_names # Get the sheet names
jsFile = open(f"data.js", "w") # Create a new file with a file version
# =============================
#    Process the Pages sheet
# =============================
dfPages = pd.read_excel(xlsx, sheet_name='Pages') # Load the Pages sheet into a DF
pagesJSON = dfPages.to_json(orient='records') # Convert it into a JSON
objName = 'pages' # Set up the name of the JavaScript object
obj = f'let {objName} = ' # Set up the JavaScript code
obj += pagesJSON # Append the JSON to the JavaScript object string
jsFile.write(obj) # Write the JavaScript object to the file
# ==================================================
#    Process the Tables from the Remaining Sheets
# ==================================================
pages = list(dfPages['NAME']) # Get the page names as a list
for page in pages: # Loop through all the pages
    if page == 'Home': continue # Check if this item is "Home" and skip it if it is
    df = pd.read_excel(xlsx, sheet_name=page) # Turn the sheet into a DataFrame
    prevNullRow = False # Set up the previous null row
    if df.shape[0] > 0: # Only proceed if the DataFrame is not emtpy
        for idx, row in df.iterrows(): # Loop through all the rows of the DataFrame
            isNull = (df[idx:idx+1].isnull().all(axis=1)).to_list()[0] # Get a boolean of whether this row is all NaN
            if isNull or df.shape[0] - 1 == idx: # Check if this row is NaN
                if prevNullRow: table = df[prevNullRow + 1:idx].reset_index(drop=True) # Splice the table out using the last noted NaN row's index
                else: table = df[0:idx].reset_index(drop=True) # Splice the table out starting from index 0
                tableName = table[table.columns[0]][0] # Pull out the table's name
                tableLength = table.shape[0] # Get the table's length
                table = table[1:tableLength] # Splice the table
                table = table.dropna(axis=1, how='all') # Drop all NaN columns
                table.columns = table.iloc[0] # Set the first row to the column headers
                table = table[1:] # Drop the first row of and reset the index
                table = table.to_json(orient='records') # Convert it to a JSON
                prevNullRow = idx # Set the previous null row index to the current index
                jsObjectName = camel_case(tableName.replace("&", "and")) # Fix the Table Name so it can be used in the JS file
                jsFile.write(f"\nlet {jsObjectName} = {table}") # Write the table to the JS file
# ====================================
#    Process the Page Content Sheet
# ====================================
dfPageContent = pd.read_excel(xlsx, sheet_name="Page Content")
contentJSON = dfPageContent.to_json(orient='records')
jsFile.write(f"\nlet pageContent = {contentJSON}")
jsFile.close() # Close the file