Skills = new Mongo.Collection('skills');

Skills.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update:function(userId, doc){
		return !!userId;
	}
});

SkillsSchema = new SimpleSchema({
	name:{
		type: String,
		unique: true,
		label: "Skill Name"
	}
});

Skills.attachSchema(SkillsSchema);
