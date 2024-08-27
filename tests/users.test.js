pm.test('Status code is 201', function () {
  pm.response.to.have.status(201);
});

pm.test('Response contains user ID', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('id');
});

pm.test('User email matches input', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.email).to.eql('user@example.com');
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

pm.test('User email is updated', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.email).to.eql('updateduser@example.com');
});

pm.test('Status code is 204', function () {
  pm.response.to.have.status(204);
});

pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains a token', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('token');
});

pm.test('Response contains user data', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.user.email).to.eql('user@example.com');
});

pm.test('Status code is 401 when not logged in', function () {
  pm.response.to.have.status(401);
});

pm.test('Status code is 403 when accessing other user data', function () {
  pm.response.to.have.status(403);
});

pm.test('Status code is 409 for duplicate email', function () {
  pm.response.to.have.status(409);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.eql('Email already exists');
});

pm.test('Status code is 400 for invalid email format', function () {
  pm.response.to.have.status(400);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.eql('Invalid email format');
});

pm.test('Status code is 400 for missing fields', function () {
  pm.response.to.have.status(400);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.include('email is required');
});

pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains correct user details', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.email).to.eql('user@example.com');
  pm.expect(jsonData).to.have.property('name');
  pm.expect(jsonData).to.have.property('createdAt');
});
