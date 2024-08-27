pm.test('Status code is 201', function () {
  pm.response.to.have.status(201);
});

pm.test('Response contains review ID', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('id');
});

pm.test('Review text matches input', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.text).to.eql('This is a sample review');
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

pm.test('Review text is updated', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.text).to.eql('Updated review text');
});

pm.test('Status code is 204', function () {
  pm.response.to.have.status(204);
});

pm.test('Status code is 409 for duplicate review', function () {
  pm.response.to.have.status(409);
});

pm.test(
  'Response contains appropriate error message for duplicate review',
  function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql('User has already reviewed this item');
  }
);

pm.test('Status code is 200 for user reviews list', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains reviews written by the user', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.be.an('array');
  pm.expect(jsonData.length).to.be.above(0);
  pm.expect(jsonData[0]).to.have.property('text');
});

pm.test('Status code is 204 for review deletion', function () {
  pm.response.to.have.status(204);
});

pm.test('Status code is 200 for review update', function () {
  pm.response.to.have.status(200);
});

pm.test('Updated review text is correct', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.text).to.eql('Updated review text');
});

pm.test('Status code is 404 for non-existent review ID', function () {
  pm.response.to.have.status(404);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.eql('Review not found');
});

pm.test('Status code is 400 for missing review text', function () {
  pm.response.to.have.status(400);
});

pm.test(
  'Response contains appropriate error message for missing text',
  function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.include('Review text is required');
  }
);

pm.test('Status code is 400 for invalid rating', function () {
  pm.response.to.have.status(400);
});

pm.test(
  'Response contains appropriate error message for invalid rating',
  function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.include('Invalid rating');
  }
);
