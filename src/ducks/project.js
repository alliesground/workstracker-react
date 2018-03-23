export const types = {
  FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST',
  FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE'
}

const initialState = {
  projects: [],
  isLoading: false,
}
