Template.EventSingle.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleEvent', id); //when we subscribe to 'singleRecipe', we are passing in a single id, to our publish statement (refer to publish.js)
	});
});

Template.EventSingle.helpers({
	event: ()=> {
		var id = FlowRouter.getParam('id'); //the param name is 'id'. Refer to routes.js. The name will be the string after the colon. Hence, we are getting the id from the route itself, i.e. from the URL
		return Events.findOne({_id: id}); //this id is then used to find the correct recipe within our Recipe collection
	},
	getEvent: function() {
		var id = Session.get('currentEvent');
		return Events.findOne({_id: id});
	}
});