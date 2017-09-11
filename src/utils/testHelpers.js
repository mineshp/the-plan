const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

const foo = () => {
    console.log('foo called');
};

module.exports = {
    mockFetchResponse: mockResponse,
    foo: foo
};