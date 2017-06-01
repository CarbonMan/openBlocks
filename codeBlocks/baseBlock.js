/**
* Requires eventTarget.js
*/
Blockly.Blocks['codeBlock'] = {
    init: function () {
        this.appendStatementInput("contained_code")
            .setCheck(['statement', 'display'])
            .appendField(T$.i18n("Block"));
        this.setPreviousStatement(true, "block");
        this.setNextStatement(true, "block");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
        // Used while generating code (see nlSqlBlockGenerator.js)
        eventHandler(this);
        // Called by statements during generation
        this.T$ = {
            context: {}
        };
        eventHandler(this.T$);
    }
};
