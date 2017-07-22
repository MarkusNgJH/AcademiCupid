Template.ProjectCreation.helpers({
	getEvent: function() {
    var id = FlowRouter.getParam('eventId');
		return Events.findOne({_id: id});
	}
});

AutoForm.hooks({
  insertProjectsForm:{
    before: {
      insert: function(doc) {
       doc.belongsToEvent = FlowRouter.getParam('eventId');
       doc.members = [];
       doc.numMembers = 1;
       doc.desiredSkills = [];
       doc.pendingMembers = [];
       doc.owner = Meteor.userId();
       return doc;
      }
    },
    onSuccess: function (formType, result) { //redirect user to the newly created project page
      console.log(result);
      var projectId = result;
      var projectCreator = Meteor.users.findOne(Meteor.userId());
      var projects = projectCreator.profile.projects;
      projects.push(projectId);
      Meteor.users.update(Meteor.userId(), {$set:{"profile.projects":projects}});
      var eventId = FlowRouter.getParam('eventId');
      FlowRouter.go('ProjectSingle', { eventId: eventId, projectId: projectId });
    }
  }
});

// AutoForm.hooks({
//   contactForm: {
//     onSubmit: function (insertDoc, updateDoc, currentDoc) {
//       if (customHandler(insertDoc)) {
//         this.done();
//       } else {
//         this.done(new Error("Submission failed"));
//       }
//       return false;
//     }
//   }
// });