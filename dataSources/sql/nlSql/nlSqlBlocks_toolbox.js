	Blockly.Blocks['nlsql_table'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Information request') + "']");
			if (cat) {
				$('<block type="nlsql_table">' +
					'<field name="tableName">name...</field>' +
					'</block>').appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_select_field'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
			if (cat) {
				var entry = '<block type="nlsql_select_field">' +
					'<field name="tableName">' + T$.i18n("table name ...") + '</field>' +
					'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_field'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Expressions') + "']");
			if (cat) {
				var entry = '<block type="nlsql_field">' +
					'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_tableField'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Expressions') + "']");
			if (cat) {
				var entry = '<block type="nlsql_tableField">' +
					'<field name="tableName">' + T$.i18n("table name ...") + '</field>' +
					'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_query'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Queries') + "']");
			if (cat) {
				var entry = '<block type="nlsql_query">' +
					'<field name="query">' + T$.i18n("query name ...") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};

	/**
	 * Block definitions that don't require context
	 */
	Blockly.Blocks['nlsql'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Information request') + "']");
			if (cat) {
				var entry = '<block type="nlsql"></block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_ethercalc_output'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
			if (cat) {
				var entry = '<block type="nlsql_ethercalc_output">' +
					'<field name="cell_name">' + T$.i18n("default") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_verbal_output'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
			if (cat) {
				var entry = '<block type="nlsql_verbal_output"></block>';
				$(entry).appendTo(cat);
			}
		}
	};

	/**
	 * SQL to Tab Separated Values
	 */
	Blockly.Blocks['nlsql_tsv'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
			if (cat) {
				var entry = '<block type="nlsql_tsv"></block>';
				$(entry).appendTo(cat);
			}
		}
	};

	/**
	 * SQL to JSON
	 */
	Blockly.Blocks['nlsql_js'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
			if (cat) {
				var entry = '<block type="nlsql_js"></block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_column_as'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
			if (cat) {
				var entry = '<block type="nlsql_column_as">' +
					'<field name="alias">' + T$.i18n("default") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};

	Blockly.Blocks['nlsql_select_field_as'].toolbox$ = function ($toolbox) {
			var cat = $toolbox.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
			if (cat) {
				var entry = '<block type="nlsql_select_field_as">' +
					'<field name="tableName">' + T$.i18n("table name ...") + '</field>' +
					'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
					'</block>';
				$(entry).appendTo(cat);
			}
		}
	};
}
