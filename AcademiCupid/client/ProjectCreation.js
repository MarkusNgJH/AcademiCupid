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
       return doc;
      }
    },
    onSuccess: function (formType, result) {
      var projectId = result;
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