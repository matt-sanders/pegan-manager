import environments from 'gulp-environments';
export const API_URL = environments.development() ? 'http://localhost:8000/api/' : 'https://pegan-recipe-manager.herokuapp.com';
