Meteor.publish('Events', function(){
	return Events.find({
		$or: [
			{owner: this.userId},
		    { participants: { $in: [ this.userId ] } }
		  ]
	});
});

Meteor.publish('singleEvent', function(id) {
	check(id, String); //check that the first argument ('id') is in fact a String
	return Events.find({_id: id});
}); //with this, let's say when we are only viewing the chicken sandwich recipe, we are only publishing the chicken sandwich recipe, and not the other recipes

Meteor.publish('Projects', function(){
	return Projects.find({});
});

Meteor.publish('User', function(){
	return User.find({});
});

Meteor.publish('Skills', function(){
	return Skills.find({});
});

Meteor.publish('userData', function() {
	return Meteor.users.find({});
});