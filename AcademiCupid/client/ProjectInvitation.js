Template.ProjectInvitation.onCreated(function() {
	Session.set('editMode', false);
});

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

function remove(target, arr){
	arr.splice(arr.indexOf(target), 1);
}

Template.ProjectInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var editMode = Session.get('editMode');
		var projectId = FlowRouter.getParam('projectId');
		var currentProject = Projects.findOne(projectId);
		var selectedUsersId = document.getElementsByClassName("item active filtered");
		if(editMode){
			for(var i = 0; i < selectedUsersId.length; i++) {
				var nextUserId = selectedUsersId[i].getAttribute("data-value");
				if(!isNotDuplicate(nextUserId, currentProject.members)){
					swal({
						title: 'Selected User(s) has already been invited',
						text: 'Please try again',
						type: 'error',
						showConfirmButton: true
					});
					break;
				}
				else if(currentProject.numMembers >= currentProject.capacity){
					swal({
						title: 'Your Team is at full capacity',
						text: 'Please try again',
						type: 'error',
						showConfirmButton: true
					});
					break;
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
		else{
			console.log('delete');
			for(var i = 0; i < selectedUsersId.length; i++) {
				var nextUserId = selectedUsersId[i].getAttribute("data-value");
				var nextUser = Meteor.users.findOne(nextUserId);
				var userProjects = nextUser.profile.projects;
				// userProjects.push(projectId);
				remove(projectId, userProjects);
				var currentProjectMembers = currentProject.members;
				// currentProjectMembers.push(nextUserId);
				remove(nextUserId, currentProjectMembers);
				Meteor.users.update(nextUserId, {$set: {"profile.projects": userProjects}});
				Projects.update(projectId, {$set: {"members": currentProjectMembers}});
				Projects.update(projectId, {$set: {"numMembers": (currentProjectMembers.length + 1)}})
			}
			$('.dropdown').dropdown('clear');
		}
	},

	'click .toggle-edit': function() {
		console.log(Session.get('editMode'));
		Session.set('editMode', !Session.get('editMode'));
	// 		$('ui dropdown').dropdown();
	// $('#multi-select').dropdown();
	// $('.dropdown').dropdown('refresh');
},
});

Template.ProjectInvitation.helpers ({
	'getEventId': function() {
		return FlowRouter.getParam('eventId');
	}, 
	editMode: function () {
		return Session.get('editMode');
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