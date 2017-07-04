/**
 * These fields are defined within buildCustomBlocks because they rely on
 * the context to populate the dropdowns
 */
Blockly.Blocks['nlsql_table'] = {
	init: function () {
		var dd;
		if (T$.nlSql.blocks){
			// Running in the designer?
			dd = new Blockly.FieldDropdown(T$.nlSql.blocks.tableNames,
				function (e) {
					T$.nlSql.blocks.setPrimaryTable(e);
				});
		}else
			dd = new Blockly.FieldDropdown([["table", "table"]]);
		this.appendDummyInput()
		.appendField("Table")
		.appendField(dd, "tableName");
		this.setInputsInline(true);
		this.setOutput(true, "nlsql_tableAlias");
		this.setColour(135);
		this.setTooltip('Primary context');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_select_field'] = {
	init: function () {
		var tableFieldDd = new Blockly.FieldDropdown([["field", "field"]]);
		var tableDd;
		if (T$.nlSql.blocks){
debugger;			
			
			tableDd = new Blockly.FieldDropdown(T$.nlSql.blocks.tableNames, function (e) {
				// Clear the field dropdown but keep the same reference to the array
				// object
				var arr = tableFieldDd.getOptions();
				arr.length = 0;
				arr.push.apply(arr, T$.nlSql.blocks.getAllFieldsFor(e));
			});
		}else
			tableDd = new Blockly.FieldDropdown([["table", "table"]]);
		this.appendDummyInput()
		.appendField("Column");
		this.appendDummyInput()
		.appendField(tableDd, "tableName")
		.appendField(tableFieldDd, "fieldName");
		this.setInputsInline(true);
		this.setPreviousStatement(true, ["nlsql", "nlsql_selectFieldAlias"]);
		this.setNextStatement(true, "nlsql_selectFieldAlias");
		this.setColour(135);
		this.setTooltip('What columns to return');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_field'] = {
	init: function () {
		var tableFieldDd = new Blockly.FieldDropdown([[T$.i18n('fields'), '']]);
		if (T$.nlSql.blocks)
			T$.nlSql.blocks.addPrimaryTableField(tableFieldDd);
		this.appendDummyInput()
		.appendField("Column")
		.appendField(tableFieldDd, "fieldName");
		this.setInputsInline(true);
		this.setOutput(true);
		//this.setOutput(true, "db_fieldAlias");
		this.setColour(135);
		this.setTooltip('Field');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_tableField'] = {
	init: function () {
		var tableFieldDd = new Blockly.FieldDropdown([[T$.i18n('fields'), "field"]]);
		var tableDd;
		if (T$.nlSql.blocks){
debugger;			
			tableDd = new Blockly.FieldDropdown(T$.nlSql.blocks.tableNames, function (e) {
				// Clear the field dropdown but keep the same reference to the array
				// object
				var arr = tableFieldDd.getOptions();
				arr.length = 0;
				arr.push.apply(arr, T$.nlSql.blocks.getAllFieldsFor(e));
			});
		}else
			tableDd = new Blockly.FieldDropdown([["table", "table"]]);
		this.appendDummyInput()
		.appendField("Column")
		.appendField(tableDd, "tableName")
		.appendField(tableFieldDd, "fieldName");
		this.setInputsInline(true);
		this.setOutput(true);
		this.setColour(135);
		this.setTooltip('Table column');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_query'] = {
	init: function () {
		var queryDd = new Blockly.FieldDropdown([[T$.i18n('Query...'), ""]]);
		if (T$.nlSql.blocks){
			// Running in the designer?
			T$.nlSql.blocks.setQuery(queryDd);
			T$.nlSql.blocks.setValidQueries();
		}
		this.appendDummyInput()
		.appendField(queryDd, "query");
		this.setOutput(true, "nlsql_namedQuery");
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

/**
 * Block definitions that don't require context
 */
Blockly.Blocks['nlsql'] = {
	init: function () {
		this.appendValueInput("context")
		.setCheck("nlsql_tableAlias")
		.appendField(T$.i18n("Context"));
		this.appendStatementInput("columns")
		.setCheck("nlsql_selectFieldAlias")
		.appendField(T$.i18n("Columns"));
		this.appendValueInput("query")
		.setCheck("nlsql_namedQuery")
		.appendField(T$.i18n("Named query"));
		this.appendValueInput("whereClause")
		.setCheck("Boolean")
		.appendField(T$.i18n("Where"));
		this.setOutput(true, null);
		//this.setPreviousStatement(true, "statement");
		//this.setNextStatement(true, ["statement", "nlSqlOutput"]);
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
		//T$_editor.document.register(this);
		// Code attached to block.IOTKEY is attached to the codeBlock "generate" event
		// during a move operation. See onWorkSpaceChange
		/*
		this.T$ = {
		onGenerate: function (ev) {
		ev.type = "chat";
		},
		onAttach: function(newParentId, oldParentId){
		T$_editor.document.getBlockById(newParentId).addFeature("NL_SQL");
		if (oldParentId)
		T$_editor.document.getBlockById(oldParentId).removeFeature("NL_SQL");
		}
		};
		 */
	}
};

Blockly.Blocks['nlsql_ethercalc_output'] = {
	init: function () {
		this.appendDummyInput()
		.appendField(T$.i18n("Spreadsheet cell"))
		.appendField(new Blockly.FieldTextInput("default"), "cell_name");
		this.setPreviousStatement(true, "nlSqlOutput");
		//this.setOutput(true, "nlSqlOutput");
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_verbal_output'] = {
	init: function () {
		this.appendDummyInput()
		.appendField(T$.i18n("Verbal"));
		this.setPreviousStatement(true, "nlSqlOutput");
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
		// Code attached to block.IOTKEY is attached to the codeBlock "generate" event
		// during a move operation. See onWorkSpaceChange
		/*
		this.T$ = {
		onGenerate: function (ev) {
		ev.code = "tell me " + ev.code.trim();
		}
		};
		 */
	}
};

/**
 * SQL to Tab Separated Values
 */
Blockly.Blocks['nlsql_tsv'] = {
	init: function () {
		this.appendDummyInput()
		        .appendField("Execute");
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("item"), "inputVariable");
		this.appendDummyInput()
			.appendField("output TSV into");
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("item"), "outputVariable");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
		// Code attached to block.IOTKEY is attached to the codeBlock "generate" event
		// during a move operation. See onWorkSpaceChange
		/*
		T$_editor.document.addBlock(this)
		.setAttribute("requires", "TSVfromSQL");
		 */
		/*
		this.T$ = {
		onAttach: function(newParentId, oldParentId){
		T$_editor.document.getBlockById(newParentId).setDataType("TSV");
		if (oldParentId)
		T$_editor.document.getBlockById(oldParentId).clearDataType();
		}
		};
		 */
	}
};

/**
 * SQL to JSON
 */
Blockly.Blocks['nlsql_js'] = {
	init: function () {
		this.appendDummyInput()
		        .appendField("Execute");
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("item"), "inputVariable");
		this.appendDummyInput()
			.appendField("output rows into");
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("item"), "outputVariable");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_column_as'] = {
	init: function () {
		this.appendDummyInput()
		.appendField("as")
		.appendField(new Blockly.FieldTextInput("default"), "alias");
		this.setOutput(true, "nlsql_columnAs");
		this.setColour(230);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.Blocks['nlsql_select_field_as'] = {
	init: function () {
		this.appendDummyInput()
		.appendField("Column");
		this.appendValueInput("table")
		.setCheck("nlsql_columnAs")
		.appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "tableName")
		.appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "fieldName");
		this.setInputsInline(true);
		this.setPreviousStatement(true, ["nlsql", "nlsql_selectFieldAlias"]);
		this.setNextStatement(true, "nlsql_selectFieldAlias");
		this.setColour(135);
		this.setTooltip('What columns to return');
		this.setHelpUrl('');
	}
};
