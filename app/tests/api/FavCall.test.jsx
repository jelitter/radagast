var expect = require('expect');
var FavCall = require('FavCall');

describe('FavCall scripts', ()=>{
    it('[T.1.2] should exist', ()=>{
        expect(FavCall).toExist();
    })

    beforeEach(()=>{
        localStorage.removeItem("RadagastUser");
    })

    describe('getUser', ()=> {
        it('[T.5] should return user name from browser localStorage', ()=>{
            var user = 'testing'
            localStorage.setItem("RadagastUser", user)
            var res = FavCall.getUser();

            expect(res).toEqual(user);
        })

        it('[T.5] should return empty if no previous user was added', ()=>{
            var res = FavCall.getUser();
            expect(res).toBe(null);
        })
    })

    describe('setUser', ()=>{
        it('[T.5] should store user name in localStorage', ()=>{
            var user = "testing"
            FavCall.setUser(user);
            var res = localStorage.getItem("RadagastUser");

            expect(res).toEqual(user)
        })
    })

    describe('addFavs', ()=> {
        it('[T.1.2.1] should add favourites data if provided with string', ()=>{
            FavCall.addFav("automatedTestKarma", "some fav").then((res)=>{
                expect(res.status).toEqual("OK")
            })
        })
        it('[T.1.2.1] should not add a favourite if data provided is incorrect', ()=>{
            FavCall.addFav("automatedTestKarma", ["a"]).then((res) =>{
                expect(res.status).toNotBe(Object)
            })
        })
    })

    describe('getFavs', ()=>{
        it('[T.1.2] should return valid data if provided valid user', ()=>{
            FavCall.getFavs("automatedTestKarma").then((res) => {
                expect(res.data).toEqual(["some fav"]);
            })
        })

        it('[T.1.2] should return empty if provided with invalid user', ()=>{
            FavCall.getFavs("dañsldkaffasfas").then((res)=>{
                expect(res.data).toEqual(null);
            })
        })
    })

    describe("removeFav", ()=> {
        it("[T.1.2.2] should not remove favourite if it does not exists", ()=>{
            FavCall.removeFav("automatedTestKarma", "some test").then((res)=>{
                 FavCall.getFavs("automatedTestKarma").then((res) => {
                    expect(res.data).toEqual(["some fav"]);
                 })
            })
        })

        it("[T.1.2.2] should remove favourite if it exists", ()=> {
            FavCall.removeFav("automatedTestKarma", "some fav").then((res) =>{
                FavCall.getFavs("automatedTestKarma").then((res) => {
                    expect(res.data).toEqual([]);
                })
            })
        })
    })
})