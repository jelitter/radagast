var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-dom/test-utils')
var expect = require('expect')
var $ = require('jQuery')

import ConnectedWordcloud, {Wordcloud} from 'Wordcloud'
var longtext = "When you eat a healthy meal but you're still hungry so you eat an entire pizza for dessert and your body just like if pizza made you skinnier id probably disappear Pizza burger buns are what we've all been waiting for. Poor Pizza... So sorry, did the pizza arrive in the end? Update cheese fest is actual carnage and after hours of queuing all we have managed to get is a slice of pizza, tragic is a Pizza and R Pizza box pizza is love, pizza is life flat earth groups are the only good thing on facebook We're Read about our latest opening here MOD Pizza Now Hiring ALL Kitchen Positions! - Pizza Eggrolls Malia and Sasha Obamas last night in the White House included pizza and a slumber party I ain't gon lie pizza is damn near good everyday .. If this gets retweets, will buy every registered attendee at a medium deep dish pizza from Pizza hut I ain't gon lie pizza is damn near good everyday .. just imagine how great life would be if pizza made u skinny I can't believe pizza hut m'sia liked my tweet i love you even moreI vote for for the Top Social Artist for Ya I love pizza do you love pizza Making a pizza for bae like.. key to happiness . order a pizza . eat that pizza . repeat rt i"

describe('Wordcloud', ()=>{
    it('[T.3.1] should exist', ()=>{
        expect('Wordcloud').toExist
    })

    it('[T.3.1] should render words to the screen when a text is passed', ()=>{
        var element = {
            twitter: {
                tweets:{
                    Text: longtext
                }
            }
        }
        var wcElement = TestUtils.renderIntoDocument(<Wordcloud {...element} />)
        var $el = $(ReactDOM.findDOMNode(wcElement))
        expect($el.find('.wcelement').length).toBeGreaterThan(1);
    })

    it('[T.3.1] should not render words when an empty text is passed', ()=>{
        var element = {
            twitter: {
                tweets:{
                    Text: ""
                }
            }
        }
        var wcElement = TestUtils.renderIntoDocument(<Wordcloud {...element} />)
        var $el = $(ReactDOM.findDOMNode(wcElement))
        expect($el.find('.wcelement').length).toBe(0);
    })
})
