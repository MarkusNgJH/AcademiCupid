Template.loginButtons.onCreated(function() {
	console.log("onCreated");
 // if(User.findOne({owner: this.userId}) == null) {
 // 	console.log("inside the if statement");
 // 	User.insert({});
 // 	//User.insert({owner: this.userId});
 // }
});

Template.EventSingle.onCreated(function() {
 var self = this;
 self.autorun(function() {
  var id = FlowRouter.getParam('id');
  self.subscribe('singleEvent', id); //when we subscribe to 'singleRecipe', we are passing in a single id, to our publish statement (refer to publish.js)
 });
});