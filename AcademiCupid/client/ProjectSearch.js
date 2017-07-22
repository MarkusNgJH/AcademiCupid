Template.ProjectSearch.rendered = function() {
	Session.set('searchProjectsMode', false);
};

Template.ProjectSearch.helpers({
	isSearchProjectsMode: function() {
		return Session.get('searchProjectsMode');
	},
	getProjects: function() {
		return Projects.find({belongsToEvent: FlowRouter.getParam('eventId')});
	}
});

Template.ProjectSearch.events({
	'click #project-search-btn': function() {
		console.log("clicked");
		Session.set('searchProjectsMode', !Session.get('searchProjectsMode'));
		if(Session.get('searchProjectsMode')) {
			$('#project-search-btn').addClass('green');
		} else {
			$('#project-search-btn').removeClass('green');
		}
	}
});