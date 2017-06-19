Template.Projects.helpers({
	getEventId: function () {
		return FlowRouter.getParam('eventId');
	},
	getProjects: function() {
		var eventId = FlowRouter.getParam('eventId');
		return Projects.find({belongsToEvent: eventId});
	}
});