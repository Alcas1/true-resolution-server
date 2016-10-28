// Sources:
// High DPI Detection: http://stackoverflow.com/questions/19689715/what-is-the-best-way-to-detect-retina-support-on-a-device-using-javascript
// Browser Detection: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Cookie Functions: http://www.quirksmode.org/js/cookies.html
// Mobile Browser Detection: http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

"use strict";

// Detect Browser
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isBlink = (isChrome || isOpera) && !!window.CSS;

var mobilecheck = function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var createCookie = function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

var readCookie = function readCookie(name) {
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
	var lastCookieChange = new Date('2016-10-28T14:00:00'); // date since last change to cookie policy

	if (isFirefox) {
		var pixelRatio = window.devicePixelRatio;

		var cookieSetDate = new Date(readCookie("dateSet")); // date cookie was last stored at
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
	else if (mobilecheck()) {
		var pixelRatio = window.devicePixelRatio;
		hres = Math.round(screen.width * pixelRatio);
		vres = Math.round(screen.height * pixelRatio);
	}
	else {
		var pixelRatio = window.devicePixelRatio;

		// To account for people adjusted screen resolutions because of Windows internal zoom
		var cookieSetDate = new Date(readCookie("dateSet")); // date cookie was last stored at
		if (readCookie("initialRatio") === null || cookieSetDate < lastCookieChange) {
			createCookie("initialRatio", pixelRatio < 2 ? pixelRatio : 1); // creates a cookie to last for a year
			var date = new Date();
			createCookie("dateSet", date.toGMTString(), 365);
		}

		hres = screen.width * readCookie("initialRatio");
		vres = screen.height * readCookie("initialRatio");
	}
	
	
	createForm('/insertResolution',{'hres':hres,'vres':vres, 'pixel_density':1.0 , csrfmiddlewaretoken:document.getElementsByName("csrfmiddlewaretoken")[0].value});
	SubForm();
	
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