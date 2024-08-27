pm.test('Status code is 201', function () {
  pm.response.to.have.status(201);
});

pm.test('Response contains item ID', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('id');
});

pm.test('Item name matches input', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.name).to.eql('Sample Item');
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

pm.test('Item name is updated', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.name).to.eql('Updated Item Name');
});

pm.test('Status code is 204', function () {
  pm.response.to.have.status(204);
});

pm.test('Status code is 200 for search', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains items matching search query', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.be.an('array');
  pm.expect(jsonData.length).to.be.above(0);
  pm.expect(jsonData[0].name).to.include('searchQuery');
});

pm.test('Status code is 200 for item details', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains average score or rating', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('averageScore');
  pm.expect(jsonData.averageScore).to.be.a('number');
});

pm.test('Status code is 200 for item details', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains all relevant item details', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('name');
  pm.expect(jsonData).to.have.property('description');
  pm.expect(jsonData).to.have.property('category');
});

pm.test('Status code is 400 for missing fields', function () {
  pm.response.to.have.status(400);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.include('name is required');
});

pm.test('Status code is 400 for invalid data format', function () {
  pm.response.to.have.status(400);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.eql('Invalid data format');
});

pm.test('Status code is 404 for non-existent item ID', function () {
  pm.response.to.have.status(404);
});

pm.test('Response contains appropriate error message', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.error).to.eql('Item not found');
});
