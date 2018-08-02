var admin = require("firebase-admin");
var serviceAccount=require("~pushNotification/pushshsecuirity-26784-firebase-adminsdk-hmagx-dd17000373.json");

admin.initializeApp({
	credential:admin.credential.cert(serviceAccount),
	databaseURL: "https://shsecuirity-26784.firebaseio.com"
});

var registrationToken="eeZTTxchbyA:APA91bGfgZE1JOEtMo2pbLw9sXhtmulu2YPzjpbVoaf4fCLX2OpqEVpdZyeDom7SfViBb7D6x0qVZtQREwUu6kBqnsdRKSNws4xaATbwu1lMRZPoHq2zdEB1KTFepiq_x-W16Nwjo0UeuT3EeVbtF0pqnoZqVR7DKg"

var payload ={
	data:{
	MyKey1:"Hello someone in there on the door"
	}
};


var options = {
	priority:"high"
	timeToLive:60*60*24
};

admin.messaging().sendToDevice(registrationToken, payload, options)
	.then(function(response){
	console.log("successfully send the notification",response)
})
	.catch(function(error){
	console.log("Error sending message:", error);
});
