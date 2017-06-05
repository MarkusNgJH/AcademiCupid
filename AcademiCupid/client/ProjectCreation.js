Template.ProjectCreation.helpers({
	getEvent: function() {
		var id = Session.get('currentEvent');
		return Events.findOne({_id: id});
	}
});

AutoForm.hooks({
  insertProjectsForm:{
    before: {
      insert: function(doc) {
       doc.belongsToEvent = Session.get('currentEvent');
       return doc;
      }
    }
  }
});

// AutoForm.hooks({
//   addProspectForm:{
//     before: {
//       insert: function(doc) {
//         doc.belongsToEvent = Session.get('currentEvent');
//           return doc;
//       }
//     }
//   }
// });