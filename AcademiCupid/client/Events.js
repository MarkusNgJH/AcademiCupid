Meteor.subscribe('User');
Meteor.subscribe('Events');
Meteor.subscribe('Projects');
Meteor.subscribe('Skills');

Template.EventsSelection.helpers({
 events: ()=> {
  return Events.find({});
 }, //tutorial 12
 getOwner(arg){
    return Meteor.users.findOne(arg).profile.firstName;
 },
 getNumParticipants(arg){
  return arg.length;
 }
});

Template.EventsSelection.events({
	'click .event-selected': function() {
		Session.set('currentEvent', this._id);
	},
  'click #newEventBtn': function() {
    $('#newEventForm')
            .modal({ observeChanges: true })
            .modal('show');
            refreshModal();
  }
});

AutoForm.hooks({
  insertEventForm:{
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
      document.location.reload(true); //refreshes the page
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


function refreshModal() {
    Meteor.setTimeout(function() { refreshModal() }, 1);
    return $('.ui.modal').modal('refresh');
}
