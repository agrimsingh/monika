var Firebase = require("firebase")
var Twilio = require("twilio")
var credentials = require('./credentials')

var accountSid = credentials.twilio.accountSid
var authToken = credentials.twilio.authToken
var myNumber = credentials.twilio.myNumber
var client = Twilio(accountSid, authToken)
client.messages.create({
  body: 'Someone might have passed out in toilet 1',
  to: '+6593722542',
  from: myNumber
}, (err, message) => {
  if (!err) return
  console.log(err)
  console.log(message)
})