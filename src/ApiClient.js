function loadProjects(success) {
  return fetch(`/projects`, {
    accept: 'application/json',
  }).then(parseJson)
    .then(success);
}

function parseJson(response) {
  return response.json();
}

const ApiClient = { loadProjects }
export default ApiClient;
