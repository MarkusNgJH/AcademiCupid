Projects = new Mongo.Collection('projects');

Projects.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId,doc){
		return !!userId;
	}
});

// Skills = new SimpleSchema({
// 	name:{
// 		type: String,
// 		label: "Skill"
// 	}
// });

ProjectsSchema = new SimpleSchema({
	name:{
		type: String,
		label: "Project Name"
	},
	desiredSkills: {
		type: [String],
		optional:true,
		autoform: {
		  afFieldInput: {
		  	options: function() {
		  		function oneOption(value, label) {
			        this.value = value;
			        this.label = label;
		    	}
		  		const allSkillsObj = Skills.find({});
				var allSkillsName = [];
				allSkillsObj.forEach((currSkillObj) => {
				  	var nextSkillId = currSkillObj._id;
				  	var nextSkillName = currSkillObj.name;
				  	var nextOption = new oneOption(nextSkillId, nextSkillName);
		  			allSkillsName.push(nextOption);
				});
				return allSkillsName;
		  	}
		  }
		}
	},
	owner:{
		type: String,
		label: "Owner",
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: "hidden" 
		}
	},
	members: {
		type: [String],
		optional: true,
		autoform: {
			type: "hidden" 
		}
	},
	numMembers:{
		type: Number,
		optional:true,
		autoform:{
			type: "hidden"
		}
	},
	belongsToEvent: {
		type: String,
		optional:true,
		autoform: {
			type: "hidden"
		}
	},
	description: {
		type: String,
		optional: true
	},
	capacity:{
		type: Number,
		optional:true,
		allowedValues: [2,3,4,5,6,7,8],
	}
});

Projects.attachSchema(ProjectsSchema);

