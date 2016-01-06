var rules = require('../rules').rules,
    fixtures = require('./fixtures/fixtures'),
    rules_array = Object.keys(rules).map(function (key) {
        return rules[key];
    });

module.exports.failUnapprovedBuild = function(test) {
  test.expect(3);

  // No comments == failure
  rules.requireApproval(fixtures.pull_request, fixtures.empty_comments, function(err) {
    test.notEqual(err, null, "requireApproval did not fail build with no comments");
  })

  // Approval from author == still failure
  rules.requireApproval(fixtures.pull_request, fixtures.author_comments, function(err) {
    test.notEqual(err, null, "requireApproval did not fail self-approved build");
  })

  // No approval among comments == still failure
  rules.requireApproval(fixtures.pull_request, fixtures.unopinionated_comments, function(err) {
    test.notEqual(err, null, "requireApproval did not fail build with unopinionated comments");
  })

  test.done();
}

module.exports.passApprovedBuild = function(test) {
  test.expect(1);

  rules.requireApproval(fixtures.pull_request, fixtures.approved_comments, function(err) {
    test.equal(err, null, "requireApproval did not pass an approved build");
  })

  test.done();
}
