function remove(target, arr){
	arr.splice(arr.indexOf(target), 1);
}

Template.MyProjects.rendered = function() {
	Session.set('viewEnrolledProjects', true);
	$(".enrolledProjectsView").addClass("green");
};

Template.MyProjects.events({
	'click .enrolledProjectsView': function() {
		$(".enrolledProjectsView").addClass("green");
		$(".pendingProjectsView").removeClass("green");
		Session.set('viewEnrolledProjects', true);
	},
	'click .pendingProjectsView': function() {
		$(".pendingProjectsView").addClass("green");
		$(".enrolledProjectsView").removeClass("green");
		Session.set('viewEnrolledProjects', false);
	},
	'click .acceptProj': function() {
		var projectId = this._id;
		var userId = Meteor.userId();
		var user = Meteor.users.findOne(userId);
		var project = Projects.findOne(projectId);
		var userProjects = user.profile.projects;
		userProjects.push(projectId);
		var userPendingProjects = user.profile.pendingProjects;
		remove(projectId, userPendingProjects);
		var projectMembers = project.members;
		projectMembers.push(userId);
		var projectPendingMembers = project.pendingMembers;
		remove(userId, projectPendingMembers);
		Meteor.users.update(userId, {$set: {"profile.pendingProjects": userPendingProjects}});
		Meteor.users.update(userId, {$set: {"profile.projects": userProjects}});
		Projects.update(projectId, {$set: {"pendingMembers": projectPendingMembers}});
		Projects.update(projectId, {$set: {"members": projectMembers}});
		Projects.update(projectId, {$set: {"numMembers": (projectMembers.length + 1)}});
	},
	'click .declineProj': function() {
		var projectId = this._id;
		var userId = Meteor.userId();
		var user = Meteor.users.findOne(userId);
		var project = Projects.findOne(projectId);
		var userPendingProjects = user.profile.pendingProjects;
		remove(projectId, userPendingProjects);
		var projectPendingMembers = project.pendingMembers;
		remove(userId, projectPendingMembers);
		Meteor.users.update(userId, {$set: {"profile.pendingProjects": userPendingProjects}});
		Projects.update(projectId, {$set: {"pendingMembers": projectPendingMembers}});
	}
});

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
	},
	isEnrolledProjectsView: function() {
		return Session.get('viewEnrolledProjects');
	},
	getUserPendingProjects: function() {
		var myPendingProjectIds = Meteor.users.findOne(Meteor.userId()).profile.pendingProjects;
		var myPendingProjects = [];
		for(var i = 0; i < myPendingProjectIds.length; i++) {
			myPendingProjects.push(Projects.findOne(myPendingProjectIds[i]));
		}
		return myPendingProjects;
	}
});