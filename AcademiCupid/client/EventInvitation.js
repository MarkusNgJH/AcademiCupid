Template.EventInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		// console.log("Form submitted");
		// console.log(event.type);
		var participantName = event.target.participantUsername.value;
		console.log(participantName);
		// var participant = User.findOne({name: participantName});
		var currentEvent = Session.get('currentEvent');
		console.log(currentEvent);
		User.update({name: participantName}, {$addToSet: {enrolled : currentEvent}});
	}
});