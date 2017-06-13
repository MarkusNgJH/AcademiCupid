Template.Contacts.helpers({
 getAllUsers: function() {
  return Meteor.users.find({});
 }
});