var expect = require('expect');
var actions = require('actions');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Actions', ()=>{

    it('should generate add favourite action', ()=>{
        var action = {
            type: 'ADD_FAVOURITE',
            favourite: 'kittens'
        }
        var res = actions.addFavourite(action.favourite);
        expect(res).toEqual(action);
    })

    it('should generate remove favourite action', ()=>{
        var action = {
            type: 'REMOVE_FAVOURITE',
            favourite: 'dogs'
        }
        var res = actions.removeFavourite(action.favourite);
        expect(res).toEqual(action);
    })

    it('should generate update favourites action', ()=>{
        var action = {
            type: 'SET_FAVOURITES',
            favourites: ['dogs','kittens']
        }
        var res = actions.setFavourites(action.favourites);
        expect(res).toEqual(action);
    })

    it('should generate searchTweets action', ()=>{
        var action = {
            type: 'SEARCH_TWEETS',
            searchText: 'programming'
        }
        var res = actions.searchTweets(action.searchText);
        expect(res).toEqual(action);
    })

    it('should generate add user action', ()=>{
        var action = {
            type: 'ADD_USER',
            user: 'Steve'
        }
        var res = actions.addUser(action.user);
        expect(res).toEqual(action);
    })

    it('should generate set user action', ()=>{
        var action = {
            type: 'SET_USER',
            user: 'Kevin'
        }
        var res = actions.setUser(action.user);
        expect(res).toEqual(action);
    })


    it('should generate initial state for fetch tweets action', ()=>{
        var action = {
            type: 'START_SEARCH_TWEETS',
            searchText: 'Pizza'
        }
        var res = actions.getTweets(action.searchText);
        expect(res).toEqual(action);
    })

    
    it('should generate completion for fetch tweets action', ()=>{
        var action = {
            type: 'COMPLETE_SEARCH_TWEETS',
            searchText: 'Dog',
            tweets: [{id:1, text: "I love dogs"}]
        }
        var res = actions.completeGetTweets(action.tweets, action.searchText);
        expect(res).toEqual(action);
    })

     it('expected actions should be fired on successful fetchTweets request', ()=> {
        var middlewares = [thunk];
        var mockstore = configureMockStore(middlewares);
        var store = mockstore({searchText: 'Dog', tweets: []})
        
        var expectedActions = [
            'START_SEARCH_TWEETS',
            'COMPLETE_SEARCH_TWEETS'
        ]

        return store.dispatch(actions.fetchTweets()).then(()=> {
            var actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedActions);
        })
     })   
})