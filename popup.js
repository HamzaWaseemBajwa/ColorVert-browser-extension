var lc1306 = jQuery.noConflict(true);

(function ($) {

    $(function () {
        chrome.storage.sync.get(["colorblindingValue","customFilterValues"], function (obj) {
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


    });

})(lc1306);