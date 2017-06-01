/**
* Requires eventTarget.js
*/
T$.on("load toolbox categories", function(ev){
  var cat = ev.toolbox.find("category[name='" + T$.i18n('Block') + "']");
  if (!cat.length) 
      cat = $("<category name='" + T$.i18n('Block') + "'></category>").appendTo(ev.toolbox);
  $('<block type="codeBlock"></block>').appendTo(cat);
});

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

Blockly.JavaScript['codeBlock'] = function (block) {
    var code = Blockly.JavaScript.statementToCode(block, 'contained_code');
    var ev = {
        context: block.IOTKEY.context,
        outputType: "string",
        type: "javascript",
        code: code
    };
    // Allow blocks (such as nlsql_verbal_output to restructure the code)
    block.IOTKEY.fire("generate", ev)
    console.log(ev.code);
    // The type can be set to hub/nlSql meaning it is to be executed on the hub
    return "<codeBlock type='" + ev.type + "' id='" + escape(block.id) + "'" +
        " outputType='" + ev.outputType + "'>" +
        escape(ev.code) +
        "</codeBlock>";
};
