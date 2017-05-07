var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-addons-test-utils')
var expect = require('expect')
var {Provider} = require('react-redux')
var $ = require('jQuery')

import {configure} from 'configureStore'
import ConnectedFavElements, {FavouritesElement} from 'FavouritesElement'

describe('FavouritesElement', ()=>{
    it('should exist', ()=>{
        expect('FavouritesElement').toExist
    })

    it('should render remove element when a favourite is passed', ()=>{
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

    it('should render add element when no favourite is passed but a search has been made', ()=>{
        var element = {
            text: "",
            id: 1,
            user: "tester",
            twitter: {
                searchText: "search"
            }
        }

        var favElement = TestUtils.renderIntoDocument(<FavouritesElement {...element} />)
        var $el = $(ReactDOM.findDOMNode(favElement))
        expect($el.find('.addbutton').length).toBe(1);
    })

    it('should render instructions when no favourite is passed and a search has not been made', ()=>{
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
