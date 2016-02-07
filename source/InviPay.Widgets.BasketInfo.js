/**
 * inviPay.com Widgets Library
 * 
 *	@author Kuba Pilecki (kpilecki@invipay.com)
 * 	@version 1.0.1
 *
 * Copyright (c) 2016 inviPay sp. z o.o. http://invipay.com
 */

InviPay.Widgets.BasketInfo = function(params, targetElement) {

 	// Constructor
	{
 		InviPay.Widgets.BaseWidget.call(this, targetElement);

 		var messageTemplate = '@include "assets/basketInfo/layout.htm"';
 		var prolongationDays = 7;
 		var dueDateDays = 14;
 		var dateFormat = 'd-m-y';
 		
 		if (params)
 		{
 			if (params['duedate-days'])
 			{
 				dueDateDays = parseInt(params['duedate-days']);
 			}

 			if (params['format'])
 			{
 				dateFormat = params['format'];
 			}
 		}

 		var dueDate = new Date(new Date().getTime() + daysToSeconds(dueDateDays + prolongationDays));
 		var dueDateString = formatDate(dueDate, dateFormat);

 		var formattedMessage = formatString(messageTemplate, [dueDateString]);
 		setWidgetDomNode(formattedMessage);
 	}
};

InviPay.Widgets.BasketInfo.prototype = Object.create(InviPay.Widgets.BaseWidget.prototype);
InviPay.Widgets.BasketInfo.prototype.constructor = InviPay.Widgets.BasketInfo;