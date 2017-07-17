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
	skillsFilterMode: function() {
		var isSkillsFilterMode = Session.get('skillsFilterMode');
		if(isSkillsFilterMode) {
			return true;
		} else {
			$('.dropdown').dropdown('clear');
			Session.set('selectedSkillsFilter', []);
			return false;
		}
	},
	hasSelectedSkillsFilter: function() {
		var selectedSkillsFilter = Session.get('selectedSkillsFilter');
		console.log("selectedSkillsFilter:");
		console.log(selectedSkillsFilter);
		return selectedSkillsFilter.length > 0
	}
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