Template.Projects.helpers({
	getProjects: function() {
		var eventId = Session.get('currentEvent');
		return Projects.find({belongsToEvent: eventId});
	}
});