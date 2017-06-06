$(function () {
  if (!T$.nlSql){
    console.error(T$.i18n("nlSql environment is not available"));
    return;
  }
  if (!T$.nlSql.dictionary){
    console.error(T$.i18n("nlSql environment has no dictionary"));
    return;
  }
  // This controls the context for blocks that need to refer to the dictionary
  T$.nlSql.blocks = new NlSqlDictionary({
        dictionary: T$.nlSql.dictionary
    });
  
  // Build the toolbox categories and load the blocks into them.
  // The blocks have a custom function T$_toolbox to make it easier to 
  // centralize the code.
  T$.on("load toolbox categories", function(ev){
    // Called once all openBlocks have been downloaded (see blocklyCode.js)
    // Don't call the buildCustomBlocks until ready otherwise the blocks won't be ready.
    T$.nlSql.blocks.buildCustomBlocks();
    var qryCat = ev.toolbox.find("category[name='" + T$.i18n('Query') + "']");
    if (!qryCat.length) 
        qryCat = $("<category name='" + T$.i18n('Query') + "'></category>").appendTo(ev.toolbox);
    // Information request
    var newCat = qryCat.find("category[name='" + T$.i18n('Information request') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Information request') + "'></category>").appendTo(qryCat);
    /*
    var blk = newCat.find('block[type="nlsql"]');
    if (!blk.length){
      Blockly.Blocks['nlsql'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql'].T$_toolbox(newCat);
    }
    */
    
    // Columns to retrieve
    newCat = qryCat.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Columns to retrieve') + "'></category>").appendTo(qryCat);
    /*
    var blk = newCat.find('block[type="nlsql_select_field"]');
    if (!blk.length){
      Blockly.Blocks['nlsql_select_field'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_column_as'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_select_field_as'].T$_toolbox(newCat);
    }
    */
    
    // Queries
    newCat = qryCat.find("category[name='" + T$.i18n('Queries') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Queries') + "'></category>").appendTo(qryCat);
    /*
    var blk = newCat.find('block[type="nlsql_query"]');
    if (!blk.length)
      Blockly.Blocks['nlsql_query'].T$_toolbox(newCat);
    */
    
    // Expressions
    newCat = qryCat.find("category[name='" + T$.i18n('Expressions') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Expressions') + "'></category>").appendTo(qryCat);
    /*
    var blk = newCat.find('block[type="nlsql_field"]');
    if (!blk.length)
      Blockly.Blocks['nlsql_field'].T$_toolbox(newCat);
    */
    
    // Output
    newCat = qryCat.find("category[name='" + T$.i18n('Output') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Output') + "'></category>").appendTo(qryCat);
    /*
    var blk = newCat.find('block[type="nlsql_js"]');
    if (!blk.length){
      Blockly.Blocks['nlsql_js'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_tsv'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_verbal_output'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_ethercalc_output'].T$_toolbox(newCat);
    }
    */

  });  
});
