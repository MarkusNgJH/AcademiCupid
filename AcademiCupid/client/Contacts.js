Template.Contacts.helpers ({
	'getParticipants': function() {
		var currentEventId = Session.get('currentEvent');
		var currentEvent = Events.findOne(currentEventId);
		// console.log("currentEvent: " + currentEvent);
		var eventParticipantsId = currentEvent.participants;
		console.log("eventParticipantsId: " + eventParticipantsId);
		var eventParticipants = [];
		for (var i = 0; i < eventParticipantsId.length; i++) {
			eventParticipants.push(Meteor.users.findOne(eventParticipantsId[i]));
		}
		console.log(eventParticipants);
		return eventParticipants;
	}
});