var React = require('react');

var FavouritesElement = React.createClass({
    handleAdd: function() {
        this.props.onClickFavourite();
    },
    handleRemove: function(){
        var element = this.refs.favourite.children[0].innerText;
        console.log("element ", element)
        this.props.onClickFavourite(element);
    },
    render: function(){
        var {text, id} = this.props;

        if (text == "") {
            return (
                <tr key={id}>
                    <td>add new...</td>
                    <td><div ref={id} onClick={this.handleAdd}>Add new</div></td>
                </tr>
            )
        } else {
            return (
                <tr key={id} ref="favourite">
                    <td>{text}</td>
                    <td><div onClick={this.handleRemove}>Remove</div></td>
                </tr>
            )
        }
    }
})

module.exports = FavouritesElement;
