Template.TestTemplate.helpers({
	getDays: ()=> {
		var userId = Meteor.userId();
		console.log(Meteor.users.findOne(userId).profile.schedule);	
		return Meteor.users.findOne(userId).profile.schedule;
	},
	getProperty: function(oneWeek){
		for (var oneDay in oneWeek) {
			if (oneWeek.hasOwnProperty(oneDay)) {
				var daySchedule = [];
				for(var timeSlot in oneWeek[oneDay]){
					daySchedule.push(oneWeek[oneDay][timeSlot]);	
				}
				return daySchedule;
			}
		}
	}
});