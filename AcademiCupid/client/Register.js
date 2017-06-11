Template.register.events({
    'click #register-button': function(e, t) {
        // e.preventDefault();
        console.log("clicked register button");
        // Retrieve the input field values
        var email = $('#email').val(),
        firstName = $('#first-name').val(),
        lastName = $('#last-name').val(),
        password = $('#password').val(),
        passwordAgain = $('#password-again').val();
        console.log("retrieved values from fields");
        console.log("email is " + email);
        // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            console.log("enter isValidPassword function");
            if (pwd === pwd2) {
                if (pwd.length < 1) {
                    swal({
                        title: 'Password must be at least 6 characters long',
                        text: 'Please try again',
                        type: 'error',
                        showConfirmButton: true
                    });
                    return false
                }
                return true;                
            } else {
                swal({
                  title: 'Passwords don\'t match!',
                  text: 'Please try agian',
                  type: 'error',
                  showConfirmButton: true
                });
              return false;
          }
      }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        if (isValidPassword(password, passwordAgain)) {
            console.log("entering Accounts.createUser");
            Accounts.createUser({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }, function(error) {
                console.log("enter error part");
                if (error) {
                    return swal({
                        title: error.reason,
                        text: "Please try again",
                        showConfirmButton: true,
                        type: "error"
                    });
                } else {
                    console.log("success!");
                    FlowRouter.go('ProfilePage');
                    document.location.reload(true); //refreshes the page
                }
            });
        }

        console.log("reached end of code");
        return false;
    }
});
