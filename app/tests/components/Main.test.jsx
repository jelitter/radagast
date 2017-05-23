var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var TestUtils = require('react-dom/test-utils')
var expect = require('expect')
var $ = require('jQuery')

var configureStore = require('configureStore')
import Main from 'Main';
import Sentiment from 'Sentiment';
import Map from 'Map';
import Wordcloud from 'Wordcloud';
import Search from 'Search';

describe('Main', ()=>{
    it('[T.1] should exist', ()=>{
        expect(Main).toExist()
    })

    it('[T.1] should render four components', ()=>{
        var store = configureStore.configure()
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <Main/>
            </Provider>
        )

        var main = TestUtils.scryRenderedComponentsWithType(provider, Main)[0]
        var search = TestUtils.scryRenderedComponentsWithType(main, Search)
        expect(search.length).toEqual(1);
        var map = TestUtils.scryRenderedComponentsWithType(main, Map)
        expect(map.length).toEqual(1);
        var wordcloud = TestUtils.scryRenderedComponentsWithType(main, Wordcloud)
        expect(wordcloud.length).toEqual(1);
        var sentiment = TestUtils.scryRenderedComponentsWithType(main, Sentiment)
        expect(sentiment.length).toEqual(1);
    })
})