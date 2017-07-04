T$_editor.on("load toolbox categories", function(ev){
  var cat = ev.toolbox.find("category[name='" + T$.i18n('Display') + "']");
  if (!cat.length)
    $("<category name='" + T$.i18n('Display') + "'></category>").appendTo(ev.toolbox);
});
