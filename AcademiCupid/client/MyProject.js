Template.MyProject.helpers({
	getProject: function () {
		currentEventId = Session.get('currentEvent');
		console.log("user id: " + Meteor.userId());
		console.log("currentEventId: " + currentEventId);
		// return Projects.findOne({belongsToEvent: currentEventId});
		return Projects.findOne( {
			$and : [
			{ belongsToEvent: currentEventId },
			{ $or : [ { owner: Meteor.userId() }, { members: { $in: [ Meteor.userId() ] } } ] }
			]
		} );
	}
});
