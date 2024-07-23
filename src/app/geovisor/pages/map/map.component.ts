import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
//libreria de ArcGIS
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle.js';
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

interface LayerConfig {
  title: string;
  url: string;
  popupTemplate?: PopupTemplate;
  visible: boolean;
  outFields?: string[];
}
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export default class MapComponent {
  public toogle: boolean = false;
  public lis: any[] = [];
  public view: any = null;
  public mapa = new Map({ basemap: 'hybrid' });
  public controlCapas: any = null;
  public searchTerm: string = '';
  public filteredArray: any[] = [];

  //Servicios de capas base
  private servicioUrl =
    'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer';
  private limiteDepartamento = `${this.servicioUrl}/0`;
  private limprovincia = `${this.servicioUrl}/1`;
  private limdistrito = `${this.servicioUrl}/2`;

  //Servicios de capas de informacion
  private agroideas1 =
    'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGROIDEAS/MapServer/0';
  private ppa =
    'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ConPuchePeru/ppa/MapServer/0';
  private psi =
    'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/PSI/MapServer/0';
  private esan =
    'https://winlmprap24.midagri.gob.pe/arcgis_server/rest/services/ENIS/SAN/MapServer/0';
  private rutaDGAA =
    'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/';
  private dgaaa25 = `${this.rutaDGAA}25`;
  private dgaaa24 = `${this.rutaDGAA}24`;
  private dgaaa23 = `${this.rutaDGAA}23`;
  private dgaaa21 = `${this.rutaDGAA}21`;
  private dgaaa20 = `${this.rutaDGAA}20`;
  private dgaaa19 = `${this.rutaDGAA}19`;
  private dgaaa17 = `${this.rutaDGAA}17`;
  private dgaaa16 = `${this.rutaDGAA}16`;
  private dgaaa15 = `${this.rutaDGAA}15`;
  private dgaaa14 = `${this.rutaDGAA}14`;
  private dgaaa13 = `${this.rutaDGAA}13`;
  private dgaaa12 = `${this.rutaDGAA}12`;
  private dgaaa11 = `${this.rutaDGAA}11`;
  private dgaaa9 = `${this.rutaDGAA}9`;
  private dgaaa8 = `${this.rutaDGAA}8`;
  private dgaaa7 = `${this.rutaDGAA}7`;
  private dgaaa6 = `${this.rutaDGAA}6`;
  private dgaaa5 = `${this.rutaDGAA}5`;
  private dgaaa4 = `${this.rutaDGAA}4`;
  private dgaaa2 = `${this.rutaDGAA}2`;
  private dgaaa0 = `${this.rutaDGAA}0`;

  private rutaODNGRD = 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/ODNGRD/MapServer/';
  private odngrd1 = `${this.rutaODNGRD}0`;
  private odngrd2 = `${this.rutaODNGRD}1`;

  private rutaDGIHR ='https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/';
  private dgihr4 = `${this.rutaDGIHR}4`;
  private dgihr3 = `${this.rutaDGIHR}3`;
  private dgihr2 = `${this.rutaDGIHR}2`;
  private dgihr1 = `${this.rutaDGIHR}1`;
  private dgihr0 = `${this.rutaDGIHR}0`;

  private rutaDGDG = 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGDG/MapServer/';
  private dgdg3 = `${this.rutaDGDG}3`;
  private dgdg2 = `${this.rutaDGDG}2`;
  private dgdg1 = `${this.rutaDGDG}1`;
  private dgdg0 = `${this.rutaDGDG}0`;

  private rutaAGRORURAL = 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGRORURAL/MapServer/';
  private agrorural3 = `${this.rutaAGRORURAL}2`
  private agrorural2 = `${this.rutaAGRORURAL}1`
  private agrorural1 = `${this.rutaAGRORURAL}0`











  public layers: LayerConfig[] = [
    {
      title: 'Limite de departamentos',
      url: this.limiteDepartamento,
      popupTemplate: undefined,
      visible: true,
    },
    {
      title: 'Limite de provincias',
      url: this.limprovincia,
      popupTemplate: undefined,
      visible: true,
    },
    {
      title: 'Limite de distritos',
      url: this.limdistrito,
      popupTemplate: undefined,
      visible: true,
    },
    {
      title: 'Reconversión productiva',
      url: this.agroideas1,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Con Punche Perú',
      url: this.ppa,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Proyecto de Riego Tecnificado',
      url: this.psi,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Superficie Agricola Nacional',
      url: this.esan,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Suelos SD',
      url: this.dgaaa25,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Suelos R',
      url: this.dgaaa24,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Suelos D',
      url: this.dgaaa23,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'EroCl SD',
      url: this.dgaaa21,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CUAT SD',
      url: this.dgaaa20,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CUAT D',
      url: this.dgaaa19,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_50000',
      url: this.dgaaa17,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_45000',
      url: this.dgaaa16,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_2000',
      url: this.dgaaa15,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_25000',
      url: this.dgaaa14,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_20000',
      url: this.dgaaa13,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_12000',
      url: this.dgaaa12,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMSD_10000',
      url: this.dgaaa11,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMR_100000',
      url: this.dgaaa9,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMR_50000',
      url: this.dgaaa8,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMR_35000',
      url: this.dgaaa7,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMR_30000',
      url: this.dgaaa6,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMR_25000',
      url: this.dgaaa5,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUMR_20000',
      url: this.dgaaa4,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'CTCUM D_10000',
      url: this.dgaaa2,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Agrostología SD',
      url: this.dgaaa0,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Escenario déficit hídrico',
      url: this.odngrd1,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Elementos_Expuestos',
      url: this.odngrd2,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Proyecto especiales',
      url: this.dgihr4,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Áreas bajo riego tecnificado',
      url: this.dgihr3,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Proyectos emblemáticos',
      url: this.dgihr2,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Estudios obras',
      url: this.dgihr1,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'AMIR',
      url: this.dgihr0,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Cobertizos',
      url: this.dgdg3,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Pastos cultivados',
      url: this.dgdg2,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Capacitaciones',
      url: this.dgdg1,
      popupTemplate: undefined,
      visible: false,
    },
    {
      title: 'Asistencia técnica',
      url: this.dgdg0,
      popupTemplate: undefined,
      visible: false,
    },




  ];





























  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
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
        snapToZoom: false,
      },
      padding: { top: 0 },
      ui: {
        components: [],
      }, //Altura del mapa
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
          url: this.limdistrito,
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
    view.ui.add(buscarCapaExpand, { position: 'top-right', index: 2 });
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
    view.ui.add(GaleryExpand, { position: 'top-right' });
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
    view.ui.add(leyendaExpand, { position: 'top-right' });
    //Funcion de impresion (5)
    const print = new Print({
      view: view,
      printServiceUrl:
        'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
    });
    const ImpresionExpand = new Expand({
      //expandIconClass: 'esri-icon-printer',
      view: view,
      expandTooltip: 'IMPRESION',
      content: print,
    });
    view.ui.add(ImpresionExpand, { position: 'top-right' });
    //Funcion de medidas (6)
    const distanciaWidget = new DistanceMeasurement2D({
      view: view,
    });
    const distanciaExpand = new Expand({
      //expandIconClass: 'esri-icon-measure-line',
      view: view,
      expandTooltip: 'MEDIR DISTANCIA',
      content: distanciaWidget,
    });
    view.ui.add(distanciaExpand, { position: 'top-right' });
    const areaWidget = new AreaMeasurement2D({
      view: view,
    });
    const areaExpand = new Expand({
      //expandIconClass: 'esri-icon-measure-area',
      view: view,
      expandTooltip: 'MEDIR DISTANCIA',
      content: areaWidget,
    });
    view.ui.add(areaExpand, { position: 'top-right' });
    //Funcion de localizar
    const locateBtn = new Locate({
      view: view,
    });
    view.ui.add(locateBtn, { position: 'top-trailing' });
    //Funcion de escala
    const scaleBarra = new ScaleBar({
      view: view,
      unit: 'dual',
    });
    view.ui.add(scaleBarra, { position: 'bottom-left' });
    //Funcion de coordenadas
    const ccoordenadas = new CoordinateConversion({
      view: view,
    });
    const ccordenadasExpand = new Expand({
      //expandIconClass: 'esri-icon-radio-checked',
      view: view,
      expandTooltip: 'COORDENADAS',
      content: ccoordenadas,
    });



    view.ui.add(ccordenadasExpand, { position: 'top-right' });
    const toggle = new BasemapToggle({
      view: view, // view that provides access to the map's 'topo-vector' basemap
      nextBasemap: 'streets-navigation-vector', // allows for toggling to the 'hybrid' basemap
    });
    view.ui.add(toggle, 'bottom-right');
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

    //Procedimiento Slider de busqueda de Centro Poblado de capital de distrito
    const featureLayer = this.mapa.layers.find(
      (layer) => layer.title === 'Centro Urbano'
    );
    //console.log('1 =>', featureLayer);
    this.view = view;
    let graphics: any;
    this.view
      .whenLayerView(featureLayer)
      .then(
        (layerView: {
          watch: (arg0: string, arg1: (value: any) => void) => void;
          queryFeatures: (arg0: {
            geometry: __esri.Extent;
            returnGeometry: boolean;
            orderByFields: string[];
          }) => Promise<{ features: any }>;
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
                .then((results: { features: any }) => {
                  graphics = results.features;
                  this.lis = results.features;
                  this.filteredArray = results.features;
                  this.searchTerm = '';

                  const fragment = document.createDocumentFragment();
                  graphics.forEach(function (
                    result: { attributes: any },
                    index: string
                  ) {
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
    const onListClickHandler = (event: { target: any }) => {
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
          .catch(function (error: { name: string }) {
            if (error.name != 'AbortError') {
              console.error(error);
            }
          });
      }
    };
    listNode?.addEventListener('click', onListClickHandler);
    return this.view.when();
  }
  ngOnInit(): any {
    this.initializeMap().then(() => {});
  }
  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }
  capa() {
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
  onListClickHandler2(resultId: string) {
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
        .catch(function (error: { name: string }) {
          if (error.name != 'AbortError') {
            console.error(error);
          }
        });
    }
    // this.view.when()
  }
  toggleLayerVisibility(layerConfig: LayerConfig): void {
    layerConfig.visible = !layerConfig.visible;
    const featureLayer = this.mapa.layers.find(
      (layer) => layer.title === layerConfig.title
    );
    if (featureLayer) {
      featureLayer.visible = layerConfig.visible;
    }
  }
  onSearch() {
    // Filtrar el array original en función del término de búsqueda
    this.filteredArray = this.lis.filter((item) =>
      item.attributes.nombre_centropoblado
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }
}
