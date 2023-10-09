# This file does plotting for the data clustering
import requests
from sklearn.cluster import DBSCAN
from datetime import datetime
import numpy as np
import matplotlib.pyplot as plt
import pandas as ps
from io import StringIO
from flask import Flask, request, jsonify, abort
app = Flask(__name__)

# Parse request data, if needed
# data = request.json  # Assuming you're sending JSON data in the request

# Call your existing function with the data
date = datetime.today().strftime('%Y-%m-%d')
FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e"

url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1/{date}"

response = None
try:
    response = requests.get(url)
except:
    print(f"API request failed with status code {response.status_code}: {response.text}")
    

if (response is not None):
    if (response.status_code == 200):
        # csv_string = str(response.content)
        # data = ps.DataFrame([x.split(';') for x in csv_string.split('\n')])
        # data = ps.read_csv(,dtype=str)
        line_data = np.char.split(np.array((response.content.decode()).strip().split('\n')),sep=',')
        data = np.array([np.array(line) for line in line_data])
        df = ps.DataFrame(data=data[1:,:],columns=data[0,:])
        print(data)
        print(data.shape)
        print(df)
        print(df.shape)
    else:
        # Handle errors, e.g., print the status code and error message
        print(f"API request failed with status code {response.status_code}: {response.text}")
            
coordinates = df[["latitude","longitude"]].to_numpy().astype(float)
filter = np.array([confidence > 30 if isinstance(confidence,float) else ((confidence == "n") | (confidence == "h")) for confidence in df["confidence"]])
print(coordinates[filter])
db = DBSCAN(0.1,min_samples=3).fit(coordinates[filter])

labels = db.labels_
unique_labels = set(labels)
core_samples_mask = np.zeros_like(labels, dtype=bool)
core_samples_mask[db.core_sample_indices_] = True
print(labels.size)
print(len(unique_labels))
# colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]
grouped_fires = np.zeros((len(unique_labels)+np.sum(labels==-1)-1,3))
for k in unique_labels:
    if k == -1:
        continue
    average_coordinate = np.mean(coordinates[filter][labels==k],axis=0) 
    # Notice that for any points that lie on the longitude discontinuity will result in the fire's location being averaged to a point somewhere in another part of the world.
    # Hopefully this never happens since the longitude discontituity is almost entirely in the middle of the pacific ocean.
    grouped_fires[k] = np.array([average_coordinate[0],average_coordinate[1],k])

unique_coordinates = coordinates[filter][labels==-1]
grouped_fires[len(unique_labels)-1:] = np.c_[unique_coordinates,-np.ones(len(unique_coordinates))] # Chat GPT improved after lots of coercing



# for array in grouped_fires:
#     if array[2] == -1:
#         continue
#     xy = grouped_fires[grouped_fires[:,2]==array[2],0:2]
#     colour = np.random.rand(3,)
#     plt.plot(
#         xy[:, 1],
#         xy[:, 0],
#         "o",
#         markerfacecolor=colour,
#         markeredgecolor="k",
#         markersize=14,
#     )

# plt.gca().set_aspect(2)
# plt.grid()
# plt.title("Grouped Nominal and High Confidence Wildfire Clusters of Data Group Size Larger Than One")
# plt.ylabel("Latitude (degrees)")
# plt.xlabel("Longitude (degrees)")
# fig = plt.gcf()
# fig.set_size_inches(12,9)
# plt.ylim(-90,90)
# plt.savefig("clusterPlot.png",dpi = 200)
# plt.show()

# colours = np.random.rand(len(coordinates[filter]),3)

xy =coordinates[filter]
plt.plot(
    xy[:, 1],
    xy[:, 0],
    "o",
    markeredgecolor="k",
    markersize=14,
)

plt.gca().set_aspect(2)
plt.grid()
plt.title("All Wildfire Data Points")
plt.ylabel("Latitude (degrees)")
plt.xlabel("Longitude (degrees)")
fig = plt.gcf()
fig.set_size_inches(12,9)
plt.ylim(-90,90)
plt.savefig("dataPlot.png",dpi = 200)
plt.close()

# plt.clf()
# plt.gca().set_aspect(2)
# plt.grid()
# plt.title("All Wildfire Data Points")
# plt.ylabel("Latitude (degrees)")
# plt.xlabel("Longitude (degrees)")
# fig = plt.gcf()
# fig.set_size_inches(12,9)
# plt.ylim(-90,90)
# plt.xlim(-180,180)
# plt.savefig("dataPlot.png",dpi = 200)
# # plt.show()
# plt.close()
