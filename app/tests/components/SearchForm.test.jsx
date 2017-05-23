var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var expect = require('expect'); 
var $ = require('jQuery');

var {SearchForm} = require('SearchForm')

describe('SearchForm', ()=>{
    it('[T.1.1] should exist', ()=>{
        expect(SearchForm).toExist()
    })
})