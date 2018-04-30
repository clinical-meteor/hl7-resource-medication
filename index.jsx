

import MedicationsPage from './client/MedicationsPage';
import MedicationsTable from './client/MedicationsTable';
import MedicationDetail from './client/MedicationDetail';

var DynamicRoutes = [{
  'name': 'MedicationsPage',
  'path': '/medications',
  'component': MedicationsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Medications',
  'to': '/medications',
  'href': '/medications'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  MedicationsPage,
  MedicationsTable
};


