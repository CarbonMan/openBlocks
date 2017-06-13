/**
* Requires eventTarget.js
*/
T$.on("load toolbox categories", function(ev){
  var cat = ev.toolbox.find("category[name='" + T$.i18n('Task') + "']");
  if (!cat.length) 
      cat = $("<category name='" + T$.i18n('Task') + "'></category>").appendTo(ev.toolbox);
  /*
  var blk = cat.find('block[type="codeBlock"]');
  if (!blk.length)
    $('<block type="codeBlock"></block>').appendTo(cat);
  */
});

Blockly.Blocks['task'].toolbox$ = function ($toolbox) {
    var cat = $toolbox.find("category[name='" + T$.i18n('Task') + "']");
    if (cat.length) 
      $('<block type="task"></block>').appendTo(cat);
};

