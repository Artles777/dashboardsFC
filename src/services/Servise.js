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

  fetchStages() {
    return api().get('/departments/stages');
  },

  fetchStagesCompleted() {
    return api().get('/stages/completed');
  },

  fetchStagesWorking() {
    return api().get('/stages/working');
  },

  fetchDocuments() {
    return api().get('/departments/documents');
  },

  fetchDocumentsCompleted() {
    return api().get('/documents/completed');
  },

  fetchDocumentsWorking() {
    return api().get('/documents/working');
  },
};
