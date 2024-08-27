pm.test('Status code is 201', function () {
  pm.response.to.have.status(201);
});

pm.test('Response contains comment ID', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('id');
});

pm.test('Comment text matches input', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.text).to.eql('This is a sample comment');
});

pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response is an array', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.be.an('array');
});

pm.test('Response array is not empty', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.length).to.be.above(0);
});

pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Comment text is updated', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.text).to.eql('Updated comment text');
});

pm.test('Status code is 204', function () {
  pm.response.to.have.status(204);
});

pm.test('Status code is 201 for comment creation', function () {
  pm.response.to.have.status(201);
});

pm.test('Response contains comment ID and associated review ID', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('id');
  pm.expect(jsonData).to.have.property('reviewId');
});

pm.test('Status code is 200 for user comments list', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains comments written by the user', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.be.an('array');
  pm.expect(jsonData.length).to.be.above(0);
  pm.expect(jsonData[0]).to.have.property('text');
});

pm.test('Status code is 200 for comment update', function () {
  pm.response.to.have.status(200);
});

pm.test('Updated comment text is correct', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.text).to.eql('Updated comment text');
});

pm.test('Status code is 204 for comment deletion', function () {
  pm.response.to.have.status(204);
});

pm.test(
  'Status code is 403 for unauthorized comment modification',
  function () {
    pm.response.to.have.status(403);
  }
);

pm.test('Status code is 403 for unauthorized comment deletion', function () {
  pm.response.to.have.status(403);
});

pm.test('Status code is 400 for missing comment text', function () {
  pm.response.to.have.status(400);
});

pm.test(
  'Response contains appropriate error message for missing text',
  function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.include('Comment text is required');
  }
);

pm.test('Status code is 400 for invalid data format', function () {
  pm.response.to.have.status(400);
});

pm.test(
  'Response contains appropriate error message for invalid format',
  function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.include('Invalid data format');
  }
);

pm.test('Status code is 404 for non-existent comment ID', function () {
  pm.response.to.have.status(404);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.eql('Comment not found');
});
