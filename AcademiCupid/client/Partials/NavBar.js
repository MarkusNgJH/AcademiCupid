var parts = location.href.split('/')
var id = parts.pop()

Template.NavBar.events({
	'click .create-new-project': () => {
		var parts = location.href.split('/');
		var id = parts.pop();
		Session.set('currentEvent', id);
	}
});