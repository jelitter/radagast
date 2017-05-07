var React = require('react');
var {connect} = require('react-redux');
import FavouritesElement from 'FavouritesElement';

var FavCall = require('FavCall')

export var Favourites = React.createClass({
    render: function(){
        var {favourites} = this.props;

        var renderFavs = () => {
            var id=0;
            if (favourites.length > 0 && favourites.length < 5 && favourites.indexOf("") <0 ) {
                favourites.push("");
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