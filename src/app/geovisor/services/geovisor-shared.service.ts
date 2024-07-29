import {ElementRef, Injectable} from '@angular/core';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import Locate from '@arcgis/core/widgets/Locate.js';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import Print from '@arcgis/core/widgets/Print.js';
import ScaleBar from '@arcgis/core/widgets/ScaleBar.js';
import Search from '@arcgis/core/widgets/Search.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';

import * as projection from '@arcgis/core/geometry/projection';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import Point from '@arcgis/core/geometry/Point';
interface LayerConfig {
	title: string;
	url: string;
	popupTemplate?: PopupTemplate;
	visible: boolean;
	outFields?: string[];
}

@Injectable({
	providedIn: 'root',
})
export class GeovisorSharedService {
	public mapa = new Map({basemap: 'hybrid'});
	public layerUrls = {
		baseService: 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri',
		limits: {
			departamentos: 'Limites_Censales/MapServer/0',
			provincias: 'Limites_Censales/MapServer/1',
			distritos: 'Limites_Censales/MapServer/2',
		},

		agroideas: 'AGROIDEAS/MapServer/0',
		ppa: 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ConPuchePeru/ppa/MapServer/0',
		psi: 'PSI/MapServer/0',
		esan: 'https://winlmprap24.midagri.gob.pe/arcgis_server/rest/services/ENIS/SAN/MapServer/0',
		dgaaa: 'DGAAA/MapServer/',
		odngrd: 'ODNGRD/MapServer/',
		dgihr: 'DGIHR/MapServer/',
		dgdg: 'DGDG/MapServer/',
		agrorural: 'AGRORURAL/MapServer/',
	};
	public layers: LayerConfig[] = [
		//*Servicios de capas base

		{
			title: 'Limite de departamentos',
			url: `${this.layerUrls.baseService}/${this.layerUrls.limits.departamentos}`,
			visible: true,
			popupTemplate: undefined,
		},
		{
			title: 'Limite de provincias',
			url: `${this.layerUrls.baseService}/${this.layerUrls.limits.provincias}`,
			visible: true,
			popupTemplate: undefined,
		},
		{
			title: 'Limite de distritos',
			url: `${this.layerUrls.baseService}/${this.layerUrls.limits.distritos}`,
			visible: true,
			popupTemplate: undefined,
		},
		//*Servicios de capas de informacion
		{
			title: 'Reconversión productiva',
			url: `${this.layerUrls.baseService}/${this.layerUrls.agroideas}`,
			visible: false,
			popupTemplate: undefined,
		},
		{title: 'Con Punche Perú', url: `${this.layerUrls.ppa}`, visible: false, popupTemplate: undefined},
		{
			title: 'Proyecto de Riego Tecnificado',
			url: `${this.layerUrls.baseService}/${this.layerUrls.psi}`,
			visible: false,
			popupTemplate: undefined,
		},
		{
			title: 'Superficie Agricola Nacional',
			url: `${this.layerUrls.esan}`,
			visible: false,
			popupTemplate: undefined,
		},
		{title: 'Suelos SD', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}25`, visible: false, popupTemplate: undefined},
		{title: 'Suelos R', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}24`, visible: false, popupTemplate: undefined},
		{title: 'Suelos D', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}23`, visible: false, popupTemplate: undefined},
		{title: 'EroCl SD', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}21`, visible: false, popupTemplate: undefined},
		{title: 'CUAT SD', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}20`, visible: false, popupTemplate: undefined},
		{title: 'CUAT D', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}19`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_50000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}17`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_45000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}16`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_2000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}15`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_25000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}14`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_20000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}13`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_12000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}12`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMSD_10000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}11`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMR_100000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}9`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMR_50000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}8`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMR_35000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}7`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMR_30000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}6`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMR_25000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}5`, visible: false, popupTemplate: undefined},
		{title: 'CTCUMR_20000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}4`, visible: false, popupTemplate: undefined},
		{title: 'CTCUM D_10000', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}2`, visible: false, popupTemplate: undefined},
		{title: 'Agrostología SD', url: `${this.layerUrls.baseService}/${this.layerUrls.dgaaa}0`, visible: false, popupTemplate: undefined},
		{
			title: 'Escenario déficit hídrico',
			url: `${this.layerUrls.baseService}/${this.layerUrls.odngrd}0`,
			visible: false,
			popupTemplate: undefined,
		},
		{
			title: 'Elementos_Expuestos',
			url: `${this.layerUrls.baseService}/${this.layerUrls.odngrd}1`,
			visible: false,
			popupTemplate: undefined,
		},
		{title: 'Proyecto especiales', url: `${this.layerUrls.baseService}/${this.layerUrls.dgihr}4`, visible: false, popupTemplate: undefined},
		{
			title: 'Áreas bajo riego tecnificado',
			url: `${this.layerUrls.baseService}/${this.layerUrls.dgihr}3`,
			visible: false,
			popupTemplate: undefined,
		},
		{
			title: 'Proyectos emblemáticos',
			url: `${this.layerUrls.baseService}/${this.layerUrls.dgihr}2`,
			visible: false,
			popupTemplate: undefined,
		},
		{title: 'Estudios obras', url: `${this.layerUrls.baseService}/${this.layerUrls.dgihr}1`, visible: false, popupTemplate: undefined},
		{title: 'AMIR', url: `${this.layerUrls.baseService}/${this.layerUrls.dgihr}0`, visible: false, popupTemplate: undefined},
		{title: 'Cobertizos', url: `${this.layerUrls.baseService}/${this.layerUrls.dgdg}3`, visible: false, popupTemplate: undefined},
		{title: 'Pastos cultivados', url: `${this.layerUrls.baseService}/${this.layerUrls.dgdg}2`, visible: false, popupTemplate: undefined},
		{title: 'Capacitaciones', url: `${this.layerUrls.baseService}/${this.layerUrls.dgdg}1`, visible: false, popupTemplate: undefined},
		{title: 'Asistencia técnica', url: `${this.layerUrls.baseService}/${this.layerUrls.dgdg}0`, visible: false, popupTemplate: undefined},
	];
	public view: any = null;
	public lis: any[] = [];
	public searchTerm = '';
	public filteredArray: any[] = [];
	public controlCapas: any = null;

	// *footer coordenadas
	public gcsLongitude = '--';
	public gcsLatitude = '--';
	public utmZone = '--';
	public utmEast = '--';
	public utmNorth = '--';
	public scale = '--';

	constructor() {}

	initializeMap(mapViewEl: ElementRef): Promise<any> {
		const container = mapViewEl.nativeElement;
		this.layers.forEach((layerConfig) => {
			let featureLayer;
			if (layerConfig.popupTemplate == undefined) {
				featureLayer = new FeatureLayer({
					url: layerConfig.url,
					title: layerConfig.title,
					visible: layerConfig.visible,
				});
			} else {
				featureLayer = new FeatureLayer({
					url: layerConfig.url,
					title: layerConfig.title,
					popupTemplate: layerConfig.popupTemplate,
					outFields: layerConfig.outFields,
					visible: layerConfig.visible,
				});
			}

			this.mapa.add(featureLayer);
		});

		const listNode = document.getElementById('nyc_graphics');
		//console.log(listNode);
		//Declarar la vista del Mapa
		const view = new MapView({
			container: container,
			map: this.mapa,
			center: [-75.015152, -9.189967], //longitud, latitud (Centro del mapa) -12.0458293,-77.0285855
			zoom: 6,
			rotation: 0,
			constraints: {
				maxZoom: 23,
				minZoom: 5,
				snapToZoom: false,
			},
			padding: {top: 0},
			ui: {
				components: [],
			}, //Altura del mapa
		});
		// Watch for changes to the zoom level
		// Wait for the view to be ready before setting up the watch

		// Set up the watch on zoom level only after the view is ready
		view.watch('scale', (scale: any) => {
			this.scale = this.formatScale(scale);
		});
		//Estructura de arreglo para realizar busquedas
		const arregloCapasBusqueda = [
			// {
			// 	layer: new FeatureLayer({
			// 		url: this.capitalDistrito,
			// 		outFields: ['*'],
			// 	}),
			// 	searchFields: ['nombre_centropoblado'],
			// 	displayField: 'nombre_centropoblado',
			// 	exactMatch: false,
			// 	outFields: ['*'],
			// 	name: 'CENTRO POBLADO',
			// 	placeholder: 'Ejemplo: LIMA',
			// 	maxResults: 6,
			// 	maxSuggestions: 6,
			// 	suggestionsEnabled: true,
			// 	minSuggestCharacters: 0,
			// 	PopupTemplate: this.popuTemplateCapitalDistrito,
			// },
			{
				layer: new FeatureLayer({
					url: `${this.layerUrls.baseService}/${this.layerUrls.limits.distritos}`,
					outFields: ['*'],
				}),
				searchFields: ['nom_distrito'],
				displayField: 'nom_distrito',
				exactMatch: false,
				outFields: ['*'],
				name: 'NOMBRE DISTRITO',
				placeholder: 'Ejemplo: LIMA',
				maxResults: 6,
				maxSuggestions: 6,
				suggestionsEnabled: true,
				minSuggestCharacters: 0,
				//PopupTemplate: popuTemplateCapitalDistrito,
			},
		];
		const buscaCapas = new Search({
			view: view,
			sources: arregloCapasBusqueda,
			suggestionsEnabled: false,
			allPlaceholder: 'Busquedas',
		});
		const buscarCapaExpand = new Expand({
			//expandIconClass: 'esri-icon-search',
			view: view,
			expandTooltip: 'BUSQUEDAS',
			content: buscaCapas,
		});
		view.ui.add(buscarCapaExpand, {position: 'top-right', index: 2});
		//Boton de acercar y alejar (1)
		const zoom = new Zoom({
			view: view,
		});
		view.ui.add(zoom, 'top-right');
		//Boton de Inicio de mapa (2)
		const homeBtn = new Home({
			view: view,
		});
		view.ui.add(homeBtn, 'top-right');
		//Boton de Pantalla completa (3)
		const fullscreen = new Fullscreen({
			view: view,
		});
		view.ui.add(fullscreen, 'top-right');
		//Funcion de Galeria de mapas (4)
		const basemapGallery = new BasemapGallery({
			view: view,
		});
		const GaleryExpand = new Expand({
			//expandIconClass: 'esri-icon-basemap',
			view: view,
			expandTooltip: 'GALERIA DE MAPAS',
			content: basemapGallery,
		});
		view.ui.add(GaleryExpand, {position: 'top-right'});
		//Leyenda del mapa
		const leyenda = new Legend({
			view: view,
			icon: 'legend-plus',
		});
		const leyendaExpand = new Expand({
			//expandIconClass: 'esri-icon-legend',
			view: view,
			expandTooltip: 'LEYENDA',
			content: leyenda,
		});
		view.ui.add(leyendaExpand, {position: 'top-right'});
		//Funcion de impresion (5)
		const print = new Print({
			view: view,
			printServiceUrl: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
		});
		const ImpresionExpand = new Expand({
			//expandIconClass: 'esri-icon-printer',
			view: view,
			expandTooltip: 'IMPRESION',
			content: print,
		});
		view.ui.add(ImpresionExpand, {position: 'top-right'});
		//Funcion de medidas (6)
		const distanciaWidget = new DistanceMeasurement2D({
			view: view,
		});
		const distanciaExpand = new Expand({
			//expandIconClass: 'esri-icon-measure-line',
			view: view,
			expandTooltip: 'Medir distancia',
			content: distanciaWidget,
		});
		view.ui.add(distanciaExpand, {position: 'top-right'});
		const areaWidget = new AreaMeasurement2D({
			view: view,
		});
		const areaExpand = new Expand({
			//expandIconClass: 'esri-icon-measure-area',
			view: view,
			expandTooltip: 'Medir distancia',
			content: areaWidget,
		});
		view.ui.add(areaExpand, {position: 'top-right'});
		//Funcion de localizar
		const locateBtn = new Locate({
			view: view,
		});
		view.ui.add(locateBtn, {position: 'top-trailing'});
		//Funcion de escala
		const scaleBarra = new ScaleBar({
			view: view,
			unit: 'dual',
		});
		view.ui.add(scaleBarra, {position: 'bottom-left'});
		//Funcion de coordenadas
		const ccoordenadas = new CoordinateConversion({
			view: view,
		});
		const ccordenadasExpand = new Expand({
			//expandIconClass: 'esri-icon-radio-checked',
			view: view,
			expandTooltip: 'Coordenadas',
			content: ccoordenadas,
		});
		view.ui.add(ccordenadasExpand, {position: 'top-right'});

		// const toggle = new BasemapToggle({
		// 	view: view, // view that provides access to the map's 'topo-vector' basemap
		// 	nextBasemap: 'streets-navigation-vector', // allows for toggling to the 'hybrid' basemap
		// });

		// view.ui.add(toggle, 'bottom-right');

		//Control de capas
		// this.controlCapas = new LayerList({
		// 	view: view,
		// });
		// const controlCapasExpand = new Expand({
		// 	expandIconClass: 'esri-icon-layers',
		// 	view: view,
		// 	expandTooltip: 'COORDENADAS',
		// 	content: this.controlCapas,
		// });
		// view.ui.add(controlCapasExpand, 'top-right');

		view.on('pointer-move', (event: {x: any; y: any}) => {
			const point = this.view.toMap({x: event.x, y: event.y});
			this.updateCoordinates(point.latitude, point.longitude);
		});

		//Procedimiento Slider de busqueda de Centro Poblado de capital de distrito

		const featureLayer = this.mapa.layers.find((layer) => layer.title === 'Centro Urbano');
		console.log('1 =>', featureLayer);
		this.view = view;
		let graphics: any;
		this.view
			.whenLayerView(featureLayer)
			.then(
				(layerView: {
					watch: (arg0: string, arg1: (value: any) => void) => void;
					queryFeatures: (arg0: {geometry: __esri.Extent; returnGeometry: boolean; orderByFields: string[]}) => Promise<{features: any}>;
				}) => {
					layerView.watch('updating', (value) => {
						if (!value) {
							// wait for the layer view to finish updating
							// query all the features available for drawing.
							layerView
								.queryFeatures({
									geometry: view.extent,
									returnGeometry: true,
									orderByFields: ['ubigeo_distrito'],
								})
								.then((results: {features: any}) => {
									graphics = results.features;
									this.lis = results.features;
									this.filteredArray = results.features;
									this.searchTerm = '';

									const fragment = document.createDocumentFragment();
									graphics.forEach(function (result: {attributes: any}, index: string) {
										const attributes = result.attributes;
										const name = attributes.nombre_centropoblado;
										// Create a list zip codes in NY
										const li = document.createElement('li');
										li.classList.add('panel-result');
										li.tabIndex = 0;
										li.setAttribute('data-result-id', index);
										li.textContent = name;
										fragment.appendChild(li);
									});
									// Empty the current list
									console.log(results.features);
									if (listNode) {
										listNode.innerHTML = '';
										listNode.appendChild(fragment);
									}
								})
								.catch(function (error: any) {
									//console.error('query failed: ', error);
								});
						}
					});
				}
			);
		const onListClickHandler = (event: {target: any}) => {
			console.log(event.target);
			const target = event.target;
			console.log(' =>', target);
			const resultId = target.getAttribute('data-result-id');

			// get the graphic corresponding to the clicked zip code
			const result = resultId && graphics && graphics[parseInt(resultId, 10)];
			console.log(result);
			if (result) {
				// open the popup at the centroid of zip code polygon
				// and set the popup's features which will populate popup content and title.
				this.view
					.goTo(result.geometry.extent.expand(2))
					.then(function () {
						view.openPopup({
							features: [result],
							location: result.geometry.centroid,
						});
					})
					.catch(function (error: {name: string}) {
						if (error.name != 'AbortError') {
							console.error(error);
						}
					});
			}
		};
		listNode?.addEventListener('click', onListClickHandler);
		return this.view.when();
	}
	capa(): void {
		this.controlCapas = new LayerList({
			view: this.view,
		});
		const controlCapasExpand = new Expand({
			//expandIconClass: 'esri-icon-layers',
			view: this.view,
			expandTooltip: 'COORDENADAS',
			content: this.controlCapas,
		});
		this.view.ui.add(controlCapasExpand, 'top-right');
	}
	onListClickHandler2(resultId: string): void {
		// console.log('lis =>', this.view);

		// get the graphic corresponding to the clicked zip code
		const result = resultId && this.lis && this.lis[parseInt(resultId, 10)];
		console.log(result);
		if (result) {
			// open the popup at the centroid of zip code polygon
			// and set the popup's features which will populate popup content and title.
			this.view
				.goTo(result.geometry.extent.expand(2))
				.then(() => {
					this.view.openPopup({
						features: [result],
						location: result.geometry.centroid,
					});
				})
				.catch(function (error: {name: string}) {
					if (error.name != 'AbortError') {
						console.error(error);
					}
				});
		}
		// this.view.when()
	}
	toggleLayerVisibility(layerConfig: LayerConfig): void {
		layerConfig.visible = !layerConfig.visible;
		const featureLayer = this.mapa.layers.find((layer) => layer.title === layerConfig.title);
		if (featureLayer) {
			featureLayer.visible = layerConfig.visible;
		}
	}
	onSearch(): void {
		// Filtrar el array original en función del término de búsqueda
		this.filteredArray = this.lis.filter((item) =>
			item.attributes.nombre_centropoblado.toLowerCase().includes(this.searchTerm.toLowerCase())
		);
	}

	updateCoordinates(lat: number, lon: number): void {
		this.gcsLongitude = lon.toFixed(5);
		this.gcsLatitude = lat.toFixed(5);
		// Calculate UTM Zone
		const zoneNumber = Math.floor((lon + 180) / 6) + 1;
		const utmBand = this.getUtmBand(lat);
		this.utmZone = `${zoneNumber} ${utmBand}`;

		// Convert to UTM
		const pointUTM = new Point({
			latitude: lat,
			longitude: lon,
			spatialReference: SpatialReference.WGS84,
		});
		const utmWkid = lat >= 0 ? 32600 + zoneNumber : 32700 + zoneNumber; // WKID for UTM zone
		const projected = projection.project(pointUTM, new SpatialReference({wkid: utmWkid})) as Point;

		const utmPoint = projected as Point;
		this.utmEast = `${utmPoint.x.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} m`;
		this.utmNorth = `${utmPoint.y.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} m`;
		// Calculate UTM Zone
	}

	getUtmBand(latitude: number): string {
		const bands = 'CDEFGHJKLMNPQRSTUVWX'; // Bands from 80S to 84N
		const index = Math.floor((latitude + 80) / 8);
		return bands.charAt(index);
	}
	formatScale(scale: number): string {
		return scale.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
	}
}
