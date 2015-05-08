/*
  digitalocean-api-broker: a simple proxy to provide control over API requests to Digital Ocean
  Written by: William Jimenez & Daniel Imfeld
  Copyright (c) 2015

  Based originally on proxy-http-to-https.js: Basic example of proxying over HTTP to a target HTTPS server
  Copyright (c) Nodejitsu 2013
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var https = require('https'),
    http  = require('http'),
    util  = require('util'),
    path  = require('path'),
    fs    = require('fs'),
    colors = require('colors'),
    httpProxy = require('http-proxy');
require('console-stamp')(console, '[HH:MM:ss.l]');

// Get our Digital Ocean API token from an environment variable
var do_auth = process.env.DIGITALOCEAN_TOKEN
if ( typeof do_auth == 'undefined' )
{
   console.log('Error: Digital Ocean environment variable not set'.red);
   process.exit(1);
}

//
// Proxy server for our Digital Ocean API requests
//
var proxy = httpProxy.createProxyServer({});


var server = http.createServer(function(req, res) {
  console.log('HEADER:\n'+JSON.stringify(req.headers, null, 2) + '\nURL: '+ req.url);
  proxy.web(req, res, {
    target: 'https://api.digitalocean.com',
    agent  : https.globalAgent,
    headers: {
      host: 'api.digitalocean.com',
      Authorization: 'Bearer '+do_auth
    }
  });
});


server.listen(5050);
console.log('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '5050'.yellow);
