import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { jsdom } from 'jsdom'

global.document = jsdom('')
global.window = document.defaultView
