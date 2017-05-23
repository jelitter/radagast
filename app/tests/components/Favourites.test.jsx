var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var TestUtils = require('react-dom/test-utils')
var expect = require('expect')
var $ = require('jQuery')

import {configure} from 'configureStore'
import ConnectedFavourites, {Favourites} from 'Favourites'
import ConnectedFavouritesElement, {FavouritesElement} from 'FavouritesElement'

describe('Favourites', ()=>{
    it('[T.1.2] should exist', ()=>{
        expect(Favourites).toExist
    })

    it('[T.1.2] should render a FavouriteElement for each element in favourites array', ()=> {
        var favourites = {favourites: ["Dog", "Cat"]};
        var store = configure(favourites);
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedFavourites />
            </Provider>);
        
        var favouriteList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedFavourites)[0];
        var favouriteElement = TestUtils.scryRenderedComponentsWithType(favouriteList, ConnectedFavouritesElement);

        expect(favouriteElement.length).toBe(favourites.favourites.length);
    })

    it('[T.1.2] should render a single element if the favourites list is empty', ()=> {
        var favourites = {favourites: []}
        var store = configure(favourites)
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedFavourites />
            </Provider>
        )
        var favouriteList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedFavourites)[0];
        var favouriteElement = TestUtils.scryRenderedComponentsWithType(favouriteList, ConnectedFavouritesElement);

        expect(favouriteElement.length).toBe(1);
    })

    it('[T.1.2] should render a maximum of five FavouriteElement', ()=> {
        var favourites = {favourites: ["Dog", "Cat", "Frog", "Sky", "Elephant", "Extra"]};
        var store = configure(favourites);
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedFavourites />
            </Provider>);
        
        var favouriteList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedFavourites)[0];
        var favouriteElement = TestUtils.scryRenderedComponentsWithType(favouriteList, ConnectedFavouritesElement);

        expect(favouriteElement.length).toBe(5);
    })

})