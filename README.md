# leaflet-challenge

# Mapping Earthquakes and Tectonic Plates

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.



# Leaflet 1 Folder: 

I Vizualised the Earthquake data from USGS (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) using Leafet.js and D3.js libraries:

<img width="1440" alt="Screenshot 2022-08-20 at 22 00 11" src="https://user-images.githubusercontent.com/67019030/185766111-642cb700-3706-4e71-a1e2-af137af03ff2.png">
  
  * I created a map that plots all the earthquakes from the above dataset based on their longitude and latitude
  * Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Using the third coordinate as the altitude/depth. The result is Earthquakes with higher magnitudes appear larger, and Earthquakes with greater depth appear darker in color.

# Leaflet 2 Folder:  

I Visualized Tectonic Plates data from (https://github.com/fraxen/tectonicplates) using Leaflet.js and D3.js libraries and put this layer on top of the Eartquake Layer in the previous map to illustrate the relationship between tectonic plates and seismic activity.

<img width="1440" alt="Screenshot 2022-08-20 at 22 02 17" src="https://user-images.githubusercontent.com/67019030/185766140-dc05d506-3812-4e2d-ab1e-127ecda813da.png">

Final Map has 3 baseMaps: Satellite, Grayscale and Outdoors, which you can filter dynamically.
Both Maps contain popups that provide additional information about the earthquake when its associated marker is clicked and a legend that will provide context for the map data.