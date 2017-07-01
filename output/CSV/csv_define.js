Blockly.Blocks['csv'] = {
	init: function () {
		this.appendDummyInput()
		        .appendField(T$.i18n("Convert"));
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("item"), "inputVariable");
		this.appendDummyInput()
			.appendField(T$.i18n("into csv"));
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};
