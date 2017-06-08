$(function(){
  // Build the toolbox categories and load the blocks into them.
  // The blocks have a custom function T$_toolbox to make it easier to 
  // centralize the code.
  T$.on("load toolbox categories", function(ev){
    var cat = ev.toolbox.find("category[name='" + T$.i18n('Display') + "']");
    if (!cat.length) 
        qryCat = $("<category name='" + T$.i18n('Display') + "'></category>").appendTo(ev.toolbox);  
  });
});
