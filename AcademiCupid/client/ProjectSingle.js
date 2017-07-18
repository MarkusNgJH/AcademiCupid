$('.linked.item')
.popup()
;
function refreshModal() {
    Meteor.setTimeout(function() { refreshModal() }, 1);
    return $('.ui.modal').modal('refresh');
}
function isDuplicate(str, arr) {
	return arr.indexOf(str) > -1;
}

Template.ProjectSingle.onCreated(function() {
	Session.set('editMode', false);
});

Template.ProjectSingle.onCreated(function() {
	Session.set('openTeam', false);
});

Template.ProjectSingle.onCreated(function() {
	Session.set('openSchedule', false);
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
		var projectOwnerId = currentProject.owner;
		var projectOwner = Meteor.users.findOne(projectOwnerId);
		var memberIds = currentProject.members;
		var projectMembers = [];
		projectMembers.push(projectOwner);
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
	},
	openTeam:function(){
		return Session.get('openTeam');
	},
	openSchedule:function(){
		return Session.get('openSchedule');
	},
	getProjectCapacity:function(){
		var id = FlowRouter.getParam('projectId');
		var project = Projects.findOne({_id: id});
		return project.capacity;
	},
	getNumMembers:function(){
		var id = FlowRouter.getParam('projectId');
		var project = Projects.findOne({_id: id});
		return project.numMembers; //+1 for the project leader
	},
	capacityOptions:function(){
		return [2,3,4,5,6,7,8];
	},
	getAllSkills: function() {
		return Skills.find({});
	},
	isProjectOwner: function () {
		var currentEventId = FlowRouter.getParam('eventId');
		var findProject = Projects.findOne( {
			$and : [
			{ belongsToEvent: currentEventId },
			{ owner: Meteor.userId() }
			]
		} );
		console.log(findProject);
		return findProject != null;
	}
});

Template.ProjectSingle.events({
	'click .toggle-edit': function() {
		console.log(Session.get('editMode'));
		Session.set('editMode', !Session.get('editMode'));
	},
	'click .validate-skill': function() {
		console.log("skill validated");
	}, 
	'click .open-team':function(){
		Session.set('openTeam', !Session.get('openTeam'));
	},
	'click .open-schedule':function(){
		Session.set('openSchedule', !Session.get('openSchedule'));
	},
	'click .openProfile':function(){
		$('#' + this._id)
			.modal({ observeChanges: true })
            .modal('show'); 
            refreshModal();
	},
	'click #editProjectButton':function(e,t){
		e.preventDefault();
		var projectId = FlowRouter.getParam('projectId');
		var Capacity = document.getElementsByClassName("item active selected");
		var Capacity = Capacity[0].getAttribute("data-value");
		Capacity = parseInt(Capacity);
		var projectName = $('#pName').val();
		var projectDescription = $('#pDescription').val();
		var skills = Projects.findOne(projectId).desiredSkills;
		var skillsList = document.getElementsByClassName("item active filtered");
		for(var i=0; i<skillsList.length; i++) {
			var skillName = skillsList[i].getAttribute("data-value").replace(/\s/g, '');
			if(isDuplicate(skillName, skills)){
				swal({
					title: skillName + ' is already added',
					text: 'Please try again',
					type: 'error',
					showConfirmButton: true
				});
				
			} else{
				skills.push(skillName);
			}
		}
		Projects.update(projectId, {$set:{"name": projectName}});
		Projects.update(projectId, {$set:{"description": projectDescription}});
		Projects.update(projectId, {$set:{"capacity": Capacity}});
		Projects.update(projectId, {$set:{"desiredSkills": skills}});
		swal({
					title: 'Success!',
					text: 'Your project has been updated',
					type: 'success',
					showConfirmButton: true
				});
		Session.set('editMode', !Session.get('editMode'));
	}
});