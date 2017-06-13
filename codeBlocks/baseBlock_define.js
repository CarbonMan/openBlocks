Blockly.Blocks['task'] = {
    init: function () {
        this.appendStatementInput("script")
            .setCheck(['statement', 'display'])
            .appendField(T$.i18n("Task"));
        this.setPreviousStatement(true, "task");
        this.setNextStatement(true, "task");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
        /*
        // Used while generating code (see nlSqlBlockGenerator.js)
        eventHandler(this);
        // Called by statements during generation
        this.T$ = {
            context: {}
        };
        eventHandler(this.T$);
        */
    }
};

