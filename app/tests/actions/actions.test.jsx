var expect = require('expect');
var actions = require('actions');

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
})