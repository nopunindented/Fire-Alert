# NASA-Space-Challenge
We developed the Fermions Fire Alert Android App, a useful tool that harnesses NASA and CSA databases to provide real-time fire alerts to workers in remote areas such as farmers. This solution addresses the critical challenge of preventing life loss and property damage by delivering timely SMS notifications when fires are detected in their proximity. The app gives users an advantage with early warnings, enabling them to take swift and informed action, protecting lives, property, and livelihoods in remote areas. It bridges the gap between technology and agriculture, significantly enhancing fire safety and resilience in vulnerable communities.

The project involves the development of a mobile phone application using the React Native framework. This application serves as a powerful tool for users to access and interact with Fire Information for Resource Management System (FIRMS) data through a clean and simple map integrating Google's Maps API. The key components and functionalities of the app are as follows:

## Data Retrieval and Processing:
The app initiates data retrieval by sending requests to a Python-based Flask API. This API acts as an intermediary between the app and the FIRMS data source.
The Flask API fetches FIRMS data and applies filtering and clustering algorithms to present users with relevant and meaningful information. As part of its future development, the data could be cached and analyzed over time, offering insights into wildfire patterns and trends.

## Real-time Wildfire Detection: 
The core feature of the app is its ability to monitor real-time wildfire data. As new wildfire information becomes available, the app promptly alerts users to nearby wildfires.
Notifications are delivered seamlessly through SMS messages using the Twilio service, ensuring that users receive timely and critical updates on wildfire events in their vicinity.

## Interactive Map Interface:
The app provides an intuitive and interactive map interface that allows users to visualize the current locations of active wildfires.
Users can navigate the map, zoom in and out, and explore specific wildfire incidents, gaining valuable insights into the geographical spread and severity of wildfires.
