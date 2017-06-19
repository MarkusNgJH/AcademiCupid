Template.ProjectSingle.onCreated(function() {
    Session.set('editMode', false);
});

Template.ProjectSingle.helpers({
	getProject: ()=> {
		var id = FlowRouter.getParam('projectId'); //the param name is 'id'. Refer to routes.js. The name will be the string after the colon. Hence, we are getting the id from the route itself, i.e. from the URL
		return Projects.findOne({_id: id}); //this id is then used to find the correct recipe within our Recipe collection
	},
	getEventId: function () {
		return FlowRouter.getParam('eventId');
	},
	getProjectMembers: function() {
		var currentProjectId = FlowRouter.getParam('projectId');
		var currentProject = Projects.findOne(currentProjectId);
		var memberIds = currentProject.members;
		var projectMembers = [];
		for(var i = 0; i < memberIds.length; i++) {
			projectMembers.push(Meteor.users.findOne(memberIds[i]));
		}
		return projectMembers;
	},
	getProjectId: function () {
		return FlowRouter.getParam('projectId');
	},
	editMode: function () {
		return Session.get('editMode');
	}
});

Template.ProjectSingle.events({
	'click .toggle-edit': function() {
		console.log(Session.get('editMode'));
		Session.set('editMode', !Session.get('editMode'));
	}
});