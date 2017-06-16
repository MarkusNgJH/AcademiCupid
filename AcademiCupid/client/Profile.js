Template.Profile.rendered = function () {
	$('ui dropdown').dropdown();
	$('#multi-select').dropdown();
}

Template.Profile.events({
	'submit form': function(event) {
		event.preventDefault();
		// console.log($('#multi-select');
		function userSkills(skillName, ownerId) {
	        this.name = skillName;
	        this.owner = ownerId;
	        this.validators = [];
    	}
		var selectedSkills = document.getElementsByClassName("item active filtered");
		var newSkillArr = [];
		var original = Meteor.users.findOne(Meteor.userId());
		if (original.profile.skills === null) {
			var originalSkills = [];
		} else {
			var originalSkills = original.profile.skills;
		}
		for(var i = 0; i < selectedSkills.length; i++) {
			var nextSkill = selectedSkills[i].innerHTML;
			var testSkill = new userSkills(nextSkill, original._id);
			// if (!originalSkills.includes(nextSkill)) {
			newSkillArr.push(testSkill);
			// }
		}
		console.log(newSkillArr);
		// console.log(original.emails.address);
		// console.log(original);
		var fName = event.target.fName.value;
		var lName = event.target.lName.value;
		var updatedSkills = originalSkills.concat(newSkillArr)
		Meteor.users.update(
			Meteor.userId(), { $set: {
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
		event.target.fName.value = "";
		event.target.lName.value = "";
	}
});