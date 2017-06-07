Projects = new Mongo.Collection('projects');

Projects.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update:function(userId,doc){
		return !!userId;
	}
});

Skills = new SimpleSchema({
	name:{
		type: String,
		label: "Skill"
	}
});

ProjectsSchema = new SimpleSchema({
	name:{
		type: String,
		label: "Project Name"
	},
	reqSkills:{
		type: [Skills],
		label: "Required Skill(s)"
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
  belongsToEvent: {
  	type: String,
    optional:true,
    autoform: {
    	type: "hidden"
	}
  }
});

Projects.attachSchema(ProjectsSchema);

