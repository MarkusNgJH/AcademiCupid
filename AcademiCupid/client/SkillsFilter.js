Template.SkillsFilter.onCreated(function() {
	Session.set('skillsFilterMode', false);
});

Template.SkillsFilter.helpers({
	getUniqueSkills: function() {
		var eventId = FlowRouter.getParam('eventId');
		var projArr = Projects.find({belongsToEvent: eventId}).fetch();
		var uniqueSkills = [];
		for(var i=0; i<projArr.length; i++) {
			for(var j=0; j<projArr[i].desiredSkills.length; j++) {
				if(isNotDuplicate(projArr[i].desiredSkills[j], uniqueSkills)) {
					uniqueSkills.push(projArr[i].desiredSkills[j]);	
				}
			}
		}
		return uniqueSkills;
	},
	isSkillsFilterMode: function() {
		return Session.get('skillsFilterMode');
	}
});

Template.SkillsFilter.events({
	'click #skills-filter-btn': function() {
		Session.set('skillsFilterMode', !Session.get('skillsFilterMode'));
		var isFilterMode = Session.get('skillsFilterMode');
		if(isFilterMode) {
			$('#skills-filter-btn').addClass("green");
		} else {
			$('#skills-filter-btn').removeClass("green");
		}
	},
	'click #submit-filter': function() {
		var selectedSkills = document.getElementsByClassName("item active filtered");
		for(var i=0; i<selectedSkills.length; i++) {
			console.log(selectedSkills[i].innerHTML);
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
		