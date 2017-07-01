Template.EventInvitation.rendered = function() {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
	$('.dropdown').dropdown('refresh');
}

Template.EventInvitation.onCreated(function() {
	Session.set('editMode', false);
});

function remove(target, arr){
	arr.splice(arr.indexOf(target), 1);
}

function isNotDuplicate(str, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(str === arr[i]) {
			return false;
		}
	}
	return true;
}

Template.EventInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var validInput = true;
		var currentEventId = FlowRouter.getParam('eventId');
		var selectedUsers = document.getElementsByClassName("item active filtered");
		var editMode = Session.get('editMode');
		if(editMode){
			for(var i = 0; i < selectedUsers.length; i++) {
				var nextUserId = selectedUsers[i].getAttribute("data-value");
				var originalUser = Meteor.users.findOne(nextUserId);
				var originalEvent = Events.findOne(currentEventId);
				var enrolledEvents = originalUser.profile.enrolled;
				console.log(enrolledEvents);
				if (isNotDuplicate(currentEventId, enrolledEvents)) {
					enrolledEvents.push(currentEventId);
				} else {
					swal({
						title: originalUser.emails[0].address + ' is already enrolled',
						text: 'Please try agian',
						type: 'error',
						showConfirmButton: true
					});
					validInput = false;
					break;
				}
				var eventParticipants = originalEvent.participants;
				console.log(eventParticipants);
				if (isNotDuplicate(nextUserId, eventParticipants)) {
					eventParticipants.push(nextUserId);
				}
				Meteor.users.update(nextUserId, {$set: {"profile.enrolled": enrolledEvents}});
				Events.update(currentEventId, {$set: {"participants": eventParticipants}});
			}
			if(validInput) {
				$('.dropdown').dropdown('clear');
				swal({
					title: 'Successfully added participants!',
					type: 'success',
					showConfirmButton: true
				});
			}
		}
		else{
			console.log("remove")
			for(var i = 0; i < selectedUsers.length; i++) {
				var nextUserId = selectedUsers[i].getAttribute("data-value");
				var originalUser = Meteor.users.findOne(nextUserId);
				var originalEvent = Events.findOne(currentEventId);
				var enrolledEvents = originalUser.profile.enrolled;
				var eventParticipants = originalEvent.participants;
				remove(nextUserId, eventParticipants);
				remove(currentEventId, enrolledEvents);
				Meteor.users.update(nextUserId, {$set: {"profile.enrolled": enrolledEvents}});
				Events.update(currentEventId, {$set: {"participants": eventParticipants}});
			}
			if(validInput) {
				$('.dropdown').dropdown('clear');
				swal({
					title: 'Successfully removed participants!',
					type: 'success',
					showConfirmButton: true
				});
			}
		}
	},

	'click .toggle-edit': function() {
		console.log(Session.get('editMode'));
		Session.set('editMode', !Session.get('editMode'));
	},
});

Template.EventInvitation.helpers ({
	'getUsers': function() {
		return Meteor.users.find({_id: {$ne: Meteor.userId()}});
	},
	'eventId': function() {
		return FlowRouter.getParam('eventId');
	},
	'getParticipants': function() {
		var currentEventId = FlowRouter.getParam('eventId');
		var currentEvent = Events.findOne(currentEventId);
		// console.log("currentEvent: " + currentEvent);
		var eventParticipantsId = currentEvent.participants;
		//console.log("eventParticipantsId: " + eventParticipantsId);
		var eventParticipants = [];
		for (var i = 0; i < eventParticipantsId.length; i++) {
			if(eventParticipantsId[i] != Meteor.userId()) {
				eventParticipants.push(Meteor.users.findOne(eventParticipantsId[i]));
			}
		}
		//console.log(eventParticipants);
		return eventParticipants;
	},
	editMode: function () {
		return Session.get('editMode');
	},
});
