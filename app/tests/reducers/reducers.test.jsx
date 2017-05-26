var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');

describe('Reducers', ()=>{
    describe('searchTweetReducer', ()=> {
        it('[T.1.1] Should start searching for tweets', ()=> {
            var action = {
                type: 'START_SEARCH_TWEETS',
                searchText: 'dog'
            }
            var res = reducers.searchTweetReducer(df(''), df(action));

            expect(res.isFetching).toEqual(true);
            expect(res.searchText).toEqual(action.searchText);
        })

        it('[T.1.1] Should stop fetching for tweets after complete is fired', ()=>{
            var action = {
                type: 'COMPLETE_SEARCH_TWEETS',
                tweets: ['one tweet', 'other tweet'],
                searchText: 'dog'
            }
            var res = reducers.searchTweetReducer(df(''), df(action));

            expect(res.isFetching).toEqual(false);
            expect(res.searchText).toEqual(action.searchText);
            expect(res.tweets).toEqual(action.tweets);
        })
    })

    describe('userReducer', ()=>{
        it('should return current user', ()=>{
            var action = {
                type: 'SET_USER',
                user: 'Kevin'
            }
            var res = reducers.userReducer(df(''), df(action));

            expect(res).toEqual(action.user);
        })
    })

    describe('favouritesReducer', ()=>{
        it('[T.1.2.2] should remove favourite from list', ()=>{
            var action = {
                type: 'REMOVE_FAVOURITE',
                favourite: 'Dog'
            }
            var favList = ['Dog', 'Cat']
            var res = reducers.favouritesReducer(df(favList), df(action));

            expect(res.length).toBe(1);
            expect(res.indexOf(action.favourite)).toBe(-1);
        })

        it('[T.1.2] should set favourites array', ()=> {
            var action = {
                type: 'SET_FAVOURITES',
                favourites: ['Dog', 'Cat']
            }
            var res = reducers.favouritesReducer(df([]), df(action))

            expect(res).toEqual(action.favourites);
        })
    })

    describe('viewReducer', ()=>{
        it('should toggle view if valid view is passed', ()=>{
            var action ={
                type: 'TOGGLE_VIEW',
                view: 'menu'
            }
            var state =  {
                menu: true
            }
            var res = reducers.viewReducer(df(state), df(action));
            expect(res.menu).toEqual(!state.menu); 

            var state2 =  {
                menu: false
            }
            var res = reducers.viewReducer(df(state2), df(action));
            expect(res.menu).toEqual(!state2.menu);
        })

        it('should return the state if invalid view is passed', ()=>{
            var action = {
                type: 'TOGGLE_VIEW',
                view: 'menu'
            }
            var state = {
                nomenu: true
            }

            var res = reducers.viewReducer(df(state), df(action));
            expect(res.menu).toEqual(!state.menu); 
        })
    })
})