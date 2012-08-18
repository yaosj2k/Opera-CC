// ==UserScript== 
// @name OperaFlag
// @author PH  
// @namespace http://my.opera.com/PH`/about/
// @version 0.21
// @description : Shows a flag indicating the current website's server location. With details. Using IPInfoDB (http://ipinfodb.com) API, and some of its functions.
// @ujs:category browser: enhancements 
// @ujs:published 2009-11-07 10:00
// @ujs:modified 2010-03-06 18:00
// @ujs:documentation N/A
// @ujs:download 
// add excluded sites here (if the script causes problems on those sites) 
// @exclude http://*.example.com/*
// ==/UserScript== 

 /* 
 * Copyright � 2009-2010 by PH
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License.
 * 
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 */

/*
	CHANGELOG:
		0.23 (2012-02-11):
			+ New language : Simplified Chinese ; Put container at the top-left

		0.22 (2010-12-03):
			+ New IPInfoDB API

		0.21 (2010-03-06):
			+ New language : Bulgarian (thanks vladimirg ; http://my.opera.com/vladimirg/about/)

		0.2 (2009-11-19):
			+ More comments
			+ New languages : english, italian, spanish, german
			+ Track IP address
			* Clean code
			* Correct link to whois. It now returns domain name, and not host
			* All styles in <style></style>
			* Reduce expiration to 90 days
*/

(function(){
    if(document.location.href.match(/(jpe?g|png|gif|svg)/i)) {
        return false;
    }
	document.addEventListener("DOMContentLoaded", checkCookie, false);
	// URL of the API
	var API_key = "b8056e185a4e6ef87563b10f1c83148f2c0fa4d881447d5b9f87c4fe6d3ab648";
	var API_Url = "http://api.ipinfodb.com/v2/ip_query.php?key=" + API_key + "&output=json&callback=operaflag_callback&ip=";
	// Name of the cookie to set/get
	var CookieName = "geolocalisation";
	// Number of  days before the cookie expires
	var CookieExpire = 90;
	// Default language
	var DefaultLanguage = "en";
	// Object containing translations
	var o_Lang = new Object();

	/**
	*
	* Callback function
	*
	* @name operaflag_callback
	* @param geoDict: Json object containing information about the website
	*/
	function operaflag_callback(geoDict)
	{
		var s_Details = '{"Locations" : [ { "Ip" : "' + geoDict.Ip + '", "CountryName" : "' + geoDict.CountryName + '", "RegionName" : "' + geoDict.RegionName + '", "City" : "' + geoDict.City + '", "Latitude" : "' + geoDict.Latitude + '", "Longitude" : "' + geoDict.Longitude + '", "CountryCode" : "' + geoDict.CountryCode + '"}]}';
		setCookie(CookieName, s_Details, CookieExpire);
		getFlag(s_Details);
	}

	/**
	*
	* Create container at the top-left
	*
	* @name getFlag
	* @param s_Details: Json string
	*/
	function getFlag(s_Details)
	{
		var s_Language 		= initLanguage();
		var o_Country 		= eval("(" + s_Details + ")");
		var s_ImgSrc 		= "http://ipinfodb.com/img/flags/" + unescape(o_Country.Locations[0].CountryCode.toLowerCase()) + ".gif";
		var o_Img 			= document.createElement("img");
		var o_ImgContainer 	= document.createElement("div");
		var o_Details 		= document.createElement("div");
		var o_Help 			= document.createElement("div");
		var o_HelpDetails 	= document.createElement("div");


		o_ImgContainer.appendChild(o_Details);
		o_ImgContainer.appendChild(o_Img);

		o_ImgContainer.setAttribute("id", "flag_userjs");
		o_ImgContainer.addEventListener("mouseover", displayDetail, false);
		o_ImgContainer.addEventListener("mouseout", displayDetail, false);

		o_Img.setAttribute("src", s_ImgSrc);

		o_Details.setAttribute("class", "detailsOperaFlag");
		o_Details.innerHTML = getHost() + " : <a href=\"http://toolbar.netcraft.com/site_report?url=" + getHost() + "\">Netcraft</a> / <a href=\"http://whois.org/whois/" + getDomain(getHost()) + "\">Whois</a><br />";
		o_Details.innerHTML += o_Lang.IP_ADDRESS + " : <a href=\"http://www.ip-adress.com/ip_tracer/" + unescape(o_Country.Locations[0].Ip) + "\" title=\"" + o_Lang.TRACK + " " + unescape(o_Country.Locations[0].Ip) + "\">" + unescape(o_Country.Locations[0].Ip) + "</a><br />"
		o_Details.innerHTML += o_Lang.COUNTRY + " : <a href=\"http://" + s_Language + ".wikipedia.org/wiki/" + unescape(o_Country.Locations[0].CountryName) + "\" title=\"" + o_Lang.SEE_WIKI + unescape(o_Country.Locations[0].CountryName) + "\">" + unescape(o_Country.Locations[0].CountryName) + "</a> (<a href=\"http://" + s_Language + ".wikipedia.org/wiki/" + unescape(o_Country.Locations[0].CountryCode) + "\" title=\"" + o_Lang.SEE_WIKI + unescape(o_Country.Locations[0].CountryCode) + "\">" + unescape(o_Country.Locations[0].CountryCode) + "</a>)<br />";
		o_Details.innerHTML += o_Lang.REGION + " : " + ((unescape(o_Country.Locations[0].RegionName) == "") ? "<i>N/A</i>" : "<a href=\"http://" + s_Language + ".wikipedia.org/wiki/" + unescape(o_Country.Locations[0].RegionName) + "\" title=\"" + o_Lang.SEE_WIKI + unescape(o_Country.Locations[0].RegionName) + "\">" + unescape(o_Country.Locations[0].RegionName) + "</a>") + "<br />";
		o_Details.innerHTML += o_Lang.CITY + " : " + ((unescape(o_Country.Locations[0].City) == "") ? "<i>N/A</i>" : "<a href=\"http://" + s_Language + ".wikipedia.org/wiki/" + unescape(o_Country.Locations[0].City) + "\" title=\"" + o_Lang.SEE_WIKI + unescape(o_Country.Locations[0].City) + "\">" + unescape(o_Country.Locations[0].City) + "</a>") + "<br />";
		o_Details.innerHTML += o_Lang.LATITUDE + " : " + ((unescape(o_Country.Locations[0].Latitude) == "") ? "<i>N/A</i>" : unescape(o_Country.Locations[0].Latitude)) + "<br />";
		o_Details.innerHTML += o_Lang.LONGITUDE + " : " + ((unescape(o_Country.Locations[0].Longitude) == "") ? "<i>N/A</i>" : unescape(o_Country.Locations[0].Longitude)) + "<br />";
		o_Details.innerHTML += "<a href=\"http://maps.google.com/?ie=UTF8&ll=" + unescape(o_Country.Locations[0].Latitude) + "," + unescape(o_Country.Locations[0].Longitude) + "&z=12\" title=\"" + o_Lang.SEE_MAPS + "\" style=\"float:left;\">" + o_Lang.SEE_MAPS + "</a>";
		
		o_HelpDetails.setAttribute("class", "helpDetails");
		o_HelpDetails.innerHTML = o_Lang.RESULTS + "<a href=\"http://ipinfodb.com/\" title=\"IPInfoDB\">IPInfoDB</a><br />" + o_Lang.AUTHOR + "<a href=\"http://my.opera.com/PH`/about/\">PH</a>";

		o_Help.setAttribute("class", "help");
		o_Details.appendChild(o_Help);
		o_Help.appendChild(o_HelpDetails);
		o_Help.innerHTML += "?";
		o_Help.addEventListener("mouseover", displayDetail, false);
		o_Help.addEventListener("mouseout", displayDetail, false);

		var o_Style = document.createElement("style");
		o_Style.setAttribute("type", "text/css");
		o_Style.innerHTML = "#flag_userjs {text-align:left;color:black;font-size:10px;font-family:Tahoma;position:relative;z-index:1000;position:fixed;left:0px;top:0px;margin:0;padding:0} #flag_userjs a {color:#0040af;text-decoration:none;border:0}#flag_userjs a:hover{text-decoration:underline;border:0} #flag_userjs .detailsOperaFlag {position:relative;z-index:10500;display:none;position:absolute;width:20em;top:10px;left:0px;padding:2px 4px;background-color:#fafafa;border:1px solid #aaa;} #flag_userjs .helpDetails {z-index:10100;display:none;position:absolute;width:12em;right:0px;padding:2px 4px;background-color:#fafafa;border:1px solid #aaa;} #flag_userjs .help {display:inline;float:right;}";

		document.body.appendChild(o_ImgContainer);
		document.body.appendChild(o_Style);
	}

	/**
	*
	* Main function. Check cookie. If exists, we load container. If not, we call the API
	*
	* @name checkCookie
	*/
	function checkCookie()
	{
		var domain = API_Url + getHost();

		geolocation = getCookie(CookieName);

		if (geolocation == null)
		{
			script = document.createElement('script');
			script.src = domain;
			document.body.appendChild(script);
		}
		else
		{
		  getFlag(geolocation);
		}
	}

	/**
	*
	* Get cookie using its name
	*
	* @name getCookie
	* @param c_name: cookie name
	* @return value of the cookie
	*/
	function getCookie(c_name)
	{
		if (document.cookie.length > 0)
		{
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1){
				c_start = c_start + c_name.length+1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1)
					c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return null;
	}

	/**
	*
	* Set cookie
	*
	* @name setCookie
	* @param c_name: cookie name
	* @param value: value of the cookie
	* @param expiredays: expiration in days
	*/
	function setCookie(c_name, value, expiredays)
	{
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name+ "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	}

	/**
	*
	* Util function. Change this.firstChild display to none/block
	*
	* @name displayDetail
	*/
	function displayDetail()
	{
		this.firstChild.style.display = (this.firstChild.style.display == "block") ? "none" : "block";
	}

	/**
	*
	* Get language of the browser.
	*
	* @name initLanguage
	*/
	function initLanguage()
	{
		var tmpLng = (typeof navigator.language != "undefined") ? (navigator.language).substring(0, 2) : DefaultLanguage;
		switch(tmpLng)
		{
			case "bg": 
				o_Lang = { IP_ADDRESS: "IP адрес", TRACK: "Следа", COUNTRY: "Страна", REGION: "Регион", CITY: "Град", LATITUDE: "Ширина", LONGITUDE: "Дължина", SEE_MAPS: "Покажи в Google Maps", SEE_WIKI: "Покажи в Уикипедия : ", RESULTS: "Данни : ", AUTHOR: "Автор : " };
			break;
			case "de":
				o_Lang = { IP_ADDRESS: "IP-Adresse", TRACK: "Spur", COUNTRY: "Land", REGION: "Region", CITY: "Stadt", LATITUDE: "Breite", LONGITUDE: "L&auml;ngengrad", SEE_MAPS: "Auf Google Maps", SEE_WIKI: "Finden Sie auf Wikipedia : ", RESULTS: "Ergebnisse ", AUTHOR: "Script " };
			break;
			case "es":
				o_Lang = { IP_ADDRESS: "Direcci&ocute;n IP", TRACK: "Traza", COUNTRY: "Pa&iacute;s", REGION: "Regi&ocute;n", CITY: "Ciudad", LATITUDE: "Latitud", LONGITUDE: "Longitud", SEE_MAPS: "Ver en Google Maps", SEE_WIKI: "Ver en Wikipedia : ", RESULTS: "Resultados de : ", AUTHOR: "Script de : " };
			break;
			case "fr":
				o_Lang = { IP_ADDRESS: "Adresse IP", TRACK: "Tracer", COUNTRY: "Pays", REGION: "R&eacute;gion", CITY: "Ville", LATITUDE: "Latitude", LONGITUDE: "Longitude", SEE_MAPS: "Voir sur Google Maps", SEE_WIKI: "Voir sur Wikipedia : ", RESULTS: "R&eacute;sultats de : ", AUTHOR: "Script de : " };
			break;
			case "it":
				o_Lang = { IP_ADDRESS: "Indirizzo IP", TRACK: "Trace", COUNTRY: "Paese", REGION: "Regione", CITY: "Citt&agrave;", LATITUDE: "Latitude", LONGITUDE: "Longitudine", SEE_MAPS: "Vedere su Google Maps", SEE_WIKI: "Vedere su Wikipedia : ", RESULTS: "Risultati di : ", AUTHOR: "Script di : " };
			break;
			case "zh":
				o_Lang = { IP_ADDRESS: "IP地址", TRACK: "跟踪", COUNTRY: "国家", REGION: "地区", CITY: "城市", LATITUDE: "纬度", LONGITUDE: "经度", SEE_MAPS: "在Google地图上查看", SEE_WIKI: "在维基百科上查看 : ", RESULTS: "信息来源 : ", AUTHOR: "脚本作者 : " };
			break;
			default:
				o_Lang = { IP_ADDRESS: "IP address", TRACK: "Track", COUNTRY: "Country", REGION: "Region", CITY: "City", LATITUDE: "Latitude", LONGITUDE: "Longitude", SEE_MAPS: "See on Google Maps", SEE_WIKI: "See on Wikipedia: ", RESULTS: "Results by:", AUTHOR: "Script by : " };
			break;
		}
		return tmpLng;
	}
	
	/**
	*
	* Get current host
	*
	* @name getHost
	* @return current host
	*/
	function getHost()
	{
		return window.location.host;
	}

	/**
	*
	* Get domain name
	*
	* @name getDomain
	* @param host : host to parse
	* @return domain name
	*/
	function getDomain(host)
	{
		var o_Regex = new RegExp("([a-zA-Z_0-9\-]+\.[a-zA-Z_]{2,3})$");
		if(o_Regex.exec(host))
		{
			return RegExp.$1;
		}
		return host;
	}

	window.operaflag_callback = operaflag_callback;
})(window.opera);