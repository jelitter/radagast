var expect = require('expect');
var TwitterCall = require('TwitterCall');

describe('TwitterCall', ()=>{
    it('[T.1.1] should exist', ()=>{
        expect(TwitterCall).toExist();
    })

    describe('getTweetData', ()=>{
        it('[T.1.1] should return an object on successful twitter call', ()=>{
            TwitterCall.getTweetData('pizza').then((res)=>{
                expect(res).toBeAn(Object)
            })
        })

        it('[T.1.1] should return a string on unsuccessful twitter call', ()=>{
            TwitterCall.getTweetData().then((res)=>{
                expect(res).toBeAn(String);
            })
        })
    })
})