//Ignore SCSS files in tests...
require.extensions['.scss'] = (() => null);

import jsdom from 'jsdom';
import { expect } from 'chai';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};
