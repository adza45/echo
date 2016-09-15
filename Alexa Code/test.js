	var tools = require('./tools')
	//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
			tools.ChangeColorRequest("255", "pass", "pass", function(result) {
				speechOutput = "I have changed the color to red.";
				repromptText = "I have changed the color to red.";
				console.log(parseInt(result.substring(5,8)));
	});
