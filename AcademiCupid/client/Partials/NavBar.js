var parts = location.href.split('/')
var id = parts.pop()

Template.NavBar.events({
	'click .create-new-project': () => {
		var parts = location.href.split('/');
		var id = parts.pop();
		Session.set('currentEvent', id);
	}
});

Template.NavBar.helpers({
	isEventOwner: function () {
		var currentEventId = FlowRouter.getParam('eventId');
		var eventOwner = Events.findOne(currentEventId).owner;
		return eventOwner === Meteor.userId();
	},
	eventId: function () {
		return FlowRouter.getParam('eventId');
	}
});