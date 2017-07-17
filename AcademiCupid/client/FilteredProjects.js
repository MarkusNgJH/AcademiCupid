Template.FilteredProjects.helpers({
	filteredProjects: function() {
		var eventId = FlowRouter.getParam('eventId');
		var allEventProjects = Projects.find({belongsToEvent: eventId}).fetch();
		var selectedSkillsFilter = Session.get('selectedSkillsFilter');
		var targetProjects = [];
		for(var i=0; i<allEventProjects.length; i++) {
			for(var j=0; j<allEventProjects[i].desiredSkills.length; j++) {
				if(selectedSkillsFilter.includes(allEventProjects[i].desiredSkills[j])) {
					targetProjects.push(allEventProjects[i]);
					break;
				}
			}
		}
		console.log(targetProjects);
		return targetProjects;
	}
});