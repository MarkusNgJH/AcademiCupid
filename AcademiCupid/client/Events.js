Meteor.subscribe('User');
Meteor.subscribe('Events');
Meteor.subscribe('Projects');
Meteor.subscribe('Skills');

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
    },
    onSuccess: function (formType, result) {
      var eventId = result;
      var eventCreator = Meteor.users.findOne(Meteor.userId());
      var enrolled = eventCreator.profile.enrolled;
      enrolled.push(eventId);
      Meteor.users.update(Meteor.userId(), {$set:{"profile.enrolled":enrolled}});
      FlowRouter.go('EventSingle', {eventId: eventId});
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

