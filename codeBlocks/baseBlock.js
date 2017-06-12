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

Blockly.Blocks['task'] = {
    init: function () {
        this.appendStatementInput("contained_code")
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
    },
    toolbox$: function ($toolbox) {
      var cat = $toolbox.find("category[name='" + T$.i18n('Block') + "']");
      if (cat.length) 
        $('<block type="task"></block>').appendTo(cat);
    }
};

