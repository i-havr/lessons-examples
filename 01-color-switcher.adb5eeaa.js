!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=null;function d(){e.setAttribute("disabled","disabled"),t.removeAttribute("disabled")}function n(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0").toUpperCase())}t.addEventListener("click",(function(){t.setAttribute("disabled","disabled"),e.removeAttribute("disabled"),n(),a=setInterval(n,1e3)})),e.addEventListener("click",(function(){d(),clearInterval(a)})),d()}();
//# sourceMappingURL=01-color-switcher.adb5eeaa.js.map