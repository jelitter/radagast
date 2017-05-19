var React = require('react');
var createReactClass = require('create-react-class');
var {connect} = require('react-redux');
var FavCall = require('FavCall');
var actions = require('actions');

export var FavouritesElement = createReactClass({
    render: function(){
        var {dispatch, text, id, user} = this.props;
        var {searchText} = this.props.twitter;
        if (text !== "") {
             return (
                <tr key={id} ref="favourite">
                    <td>{text}</td>
                    <td><div className="removebutton" onClick={() => {
                        FavCall.removeFav(user, text).then(()=>{
                            dispatch(actions.removeFavourite(text));
                            })
                        }}>DEL</div>
                    </td>
                </tr>
            )    
        } else if (searchText && searchText.length > 0 ){
            return (
                <tr key={id}>
                    <td>Add {searchText} as Favourite</td>
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
                    <td className="notfound">Search something to add as favourite</td>
                </tr>
            )
        }
    }
})

export default connect(state => state)(FavouritesElement);
