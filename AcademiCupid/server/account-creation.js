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
            "1": "Free",
            "2": "Free",
            "3": "Free",
            "4": "Free",
            "5": "Free",
            "6": "Free",
            "7": "Free",
            "8": "Free",
            "9": "Free",
            "10": "Free",
            "11": "Free",
            "12": "Free"
        },
        "Tuesday": {
            "1": "Free",
            "2": "Free",
            "3": "Free",
            "4": "Free",
            "5": "Free",
            "6": "Free",
            "7": "Free",
            "8": "Free",
            "9": "Free",
            "10": "Free",
            "11": "Free",
            "12": "Free"
        },
        "Wednesday": {
            "1": "Free",
            "2": "Free",
            "3": "Free",
            "4": "Free",
            "5": "Free",
            "6": "Free",
            "7": "Free",
            "8": "Free",
            "9": "Free",
            "10": "Free",
            "11": "Free",
            "12": "Free"
        }
        
    };
    user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";

    return user;
});
