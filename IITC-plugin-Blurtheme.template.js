// ==UserScript==
// @name           IITC plugin: Blurtheme
// @author         Falenone | xMAXIMx
// @category       Themes
// @version        1.0
// @description    Adds modern look to IITC CE and it's plugins
// @id			   IITC-Themes@Falenone-xMAXIMx
// @namespace      https://github.com/Falenone/Blurtheme
// @updateURL      https://github.com/Falenone/Blurtheme/raw/main/IITC-plugin-Blurtheme.user.js
// @downloadURL    https://github.com/Falenone/Blurtheme/raw/main/IITC-plugin-Blurtheme.user.js
// @match          https://intel.ingress.com/*
// @match          https://intel-x.ingress.com/*
// @icon           https://raw.githubusercontent.com/Falenone/Blurtheme/main/images/blurtheme.png
// @icon64         https://raw.githubusercontent.com/Falenone/Blurtheme/main/images/blurtheme-64.png
// @grant          none
// @run-at document-idle
// ==/UserScript==
function wrapper(plugin_info) {
  const DEFAULT_SETTINGS = JSON.stringify({ //These settings will be used the first time you start and if something goes wrong when you change the values
    // Template - 'NAME': 'VALUE' // DESCRIPTION
    'theme':'default', // Default theme name
    'blur':true,
    'animations':false,
    'v':plugin_info.script.version, // settings version, DO NOT CHANGE ANYTHING
  });
  if(localStorage.getItem('blurthemeSettings') == null){localStorage.setItem("blurthemeSettings",DEFAULT_SETTINGS);} // set up default settings if they not found
  if(typeof window.plugin !== 'function') window.plugin = function(){};
  window.plugin.blurtheme = function () {}; // define namespace
  /* TEMPLATE FOR ADDITIONAL THEMES

  var CSS_DATA_OF_THEME_NAME = 'CSS HERE';

  CSS_DATA_OF_THEME_NAME need to be replace as other name that you like, will be used in next action

  AND add new line to `themesList` with user-visible name and css data (next line)

  'SYSTEM_NAME':{'name':'VISIBLE_NAME','css':CSS_DATA_OF_THEME_NAME,'preview':LINK_TO_PREVIEW},

  SYSTEM_NAME - system name of style, this value will be saved on theme change
  VISIBLE_NAME - Name of theme that will visible for end-users
  CSS_DATA_OF_THEME_NAME - you need to use same as used in previous action

  END OF TEMPLATE */

  // !!! DO NOT CHANGE THE FOLLOWING LINE(S) (please) !!!
  // {{THEMES_LIST}}
  // !!! BUT YOU MAY CHANGE EVERYTHING BELOW !!!

  window.plugin.blurtheme.onIITCLoad = function(){
    var settings = JSON.parse(localStorage.getItem("blurthemeSettings")); // get current settings
    $('head').append(`<style id="blurthemeStyle" data-theme="standart"><style>`)
    window.plugin.blurtheme.activateTheme(settings.theme)
    $('#toolbox').append('<a id="helperMenuLink" onclick="window.plugin.blurtheme.menu()" title="[t]" accesskey="t">Themes</a>');
  };
  window.plugin.blurtheme.activateTheme = function(themeName=''){
    var settings = JSON.parse(localStorage.getItem("blurthemeSettings")); // get current settings
    if (themeName == ''){themeName = settings.theme;}
    console.log(`blurtheme | Switching to ${themeName}`); // log info
    settings.theme = themeName; // change settings array
    localStorage.setItem("blurthemeSettings",JSON.stringify(settings)); // update settings in local storage
    $('#blurthemeStyle').html(themesList[themeName].css) // update theme on page
  }
  window.plugin.blurtheme.resetSettings = function(){
    localStorage.removeItem('blurthemeSettings');
    localStorage.setItem("blurthemeSettings",DEFAULT_SETTINGS);
    window.plugin.blurtheme.activateTheme();
  }
  window.plugin.blurtheme.changeMenuTab = function(tab=''){
    $('#menuTabOptions').hide()
    $('#menuTabThemes').hide()
    $('#menuTabInfo').hide()
    if (tab == 'themes' || tab == ''){$('#menuTabThemes').show();}
    else if(tab == 'options'){$('#menuTabOptions').show();}
    else if(tab == 'info'){$('#menuTabInfo').show();}
  }
  window.plugin.blurtheme.menuBrowserInfo = function(state=true){
    document.getElementById("browserInfo").innerText='';
    if (state){var nameOffset,verOffset,ix,nVer=navigator.appVersion,nAgt=navigator.userAgent,browserName=navigator.appName,fullVersion=""+parseFloat(navigator.appVersion),majorVersion=parseInt(navigator.appVersion,10);-1!=(verOffset=nAgt.indexOf("Opera"))?(browserName="Opera",fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("MSIE"))?(browserName="Microsoft Internet Explorer",fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(browserName="Chrome",fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(browserName="Safari",fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(browserName="Firefox",fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(browserName=nAgt.substring(nameOffset,verOffset),fullVersion=nAgt.substring(verOffset+1),browserName.toLowerCase()==browserName.toUpperCase()&&(browserName=navigator.appName)),-1!=(ix=fullVersion.indexOf(";"))&&(fullVersion=fullVersion.substring(0,ix)),-1!=(ix=fullVersion.indexOf(" "))&&(fullVersion=fullVersion.substring(0,ix)),isNaN(majorVersion=parseInt(""+fullVersion,10))&&(fullVersion=""+parseFloat(navigator.appVersion),majorVersion=parseInt(navigator.appVersion,10)),browserInfo=": <a onclick='window.plugin.blurtheme.menuBrowserInfo(false)'>hide</a><br>Browser name  = "+browserName+"<br>Full version  = "+fullVersion+"<br>Major version = "+majorVersion+"<br>navigator.appName = "+navigator.appName+"<br>navigator.userAgent = "+navigator.userAgent+"<br>";var OSName="Unknown OS";-1!=navigator.appVersion.indexOf("Win")&&(OSName="Windows"),-1!=navigator.appVersion.indexOf("Mac")&&(OSName="MacOS"),-1!=navigator.appVersion.indexOf("X11")&&(OSName="UNIX"),-1!=navigator.appVersion.indexOf("Linux")&&(OSName="Linux"),document.getElementById("browserInfo").innerHTML+=browserInfo+"OS = "+OSName}
    else{document.getElementById("browserInfo").innerHTML = ' - <a onclick="window.plugin.blurtheme.menuBrowserInfo()">show</a>'}
  }
  window.plugin.blurtheme.menu = function(tab=''){
    var v = (script_info.script && script_info.script.version || script_info.dateTimeVersion) + ' ['+script_info.buildName+']';
    if (typeof android !== 'undefined' && android && android.getVersionName) {v += '[IITC Mobile '+android.getVersionName()+']';}
    var settings = JSON.parse(localStorage.getItem("blurthemeSettings"));
    var tabChooser = `<button onclick="window.plugin.blurtheme.changeMenuTab('themes')">Themes</button> <button onclick="window.plugin.blurtheme.changeMenuTab('options')">Options</button> <button onclick="window.plugin.blurtheme.changeMenuTab('info')">Info</button>`
    var themesTab = `<div id="menuTabThemes">Welcome ${window.PLAYER.nickname}!<br>Choose theme that you like
    <fieldset><legend>Available themes</legend>`
    for (const [theme, data] of Object.entries(themesList)) {
      themesTab += `<div><input type="radio" id="blurthemeSelector-${theme}" name="blurthemeSelector" onchange="window.plugin.blurtheme.activateTheme('${theme}')" value="${theme}" ${(settings.theme == theme ? 'checked' : '')}><label for="blurthemeSelector-${theme}"><img style="width:100px" src="${data.preview}">${data.name}</label></div>`
    }
    themesTab += `</fieldset></div>`;
    var optionsTab = `<div id="menuTabOptions">
    These do not have any effect, yet
    <fieldset>
    <legend>Available options</legend>
      <div>
        <input type="checkbox" id="blur">
        <label for="blur">Blur</label>
      </div>
      <button onclick="(confirm('Are you sure about that?') ? window.plugin.blurtheme.resetSettings() : '')">Reset settings</button>
    </fieldset>
    </div>`
    var infoTab = `<div id="menuTabInfo">
    Blurtheme version - ${plugin_info.script.version} | ${settings.v}<br><br>
    IITC version - ${v}<br><br>
    Browser<span id="browserInfo"> - <a onclick="window.plugin.blurtheme.menuBrowserInfo()">show</a></span><br><br>
    Authors - <span class="nickname enl">Falenone</span> | <span class="nickname res">xMAXIMx</span><br><br>
    Github - <a href='https://github.com/'>Link</a>
    </div>`
    var content = `${tabChooser} <hr> ${themesTab} ${optionsTab} ${infoTab}`
    window.dialog({title:'Theme chooser',html:content,id:'blurthememenu',buttons:'',height: 'auto',width: 'auto',collapseCallback: this.collapseFix,expandCallback: this.collapseFix,dialogClass:'blurthememenu'});
      $(".blurthememenu .ui-dialog-buttonpane").remove();

    window.plugin.blurtheme.changeMenuTab()
  }
  /////////////////
  // SETUP
  /////////////////
  function setup() {
    window.addHook('iitcLoaded', window.plugin.blurtheme.onIITCLoad);
  }
  setup.info = plugin_info;
  if (!window.bootPlugins) window.bootPlugins = [];
  window.bootPlugins.push(setup);
  if (window.iitcLoaded && typeof setup === 'function')setup();
}
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {info.script = {version: GM_info.script.version,name: GM_info.script.name,description: GM_info.script.description};}
var textContent = document.createTextNode('('+ wrapper +')('+ JSON.stringify(info) +')');
script.appendChild(textContent);
(document.body || document.head || document.documentElement).appendChild(script);
