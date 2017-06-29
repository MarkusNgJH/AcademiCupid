Template.Projects.rendered = function() {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
	$('.dropdown').dropdown('refresh');
}

Template.Projects.helpers({
	getEventId: function () {
		return FlowRouter.getParam('eventId');
	},
	getProjects: function() {
		var eventId = FlowRouter.getParam('eventId');
		return Projects.find({belongsToEvent: eventId});
	},
});

Template.Projects.events ({
	'submit form': function(event){
		event.preventDefault();
		var eventId = FlowRouter.getParam('eventId');
		var selectedProjectId = document.getElementsByClassName("item active selected");
		var projectId = selectedProjectId[0].getAttribute("data-value");
		FlowRouter.go('ProjectSingle', { eventId: eventId, projectId: projectId })
	}
});

//event=:eventId/project=:projectId