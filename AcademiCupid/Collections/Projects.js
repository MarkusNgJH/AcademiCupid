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
		type: String
	}
});

ProjectsSchema = new SimpleSchema({
	name:{
		type: String
	},
	reqSkills:{
		type: [Skills]
	},
	owner:{
		type: String,
		label: "Owner",
		autoValue: function() {
 			return this.userId //gives a default value for this field
		},
		autoform: {
 			type: "hidden" //This makes this field hidden from view. Hence it will not appear on our form.
		}
	},
  members: {
    type: [String],
    optional: true
  },
  belongsToEvent: {
     type: String,
     optional:true
  //   autoform: {
  //     type: "hidden" //This makes this field hidden from view. Hence it will not appear on our form.
  //   },

  }
});

Projects.attachSchema(ProjectsSchema);

