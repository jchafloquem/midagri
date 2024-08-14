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
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

interface region {
	coddep: string;
	nombdep: string;
}
interface provincia {
	codprov: string;
	nombprov: string;
}
interface distrito {
	coddist: string;
	nombdist: string;
}
@Component({
	selector: 'app-filtro',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
	templateUrl: './filtro.component.html',
	styleUrl: './filtro.component.scss',
})
export class FiltroComponent implements OnInit {
	public _geovisorSharedService = inject(GeovisorSharedService);

	public regiones: region[] = [];
	public provincias: provincia[] = [];
	public distritos: distrito[] = [];

	public region = new FormControl<region | null>(null, [Validators.required]);
	public provincia = new FormControl<provincia | null>(null, [Validators.required]);
	public distrito = new FormControl<distrito | null>(null, [Validators.required]);
	public regionFeatureLayer!: any;
	public provinciaFeatureLayer!: any;
	public distritoFeatureLayer!: any;
	public regionDarkBackLayer!: any;
	public provinciaDarkBackLayer!: any;
	public distritoDarkBackLayer!: any;
	public groupLayerFiltro = new GroupLayer({
		id: 'groupLayerFiltro',
		title: 'Filtros',
		visibilityMode: 'independent',
		visible: true,
	});
	ngOnInit(): void {
		this._geovisorSharedService.mapa?.add(this.groupLayerFiltro);
		this.listRegion();
	}
	limpiarlayers(): void {
		this._geovisorSharedService.removeLayerFromGroup('groupLayerFiltro', 'regionSeleccionada');
		this._geovisorSharedService.removeLayerFromGroup('groupLayerFiltro', 'provinciaSeleccionada');
		this._geovisorSharedService.removeLayerFromGroup('groupLayerFiltro', 'distritoSeleccionada');
		this._geovisorSharedService.mapa.remove(this.regionFeatureLayer);
		this._geovisorSharedService.mapa.remove(this.regionDarkBackLayer);
		this._geovisorSharedService.mapa.remove(this.provinciaFeatureLayer);
		this._geovisorSharedService.mapa.remove(this.provinciaDarkBackLayer);
		this._geovisorSharedService.mapa.remove(this.distritoFeatureLayer);
		this._geovisorSharedService.mapa.remove(this.distritoDarkBackLayer);
	}
	regionDarkBlack(): void {
		this.regionDarkBackLayer = new FeatureLayer({
			url: `${this._geovisorSharedService.layerUrls.baseService}/${this._geovisorSharedService.layerUrls.limits.departamentos}`,
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
			minScale: 0, // Visible en todas las escalas
			maxScale: 0, // Visible en todas las escalas
		});

		this._geovisorSharedService.mapa?.add(this.regionDarkBackLayer);
	}
	provinciaDarkBlack(): void {
		this.provinciaDarkBackLayer = new FeatureLayer({
			url: `${this._geovisorSharedService.layerUrls.baseService}/${this._geovisorSharedService.layerUrls.limits.provincias}`,
			renderer: new SimpleRenderer({
				symbol: new SimpleFillSymbol({
					color: new Color([0, 0, 0, 0.5]), // Color de fondo oscuro
					outline: {
						width: 0, // Sin borde para el fondo oscuro
						color: new Color([0, 0, 0, 0]),
					},
				}),
			}),
			definitionExpression: `CODDEP='${this.region.value?.coddep}' AND CODPROV <> '${this.provincia.value?.codprov}'`, // Mostrar todas las regiones como fondo oscuro
			blendMode: 'multiply', // Mezclar para oscurecer todo excepto la capa seleccionada
			legendEnabled: false,
			minScale: 0, // Visible en todas las escalas
			maxScale: 0, // Visible en todas las escalas
		});

		this._geovisorSharedService.mapa?.add(this.provinciaDarkBackLayer);
	}
	distritoDarkBlack(): void {
		this.distritoDarkBackLayer = new FeatureLayer({
			url: `${this._geovisorSharedService.layerUrls.baseService}/${this._geovisorSharedService.layerUrls.limits.distritos}`,
			renderer: new SimpleRenderer({
				symbol: new SimpleFillSymbol({
					color: new Color([0, 0, 0, 0.5]), // Color de fondo oscuro
					outline: {
						width: 0, // Sin borde para el fondo oscuro
						color: new Color([0, 0, 0, 0]),
					},
				}),
			}),
			definitionExpression: `CODDEP='${this.region.value?.coddep}' AND CODPROV='${this.provincia.value?.codprov}' AND CODDIST <> '${this.distrito.value?.coddist}'`, // Mostrar todas las regiones como fondo oscuro
			blendMode: 'multiply', // Mezclar para oscurecer todo excepto la capa seleccionada
			legendEnabled: false,
			minScale: 0, // Visible en todas las escalas
			maxScale: 0, // Visible en todas las escalas
		});

		this._geovisorSharedService.mapa?.add(this.distritoDarkBackLayer);
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
			query.outFields = ['CODDEP', 'CODPROV', 'NOMBPROV']; // Campos que deseas obtener

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
	listDistrito(): void {
		//this.spinner.show();
		const distritoFeature = this._geovisorSharedService.getDistritosFeature();
		if (distritoFeature) {
			//Definir la consulta para obtener los registros deseados
			const query = distritoFeature.createQuery();
			query.where = `CODDEP='${this.region.value?.coddep}' AND CODPROV='${this.provincia.value?.codprov}'`;
			query.outFields = ['CODDEP', 'CODPROV', 'CODDIST', 'NOMBDIST']; // Campos que deseas obtener

			// Ejecutar la consulta para obtener los features
			distritoFeature
				.queryFeatures(query)
				.then((featureSet) => {
					// Procesar los resultados de la consulta
					const features = featureSet.features;
					console.log('provincias', features[0].attributes);

					this.distritos = features.map((feature) => ({
						coddist: feature.attributes.CODDIST,
						nombdist: feature.attributes.NOMBDIST,
					}));
					console.log('provincias', this.provincias);

					//this.spinner.hide();
				})
				.catch((error) => {
					console.error('Error loading provincia layer:', error);
				});
		}
	}
	regionChange(): void {
		//this.spinner.show();
		this.limpiarlayers();

		this.regionDarkBlack();
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
							url: `${this._geovisorSharedService.layerUrls.baseService}/${this._geovisorSharedService.layerUrls.limits.departamentos}`, // Usar el feature como fuente de la capa
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
							minScale: 0, // Visible en todas las escalas
							maxScale: 0, // Visible en todas las escalas
						});
						this._geovisorSharedService.mapa?.add(this.regionFeatureLayer);
						this.listProvincia();
					} else {
						console.warn('No se encontraron resultados para la consulta.');
					}
				})
				.catch((error) => {
					console.error('Error al cargar la capa de regiones:', error);
				});
		}
	}
	provinciaChange(): void {
		this.limpiarlayers();
		this.regionDarkBlack();
		this.provinciaDarkBlack();
		const provinciaFeature = this._geovisorSharedService.getProvinciaFeature();

		if (provinciaFeature) {
			//Definir la consulta para obtener los registros deseados
			const query = provinciaFeature.createQuery();
			query.where = `CODDEP='${this.region.value?.coddep}' AND CODPROV='${this.provincia.value?.codprov}'`;
			query.outFields = ['CODDEP', 'CODPROV', 'NOMBPROV']; // Campos que deseas obtener
			// Ejecutar la consulta para obtener los features
			provinciaFeature
				.queryFeatures(query)
				.then((featureSet) => {
					if (featureSet.features.length === 1) {
						// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
						const geometry = featureSet.features[0].geometry; // Realizar el zoom o navegación a la geometría
						this._geovisorSharedService.view?.goTo(geometry.extent);
						const whereClause = `CODDEP='${this.region.value?.coddep}' AND CODPROV='${this.provincia.value?.codprov}'`; // Crear una nueva capa con el feature
						this.provinciaFeatureLayer = new FeatureLayer({
							id: 'provinciaSeleccionada',
							url: `${this._geovisorSharedService.layerUrls.baseService}/${this._geovisorSharedService.layerUrls.limits.provincias}`, // Usar el feature como fuente de la capa
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
							minScale: 0, // Visible en todas las escalas
							maxScale: 0, // Visible en todas las escalas
						});
						this._geovisorSharedService.mapa?.add(this.provinciaFeatureLayer);
						this.listDistrito();
					} else {
						console.warn('No se encontraron resultados para la consulta.');
					}
				})
				.catch((error) => {
					console.error('Error al cargar la capa de regiones:', error);
				});
		}
	}
	distritoChange(): void {
		this.limpiarlayers();
		this.regionDarkBlack();
		this.provinciaDarkBlack();
		this.distritoDarkBlack();
		const distritoFeature = this._geovisorSharedService.getDistritosFeature();
		if (distritoFeature) {
			//Definir la consulta para obtener los registros deseados
			const query = distritoFeature.createQuery();
			query.where = `CODDEP='${this.region.value?.coddep}' AND CODPROV='${this.provincia.value?.codprov}' AND CODDIST='${this.distrito.value?.coddist}'`;
			query.outFields = ['CODDEP', 'CODPROV', 'CODDIST', 'NOMBDIST']; // Campos que deseas obtener
			distritoFeature
				.queryFeatures(query)
				.then((featureSet) => {
					if (featureSet.features.length === 1) {
						// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
						const geometry = featureSet.features[0].geometry;
						// Realizar el zoom o navegación a la geometría
						this._geovisorSharedService.view?.goTo(geometry.extent);
						const whereClause = `CODDEP='${this.region.value?.coddep}' AND CODPROV='${this.provincia.value?.codprov}' AND CODDIST='${this.distrito.value?.coddist}'`;
						// Crear una nueva capa con el feature
						this.distritoFeatureLayer = new FeatureLayer({
							id: 'distritoSeleccionada',
							url: `${this._geovisorSharedService.layerUrls.baseService}/${this._geovisorSharedService.layerUrls.limits.distritos}`, // Usar el feature como fuente de la capa
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
							minScale: 0, // Visible en todas las escalas
							maxScale: 0, // Visible en todas las escalas
						});
						this._geovisorSharedService.mapa?.add(this.distritoFeatureLayer);
					} else {
						console.warn('No se encontraron resultados para la consulta.');
					}
				})
				.catch((error) => {
					console.error('Error al cargar la capa de regiones:', error);
				});
		}
	}
}
