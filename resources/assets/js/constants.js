import environments from 'gulp-environments';
export const API_URL = environments.production() ? 'https://pegan-recipe-manager.herokuapp.com' : 'http://localhost:8000/api/';
