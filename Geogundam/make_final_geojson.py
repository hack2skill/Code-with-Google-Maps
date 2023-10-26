import time
import json

prev_data = ""

while True:
    # Step 1: Read the contents of `coordinates.geojson`
    with open('coordinates.geojson', 'r') as f:
        data = f.read()

    # Step 2: Compare the contents with the previous contents
    if data != prev_data:
        prev_data = data

        # Wrap data inside `geojson_callback()`
        wrapped_data = f"geojson_callback({data})"

        # Step 3: Update `final_coordinates.geojson` with the new data
        with open('final_coordinates.js', 'w') as f_out:
            f_out.write(wrapped_data)

    # Step 4: Repeat this process every 5 seconds
    time.sleep(5)
