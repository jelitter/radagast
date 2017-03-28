var React = require('react');
var FavouritesElement = require('FavouritesElement');

var Favourites = React.createClass({
    render: function(){
        return(
            <div className="row">
                <table className="small-10">
                    <tbody>
                        <tr>
                            <td>Placeholder</td>
                        </tr>
                        <FavouritesElement />
                    </tbody>
                </table>
            </div>
        )
    }
})

module.exports=Favourites;