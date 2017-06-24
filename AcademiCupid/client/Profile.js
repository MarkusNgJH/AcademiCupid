Template.Profile.rendered = function () {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
}

Template.Profile.helpers({
	getUser: function () {
		selectedUserId = FlowRouter.getParam('userId');
		return Meteor.users.findOne(selectedUserId);
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
			Meteor.users.update(
				Meteor.userId(),
				{ 
					$set: {
					 'profile': {
					 	'firstName': fName,
					 	'lastName': lName,
					 	'skills': updatedSkills,
					 	'enrolled': [],
					 	'projects': []
						 }
			 		}
				}		
			);
			$('.dropdown').dropdown('clear');
		}
	}
});