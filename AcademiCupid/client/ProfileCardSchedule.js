Template.ProfileCardSchedule.helpers({
	getDayOfWeek: function(arg){
		if(arg == 0){
			return "Monday";
		}
		else if(arg == 1){
			return "Tuesday";
		}
		else if(arg == 2){
			return "Wednesday";
		}
		else if(arg == 3){
			return "Thursday";
		}
		else if(arg == 4){
			return "Friday";
		}
		else if(arg == 5){
			return "Saturday";
		}
		else if(arg == 6){
			return "Sunday";
		}
	},
	getSchedule: function(arg){
		//console.log("schedule called")
		var userId = arg;
		var weekSchedule = [];
		var oneWeek = Meteor.users.findOne(userId).profile.schedule;
		//console.log(oneWeek);
		for (var oneDay in oneWeek) {
			if (oneWeek.hasOwnProperty(oneDay)) {
				var daySchedule = [];
				//daySchedule.push(oneDay);
				for(var timeSlot in oneWeek[oneDay]){
					daySchedule.push(oneWeek[oneDay][timeSlot]);	
				}
				//console.log(daySchedule);
				weekSchedule.push(daySchedule);
			}
		}
		return weekSchedule;
	},
	conditionalColor: function(arg, row, col){
		var userId = arg;
		var weekSchedule = [];
		var oneWeek = Meteor.users.findOne(userId).profile.schedule;
		dayFinder = {"0": "Monday", "1": "Tuesday", "2": "Wednesday", "3": "Thursday", "4": "Friday", "5": "Saturday", "6": "Sunday"};
		var timeSlot = (parseInt(col) + 1).toString();
		var Day = dayFinder[row];
		var timeSlot = oneWeek[Day][timeSlot]
		if(timeSlot == "Busy"){
			return "error";
		}
		else if(timeSlot == "Free"){
			return "positive";
		}
	},
	isClickable:function(arg) {
		if(Meteor.userId() == arg){
			return "clickable";
		}
		return "";
	},
	isSelectable: function(arg) {
		if(Meteor.userId() == arg){
			return "selectable";
		}
		return "";
	},
	showFinger: function(arg) {
		if(Meteor.userId() == arg){
			return "cursor: pointer;";
		}
		return "";
	}
});

Template.ProfileCardSchedule.events({
	"click .clickable": function(event){
		console.log("schedule Updated");
		var position = event.currentTarget.id;
		var row = position.split(",")[0];
		var col = position.split(",")[1];
		dayFinder = {"0": "Monday", "1": "Tuesday", "2": "Wednesday", "3": "Thursday", "4": "Friday", "5": "Saturday", "6": "Sunday"};
		var timeSlot = (parseInt(col) + 1).toString();
		var Day = dayFinder[row];
		console.log(Day + timeSlot);
		var user = Meteor.users.findOne(Meteor.userId());
		var currentSchedule = user.profile.schedule;
		var fieldToUpdate = "profile.schedule." + Day + "." + timeSlot;
		console.log(Meteor.userId());
		if(currentSchedule[Day][timeSlot]==="Free"){
			console.log("Change to Busy");
			Meteor.users.update(Meteor.userId(), {$set: {[fieldToUpdate]: "Busy"}});
		}
		else if(currentSchedule[Day][timeSlot]==="Busy"){
			console.log("Change to Free");
			Meteor.users.update(Meteor.userId(), {$set: {[fieldToUpdate]: "Free"}});
		}
		//console.log("schedule Updated");
	},
	"onHover .clickable":function(event){
		return;
	}
});
