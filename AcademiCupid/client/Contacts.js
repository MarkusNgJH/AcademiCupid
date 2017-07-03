Template.Contacts.helpers ({
	'getParticipants': function() {
		var currentEventId = FlowRouter.getParam('eventId');
		var currentEvent = Events.findOne(currentEventId);
		// console.log("currentEvent: " + currentEvent);
		var eventParticipantsId = currentEvent.participants;
		//console.log("eventParticipantsId: " + eventParticipantsId);
		var eventParticipants = [];
		for (var i = 0; i < eventParticipantsId.length; i++) {
			eventParticipants.push(Meteor.users.findOne(eventParticipantsId[i]));
		}
		return eventParticipants;
	}
});

Template.Contacts.events ({
	'submit form': function(event){
		event.preventDefault();
		console.log("form submitted");
		var eventId = FlowRouter.getParam('eventId');
		var selectedUserId = document.getElementsByClassName("item active selected");
		console.log(selectedUserId[0]);
		var userId = selectedUserId[0].getAttribute("data-value");
		FlowRouter.go('ProfilePage', {userId: userId })
	}
});