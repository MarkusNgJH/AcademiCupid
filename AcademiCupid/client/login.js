Template.login.events({
    'click #login-button': function(e, t) {
        e.preventDefault();
        var email = $('#login-email').val(),
            password = $('#login-password').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                return swal({
                    title: "Email or password Incorect",
                    text: "Please try again or create an account",
                    timer: 1700,
                    showConfirmButton: false,
                    type: "error"
                });
            } else {
                FlowRouter.go('/events');
            }
        });
        return false;
    },
    'click #register-button': function() {
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

Meteor.subscribe('userData');