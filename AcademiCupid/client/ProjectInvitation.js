Template.ProjectInvitation.rendered = function() {
 $('ui dropdown').dropdown();
 $('#multi-select').dropdown();
 $('.dropdown').dropdown('refresh');
}

Template.ProjectInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var currentEvent = Session.get('currentEvent');
		var selectedUsers = document.getElementsByClassName("item active filtered");
		for(var i = 0; i < selectedUsers.length; i++) {
			var nextUserId = selectedUsers[i].getAttribute("data-value");
			var originalUser = Meteor.users.findOne(nextUserId);
			var originalEvent = Events.findOne(currentEvent);
			var enrolledEvents = originalUser.profile.enrolled;
			console.log("printing enrolledEvents");
			console.log(enrolledEvents);
			enrolledEvents.push(currentEvent);
			console.log("printing enrolledEvents after push");
			console.log(enrolledEvents);
			var eventParticipants = originalEvent.participants;
			console.log("printing eventParticipants");
			console.log(eventParticipants);
			eventParticipants.push(nextUserId);
			console.log("printing eventParticipants after push");
			console.log(eventParticipants);
			//var fName = original.profile.firstName;
			//var lName =  original.profile.lastName;
			//var skills = original.profile.skills;
			//console.log(Events.findOne(currentEvent));
			Meteor.users.update(nextUserId, {$set: {"profile.enrolled": enrolledEvents}});
			Events.update(currentEvent, {$set: {"participants": eventParticipants}});
		}
		$('.dropdown').dropdown('clear');
	}
});

Template.EventInvitation.helpers ({
	'getParticipants': function() {
		var currentEventId = Session.get('currentEvent');
		currentEvent = Events.findOne(currentEventId);
		var eventParticipantsId = currenEvent.participants;
		var eventParticipants = [];
		for (var id in eventParticipantsId) {
			eventParticipants.push(Meteor.users.findOne({_id: id}));
		}
	}
});
