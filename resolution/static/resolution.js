// Sources:
// High DPI Detection: http://stackoverflow.com/questions/19689715/what-is-the-best-way-to-detect-retina-support-on-a-device-using-javascript
// Browser Detection: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Cookie Functions: http://www.quirksmode.org/js/cookies.html

"use strict";

// Detect Browser
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isBlink = (isChrome || isOpera) && !!window.CSS;

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var onresize = function onresize() {
	var hres, vres;

	if (isFirefox) {
		var pixelRatio = window.devicePixelRatio;

		var cookieSetDate = new Date(readCookie("dateSet")); // date cookie was last stored at
		var lastCookieChange = new Date('2016-10-27T23:15:00'); // date since last change to cookie policy
		if (readCookie("initialRatio") === null || cookieSetDate < lastCookieChange) {
			createCookie("initialRatio", pixelRatio >= 2 ? pixelRatio : 1, 365); // creates a cookie to last for a year
			var date = new Date();
			createCookie("dateSet", date.toGMTString(), 365);
		}
		pixelRatio /= readCookie("initialRatio");

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
	
	
	// createForm('/insertResolution',{'hres':hres,'vres':vres, 'pixel_density':1.0 , csrfmiddlewaretoken:document.getElementsByName("csrfmiddlewaretoken")[0].value});
	// SubForm();
	
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
	
function SubForm (){
    $.ajax({
	    url:'/insertResolution',
		type:'post',
		data:$('form').serialize(),
		success:function(){
		console.log("posted once");
	    }
	});
}

function createForm(path, params, method) {
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
    //form.submit();
}