var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-addons-test-utils')
var expect = require('expect')
var $ = require('jQuery')

import ConnectedSentiment, {Sentiment} from 'Sentiment'

describe('Sentiment', ()=>{
    it('should exist', ()=>{
        expect('Sentiment').toExist
    })

    it('should render results to the screen when a twitter object is passed', ()=>{
        var element = {
            twitter: {
                tweets:{
                    Score: {
                        score: 11,
                        score_perc: 12,
                        words: 150
                    }
                }
            }
        }
        var sentiment = TestUtils.renderIntoDocument(<Sentiment {...element} />)
        var $el = $(ReactDOM.findDOMNode(sentiment))
        expect($el.find('.sentelement').length).toBe(1);
    })

    it('should not render any elements when an empty object is passed', ()=>{
        var element = {
            twitter: {
                tweets:{
                    Score: {
                    }
                }
            }
        }
        var sentiment = TestUtils.renderIntoDocument(<Sentiment {...element} />)
        var $el = $(ReactDOM.findDOMNode(sentiment))
        expect($el.find('.sentelement').length).toBe(0);
    })
})
