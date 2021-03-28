import api from './api';

export default {
  fetchDepartments() {
    return api().get('/departments');
  },

  fetchCompleted() {
    return api().get('/completed');
  },

  fetchWorking() {
    return api().get('/working');
  },

  fetchNames() {
    return api().get('/departments/names/');
  },

  fetchNamesCompleted() {
    return api().get('/name/completed');
  },

  fetchNamesWorking() {
    return api().get('/name/working');
  },
};
