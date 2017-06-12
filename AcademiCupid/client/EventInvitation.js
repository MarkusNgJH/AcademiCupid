Template.EventInvitation.onCreated(function() {
	var currentEvent = Session.get('curentEvent');
	// document.location.reload(true); //refreshes the page
});

Template.EventInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var selectedUsers = document.getElementsByClassName("item active filtered");
		for(var i = 0; i < selectedUsers.length; i++) {
			var nextUserId = selectedUsers[i].getAttribute("data-value");
			Meteor.users.update(nextUserId, {$addToSet: {enrolled: currentEvent}})
			Events.update(currentEvent, {$addToSet: {participants: nextUserId}});
		}
	}
});

Template.EventInvitation.helpers ({
	'getUsers': function() {
		return Meteor.users.find({});
	}
});

// var selectedSkills = document.getElementsByClassName("item active filtered");
// 		var newSkillArr = [];
// 		var original = Meteor.users.findOne(Meteor.userId());
// 		if (original.profile.skills === null) {
// 			var originalSkills = [];
// 		} else {
// 			var originalSkills = original.profile.skills;
// 		}
// 		for(var i = 0; i < selectedSkills.length; i++) {
// 			var nextSkill = selectedSkills[i].innerHTML;
// 			var testSkill = new userSkills(nextSkill, original._id);
// 			// if (!originalSkills.includes(nextSkill)) {
// 			newSkillArr.push(testSkill);
// 			// }
// 		}
// 		console.log(newSkillArr);
// 		// console.log(original.emails.address);
// 		// console.log(original);
// 		var fName = event.target.fName.value;
// 		var lName = event.target.lName.value;
// 		var updatedSkills = originalSkills.concat(newSkillArr)
// 		Meteor.users.update(
// 			Meteor.userId(), { $set: {
// 								 'profile': {
// 								 	'firstName': fName,
// 								 	'lastName': lName,
// 								 	'skills': updatedSkills
// 									 }

// 							 	}
// 							}		
// 		);