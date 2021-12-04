import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error!',
    },
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error!',
      errorMessage: 'No estás autorizado para ver esta página.',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error!',
      errorMessage: 'La página no existe.',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
