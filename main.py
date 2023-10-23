# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

import gmplot
import matplotlib.pyplot as plt
import numpy as np

# Create a basic Google Maps plot using gmplot
gmap = gmplot.GoogleMapPlotter(37.7749, -122.4194, 13)

# Add some sample locations
latitudes = [37.775, 37.776, 37.777]
longitudes = [-122.418, -122.417, -122.416]
gmap.scatter(latitudes, longitudes, 'r', size=40, marker=False)

# Create an AR overlay using matplotlib
fig, ax = plt.subplots()
ax.imshow(plt.imread("camera_feed.jpg"))  # Replace with your camera feed image

# Add AR elements (for example, arrows) as annotations
for i in range(len(latitudes) - 1):
    x = [longitudes[i], longitudes[i + 1]]
    y = [latitudes[i], latitudes[i + 1]]
    ax.annotate("→", xy=(x[1], y[1]), xytext=(x[0], y[0]), fontsize=12, arrowprops=dict(arrowstyle='->'))

plt.show()
# def print_hi(name):
#     # Use a breakpoint in the code line below to debug your script.
#     print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.
#
#
# # Press the green button in the gutter to run the script.
# if __name__ == '__main__':
#     print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
