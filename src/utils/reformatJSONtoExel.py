import pandas as pd

# Load JSON data
with open('C:/my_file/thikir/src/db/db_HADITH.json', 'r') as file:
    data = pd.read_json(file)

# Convert JSON to XLSX
data.to_excel('output.xlsx', index=False)