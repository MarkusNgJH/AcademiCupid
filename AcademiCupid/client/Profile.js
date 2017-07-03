Template.Profile.rendered = function () {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
	Session.set('editProfile', false);
}

Template.Profile.helpers({
	getUser: function () {
		selectedUserId = FlowRouter.getParam('userId');
		return Meteor.users.findOne(selectedUserId);
	},
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

Template.Profile.events({
	'submit form': function(event) {
		event.preventDefault();
		function userSkills(skillName, ownerId) {
	        this.name = skillName;
	        this.owner = ownerId;
	        this.validators = [];
    	}
    	var isValidInput = true;
		var selectedSkills = document.getElementsByClassName("item active filtered");
		var newSkillArr = [];
		var original = Meteor.users.findOne(Meteor.userId());
		if (original.profile.skills === null) {
			var originalSkills = [];
		}
		else {
			var originalSkills = original.profile.skills;
		}
		var stillValid = true;
		for(var i = 0; i < selectedSkills.length && stillValid; i++) {
			var nextSkill = selectedSkills[i].innerHTML;
			for(var j = 0; j < originalSkills.length; j++) {
				if (nextSkill === originalSkills[j].name) {
					stillValid = false;
					isValidInput = false;
					swal({
                        title: 'Already have selected skill(s)',
                        text: 'Please try again',
                        type: 'error',
                        showConfirmButton: true
                    });
				}
			}
			var testSkill = new userSkills(nextSkill, original._id);
			newSkillArr.push(testSkill);
		}
		if (isValidInput) {
			var fName = event.target.fName.value;
			var lName = event.target.lName.value;
			var updatedSkills = originalSkills.concat(newSkillArr)
			Meteor.users.update(Meteor.userId(), {$set:{"profile.firstName": fName}});
			Meteor.users.update(Meteor.userId(), {$set:{"profile.lastName": lName}});
			Meteor.users.update(Meteor.userId(), {$set:{"profile.skills": updatedSkills}});
			$('.dropdown').dropdown('clear');
		}
	},
	'click .toggle-edit': function() {
		Session.set('editProfile', !Session.get('editProfile'));
	},
	'click .label': function() {
		// var clickedElement = $("a:contains(" + this.name + ")");
		// if(clickedElement.hasClass("green")) {
		// 	clickedElement.removeClass("green");
		// } else {
		// 	clickedElement.addClass("green");	
		// }
		if(isNotDuplicate(Meteor.userId(), this.validators)) {
			this.validators.push(Meteor.userId());
			// clickedElement.addClass("green");
		} else {
			var idx = this.validators.indexOf(Meteor.userId());
			this.validators.splice(idx, 1);
			// clickedElement.removeClass("green");
		}
		var skillOwner = Meteor.users.findOne(this.owner);
		var ownerSkills = skillOwner.profile.skills;
		for(var i = 0; i < ownerSkills.length; i++) {
			if(ownerSkills[i].name === this.name) {
				var fieldToUpdate = "profile.skills." + i + ".validators";
				var obj = {};
				obj[fieldToUpdate] = this.validators;
				Meteor.users.update(this.owner, {$set: obj});
			}
		}
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