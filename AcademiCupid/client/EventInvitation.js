Template.EventInvitation.events ({
	'submit form': function(event){
		event.preventDefault();	
		var participantName = event.target.participantUsername.value;
		var currentEvent = Session.get('currentEvent');
		var user_id = User.findOne({name: participantName})._id;
		var acct_id = User.findOne({name: participantName}).owner;
		console.log("user_id " + user_id);
		console.log("acct_id " + acct_id)
		User.update(user_id, {$addToSet: {enrolled : currentEvent}});
		Events.update(currentEvent, {$addToSet: {participants: acct_id}});
	}
});