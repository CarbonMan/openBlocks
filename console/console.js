$(function () {
  // Build the debug category and load the block into it.
  // The blocks have a custom function toolbox$ to make it easier to 
  // centralize the code.
  T$_editor.on("load toolbox categories", function(ev){
    // Called once all openBlocks have been downloaded (see blocklyCode.js)
    var dbgCat = ev.toolbox.find("category[name='" + T$.i18n('Debug') + "']");
    if (!dbgCat.length) 
        dbgCat = $("<category name='" + T$.i18n('Debug') + "'></category>").appendTo(ev.toolbox);
        // Console logging
    var newCat = dbgCat.find("category[name='" + T$.i18n('Console') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Console') + "'></category>").appendTo(dbgCat);

  });  
});

Blockly.Blocks['console'].toolbox$ = function ($toolbox) {
	var cat = $toolbox.find("category[name='" + T$.i18n('Console') + "']");
	if (cat) {
		$('<block type="console">' +
			'</block>').appendTo(cat);
	}
};
