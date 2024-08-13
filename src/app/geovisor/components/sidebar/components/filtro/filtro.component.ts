import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {GeovisorSharedService} from '../../../../services/geovisor-shared.service';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Color from '@arcgis/core/Color';

interface region {
	coddep: string;
	nombdep: string;
}
interface provincia {
	codprov: string;
	nombprov: string;
}
interface distrito {
	coddep: string;
	nombdep: string;
}
@Component({
	selector: 'app-filtro',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
	templateUrl: './filtro.component.html',
	styleUrl: './filtro.component.scss',
})
export class FiltroComponent implements OnInit {
	public _geovisorSharedService = inject(GeovisorSharedService);

	public regiones: region[] = [];
	public provincias: provincia[] = [];
	public distritos: region[] = [];

	public region = new FormControl<region | null>(null, [Validators.required]);
	public provincia = new FormControl<provincia | null>(null, [Validators.required]);
	public distrito = new FormControl<region | null>(null, [Validators.required]);
	public regionFeatureLayer!: any;
	public darkBackgroundLayer!: any;
	public groupLayerFiltro = new GroupLayer({
		id: 'groupLayerFiltro',
		title: 'Filtros',
		visibilityMode: 'independent',
		visible: true,
	});
	public coddep?: string;
	ngOnInit(): void {
		this._geovisorSharedService.mapa?.add(this.groupLayerFiltro);
		this.listRegion();
	}
	regionChange(): void {
		console.log(' =>', this.region.value);
		this.getRegion();
	}
	fondoDarkBlack(): void {
		this._geovisorSharedService.mapa.remove(this.darkBackgroundLayer);
		this.darkBackgroundLayer = new FeatureLayer({
			url: `https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0`,
			renderer: new SimpleRenderer({
				symbol: new SimpleFillSymbol({
					color: new Color([0, 0, 0, 0.5]), // Color de fondo oscuro
					outline: {
						width: 0, // Sin borde para el fondo oscuro
						color: new Color([0, 0, 0, 0]),
					},
				}),
			}),
			definitionExpression: `CODDEP <> '${this.region.value?.coddep}'`, // Mostrar todas las regiones como fondo oscuro
			blendMode: 'multiply', // Mezclar para oscurecer todo excepto la capa seleccionada
			legendEnabled: false,
		});

		this._geovisorSharedService.mapa?.add(this.darkBackgroundLayer);
	}
	getRegion(): void {
		//this.spinner.show();

		this._geovisorSharedService.removeLayerFromGroup('groupLayerFiltro', 'regionSeleccionada');
		this._geovisorSharedService.mapa.remove(this.regionFeatureLayer);
		this.fondoDarkBlack();
		const regionFeature = this._geovisorSharedService.getRegionFeature();

		if (regionFeature) {
			//Definir la consulta para obtener los registros deseados
			const query = regionFeature.createQuery();
			query.where = `CODDEP='${this.region.value?.coddep}'`;

			query.outFields = ['CODDEP', 'NOMBDEP']; // Campos que deseas obtener

			// Ejecutar la consulta para obtener los features
			regionFeature
				.queryFeatures(query)
				.then((featureSet) => {
					if (featureSet.features.length === 1) {
						// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
						const geometry = featureSet.features[0].geometry;
						// Realizar el zoom o navegación a la geometría
						this._geovisorSharedService.view?.goTo(geometry.extent);
						//
						const whereClause = `CODDEP='${this.region.value?.coddep}'`;
						// Crear una nueva capa con el feature
						this.regionFeatureLayer = new FeatureLayer({
							id: 'regionSeleccionada',
							url: `https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0`, // Usar el feature como fuente de la capa
							title: 'Límites Censales - Región',
							renderer: new SimpleRenderer({
								symbol: new SimpleFillSymbol({
									color: new Color([28, 169, 86, 0.1]),
									outline: {
										width: 3,
										color: new Color([28, 169, 86, 1]),
									},
								}),
							}),
							definitionExpression: whereClause,
							blendMode: 'source-atop',
							legendEnabled: false,
						});

						// Agregar la nueva capa al mapa
						// const groupLayerFiltro = new GroupLayer({
						// 	title: 'ODNGRD',
						// 	visibilityMode: 'independent',
						// 	visible:false,
						// 	layers: [
						// 		this.layerFeatureService.featureLayer('ODNGRD','Elementos_Expuestos'),
						// 		this.layerFeatureService.featureLayer('ODNGRD','Escenario déficit hídrico'),
						// 	]
						// });
						// this.groupLayerFiltro.add(regionFeatureLayer);
						// darkBackgroundLayer.load().then(() => {

						// });
						// this.groupLayerFiltro.add(regionFeatureLayer);
						//
						this._geovisorSharedService.mapa?.add(this.regionFeatureLayer);
						this.listProvincia();
						// this.webmap?.layers.add(regionFeatureLayer);

						// this.provinciaFeatureService.setProvinciaFeature();
						// const provinciaFeature = this.provinciaFeatureService?.getProvinciaFeature();

						// if (provinciaFeature) {
						// 	//Definir la consulta para obtener los registros deseados
						// 	const query = provinciaFeature.createQuery();
						// 	query.where = `CODDEP='${this.coddep}'`;
						// 	query.outFields = ['CODDEP', 'CODPROV', 'NOMBPROV']; // Campos que deseas obtener

						// 	provinciaFeature.queryFeatures(query).then((featureSet) => {
						// 		const features = featureSet.features;
						// 		this.provincias = features.map((feature) => ({
						// 			codprov: feature.attributes.CODPROV,
						// 			nombprov: feature.attributes.NOMBPROV,
						// 		}));

						// 		const whereClause = `CODDEP='${this.coddep}'`;
						// 		// Crear una nueva capa con el feature
						// 		const provinciaFeatureLayer = new FeatureLayer({
						// 			id: 'provinciaSeleccionada',
						// 			url: this.provinciaService.urlGis(), // Usar el feature como fuente de la capa
						// 			title: 'Límites Censales - Provincia',
						// 			renderer: new SimpleRenderer({
						// 				symbol: new SimpleFillSymbol({
						// 					color: new Color([255, 165, 0, 0.1]),
						// 					outline: new SimpleLineSymbol({
						// 						width: 2,
						// 						color: new Color([255, 165, 0]),
						// 					}),
						// 				}),
						// 			}),
						// 			definitionExpression: whereClause,
						// 		});
						// 		// Agregar la nueva capa al mapa
						// 		this.groupLayerFiltro.add(provinciaFeatureLayer);
						// 		//this.webmap?.layers.add(provinciaFeatureLayer);
						// 	});
						// }
					} else {
						console.warn('No se encontraron resultados para la consulta.');
					}
				})
				.catch((error) => {
					console.error('Error al cargar la capa de regiones:', error);
				});
		}
	}

	listRegion(): void {
		//this.spinner.show();
		const regionFeature = this._geovisorSharedService.getRegionFeature();

		if (regionFeature) {
			//Definir la consulta para obtener los registros deseados
			const query = regionFeature.createQuery();
			query.where = '1=1';
			query.outFields = ['CODDEP', 'NOMBDEP']; // Campos que deseas obtener

			// Ejecutar la consulta para obtener los features
			regionFeature
				.queryFeatures(query)
				.then((featureSet) => {
					// Procesar los resultados de la consulta
					const features = featureSet.features;
					this.regiones = features.map((feature) => ({
						coddep: feature.attributes.CODDEP,
						nombdep: feature.attributes.NOMBDEP,
					}));

					//this.spinner.hide();
				})
				.catch((error) => {
					console.error('Error loading region layer:', error);
				});
		}
	}
	listProvincia(): void {
		//this.spinner.show();
		const provinciaFeature = this._geovisorSharedService.getProvinciaFeature();
		if (provinciaFeature) {
			//Definir la consulta para obtener los registros deseados
			const query = provinciaFeature.createQuery();
			query.where = `CODDEP='${this.region.value?.coddep}'`;
			query.outFields = ['CODDEP', 'NOMBDEP']; // Campos que deseas obtener

			// Ejecutar la consulta para obtener los features
			provinciaFeature
				.queryFeatures(query)
				.then((featureSet) => {
					// Procesar los resultados de la consulta
					const features = featureSet.features;
					console.log('provincias', features[0].attributes);

					this.provincias = features.map((feature) => ({
						codprov: feature.attributes.CODPROV,
						nombprov: feature.attributes.NOMBPROV,
					}));
					console.log('provincias', this.provincias);

					//this.spinner.hide();
				})
				.catch((error) => {
					console.error('Error loading provincia layer:', error);
				});
		}
	}
}
