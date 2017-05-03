import React, { Component } from 'react';
import ReactMap, {Layer, Feature} from 'react-mapbox-gl';

const accessToken = "pk.eyJ1IjoibmFyc2hlIiwiYSI6ImNqMjNwamRvYjAwMWozM25zM2g5cG5lMGIifQ.VxTQRjbCRN0RdMLJPRg_Ww";
const style = "mapbox://styles/mapbox/basic-v9";

const mapStyle = {
  height: '30vh',
  width: '30vw'
}

class Map extends Component {
    constructor(props) {
        super(props)
    }


    createLayers(data) {
        var id = 0;
        return data.map((element) => {
            return (
                <Layer
                key={id++} 
                type="symbol"
                id={"marker" + id }
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
      var {coords} = this.props;

    return (
        <div>
            <ReactMap
            style={style}
            accessToken={accessToken}
            containerStyle={mapStyle}
            center={[0,0]}
            zoom={[0]}>
                {this.createLayers(coords)}
            </ReactMap>
        </div>
    );
  }
}

module.exports = Map;