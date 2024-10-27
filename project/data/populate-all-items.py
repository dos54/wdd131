import os
import json

# Define the directory containing the JSON files
output_directory = '.\project\data'
directory = os.path.join(output_directory, 'gallery-items')


# List to hold the file names
json_files = []

# Loop through the directory and find all JSON files
for filename in os.listdir(directory):
    if filename.endswith('.json'):
        json_files.append(filename)

# Define the output file path
output_file = os.path.join(output_directory, 'all-items.json')

# Write the list of JSON files to all-items.json
with open(output_file, 'w') as f:
    json.dump(json_files, f, indent=4)

print(f"File names written to {output_file}")
