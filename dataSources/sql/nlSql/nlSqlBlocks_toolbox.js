$.extend(Blockly.Blocks['nlsql_table'], {
	toolbox$: function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Information request') + "']");
		if (cat) {
			$('<block type="nlsql_table">' +
				'<field name="tableName">name...</field>' +
				'</block>').appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_select_field'], {
	toolbox$: function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
		if (cat) {
			var entry = '<block type="nlsql_select_field">' +
				'<field name="tableName">' + T$.i18n("table name ...") + '</field>' +
				'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_field'],{
	toolbox$: function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Expressions') + "']");
		if (cat) {
			var entry = '<block type="nlsql_field">' +
				'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_tableField'], {
	toolbox$ = function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Expressions') + "']");
		if (cat) {
			var entry = '<block type="nlsql_tableField">' +
				'<field name="tableName">' + T$.i18n("table name ...") + '</field>' +
				'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_query'], {
	toolbox$: function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Queries') + "']");
		if (cat) {
			var entry = '<block type="nlsql_query">' +
				'<field name="query">' + T$.i18n("query name ...") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});

/**
 * Block definitions that don't require context
 */
$.extend(Blockly.Blocks['nlsql'], {
	toolbox$: function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Information request') + "']");
		if (cat) {
			var entry = '<block type="nlsql"></block>';
			$(entry).appendTo(cat);
		}
	},
	oncreate$: function (ev) {
		var me = this;
		this.on("generate", function (ev) {
			ev.type = "chat";
		});
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
		/**
		 *  Attaching to another block
		 */
		this.on("attach", function (ev) {
			console.log("attach");
			this.fire("required feature", {
				feature: "NL_SQL"
			});
			/*
			var newId = ev.newParentId,
			oldId = ev.oldParentId;
			T$_editor.document.getBlockById(newId).addFeature("NL_SQL");
			if (oldId)
				T$_editor.document.getBlockById(oldId).removeFeature("NL_SQL");
			*/
		});
	}
});

$.extend(Blockly.Blocks['nlsql_ethercalc_output'], {
	toolbox$: function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
		if (cat) {
			var entry = '<block type="nlsql_ethercalc_output">' +
				'<field name="cell_name">' + T$.i18n("default") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_verbal_output'], {
	toolbox$ = function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
		if (cat) {
			var entry = '<block type="nlsql_verbal_output"></block>';
			$(entry).appendTo(cat);
		}
	}
});
/**
 *  The block has been created on the main workspace
 */
$.extend(Blockly.Blocks['nlsql_verbal_output'], {
	oncreate$: function (ev) {
		this.on("generate", function (ev) {
			ev.code = "tell me " + ev.code.trim();
		});
	}
};

/**
 * SQL to Tab Separated Values
 */
$.extend(Blockly.Blocks['nlsql_tsv'], {
	 toolbox$ = function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
		if (cat) {
			var entry = '<block type="nlsql_tsv"></block>';
			$(entry).appendTo(cat);
		}
	}
});

/**
 * SQL to JSON
 */
$.extend(Blockly.Blocks['nlsql_js'], {
	toolbox$ = function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Output') + "']");
		if (cat) {
			var entry = '<block type="nlsql_js"></block>';
			$(entry).appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_column_as'], {
	toolbox$ = function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
		if (cat) {
			var entry = '<block type="nlsql_column_as">' +
				'<field name="alias">' + T$.i18n("default") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});

$.extend(Blockly.Blocks['nlsql_select_field_as'], {
	toolbox$ = function ($toolbox) {
		var cat = $toolbox.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
		if (cat) {
			var entry = '<block type="nlsql_select_field_as">' +
				'<field name="tableName">' + T$.i18n("table name ...") + '</field>' +
				'<field name="fieldName">' + T$.i18n("field name ...") + '</field>' +
				'</block>';
			$(entry).appendTo(cat);
		}
	}
});
