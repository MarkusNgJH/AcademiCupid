var parts = location.href.split('/')
var id = parts.pop()

Template.NavBar.rendered = function () {
	$(document).ready(function(){
	    $(window).scroll(function(){
	        if($(window).scrollTop() > 185) {
        		if(!$("#NavMenu").hasClass("fixed")) {
        			$("#NavMenu").removeClass("fluid");
        			$("#NavMenu").addClass("fixed");
        		}
	        }
	        else if ($(window).scrollTop() < 185){
	        	if($("#NavMenu").hasClass("fixed")) {
	        		$("#NavMenu").removeClass("fixed");	
	        		$("#NavMenu").addClass("fluid");
	        	}
	        }
	    });
	});
}

Template.NavBar.events({
	'click .create-new-project': () => {
		var parts = location.href.split('/');
		var id = parts.pop();
		Session.set('currentEvent', id);
	}
});

Template.NavBar.helpers({
	isEventOwner: function () {
		var currentEventId = FlowRouter.getParam('eventId');
		var eventOwner = Events.findOne(currentEventId).owner;
		return eventOwner === Meteor.userId();
	},
	eventId: function () {
		return FlowRouter.getParam('eventId');
	},
	currentUserId: function() {
		return Meteor.userId();
	}
});