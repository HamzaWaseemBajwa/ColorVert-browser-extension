
/* Function to append values to the matrix:
Open source: https://github.com/Altreus/colourblind 
Open source: http://lab.leocardz.com/colorblinding
*/


function appendSVG(document, customValues) {
  
  var filterProtanopia =
    '<filter id="protanopia"><feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" in="SourceGraphic" /> </filter>';
  var filterProtanomaly =
    '<filter id="protanomaly"> <feColorMatrix type="matrix" values="0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> ';
  var filterDeuteranopia =
    '<filter id="deuteranopia"> <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> ';
  var filterDeuteranomaly =
    '<filter id="deuteranomaly"> <feColorMatrix type="matrix" values="0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> ';
  var filterTritanopia =
    '<filter id="tritanopia"> <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> ';
  var filterTritanomaly =
    '<filter id="tritanomaly"> <feColorMatrix type="matrix" values="0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter>';
  var filterAchromatopsia =
    '<filter id="achromatopsia"> <feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter>';
  var filterAchromatomaly =
    '<filter id="achromatomaly"> <feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter>';

  /* Filter Function Hamza Bawja and Mateo Vaquero
     Open Source:http://lab.leocardz.com/colorblinding
     Contributions: Added new custom filters based on Matrix data, fix values to represent better
  */;
  var filterCustom =
    '<filter id="custom"> <feColorMatrix type="matrix" values=';
  console.log(customValues);
  if (customValues !== {}) {
    if (!String.prototype.format) {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != "undefined" ? args[number] : match;
        });
      };
    }

    /* Custom Values: Hamza Bawja
       Novel Contribution
    */
    var values = '"{0},{1},{2},{3},0 {4},{5},{6},{7},0 {8},{9},{10},{11},0 0,0,0,1,0"'.format(
      customValues.r1,
      customValues.r2,
      customValues.r3,
      customValues.r4,
      customValues.g1,
      customValues.g2,
      customValues.g3,
      customValues.g4,
      customValues.b1,
      customValues.b2,
      customValues.b3,
      customValues.b4
    );
    filterCustom += values;
  } else {
    filterCustom += '"1,0,0,0,0 0,1,0,0,0 0,0,1,0,0 0,0,0,1,0"';
  }
  filterCustom += ' in="SourceGraphic" /> </filter>';
  console.log(filterCustom);

  /* SVG storage of values
  Open source:http://lab.leocardz.com/colorblinding
  Contributions: Added custom values*/
  var svgA =
    '<svg id="colorBlindSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full">';
  svgA += filterProtanopia;
  svgA += filterProtanomaly;
  svgA += filterDeuteranopia;
  svgA += filterDeuteranomaly;
  svgA += filterTritanopia;
  svgA += filterTritanomaly;
  svgA += filterAchromatopsia;
  svgA += filterAchromatomaly;
  svgA += filterCustom;
  svgA += "</svg>";

  var blockColorblindContent = document.getElementById(
    "blockColorblindContent"
  );
  if (blockColorblindContent !== undefined && blockColorblindContent !== null) {
    blockColorblindContent.parentNode.removeChild(blockColorblindContent);
  }
  
  var iDiv = document.createElement("div");
  iDiv.id = "blockColorblindContent";
  iDiv.innerHTML = svgA;
  iDiv.style.display = "none"; 
  document.getElementsByTagName("body")[0].appendChild(iDiv);

}
/* Function to apply colors 
Open source:http://lab.leocardz.com/colorblinding
Contributuions: Append our custom values*/

function changeColors(type, customValues) {
  console.log("Changing colors...");
  appendSVG(document, customValues);
  revertColors(document);

  var css =
    "html {" +
    "filter: url(#" +
    type +
    "); -webkit-filter: url(#" +
    type +
    "); -moz-filter: url(#" +
    type +
    "); -o-filter: url(#" +
    type +
    "); -ms-filter: url(#" +
    type +
    "); " +
    "}";

  applyingStyle(document, css);
}

/* Function to revert colors
Open source: http://lab.leocardz.com/colorblinding
Contributions: None*/
function revertColors(document) {
  var css =
    "html { -webkit-filter: none; -moz-filter: none; -o-filter: none; -ms-filter: none; } #blockColorblindContent { display: none; }";
  applyingStyle(document, css);
}

/* Function to revert colors
Open source: http://lab.leocardz.com/colorblinding
Contributions: None*/
function applyingStyle(document, css) {
  var head = document.getElementsByTagName("head")[0],
    style = document.createElement("style");

  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}

/* Chrome storage: Israel Ali
Contributions: Added  customerFilterValues to sync method
Open source:http://lab.leocardz.com/colorblinding
Open source: https://developer.chrome.com/extensions/storage*/

function execute() {
  chrome.storage.sync.get(
    ["colorblindingValue", "customFilterValues"],
    function (obj) {
      if (
        obj.colorblindingValue === null ||
        obj.colorblindingValue === undefined
      ) {
        obj.colorblindingValue = "normal";
        chrome.storage.sync.set({ colorblindingValue: obj.colorblindingValue });
      }
      changeColors(obj.colorblindingValue, obj.customFilterValues);
    }
  );
}
