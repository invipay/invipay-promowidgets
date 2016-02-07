/**
 * inviPay.com Widgets Library
 * 
 *	@author Kuba Pilecki (kpilecki@invipay.com)
 * 	@version 1.0.1
 *
 * Copyright (c) 2016 inviPay sp. z o.o. http://invipay.com
 */

InviPay.Widgets.FloatingPanel = function(params, targetElement) {

 	// Constructor
	{
 		InviPay.Widgets.BaseWidget.call(this, targetElement);
 		includeStyle('@include "assets/floatingPanel/styles.css"'); // Warning: Compilation-time import

 		var prolongationDays = 7;
 		var dueDateDays = 14;
 		var minimumValue = '200.00';

 		if (params)
 		{
 			if (params['duedate-days'])
 			{
 				dueDateDays = parseInt(params['duedate-days']);
 			}

 			if (params['minimum-value'])
 			{
 				minimumValue = parseInt(params['minimum-value']);
 			}
 		}

 		var html = '@include "assets/floatingPanel/layout.htm"'; // Warning: Compilation-time import
 		html = replaceAll(html, '@DAYS', dueDateDays + prolongationDays);
 		html = replaceAll(html, '@MINIMUM_VALUE', minimumValue);

 		setWidgetDomNode(html);

 		if (params)
 		{
 			if (params['position'] && params['position'] === 'left')
 			{
 				getWidgetDomNode().className += "  invipay-w-fp-left";
 			}

 			if (params['style'] && params['style'] !== 'auto')
 			{
 				getWidgetDomNode().style.cssText = params['style'];
 			}
 		}
 	}
};

InviPay.Widgets.FloatingPanel.prototype = Object.create(InviPay.Widgets.BaseWidget.prototype);
InviPay.Widgets.FloatingPanel.prototype.constructor = InviPay.Widgets.FloatingPanel;