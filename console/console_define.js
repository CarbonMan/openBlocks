Blockly.Blocks['console'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Display")
        .appendField(new Blockly.FieldDropdown([
	    [ T$.i18n("info"),"info"], 
	    [ T$.i18n("warn"),"warning"], 
	    [ T$.i18n("error"),"error"]]), "type");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
