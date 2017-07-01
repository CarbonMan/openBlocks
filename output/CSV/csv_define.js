Blockly.Blocks['nlsql_js'] = {
	init: function () {
		this.appendDummyInput()
		        .appendField("Execute");
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("item"), "inputVariable");
		this.appendDummyInput()
			.appendField("output rows as csv");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};
