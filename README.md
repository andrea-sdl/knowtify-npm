knowtify-npm
============

Unofficial NPM Package to integrate with Knowtify

#Install

via [npm](https://npmjs.org)

	npm install knowtify-node

#How to use

	var knowtify = require('knowtify-node');
	var isDebug=false; //not required
	var knowtifyClient = new knowtify.Knowtify("YOUR_TOKEN",isDebug);

#Available methods

	knowtifyClient.contacts.add(params,success,error)
	knowtifyClient.contacts.edit(params,success,error)
	knowtifyClient.contacts.delete(params,success,error)
	knowtifyClient.contacts.upsert(params,success,error)
	knowtifyClient.globalData.edit(params,success,error)

#Example of use

	var knowtify = require('knowtify-node');
	var knowtifyClient = new knowtify.Knowtify("123478003030");
    var knowtifyContact =
    {
        name:"Andrea",
        email: "test@test.com",
        data: {
            signupDate: new Date(),
            source:"Haptime",
            contactType:"Trial"
        }
    };

    //you can also put more than 1 contact for batch insert/updates
	var contacts = {"contacts": [
            knowtifyContact
    ]};

    knowtifyClient.contacts.add(contacts,
        function(success){
            console.log("RESULT:"+success);
        },
        function(err){
            console.log("ERROR:"+err);
        }
    );

	function callback(mandrill_response){
		console.log(mandrill_response);
	};


#Author

Andrea Grassi @andrea_sdl, at Haptime.in

#Do you want to improve the npm?

Feel free to help ;) or contact me directly [through my page](http://about.me/andrea_sdl) or my email andrea \[at\] haptime.in


#Thanks to...

A great thanks goes to the guys at [Mandrill](http://mandrillapp.com),
I studied their code as a starting point for this npm.