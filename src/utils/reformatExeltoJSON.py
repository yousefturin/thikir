import pandas as pd

# Load Excel data into a DataFrame
df = pd.read_excel('C:/my_file/thikir/assets/namesOfAllahEn.xlsx')

# Convert DataFrame to JSON
json_data = df.to_json(orient='records')

# Save JSON data to a file
with open('db_namesOfAllahEn.json', 'w') as json_file:
    json_file.write(json_data)
