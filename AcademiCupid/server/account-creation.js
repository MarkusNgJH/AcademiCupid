Accounts.onCreateUser(function(options, user) {
    // Use provided profile in options, or create an empty profile object
    user.profile = options.profile || {};

    // Assigns the first and last names to the newly created user object
    user.profile.firstName = options.firstName;
    user.profile.lastName = options.lastName;
    user.profile.skills = options.skills;
    user.profile.enrolled = [];
    user.profile.projects = [];
    user.profile.description = null;
    user.profile.schedule = {
        "Monday": {
            "0": false,
            "2": false,
            "4": false,
            "6": false,
            "8": false,
            "10": false,
            "12": false,
            "14": false,
            "16": false,
            "18": false,
            "20": false,
            "22": false
        }
    };


    user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";

    return user;
});
