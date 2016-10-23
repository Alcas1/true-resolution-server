// Sources:
// High DPI Detection: http://stackoverflow.com/questions/19689715/what-is-the-best-way-to-detect-retina-support-on-a-device-using-javascript
// Browser Detection: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

"use strict";

// Detect Browser
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isBlink = (isChrome || isOpera) && !!window.CSS;

var onresize = function onresize() {
	var hres, vres;

	if (isFirefox) {
		var pixelRatio = window.devicePixelRatio;
		/* var highdpi = window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches);

		if (highdpi) {
			pixelRatio /= 2;
		} */

		hres = Math.round(screen.width * pixelRatio);
		vres = Math.round(screen.height * pixelRatio);
	}
	else if (isIE || isEdge) {
		var xzoom = screen.deviceXDPI / screen.logicalXDPI;
		var yzoom = screen.deviceYDPI / screen.logicalYDPI;
		hres = Math.round(screen.width * xzoom);
		vres = Math.round(screen.height * yzoom);
		// Sometimes rounding error would cause it to be 1 pixel off
		if (hres % 10 == 1 || hres % 10 == 9) {
			hres = Math.round(hres / 10) * 10;
		}
		if (vres % 10 == 1 || vres % 10 == 9) {
			vres = Math.round(vres / 10) * 10;
		}
	}
	else {
		hres = screen.width;
		vres = screen.height;
	}
	
	post('/insertResolution',{'hres':hres,'vres':vres, 'pixel_density':1.0 , csrfmiddlewaretoken:document.getElementsByName("csrfmiddlewaretoken")[0].value});
	console.log("posted");
	document.getElementById("center").innerHTML = hres + " x " + vres;
	if (isIE) {
		document.getElementById("center").innerHTML += "\nClick to refresh";
	}
}

onload = function() {
	if (isIE) {
		document.getElementById("center").onclick = onresize;
	}
	else {
		window.onresize = onresize;
	}
	onresize();
};



function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.


    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
	    //	    form.setAttribute("target", "/");
            form.appendChild(hiddenField);
	}
    }

    document.body.appendChild(form);
    form.submit();
}