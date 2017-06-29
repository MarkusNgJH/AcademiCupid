Template.ProjectInvitation.rendered = function() {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
	$('.dropdown').dropdown('refresh');
}

function isNotDuplicate(str, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(str === arr[i]) {
			return false;
		}
	}
	return true;
}

function hasDuplicate(inputArr){
	var currentProjectId = FlowRouter.getParam('projectId');
	var currentProject = Projects.findOne(currentProjectId);
	var projectMembersId = currentProject.members;
	for(var i=0; i<inputArr; i++){
		if(!isNotDuplicate(inputArr[i], projectMembersId)){
			return true;
		};
	}
	return false; // returns true if at least one input exists in current Array
}	

Template.ProjectInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var projectId = FlowRouter.getParam('projectId');
		var currentProject = Projects.findOne(projectId);
		var selectedUsersId = document.getElementsByClassName("item active filtered");
		for(var i = 0; i < selectedUsersId.length; i++) {
			var nextUserId = selectedUsersId[i].getAttribute("data-value");
			if(!isNotDuplicate(nextUserId, currentProject.members)){
					swal({
                        title: 'Already have selected skill(s)',
                        text: 'Please try again',
                        type: 'error',
                        showConfirmButton: true
                    });
			}
			var nextUser = Meteor.users.findOne(nextUserId);
			var userProjects = nextUser.profile.projects;
			userProjects.push(projectId);
			var currentProjectMembers = currentProject.members;
			currentProjectMembers.push(nextUserId);
			Meteor.users.update(nextUserId, {$set: {"profile.projects": userProjects}});
			Projects.update(projectId, {$set: {"members": currentProjectMembers}});
			Projects.update(projectId, {$set: {"numMembers": (currentProjectMembers.length + 1)}})
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
		//console.log("eventParticipantsId: " + eventParticipantsId);
		var eventParticipants = [];
		for (var i = 0; i < eventParticipantsId.length; i++) {
			if(eventParticipantsId[i] != Meteor.userId()) {
				eventParticipants.push(Meteor.users.findOne(eventParticipantsId[i]));
			}
		}
		//console.log(eventParticipants);
		return eventParticipants;
	},
	'getMembers': function() {
		var projectId = FlowRouter.getParam('projectId');
		var currentProject = Projects.findOne(projectId);
		var membersId = currentProject.members
		var members = [];
		for (var i = 0; i<membersId.length; i++){
			members.push(Meteor.users.findOne(membersId[i]))
		}
		return members;
	}
});

// event: ()=> {
// 		var id = FlowRouter.getParam('id'); //the param name is 'id'. Refer to routes.js. The name will be the string after the colon. Hence, we are getting the id from the route itself, i.e. from the URL
// 		return Events.findOne({_id: id}); //this id is then used to find the correct recipe within our Recipe collection
// 	},