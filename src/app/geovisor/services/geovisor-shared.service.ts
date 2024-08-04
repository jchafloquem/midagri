import {ElementRef, Injectable} from '@angular/core';
//Libreria de ArcGIS 4.30

import * as projection from '@arcgis/core/geometry/projection';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import Extent from '@arcgis/core/geometry/Extent.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LabelClass from '@arcgis/core/layers/support/LabelClass.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import Locate from '@arcgis/core/widgets/Locate.js';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import Point from '@arcgis/core/geometry/Point';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import Print from '@arcgis/core/widgets/Print.js';
import PrintTemplate from '@arcgis/core/rest/support/PrintTemplate.js';
import Search from '@arcgis/core/widgets/Search.js';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import Zoom from '@arcgis/core/widgets/Zoom.js';

interface LayerConfig {
	title: string;
	url: string;
	popupTemplate?: PopupTemplate;
	labelingInfo?: any;
	visible: boolean;
	outFields?: string[];
	renderer?: any;
	maxScale?: number;
	minScale?: number;
}
//Personalizacion de la capa Departamentos
const fillSymbolDepartamento = new SimpleFillSymbol({
	color: [255, 255, 255, 0], // Color rojo con 50% de opacidad
	outline: {
		color: [0, 0, 0],
		width: 2,
	},
});
const rendererDepartamento = new SimpleRenderer({
	symbol: fillSymbolDepartamento,
});
const popuTemplateDepartamento = new PopupTemplate({
	title: '{NOMBDEP}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{
					fieldName: 'CODDEP',
					label: 'Codigo',
					visible: true,
				},
			],
		},
	],
});

const labelClassDepartamento = new LabelClass({
	labelExpressionInfo: {expression: '$feature.NOMBDEP'},
	symbol: {
		type: 'text',
		color: 'black',
		haloColor: 'white',
		haloSize: '1px',
		font: {
			size: 10,
			family: 'sans-serif',
			weight: 'bold',
		},
	},
	labelPlacement: 'always-horizontal', // Opciones incluyen "center", "above-center", "below-center", etc.
	minScale: 0,
	maxScale: 0,
});

//Personalizacion de la capa Provincia
const fillSymbolProvincia = new SimpleFillSymbol({
	color: [0, 0, 0, 0], // Color rojo con 50% de opacidad
	outline: {
		color: [0, 255, 0],
		width: 2,
	},
});
const rendererProvincia = new SimpleRenderer({
	symbol: fillSymbolProvincia,
});
const popuTemplateProvincia = new PopupTemplate({
	title: '{NOMBPROV}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{
					fieldName: 'CODPROV',
					label: 'Codigo',
					visible: true,
				},
			],
		},
	],
});
const labelClassProvincia = new LabelClass({
	labelExpressionInfo: {expression: '$feature.NOMBPROV'},
	symbol: {
		type: 'text',
		color: [0, 255, 0],
		haloColor: 'black',
		haloSize: '1px',
		font: {
			size: 10,
			family: 'sans-serif',
			weight: 'bold',
		},
	},
	labelPlacement: 'always-horizontal', // Opciones incluyen "center", "above-center", "below-center", etc.
	minScale: 0,
	maxScale: 0,
});

//Personalizacion de la capa Distrito
const markerSymbol = new SimpleMarkerSymbol({
	color: 'red',
	size: '8px', // Tamaño del punto
	outline: {
		color: 'black',
		width: 1,
	},
});
const renderermarkerSymbol = new SimpleRenderer({
	symbol: markerSymbol,
});
const fillSymbolDistrito = new SimpleFillSymbol({
	color: [0, 0, 0, 0], // Color rojo con 50% de opacidad
	outline: {
		color: [255, 0, 0],
		width: 2,
	},
});

const rendererDistrito = new SimpleRenderer({
	symbol: fillSymbolDistrito,
});

const popuTemplateDistrito = new PopupTemplate({
	title: '{NOMBDIST}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{
					fieldName: 'CODDIST',
					label: 'Codigo',
					visible: true,
				},
			],
		},
	],
});

const labelClassDistrito = new LabelClass({
	labelExpressionInfo: {expression: '$feature.NOMBDIST'},
	symbol: {
		type: 'text',
		color: 'red',
		haloColor: 'white',
		haloSize: '1px',
		font: {
			size: 10,
			family: 'sans-serif',
			weight: 'bold',
		},
	},
	labelPlacement: 'always-horizontal',
	minScale: 0,
	maxScale: 0,
});

const popuTemplateConPunchePeru = new PopupTemplate({
	title: '{IDE_ACTIV_PARCELA}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{
					fieldName: 'OBJECTID',
					label: 'Codigo ID',
					visible: true,
				},
				{
					fieldName: 'IDE_ACTIV_PARCELA',
					label: 'IDE_ACTIV_PARCELA',
					visible: true,
				},
			],
		},
	],
});
const popuTemplateCobertizos = new PopupTemplate({
	title: 'Cobertizos',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{fieldName: 'UIF', label: 'UIF', visible: true},
				{fieldName: 'TXT_CENTRO_POBLADO', label: 'TXT_CENTRO_POBLADO', visible: true},
				{fieldName: 'TXT_CUENCA', label: 'TXT_CUENCA', visible: true},
				{fieldName: 'TXT_MICRO_CUENCA', label: 'TXT_MICRO_CUENCA', visible: true},
				{fieldName: 'FEC_AÑO_FISCAL', label: 'FEC_AÑO_FISCAL', visible: true},
				{fieldName: 'NUM_MONTO', label: 'NUM_MONTO', visible: true},
				{fieldName: 'NUM_LATITUD', label: 'NUM_LATITUD', visible: true},
				{fieldName: 'NUM_LONGITUD', label: 'NUM_LONGITUD'},
				{fieldName: 'NUM_SUMOVHEMBRAS', label: 'NUM_SUMOVHEMBRAS', visible: true},
				{fieldName: 'NUM_SUMOVMACHOS', label: 'NUM_SUMOVMACHOS', visible: true},
				{fieldName: 'NUM_SUMOVTOTAL', label: 'NUM_SUMOVTOTAL', visible: true},
				{fieldName: 'NUM_SUMOVMUERTOS', label: 'NUM_SUMOVMUERTOS', visible: true},
				{fieldName: 'NUM_SUMALPHEMBRAS', label: 'NUM_SUMALPHEMBRAS', visible: true},
				{fieldName: 'NUM_SUMALPMACHOS', label: 'NUM_SUMALPMACHOS', visible: true},
				{fieldName: 'NUM_SUMALPTOTAL', label: 'NUM_SUMALPTOTAL', visible: true},
				{fieldName: 'NUM_SUMALPMUERTOS', label: 'NUM_SUMALPMUERTOS', visible: true},
				{fieldName: 'ESRI_OID', label: 'ESRI_OID', visible: true},
			],
		},
	],
});

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
			labelingInfo: [labelClassDepartamento],
			popupTemplate: popuTemplateDepartamento,
			renderer: rendererDepartamento,
			visible: true,
		},
		{
			title: 'Limite de provincias',
			url: `${this.layerUrls.baseService}/${this.layerUrls.limits.provincias}`,
			labelingInfo: [labelClassProvincia],
			popupTemplate: popuTemplateProvincia,
			renderer: rendererProvincia,
			visible: true,
		},
		{
			title: 'Limite de distritos',
			url: `${this.layerUrls.baseService}/${this.layerUrls.limits.distritos}`,
			labelingInfo: [labelClassDistrito],
			popupTemplate: popuTemplateDistrito,
			renderer: rendererDistrito,
			visible: true,
		},
		//*Servicios de capas de informacion
		{
			title: 'Reconversión productiva',
			url: `${this.layerUrls.baseService}/${this.layerUrls.agroideas}`,
			visible: false,
			popupTemplate: undefined,
		},
		{
			title: 'Con Punche Perú',
			url: `${this.layerUrls.ppa}`,
			visible: false,
			popupTemplate: popuTemplateConPunchePeru,
			renderer: renderermarkerSymbol,
		},
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
		{
			title: 'Cobertizos',
			url: `${this.layerUrls.baseService}/${this.layerUrls.dgdg}3`,
			visible: false,
			popupTemplate: undefined,
		},
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
					outFields: layerConfig.outFields,
				});
			} else if (layerConfig.popupTemplate && layerConfig.renderer == undefined) {
				featureLayer = new FeatureLayer({
					url: layerConfig.url,
					title: layerConfig.title,
					popupTemplate: layerConfig.popupTemplate,
					visible: layerConfig.visible,
				});
			} else if (layerConfig.popupTemplate && layerConfig.renderer && layerConfig.labelingInfo == undefined) {
				featureLayer = new FeatureLayer({
					url: layerConfig.url,
					title: layerConfig.title,
					popupTemplate: layerConfig.popupTemplate,
					renderer: layerConfig.renderer,
					visible: layerConfig.visible,
				});
			} else {
				featureLayer = new FeatureLayer({
					url: layerConfig.url,
					title: layerConfig.title,
					popupTemplate: layerConfig.popupTemplate,
					labelingInfo: layerConfig.labelingInfo,
					outFields: layerConfig.outFields,
					visible: layerConfig.visible,
					renderer: layerConfig.renderer,
					maxScale: layerConfig.maxScale,
					minScale: layerConfig.minScale,
				});
			}

			this.mapa.add(featureLayer);
		});

		const listNode = document.getElementById('nyc_graphics');

		const view = new MapView({
			container: container,

			map: this.mapa,
			center: [-75.015152, -10.189967],
			zoom: 5.95,
			rotation: 0,
			constraints: {
				maxZoom: 23,
				minZoom: 5,
				snapToZoom: false,
			},
			padding: {top: 0},
			ui: {
				components: [],
			},
		});

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
			},
		];
		//Controles del mapa
		//Boton de acercar y alejar
		const zoom = new Zoom({view: view});
		view.ui.add(zoom, {position: 'top-right', index: 0});
		//Boton de Inicio de mapa
		const homeBtn = new Home({view: view, icon: 'globe'});
		view.ui.add(homeBtn, {position: 'top-right', index: 1});
		//Funcion de Galeria de mapas
		const basemapGallery = new BasemapGallery({view: view, icon: 'collection'});
		const GaleryExpand = new Expand({view: view, expandTooltip: 'GALERIA DE MAPAS', content: basemapGallery});
		view.ui.add(GaleryExpand, {position: 'top-right', index: 2});
		//Funcion de impresion
		const print = new Print({
			view: view,
			printServiceUrl: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
		});
		const ImpresionExpand = new Expand({view: view, expandTooltip: 'IMPRESION', content: print});
		view.ui.add(ImpresionExpand, {position: 'top-right', index: 3});
		//Funcion de medidas
		const distanciaWidget = new DistanceMeasurement2D({view: view, unit: 'meters', icon: 'measure'});
		const distanciaExpand = new Expand({view: view, expandTooltip: 'MEDIR', content: distanciaWidget});
		view.ui.add(distanciaExpand, {position: 'top-right', index: 4});
		//Funcion de coordenadas
		const ccoordenadas = new CoordinateConversion({
			view: view,
		});
		view.on('pointer-move', (event: {x: any; y: any}) => {
			const point = this.view.toMap({x: event.x, y: event.y});
			this.updateCoordinates(point.latitude, point.longitude);
		});

		this.view = view;
		let graphics: any;

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
	}
	toggleLayerVisibility(title: string, p0: boolean, layerConfig: LayerConfig): void {
		layerConfig.visible = !layerConfig.visible;
		const featureLayer = this.mapa.layers.find((layer) => layer.title === layerConfig.title);
		if (featureLayer) {
			featureLayer.visible = layerConfig.visible;
		}
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

	toggleLayerVisibility2(layerTitle: string, visibility: boolean): void {
		const layer = this.mapa.layers.find((layer: any) => layer.title === layerTitle);
		if (layer) {
			layer.visible = visibility;
		}
	}

	getLayerVisibility(layerTitle: string): boolean {
		const layer = this.mapa.layers.find((layer: any) => layer.title === layerTitle);
		return layer ? layer.visible : false;
	}
}
