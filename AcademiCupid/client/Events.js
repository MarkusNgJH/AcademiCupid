Meteor.subscribe('User');
Meteor.subscribe('Events');
Meteor.subscribe('Projects');

Template.Events.helpers({
 events: ()=> {
  return Events.find({});
 } //tutorial 12
});

Template.Events.events({
	'click .event-selected': function() {
		Session.set('currentEvent', this._id);
	}
});

AutoForm.hooks({
  insertEventsForm:{
    before: {
      insert: function(doc) {
       doc.participants = [];
       return doc;
      }
    }
  }
});

/*
Template.Recipes.onCreated(function() {
 var self = this; 
 self.autorun(function() {
  self.subscribe('recipes'); //subscribing to 'recipes' (refer to server>>publish.js)
 });
}); //tutorial 13 */

