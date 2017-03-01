/**
 * @file build file
 * @author dongkunshan
 */

/* eslint-disable */
import 'eventsource-polyfill';
let hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
})
