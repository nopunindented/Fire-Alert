import requests
from sklearn.cluster import DBSCAN
from datetime import datetime
import numpy as np
import matplotlib.pyplot as plt

date = datetime.today().strftime('%Y-%m-%d')
FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e"

url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1/{date}"

response = requests.get(url)

if response.status_code == 200:
    # Parse and work with the API response data (JSON in this case)
    line_data = np.char.split(np.array(response.content.strip().split(b'\n')),sep=b',')
    data = np.array([np.array(line) for line in line_data])

    print(data)
    print(data.shape)


else:
    # Handle errors, e.g., print the status code and error message
    print(f"API request failed with status code {response.status_code}: {response.text}")

coordinates = data[1:,0:2].astype(float)
print(coordinates)
db = DBSCAN(0.1).fit(coordinates)

labels = db.labels_
unique_labels = set(labels)
core_samples_mask = np.zeros_like(labels, dtype=bool)
core_samples_mask[db.core_sample_indices_] = True
colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]
for k, col in zip(unique_labels, colors):
    if k == -1:
        # Black used for noise.
        col = [0, 0, 0, 1]

    class_member_mask = labels == k

    colour = np.random.rand(3,)

    xy = coordinates[class_member_mask]
    plt.plot(
        xy[:, 1],
        xy[:, 0],
        "o",
        markerfacecolor=colour,
        markeredgecolor="k",
        markersize=14,
    )

    # xy = coordinates[class_member_mask & ~core_samples_mask]
    # plt.plot(
    #     xy[:, 1],
    #     xy[:, 0],
    #     "o",
    #     markerfacecolor=tuple(col),
    #     markeredgecolor="k",
    #     markersize=6,
    # )

plt.title(f"Estimated number of clusters:")
plt.gca().set_aspect(1.2)
plt.show()
