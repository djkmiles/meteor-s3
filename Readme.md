# S3

AWS S3 cloud file interface with automatic recursion

*No need to initialize, as the class instantiates a single instance of itself when imported.*

All methods are synchronous, [aws-sdk/clients/s3@2.9.0] wrapped in Meteor.wrapAsync

## Installation

`meteor add djk:s3`

Environment variables or Meteor.settings are:

– S3_ID
– S3_SECRET
– S3_BUCKET
– S3_REGION

## Useage

### upload(blob, path, type = 'text/plain')

Returns putObject data

example:

`let html = '<!DOCTYPE html><html><head></head><body>Hello, world!</body></html>'
let result = S3.upload(html, 'index.html', 'text/html')`

### erase(path)

Returns <keylist> e.g. [{Key: <path>}]

example:

`S3.erase('foo/')`

Erases foo/*

`S3.erase('foo/1.txt')`

Erases foo/1.txt

### copy(from, to)

Returns {from: <keylist>, to: <keylist>}

example:

`S3.copy('foo/', 'bar/')`

Copies foo/* to bar/

### move(from, to)

Returns {from: <keylist>, to: <keylist>}

example:

`S3.copy('foo/', 'bar/')`

Now foo/* is at bar/foo/*

### list(path)

Returns <keylist>

example:

`S3.list('foo/bar/')`

*> [{Key: 'foo/bar/1.txt'}]*
