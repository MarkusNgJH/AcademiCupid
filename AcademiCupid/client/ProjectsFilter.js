Template.ProjectsFilter.helpers({
	getProjects: function() {
		var currEventId = FlowRouter.getParam('eventId');
		return Projects.find({belongsToEvent: currEventId});
	}
});

Template.ProjectsFilter.events({
	'click #selectedFilter': function() {
		var selectedProjectId = this._id;
	}
});