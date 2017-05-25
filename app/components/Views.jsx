var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var createReactClass = require('create-react-class');

export var Views = createReactClass({
    render: function(){
        var { dispatch, views } = this.props;

        return(
            <div>
                <div className="viewMenu">
                    Map
                    <label className="switch">
                    <input type="checkbox" checked={views.map} onChange={()=>{dispatch(actions.toggleView("map"))}}/>
                    <div className="slider"></div>
                    </label>
                </div>
                <div className="viewMenu">
                    Sentiment
                    <label className="switch">
                    <input type="checkbox" checked={views.sentiment} onChange={()=>{dispatch(actions.toggleView("sentiment"))}}/>
                    <div className="slider"></div>
                    </label>
                </div>
                <div className="viewMenu">
                    Wordcloud
                    <label className="switch">
                    <input type="checkbox" checked={views.wordcloud} onChange={()=>{dispatch(actions.toggleView("wordcloud"))}}/>
                    <div className="slider"></div>
                    </label>
                </div>
            </div>
        )
    }
})

export default connect(state => state)(Views);