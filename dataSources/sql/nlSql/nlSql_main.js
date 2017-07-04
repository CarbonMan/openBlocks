$(function () {
  if (!T$.nlSql){
    console.error(T$.i18n("nlSql environment is not available"));
    return;
  }
  if (!T$.db.dictionary){
    console.error(T$.i18n("db environment has no dictionary"));
    return;
  }
  // This controls the context for blocks that need to refer to the dictionary
  T$_editor.on("resources setup", function(){
    T$.nlSql.blocks = new NlSqlDictionary({
          dictionary: T$.db.dictionary
      });
    /*
		T$.nlSql.blocks.on("add blocks", function () {
			addBlocks.apply(T$.nlSql.blocks);
		});
    */
  });
  /*
	T$_editor.on("resources ready", function () {
		T$.nlSql.blocks.on("add blocks", function () {
			addBlocks.apply(T$.nlSql.blocks);
		});
	});
  */
  // Build the toolbox categories and load the blocks into them.
  // The blocks have a custom function toolbox$ to make it easier to 
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
    
    // Columns to retrieve
    newCat = qryCat.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Columns to retrieve') + "'></category>").appendTo(qryCat);
    
    // Queries
    newCat = qryCat.find("category[name='" + T$.i18n('Queries') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Queries') + "'></category>").appendTo(qryCat);
    
    // Expressions
    newCat = qryCat.find("category[name='" + T$.i18n('Expressions') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Expressions') + "'></category>").appendTo(qryCat);
    
    // Output
    newCat = qryCat.find("category[name='" + T$.i18n('Output') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Output') + "'></category>").appendTo(qryCat);

  });  
});
