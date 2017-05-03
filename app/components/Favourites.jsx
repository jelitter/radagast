var React = require('react');
var FavouritesElement = require('FavouritesElement');
var FavCall = require('FavCall')

var Favourites = React.createClass({
    componentWillMount: function(){
         this.props.onRenderFavs();
    },
    render: function(){
        var {favs} = this.props;

        var renderFavs = () => {
            var id=0;
            console.log("before", favs)
            if(!Array.isArray(favs) || favs.length <= 0) {
                favs = [""]
            } 
            console.log("after", favs)
            return favs.map((element)=> {
                return <FavouritesElement key={id++} text={element} onClickFavourite={this.props.onClickFavourite} />
            })
        }

        return(
            <div className="row">
                <table className="small-10">
                    <tbody>
                        {renderFavs()}
                    </tbody>
                </table>
            </div>
        )
    }
})

module.exports=Favourites;