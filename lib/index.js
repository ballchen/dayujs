'use strict'

var request = require('request')
var md5 = require('blueimp-md5')
var _ = require('lodash')

var API_URL = 'http://gw.api.taobao.com/router/rest'

function getTimeStamp () {
  var time = new Date()
  var timestamp = time.getFullYear() + '-' +
    ('0' + (time.getMonth() + 1)).slice(-2) + '-' +
    ('0' + time.getDate()).slice(-2) + ' ' +
    ('0' + time.getHours()).slice(-2) + ':' +
    ('0' + time.getMinutes()).slice(-2) + ':' +
    ('0' + time.getSeconds()).slice(-2)
  return timestamp
}

function AliDaYu (config) {
  config = config || {}

  let basic = {
    'v': '2.0',
    'format': 'json',
    'sign_method': 'md5'
  }

  this._opt = _.assign(config, basic);
}

AliDaYu.prototype._merge = function (object, source) {
  if (object === source) {
    return
  }
  for (var p in source) {
    if (source.hasOwnProperty(p)) {
      object[p] = source[p]
    }
  }
  return object
}

AliDaYu.prototype._sign = function (args) {
  args = this._merge(this._opt, args)
  args.timestamp = getTimeStamp()
  var arr = Object.keys(args).sort()
  var signStr = arr.map(function (key) {
    if (typeof args[key] === 'object') {
      args[key] = JSON.stringify(args[key])
    }
    return key + args[key]
  }).join('')
  var str = this._opt.secret + signStr + this._opt.secret
  return md5(str).toUpperCase()
}

AliDaYu.prototype._request = function (args, callback) {
  this._opt.sign = this._sign(args)
  request.post({ url: API_URL, form: this._opt }, function (err, httpResponse, body) {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

AliDaYu.prototype.sms = function (args, callback) {
  args = args || {}
  args.method = 'alibaba.aliqin.fc.sms.num.send'
  args.sms_type = 'normal'
  this._request(args, callback)
}

module.exports = AliDaYu
