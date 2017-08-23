Template.EventSingle.rendered = function() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var contactsPositionLeft = windowWidth / 8 - 25;
	// var contentHeight = windowHeight - 250;
	// var projExHeight = $("#ProjectExchangeContainer").height();
	$("#ContactsContainer").css("height", windowHeight);
	$(document).ready(function(){
	    $(window).scroll(function(){
	        if($(window).scrollTop() > 185) {
    			$("#ContactsContainer").css("position", "fixed");
    			$("#ContactsContainer").css("left", contactsPositionLeft);
    			$("#ContactsContainer").css("top", -50);
    			$("#ContactsContainer").css("transform", "scale(0.9)");
	        } else {
        		$("#ContactsContainer").css("position", "relative");
        		$("#ContactsContainer").css("left", 0);
        		$("#ContactsContainer").css("top", 0);
        		$("#ContactsContainer").css("transform", "scale(1)");
	        }
	    });
	});
}

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
		return Events.findOne(FlowRouter.getParam('eventId'));
	},
	getOwnerName: function(ownerId) {
		var ownerProfile = Meteor.users.findOne(ownerId).profile;
		return ownerProfile.firstName + " " + ownerProfile.lastName;
	},
	getOwner: function() {
		var event = Events.findOne(FlowRouter.getParam('eventId'));
		var ownerId = event.owner;
		return Meteor.users.findOne(ownerId);
	}
});

Template.EventSingle.events({
	'click .openCoordinatorProfile':function(){
		var event = Events.findOne(FlowRouter.getParam('eventId'));
		var ownerId = event.owner;
		$('#' + ownerId)
		.modal({ observeChanges: true })
		.modal('show')
		.modal('refresh')
		.modal('refresh');
	}	
})