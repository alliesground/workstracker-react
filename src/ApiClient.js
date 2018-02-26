function loadProjects(success) {
  return fetch(`/api/v1/projects`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTUxOTM2ODk0OCwiZXhwIjoxNTE5MzcyNTQ4LCJqdGkiOiI2ZmEyNWNjZi1lYTFlLTQ1ZDMtYmIxOC0yOGIyNzc4ZDdhZDgifQ.A3fo1qQ-Se24u0CRLBCobxbH8-pnJIT5FB9qQ-Yf5RY'
    }
  }).then(checkStatus)
    .then(parseJson)
    .then(success);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

const ApiClient = { loadProjects }
export default ApiClient;
