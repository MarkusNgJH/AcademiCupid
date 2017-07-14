// Template.AddSkills.helpers({
// 	getSkills: function() {

// 	}
// });

AutoForm.hooks({
  insertSkillsForm:{
    before: {
      insert: function(doc) {
       return doc;
      }
    }
  }
});