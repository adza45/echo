/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("ChangeColor" === intentName) {
        ChangeColor(intent, session, callback);
    } else if ("LightsOn" === intentName) {
        LightsOn(intent, session, callback);
    } else if ("LightsOff" === intentName) {
        LightsOff(intent, session, callback);
    } else if ("ChangeIntensity" === intentName) {
        ChangeIntensity(intent, session, callback);
    } else if ("DimLights" === intentName) {
        DimLights(intent, session, callback);
    } else if ("BrightenLights" === intentName) {
        BrightenLights(intent, session, callback);
    } else if ("MaxIntensity" === intentName) {
        MaxIntensity(intent, session, callback);
    } else if ("MinIntensity" === intentName) {
        MinIntensity(intent, session, callback);
    } else if ("FadeOn" === intentName) {
        FadeOn(intent, session, callback);
    } else if ("FadeOff" === intentName) {
        FadeOff(intent, session, callback);
    } else if ("Exit" === intentName) {
        Exit(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.StopIntent" === intentName || "AMAZON.CancelIntent" === intentName) {
        handleSessionEndRequest(callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Hello Adam, how may I help you today?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What can I do for you sir?";
    var shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    var cardTitle = "Session Ended";
    var speechOutput = "Have a nice day!";
    // Setting this to true ends the session and exits the skill.
    var shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
  function FadeOn(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";
	
	var tools = require('./tools');
	tools.ChangeColorRequest("pass", "1", "pass", function(result) {
		speechOutput = "Fade is now on.";
		repromptText = "Fade is now on.";
		callback(sessionAttributes,
			buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
	});
 }
 
  function FadeOff(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";
	
	var tools = require('./tools');
	tools.ChangeColorRequest("pass", "0", "pass", function(result) {
		speechOutput = "Fade is now off.";
		repromptText = "Fade is now off.";
		callback(sessionAttributes,
			buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
	});
 }
 
 function MaxIntensity(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";
	
	var tools = require('./tools');
	tools.ChangeColorRequest("255", "0", "pass", function(result) {
		speechOutput = "Now at maximum brightness.";
		repromptText = "Now at maximum brightness.";
		callback(sessionAttributes,
			buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
	});
 }
 
  function MinIntensity(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";
	
	var tools = require('./tools');
	tools.ChangeColorRequest("032", "0", "pass", function(result) {
		speechOutput = "Now at minimum brightness.";
		repromptText = "Now at minimum brightness.";
		callback(sessionAttributes,
			buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
	});
 }
 
 function ChangeIntensity(intent, session, callback) {
	var cardTitle = intent.name;
    var IntensitySlot = intent.slots.Intensity;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

	if (IntensitySlot) {
        var Intensity1 = IntensitySlot.value;
		var Intensity = parseInt(Intensity1);
		var placeholder = "";
		var newIntensity = String(Intensity);
		if(Intensity < 100 && Intensity >= 10)
		{
				placeholder = "0";
				newIntensity = placeholder.concat(String(Intensity));
		}
		else if(Intensity < 10)
		{
				placeholder = "00";
				newIntensity = placeholder.concat(String(Intensity));
		}
        //sessionAttributes = createFavoriteColorAttributes(favoriteColor);
		if(Intensity >= 0 && Intensity <= 255)
		{
			var tools = require('./tools');
			tools.ChangeColorRequest(newIntensity, "0", "pass", function(result) {
				speechOutput = "I have changed the intensity to " + newIntensity;
				repromptText = "I have changed the intensity to " + newIntensity;
				callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} 
		else
		{
			speechOutput = Intensity + " is not in the valid range. Try a number greater or equal to zero and less or equal to 255";
			speechOutput = Intensity + " is not in the valid range. Try a number greater or equal to zero and less or equal to 255";
			callback(sessionAttributes,
				buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
		}
	}
 }
 
function DimLights(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";
	var tools = require('./tools');
	tools.ChangeColorRequest("pass", "pass", "pass", function(result) {
		var currentIntensity = parseInt(result.substring(5,8));
		var newIntensity = 0;
		
		if(currentIntensity >= 64 && currentIntensity < 128)
		{
			newIntensity = "064";
			tools.ChangeColorRequest(newIntensity, "0", "pass", function(result) {
				speechOutput = "I have dimmed the lights";
				repromptText = "I have dimmed the lights";
				callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		}
		else if(currentIntensity >= 128)
		{
			newIntensity = currentIntensity - 64;
			if(newIntensity  < 100)
			{
				var placeholder = "0";
				newIntensity = placeholder.concat(String(newIntensity));
			}
			tools.ChangeColorRequest(newIntensity, "0", "pass", function(result) {
				speechOutput = "I have dimmed the lights";
				repromptText = "I have dimmed the lights";
				callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		}
		else
		{
			speechOutput = "The lights can't be dimmed any further.";
			repromptText = "The lights can't be dimmed any further.";
			callback(sessionAttributes,
				buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
		}
	});	
 }
 
 function BrightenLights(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";
	var tools = require('./tools');
	tools.ChangeColorRequest("pass", "pass", "pass", function(result) {
		var currentIntensity = parseInt(result.substring(5,8));
		var newIntensity = 0;
		
		if(currentIntensity <= 255 && currentIntensity >= 192)
		{
			newIntensity = 255;
			tools.ChangeColorRequest(newIntensity, "0", "pass", function(result) {
				speechOutput = "I have brightened the lights";
				repromptText = "I have brightened the lights";
				callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		}
		else if(currentIntensity < 192)
		{
			newIntensity = currentIntensity + 64;
			if(newIntensity < 100)
			{
				var placeholder = "0";
				newIntensity = placeholder.concat(String(newIntensity));
			}
			tools.ChangeColorRequest(newIntensity, "0", "pass", function(result) {
				speechOutput = "I have brightened the lights";
				repromptText = "I have brightened the lights";
				callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		}
		else
		{
			speechOutput = "The lights can't be brightened any further.";
			repromptText = "The lights can't be brightened any further.";
			callback(sessionAttributes,
				buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
		}
	});	
 }
 
function ChangeColor(intent, session, callback) {
    var cardTitle = intent.name;
    var ColorSlot = intent.slots.Color;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

    if (ColorSlot) {
        var Color = ColorSlot.value;
        //sessionAttributes = createFavoriteColorAttributes(favoriteColor);
		if(Color == "red")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "0", function(result) {
				speechOutput = "I have changed the color to red.";
				repromptText = "I have changed the color to red.";
				callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "purple")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "4", function(result) {
				speechOutput = "I have changed the color to purple.";
				repromptText = "I have changed the color to purple.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "blue")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "2", function(result) {
				speechOutput = "I have changed the color to blue.";
				repromptText = "I have changed the color to blue.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "green")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "1", function(result) {
				speechOutput = "I have changed the color to green.";
				repromptText = "I have changed the color to green.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "cyan")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "3", function(result) {
				speechOutput = "I have changed the color to cyan.";
				repromptText = "I have changed the color to cyan.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "yellow")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "5", function(result) {
				speechOutput = "I have changed the color to yellow.";
				repromptText = "I have changed the color to yellow.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "orange")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "6", function(result) {
				speechOutput = "I have changed the color to orange.";
				repromptText = "I have changed the color to orange.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "white")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "7", function(result) {
				speechOutput = "I have changed the color to white.";
				repromptText = "I have changed the color to white.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "aqua")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("pass", "0", "9", function(result) {
				speechOutput = "I have changed the color to aqua.";
				repromptText = "I have changed the color to aqua.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		} else if(Color == "black")
		{
			var tools = require('./tools');
			tools.ChangeColorRequest("000", "pass", "pass", function(result) {
				speechOutput = "I have changed the color to black.";
				repromptText = "I have changed the color to black.";
				    callback(sessionAttributes,
					buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
			});
		}
    }
}

function LightsOn(intent, session, callback) {
	  var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

	var tools = require('./tools');
	tools.ChangeColorRequest("255", "pass", "pass", function(result) {
		speechOutput = "The lights are now on.";
		repromptText = "The lights are now on.";
		    callback(sessionAttributes,
			buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
	});
}

function LightsOff(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

	var tools = require('./tools');
	tools.ChangeColorRequest("000", "pass", "pass", function(result) {
		speechOutput = "The lights are now off";
		repromptText = "The lights are now off";
		    callback(sessionAttributes,
			buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
	});
}

function Exit(intent, session, callback) {
	var cardTitle = intent.name;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

    speechOutput = "Have a nice day!";
    repromptText = "Have a nice day!";

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/*function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor: favoriteColor
    };
}*/

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}