/**
* Requires eventTarget.js
*/
T$.on("load toolbox categories", function(ev){
  var cat = ev.toolbox.find("category[name='" + T$.i18n('Block') + "']");
  if (!cat.length) 
      cat = $("<category name='" + T$.i18n('Block') + "'></category>").appendTo(ev.toolbox);
  /*
  var blk = cat.find('block[type="codeBlock"]');
  if (!blk.length)
    $('<block type="codeBlock"></block>').appendTo(cat);
  */
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
    oncreate$: function(){
	var me = this;
	me.on("required feature", function(ev){
        	console.log("Set to require " + ev.feature);
        	me.B$.addFeature(ev.feature);
	});
	me.on("output format", function(ev){
		console.log("Output format set to " + ev.format);
        	me.B$.setAttribute("output", ev.format);
	});
	me.on("save", function(ev){
		var state = this.workspaceXml;
		// Move any attributes onto the block
		Object.keys(ev.attributes).forEach(function (p) {
			state.setAttribute(p, ev.attributes[p]);
		});
		// The features that must be present for this block to execute
		ev.features.forEach(function (f) {
			$("<feature name='" + f + "'/>").appendTo(state);
		});
		// The data format of the block's output.
		state.setAttribute("dataType", ev.dataType);
	});
    },
    toolbox$: function ($toolbox) {
      var cat = $toolbox.find("category[name='" + T$.i18n('Block') + "']");
      if (cat.length) 
        $('<block type="codeBlock"></block>').appendTo(cat);
    }
};

