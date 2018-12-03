Package.describe({
	name: 'djk:s3',
	version: '1.0.1',
	summary: 'Meteor AWS S3 cloud file interface with automatic recursion',
	git: 'https://github.com/djkmiles/meteor-s3.git',
	documentation: 'Readme.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.4')
	api.use('ecmascript')
	api.export('S3')
    api.mainModule('s3.js', 'server')
})

Npm.depends({
  'aws-sdk': '2.9.0',
  'lodash': '4.17.4'
})
