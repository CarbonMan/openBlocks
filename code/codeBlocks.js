IOTKEY.on("load toolbox blocks", function(ev){
    var cat = $("category[name='" + IOTKEY.i18n['Display'] + "']");
    if (cat){
        $('<block type="line_chart"></block>').appendTo(cat);
        $('<block type="series_label"></block>').appendTo(cat);
    }
});
