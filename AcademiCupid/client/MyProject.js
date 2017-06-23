Template.MyProject.helpers({
	getProject: function () {
		currentEventId = FlowRouter.getParam('eventId');
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
	eventId: function () {
		 return FlowRouter.getParam('eventId');
	},
	isProjectOwner: function () {
		var currentEventId = FlowRouter.getParam('eventId');
		var findProject = Projects.findOne( {
			$and : [
			{ belongsToEvent: currentEventId },
			{ owner: Meteor.userId() }
			]
		} );
		console.log(findProject);
		return findProject != null;
	},
	isMember: function () {
		var currentEventId = FlowRouter.getParam('eventId');
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
