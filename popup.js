var lc1306 = jQuery.noConflict(true);

(function ($) {

    $(function () {
        chrome.storage.sync.get(["colorblindingValue", "customFilterValues"], function (obj) {
            var noValue = obj.colorblindingValue === null || obj.colorblindingValue === undefined;
            $("input[name=type][value=" + (noValue ? "deactive" : obj.colorblindingValue) + "]").prop('checked', true);
            if (obj.colorblindingValue !== 'deactivate' && !noValue) {
                if (obj.colorblindingValue === 'custom') {
                    var customValues = obj.customFilterValues;

                    $('input[name="r1"]').val(customValues.r1);
                    $('input[name="r2"]').val(customValues.r2);
                    $('input[name="r3"]').val(customValues.r3);

                    $('input[name="g1"]').val(customValues.g1);
                    $('input[name="g2"]').val(customValues.g2);
                    $('input[name="g3"]').val(customValues.g3);

                    $('input[name="b1"]').val(customValues.b1);
                    $('input[name="b2"]').val(customValues.b2);
                    $('input[name="b3"]').val(customValues.b3);

                    $("#accordion").show();
                }
                else {
                    $("#accordion").hide();
                }
                //console.log("internal " + obj.colorblindingValue);
                //console.log(obj.colorblindingValue);
                execute();
            }
        });

        $('input[name="type"]:radio').change(
            function () {
                var newValue = $('input[name=type]:checked', '#cvd_radios').val();
                if (newValue === 'custom') {
                    $("#accordion").show();
                }
                else {
                    $("#accordion").hide();
                }
            });

        $("#btnApply").click(function () {
            var newValue = $('input[name=type]:checked', '#cvd_radios').val();
            var customSettings = {};
            if (newValue === 'custom') {
                customSettings.r1 = $('input[name="r1"]').val();
                customSettings.r2 = $('input[name="r2"]').val();
                customSettings.r3 = $('input[name="r3"]').val();
                customSettings.r4 = $('input[name="r4"]').val();

                customSettings.g1 = $('input[name="g1"]').val();
                customSettings.g2 = $('input[name="g2"]').val();
                customSettings.g3 = $('input[name="g3"]').val();
                customSettings.g4 = $('input[name="g4"]').val();

                customSettings.b1 = $('input[name="b1"]').val();
                customSettings.b2 = $('input[name="b2"]').val();
                customSettings.b3 = $('input[name="b3"]').val();
                customSettings.b4 = $('input[name="b4"]').val();

                customSettings.a1 = $('input[name="a1"]').val();
                customSettings.a2 = $('input[name="a2"]').val();
                customSettings.a3 = $('input[name="a3"]').val();
                customSettings.a4 = $('input[name="a4"]').val();

                console.log(customSettings);
            }

            chrome.storage.sync.set({ 'colorblindingValue': newValue, 'customFilterValues': customSettings }, function () {
                if (newValue !== 'deactivate') {
                    chrome.tabs.executeScript({ file: 'background.js' });
                } else {
                    chrome.tabs.executeScript({ file: 'reload.js' });
                }
            });


            //chrome.tabs.create({ url: chrome.runtime.getURL("login.html") });
        });

        $("#accordion").accordion({
            heightStyle: "content",
            header: "h3",
            collapsible: true,
            active: false
        });

        $("#btnLogin").click(function () {
            chrome.tabs.create({ url: chrome.runtime.getURL("login.html") });
        });

        $("#btnRefresh").click(function () {
            chrome.tabs.executeScript({ file: 'reload.js' });
        })


          /* Js for slider Red-Blind / Protanopia */
          var slider = document.getElementById("RBSlider");
          var output = document.getElementById("RBCir");
          output.innerHTML = slider.value;

          slider.oninput = function() {
            output.innerHTML = this.value;
          }
             /* Js for slider Green-Blind / Deuteranopia */
             var slider2 = document.getElementById("GBSlider");
             var output2 = document.getElementById("GBCir");
             output2.innerHTML = slider.value;

             slider2.oninput = function() {
               output2.innerHTML = this.value;
             }
                /* Js  slider for  Blue-Blind / Tritanopia */
             var slider3= document.getElementById("BBSlider");
             var output3= document.getElementById("BBCir");
             output3.innerHTML = slider.value;

             slider3.oninput = function() {
               output3.innerHTML = this.value;
             }
                 /* Js  slider for  Blue-Blind / Tritanopia */
                 var slider3= document.getElementById("BBSlider");
                 var output3= document.getElementById("BBCir");
                 output3.innerHTML = slider.value;

                 slider3.oninput = function() {
                   output3.innerHTML = this.value;
                 }

                /* Js  Red-Weak / Protanomaly 8 */
                 var slider4= document.getElementById("RWSlider");
                 var output4= document.getElementById("RWCir");
                 output4.innerHTML = slider.value;

                 slider4.oninput = function() {
                   output4.innerHTML = this.value;
                 }



               /* Js  slider for  Green-Weak / Deuteranomaly */
             var slider5= document.getElementById("GWSlider");
             var output5 = document.getElementById("GWCir");
             output5.innerHTML = slider.value;

             slider5.oninput = function() {
               output5.innerHTML = this.value;
             }

              /* Js  slider for  Blue-Weak / Tritanomaly */
              var slider6= document.getElementById("BWSlider");
              var output6 = document.getElementById("BWCir");
              output6.innerHTML = slider.value;

              slider6.oninput = function() {
                output6.innerHTML = this.value;
              }

               /* Js  slider for  Monochromacy / Achromatopsia*/
               var slider7= document.getElementById("MonoSlider");
               var output7 = document.getElementById("MonoCir");
               output7.innerHTML = slider.value;

               slider7.oninput = function() {
                 output7.innerHTML = this.value;
               }
                /* Js  slider for Blue Cone Monochromacy / Achromatomaly */
                var slider8= document.getElementById("BCSlider");
                var output8 = document.getElementById("BCCir");
                output8.innerHTML = slider.value;

                slider8.oninput = function() {
                  output8.innerHTML = this.value;
                }
    });



})(lc1306);
