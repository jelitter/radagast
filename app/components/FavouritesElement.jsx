var React = require('react');
var createReactClass = require('create-react-class');
var {connect} = require('react-redux');
var FavCall = require('FavCall');
var actions = require('actions');

export var FavouritesElement = createReactClass({
    render: function(){
        var {dispatch, text, id, user, favourites} = this.props;
        var {searchText} = this.props.twitter;
        if (text !== "") {
             return (
                <tr key={id} ref="favourite">
                    <td onClick={() => {dispatch(actions.fetchTweets(text))}}><div className="fav favitem"><a href="#">{text}</a></div></td>
                    <td><div className="removebutton" onClick={() => {
                        FavCall.removeFav(user, text).then(()=>{
                            dispatch(actions.removeFavourite(text));
                            })
                        }}>DEL</div>
                    </td>
                </tr>
            )    
        } else if (searchText && searchText.length > 0 && favourites.indexOf(searchText)<0){
            return (
                <tr key={id}>
                    <td><div className="fav favadd">Add {searchText} as Favourite</div></td>
                    <td><div ref={id} className="addbutton" onClick={() =>{
                        FavCall.addFav(user, searchText).then(() => {
                            //dispatch(actions.setFavourites(searchText));
                                FavCall.getFavs(user).then((res) => {
                                     dispatch(actions.setFavourites(res));
                                });
                            })
                        }}>ADD</div>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr key={id}>
                    <td className="notfound"><div className="fav favnothing">Search something to add as favourite</div></td>
                </tr>
            )
        }
    }
})

export default connect(state => state)(FavouritesElement);
