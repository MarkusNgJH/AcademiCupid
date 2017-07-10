Template.TestTemplate.helpers({
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
	getSchedules: function(){
		var projectId = "kd3yKy9cgWrYAEZ58";
		var project = Projects.findOne(projectId);
		var membersID = project.members;
		var members = []
		for(var i = 0; i<membersID.length; i++){
			members.push(Meteor.users.findOne(membersID[i]))
		}
		var ownerId = project.owner;
		var owner = Meteor.users.findOne(ownerId);
		members.push(owner); //Array of all members and owner object
		week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
		var combinedWeek = [];
		//console.log(members);
		//return members;
		//return members[0].profile.schedule["Monday"]["1"];
		for(var dayOfWeekIdx = 0; dayOfWeekIdx< week.length; dayOfWeekIdx++){
			var combinedSingleDay = [];
			for(var timeSlot=1; timeSlot<13; timeSlot++){
				var combinedSingleTimeslot= [];
				for(var memberIdx=0; memberIdx<members.length; memberIdx++){
					//console.log(timeSlot.toString());
					//console.log(typeof(timeSlot.toString()));
					//console.log(members[memberIdx].profile.schedule[dayOfWeek]);
					//console.log(week[dayOfWeekIdx]);
					combinedSingleTimeslot.push(
						members[memberIdx].profile.schedule[week[dayOfWeekIdx]][timeSlot.toString()]
						); 
				}
				combinedSingleDay.push(combinedSingleTimeslot);
			}
			combinedWeek.push(combinedSingleDay);
		}
		console.log(combinedWeek);
		return combinedWeek;
	},
	conditionalColor: function(row, col){
		var userId = Meteor.userId();
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
	}
});

Template.TestTemplate.events({
	"click .clickable": function(event){
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
		if(currentSchedule[Day][timeSlot]==="Free"){
			Meteor.users.update(Meteor.userId(), {$set: {[fieldToUpdate]: "Busy"}});
		}
		else if(currentSchedule[Day][timeSlot]==="Busy"){
			Meteor.users.update(Meteor.userId(), {$set: {[fieldToUpdate]: "Free"}});
		}
		//console.log("schedule Updated");
	},
	"onHover .clickable":function(event){
		return;
	}
});
