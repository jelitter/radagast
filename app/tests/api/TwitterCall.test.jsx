var expect = require('expect');
var TwitterCall = require('TwitterCall');

describe('TwitterCall', ()=>{
    it('should exist', ()=>{
        expect(TwitterCall).toExist();
    })

    describe('getTweetData', ()=>{
        it('should return an object on successful twitter call', ()=>{
            TwitterCall.getTweetData('pizza').then((res)=>{
                expect(res).toBeAn(Object)
            })
        })

        it('should return a string on unsuccessful twitter call', ()=>{
            TwitterCall.getTweetData().then((res)=>{
                expect(res).toBeAn(String);
            })
        })
    })
})