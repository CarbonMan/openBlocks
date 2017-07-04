$(function () {
	// Build the toolbox categories and load the blocks into them.
	// The blocks have a custom function toolbox$ to make it easier to
	// centralize the code.
	T$_editor.on("load toolbox categories", function (ev) {
		var cat = ev.toolbox.find("category[name='" + T$.i18n('Display') + "']");
		if (!cat.length)
			qryCat = $("<category name='" + T$.i18n('Display') + "'></category>").appendTo(ev.toolbox);
	});
});
/**
 * csv entries
 */
Blockly.Blocks['csv'].toolbox$ = function ($toolbox) {
	var cat = $toolbox.find("category[name='" + T$.i18n('Display') + "']");
	if (cat)
		$('<block type="csv"></block>').appendTo(cat);
};
