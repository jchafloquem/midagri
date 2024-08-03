import {CommonModule, NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {GeovisorSharedService} from '../../services/geovisor-shared.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgClass, MatButtonModule, MatSlideToggle],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	public _geovisorSharedService = inject(GeovisorSharedService);

	public subMenu: 'leyenda' | 'capas' = 'capas';

	public toogleMenu = false;

	clickToogleMenu(): void {
		this.toogleMenu = !this.toogleMenu;
	}

	toggleLayer(title: string): void {
		const currentVisibility = this._geovisorSharedService.getLayerVisibility(title);
		this._geovisorSharedService.toggleLayerVisibility2(title, !currentVisibility);
	}
}
