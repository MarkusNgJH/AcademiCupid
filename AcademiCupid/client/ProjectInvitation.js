Template.ProjectInvitation.rendered = function() {
 $('ui dropdown').dropdown();
 $('#multi-select').dropdown();
 $('.dropdown').dropdown('refresh');
}

Template.ProjectInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var projectId = FlowRouter.getParam('projectId');
		var currentProject = Projects.findOne(projectId);
		var selectedUsersId = document.getElementsByClassName("item active filtered");
		for(var i = 0; i < selectedUsersId.length; i++) {
			var nextUserId = selectedUsersId[i].getAttribute("data-value");
			var nextUser = Meteor.users.findOne(nextUserId);
			var userProjects = nextUser.profile.projects;
			userProjects.push(projectId);
			var currentProjectMembers = currentProject.members;
			currentProjectMembers.push(nextUserId);
			// nextUser.profile.projects.push(projectId);
			// currentProject.members.push(nextUserId);
			Meteor.users.update(nextUserId, {$set: {"profile.projects": userProjects}});
			Projects.update(projectId, {$set: {"members": currentProjectMembers}});
		}
		$('.dropdown').dropdown('clear');
	}
});

Template.ProjectInvitation.helpers ({
	'getEventId': function() {
		return FlowRouter.getParam('eventId');
	}, 
	'getProject': function () {
		var currentProjectId = FlowRouter.getParam('projectId');
		return Projects.findOne(currentProjectId);
	},
	'getParticipants': function() {
		var currentEventId = FlowRouter.getParam('eventId');
		var currentEvent = Events.findOne(currentEventId);
		// console.log("currentEvent: " + currentEvent);
		var eventParticipantsId = currentEvent.participants;
		console.log("eventParticipantsId: " + eventParticipantsId);
		var eventParticipants = [];
		for (var i = 0; i < eventParticipantsId.length; i++) {
			if(eventParticipantsId[i] != Meteor.userId()) {
				eventParticipants.push(Meteor.users.findOne(eventParticipantsId[i]));
			}
		}
		console.log(eventParticipants);
		return eventParticipants;
	}
});

// event: ()=> {
// 		var id = FlowRouter.getParam('id'); //the param name is 'id'. Refer to routes.js. The name will be the string after the colon. Hence, we are getting the id from the route itself, i.e. from the URL
// 		return Events.findOne({_id: id}); //this id is then used to find the correct recipe within our Recipe collection
// 	},