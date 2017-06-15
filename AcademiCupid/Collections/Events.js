Events = new Mongo.Collection('events');

Events.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update:function(userId,doc){
		return !!userId;
	}
});

Meteor.users.allow({
	update:function(userId, doc){
		return !!userId;
	}
});

EventsSchema = new SimpleSchema({
	name:{
		type: String
	},
	description:{
		type: String
	},
	participants:{
		type: [String],
		autoform: {
   			type: "hidden" //This makes this field hidden from view. Hence it will not appear on our form.
  		},
		autoValue: function(){
			return [];
		}
	},
	projects: {
		type: [String],
		autoform: {
   			type: "hidden" //This makes this field hidden from view. Hence it will not appear on our form.
  		},
  		autoValue: function(){
  			return [];
  		}
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
  	}
});

Events.attachSchema(EventsSchema);