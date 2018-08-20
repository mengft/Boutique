import * as Metrics from './Metrics';

function FontSize(uiElementPx) {
	const length = uiElementPx * Metrics.screenWidth / Metrics.uiWidthPx * 1.07;
	return Math.ceil(length);
}

export default FontSize;
