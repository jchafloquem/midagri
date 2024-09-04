import {CommonModule, NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {GeovisorSharedService} from '../../services/geovisor-shared.service';

// import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import {CapasComponent} from './components/capas/capas.component';
import {LeyendaComponent} from './components/leyenda/leyenda.component';
import {FiltroComponent} from './components/filtro/filtro.component';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgClass, MatButtonModule, CapasComponent, LeyendaComponent, FiltroComponent],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	public _geovisorSharedService = inject(GeovisorSharedService);
	public subMenu: 'leyendas' | 'capas' | 'filtros' = 'capas';

	public toogleMenu = false;

	clickToogleMenu(filtro?: 'leyendas' | 'capas' | 'filtros'): void {
		if (filtro == undefined) {
			this.toogleMenu = !this.toogleMenu;
		} else {
			if (this.subMenu == filtro) {
				this.subMenu = filtro;
				this.toogleMenu = !this.toogleMenu;
			} else {
				this.subMenu = filtro;
				this.toogleMenu = true;
			}
		}
	}
}
