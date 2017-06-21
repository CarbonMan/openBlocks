
/**
* Chart toolbox entries
*/
Blockly.Blocks['line_chart'].toolbox$ = function($toolbox){
     var cat = $toolbox.find("category[name='" + T$.i18n('Display') + "']");
     if (cat)
         $('<block type="line_chart"></block>').appendTo(cat);
};

Blockly.Blocks['series_label'].toolbox$ = function($toolbox){
     var cat = $toolbox.find("category[name='" + T$.i18n('Display') + "']");
     if (cat){
         $('<block type="series_label"></block>').appendTo(cat);
};
