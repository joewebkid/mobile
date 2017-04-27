var dimgdebug = true;

if (window.location.protocol==="https:") { var tealiumHost = "https://tags.disneyinternational.com/"; }
else { var tealiumHost = "http://tags.disneyinternational.com/"; } 
var tealiumScript = "tealium/utag.js";

function debug(str)
{
	"use strict";
	if(!dimgdebug) { return false; }
	if(typeof(console)!=="undefined" && console.debug)
		{ console.debug(str); }
}

(function(){
	"use strict";
	var s = document.createElement('script');
	var anchor = document.getElementsByTagName('head')[0];
	s.type = 'text/javascript';
	s.src = tealiumHost + tealiumScript;
	anchor.appendChild(s);
})();

var CTOW = function () {};
CTOW.pageVars = {};
CTOW.globalVars = {};

CTOW.prototype.trackPage = function () {
	"use strict";
	CTOW.pageVars.event_name = "page_view";
	
	CTOW.pageVars.page_id = this.page_id;
	CTOW.pageVars.page_z_axis = this.page_z_axis;
	CTOW.pageVars.page_version = this.page_version;

	var checkCto = setInterval(function() {
		if (typeof CTO === "function" &&  typeof utag === "object") {
			debug("CTOW: CTO and Tealium has been loaded");
			var cto = new CTO();
			 
			// grabbing data from Tealium
			
			CTOW.globalVars.app_name = utag.data.cto_app_name;
			debug("CTOW: app_name: "+CTOW.globalVars.app_name);
			CTOW.globalVars.app_locale = CTOW.globalVars.app_region = utag.data.cto_app_region;
			debug("CTOW: app_region: "+CTOW.globalVars.app_region);
			CTOW.globalVars.app_country = utag.data.cto_app_country;
			debug("CTOW: app_country: "+CTOW.globalVars.app_country);
			
			if (typeof cto.set === "function") { cto.set(CTOW.globalVars); }
			
			CTOW.pageVars.page_name = utag.data.cto_page_name;
			debug("CTOW: page_name: "+CTOW.pageVars.page_name);
			CTOW.pageVars.page_id_source = utag.data.cto_page_id_source;
			debug("CTOW: page_id_source: "+CTOW.pageVars.page_id_source);
			CTOW.pageVars.page_type = utag.data.cto_page_type;
			debug("CTOW: page_type: "+CTOW.pageVars.page_type);
			
			if (typeof cto.set === "function") { cto.set(CTOW.pageVars); }
			cto.trackPage(CTOW.pageVars);
			debug("CTOW: Sending page tracking event");
			 
			clearInterval(checkCto);
		}
	}, 100); // check every 100ms
};

CTOW.prototype.trackPayment = function (paymentVars) {
	"use strict";
	var checkCto = setInterval(function() {
		if (typeof CTO === "function" &&  typeof utag === "object") {
			debug("CTOW: CTO and Tealium has been loaded");
			var cto = new CTO();
			paymentVars.event_name = "payment";
			cto.trackPayment(paymentVars);
			debug("CTOW: Sending payment tracking event");
			clearInterval(checkCto);
		}
	}, 100); // check every 100ms
};

CTOW.prototype.trackFunnel = function (funnelVars) {
	"use strict";
	var cto = new CTO();
	funnelVars.page_name = utag.data.cto_page_name;
	cto.trackFunnel(funnelVars);
	debug("CTOW: Sending funnel tracking event");
};


document.body.onclick = function(e){
	"use strict";
	var cto = new CTO();
	e = e || event;
	var target = e.target || e.srcElement;
	if (target.tagName.toLowerCase() !== "a") { target = target.parentElement; }
	if (target.dataset.link_name)
	{
		target.dataset.event_name = "link_click";
		if (target.dataset.link_page_url === undefined) { target.dataset.link_page_url = target.href; }
		target.dataset.page_name = CTOW.pageVars.page_name;	
		target.dataset.link_module_name = parentElement(target,"div") ? parentElement(target,"div").id : "undefined div id";
		target.dataset.link_module_position = parentElement(target,"div") ? parentElement(target,"div").className : "undefined class name";
		debug(target.dataset);
		debug("CTOW: Sending link tracking event");
		cto.trackLink(target.dataset);
	}
};

function parentElement(element,tagName)
{
	"use strict";
	tagName = tagName.toLowerCase();
	while (element && element.parentNode)
	{
		element = element.parentNode;
		if (element.tagName && element.tagName.toLowerCase() === tagName) {
			return element;
		}
	}
}

CTOW.prototype.trackGame = function (gameVars) {
	"use strict";
	var cto = new CTO();
	gameVars.page_name = utag.data.cto_page_name;
	if (utag.data.cto_game_name) { gameVars.game_name = utag.data.cto_game_name; }
	cto.trackGame(gameVars);
	debug("CTOW: Sending game tracking event");
};