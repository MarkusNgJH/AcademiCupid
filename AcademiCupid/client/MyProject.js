Template.MyProject.helpers({
	getProject: function () {
		currentEventId = Session.get('currentEvent');
		// console.log("user id: " + Meteor.userId());
		// console.log("currentEventId: " + currentEventId);
		// return Projects.findOne({belongsToEvent: currentEventId});
		return Projects.findOne( {
			$and : [
			{ belongsToEvent: currentEventId },
			{ $or : [ { owner: Meteor.userId() }, { members: { $in: [ Meteor.userId() ] } } ] }
			]
		} );
	},
	isProjectOwner: function () {
		var currentEventId = Session.get('currentEvent');
		var findProject = Projects.findOne( {
			$and : [
			{ belongsToEvent: currentEventId },
			{ owner: Meteor.userId() }
			]
		} );
		console.log(findProject);
		return findProject != null;
	}
});
