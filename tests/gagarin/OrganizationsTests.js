describe('clinical:hl7-resources-medications', function () {
  var server = meteor();
  var client = browser(server);

  it('Medications should exist on the client', function () {
    return client.execute(function () {
      expect(Medications).to.exist;
    });
  });

  it('Medications should exist on the server', function () {
    return server.execute(function () {
      expect(Medications).to.exist;
    });
  });

});
