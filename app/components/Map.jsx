import React, { Component } from 'react';
import ReactMap, {Layer, Feature} from 'react-mapbox-gl';

const accessToken = "pk.eyJ1IjoibmFyc2hlIiwiYSI6ImNqMjNwamRvYjAwMWozM25zM2g5cG5lMGIifQ.VxTQRjbCRN0RdMLJPRg_Ww";
const style = "mapbox://styles/mapbox/basic-v9";

const mapStyle = {
  height: '40vh',
  width: '70vw'
}

class Map extends Component {
    constructor(props) {
        super(props)
    }

    createLayers(data) {
        return data.map((element) => {
            return (
                <Layer
                key={element.id} 
                type="symbol"
                id={"marker" + element.id }
                layout={{ 
                    "icon-image" : "marker-15", 
                    "icon-size" : 2,
                    "text-field": "test",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                    }}>
                <Feature coordinates={[element.lon,element.lat]}/>
            </Layer>
            )
        })
    }
  
  render() {
      var tempcoord = [
          {
              lat: 51.5074,
              lon: -0.1278,
              id: 1
          },
        {
              lat: 40.7128,
              lon: -74.0059,
              id: 2
          },
          {
              lat: -33.8688,
              lon: 151.2093,
              id: 3
          }
      ]
    return (
        <div>
            <h3>Trends Map</h3>
            <ReactMap
            style={style}
            accessToken={accessToken}
            containerStyle={mapStyle}
            center={[0,0]}
            zoom={[0]}
  
            >
            {this.createLayers(tempcoord)}
    
            </ReactMap>
        </div>
    );
  }
}

module.exports = Map;