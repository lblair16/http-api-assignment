// imports
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const responseHandler = require('./responses');

// running on port 3000, unless configured
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyle,
  '/success': responseHandler.getSuccess,
  '/badRequest': responseHandler.getBadRequest,
  '/unauthorized': responseHandler.getUnauthorized,
  '/forbidden': responseHandler.getForbidden,
  '/internal': responseHandler.getInternal,
  '/notImplemented': responseHandler.getNotImplemented,
};

// start server and listen for HTTP traffic
const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);

  // grab the 'accept' headers (comma delimited) and split them into an array
  const acceptedTypes = request.headers.accept.split(',');

  const bodyParams = query.parse(parsedUrl.query);

  // check if the path name (the /name part of the url) matches
  // any in our url object. If so call that function. If not, default to index.
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, bodyParams);
  } else {
    responseHandler.getNotFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);
