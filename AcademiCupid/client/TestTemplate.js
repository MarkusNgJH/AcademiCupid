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
		var projectId = "ZnwZqynGEqrwPXoYm";
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
					var cellPersonProfile = members[memberIdx].profile;
					var cell = members[memberIdx].profile.schedule[week[dayOfWeekIdx]][timeSlot.toString()];
					combinedSingleTimeslot.push(
						[cellPersonProfile,cell]
						); 
				}
				combinedSingleDay.push(combinedSingleTimeslot);
			}
			combinedWeek.push(combinedSingleDay);
		}
		console.log(combinedWeek);
		return combinedWeek;
	},
	countFreeIndividuals:function(arr){
		var count = 0;
		for(var i=0; i < arr.length; i++){
			if(arr[i][1]=="Free"){
				count++;
			}
		}
		return count;
	},
	getFreeIndividuals:function(arr){
		var freeIndividuals = [];
		for(var i=0; i<arr.length; i++){
			if(arr[i][1]=="Free"){
				freeIndividuals.push(arr[i][0].firstName);
			}
		}
		return freeIndividuals;
	},
	conditionalColor: function(row, col){
		dayFinder = {"0": "Monday", "1": "Tuesday", "2": "Wednesday", "3": "Thursday", "4": "Friday", "5": "Saturday", "6": "Sunday"};
		var timeSlot = (parseInt(col) + 1).toString();
		var Day = dayFinder[row];
		var timeSlot = oneWeek[Day][timeSlot]
	},
	conditional:function(arr){
		var numFree = 0;
		for(var i=0; i < arr.length; i++){
			if(arr[i][1]=="Free"){
				numFree++;
			}
		}
		var projectId = "ZnwZqynGEqrwPXoYm";
		var project = Projects.findOne(projectId);
		var numMembers = project.numMembers;
		var saturation = numFree/numMembers * 100;
		var lightness = numFree/numMembers * 50;
		return "background-color: hsl(93,"+ 70 + "%," + lightness + "%)";
	}
});