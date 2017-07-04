$(function(){
  // Build the toolbox categories and load the blocks into them.
  // The blocks have a custom function toolbox$ to make it easier to 
  // centralize the code.
  T$_editor.on("load toolbox categories", function(ev){
    var cat = ev.toolbox.find("category[name='" + T$.i18n('Display') + "']");
    if (!cat.length) 
        qryCat = $("<category name='" + T$.i18n('Display') + "'></category>").appendTo(ev.toolbox);  
  });
});
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
     if (cat)
         $('<block type="series_label"></block>').appendTo(cat);
};
