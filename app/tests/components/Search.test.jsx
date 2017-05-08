var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var TestUtils = require('react-addons-test-utils')
var expect = require('expect')
var $ = require('jQuery')

var configureStore = require('configureStore')
var Search = require('Search')
import SearchForm from 'SearchForm';
import Favourites from 'Favourites';

describe('Search', ()=>{
    it('should exist', ()=>{
        expect(Search).toExist()
    })

    it('should render SearchForm and Favourites components', ()=>{
        var store = configureStore.configure()
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <Search/>
            </Provider>
        )

        var search = TestUtils.scryRenderedComponentsWithType(provider, Search)[0]
        var searchform = TestUtils.scryRenderedComponentsWithType(search, SearchForm)
        expect(searchform.length).toEqual(1);
        var favourites = TestUtils.scryRenderedComponentsWithType(search, Favourites)
        expect(favourites.length).toEqual(1);
    })
})