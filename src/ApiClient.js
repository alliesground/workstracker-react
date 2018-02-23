function loadProjects(success) {
  return fetch(`/api/v1/projects`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTUxOTM2MTU1MiwiZXhwIjoxNTE5MzY1MTUyLCJqdGkiOiI1YTE5OWE2Mi1iYWY0LTQ4MTctYThlYS1iYTA3ZjgzNTMzOTUifQ.YXJ_ds4Y9FgMN7ZkPipW7VgIHnhHDRoEZQg1nBqVvHE'
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
