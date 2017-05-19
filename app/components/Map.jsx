import React, { Component } from 'react';
var {connect} = require('react-redux');
import ReactMap, {Layer, Feature} from 'react-mapbox-gl';

const accessToken = "pk.eyJ1IjoibmFyc2hlIiwiYSI6ImNqMjNwamRvYjAwMWozM25zM2g5cG5lMGIifQ.VxTQRjbCRN0RdMLJPRg_Ww";
const style = "mapbox://styles/mapbox/basic-v9";

const mapStyle = {
  height: '30vh',
  width: '30vw'
}

export class Map extends Component {
    constructor(props) {
        super(props)
    }


    createLayers(data) {
        var id = 0;
        if(data.length > 0) {
            return data.map((element) => {
                return (
                    <Layer
                    key={id++} 
                    type="symbol"
                    id={"marker" + id }
                    layout={{ 
                        "icon-image" : "marker-15", 
                        "icon-size" : 2
                        //"text-field": "test",
                        //"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        //"text-offset": [0, 0.6],
                        //"text-anchor": "top"
                        }}>
                    <Feature coordinates={[element.lon,element.lat]}/>
                </Layer>
                )
            })
        } else {
            return <Layer />
        }
    }
  
  render() {
      var twitsArray = this.props.twitter.tweets.Twits;
      var coords = [];
      if (twitsArray.length > 0) {
          for(var i = 0; i<twitsArray.length; i++) {
              if (twitsArray[i].lon && twitsArray[i].lat) {
                  coords.push({lon: twitsArray[i].lon, lat: twitsArray[i].lat});
              }
          }
      } 
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

export default connect(state => state)(Map);