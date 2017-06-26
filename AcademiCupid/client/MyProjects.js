Template.MyProjects.helpers({
	getUser: function() {
		return Meteor.users.findOne(Meteor.userId());
	},
	getUserProjects: function() {
		var projectIds = Meteor.users.findOne(Meteor.userId()).profile.projects;
		var projects = [];
		for(var i = 0; i < projectIds.length; i++) {
			projects.push(Projects.findOne(projectIds[i]));
		}
		return projects;
	}
});