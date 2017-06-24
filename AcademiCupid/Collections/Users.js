User = new Mongo.Collection('user');

User.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update:function(userId, doc){
		return true;//!!userId;
	}
});

Skills = new SimpleSchema({
	name:{
		type: String
	}
});

UserSchema = new SimpleSchema({
	name:{
		type: String,
    optional: true
	},
	skills:{
		type: [String],
    	optional: true
	},
	owner:{
		type: String,
		label: "Owner",
		// autoValue: function() {
 	// 		return this.userId //gives a default value for this field
		// },
		autoform: {
 			type: "hidden" //This makes this field hidden from view. Hence it will not appear on our form.
		}
	},
	enrolled:{
		type: [String],
		autoform: {
 			type: "hidden"
		},
		optional:true
	},
	projects:{
		type: [String],
		autoform: {
 			type: "hidden"
		},
		optional:true
	}//,
	// tags: {
	//     type: Array,
	//     autoform: {
	//       type: 'select2',
	//       afFieldInput: {
	//         multiple: true
	//       }
	//     }
	// }
});

User.attachSchema(UserSchema);
