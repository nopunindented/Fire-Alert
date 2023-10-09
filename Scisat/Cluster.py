import requests
from sklearn.cluster import DBSCAN
from datetime import datetime
import numpy as np
import matplotlib.pyplot as plt
import pandas as ps
from io import StringIO
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/api/cluster', methods=['GET'])
def cluster():
    # Parse request data, if needed
    # data = request.json  # Assuming you're sending JSON data in the request

    # Call your existing function with the data
    date = datetime.today().strftime('%Y-%m-%d')
    FIRMS_MAP_KEY = "832b6eef2f6837122b1999958dddac1e"

    url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1/{date}"

    response = requests.get(url)
    
    if response.status_code == 200:
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
    colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]
    for k, col in zip(unique_labels, colors):
        if k == -1:
            # Black used for noise.
            col = [0, 0, 0, 1]

        class_member_mask = labels == k

        colour = np.random.rand(3,)

        xy = coordinates[filter][class_member_mask]
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

    print(labels.size)
    print(len(unique_labels))

    plt.title(f"Estimated number of clusters:")
    plt.gca().set_aspect(1.2)
    # plt.show()

    # Return the result as a JSON response
    return jsonify(db.labels_.tolist())




if __name__ == '__main__':
    app.run(debug=True)
