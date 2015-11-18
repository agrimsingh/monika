from firebase import Firebase
from datetime import datetime
import time
from twilio.rest import TwilioRestClient
 
# Your Account Sid and Auth Token from twilio.com/user/account
account_sid = 'AC450a6c8d6abfc471eabb75cdfdb0db4b'
auth_token  = '7def86916a43d65efe8a5ca1d5fa654c'

f = Firebase('https://monikadb.firebaseio.com/logs')
start_time = time.time()
def upload_to_firebase(data):
	formatted_data = {}
	for row in data:
		[name, timestamp] = row
		# time_object = datetime.strptime(time_string, '%Y-%m-%d %H:%M:%S')
		# timestamp = int(time.mktime(time_object.timetuple()))
		# print timestamp
		formatted_data[name] = timestamp
	f.push(formatted_data)

if __name__ == '__main__':
	#example data to be uploaded
	client = TwilioRestClient(account_sid, auth_token)
	start_time = int(time.time())

	data = [
		['f8:ug:b6:h3:lw:n0', start_time],
		['9x:0b:jx:cd:bt:yx', start_time]
	]
	upload_to_firebase(data)
	time.sleep(80)

	data = [
		['f8:ug:b6:h3:lw:n0', start_time]
	]
	upload_to_firebase(data)
	#time.sleep(10)

	message = client.messages.create(
		body="There might be a situation in toilet 1",
	    to='+6593722542',    # Replace with your phone number
	    from_='+14803606584' # Replace with your Twilio number
	)
	print message.sid

