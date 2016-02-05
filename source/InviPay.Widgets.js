/**
 * inviPay.com Widgets Library v1.0.0
 * (c) 2016 inviPay sp. z o.o. http://invipay.com
 */

// Namespace
var InviPay = InviPay || {};
InviPay.Widgets = {

};

// Base widget class

InviPay.Widgets.BaseWidget = function(targetElement) {

	var BASE_URL = '';
	var widgetContainer = document.body;
	var widgetDomNode = null;
	var widgetDomNodeDefaultStyle = 'inline';
	var self = this;

	// Private methods

	includeStyle = function(styleString) {
		var str = '<style type="text/css">' + styleString + '</style>';
		document.head.appendChild(stringToDom(str));
	};

	relativePathToUrl = function(relativePath) {
		return BASE_URL + relativePath;
	};

	stringToDom = function(htmlString) {
		var output = document.createElement('div');
		output.innerHTML = htmlString;
		return output.firstChild;
	};

	setWidgetDomNode = function(dom, targetNode) {
		
		if (dom !== null) {
			self.destroy();
			widgetDomNode = (typeof dom === 'string' || dom instanceof String) ? stringToDom(dom) : dom;
			widgetContainer.appendChild(widgetDomNode);
			myDomDefaultDisplayStyle = widgetDomNode.style.display;
		}
	};

	getWidgetDomNode = function() {
		return widgetDomNode;
	};

	setWidgetContainer = function(container) {
		widgetContainer = container;
	};

	getWidgetContainer = function() {
		return widgetContainer;
	};

	getWidgetDomNodeDefaultStyle = function() {
		return widgetDomNodeDefaultStyle;
	};

 	formatDate = function(date, format)
 	{
 		var d = date.getDate();
 		var m = date.getMonth() + 1;
 		var y = date.getFullYear();

 		format = replaceAll(format, 'D', d);
 		format = replaceAll(format, 'd', padString(d, '00'));
 		format = replaceAll(format, 'M', m);
 		format = replaceAll(format, 'm', padString(m, '00'));
 		format = replaceAll(format, 'Y', y);
 		format = replaceAll(format, 'y', y);

 		return format;
 	}

 	formatString = function(format, objects)
 	{
 		for (var i=0; i<objects.length; i++)
 		{
 			format = replaceAll(format, '{' + i + '}', objects[i]);
 		}

 		return format;
 	}

 	replaceAll = function(input, from, to)
 	{
 		from = from.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
 		var rx = new RegExp(from, 'g');
 		return input.replace(rx, to);
 	}

 	padString = function(str, pad)
 	{
 		str = str + '';
 		return pad.substring(0, pad.length - str.length) + str
 	}

 	daysToSeconds = function(days)
 	{
 		return days * 24 * 60 * 60 * 1000;
 	}


	// Constructor
	{
 		if (targetElement)
 		{
 			setWidgetContainer(targetElement);
 		}
	}
};

InviPay.Widgets.BaseWidget.prototype.destroy = function() {
	if (getWidgetDomNode() !== null)
	{
		getWidgetContainer().removeChild(getWidgetDomNode());
		setWidgetDomNode(null);
	}
};

InviPay.Widgets.BaseWidget.prototype.show = function() {
	if (getWidgetDomNode() !== null) {
		getWidgetDomNode().style.display = getWidgetDomNodeDefaultStyle();
	}
};

InviPay.Widgets.BaseWidget.prototype.hide = function() {
	if (getWidgetDomNode() !== null) {
		getWidgetDomNode().style.display = 'none';
	}
};

InviPay.Widgets.initializeAllWidgets = function(container) {
	var elements = container.querySelectorAll('*[data-invipay-widget]');
	for (var i = 0; i < elements.length; i++)	{
	    InviPay.Widgets.initializeWidget(elements[i]);
	}
};

InviPay.Widgets.initializeWidget = function(widgetElement) {

	var widgetName = widgetElement.getAttribute('data-invipay-widget');
	widgetName = widgetName.charAt(0).toUpperCase() + widgetName.slice(1);

	var attributes = widgetElement.attributes;
	var params = {};

	var prefix = 'data-';	
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];
		var name = attribute.name;
		var value = attribute.value;

		if (name.slice(0, prefix.length) == prefix)
		{
			var shortName = name.slice(prefix.length);
			params[shortName] = value;
		}
	}

	var widget = new InviPay.Widgets[widgetName](params, widgetElement);
	return widget;
};

(function(window, document) {
	window.addEventListener("load", function(){
		InviPay.Widgets.initializeAllWidgets(document.body);
	});
})(window, document);