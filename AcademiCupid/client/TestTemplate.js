Template.TestTemplate.helpers({
	getDays: ()=> {
		var userId = Meteor.userId();
		console.log(Meteor.users.findOne(userId).profile.schedule);	
		return Meteor.users.findOne(userId).profile.schedule;
	},
	getSchedule: function(){
		var userId = Meteor.userId();
		var weekSchedule = [];
		var oneWeek = Meteor.users.findOne(userId).profile.schedule;
		console.log(oneWeek);
		for (var oneDay in oneWeek) {
			if (oneWeek.hasOwnProperty(oneDay)) {
				var daySchedule = [];
				//daySchedule.push(oneDay);
				for(var timeSlot in oneWeek[oneDay]){
					daySchedule.push(oneWeek[oneDay][timeSlot]);	
				}
				console.log(daySchedule);
				weekSchedule.push(daySchedule);
			}
		}
		console.log(weekSchedule); 
		return weekSchedule;
	}
});

Template.TestTemplate.events({
	"click .ui.button": function(event){
		var position = event.currentTarget.id;
		var row = position.split("")[0];
		var col = position.split("")[1];
		dayFinder = {"1": "Monday", "2": "Tuesday", "3": "Wednesday"};
		var timeSlot = col * 2;
		var Day = dayFinder[row];
		var user = Meteor.users.findOne(Meteor.userId());
		var currentSchedule = user.profile.schedule;
		var fieldToUpdate = "profile.schedule." + Day + "." + timeSlot;
		// currentSchedule[Day][timeSlot] = !currentSchedule[Day][timeSlot]
		Meteor.users.update(Meteor.userId(), {$set: {fieldToUpdate: !currentSchedule[Day][timeSlot]}});
	}
});
