Template.MainLayout.rendered = function() {
	var windowHeight = $(window).height();
	var contentHeight = windowHeight - 200;
	$("#pageContent").css("min-height", contentHeight);
}