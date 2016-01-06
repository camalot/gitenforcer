module.exports.rules = {}

// middleware to check for occurrences of the word "bacon" in comments
module.exports.rules.requireApproval = function(pull_request, comments, next) {
    var isApproved = false;
    // A comment from someone other than the PR's author,
    // which includes :+1: (a thumbs up) indicates approval.
    comments.forEach(function (comment) {
        if (comment.user.login != pull_request.user.login
          && comment.body.indexOf(':+1:')!=-1) {
            isApproved = true;
        }
    });

    next(isApproved ? null : 'A reviewer needs to comment ":+1:" to approve this pull.');
}

