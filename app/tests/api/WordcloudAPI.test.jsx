var expect = require('expect');
var WordcloudAPI = require('WordcloudAPI');

describe('WordCloudAPI', ()=>{
    it('should exist', ()=> {
        expect(WordcloudAPI).toExist
    })

    it('should not return ignored words', ()=>{
        var text = "about been get his one there whether"
        var res = WordcloudAPI.wordcloud(text)

        expect(res).toEqual([])
    })

    it('should return an array with words', ()=>{
        var bigtext = "When you eat a healthy meal but you're still hungry so you eat an entire pizza for dessert and your body just like if pizza made you skinnier id probably disappear Pizza burger buns are what we've all been waiting for. Poor Pizza... So sorry, did the pizza arrive in the end? Update cheese fest is actual carnage and after hours of queuing all we have managed to get is a slice of pizza, tragic is a Pizza and R Pizza box pizza is love, pizza is life flat earth groups are the only good thing on facebook We're Read about our latest opening here MOD Pizza Now Hiring ALL Kitchen Positions! - Pizza Eggrolls Malia and Sasha Obamas last night in the White House included pizza and a slumber party I ain't gon lie pizza is damn near good everyday .. If this gets retweets, will buy every registered attendee at a medium deep dish pizza from Pizza hut I ain't gon lie pizza is damn near good everyday .. just imagine how great life would be if pizza made u skinny I can't believe pizza hut m'sia liked my tweet i love you even moreI vote for for the Top Social Artist for Ya I love pizza do you love pizza Making a pizza for bae like.. key to happiness . order a pizza . eat that pizza . repeat rt i"
        var res = WordcloudAPI.wordcloud(bigtext)

        expect(res).toBeAn(Array)
    })
})