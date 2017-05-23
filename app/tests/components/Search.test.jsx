var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var TestUtils = require('react-dom/test-utils')
var expect = require('expect')
var $ = require('jQuery')

var configureStore = require('configureStore')
var Search = require('Search')
import SearchForm from 'SearchForm';
import Favourites from 'Favourites';

describe('Search', ()=>{
    it('[T.1.1] should exist', ()=>{
        expect(Search).toExist()
    })

    it('[T.1.1] should render SearchForm and Favourites components', ()=>{
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