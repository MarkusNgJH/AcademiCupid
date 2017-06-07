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
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/events', {
	name: 'EventsPage',
	action(){
		BlazeLayout.render('MainLayout', {main: "Events"});
	}
});

FlowRouter.route('/event/:id', {
	name: 'EventSingle',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'EventSingle'});
	}
});

FlowRouter.route('/projectcreation', {
	name: 'ProjectCreation',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'ProjectCreation'});
	}
});

FlowRouter.route('/mainpage',{
	name: 'MainPage',
	action(){
		BlazeLayout.render('MainLayout', {main: "MainPage"});
	}
});

FlowRouter.route('/eventinvitation', {
	name: 'EventInvitation',
	action() { // this is what's going to happen when you hit this route
		BlazeLayout.render('MainLayout', {main: 'EventInvitation'});
	}
});

FlowRouter.route('/profile',{
	name: 'ProfilePage',
	action(){
		BlazeLayout.render('MainLayout', {main: "Profile"});
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
