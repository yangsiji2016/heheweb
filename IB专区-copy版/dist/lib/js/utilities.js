/****************************************************************************************************************
 * Description: Useful functions                                                                                *
 *		-- Version: 2.1                                                                                         *
 *      -- Date: 12.09.2016                                                                                     *
 *      -- Author: Kusti Stewe Suursoho																				*
 ****************************************************************************************************************/

navigator.version_info =
(
	function()
	{
		var na = navigator.appName;
		var ua = navigator.userAgent;
		var out;
		var temp;
		
		out = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		temp = ua.match(/version\/([\.\d]+)/i);
		if (out && temp) 
			out[2] = temp[1];
		out = out ? [out[1], out[2]] : [na, navigator.appVersion, '-?'];
		return(out);
	}
) ();

function doError(sender, msg)
{
	var out = "Error!\n\n";
	
	out = out + "Sender: "
	out = (sender != "") ? out + sender : out + "unknown";
	out = out + "\n"
	out = (msg != "") ? out + "Message: " + msg : out + "No message";
	alert(out);
};

function doEval(Str)
{
	if (window.execScript)
		window.execScript(Str);
	else
		window.eval(Str);
	return(null);
};

function doRound(Num, Dec) 
{
	var out;

	out = Math.round(Num * Math.pow(10, Dec)) / Math.pow(10, Dec);
	return(out);
};

function getFileExtension(filename)
{
	var sp;
	var out = "";
	
	sp = filename.lastIndexOf(".");
	if (sp != -1)
		out = filename.substring(sp);
	if (out.length == 1)
		out = "";
	return out;
};

/****************************************************************************************************************
 * Functions to manipulate JS/CSS files in HTML                                                                 *
 ****************************************************************************************************************/
function addExtFile(filename)
{
	var fileref;

	fileref = createExtFile(filename);
	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
};

function createExtFile(filename)
{
	var fileext;
	var fileref;

	fileext = getFileExtension(filename);
	if (fileext == ".js")
	{
		fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", filename);
	}
	else if (fileext == ".css")
	{
		fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	return(fileref);
};

function removeExtFile(filename)
{
	var fileext;
	var targetelement;
	var targetattr;
	var allsuspects;
	var i;
	
	fileext = getFileExtension(filename);
	targetelement = (fileext == ".js") ? "script" : (fileext == ".css") ? "link" : "none";
	targetattr = (fileext == ".js") ? "src" : (fileext == ".css") ? "href" : "none";
	allsuspects = document.getElementsByTagName(targetelement);
	for (i = allsuspects.length; i >= 0; i--)
		if ((allsuspects[i]) && (allsuspects[i].getAttribute(targetattr) != null) && (allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1))
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
};

function replaceExtFile(oldfilename, newfilename)
{
	var fileext;
	var targetelement;
	var targetattr;
	var allsuspects;
	var newelement;
	var i;
	
	fileext = getFileExtension(oldfilename);
	targetelement = (fileext == ".js") ? "script" : (fileext == ".css") ? "link" : "none";
	targetattr = (fileext == ".js") ? "src" : (fileext == ".css") ? "href" : "none";
	allsuspects = document.getElementsByTagName(targetelement);
	for (i = allsuspects.length; i >= 0; i--)
	{
		if ((allsuspects[i]) && (allsuspects[i].getAttribute(targetattr) != null) && (allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) != -1))
		{
			newelement = createExtFile(newfilename);
			allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
		}
	}
};

/****************************************************************************************************************
 * Functions to manipulate URLs                                                                                 *
 ****************************************************************************************************************/
function URL_Encode(Str)
{
	var SAFECHARS = "0123456789" +
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";
	var HEX = "0123456789ABCDEF";
	var plaintext = Str;
	var charCode;
	var out = "";
	var ch;
	var i;
	
	for (i = 0; i < plaintext.length; i++ ) 
	{
		ch = plaintext.charAt(i);
	    if (ch == " ") 
			out += "+";
		else if (SAFECHARS.indexOf(ch) != -1)
		    out += ch;
		else
		{
		    charCode = ch.charCodeAt(0);
			if (charCode > 255)
				out += "+";
			else 
			{
				out += "%";
				out += HEX.charAt((charCode >> 4) & 0xF);
				out += HEX.charAt(charCode & 0xF);
			}
		}
	}
	return(out);
};

function URL_Decode(Str)
{
	var HEXCHARS = "0123456789ABCDEFabcdef";
	var encoded = Str;
	var out = "";
	var ch;
	var i = 0;
	
	while (i < encoded.length)
	{
	   ch = encoded.charAt(i);
	   if (ch == "+") 
	   {
		   out += " ";
		   i++;
	   } 
	   else if (ch == "%") 
	   {
			if ((i < (encoded.length - 2)) && 
				(HEXCHARS.indexOf(encoded.charAt(i + 1)) != -1) && 
				(HEXCHARS.indexOf(encoded.charAt(i + 2)) != -1)) 
			{
				out += unescape(encoded.substr(i, 3));
				i += 3;
			}
			else 
			{
				out += "%[ERROR]";
				i++;
			}
		} 
		else 
		{
		   out += ch;
		   i++;
		}
	}
	return(out);
};

function Encode_UTF_8(Str) 
{
	return unescape(encodeURIComponent(Str));
};
  
function Decode_UTF_8(Str) 
{
	return decodeURIComponent(escape(Str));
};

function editURLParam(paramURL, paramName, paramValue)
{
	var url = "";
	if (paramURL == "")
		url = window.location.href;
	else
		url = paramURL;
    if (url.search(new RegExp( '\\b' + paramName + '=\\b')) >= 0)
    {
        var prefix = url.substring(0, url.search(new RegExp( '\\b' + paramName + '\\b')));
        var suffix = url.substring(url.search(new RegExp( '\\b' + paramName + '\\b'))).substring(url.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
	{
		var hashtag = url.indexOf("#");
		if(hashtag < 0){
			url += ((url.indexOf("?") < 0) ? "?" : "&") + paramName + "=" + paramValue;
		}else{
			var prefix = url.substring(0, hashtag);
			var suffix = url.substring(hashtag);
			url = prefix + ((url.indexOf("?") < 0) ? "?" : "&") + paramName + "=" + paramValue + suffix;
		}
	}
	return(url);
};

function setURLParam(paramName, paramValue)
{
	var url = "";
    url = editURLParam(url, paramName, paramValue);
    window.location.href = url;
};

function setURL2Params(paramName1, paramValue1, paramName2, paramValue2)
{
	var url = "";
    url = editURLParam(url, paramName1, paramValue1);
	url = editURLParam(url, paramName2, paramValue2);
    window.location.href = url;
};


/****************************************************************************************************************
 * Functions to get formated date and time                                                                      *
 ****************************************************************************************************************/
function addLeadingZero(str, postchar)
{
	var out;
	
	out = str + postchar;
	if (out.length != 3)
		out = "0" + out;
	return(out);
};

function getTimeString()
{
	var d;
	var out;

	d = new Date();
	out = addLeadingZero(d.getHours(), ":") +
			addLeadingZero(d.getMinutes(), ":") +
			addLeadingZero(d.getSeconds(), " ");
	return(out);
};

function getDateString()
{
	var month_names = new Array
	(
		"January", "February", "March", 
		"April", "May", "June", 
		"July", "August", "September", 
		"October", "November", "December"
	);
	var d;
	var out;

	d = new Date();
	out = addLeadingZero(d.getDate(), ".") +
			addLeadingZero((d.getMonth() + 1), ".") +
			d.getFullYear();
	return(out);
};

Number.prototype.formatMoney = function(c, d, t)
{
	var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};