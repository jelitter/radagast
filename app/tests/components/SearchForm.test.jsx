var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var expect = require('expect'); 
var $ = require('jQuery');

var {SearchForm} = require('SearchForm')

describe('SearchForm', ()=>{
    it('should exist', ()=>{
        expect(SearchForm).toExist()
    })

    it('should dipatch FETCH_TWEETS action on valid search', ()=> {
        var searchText = "Kittens"
        var action = {
            type: 'START_SEARCH_TWEETS',
            searchText
        }
        var getState = () => ({searchText: "Kittens"})

        var spy = expect.createSpy()
        var searchForm = TestUtils.renderIntoDocument(<SearchForm dispatch={spy}/>)
        var $el = $(ReactDOM.findDOMNode(searchForm));
        searchForm.refs.searchText.value = searchText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        //actions.fetchTweets()(spy, getState);
        expect(spy).toHaveBeenCalledWith(action);
    })
})