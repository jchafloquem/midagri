import {CommonModule, NgClass} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {GeovisorSharedService} from '../../services/geovisor-shared.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {LayerConfig} from '../../interface/layerConfig';

import {MatExpansionModule} from '@angular/material/expansion';
interface LayerGroup {
	groupTitle: string;
	layers: LayerConfig[];
}

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgClass, MatButtonModule, MatSlideToggle, MatExpansionModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
	public _geovisorSharedService = inject(GeovisorSharedService);
	public readonly panelOpenState = signal(false);
	public subMenu: 'leyenda' | 'capas' = 'capas';

	public toogleMenu = true;

	public LayerGroup: LayerGroup[] = [];
	public legend!: any;

	ngOnInit(): void {
		this.LayerGroup = this.groupLayersByGroup();
	}
	clickToogleMenu(): void {
		this.toogleMenu = !this.toogleMenu;
	}
	toggleLayer(title: string): void {
		const currentVisibility = this._geovisorSharedService.getLayerVisibility(title);
		this._geovisorSharedService.layers.forEach((layer) => {
			if (layer.title === title) {
				layer.visible = !currentVisibility;
			}
		});
		this._geovisorSharedService.toggleLayerVisibility2(title, !currentVisibility);
	}
	groupLayersByGroup(): LayerGroup[] {
		const groupedLayers: Record<string, LayerConfig[]> = {};

		this._geovisorSharedService.layers.forEach((layer) => {
			if (layer.group) {
				if (!groupedLayers[layer.group]) {
					groupedLayers[layer.group] = [];
				}
				groupedLayers[layer.group].push(layer);
			}
		});

		return Object.keys(groupedLayers).map((groupTitle) => ({
			groupTitle,
			layers: groupedLayers[groupTitle],
		}));
	}

	createLegend(): void {
		setTimeout(() => {
			this.legend = this._geovisorSharedService.legend;

			if (this.legend) {
				const legendContainer = document.getElementById('legend-container');
				legendContainer?.appendChild(this.legend.container);
			}
		}, 100);
	}
}
