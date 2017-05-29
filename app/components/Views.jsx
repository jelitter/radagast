var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var createReactClass = require('create-react-class');

export var Views = createReactClass({
    render: function(){
        var { dispatch, views } = this.props;
        var handleChange = function (field) {
            dispatch(actions.toggleView(field));
        }

        return(
            <div className="views">
                <div className="viewMenu">
                    Map
                    <label className="switch">
                    <input type="checkbox" checked={views.map} onChange={()=>{handleChange("map")}}/>
                    <div className="slider"></div>
                    </label>
                </div>
                <div className="viewMenu">
                    Sentiment
                    <label className="switch">
                    <input type="checkbox" checked={views.sentiment} onChange={()=>{handleChange("sentiment")}}/>
                    <div className="slider"></div>
                    </label>
                </div>
                <div className="viewMenu">
                    Wordcloud
                    <label className="switch">
                    <input type="checkbox" checked={views.wordcloud} onChange={()=>{handleChange("wordcloud")}}/>
                    <div className="slider"></div>
                    </label>
                </div>
            </div>
        )
    }
})

export default connect(state => state)(Views);