var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var TestUtils = require('react-addons-test-utils')
var expect = require('expect')
var $ = require('jQuery')

import ConnectedMap, {Map} from 'Map'
import {configure} from 'configureStore'
import ReactMap, {Layer, Feature} from 'react-mapbox-gl';

describe('Map', ()=> {
    it('should exist', ()=> {
        expect(Map).toExist
    })
})