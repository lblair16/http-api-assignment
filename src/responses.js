// function to send response
const respond = (request, response, content, type, statusCode) => {
  // set status code (200 success) and content type
  response.writeHead(statusCode, { 'Content-Type': type });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = `<response><message>${responseObj.message}</message></response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', 200);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', 200);
};

const getBadRequest = (request, response, acceptedTypes, params) => {
  const valid = params && params.valid === 'true';
  const statusCode = valid ? 200 : 400;
  const responseObj = {
    message: valid ? 'Valid query parameter set to true'
      : 'Missing valid query parameter set to true',
  };

  if (!valid) {
    responseObj.id = 'unauthorized';
  }

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = valid ? `<response>
    <message>${responseObj.message}</message>
    </response>`
      : `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
    </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', statusCode);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', statusCode);
};

const getUnauthorized = (request, response, acceptedTypes, params) => {
  const valid = params && params.loggedIn === 'yes';
  const statusCode = valid ? 200 : 401;
  const responseObj = {
    message: valid ? 'Successful log in'
      : 'Missing loggedIn query parameter set to true',
  };

  if (!valid) {
    responseObj.id = 'unauthorized';
  }

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = valid ? `<response>
    <message>${responseObj.message}</message>
    </response>`
      : `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
    </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', statusCode);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', statusCode);
};

const getForbidden = (request, response, acceptedTypes) => {
  const responseObj = {
    message: "You don't have access to this content",
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
    </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', 403);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', 403);
};

const getInternal = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Internal Error',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
    </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', 500);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', 500);
};

const getNotImplemented = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Not implemented',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
    </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', 501);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', 501);
};

const getNotFound = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Page not found',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
    </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', 404);
  }
  return respond(request, response, JSON.stringify(responseObj), 'application/json', 404);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};
