Template.TestTemplate2.events({
	'click #viewModal': function() {
		$('.ui.modal')
            .modal({ observeChanges: true })
            .modal('show');
            refreshModal();
	}
});

function refreshModal() {
    Meteor.setTimeout(function() { refreshModal() }, 1);
    return $('.ui.modal').modal('refresh');
}