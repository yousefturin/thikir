import pandas as pd

# Read the Excel file into a DataFrame
df = pd.read_excel('C:/my_file/thikir/assets/dbRAW/testAthkar_db.xlsx')

# Initialize variables
data = []
current_item = None
current_subitems = []

# Iterate through the DataFrame rows
for index, row in df.iterrows():
    if not pd.isna(row['name']):
        if current_item:
            current_item['subItems'] = current_subitems
            data.append(current_item)
            current_subitems = []
        current_item = {
            'name': row['name'],
            'description': row['description'],
            'title': row['title'],
            'subItems': []
        }
    sub_item = {
        'name': row['name'],  # Use the same column for sub-item names
        'repTime': row['repTime'],
        'count': int(row['count']),
        'subItemName': row['subItemName'],
        'subItemDescription': row['subItemDescription']
    }
    current_subitems.append(sub_item)

# Append the last item
if current_item:
    current_item['subItems'] = current_subitems
    data.append(current_item)

# Combine items with the same name
combined_data = []
for item in data:
    if not any(d['name'] == item['name'] for d in combined_data):
        combined_data.append(item)
    else:
        for d in combined_data:
            if d['name'] == item['name']:
                d['subItems'] += item['subItems']

# Define a JavaScript variable and assign the data as an array of objects
js_code = 'const myData = ' + str(combined_data)

# Write the JavaScript code to a .js file
with open('output_data.js', mode='w', encoding='utf-8') as js_file:
    js_file.write(js_code)

print("JavaScript data has been written to 'output_data.js'")
