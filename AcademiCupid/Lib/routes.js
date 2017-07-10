Accounts.onLogin(function(){
	FlowRouter.go('EventsPage');
});

 Accounts.onLogout(function() {
  FlowRouter.go('LoginPage');
 });

FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
		FlowRouter.go('LoginPage');
	}
}]);


FlowRouter.route('/',{
	name: 'LoginPage',
	action(){
		if(Meteor.userId()) { //this returns true if the user is logged in
			FlowRouter.go('EventsPage'); //hence if the user is logged in, redirect him to the recipe-book page (the next section of code below). Otherwise, render the HomeLayout
		}
		BlazeLayout.render('HomeLayout', {main: "login"});
	}
});

FlowRouter.route('/registration',{
	name: 'registrationPage',
	action(){
		BlazeLayout.render('HomeLayout', {main: "register"});
	}
});

FlowRouter.route('/events', {
	name: 'EventsPage',
	action(){
		BlazeLayout.render('MainLayout', {main: "Events"});
	}
});

FlowRouter.route('/event=:eventId', {
	name: 'EventSingle',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'EventSingle'});
	}
});

FlowRouter.route('/event=:eventId/projectcreation', {
	name: 'ProjectCreation',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'ProjectCreation'});
	}
});

FlowRouter.route('/event=:eventId/project=:projectId', {
	name: 'ProjectSingle',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ProjectSingle'});
	}
});

FlowRouter.route('/profile=:userId/myprojects', {
	name: 'MyProjects',
	action() {
		BlazeLayout.render('MainLayout', {main: 'MyProjects'});
	}
});

FlowRouter.route('/event=:eventId/project=:projectId/projectinvitation', {
	name: 'ProjectInvitation',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'ProjectInvitation'});
	}
});

FlowRouter.route('/mainpage',{
	name: 'MainPage',
	action(){
		BlazeLayout.render('MainLayout', {main: "MainPage"});
	}
});

FlowRouter.route('/event=:eventId/eventinvitation', {
	name: 'EventInvitation',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'EventInvitation'});
	}
});

FlowRouter.route('/profile=:userId',{
	name: 'ProfilePage',
	action(){
		BlazeLayout.render('MainLayout', {main: "Profile"});
	}
});

FlowRouter.route('/testpage',{
	name: 'TestPage',
	action(){
		BlazeLayout.render('MainLayout', {main: "TestTemplate"});
	}
});

FlowRouter.route('/schedulesingle',{
	name: 'ScheduleSingle',
	action(){
		BlazeLayout.render('MainLayout', {main: "ScheduleSingle"});
	}
});

/*
Accounts.onLogin(function(){
	FlowRouter.go('recipe-book');
});

Accounts.onLogout(function(){
	FlowRouter.go('home');
});



FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action(){
		if(Meteor.userId()){ //if user is locked in
			FlowRouter.go('recipe-book');
		}
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/recipe-book', {
	name: 'recipe-book', //name to identify the routes
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Recipes'});
	}
});

FlowRouter.route('/recipe/:id', {
	name: 'recipe',
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'RecipeSingle'});
	}

});

FlowRouter.route('/menu', {
	name: 'menu',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Menu'});
	}
});

FlowRouter.route('/shopping-list', {
	name: 'shopping-list',
	action(){
		BlazeLayout.render('MainLayout', {main: 'ShoppingList'});
	}
});*/
