Template.ProjectPendingMembers.helpers({
	getPendingMembers: function() {
		var pendingMemberIds = Projects.findOne(FlowRouter.getParam('projectId')).pendingMembers;
		var pendingMembers = [];
		for(var i=0; i<pendingMemberIds.length; i++) {
			pendingMembers.push(Meteor.users.findOne(pendingMemberIds[i]));
		}
		return pendingMembers;
	},
	isProjectOwner: function() {
		return Projects.findOne(FlowRouter.getParam('projectId')).owner == Meteor.userId();
	}
});