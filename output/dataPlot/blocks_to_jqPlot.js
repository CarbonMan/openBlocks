/**
* Generate an jqPlot chart statement
*/
/*
T$.on("load toolbox blocks", function(ev){
    var cat = ev.toolbox.find("category[name='" + T$.i18n('Display') + "']");
    if (cat.length){
        var blk = cat.find('block[type="line_chart"]');
        if (!blk.length){
            $('<block type="line_chart"></block>').appendTo(cat);
            $('<block type="series_label"></block>').appendTo(cat);
        }
    }
});
*/
/**
* Chart statements
*/
Blockly.Blocks['line_chart'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(T$.i18n("Line chart"));
        this.appendDummyInput()
            .appendField(T$.i18n("Chart title"))
            .appendField(new Blockly.FieldTextInput("               "), "title");
        this.appendDummyInput()
            .appendField(T$.i18n("Y axis title"))
            .appendField(new Blockly.FieldTextInput("               "), "yAxis");
        this.appendDummyInput()
            .appendField(T$.i18n("X axis title"))
            .appendField(new Blockly.FieldTextInput("               "), "xAxis");
        this.appendDummyInput()
            .appendField(T$.i18n("First column is X axis ticks"))
            .appendField(new Blockly.FieldCheckbox("FALSE"), "firstColumnXaxisTicks");
        this.appendStatementInput("labels")
            .setCheck("series_label")
            .appendField(T$.i18n("Series labels"));
        this.setPreviousStatement(true, "display");
        //this.setNextStatement(true, "statement");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    },
      T$_toolbox: function($toolbox){
          var cat = $toolbox.find("category[name='" + T$.i18n('Display') + "']");
          if (cat){
              $('<block type="line_chart"></block>').appendTo(cat);
          }
      }
};

Blockly.Blocks['series_label'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(T$.i18n("Label"))
            .appendField(new Blockly.FieldTextInput("series_name"), "name");
        this.setPreviousStatement(true, "series_label");
        this.setNextStatement(true, "series_label");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    },
      T$_toolbox: function($toolbox){
          var cat = $toolbox.find("category[name='" + T$.i18n('Display') + "']");
          if (cat){
              $('<block type="series_label"></block>').appendTo(cat);
          }
      }
};

/**
* Generators
*/
