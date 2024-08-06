import PopupTemplate from '@arcgis/core/PopupTemplate';

export interface LayerConfig {
	title: string;
	url: string;
	popupTemplate?: PopupTemplate;
	labelingInfo?: any;
	visible: boolean;
	outFields?: string[];
	renderer?: any;
	maxScale?: number;
	minScale?: number;

	group: string; //* Agrupación de capas
}
