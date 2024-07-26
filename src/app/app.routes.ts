import {Routes} from '@angular/router';

export const routes: Routes = [
	{
		path: 'geovisor',
		loadComponent: () => import('./geovisor/geovisor.component'),
		children: [
			{
				path: 'map',
				loadComponent: () => import('./geovisor/pages/map/map.component'),
			},
			{
				path: 'error404',
				loadComponent: () => import('./geovisor/pages/error404/error404.component'),
			},
			{
				path: '',
				redirectTo: 'map',
				pathMatch: 'full',
			},
			{
				path: '**',
				redirectTo: 'error404',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '**',
		redirectTo: 'geovisor',
		pathMatch: 'full',
	},
];
