import {Component, inject, OnInit, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {LayerConfig} from '../../../../interface/layerConfig';
import {GeovisorSharedService} from '../../../../services/geovisor-shared.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
interface LayerGroup {
	groupTitle: string;
	layers: LayerConfig[];
}
@Component({
	selector: 'app-capas',
	standalone: true,
	imports: [MatExpansionModule, MatSlideToggle],
	templateUrl: './capas.component.html',
	styleUrl: './capas.component.scss',
})
export class CapasComponent implements OnInit {
	public _geovisorSharedService = inject(GeovisorSharedService);
	public readonly panelOpenState = signal(false);

	public LayerGroup: LayerGroup[] = [];
	ngOnInit(): void {
		this.LayerGroup = this.groupLayersByGroup();
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
	toggleLayer(title: string): void {
		const currentVisibility = this._geovisorSharedService.getLayerVisibility(title);
		this._geovisorSharedService.layers.forEach((layer) => {
			if (layer.title === title) {
				layer.visible = !currentVisibility;
			}
		});
		this._geovisorSharedService.toggleLayerVisibility2(title, !currentVisibility);
	}
}
