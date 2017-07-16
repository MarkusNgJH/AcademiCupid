Template.ProfileCard.rendered = function () {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
	Session.set('editProfile', false);
}

Template.ProfileCard.helpers({
	isEditMode: function() {
		return Session.get('editProfile');
	},
	isOwner: function() {
		return FlowRouter.getParam('userId') === Meteor.userId();
	},
	validatedByCurrUser: function() {
		var skillOwnerId = this.owner;
		var skillOwner = Meteor.users.findOne(skillOwnerId);
		var ownerSkills = skillOwner.profile.skills;
		for(var i = 0; i < ownerSkills.length; i++) {
			if(ownerSkills[i].name === this.name) {
				if(ownerSkills[i].validators.indexOf(Meteor.userId()) >= 0) {
					return "green";
				} else {
					return "";
				}
			}
		}
	},
	getProjectName: function(projectId) {
		return Projects.findOne(projectId).name;
	},
	getProjectBelongsToEventName: function(projectId) {
		var project = Projects.findOne(projectId);
		var eventId = project.belongsToEvent;
		return Events.findOne(eventId).name;
	},
	getEventName: function(eventId) {
		return Events.findOne(eventId).name;
	},
	getSkills: function() {
		return Skills.find({});
	}
});

function isNotDuplicate(str, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(str === arr[i]) {
			return false;
		}
	}
	return true;
}