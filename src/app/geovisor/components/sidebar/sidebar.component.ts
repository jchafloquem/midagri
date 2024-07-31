import {CommonModule, NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {GeovisorSharedService} from '../../services/geovisor-shared.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgClass, MatButtonModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	public subMenu = 'capas';
	public toogleMenu = false;
	public geovisorSharedService = inject(GeovisorSharedService);

	clickToogleMenu(): void {
		this.toogleMenu = !this.toogleMenu;
	}

	toggleLayer(title: string): void {
		const currentVisibility = this.geovisorSharedService.getLayerVisibility(title);
		this.geovisorSharedService.toggleLayerVisibility2(title, !currentVisibility);
	}
}
