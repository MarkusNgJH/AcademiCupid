Template.SkillsFilter.helpers({
	getProjects: function() {
		var eventId = FlowRouter.getParam('eventId');
		return Projects.find({belongsToEvent: eventId});
	}
});