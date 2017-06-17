Template.EventInvitation.rendered = function() {
 $('ui dropdown').dropdown();
 $('#multi-select').dropdown();
 $('.dropdown').dropdown('refresh');
}

// Template.EventInvitation.onCreated(function() {
// 	var currentEvent = Session.get('curentEvent');
// 	console.log(currentEvent);
// 	// document.location.reload(true); //refreshes the page
// });

function isNotDuplicate(str, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(str === arr[i]) {
			return false;
		}
	}
	return true;
}

Template.EventInvitation.events ({
	'submit form': function(event){
		event.preventDefault();
		var currentEventId = Session.get('currentEvent');
		var selectedUsers = document.getElementsByClassName("item active filtered");
		for(var i = 0; i < selectedUsers.length; i++) {
			var nextUserId = selectedUsers[i].getAttribute("data-value");
			var originalUser = Meteor.users.findOne(nextUserId);
			var originalEvent = Events.findOne(currentEventId);
			var enrolledEvents = originalUser.profile.enrolled;
			console.log(enrolledEvents);
			if (isNotDuplicate(currentEventId, enrolledEvents)) {
				enrolledEvents.push(currentEventId);
			} else {
				swal({
                  title: originalUser.emails[0].address + ' is already enrolled',
                  text: 'Please try agian',
                  type: 'error',
                  showConfirmButton: true
                });
			}
			var eventParticipants = originalEvent.participants;
			console.log(eventParticipants);
			if (isNotDuplicate(nextUserId, eventParticipants)) {
				eventParticipants.push(nextUserId);
			}
			//var fName = original.profile.firstName;
			//var lName =  original.profile.lastName;
			//var skills = original.profile.skills;
			//console.log(Events.findOne(currentEvent));
			Meteor.users.update(nextUserId, {$set: {"profile.enrolled": enrolledEvents}});
			Events.update(currentEventId, {$set: {"participants": eventParticipants}});
		}
		$('.dropdown').dropdown('clear');
	}
});

Template.EventInvitation.helpers ({
	'getUsers': function() {
		return Meteor.users.find({_id: {$ne: Meteor.userId()}});
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