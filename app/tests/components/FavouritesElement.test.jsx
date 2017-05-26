var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-dom/test-utils')
var expect = require('expect')
var $ = require('jQuery')

import ConnectedFavElements, {FavouritesElement} from 'FavouritesElement'

describe('FavouritesElement', ()=>{
    it('[T.1.2] should exist', ()=>{
        expect('FavouritesElement').toExist
    })

    it('[T.1.2] should render remove element when a favourite is passed', ()=>{
        var element = {
            text: "test",
            id: 1,
            user: "tester",
            twitter: {
                searchText: "search"
            }
        }

        var favElement = TestUtils.renderIntoDocument(<FavouritesElement {...element} />)
        var $el = $(ReactDOM.findDOMNode(favElement))
        expect($el.find('.removebutton').length).toBe(1);
    })

    it('[T.1.2] should render add element when no favourite is passed but a search has been made', ()=>{
        var element = {
            text: "",
            id: 1,
            user: "tester",
            twitter: {
                searchText: "random search"
            }
        }

        var favElement = TestUtils.renderIntoDocument(<FavouritesElement {...element} />)
        var $el = $(ReactDOM.findDOMNode(favElement))
        expect($el.find('.addbutton').length).toBe(1);
    })

    it('[T.1.2] should render instructions when no favourite is passed and a search has not been made', ()=>{
        var element = {
            text: "",
            id: 1,
            user: "tester",
            twitter: {
                searchText: ""
            }
        }

        var favElement = TestUtils.renderIntoDocument(<FavouritesElement {...element} />)
        var $el = $(ReactDOM.findDOMNode(favElement))
        expect($el.find('.notfound').length).toBe(1);
    })
})
