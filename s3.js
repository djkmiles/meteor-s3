'use strict';

const S3_BUCKET = 'graceplus'
import AWS from 'aws-sdk/clients/s3'

client = new AWS({
    accessKeyId: process.env.S3_ID || Meteor.settings.S3_ID,
    secretAccessKey: process.env.S3_SECRET || Meteor.settings.S3_SECRET,
    params: {Bucket: process.env.S3_BUCKET || Meteor.settings.S3_BUCKET},
    region: process.env.S3_REGION || Meteor.settings.S3_REGION || 'us-east-1'
})

S3 = class {

    upload(blob, path, type = 'text/plain') {
        return Meteor.wrapAsync(client.putObject, client)({
            Key: path,
            Body: blob,
            ContentLength: Buffer.byteLength(blob),
            ContentType: type
        })
    }

    keys(path) {
        let list = Meteor.wrapAsync(client.listObjectsV2, client)({Prefix: path})
        if (!list.KeyCount) return null
        return _.map(list.Contents, item => _.pick(item, 'Key'))
    }

    erase(path) {
        let list = this.keys(path)
        return list && Meteor.wrapAsync(client.deleteObjects, client)({Delete: {Objects: list}})
    }

    copy(keyFrom, keyTo) {
        let from = this.keys(keyFrom)
        if (!from) return
        let Copy = Meteor.wrapAsync(client.copyObject, client)
        let pat = new RegExp(`^${keyFrom}`)
        var to = []
         _.each(from, item => {
             let Key = item.Key.replace(pat, keyTo)
             Copy({CopySource: `${S3_BUCKET}/${item.Key}`, Key})
             to.push({Key})
         })
         return {from, to}
    }

    move(from, to) {
        let list = this.keys(from)
        if (!list) return
        let data = this.copy(from, to)
        Meteor.wrapAsync(client.deleteObjects, client)({Delete: {Objects: data.from}})
        return data
    }

}

export default S3 = new S3()
