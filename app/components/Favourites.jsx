var React = require('react');
var {connect} = require('react-redux');
import FavouritesElement from 'FavouritesElement';
var createReactClass = require('create-react-class');

var FavCall = require('FavCall')

export var Favourites = createReactClass({
    render: function(){
        var renderFavs = () => {
            var {favourites} = this.props;
            var id=0;
            if (favourites.length >= 0 && favourites.length < 5 && favourites.indexOf("") <0 ) {
                favourites.push("");
            } else if(favourites.length > 5) {
                favourites.splice(5);
            }
            return favourites.map((element)=> {
                return <FavouritesElement key={id++} text={element} />
            })

        }

        return(
            <div className="">
                <table className="">
                    <tbody>
                        {renderFavs()}
                    </tbody>
                </table>
            </div>
        )
    }
})

export default connect(state => state)(Favourites);