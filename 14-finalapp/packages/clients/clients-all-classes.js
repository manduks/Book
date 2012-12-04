/*
Copyright(c) 2012 Company Name
*/
/**
 * @class MyApp.model.clients.Client
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Client's model
 */

Ext.define('MyApp.model.clients.Client', {
    extend:'Ext.data.Model',

    fields:[
        'id','name','contact','address','phone'
    ]
});
/**
 * @class MyApp.store.clients.Clients
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * A collection of clients, this store will make an ajax request to retrieve clients from
 * the server in JSON format.
 */

Ext.define('MyApp.store.clients.Clients',{
	extend      : 'Ext.data.Store',
	alias       : 'store.clients',
	model		: 'MyApp.model.clients.Client',

	proxy		: {
		type	: 'ajax',
		url		: 'serverside/clients/list',
		reader	: {
			type	: 'json',
			root	: 'data'
		}
	}
});
/**
 * A basic hidden field for storing hidden values in forms that need to be passed in the form submit.
 *
 * This creates an actual input element with type="submit" in the DOM. While its label is
 * {@link #hideLabel not rendered} by default, it is still a real component and may be sized according
 * to its owner container's layout.
 *
 * Because of this, in most cases it is more convenient and less problematic to simply
 * {@link Ext.form.action.Action#params pass hidden parameters} directly when
 * {@link Ext.form.Basic#submit submitting the form}.
 *
 * Example:
 *
 *     new Ext.form.Panel({
 *         title: 'My Form',
 *         items: [{
 *             xtype: 'textfield',
 *             fieldLabel: 'Text Field',
 *             name: 'text_field',
 *             value: 'value from text field'
 *         }, {
 *             xtype: 'hiddenfield',
 *             name: 'hidden_field_1',
 *             value: 'value from hidden field'
 *         }],
 *
 *         buttons: [{
 *             text: 'Submit',
 *             handler: function() {
 *                 this.up('form').getForm().submit({
 *                     params: {
 *                         hidden_field_2: 'value from submit call'
 *                     }
 *                 });
 *             }
 *         }]
 *     });
 *
 * Submitting the above form will result in three values sent to the server:
 *
 *     text_field=value+from+text+field&hidden;_field_1=value+from+hidden+field&hidden_field_2=value+from+submit+call
 *
 */
Ext.define('Ext.form.field.Hidden', {
    extend:'Ext.form.field.Base',
    alias: ['widget.hiddenfield', 'widget.hidden'],
    alternateClassName: 'Ext.form.Hidden',

    // private
    inputType : 'hidden',
    hideLabel: true,
    
    initComponent: function(){
        this.formItemCls += '-hidden';
        this.callParent();    
    },
    
    /**
     * @private
     * Override. Treat undefined and null values as equal to an empty string value.
     */
    isEqual: function(value1, value2) {
        return this.isEqualAsString(value1, value2);
    },

    // These are all private overrides
    initEvents: Ext.emptyFn,
    setSize : Ext.emptyFn,
    setWidth : Ext.emptyFn,
    setHeight : Ext.emptyFn,
    setPosition : Ext.emptyFn,
    setPagePosition : Ext.emptyFn,
    markInvalid : Ext.emptyFn,
    clearInvalid : Ext.emptyFn
});

/**
 * Produces optimized XTemplates for chunks of tables to be
 * used in grids, trees and other table based widgets.
 */
Ext.define('Ext.view.TableChunker', {
    singleton: true,
    requires: ['Ext.XTemplate'],
    metaTableTpl: [
        '{%if (this.openTableWrap)out.push(this.openTableWrap())%}',
        '<table class="' + Ext.baseCSSPrefix + 'grid-table ' + Ext.baseCSSPrefix + 'grid-table-resizer" border="0" cellspacing="0" cellpadding="0" {[this.embedFullWidth(values)]}>',
            '<tbody>',
            '<tr class="' + Ext.baseCSSPrefix + 'grid-header-row">',
            '<tpl for="columns">',
                '<th class="' + Ext.baseCSSPrefix + 'grid-col-resizer-{id}" style="width: {width}px; height: 0px;"></th>',
            '</tpl>',
            '</tr>',
            '{[this.openRows()]}',
                '{row}',
                '<tpl for="features">',
                    '{[this.embedFeature(values, parent, xindex, xcount)]}',
                '</tpl>',
            '{[this.closeRows()]}',
            '</tbody>',
        '</table>',
        '{%if (this.closeTableWrap)out.push(this.closeTableWrap())%}'
    ],

    constructor: function() {
        Ext.XTemplate.prototype.recurse = function(values, reference) {
            return this.apply(reference ? values[reference] : values);
        };
    },

    embedFeature: function(values, parent, x, xcount) {
        var tpl = '';
        if (!values.disabled) {
            tpl = values.getFeatureTpl(values, parent, x, xcount);
        }
        return tpl;
    },

    embedFullWidth: function(values) {
        var result = 'style="width:{fullWidth}px;';

        // If there are no records, we need to give the table a height so that it
        // is displayed and causes q scrollbar if the width exceeds the View's width.
        if (!values.rowCount) {
            result += 'height:1px;';
        }
        return result + '"';
    },

    openRows: function() {
        return '<tpl for="rows">';
    },

    closeRows: function() {
        return '</tpl>';
    },

    metaRowTpl: [
        '<tr class="' + Ext.baseCSSPrefix + 'grid-row {[this.embedRowCls()]}" {[this.embedRowAttr()]}>',
            '<tpl for="columns">',
                '<td class="{cls} ' + Ext.baseCSSPrefix + 'grid-cell ' + Ext.baseCSSPrefix + 'grid-cell-{columnId} {{id}-modified} {{id}-tdCls} {[this.firstOrLastCls(xindex, xcount)]}" {{id}-tdAttr}>',
                    '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner {unselectableCls}" style="text-align: {align}; {{id}-style};">{{id}}</div>',
                '</td>',
            '</tpl>',
        '</tr>'
    ],

    firstOrLastCls: function(xindex, xcount) {
        if (xindex === 1) {
            return Ext.view.Table.prototype.firstCls;
        } else if (xindex === xcount) {
            return Ext.view.Table.prototype.lastCls;
        }
    },
    
    embedRowCls: function() {
        return '{rowCls}';
    },
    
    embedRowAttr: function() {
        return '{rowAttr}';
    },
    
    openTableWrap: undefined,
    
    closeTableWrap: undefined,

    getTableTpl: function(cfg, textOnly) {
        var tpl,
            tableTplMemberFns = {
                openRows: this.openRows,
                closeRows: this.closeRows,
                embedFeature: this.embedFeature,
                embedFullWidth: this.embedFullWidth,
                openTableWrap: this.openTableWrap,
                closeTableWrap: this.closeTableWrap
            },
            tplMemberFns = {},
            features = cfg.features || [],
            ln = features.length,
            i  = 0,
            memberFns = {
                embedRowCls: this.embedRowCls,
                embedRowAttr: this.embedRowAttr,
                firstOrLastCls: this.firstOrLastCls,
                unselectableAttr: cfg.enableTextSelection ? '' : 'unselectable="on"',
                unselectableCls: cfg.enableTextSelection ? '' : Ext.baseCSSPrefix + 'unselectable'
            },
            // copy the default
            metaRowTpl = Array.prototype.slice.call(this.metaRowTpl, 0),
            metaTableTpl;
            
        for (; i < ln; i++) {
            if (!features[i].disabled) {
                features[i].mutateMetaRowTpl(metaRowTpl);
                Ext.apply(memberFns, features[i].getMetaRowTplFragments());
                Ext.apply(tplMemberFns, features[i].getFragmentTpl());
                Ext.apply(tableTplMemberFns, features[i].getTableFragments());
            }
        }
        
        metaRowTpl = new Ext.XTemplate(metaRowTpl.join(''), memberFns);
        cfg.row = metaRowTpl.applyTemplate(cfg);
        
        metaTableTpl = new Ext.XTemplate(this.metaTableTpl.join(''), tableTplMemberFns);
        
        tpl = metaTableTpl.applyTemplate(cfg);
        
        // TODO: Investigate eliminating.
        if (!textOnly) {
            tpl = new Ext.XTemplate(tpl, tplMemberFns);
        }
        return tpl;
        
    }
});

/**
 * A mixin for {@link Ext.container.Container} components that are likely to have form fields in their
 * items subtree. Adds the following capabilities:
 *
 * - Methods for handling the addition and removal of {@link Ext.form.Labelable} and {@link Ext.form.field.Field}
 *   instances at any depth within the container.
 * - Events ({@link #fieldvaliditychange} and {@link #fielderrorchange}) for handling changes to the state
 *   of individual fields at the container level.
 * - Automatic application of {@link #fieldDefaults} config properties to each field added within the
 *   container, to facilitate uniform configuration of all fields.
 *
 * This mixin is primarily for internal use by {@link Ext.form.Panel} and {@link Ext.form.FieldContainer},
 * and should not normally need to be used directly. @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.form.FieldAncestor', {

    /**
     * @cfg {Object} fieldDefaults
     * If specified, the properties in this object are used as default config values for each {@link Ext.form.Labelable}
     * instance (e.g. {@link Ext.form.field.Base} or {@link Ext.form.FieldContainer}) that is added as a descendant of
     * this container. Corresponding values specified in an individual field's own configuration, or from the {@link
     * Ext.container.Container#defaults defaults config} of its parent container, will take precedence. See the
     * documentation for {@link Ext.form.Labelable} to see what config options may be specified in the fieldDefaults.
     *
     * Example:
     *
     *     new Ext.form.Panel({
     *         fieldDefaults: {
     *             labelAlign: 'left',
     *             labelWidth: 100
     *         },
     *         items: [{
     *             xtype: 'fieldset',
     *             defaults: {
     *                 labelAlign: 'top'
     *             },
     *             items: [{
     *                 name: 'field1'
     *             }, {
     *                 name: 'field2'
     *             }]
     *         }, {
     *             xtype: 'fieldset',
     *             items: [{
     *                 name: 'field3',
     *                 labelWidth: 150
     *             }, {
     *                 name: 'field4'
     *             }]
     *         }]
     *     });
     *
     * In this example, field1 and field2 will get labelAlign:'top' (from the fieldset's defaults) and labelWidth:100
     * (from fieldDefaults), field3 and field4 will both get labelAlign:'left' (from fieldDefaults and field3 will use
     * the labelWidth:150 from its own config.
     */


    /**
     * Initializes the FieldAncestor's state; this must be called from the initComponent method of any components
     * importing this mixin.
     * @protected
     */
    initFieldAncestor: function() {
        var me = this,
            onSubtreeChange = me.onFieldAncestorSubtreeChange;

        me.addEvents(
            /**
             * @event fieldvaliditychange
             * Fires when the validity state of any one of the {@link Ext.form.field.Field} instances within this
             * container changes.
             * @param {Ext.form.FieldAncestor} this
             * @param {Ext.form.Labelable} The Field instance whose validity changed
             * @param {String} isValid The field's new validity state
             */
            'fieldvaliditychange',

            /**
             * @event fielderrorchange
             * Fires when the active error message is changed for any one of the {@link Ext.form.Labelable} instances
             * within this container.
             * @param {Ext.form.FieldAncestor} this
             * @param {Ext.form.Labelable} The Labelable instance whose active error was changed
             * @param {String} error The active error message
             */
            'fielderrorchange'
        );

        // Catch addition and removal of descendant fields
        me.on('add', onSubtreeChange, me);
        me.on('remove', onSubtreeChange, me);

        me.initFieldDefaults();
    },

    /**
     * @private Initialize the {@link #fieldDefaults} object
     */
    initFieldDefaults: function() {
        if (!this.fieldDefaults) {
            this.fieldDefaults = {};
        }
    },

    /**
     * @private
     * Handle the addition and removal of components in the FieldAncestor component's child tree.
     */
    onFieldAncestorSubtreeChange: function(parent, child) {
        var me = this,
            isAdding = !!child.ownerCt;

        function handleCmp(cmp) {
            var isLabelable = cmp.isFieldLabelable,
                isField = cmp.isFormField;
            if (isLabelable || isField) {
                if (isLabelable) {
                    me['onLabelable' + (isAdding ? 'Added' : 'Removed')](cmp);
                }
                if (isField) {
                    me['onField' + (isAdding ? 'Added' : 'Removed')](cmp);
                }
            }
            else if (cmp.isContainer) {
                Ext.Array.forEach(cmp.getRefItems(), handleCmp);
            }
        }
        handleCmp(child);
    },

    /**
     * Called when a {@link Ext.form.Labelable} instance is added to the container's subtree.
     * @param {Ext.form.Labelable} labelable The instance that was added
     * @protected
     */
    onLabelableAdded: function(labelable) {
        var me = this;

        // buffer slightly to avoid excessive firing while sub-fields are changing en masse
        me.mon(labelable, 'errorchange', me.handleFieldErrorChange, me, {buffer: 10});

        labelable.setFieldDefaults(me.fieldDefaults);
    },

    /**
     * Called when a {@link Ext.form.field.Field} instance is added to the container's subtree.
     * @param {Ext.form.field.Field} field The field which was added
     * @protected
     */
    onFieldAdded: function(field) {
        var me = this;
        me.mon(field, 'validitychange', me.handleFieldValidityChange, me);
    },

    /**
     * Called when a {@link Ext.form.Labelable} instance is removed from the container's subtree.
     * @param {Ext.form.Labelable} labelable The instance that was removed
     * @protected
     */
    onLabelableRemoved: function(labelable) {
        var me = this;
        me.mun(labelable, 'errorchange', me.handleFieldErrorChange, me);
    },

    /**
     * Called when a {@link Ext.form.field.Field} instance is removed from the container's subtree.
     * @param {Ext.form.field.Field} field The field which was removed
     * @protected
     */
    onFieldRemoved: function(field) {
        var me = this;
        me.mun(field, 'validitychange', me.handleFieldValidityChange, me);
    },

    /**
     * @private Handle validitychange events on sub-fields; invoke the aggregated event and method
     */
    handleFieldValidityChange: function(field, isValid) {
        var me = this;
        me.fireEvent('fieldvaliditychange', me, field, isValid);
        me.onFieldValidityChange(field, isValid);
    },

    /**
     * @private Handle errorchange events on sub-fields; invoke the aggregated event and method
     */
    handleFieldErrorChange: function(labelable, activeError) {
        var me = this;
        me.fireEvent('fielderrorchange', me, labelable, activeError);
        me.onFieldErrorChange(labelable, activeError);
    },

    /**
     * Fired when the validity of any field within the container changes.
     * @param {Ext.form.field.Field} field The sub-field whose validity changed
     * @param {Boolean} valid The new validity state
     * @protected
     */
    onFieldValidityChange: Ext.emptyFn,

    /**
     * Fired when the error message of any field within the container changes.
     * @param {Ext.form.Labelable} field The sub-field whose active error changed
     * @param {String} error The new active error message
     * @protected
     */
    onFieldErrorChange: Ext.emptyFn

});
/**
 * @author Nicolas Ferrero
 *
 * TablePanel is the basis of both {@link Ext.tree.Panel TreePanel} and {@link Ext.grid.Panel GridPanel}.
 *
 * TablePanel aggregates:
 *
 *  - a Selection Model
 *  - a View
 *  - a Store
 *  - Scrollers
 *  - Ext.grid.header.Container
 */
Ext.define('Ext.panel.Table', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.tablepanel',

    uses: [
        'Ext.selection.RowModel',
        'Ext.grid.PagingScroller',
        'Ext.grid.header.Container',
        'Ext.grid.Lockable'
    ],

    extraBaseCls: Ext.baseCSSPrefix + 'grid',
    extraBodyCls: Ext.baseCSSPrefix + 'grid-body',

    layout: 'fit',
    /**
     * @property {Boolean} hasView
     * True to indicate that a view has been injected into the panel.
     */
    hasView: false,

    // each panel should dictate what viewType and selType to use
    /**
     * @cfg {String} viewType
     * An xtype of view to use. This is automatically set to 'gridview' by {@link Ext.grid.Panel Grid}
     * and to 'treeview' by {@link Ext.tree.Panel Tree}.
     */
    viewType: null,

    /**
     * @cfg {Object} viewConfig
     * A config object that will be applied to the grid's UI view. Any of the config options available for
     * {@link Ext.view.Table} can be specified here. This option is ignored if {@link #view} is specified.
     */

    /**
     * @cfg {Ext.view.Table} view
     * The {@link Ext.view.Table} used by the grid. Use {@link #viewConfig} to just supply some config options to
     * view (instead of creating an entire View instance).
     */

    /**
     * @cfg {String} selType
     * An xtype of selection model to use. Defaults to 'rowmodel'. This is used to create selection model if just
     * a config object or nothing at all given in {@link #selModel} config.
     */
    selType: 'rowmodel',

    /**
     * @cfg {Ext.selection.Model/Object} selModel
     * A {@link Ext.selection.Model selection model} instance or config object.  In latter case the {@link #selType}
     * config option determines to which type of selection model this config is applied.
     */

    /**
     * @cfg {Boolean} multiSelect
     * True to enable 'MULTI' selection mode on selection model. See {@link Ext.selection.Model#mode}.
     */

    /**
     * @cfg {Boolean} simpleSelect
     * True to enable 'SIMPLE' selection mode on selection model. See {@link Ext.selection.Model#mode}.
     */

    /**
     * @cfg {Ext.data.Store} store (required)
     * The {@link Ext.data.Store Store} the grid should use as its data source.
     */

    /**
     * @cfg {String/Boolean} scroll
     * Scrollers configuration. Valid values are 'both', 'horizontal' or 'vertical'.
     * True implies 'both'. False implies 'none'.
     */
    scroll: true,

    /**
     * @cfg {Ext.grid.column.Column[]/Object} columns
     * An array of {@link Ext.grid.column.Column column} definition objects which define all columns that appear in this
     * grid. Each column definition provides the header text for the column, and a definition of where the data for that
     * column comes from.
     *
     * This can also be a configuration object for a {Ext.grid.header.Container HeaderContainer} which may override
     * certain default configurations if necessary. For example, the special layout may be overridden to use a simpler
     * layout, or one can set default values shared by all columns:
     * 
     *     columns: {
     *         items: [
     *             {
     *                 text: "Column A"
     *                 dataIndex: "field_A"
     *             },{
     *                 text: "Column B",
     *                 dataIndex: "field_B"
     *             }, 
     *             ...
     *         ],
     *         defaults: {
     *             flex: 1
     *         }
     *     }
     */

    /**
     * @cfg {Boolean} forceFit
     * Ttrue to force the columns to fit into the available width. Headers are first sized according to configuration,
     * whether that be a specific width, or flex. Then they are all proportionally changed in width so that the entire
     * content width is used.
     */

    /**
     * @cfg {Ext.grid.feature.Feature[]} features
     * An array of grid Features to be added to this grid. See {@link Ext.grid.feature.Feature} for usage.
     */

    /**
     * @cfg {Boolean} [hideHeaders=false]
     * True to hide column headers.
     */

    /**
     * @cfg {Boolean} deferRowRender
     * Defaults to true to enable deferred row rendering.
     *
     * This allows the View to execute a refresh quickly, with the expensive update of the row structure deferred so
     * that layouts with GridPanels appear, and lay out more quickly.
     */

    /**
     * @cfg {Object} verticalScroller
     * A config object to be used when configuring the {@link Ext.grid.PagingScroller scroll monitor} to control
     * refreshing of data in an "infinite grid".
     * 
     * Configurations of this object allow fine tuning of data caching which can improve performance and usability
     * of the infinite grid.
     */

    deferRowRender: true,
     
    /**
     * @cfg {Boolean} sortableColumns
     * False to disable column sorting via clicking the header and via the Sorting menu items.
     */
    sortableColumns: true,

    /**
     * @cfg {Boolean} [enableLocking=false]
     * True to enable locking support for this grid. Alternatively, locking will also be automatically
     * enabled if any of the columns in the column configuration contain the locked config option.
     */
    enableLocking: false,

    // private property used to determine where to go down to find views
    // this is here to support locking.
    scrollerOwner: true,

    /**
     * @cfg {Boolean} [enableColumnMove=true]
     * False to disable column dragging within this grid.
     */
    enableColumnMove: true,
    
    /**
     * @cfg {Boolean} [restrictColumnReorder=false]
     * True to constrain column dragging so that a column cannot be dragged in or out of it's
     * current group. Only relevant while {@link #enableColumnMove} is enabled.
     */
    restrictColumnReorder: false,

    /**
     * @cfg {Boolean} [enableColumnResize=true]
     * False to disable column resizing within this grid.
     */
    enableColumnResize: true,

    /**
     * @cfg {Boolean} [enableColumnHide=true]
     * False to disable column hiding within this grid.
     */
    enableColumnHide: true,

    /**
     * @cfg {Boolean} columnLines Adds column line styling
     */

    /**
     * @cfg {Boolean} [rowLines=true] Adds row line styling
     */
    rowLines: true,

    /**
     * @cfg {Boolean} [disableSelection=false]
     * True to disable selection model.
     */

    /**
     * @cfg {String} emptyText Default text (html tags are accepted) to display in the Panel body when the Store
     * is empty. When specified, and the Store is empty, the text will be rendered inside a DIV with the CSS class "x-grid-empty".
     */

    /**
     * @property {Boolean} optimizedColumnMove
     * If you are writing a grid plugin or a {Ext.grid.feature.Feature Feature} which creates a column-based structure which
     * needs a view refresh when columns are moved, then set this property in the grid.
     *
     * An example is the built in {@link Ext.grid.feature.AbstractSummary Summary} Feature. This creates summary rows, and the
     * summary columns must be in the same order as the data columns. This plugin sets the `optimizedColumnMove` to `false.
     */

    initComponent: function() {
        if (!this.viewType) {
            Ext.Error.raise("You must specify a viewType config.");
        }
        if (this.headers) {
            Ext.Error.raise("The headers config is not supported. Please specify columns instead.");
        }

        var me          = this,
            scroll      = me.scroll,
            vertical    = false,
            horizontal  = false,
            headerCtCfg = me.columns || me.colModel,
            view,
            border = me.border,
            i, len;

        if (me.columnLines) {
            me.addCls(Ext.baseCSSPrefix + 'grid-with-col-lines');
        }

        if (me.rowLines) {
            me.addCls(Ext.baseCSSPrefix + 'grid-with-row-lines');
        }

        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
        me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');

        if (!headerCtCfg) {
            Ext.Error.raise("A column configuration must be specified");
        }

        // The columns/colModel config may be either a fully instantiated HeaderContainer, or an array of Column definitions, or a config object of a HeaderContainer
        // Either way, we extract a columns property referencing an array of Column definitions.
        if (headerCtCfg instanceof Ext.grid.header.Container) {
            me.headerCt = headerCtCfg;
            me.headerCt.border = border;
            me.columns = me.headerCt.items.items;
        } else {
            if (Ext.isArray(headerCtCfg)) {
                headerCtCfg = {
                    items: headerCtCfg,
                    border: border
                };
            }
            Ext.apply(headerCtCfg, {
                forceFit: me.forceFit,
                sortable: me.sortableColumns,
                enableColumnMove: me.enableColumnMove,
                enableColumnResize: me.enableColumnResize,
                enableColumnHide: me.enableColumnHide,
                border:  border,
                restrictReorder: me.restrictColumnReorder
            });
            me.columns = headerCtCfg.items;

             // If any of the Column objects contain a locked property, and are not processed, this is a lockable TablePanel, a
             // special view will be injected by the Ext.grid.Lockable mixin, so no processing of .
             if (me.enableLocking || Ext.ComponentQuery.query('{locked !== undefined}{processed != true}', me.columns).length) {
                 me.self.mixin('lockable', Ext.grid.Lockable);
                 me.injectLockable();
             }
        }

        me.scrollTask = new Ext.util.DelayedTask(me.syncHorizontalScroll, me);

        me.addEvents(
            // documented on GridPanel
            'reconfigure',
            /**
             * @event viewready
             * Fires when the grid view is available (use this for selecting a default row).
             * @param {Ext.panel.Table} this
             */
            'viewready'
        );

        me.bodyCls = me.bodyCls || '';
        me.bodyCls += (' ' + me.extraBodyCls);
        
        me.cls = me.cls || '';
        me.cls += (' ' + me.extraBaseCls);

        // autoScroll is not a valid configuration
        delete me.autoScroll;

        // If this TablePanel is lockable (Either configured lockable, or any of the defined columns has a 'locked' property)
        // than a special lockable view containing 2 side-by-side grids will have been injected so we do not need to set up any UI.
        if (!me.hasView) {

            // If we were not configured with a ready-made headerCt (either by direct config with a headerCt property, or by passing
            // a HeaderContainer instance as the 'columns' property, then go ahead and create one from the config object created above.
            if (!me.headerCt) {
                me.headerCt = new Ext.grid.header.Container(headerCtCfg);
            }

            // Extract the array of Column objects
            me.columns = me.headerCt.items.items;

            // If the Store is paging blocks of the dataset in, then it can only be sorted remotely.
            if (me.store.buffered && !me.store.remoteSort) {
                for (i = 0, len = me.columns.length; i < len; i++) {
                    me.columns[i].sortable = false;
                }
            }

            if (me.hideHeaders) {
                me.headerCt.height = 0;
                me.headerCt.addCls(Ext.baseCSSPrefix + 'grid-header-ct-hidden');
                me.addCls(Ext.baseCSSPrefix + 'grid-header-hidden');
                // IE Quirks Mode fix
                // If hidden configuration option was used, several layout calculations will be bypassed.
                if (Ext.isIEQuirks) {
                    me.headerCt.style = {
                        display: 'none'
                    };
                }
            }

            // turn both on.
            if (scroll === true || scroll === 'both') {
                vertical = horizontal = true;
            } else if (scroll === 'horizontal') {
                horizontal = true;
            } else if (scroll === 'vertical') {
                vertical = true;
            }

            me.relayHeaderCtEvents(me.headerCt);
            me.features = me.features || [];
            if (!Ext.isArray(me.features)) {
                me.features = [me.features];
            }
            me.dockedItems = [].concat(me.dockedItems || []);
            me.dockedItems.unshift(me.headerCt);
            me.viewConfig = me.viewConfig || {};

            // Buffered scrolling must preserve scroll on refresh
            if (me.store && me.store.buffered) {
                me.viewConfig.preserveScrollOnRefresh = true;
            } else if (me.invalidateScrollerOnRefresh !== undefined) {
                me.viewConfig.preserveScrollOnRefresh = !me.invalidateScrollerOnRefresh;
            }

            // AbstractDataView will look up a Store configured as an object
            // getView converts viewConfig into a View instance
            view = me.getView();

            me.items = [view];
            me.hasView = true;

            if (vertical) {
                // If the Store is buffered, create a PagingScroller to monitor the View's scroll progress,
                // load the Store's prefetch buffer when it detects we are nearing an edge.
                if (me.store.buffered) {
                    me.verticalScroller = new Ext.grid.PagingScroller(Ext.apply({
                        panel: me,
                        store: me.store,
                        view: me.view
                    }, me.verticalScroller));
                }
            }

            if (horizontal) {
                // Add a listener to synchronize the horizontal scroll position of the headers
                // with the table view's element... Unless we are not showing headers!
                if (!me.hideHeaders) {
                    view.on({
                        scroll: {
                            fn: me.onHorizontalScroll,
                            element: 'el',
                            scope: me
                        }
                    });
                }
            }

            me.mon(view.store, {
                load: me.onStoreLoad,
                scope: me
            });
            me.mon(view, {
                viewready: me.onViewReady,
                refresh: me.onRestoreHorzScroll,
                scope: me
            });
        }

        // Relay events from the View whether it be a LockingView, or a regular GridView
        this.relayEvents(me.view, [
            /**
             * @event beforeitemmousedown
             * @inheritdoc Ext.view.View#beforeitemmousedown
             */
            'beforeitemmousedown',
            /**
             * @event beforeitemmouseup
             * @inheritdoc Ext.view.View#beforeitemmouseup
             */
            'beforeitemmouseup',
            /**
             * @event beforeitemmouseenter
             * @inheritdoc Ext.view.View#beforeitemmouseenter
             */
            'beforeitemmouseenter',
            /**
             * @event beforeitemmouseleave
             * @inheritdoc Ext.view.View#beforeitemmouseleave
             */
            'beforeitemmouseleave',
            /**
             * @event beforeitemclick
             * @inheritdoc Ext.view.View#beforeitemclick
             */
            'beforeitemclick',
            /**
             * @event beforeitemdblclick
             * @inheritdoc Ext.view.View#beforeitemdblclick
             */
            'beforeitemdblclick',
            /**
             * @event beforeitemcontextmenu
             * @inheritdoc Ext.view.View#beforeitemcontextmenu
             */
            'beforeitemcontextmenu',
            /**
             * @event itemmousedown
             * @inheritdoc Ext.view.View#itemmousedown
             */
            'itemmousedown',
            /**
             * @event itemmouseup
             * @inheritdoc Ext.view.View#itemmouseup
             */
            'itemmouseup',
            /**
             * @event itemmouseenter
             * @inheritdoc Ext.view.View#itemmouseenter
             */
            'itemmouseenter',
            /**
             * @event itemmouseleave
             * @inheritdoc Ext.view.View#itemmouseleave
             */
            'itemmouseleave',
            /**
             * @event itemclick
             * @inheritdoc Ext.view.View#itemclick
             */
            'itemclick',
            /**
             * @event itemdblclick
             * @inheritdoc Ext.view.View#itemdblclick
             */
            'itemdblclick',
            /**
             * @event itemcontextmenu
             * @inheritdoc Ext.view.View#itemcontextmenu
             */
            'itemcontextmenu',
            /**
             * @event beforecontainermousedown
             * @inheritdoc Ext.view.View#beforecontainermousedown
             */
            'beforecontainermousedown',
            /**
             * @event beforecontainermouseup
             * @inheritdoc Ext.view.View#beforecontainermouseup
             */
            'beforecontainermouseup',
            /**
             * @event beforecontainermouseover
             * @inheritdoc Ext.view.View#beforecontainermouseover
             */
            'beforecontainermouseover',
            /**
             * @event beforecontainermouseout
             * @inheritdoc Ext.view.View#beforecontainermouseout
             */
            'beforecontainermouseout',
            /**
             * @event beforecontainerclick
             * @inheritdoc Ext.view.View#beforecontainerclick
             */
            'beforecontainerclick',
            /**
             * @event beforecontainerdblclick
             * @inheritdoc Ext.view.View#beforecontainerdblclick
             */
            'beforecontainerdblclick',
            /**
             * @event beforecontainercontextmenu
             * @inheritdoc Ext.view.View#beforecontainercontextmenu
             */
            'beforecontainercontextmenu',
            /**
             * @event containermouseup
             * @inheritdoc Ext.view.View#containermouseup
             */
            'containermouseup',
            /**
             * @event containermouseover
             * @inheritdoc Ext.view.View#containermouseover
             */
            'containermouseover',
            /**
             * @event containermouseout
             * @inheritdoc Ext.view.View#containermouseout
             */
            'containermouseout',
            /**
             * @event containerclick
             * @inheritdoc Ext.view.View#containerclick
             */
            'containerclick',
            /**
             * @event containerdblclick
             * @inheritdoc Ext.view.View#containerdblclick
             */
            'containerdblclick',
            /**
             * @event containercontextmenu
             * @inheritdoc Ext.view.View#containercontextmenu
             */
            'containercontextmenu',
            /**
             * @event selectionchange
             * @inheritdoc Ext.selection.Model#selectionchange
             */
            'selectionchange',
            /**
             * @event beforeselect
             * @inheritdoc Ext.selection.RowModel#beforeselect
             */
            'beforeselect',
            /**
             * @event select
             * @inheritdoc Ext.selection.RowModel#select
             */
            'select',
            /**
             * @event beforedeselect
             * @inheritdoc Ext.selection.RowModel#beforedeselect
             */
            'beforedeselect',
            /**
             * @event deselect
             * @inheritdoc Ext.selection.RowModel#deselect
             */
            'deselect'
        ]);

        me.callParent(arguments);
        me.addStateEvents(['columnresize', 'columnmove', 'columnhide', 'columnshow', 'sortchange']);

        if (me.headerCt) {
            me.headerCt.on('afterlayout', me.onRestoreHorzScroll, me);
        }
    },

    relayHeaderCtEvents: function (headerCt) {
        this.relayEvents(headerCt, [
            /**
             * @event columnresize
             * @inheritdoc Ext.grid.header.Container#columnresize
             */
            'columnresize',
            /**
             * @event columnmove
             * @inheritdoc Ext.grid.header.Container#columnmove
             */
            'columnmove',
            /**
             * @event columnhide
             * @inheritdoc Ext.grid.header.Container#columnhide
             */
            'columnhide',
            /**
             * @event columnshow
             * @inheritdoc Ext.grid.header.Container#columnshow
             */
            'columnshow',
            /**
             * @event sortchange
             * @inheritdoc Ext.grid.header.Container#sortchange
             */
            'sortchange'
        ]);
    },

    getState: function(){
        var me = this,
            state = me.callParent(),
            sorter = me.store.sorters.first();

        state = me.addPropertyToState(state, 'columns', (me.headerCt || me).getColumnsState());

        if (sorter) {
            state = me.addPropertyToState(state, 'sort', {
                property: sorter.property,
                direction: sorter.direction,
                root: sorter.root
            });
        }
        return state;
    },

    applyState: function(state) {
        var me = this,
            sorter = state.sort,
            store = me.store,
            columns = state.columns;

        delete state.columns;

        // Ensure superclass has applied *its* state.
        // AbstractComponent saves dimensions (and anchor/flex) plus collapsed state.
        me.callParent(arguments);

        if (columns) {
            (me.headerCt || me).applyColumnsState(columns);
        }

        if (sorter) {
            if (store.remoteSort) {
                // Pass false to prevent a sort from occurring
                store.sort({
                    property: sorter.property,
                    direction: sorter.direction,
                    root: sorter.root
                }, null, false);
            } else {
                store.sort(sorter.property, sorter.direction);
            }
        }
    },

    /**
     * Returns the store associated with this Panel.
     * @return {Ext.data.Store} The store
     */
    getStore: function(){
        return this.store;
    },

    /**
     * Gets the view for this panel.
     * @return {Ext.view.Table}
     */
    getView: function() {
        var me = this,
            sm;

        if (!me.view) {
            sm = me.getSelectionModel();
            me.view = Ext.widget(Ext.apply({}, me.viewConfig, {

                // Features need a reference to the grid, so configure a reference into the View
                grid: me,
                deferInitialRefresh: me.deferRowRender !== false,
                scroll: me.scroll,
                xtype: me.viewType,
                store: me.store,
                headerCt: me.headerCt,
                selModel: sm,
                features: me.features,
                panel: me,
                emptyText : me.emptyText ? '<div class="' + Ext.baseCSSPrefix + 'grid-empty">' + me.emptyText + '</div>' : ''
            }));
            me.mon(me.view, {
                uievent: me.processEvent,
                scope: me
            });
            sm.view = me.view;
            me.headerCt.view = me.view;
            me.relayEvents(me.view, [
                /**
                 * @event cellclick
                 * Fired when table cell is clicked.
                 * @param {Ext.view.Table} this
                 * @param {HTMLElement} td The TD element that was clicked.
                 * @param {Number} cellIndex
                 * @param {Ext.data.Model} record
                 * @param {HTMLElement} tr The TR element that was clicked.
                 * @param {Number} rowIndex
                 * @param {Ext.EventObject} e
                 */
                'cellclick',
                /**
                 * @event celldblclick
                 * Fired when table cell is double clicked.
                 * @param {Ext.view.Table} this
                 * @param {HTMLElement} td The TD element that was clicked.
                 * @param {Number} cellIndex
                 * @param {Ext.data.Model} record
                 * @param {HTMLElement} tr The TR element that was clicked.
                 * @param {Number} rowIndex
                 * @param {Ext.EventObject} e
                 */
                'celldblclick'
            ]);
        }
        return me.view;
    },

    /**
     * @private
     * autoScroll is never valid for all classes which extend TablePanel.
     */
    setAutoScroll: Ext.emptyFn,

    /**
     * @private
     * Processes UI events from the view. Propagates them to whatever internal Components need to process them.
     * @param {String} type Event type, eg 'click'
     * @param {Ext.view.Table} view TableView Component
     * @param {HTMLElement} cell Cell HtmlElement the event took place within
     * @param {Number} recordIndex Index of the associated Store Model (-1 if none)
     * @param {Number} cellIndex Cell index within the row
     * @param {Ext.EventObject} e Original event
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
        var me = this,
            header;

        if (cellIndex !== -1) {
            header = me.headerCt.getGridColumns()[cellIndex];
            return header.processEvent.apply(header, arguments);
        }
    },

    /**
     * This method is obsolete in 4.1. The closest equivalent in
     * 4.1 is {@link #doLayout}, but it is also possible that no
     * layout is needed.
     * @deprecated 4.1
     */
    determineScrollbars: function () {
        Ext.log.warn('Obsolete');
    },

    /**
     * This method is obsolete in 4.1. The closest equivalent in 4.1 is
     * {@link Ext.AbstractComponent#updateLayout}, but it is also possible that no layout
     * is needed.
     * @deprecated 4.1
     */
    invalidateScroller: function () {
        Ext.log.warn('Obsolete');
    },

    scrollByDeltaY: function(yDelta, animate) {
        this.getView().scrollBy(0, yDelta, animate);
    },

    scrollByDeltaX: function(xDelta, animate) {
        this.getView().scrollBy(xDelta, 0, animate);
    },

    afterCollapse: function() {
        var me = this;
        me.saveScrollPos();
        me.saveScrollPos();
        me.callParent(arguments);
    },

    afterExpand: function() {
        var me = this;
        me.callParent(arguments);
        me.restoreScrollPos();
        me.restoreScrollPos();
    },

    saveScrollPos: Ext.emptyFn,

    restoreScrollPos: Ext.emptyFn,
    
    onHeaderResize: function(){
        this.delayScroll();
    },

    // Update the view when a header moves
    onHeaderMove: function(headerCt, header, colsToMove, fromIdx, toIdx) {
        var me = this;

        // If there are Features or Plugins which create DOM which must match column order, they set the optimizedColumnMove flag to false.
        // In this case we must refresh the view on column move.
        if (me.optimizedColumnMove === false) {
            me.view.refresh();
        }

        // Simplest case for default DOM structure is just to swap the columns round in the view.
        else {
            me.view.moveColumn(fromIdx, toIdx, colsToMove);
        }
        me.delayScroll();
    },

    // Section onHeaderHide is invoked after view.
    onHeaderHide: function(headerCt, header) {
        this.delayScroll();
    },

    onHeaderShow: function(headerCt, header) {
        this.delayScroll();
    },
    
    delayScroll: function(){
        var target = this.getScrollTarget().el;
        if (target) {
            this.scrollTask.delay(10, null, null, [target.dom.scrollLeft]);
        }
    },

    /**
     * @private
     * Fires the TablePanel's viewready event when the view declares that its internal DOM is ready
     */
    onViewReady: function() {
         this.fireEvent('viewready', this);   
    },

    /**
     * @private
     * Tracks when things happen to the view and preserves the horizontal scroll position.
     */
    onRestoreHorzScroll: function() {
        var left = this.scrollLeftPos;
        if (left) {
            this.syncHorizontalScroll(left);
        }
    },

    /**
     * Sets the scrollTop of the TablePanel.
     * @param {Number} top
     */
    setScrollTop: function(top) {
        var me               = this,
            rootCmp          = me.getScrollerOwner();

        rootCmp.virtualScrollTop = top;
    },

    getScrollerOwner: function() {
        var rootCmp = this;
        if (!this.scrollerOwner) {
            rootCmp = this.up('[scrollerOwner]');
        }
        return rootCmp;
    },

    /**
     * Gets left hand side marker for header resizing.
     * @private
     */
    getLhsMarker: function() {
        var me = this;
        return me.lhsMarker || (me.lhsMarker = Ext.DomHelper.append(me.el, {
                cls: Ext.baseCSSPrefix + 'grid-resize-marker'
            }, true));
    },

    /**
     * Gets right hand side marker for header resizing.
     * @private
     */
    getRhsMarker: function() {
        var me = this;

        return me.rhsMarker || (me.rhsMarker = Ext.DomHelper.append(me.el, {
                cls: Ext.baseCSSPrefix + 'grid-resize-marker'
            }, true));
    },

    /**
     * Returns the selection model being used and creates it via the configuration if it has not been created already.
     * @return {Ext.selection.Model} selModel
     */
    getSelectionModel: function(){
        if (!this.selModel) {
            this.selModel = {};
        }

        var mode = 'SINGLE',
            type;
        if (this.simpleSelect) {
            mode = 'SIMPLE';
        } else if (this.multiSelect) {
            mode = 'MULTI';
        }

        Ext.applyIf(this.selModel, {
            allowDeselect: this.allowDeselect,
            mode: mode
        });

        if (!this.selModel.events) {
            type = this.selModel.selType || this.selType;
            this.selModel = Ext.create('selection.' + type, this.selModel);
        }

        if (!this.selModel.hasRelaySetup) {
            this.relayEvents(this.selModel, [
                'selectionchange', 'beforeselect', 'beforedeselect', 'select', 'deselect'
            ]);
            this.selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (this.disableSelection) {
            this.selModel.locked = true;
        }
        return this.selModel;
    },
    
    getScrollTarget: function(){
        var owner = this.getScrollerOwner(),
            items = owner.query('tableview');
            
        return items[1] || items[0];
    },

    onHorizontalScroll: function(event, target) {
        this.syncHorizontalScroll(target.scrollLeft);
    },
    
    syncHorizontalScroll: function(left) {
        var me = this,
            scrollTarget;
            
        if (me.rendered) {   
            scrollTarget = me.getScrollTarget();
            scrollTarget.el.dom.scrollLeft = left;
            me.headerCt.el.dom.scrollLeft = left;
            me.scrollLeftPos = left;
        }
    },

    // template method meant to be overriden
    onStoreLoad: Ext.emptyFn,

    getEditorParent: function() {
        return this.body;
    },

    bindStore: function(store) {
        var me = this;
        me.store = store;
        me.getView().bindStore(store);
    },
    
    beforeDestroy: function(){
        Ext.destroy(this.verticalScroller);
        this.callParent();    
    },

    // documented on GridPanel
    reconfigure: function(store, columns) {
        var me = this,
            headerCt = me.headerCt;

        if (me.lockable) {
            me.reconfigureLockable(store, columns);
        } else {
            if (columns) {
                // new columns, delete scroll pos
                delete me.scrollLeftPos;
                headerCt.suspendLayouts();
                headerCt.removeAll();
                headerCt.add(columns);
            }
            if (store) {
                store = Ext.StoreManager.lookup(store);
                me.bindStore(store);
            } else {
                me.getView().refresh();
            }
            if (columns) {
                headerCt.resumeLayouts(true);
            }
            headerCt.setSortState();
        }
        me.fireEvent('reconfigure', me, store, columns);
    }
});

/**
 * Tracks what records are currently selected in a databound component.
 *
 * This is an abstract class and is not meant to be directly used. Databound UI widgets such as
 * {@link Ext.grid.Panel Grid} and {@link Ext.tree.Panel Tree} should subclass Ext.selection.Model
 * and provide a way to binding to the component.
 *
 * The abstract methods `onSelectChange` and `onLastFocusChanged` should be implemented in these
 * subclasses to update the UI widget.
 */
Ext.define('Ext.selection.Model', {
    extend: 'Ext.util.Observable',
    alternateClassName: 'Ext.AbstractSelectionModel',
    requires: ['Ext.data.StoreManager'],
    mixins: {
        bindable: 'Ext.util.Bindable'    
    },
    // lastSelected

    /**
     * @cfg {String} mode
     * Mode of selection.  Valid values are:
     *
     * - **SINGLE** - Only allows selecting one item at a time.  Use {@link #allowDeselect} to allow
     *   deselecting that item.  This is the default.
     * - **SIMPLE** - Allows simple selection of multiple items one-by-one. Each click in grid will either
     *   select or deselect an item.
     * - **MULTI** - Allows complex selection of multiple items using Ctrl and Shift keys.
     */

    /**
     * @cfg {Boolean} allowDeselect
     * Allow users to deselect a record in a DataView, List or Grid.
     * Only applicable when the {@link #mode} is 'SINGLE'.
     */
    allowDeselect: false,

    /**
     * @property {Ext.util.MixedCollection} selected
     * A MixedCollection that maintains all of the currently selected records.
     * @readonly
     */
    selected: null,

    /**
     * Prune records when they are removed from the store from the selection.
     * This is a private flag. For an example of its usage, take a look at
     * Ext.selection.TreeModel.
     * @private
     */
    pruneRemoved: true,

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        Ext.apply(me, cfg);

        me.addEvents(
            /**
             * @event
             * Fired after a selection change has occurred
             * @param {Ext.selection.Model} this
             * @param {Ext.data.Model[]} selected The selected records
             */
            'selectionchange',
            /**
             * @event
             * Fired when a row is focused
             * @param {Ext.selection.Model} this
             * @param {Ext.data.Model} oldFocused The previously focused record
             * @param {Ext.data.Model} newFocused The newly focused record
             */
            'focuschange'
        );

        me.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };

        // sets this.selectionMode
        me.setSelectionMode(cfg.mode || me.mode);

        // maintains the currently selected records.
        me.selected = new Ext.util.MixedCollection();

        me.callParent(arguments);
    },

    // binds the store to the selModel.
    bindStore: function(store, initial){
        var me = this;
        me.mixins.bindable.bindStore.apply(me, arguments);
        if(me.store && !initial) {
            me.refresh();
        }
    },
    
    getStoreListeners: function() {
        var me = this;
        return {
            add: me.onStoreAdd,
            clear: me.onStoreClear,
            remove: me.onStoreRemove,
            update: me.onStoreUpdate    
        }; 
    },

    /**
     * Selects all records in the view.
     * @param {Boolean} suppressEvent True to suppress any select events
     */
    selectAll: function(suppressEvent) {
        var me = this,
            selections = me.store.getRange(),
            i = 0,
            len = selections.length,
            start = me.getSelection().length;

        me.bulkChange = true;
        for (; i < len; i++) {
            me.doSelect(selections[i], true, suppressEvent);
        }
        delete me.bulkChange;
        // fire selection change only if the number of selections differs
        me.maybeFireSelectionChange(me.getSelection().length !== start);
    },

    /**
     * Deselects all records in the view.
     * @param {Boolean} suppressEvent True to suppress any deselect events
     */
    deselectAll: function(suppressEvent) {
        var me = this,
            selections = me.getSelection(),
            i = 0,
            len = selections.length,
            start = me.getSelection().length;

        me.bulkChange = true;
        for (; i < len; i++) {
            me.doDeselect(selections[i], suppressEvent);
        }
        delete me.bulkChange;
        // fire selection change only if the number of selections differs
        me.maybeFireSelectionChange(me.getSelection().length !== start);
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes. Requires that an event be passed so that we can know
    // if user held ctrl or shift.
    selectWithEvent: function(record, e, keepExisting) {
        var me = this;

        switch (me.selectionMode) {
            case 'MULTI':
                if (e.ctrlKey && me.isSelected(record)) {
                    me.doDeselect(record, false);
                } else if (e.shiftKey && me.lastFocused) {
                    me.selectRange(me.lastFocused, record, e.ctrlKey);
                } else if (e.ctrlKey) {
                    me.doSelect(record, true, false);
                } else if (me.isSelected(record) && !e.shiftKey && !e.ctrlKey && me.selected.getCount() > 1) {
                    me.doSelect(record, keepExisting, false);
                } else {
                    me.doSelect(record, false);
                }
                break;
            case 'SIMPLE':
                if (me.isSelected(record)) {
                    me.doDeselect(record);
                } else {
                    me.doSelect(record, true);
                }
                break;
            case 'SINGLE':
                // if allowDeselect is on and this record isSelected, deselect it
                if (me.allowDeselect && me.isSelected(record)) {
                    me.doDeselect(record);
                // select the record and do NOT maintain existing selections
                } else {
                    me.doSelect(record, false);
                }
                break;
        }
    },

    /**
     * Selects a range of rows if the selection model {@link #isLocked is not locked}.
     * All rows in between startRow and endRow are also selected.
     * @param {Ext.data.Model/Number} startRow The record or index of the first row in the range
     * @param {Ext.data.Model/Number} endRow The record or index of the last row in the range
     * @param {Boolean} keepExisting (optional) True to retain existing selections
     */
    selectRange : function(startRow, endRow, keepExisting, dir){
        var me = this,
            store = me.store,
            selectedCount = 0,
            i,
            tmp,
            dontDeselect,
            records = [];

        if (me.isLocked()){
            return;
        }

        if (!keepExisting) {
            me.deselectAll(true);
        }

        if (!Ext.isNumber(startRow)) {
            startRow = store.indexOf(startRow);
        }
        if (!Ext.isNumber(endRow)) {
            endRow = store.indexOf(endRow);
        }

        // swap values
        if (startRow > endRow){
            tmp = endRow;
            endRow = startRow;
            startRow = tmp;
        }

        for (i = startRow; i <= endRow; i++) {
            if (me.isSelected(store.getAt(i))) {
                selectedCount++;
            }
        }

        if (!dir) {
            dontDeselect = -1;
        } else {
            dontDeselect = (dir == 'up') ? startRow : endRow;
        }

        for (i = startRow; i <= endRow; i++){
            if (selectedCount == (endRow - startRow + 1)) {
                if (i != dontDeselect) {
                    me.doDeselect(i, true);
                }
            } else {
                records.push(store.getAt(i));
            }
        }
        me.doMultiSelect(records, true);
    },

    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} [keepExisting=false] True to retain existing selections
     * @param {Boolean} [suppressEvent=false] True to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        // Automatically selecting eg store.first() or store.last() will pass undefined, so that must just return;
        if (Ext.isDefined(records)) {
            this.doSelect(records, keepExisting, suppressEvent);
        }
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} [suppressEvent=false] Trye to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.doDeselect(records, suppressEvent);
    },

    doSelect: function(records, keepExisting, suppressEvent) {
        var me = this,
            record;

        if (me.locked || !me.store) {
            return;
        }
        if (typeof records === "number") {
            records = [me.store.getAt(records)];
        }
        if (me.selectionMode == "SINGLE" && records) {
            record = records.length ? records[0] : records;
            me.doSingleSelect(record, suppressEvent);
        } else {
            me.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    doMultiSelect: function(records, keepExisting, suppressEvent) {
        var me = this,
            selected = me.selected,
            change = false,
            i = 0,
            len, record;

        if (me.locked) {
            return;
        }


        records = !Ext.isArray(records) ? [records] : records;
        len = records.length;
        if (!keepExisting && selected.getCount() > 0) {
            if (me.doDeselect(me.getSelection(), suppressEvent) === false) {
                return;
            }
            // TODO - coalesce the selectionchange event in deselect w/the one below...
        }

        function commit () {
            selected.add(record);
            change = true;
        }

        for (; i < len; i++) {
            record = records[i];
            if (keepExisting && me.isSelected(record)) {
                continue;
            }
            me.lastSelected = record;

            me.onSelectChange(record, true, suppressEvent, commit);
        }
        if (!me.preventFocus) {
            me.setLastFocused(record, suppressEvent);
        }
        // fire selchange if there was a change and there is no suppressEvent flag
        me.maybeFireSelectionChange(change && !suppressEvent);
    },

    // records can be an index, a record or an array of records
    doDeselect: function(records, suppressEvent) {
        var me = this,
            selected = me.selected,
            i = 0,
            len, record,
            attempted = 0,
            accepted = 0;

        if (me.locked || !me.store) {
            return false;
        }

        if (typeof records === "number") {
            records = [me.store.getAt(records)];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        function commit () {
            ++accepted;
            selected.remove(record);
        }

        len = records.length;

        for (; i < len; i++) {
            record = records[i];
            if (me.isSelected(record)) {
                if (me.lastSelected == record) {
                    me.lastSelected = selected.last();
                }
                ++attempted;
                me.onSelectChange(record, false, suppressEvent, commit);
            }
        }

        // fire selchange if there was a change and there is no suppressEvent flag
        me.maybeFireSelectionChange(accepted > 0 && !suppressEvent);
        return accepted === attempted;
    },

    doSingleSelect: function(record, suppressEvent) {
        var me = this,
            changed = false,
            selected = me.selected;

        if (me.locked) {
            return;
        }
        // already selected.
        // should we also check beforeselect?
        if (me.isSelected(record)) {
            return;
        }

        function commit () {
            me.bulkChange = true;
            if (selected.getCount() > 0 && me.doDeselect(me.lastSelected, suppressEvent) === false) {
                delete me.bulkChange;
                return false;
            }
            delete me.bulkChange;

            selected.add(record);
            me.lastSelected = record;
            changed = true;
        }

        me.onSelectChange(record, true, suppressEvent, commit);

        if (changed) {
            if (!suppressEvent) {
                me.setLastFocused(record);
            }
            me.maybeFireSelectionChange(!suppressEvent);
        }
    },

    /**
     * Sets a record as the last focused record. This does NOT mean
     * that the record has been selected.
     * @param {Ext.data.Model} record
     */
    setLastFocused: function(record, supressFocus) {
        var me = this,
            recordBeforeLast = me.lastFocused;

        me.lastFocused = record;
         
        // Only call the changed method if in fact the selected record *has* changed.
        if (record !== recordBeforeLast) {
            me.onLastFocusChanged(recordBeforeLast, record, supressFocus);
        }
    },

    /**
     * Determines if this record is currently focused.
     * @param {Ext.data.Model} record
     */
    isFocused: function(record) {
        return record === this.getLastFocused();
    },


    // fire selection change as long as true is not passed
    // into maybeFireSelectionChange
    maybeFireSelectionChange: function(fireEvent) {
        var me = this;
        if (fireEvent && !me.bulkChange) {
            me.fireEvent('selectionchange', me, me.getSelection());
        }
    },

    /**
     * Returns the last selected record.
     */
    getLastSelected: function() {
        return this.lastSelected;
    },

    getLastFocused: function() {
        return this.lastFocused;
    },

    /**
     * Returns an array of the currently selected records.
     * @return {Ext.data.Model[]} The selected records
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns the current selectionMode.
     * @return {String} The selectionMode: 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    getSelectionMode: function() {
        return this.selectionMode;
    },

    /**
     * Sets the current selectionMode.
     * @param {String} selModel 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    setSelectionMode: function(selMode) {
        selMode = selMode ? selMode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE';
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked: function() {
        return this.locked;
    },

    /**
     * Locks the current selection and disables any changes from happening to the selection.
     * @param {Boolean} locked  True to lock, false to unlock.
     */
    setLocked: function(locked) {
        this.locked = !!locked;
    },

    /**
     * Returns true if the specified row is selected.
     * @param {Ext.data.Model/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.store.getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },

    /**
     * Returns true if there are any a selected records.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    refresh: function() {
        var me = this,
            toBeSelected = [],
            oldSelections = me.getSelection(),
            len = oldSelections.length,
            selection,
            change,
            i = 0,
            lastFocused = this.getLastFocused();

        // check to make sure that there are no records
        // missing after the refresh was triggered, prune
        // them from what is to be selected if so
        for (; i < len; i++) {
            selection = oldSelections[i];
            if (!this.pruneRemoved || me.store.indexOf(selection) !== -1) {
                toBeSelected.push(selection);
            }
        }

        // there was a change from the old selected and
        // the new selection
        if (me.selected.getCount() != toBeSelected.length) {
            change = true;
        }

        me.clearSelections();

        if (me.store.indexOf(lastFocused) !== -1) {
            // restore the last focus but supress restoring focus
            this.setLastFocused(lastFocused, true);
        }

        if (toBeSelected.length) {
            // perform the selection again
            me.doSelect(toBeSelected, false, true);
        }

        me.maybeFireSelectionChange(change);
    },

    /**
     * A fast reset of the selections without firing events, updating the ui, etc.
     * For private usage only.
     * @private
     */
    clearSelections: function() {
        // reset the entire selection to nothing
        this.selected.clear();
        this.lastSelected = null;
        this.setLastFocused(null);
    },

    // when a record is added to a store
    onStoreAdd: function() {

    },

    // when a store is cleared remove all selections
    // (if there were any)
    onStoreClear: function() {
        if (this.selected.getCount > 0) {
            this.clearSelections();
            this.maybeFireSelectionChange(true);
        }
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onStoreRemove: function(store, record, index) {
        var me = this,
            selected = me.selected;

        if (me.locked || !me.pruneRemoved) {
            return;
        }

        if (selected.remove(record)) {
            if (me.lastSelected == record) {
                me.lastSelected = null;
            }
            if (me.getLastFocused() == record) {
                me.setLastFocused(null);
            }
            me.maybeFireSelectionChange(true);
        }
    },

    /**
     * Returns the count of selected records.
     * @return {Number} The number of selected records
     */
    getCount: function() {
        return this.selected.getCount();
    },

    // cleanup.
    destroy: function() {

    },

    // if records are updated
    onStoreUpdate: function() {

    },

    // @abstract
    onSelectChange: function(record, isSelected, suppressEvent) {

    },

    // @abstract
    onLastFocusChanged: function(oldFocused, newFocused) {
        this.fireEvent('focuschange', this, oldFocused, newFocused);
    },

    // @abstract
    onEditorKey: function(field, e) {

    },

    // @abstract
    bindComponent: function(cmp) {

    }
});

/**
 * Component layout for grid column headers which have a title element at the top followed by content.
 * @private
 */
Ext.define('Ext.grid.ColumnComponentLayout', {
    extend: 'Ext.layout.component.Auto',
    alias: 'layout.columncomponent',

    type: 'columncomponent',

    setWidthInDom: true,

    getContentHeight : function(ownerContext) {
        // If we are a group header return container layout's contentHeight, else default to AutoComponent's answer
        return this.owner.isGroupHeader ? ownerContext.getProp('contentHeight') : this.callParent(arguments);
    },

    calculateOwnerHeightFromContentHeight: function (ownerContext, contentHeight) {
        var result = this.callParent(arguments);
        if (this.owner.isGroupHeader) {
            result += this.owner.titleEl.dom.offsetHeight;
        }
        return result;
    },
    
    getContentWidth : function(ownerContext) {
        // If we are a group header return container layout's contentHeight, else default to AutoComponent's answer
        return this.owner.isGroupHeader ? ownerContext.getProp('contentWidth') : this.callParent(arguments);
    },

    calculateOwnerWidthFromContentWidth: function (ownerContext, contentWidth) {
        return contentWidth + ownerContext.getPaddingInfo().width;
    }
});
/**
 * @private
 *
 * This class is used only by the grid's HeaderContainer docked child.
 *
 * It adds the ability to shrink the vertical size of the inner container element back if a grouped
 * column header has all its child columns dragged out, and the whole HeaderContainer needs to shrink back down.
 *
 * Also, after every layout, after all headers have attained their 'stretchmax' height, it goes through and calls
 * `setPadding` on the columns so that they lay out correctly.
 */
Ext.define('Ext.grid.ColumnLayout', {
    extend: 'Ext.layout.container.HBox',
    alias: 'layout.gridcolumn',
    type : 'gridcolumn',

    reserveOffset: false,

    firstHeaderCls: Ext.baseCSSPrefix + 'column-header-first',
    lastHeaderCls: Ext.baseCSSPrefix + 'column-header-last',

    // Collect the height of the table of data upon layout begin
    beginLayout: function (ownerContext) {
        var me = this,
            owner = me.owner,
            grid = owner.up('[scrollerOwner]'),
            view = grid.view,
            i = 0,
            items = me.getVisibleItems(),
            len = items.length,
            item;

        // If we are one side of a locking grid, then if we are on the "normal" side, we have to grab the normal view
        // for use in determining whether to subtract scrollbar width from available width.
        // The locked side does not have scrollbars, so it should not look at the view.
        if (grid.lockable) {
            if (me.owner.up('tablepanel') === view.normalGrid) {
                view = view.normalGrid.getView();
            } else {
                view = null;
            }
        }

        me.callParent(arguments);

        // Unstretch child items before the layout which stretches them.
        for (; i < len; i++) {
            item = items[i];
            item.removeCls([me.firstHeaderCls, me.lastHeaderCls]);
            item.el.setStyle({
                height: 'auto'
            });
            item.titleEl.setStyle({
                height: 'auto',
                paddingTop: ''  // reset back to default padding of the style
            });
        }

        // Add special first/last classes
        if (len > 0) {
            items[0].addCls(me.firstHeaderCls);
            items[len - 1].addCls(me.lastHeaderCls);
        }

        // If the owner is the grid's HeaderContainer, and the UI displays old fashioned scrollbars and there is a rendered View with data in it,
        // collect the View context to interrogate it for overflow, and possibly invalidate it if there is overflow
        if (!me.owner.isHeader && Ext.getScrollbarSize().width && !grid.collapsed && view &&
                view.rendered && (ownerContext.viewTable = view.el.child('table', true))) {
            ownerContext.viewContext = ownerContext.context.getCmp(view);
        }
    },

    roundFlex: function(width) {
        return Math.floor(width);
    },
    
    /**
     * @private
     * Local getContainerSize implementation accounts for vertical scrollbar in the view.
     */
    getContainerSize: function(ownerContext) {
        var me = this,
            result = me.callParent(arguments),
            viewContext = ownerContext.viewContext,
            viewHeight;

        // If we've collected a viewContext, we will also have the table height
        // If there's overflow, the View must be narrower to accomodate the scrollbar
        if (viewContext && !viewContext.heightModel.shrinkWrap &&
                viewContext.target.componentLayout.ownerContext) { // if (its layout is running)
            viewHeight = viewContext.getProp('height');
            if (isNaN(viewHeight)) {
                me.done = false;
            } else if (ownerContext.state.tableHeight > viewHeight) {
                result.width -= Ext.getScrollbarSize().width;
                ownerContext.state.parallelDone = false;
                viewContext.invalidate();
            }
        }

// TODO - flip the initial assumption to "we have a vscroll" to avoid the invalidate in most
// cases (and the expensive ones to boot)

        return result;
    },

    calculate: function(ownerContext) {
        var me = this,
            viewContext = ownerContext.viewContext;

        // Collect the height of the data table if we need it to determine overflow
        if (viewContext && !ownerContext.state.tableHeight) {
            ownerContext.state.tableHeight = ownerContext.viewTable.offsetHeight;
        }
        me.callParent(arguments);
    },
 
    completeLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            state = ownerContext.state,
            needsInvalidate = false,
            calculated = me.sizeModels.calculated,
            childItems, len, i, childContext, item;

        me.callParent(arguments);

        // If we have not been through this already, and the owning Container is configured
        // forceFit, is not a group column and and there is a valid width, then convert
        // widths to flexes, and loop back.
        if (!state.flexesCalculated && owner.forceFit && !owner.isHeader) {
            childItems = ownerContext.childItems;
            len = childItems.length;

            for (i = 0; i < len; i++) {
                childContext = childItems[i];
                item = childContext.target;

                // For forceFit, just use allocated width as the flex value, and the proportions
                // will end up the same whatever HeaderContainer width they are being forced into.
                if (item.width) {
                    item.flex = ownerContext.childItems[i].flex = item.width;
                    delete item.width;
                    childContext.widthModel = calculated;
                    needsInvalidate = true;
                }
            }

            // Recalculate based upon all columns now being flexed instead of sized.
            // Set flag, so that we do not do this infinitely
            if (needsInvalidate) {
                me.cacheFlexes(ownerContext);
                ownerContext.invalidate({
                    state: {
                        flexesCalculated: true
                    }
                });
            }
        }
    },

    finalizeLayout: function() {
        var me = this,
            i = 0,
            items,
            len,
            itemsHeight,
            owner = me.owner,
            titleEl = owner.titleEl;

        // Set up padding in items
        items = me.getVisibleItems();
        len = items.length;
        // header container's items take up the whole height
        itemsHeight = owner.el.getViewSize().height;
        if (titleEl) {
            // if owner is a grouped column with children, we need to subtract the titleEl's height
            // to determine the remaining available height for the child items
            itemsHeight -= titleEl.getHeight();
        }
        for (; i < len; i++) {
            items[i].setPadding(itemsHeight);
        }
    },

    // FIX: when flexing we actually don't have enough space as we would
    // typically because of the scrollOffset on the GridView, must reserve this
    publishInnerCtSize: function(ownerContext) {
        var me = this,
            plan = ownerContext.state.boxPlan,
            size = plan.targetSize,
            cw = ownerContext.peek('contentWidth');

        // InnerCt MUST stretch to accommodate all columns so that left/right scrolling is enabled in the header container.
        if ((cw != null) && !me.owner.isHeader) {
            size.width = cw + Ext.getScrollbarSize().width;
        }

        return me.callParent(arguments);
    }
});

/**
 * Plugin to add header resizing functionality to a HeaderContainer.
 * Always resizing header to the left of the splitter you are resizing.
 */
Ext.define('Ext.grid.plugin.HeaderResizer', {
    extend: 'Ext.util.Observable',
    requires: ['Ext.dd.DragTracker', 'Ext.util.Region'],
    alias: 'plugin.gridheaderresizer',

    disabled: false,

    config: {
        /**
         * @cfg {Boolean} dynamic
         * True to resize on the fly rather than using a proxy marker.
         * @accessor
         */
        dynamic: false
    },

    colHeaderCls: Ext.baseCSSPrefix + 'column-header',

    minColWidth: 40,
    maxColWidth: 1000,
    wResizeCursor: 'col-resize',
    eResizeCursor: 'col-resize',
    // not using w and e resize bc we are only ever resizing one
    // column
    //wResizeCursor: Ext.isWebKit ? 'w-resize' : 'col-resize',
    //eResizeCursor: Ext.isWebKit ? 'e-resize' : 'col-resize',

    init: function(headerCt) {
        this.headerCt = headerCt;
        headerCt.on('render', this.afterHeaderRender, this, {single: true});
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        if (this.tracker) {
            this.tracker.destroy();
        }
    },

    afterHeaderRender: function() {
        var headerCt = this.headerCt,
            el = headerCt.el;

        headerCt.mon(el, 'mousemove', this.onHeaderCtMouseMove, this);

        this.tracker = new Ext.dd.DragTracker({
            disabled: this.disabled,
            onBeforeStart: Ext.Function.bind(this.onBeforeStart, this),
            onStart: Ext.Function.bind(this.onStart, this),
            onDrag: Ext.Function.bind(this.onDrag, this),
            onEnd: Ext.Function.bind(this.onEnd, this),
            tolerance: 3,
            autoStart: 300,
            el: el
        });
    },

    // As we mouse over individual headers, change the cursor to indicate
    // that resizing is available, and cache the resize target header for use
    // if/when they mousedown.
    onHeaderCtMouseMove: function(e, t) {
        var me = this,
            prevSiblings,
            headerEl, overHeader, resizeHeader, resizeHeaderOwnerGrid, ownerGrid;

        if (me.headerCt.dragging) {
            if (me.activeHd) {
                me.activeHd.el.dom.style.cursor = '';
                delete me.activeHd;
            }
        } else {
            headerEl = e.getTarget('.' + me.colHeaderCls, 3, true);

            if (headerEl){
                overHeader = Ext.getCmp(headerEl.id);

                // On left edge, go back to the previous non-hidden header.
                if (overHeader.isOnLeftEdge(e)) {
                    resizeHeader = overHeader.previousNode('gridcolumn:not([hidden]):not([isGroupHeader])')
                    // There may not *be* a previous non-hidden header.
                    if (resizeHeader) {

                        ownerGrid = me.headerCt.up('tablepanel');
                        resizeHeaderOwnerGrid = resizeHeader.up('tablepanel');

                        // Need to check that previousNode didn't go outside the current grid/tree
                        // But in the case of a Grid which contains a locked and normal grid, allow previousNode to jump
                        // from the first column of the normalGrid to the last column of the lockedGrid
                        if (!((resizeHeaderOwnerGrid === ownerGrid) || ((ownerGrid.ownerCt.isXType('tablepanel')) && ownerGrid.ownerCt.view.lockedGrid === resizeHeaderOwnerGrid))) {
                            resizeHeader = null;
                        }
                    }
                }
                // Else, if on the right edge, we're resizing the column we are over
                else if (overHeader.isOnRightEdge(e)) {
                    resizeHeader = overHeader;
                }
                // Between the edges: we are not resizing
                else {
                    resizeHeader = null;
                }

                // We *are* resizing
                if (resizeHeader) {
                    // If we're attempting to resize a group header, that cannot be resized,
                    // so find its last visible leaf header; Group headers are sized
                    // by the size of their child headers.
                    if (resizeHeader.isGroupHeader) {
                        prevSiblings = resizeHeader.getGridColumns();
                        resizeHeader = prevSiblings[prevSiblings.length - 1];
                    }

                    // Check if the header is resizable. Continue checking the old "fixed" property, bug also
                    // check whether the resizablwe property is set to false.
                    if (resizeHeader && !(resizeHeader.fixed || (resizeHeader.resizable === false) || me.disabled)) {
                        me.activeHd = resizeHeader;
                        overHeader.el.dom.style.cursor = me.eResizeCursor;
                    }
                // reset
                } else {
                    overHeader.el.dom.style.cursor = '';
                    delete me.activeHd;
                }
            }
        }
    },

    // only start when there is an activeHd
    onBeforeStart : function(e){
        var t = e.getTarget();
        // cache the activeHd because it will be cleared.
        this.dragHd = this.activeHd;

        if (!!this.dragHd && !Ext.fly(t).hasCls(Ext.baseCSSPrefix + 'column-header-trigger') && !this.headerCt.dragging) {
            //this.headerCt.dragging = true;
            this.tracker.constrainTo = this.getConstrainRegion();
            return true;
        } else {
            this.headerCt.dragging = false;
            return false;
        }
    },

    // get the region to constrain to, takes into account max and min col widths
    getConstrainRegion: function() {
        var me       = this,
            dragHdEl = me.dragHd.el,
            region   = Ext.util.Region.getRegion(dragHdEl),
            nextHd;

        // If forceFit, then right constraint is based upon not being able to force the next header
        // beyond the minColWidth. If there is no next header, then the header may not be expanded.
        if (me.headerCt.forceFit) {
            nextHd = me.dragHd.nextNode('gridcolumn:not([hidden]):not([isGroupHeader])');
        }

         return region.adjust(
            0,
            me.headerCt.forceFit ? (nextHd ? nextHd.getWidth() - me.minColWidth : 0) : me.maxColWidth - dragHdEl.getWidth(),
            0,
            me.minColWidth
        );
    },

    // initialize the left and right hand side markers around
    // the header that we are resizing
    onStart: function(e){
        var me       = this,
            dragHd   = me.dragHd,
            dragHdEl = dragHd.el,
            width    = dragHdEl.getWidth(),
            headerCt = me.headerCt,
            t        = e.getTarget(),
            xy, gridSection, dragHct, firstSection, lhsMarker, rhsMarker, el, offsetLeft, offsetTop, topLeft, markerHeight, top;

        if (me.dragHd && !Ext.fly(t).hasCls(Ext.baseCSSPrefix + 'column-header-trigger')) {
            headerCt.dragging = true;
        }

        me.origWidth = width;

        // setup marker proxies
        if (!me.dynamic) {
            xy           = dragHdEl.getXY();
            gridSection  = headerCt.up('[scrollerOwner]');
            dragHct      = me.dragHd.up(':not([isGroupHeader])');
            firstSection = dragHct.up();
            lhsMarker    = gridSection.getLhsMarker();
            rhsMarker    = gridSection.getRhsMarker();
            el           = rhsMarker.parent();
            offsetLeft   = el.getLeft(true);
            offsetTop    = el.getTop(true);
            topLeft      = el.translatePoints(xy);
            markerHeight = firstSection.body.getHeight() + headerCt.getHeight();
            top = topLeft.top - offsetTop;

            lhsMarker.setTop(top);
            rhsMarker.setTop(top);
            lhsMarker.setHeight(markerHeight);
            rhsMarker.setHeight(markerHeight);
            lhsMarker.setLeft(topLeft.left - offsetLeft);
            rhsMarker.setLeft(topLeft.left + width - offsetLeft);
        }
    },

    // synchronize the rhsMarker with the mouse movement
    onDrag: function(e){
        if (!this.dynamic) {
            var xy          = this.tracker.getXY('point'),
                gridSection = this.headerCt.up('[scrollerOwner]'),
                rhsMarker   = gridSection.getRhsMarker(),
                el          = rhsMarker.parent(),
                topLeft     = el.translatePoints(xy),
                offsetLeft  = el.getLeft(true);

            rhsMarker.setLeft(topLeft.left - offsetLeft);
        // Resize as user interacts
        } else {
            this.doResize();
        }
    },

    onEnd: function(e){
        this.headerCt.dragging = false;
        if (this.dragHd) {
            if (!this.dynamic) {
                var dragHd      = this.dragHd,
                    gridSection = this.headerCt.up('[scrollerOwner]'),
                    lhsMarker   = gridSection.getLhsMarker(),
                    rhsMarker   = gridSection.getRhsMarker(),
                    offscreen   = -9999;

                // hide markers
                lhsMarker.setLeft(offscreen);
                rhsMarker.setLeft(offscreen);
            }
            this.doResize();
        }
    },

    doResize: function() {
        if (this.dragHd) {
            var dragHd = this.dragHd,
                nextHd,
                offset = this.tracker.getOffset('point');

            // resize the dragHd
            if (dragHd.flex) {
                delete dragHd.flex;
            }

            Ext.suspendLayouts();

            // Set the new column width.
            dragHd.setWidth(this.origWidth + offset[0]);
 
            // In the case of forceFit, change the following Header width.
            // Constraining so that neither neighbour can be sized to below minWidth is handled in getConstrainRegion
            if (this.headerCt.forceFit) {
                nextHd = dragHd.nextNode('gridcolumn:not([hidden]):not([isGroupHeader])');
                if (nextHd) {
                    delete nextHd.flex;
                    nextHd.setWidth(nextHd.getWidth() - offset[0]);
                }
            }

            // Apply the two width changes by laying out the owning HeaderContainer
            Ext.resumeLayouts(true);
        }
    },

    disable: function() {
        this.disabled = true;
        if (this.tracker) {
            this.tracker.disable();
        }
    },

    enable: function() {
        this.disabled = false;
        if (this.tracker) {
            this.tracker.enable();
        }
    }
});
/**
 * This class functions **between siblings of a {@link Ext.layout.container.VBox VBox} or {@link Ext.layout.container.HBox HBox}
 * layout** to resize both immediate siblings.
 *
 * A Splitter will preserve the flex ratio of any flexed siblings it is required to resize. It does this by setting the `flex` property of *all* flexed siblings
 * to equal their pixel size. The actual numerical `flex` property in the Components will change, but the **ratio** to the total flex value will be preserved.
 *
 * A Splitter may be configured to show a centered mini-collapse tool orientated to collapse the {@link #collapseTarget}.
 * The Splitter will then call that sibling Panel's {@link Ext.panel.Panel#method-collapse collapse} or {@link Ext.panel.Panel#method-expand expand} method
 * to perform the appropriate operation (depending on the sibling collapse state). To create the mini-collapse tool but take care
 * of collapsing yourself, configure the splitter with `{@link #performCollapse}: false`.
 */
Ext.define('Ext.resizer.Splitter', {
    extend: 'Ext.Component',
    requires: ['Ext.XTemplate'],
    uses: ['Ext.resizer.SplitterTracker'],
    alias: 'widget.splitter',

    childEls: [
        'collapseEl'
    ],

    renderTpl: [
        '<tpl if="collapsible===true">',
            '<div id="{id}-collapseEl" class="', Ext.baseCSSPrefix, 'collapse-el ',
                Ext.baseCSSPrefix, 'layout-split-{collapseDir}">&#160;</div>',
        '</tpl>'
    ],

    baseCls: Ext.baseCSSPrefix + 'splitter',
    collapsedClsInternal: Ext.baseCSSPrefix + 'splitter-collapsed',

    /**
     * @cfg {Boolean} collapsible
     * True to show a mini-collapse tool in the Splitter to toggle expand and collapse on the {@link #collapseTarget} Panel.
     * Defaults to the {@link Ext.panel.Panel#collapsible collapsible} setting of the Panel.
     */
    collapsible: false,

    /**
     * @cfg {Boolean} performCollapse
     * Set to false to prevent this Splitter's mini-collapse tool from managing the collapse
     * state of the {@link #collapseTarget}.
     */

    /**
     * @cfg {Boolean} collapseOnDblClick
     * True to enable dblclick to toggle expand and collapse on the {@link #collapseTarget} Panel.
     */
    collapseOnDblClick: true,

    /**
     * @cfg {Number} defaultSplitMin
     * Provides a default minimum width or height for the two components
     * that the splitter is between.
     */
    defaultSplitMin: 40,

    /**
     * @cfg {Number} defaultSplitMax
     * Provides a default maximum width or height for the two components
     * that the splitter is between.
     */
    defaultSplitMax: 1000,

    /**
     * @cfg {String} collapsedCls
     * A class to add to the splitter when it is collapsed. See {@link #collapsible}.
     */

    width: 5,
    height: 5,

    /**
     * @cfg {String/Ext.panel.Panel} collapseTarget
     * A string describing the relative position of the immediate sibling Panel to collapse. May be 'prev' or 'next'.
     *
     * Or the immediate sibling Panel to collapse.
     *
     * The orientation of the mini-collapse tool will be inferred from this setting.
     *
     * **Note that only Panels may be collapsed.**
     */
    collapseTarget: 'next',

    /**
     * @property {String} orientation
     * Orientation of this Splitter. `'vertical'` when used in an hbox layout, `'horizontal'`
     * when used in a vbox layout.
     */

    horizontal: false,
    vertical: false,

    /**
     * Returns the config object (with an `xclass` property) for the splitter tracker. This
     * is overridden by {@link Ext.resizer.BorderSplitter BorderSplitter} to create a
     * {@link Ext.resizer.BorderSplitterTracker BorderSplitterTracker}.
     * @protected
     */
    getTrackerConfig: function () {
        return {
            xclass: 'Ext.resizer.SplitterTracker',
            el: this.el,
            splitter: this
        };
    },

    beforeRender: function() {
        var me = this,
            target = me.getCollapseTarget(),
            collapseDir = me.getCollapseDirection();

        me.callParent();
        
        if (target.collapsed) {
            me.addCls(me.collapsedClsInternal);
        }
        
        me.addCls(me.baseCls + '-' + me.orientation);
        Ext.applyIf(me.renderData, {
            collapseDir: collapseDir,
            collapsible: me.collapsible || target.collapsible
        });
    },

    onRender: function() {
        var me = this;

        me.callParent(arguments);

        // Add listeners on the mini-collapse tool unless performCollapse is set to false
        if (me.performCollapse !== false) {
            if (me.renderData.collapsible) {
                me.mon(me.collapseEl, 'click', me.toggleTargetCmp, me);
            }
            if (me.collapseOnDblClick) {
                me.mon(me.el, 'dblclick', me.toggleTargetCmp, me);
            }
        }

        // Ensure the mini collapse icon is set to the correct direction when the target is collapsed/expanded by any means
        me.mon(me.getCollapseTarget(), {
            collapse: me.onTargetCollapse,
            expand: me.onTargetExpand,
            scope: me
        });

        me.el.unselectable();
        me.tracker = Ext.create(me.getTrackerConfig());

        // Relay the most important events to our owner (could open wider later):
        me.relayEvents(me.tracker, [ 'beforedragstart', 'dragstart', 'dragend' ]);
    },

    getCollapseDirection: function() {
        var me = this,
            dir = me.collapseDirection,
            collapseTarget, idx, items, type;

        if (!dir) {
            collapseTarget = me.collapseTarget;
            if (collapseTarget.isComponent) {
                dir = collapseTarget.collapseDirection;
            }

            if (!dir) {
                // Avoid duplication of string tests.
                // Create a two bit truth table of the configuration of the Splitter:
                // Collapse Target | orientation
                //        0              0             = next, horizontal
                //        0              1             = next, vertical
                //        1              0             = prev, horizontal
                //        1              1             = prev, vertical
                type = me.ownerCt.layout.type;
                if (collapseTarget.isComponent) {
                    items = me.ownerCt.items;
                    idx = Number(items.indexOf(collapseTarget) == items.indexOf(me) - 1) << 1 | Number(type == 'hbox');
                } else {
                    idx = Number(me.collapseTarget == 'prev') << 1 | Number(type == 'hbox');
                }

                // Read the data out the truth table
                dir = ['bottom', 'right', 'top', 'left'][idx];
            }

            me.collapseDirection = dir;
        }

        me.orientation = (dir == 'top' || dir == 'bottom') ? 'horizontal' : 'vertical';
        me[me.orientation] = true;

        return dir;
    },

    getCollapseTarget: function() {
        var me = this;

        return me.collapseTarget.isComponent ? me.collapseTarget : me.collapseTarget == 'prev' ? me.previousSibling() : me.nextSibling();
    },

    onTargetCollapse: function(target) {
        this.el.addCls([this.collapsedClsInternal, this.collapsedCls]);
    },

    onTargetExpand: function(target) {
        this.el.removeCls([this.collapsedClsInternal, this.collapsedCls]);
    },

    toggleTargetCmp: function(e, t) {
        var cmp = this.getCollapseTarget(),
            placeholder = cmp.placeholder,
            toggle;

        if (placeholder && !placeholder.hidden) {
            toggle = true;
        } else {
            toggle = !cmp.hidden;
        }

        if (toggle) {
            if (cmp.collapsed) {
                cmp.expand();
            } else if (cmp.collapseDirection) {
                cmp.collapse();
            } else {
                cmp.collapse(this.renderData.collapseDir);
            }
        }
    },

    /*
     * Work around IE bug. %age margins do not get recalculated on element resize unless repaint called.
     */
    setSize: function() {
        var me = this;
        me.callParent(arguments);
        if (Ext.isIE && me.el) {
            me.el.repaint();
        }
    }
});

/**
 * The subclasses of this class provide actions to perform upon {@link Ext.form.Basic Form}s.
 *
 * Instances of this class are only created by a {@link Ext.form.Basic Form} when the Form needs to perform an action
 * such as submit or load. The Configuration options listed for this class are set through the Form's action methods:
 * {@link Ext.form.Basic#submit submit}, {@link Ext.form.Basic#load load} and {@link Ext.form.Basic#doAction doAction}
 *
 * The instance of Action which performed the action is passed to the success and failure callbacks of the Form's action
 * methods ({@link Ext.form.Basic#submit submit}, {@link Ext.form.Basic#load load} and
 * {@link Ext.form.Basic#doAction doAction}), and to the {@link Ext.form.Basic#actioncomplete actioncomplete} and
 * {@link Ext.form.Basic#actionfailed actionfailed} event handlers.
 */
Ext.define('Ext.form.action.Action', {
    alternateClassName: 'Ext.form.Action',

    /**
     * @cfg {Ext.form.Basic} form
     * The {@link Ext.form.Basic BasicForm} instance that is invoking this Action. Required.
     */

    /**
     * @cfg {String} url
     * The URL that the Action is to invoke. Will default to the {@link Ext.form.Basic#url url} configured on the
     * {@link #form}.
     */

    /**
     * @cfg {Boolean} reset
     * When set to **true**, causes the Form to be {@link Ext.form.Basic#reset reset} on Action success. If specified,
     * this happens before the {@link #success} callback is called and before the Form's
     * {@link Ext.form.Basic#actioncomplete actioncomplete} event fires.
     */

    /**
     * @cfg {String} method
     * The HTTP method to use to access the requested URL.
     * Defaults to the {@link Ext.form.Basic#method BasicForm's method}, or 'POST' if not specified.
     */

    /**
     * @cfg {Object/String} params
     * Extra parameter values to pass. These are added to the Form's {@link Ext.form.Basic#baseParams} and passed to the
     * specified URL along with the Form's input fields.
     *
     * Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode Ext.Object.toQueryString}.
     */

    /**
     * @cfg {Object} headers
     * Extra headers to be sent in the AJAX request for submit and load actions.
     * See {@link Ext.data.proxy.Ajax#headers}.
     */

    /**
     * @cfg {Number} timeout
     * The number of seconds to wait for a server response before failing with the {@link #failureType} as
     * {@link Ext.form.action.Action#CONNECT_FAILURE}. If not specified, defaults to the configured
     * {@link Ext.form.Basic#timeout timeout} of the {@link #form}.
     */

    /**
     * @cfg {Function} success
     * The function to call when a valid success return packet is received.
     * @cfg {Ext.form.Basic} success.form The form that requested the action
     * @cfg {Ext.form.action.Action} success.action The Action class. The {@link #result} property of this object may
     * be examined to perform custom postprocessing.
     */

    /**
     * @cfg {Function} failure
     * The function to call when a failure packet was received, or when an error ocurred in the Ajax communication.
     * @cfg {Ext.form.Basic} failure.form The form that requested the action
     * @cfg {Ext.form.action.Action} failure.action The Action class. If an Ajax error ocurred, the failure type will
     * be in {@link #failureType}. The {@link #result} property of this object may be examined to perform custom
     * postprocessing.
     */

    /**
     * @cfg {Object} scope
     * The scope in which to call the configured #success and #failure callback functions
     * (the `this` reference for the callback functions).
     */

    /**
     * @cfg {String} waitMsg
     * The message to be displayed by a call to {@link Ext.window.MessageBox#wait} during the time the action is being
     * processed.
     */

    /**
     * @cfg {String} waitTitle
     * The title to be displayed by a call to {@link Ext.window.MessageBox#wait} during the time the action is being
     * processed.
     */

    /**
     * @cfg {Boolean} submitEmptyText
     * If set to true, the emptyText value will be sent with the form when it is submitted.
     */
    submitEmptyText : true,

    /**
     * @property {String} type
     * The type of action this Action instance performs. Currently only "submit" and "load" are supported.
     */

    /**
     * @property {String} failureType
     * The type of failure detected will be one of these:
     * {@link #CLIENT_INVALID}, {@link #SERVER_INVALID}, {@link #CONNECT_FAILURE}, or {@link #LOAD_FAILURE}.
     *
     * Usage:
     *
     *     var fp = new Ext.form.Panel({
     *     ...
     *     buttons: [{
     *         text: 'Save',
     *         formBind: true,
     *         handler: function(){
     *             if(fp.getForm().isValid()){
     *                 fp.getForm().submit({
     *                     url: 'form-submit.php',
     *                     waitMsg: 'Submitting your data...',
     *                     success: function(form, action){
     *                         // server responded with success = true
     *                         var result = action.{@link #result};
     *                     },
     *                     failure: function(form, action){
     *                         if (action.{@link #failureType} === Ext.form.action.Action.CONNECT_FAILURE) {
     *                             Ext.Msg.alert('Error',
     *                                 'Status:'+action.{@link #response}.status+': '+
     *                                 action.{@link #response}.statusText);
     *                         }
     *                         if (action.failureType === Ext.form.action.Action.SERVER_INVALID){
     *                             // server responded with success = false
     *                             Ext.Msg.alert('Invalid', action.{@link #result}.errormsg);
     *                         }
     *                     }
     *                 });
     *             }
     *         }
     *     },{
     *         text: 'Reset',
     *         handler: function(){
     *             fp.getForm().reset();
     *         }
     *     }]
     */

    /**
     * @property {Object} response
     * The raw XMLHttpRequest object used to perform the action.
     */

    /**
     * @property {Object} result
     * The decoded response object containing a boolean `success` property and other, action-specific properties.
     */

    /**
     * Creates new Action.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        if (config) {
            Ext.apply(this, config);
        }

        // Normalize the params option to an Object
        var params = config.params;
        if (Ext.isString(params)) {
            this.params = Ext.Object.fromQueryString(params);
        }
    },

    /**
     * @method
     * Invokes this action using the current configuration.
     */
    run: Ext.emptyFn,

    /**
     * @private
     * @method onSuccess
     * Callback method that gets invoked when the action completes successfully. Must be implemented by subclasses.
     * @param {Object} response
     */

    /**
     * @private
     * @method handleResponse
     * Handles the raw response and builds a result object from it. Must be implemented by subclasses.
     * @param {Object} response
     */

    /**
     * @private
     * Handles a failure response.
     * @param {Object} response
     */
    onFailure : function(response){
        this.response = response;
        this.failureType = Ext.form.action.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },

    /**
     * @private
     * Validates that a response contains either responseText or responseXML and invokes
     * {@link #handleResponse} to build the result object.
     * @param {Object} response The raw response object.
     * @return {Object/Boolean} The result object as built by handleResponse, or `true` if
     * the response had empty responseText and responseXML.
     */
    processResponse : function(response){
        this.response = response;
        if (!response.responseText && !response.responseXML) {
            return true;
        }
        return (this.result = this.handleResponse(response));
    },

    /**
     * @private
     * Build the URL for the AJAX request. Used by the standard AJAX submit and load actions.
     * @return {String} The URL.
     */
    getUrl: function() {
        return this.url || this.form.url;
    },

    /**
     * @private
     * Determine the HTTP method to be used for the request.
     * @return {String} The HTTP method
     */
    getMethod: function() {
        return (this.method || this.form.method || 'POST').toUpperCase();
    },

    /**
     * @private
     * Get the set of parameters specified in the BasicForm's baseParams and/or the params option.
     * Items in params override items of the same name in baseParams.
     * @return {Object} the full set of parameters
     */
    getParams: function() {
        return Ext.apply({}, this.params, this.form.baseParams);
    },

    /**
     * @private
     * Creates a callback object.
     */
    createCallback: function() {
        var me = this,
            undef,
            form = me.form;
        return {
            success: me.onSuccess,
            failure: me.onFailure,
            scope: me,
            timeout: (this.timeout * 1000) || (form.timeout * 1000),
            upload: form.fileUpload ? me.onSuccess : undef
        };
    },

    statics: {
        /**
         * @property
         * Failure type returned when client side validation of the Form fails thus aborting a submit action. Client
         * side validation is performed unless {@link Ext.form.action.Submit#clientValidation} is explicitly set to
         * false.
         * @static
         */
        CLIENT_INVALID: 'client',

        /**
         * @property
         * Failure type returned when server side processing fails and the {@link #result}'s `success` property is set to
         * false.
         *
         * In the case of a form submission, field-specific error messages may be returned in the {@link #result}'s
         * errors property.
         * @static
         */
        SERVER_INVALID: 'server',

        /**
         * @property
         * Failure type returned when a communication error happens when attempting to send a request to the remote
         * server. The {@link #response} may be examined to provide further information.
         * @static
         */
        CONNECT_FAILURE: 'connect',

        /**
         * @property
         * Failure type returned when the response's `success` property is set to false, or no field values are returned
         * in the response's data property.
         * @static
         */
        LOAD_FAILURE: 'load'


    }
});

/**
 * This class provides a container DD instance that allows dragging of multiple child source nodes.
 *
 * This class does not move the drag target nodes, but a proxy element which may contain any DOM structure you wish. The
 * DOM element to show in the proxy is provided by either a provided implementation of {@link #getDragData}, or by
 * registered draggables registered with {@link Ext.dd.Registry}
 *
 * If you wish to provide draggability for an arbitrary number of DOM nodes, each of which represent some application
 * object (For example nodes in a {@link Ext.view.View DataView}) then use of this class is the most efficient way to
 * "activate" those nodes.
 *
 * By default, this class requires that draggable child nodes are registered with {@link Ext.dd.Registry}. However a
 * simpler way to allow a DragZone to manage any number of draggable elements is to configure the DragZone with an
 * implementation of the {@link #getDragData} method which interrogates the passed mouse event to see if it has taken
 * place within an element, or class of elements. This is easily done by using the event's {@link
 * Ext.EventObject#getTarget getTarget} method to identify a node based on a {@link Ext.DomQuery} selector. For example,
 * to make the nodes of a DataView draggable, use the following technique. Knowledge of the use of the DataView is
 * required:
 *
 *     myDataView.on('render', function(v) {
 *         myDataView.dragZone = new Ext.dd.DragZone(v.getEl(), {
 *
 *     //      On receipt of a mousedown event, see if it is within a DataView node.
 *     //      Return a drag data object if so.
 *             getDragData: function(e) {
 *
 *     //          Use the DataView's own itemSelector (a mandatory property) to
 *     //          test if the mousedown is within one of the DataView's nodes.
 *                 var sourceEl = e.getTarget(v.itemSelector, 10);
 *
 *     //          If the mousedown is within a DataView node, clone the node to produce
 *     //          a ddel element for use by the drag proxy. Also add application data
 *     //          to the returned data object.
 *                 if (sourceEl) {
 *                     d = sourceEl.cloneNode(true);
 *                     d.id = Ext.id();
 *                     return {
 *                         ddel: d,
 *                         sourceEl: sourceEl,
 *                         repairXY: Ext.fly(sourceEl).getXY(),
 *                         sourceStore: v.store,
 *                         draggedRecord: v.{@link Ext.view.View#getRecord getRecord}(sourceEl)
 *                     }
 *                 }
 *             },
 *
 *     //      Provide coordinates for the proxy to slide back to on failed drag.
 *     //      This is the original XY coordinates of the draggable element captured
 *     //      in the getDragData method.
 *             getRepairXY: function() {
 *                 return this.dragData.repairXY;
 *             }
 *         });
 *     });
 *
 * See the {@link Ext.dd.DropZone DropZone} documentation for details about building a DropZone which cooperates with
 * this DragZone.
 */
Ext.define('Ext.dd.DragZone', {
    extend: 'Ext.dd.DragSource',

    /**
     * Creates new DragZone.
     * @param {String/HTMLElement/Ext.Element} el The container element or ID of it.
     * @param {Object} config
     */
    constructor : function(el, config){
        this.callParent([el, config]);
        if (this.containerScroll) {
            Ext.dd.ScrollManager.register(this.el);
        }
    },

    /**
     * @property {Object} dragData
     * This property contains the data representing the dragged object. This data is set up by the implementation of the
     * {@link #getDragData} method. It must contain a ddel property, but can contain any other data according to the
     * application's needs.
     */

    /**
     * @cfg {Boolean} containerScroll
     * True to register this container with the Scrollmanager for auto scrolling during drag operations.
     */

    /**
     * Called when a mousedown occurs in this container. Looks in {@link Ext.dd.Registry} for a valid target to drag
     * based on the mouse down. Override this method to provide your own lookup logic (e.g. finding a child by class
     * name). Make sure your returned object has a "ddel" attribute (with an HTML Element) for other functions to work.
     * @param {Event} e The mouse down event
     * @return {Object} The dragData
     */
    getDragData : function(e){
        return Ext.dd.Registry.getHandleFromEvent(e);
    },

    /**
     * Called once drag threshold has been reached to initialize the proxy element. By default, it clones the
     * this.dragData.ddel
     * @param {Number} x The x position of the click on the dragged object
     * @param {Number} y The y position of the click on the dragged object
     * @return {Boolean} true to continue the drag, false to cancel
     */
    onInitDrag : function(x, y){
        this.proxy.update(this.dragData.ddel.cloneNode(true));
        this.onStartDrag(x, y);
        return true;
    },

    /**
     * Called after a repair of an invalid drop. By default, highlights this.dragData.ddel
     */
    afterRepair : function(){
        var me = this;
        if (Ext.enableFx) {
            Ext.fly(me.dragData.ddel).highlight(me.repairHighlightColor);
        }
        me.dragging = false;
    },

    /**
     * Called before a repair of an invalid drop to get the XY to animate to. By default returns the XY of
     * this.dragData.ddel
     * @param {Event} e The mouse up event
     * @return {Number[]} The xy location (e.g. `[100, 200]`)
     */
    getRepairXY : function(e){
        return Ext.fly(this.dragData.ddel).getXY();
    },

    destroy : function(){
        this.callParent();
        if (this.containerScroll) {
            Ext.dd.ScrollManager.unregister(this.el);
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.selection.DataViewModel', {
    extend: 'Ext.selection.Model',

    requires: ['Ext.util.KeyNav'],

    deselectOnContainerClick: true,

    /**
     * @cfg {Boolean} enableKeyNav
     *
     * Turns on/off keyboard navigation within the DataView.
     */
    enableKeyNav: true,

    constructor: function(cfg){
        this.addEvents(
            /**
             * @event beforedeselect
             * Fired before a record is deselected. If any listener returns false, the
             * deselection is cancelled.
             * @param {Ext.selection.DataViewModel} this
             * @param {Ext.data.Model} record The deselected record
             */
            'beforedeselect',

            /**
             * @event beforeselect
             * Fired before a record is selected. If any listener returns false, the
             * selection is cancelled.
             * @param {Ext.selection.DataViewModel} this
             * @param {Ext.data.Model} record The selected record
             */
            'beforeselect',

            /**
             * @event deselect
             * Fired after a record is deselected
             * @param {Ext.selection.DataViewModel} this
             * @param  {Ext.data.Model} record The deselected record
             */
            'deselect',

            /**
             * @event select
             * Fired after a record is selected
             * @param {Ext.selection.DataViewModel} this
             * @param  {Ext.data.Model} record The selected record
             */
            'select'
        );
        this.callParent(arguments);
    },

    bindComponent: function(view) {
        var me = this,
            eventListeners = {
                refresh: me.refresh,
                scope: me
            };

        me.view = view;
        me.bindStore(view.getStore());

        eventListeners[view.triggerEvent] = me.onItemClick;
        eventListeners[view.triggerCtEvent] = me.onContainerClick;

        view.on(eventListeners);

        if (me.enableKeyNav) {
            me.initKeyNav(view);
        }
    },

    onItemClick: function(view, record, item, index, e) {
        this.selectWithEvent(record, e);
    },

    onContainerClick: function() {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    initKeyNav: function(view) {
        var me = this;

        if (!view.rendered) {
            view.on({
                render: Ext.Function.bind(me.initKeyNav, me, [view]),
                single: true
            });
            return;
        }

        view.el.set({
            tabIndex: -1
        });
        me.keyNav = new Ext.util.KeyNav(view.el, {
            down: Ext.pass(me.onNavKey, [1], me),
            right: Ext.pass(me.onNavKey, [1], me),
            left: Ext.pass(me.onNavKey, [-1], me),
            up: Ext.pass(me.onNavKey, [-1], me),
            scope: me
        });
    },

    onNavKey: function(step) {
        step = step || 1;
        var me = this,
            view = me.view,
            selected = me.getSelection()[0],
            numRecords = me.view.store.getCount(),
            idx;

        if (selected) {
            idx = view.indexOf(view.getNode(selected)) + step;
        } else {
            idx = 0;
        }

        if (idx < 0) {
            idx = numRecords - 1;
        } else if (idx >= numRecords) {
            idx = 0;
        }

        me.select(idx);
    },

    // Allow the DataView to update the ui
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me = this,
            view = me.view,
            eventName = isSelected ? 'select' : 'deselect';

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record)) !== false &&
                commitFn() !== false) {

            if (view) {
                if (isSelected) {
                    view.onItemSelect(record);
                } else {
                    view.onItemDeselect(record);
                }
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record);
            }
        }
    },
    
    destroy: function(){
        Ext.destroy(this.keyNav);
        this.callParent();
    }
});

/**
 * Provides easy access to all drag drop components that are registered on a page. Items can be retrieved either
 * directly by DOM node id, or by passing in the drag drop event that occurred and looking up the event target.
 */
Ext.define('Ext.dd.Registry', {
    singleton: true,
    constructor: function() {
        this.elements = {}; 
        this.handles = {}; 
        this.autoIdSeed = 0;
    },
    
    getId: function(el, autogen){
        if(typeof el == "string"){
            return el;
        }
        var id = el.id;
        if(!id && autogen !== false){
            id = "extdd-" + (++this.autoIdSeed);
            el.id = id;
        }
        return id;
    },
    
    /**
     * Registers a drag drop element.
     *
     * @param {String/HTMLElement} element The id or DOM node to register
     * @param {Object} data An custom data object that will be passed between the elements that are involved in drag
     * drop operations. You can populate this object with any arbitrary properties that your own code knows how to
     * interpret, plus there are some specific properties known to the Registry that should be populated in the data
     * object (if applicable):
     * @param {HTMLElement[]} data.handles Array of DOM nodes that trigger dragging for the element being registered.
     * @param {Boolean} data.isHandle True if the element passed in triggers dragging itself, else false.
     */
    register : function(el, data){
        data = data || {};
        if (typeof el == "string") {
            el = document.getElementById(el);
        }
        data.ddel = el;
        this.elements[this.getId(el)] = data;
        if (data.isHandle !== false) {
            this.handles[data.ddel.id] = data;
        }
        if (data.handles) {
            var hs = data.handles,
                i, len;
            for (i = 0, len = hs.length; i < len; i++) {
                this.handles[this.getId(hs[i])] = data;
            }
        }
    },

    /**
     * Unregister a drag drop element
     * @param {String/HTMLElement} element The id or DOM node to unregister
     */
    unregister : function(el){
        var id = this.getId(el, false),
            data = this.elements[id],
            hs, i, len;
        if(data){
            delete this.elements[id];
            if(data.handles){
                hs = data.handles;
                for (i = 0, len = hs.length; i < len; i++) {
                    delete this.handles[this.getId(hs[i], false)];
                }
            }
        }
    },

    /**
     * Returns the handle registered for a DOM Node by id
     * @param {String/HTMLElement} id The DOM node or id to look up
     * @return {Object} handle The custom handle data
     */
    getHandle : function(id){
        if(typeof id != "string"){ // must be element?
            id = id.id;
        }
        return this.handles[id];
    },

    /**
     * Returns the handle that is registered for the DOM node that is the target of the event
     * @param {Event} e The event
     * @return {Object} handle The custom handle data
     */
    getHandleFromEvent : function(e){
        var t = e.getTarget();
        return t ? this.handles[t.id] : null;
    },

    /**
     * Returns a custom data object that is registered for a DOM node by id
     * @param {String/HTMLElement} id The DOM node or id to look up
     * @return {Object} data The custom data
     */
    getTarget : function(id){
        if(typeof id != "string"){ // must be element?
            id = id.id;
        }
        return this.elements[id];
    },

    /**
     * Returns a custom data object that is registered for the DOM node that is the target of the event
     * @param {Event} e The event
     * @return {Object} data The custom data
     */
    getTargetFromEvent : function(e){
        var t = e.getTarget();
        return t ? this.elements[t.id] || this.handles[t.id] : null;
    }
});
/*
 * This is a derivative of the similarly named class in the YUI Library.
 * The original license:
 * Copyright (c) 2006, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 */


/**
 * A DragDrop implementation that does not move, but can be a drop
 * target.  You would get the same result by simply omitting implementation
 * for the event callbacks, but this way we reduce the processing cost of the
 * event listener and the callbacks.
 */
Ext.define('Ext.dd.DDTarget', {
    extend: 'Ext.dd.DragDrop',

    /**
     * Creates new DDTarget.
     * @param {String} id the id of the element that is a drop target
     * @param {String} sGroup the group of related DragDrop objects
     * @param {Object} config an object containing configurable attributes.
     * Valid properties for DDTarget in addition to those in DragDrop: none.
     */
    constructor: function(id, sGroup, config) {
        if (id) {
            this.initTarget(id, sGroup, config);
        }
    },

    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    getDragEl: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    isValidHandleChild: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    startDrag: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    endDrag: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDrag: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragDrop: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragEnter: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragOut: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragOver: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onInvalidDrop: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onMouseDown: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onMouseUp: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setXConstraint: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setYConstraint: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    resetConstraints: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    clearConstraints: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    clearTicks: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setInitPosition: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setDragElId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setHandleElId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setOuterHandleElId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    addInvalidHandleClass: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    addInvalidHandleId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    addInvalidHandleType: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    removeInvalidHandleClass: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    removeInvalidHandleId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    removeInvalidHandleType: Ext.emptyFn,

    toString: function() {
        return ("DDTarget " + this.id);
    }
});
/**
 * Provides automatic scrolling of overflow regions in the page during drag operations.
 *
 * The ScrollManager configs will be used as the defaults for any scroll container registered with it, but you can also
 * override most of the configs per scroll container by adding a ddScrollConfig object to the target element that
 * contains these properties: {@link #hthresh}, {@link #vthresh}, {@link #increment} and {@link #frequency}. Example
 * usage:
 *
 *     var el = Ext.get('scroll-ct');
 *     el.ddScrollConfig = {
 *         vthresh: 50,
 *         hthresh: -1,
 *         frequency: 100,
 *         increment: 200
 *     };
 *     Ext.dd.ScrollManager.register(el);
 *
 * Note: This class is designed to be used in "Point Mode
 */
Ext.define('Ext.dd.ScrollManager', {
    singleton: true,
    requires: [
        'Ext.dd.DragDropManager'
    ],

    constructor: function() {
        var ddm = Ext.dd.DragDropManager;
        ddm.fireEvents = Ext.Function.createSequence(ddm.fireEvents, this.onFire, this);
        ddm.stopDrag = Ext.Function.createSequence(ddm.stopDrag, this.onStop, this);
        this.doScroll = Ext.Function.bind(this.doScroll, this);
        this.ddmInstance = ddm;
        this.els = {};
        this.dragEl = null;
        this.proc = {};
    },

    onStop: function(e){
        var sm = Ext.dd.ScrollManager;
        sm.dragEl = null;
        sm.clearProc();
    },

    triggerRefresh: function() {
        if (this.ddmInstance.dragCurrent) {
            this.ddmInstance.refreshCache(this.ddmInstance.dragCurrent.groups);
        }
    },

    doScroll: function() {
        if (this.ddmInstance.dragCurrent) {
            var proc   = this.proc,
                procEl = proc.el,
                ddScrollConfig = proc.el.ddScrollConfig,
                inc = ddScrollConfig ? ddScrollConfig.increment : this.increment;

            if (!this.animate) {
                if (procEl.scroll(proc.dir, inc)) {
                    this.triggerRefresh();
                }
            } else {
                procEl.scroll(proc.dir, inc, true, this.animDuration, this.triggerRefresh);
            }
        }
    },

    clearProc: function() {
        var proc = this.proc;
        if (proc.id) {
            clearInterval(proc.id);
        }
        proc.id = 0;
        proc.el = null;
        proc.dir = "";
    },

    startProc: function(el, dir) {
        this.clearProc();
        this.proc.el = el;
        this.proc.dir = dir;
        var group = el.ddScrollConfig ? el.ddScrollConfig.ddGroup : undefined,
            freq  = (el.ddScrollConfig && el.ddScrollConfig.frequency)
                  ? el.ddScrollConfig.frequency
                  : this.frequency;

        if (group === undefined || this.ddmInstance.dragCurrent.ddGroup == group) {
            this.proc.id = setInterval(this.doScroll, freq);
        }
    },

    onFire: function(e, isDrop) {
        if (isDrop || !this.ddmInstance.dragCurrent) {
            return;
        }
        if (!this.dragEl || this.dragEl != this.ddmInstance.dragCurrent) {
            this.dragEl = this.ddmInstance.dragCurrent;
            // refresh regions on drag start
            this.refreshCache();
        }

        var xy = e.getXY(),
            pt = e.getPoint(),
            proc = this.proc,
            els = this.els,
            id, el, r, c;

        for (id in els) {
            el = els[id];
            r = el._region;
            c = el.ddScrollConfig ? el.ddScrollConfig : this;
            if (r && r.contains(pt) && el.isScrollable()) {
                if (r.bottom - pt.y <= c.vthresh) {
                    if(proc.el != el){
                        this.startProc(el, "down");
                    }
                    return;
                }else if (r.right - pt.x <= c.hthresh) {
                    if (proc.el != el) {
                        this.startProc(el, "left");
                    }
                    return;
                } else if(pt.y - r.top <= c.vthresh) {
                    if (proc.el != el) {
                        this.startProc(el, "up");
                    }
                    return;
                } else if(pt.x - r.left <= c.hthresh) {
                    if (proc.el != el) {
                        this.startProc(el, "right");
                    }
                    return;
                }
            }
        }
        this.clearProc();
    },

    /**
     * Registers new overflow element(s) to auto scroll
     * @param {String/HTMLElement/Ext.Element/String[]/HTMLElement[]/Ext.Element[]} el
     * The id of or the element to be scrolled or an array of either
     */
    register : function(el){
        if (Ext.isArray(el)) {
            for(var i = 0, len = el.length; i < len; i++) {
                    this.register(el[i]);
            }
        } else {
            el = Ext.get(el);
            this.els[el.id] = el;
        }
    },

    /**
     * Unregisters overflow element(s) so they are no longer scrolled
     * @param {String/HTMLElement/Ext.Element/String[]/HTMLElement[]/Ext.Element[]} el
     * The id of or the element to be removed or an array of either
     */
    unregister : function(el){
        if(Ext.isArray(el)){
            for (var i = 0, len = el.length; i < len; i++) {
                this.unregister(el[i]);
            }
        }else{
            el = Ext.get(el);
            delete this.els[el.id];
        }
    },

    /**
     * The number of pixels from the top or bottom edge of a container the pointer needs to be to trigger scrolling
     */
    vthresh : 25,

    /**
     * The number of pixels from the right or left edge of a container the pointer needs to be to trigger scrolling
     */
    hthresh : 25,

    /**
     * The number of pixels to scroll in each scroll increment
     */
    increment : 100,

    /**
     * The frequency of scrolls in milliseconds
     */
    frequency : 500,

    /**
     * True to animate the scroll
     */
    animate: true,

    /**
     * The animation duration in seconds - MUST BE less than Ext.dd.ScrollManager.frequency!
     */
    animDuration: 0.4,

    /**
     * @property {String} ddGroup
     * The named drag drop {@link Ext.dd.DragSource#ddGroup group} to which this container belongs. If a ddGroup is
     * specified, then container scrolling will only occur when a dragged object is in the same ddGroup.
     */
    ddGroup: undefined,

    /**
     * Manually trigger a cache refresh.
     */
    refreshCache : function(){
        var els = this.els,
            id;
        for (id in els) {
            if(typeof els[id] == 'object'){ // for people extending the object prototype
                els[id]._region = els[id].getRegion();
            }
        }
    }
});

/**
 * Private utility class for Ext.Splitter.
 * @private
 */
Ext.define('Ext.resizer.SplitterTracker', {
    extend: 'Ext.dd.DragTracker',
    requires: ['Ext.util.Region'],
    enabled: true,
    
    overlayCls: Ext.baseCSSPrefix + 'resizable-overlay',

    createDragOverlay: function () {
        var overlay;

        overlay = this.overlay =  Ext.getBody().createChild({
            cls: this.overlayCls, 
            html: '&#160;'
        });

        overlay.unselectable();
        overlay.setSize(Ext.Element.getViewWidth(true), Ext.Element.getViewHeight(true));
        overlay.show();
    },

    getPrevCmp: function() {
        var splitter = this.getSplitter();
        return splitter.previousSibling();
    },

    getNextCmp: function() {
        var splitter = this.getSplitter();
        return splitter.nextSibling();
    },

    // ensure the tracker is enabled, store boxes of previous and next
    // components and calculate the constrain region
    onBeforeStart: function(e) {
        var me = this,
            prevCmp = me.getPrevCmp(),
            nextCmp = me.getNextCmp(),
            collapseEl = me.getSplitter().collapseEl,
            target = e.getTarget(),
            box;

        if (collapseEl && target === me.getSplitter().collapseEl.dom) {
            return false;
        }

        // SplitterTracker is disabled if any of its adjacents are collapsed.
        if (nextCmp.collapsed || prevCmp.collapsed) {
            return false;
        }

        // store boxes of previous and next
        me.prevBox  = prevCmp.getEl().getBox();
        me.nextBox  = nextCmp.getEl().getBox();
        me.constrainTo = box = me.calculateConstrainRegion();

        if (!box) {
            return false;
        }

        me.createDragOverlay();

        return box;
    },

    // We move the splitter el. Add the proxy class.
    onStart: function(e) {
        var splitter = this.getSplitter();
        splitter.addCls(splitter.baseCls + '-active');
    },

    // calculate the constrain Region in which the splitter el may be moved.
    calculateConstrainRegion: function() {
        var me         = this,
            splitter   = me.getSplitter(),
            splitWidth = splitter.getWidth(),
            defaultMin = splitter.defaultSplitMin,
            orient     = splitter.orientation,
            prevBox    = me.prevBox,
            prevCmp    = me.getPrevCmp(),
            nextBox    = me.nextBox,
            nextCmp    = me.getNextCmp(),
            // prev and nextConstrainRegions are the maximumBoxes minus the
            // minimumBoxes. The result is always the intersection
            // of these two boxes.
            prevConstrainRegion, nextConstrainRegion;

        // vertical splitters, so resizing left to right
        if (orient === 'vertical') {

            // Region constructor accepts (top, right, bottom, left)
            // anchored/calculated from the left
            prevConstrainRegion = new Ext.util.Region(
                prevBox.y,
                // Right boundary is x + maxWidth if there IS a maxWidth.
                // Otherwise it is calculated based upon the minWidth of the next Component
                (prevCmp.maxWidth ? prevBox.x + prevCmp.maxWidth : nextBox.right - (nextCmp.minWidth || defaultMin)) + splitWidth,
                prevBox.bottom,
                prevBox.x + (prevCmp.minWidth || defaultMin)
            );
            // anchored/calculated from the right
            nextConstrainRegion = new Ext.util.Region(
                nextBox.y,
                nextBox.right - (nextCmp.minWidth || defaultMin),
                nextBox.bottom,
                // Left boundary is right - maxWidth if there IS a maxWidth.
                // Otherwise it is calculated based upon the minWidth of the previous Component
                (nextCmp.maxWidth ? nextBox.right - nextCmp.maxWidth : prevBox.x + (prevBox.minWidth || defaultMin)) - splitWidth
            );
        } else {
            // anchored/calculated from the top
            prevConstrainRegion = new Ext.util.Region(
                prevBox.y + (prevCmp.minHeight || defaultMin),
                prevBox.right,
                // Bottom boundary is y + maxHeight if there IS a maxHeight.
                // Otherwise it is calculated based upon the minWidth of the next Component
                (prevCmp.maxHeight ? prevBox.y + prevCmp.maxHeight : nextBox.bottom - (nextCmp.minHeight || defaultMin)) + splitWidth,
                prevBox.x
            );
            // anchored/calculated from the bottom
            nextConstrainRegion = new Ext.util.Region(
                // Top boundary is bottom - maxHeight if there IS a maxHeight.
                // Otherwise it is calculated based upon the minHeight of the previous Component
                (nextCmp.maxHeight ? nextBox.bottom - nextCmp.maxHeight : prevBox.y + (prevCmp.minHeight || defaultMin)) - splitWidth,
                nextBox.right,
                nextBox.bottom - (nextCmp.minHeight || defaultMin),
                nextBox.x
            );
        }

        // intersection of the two regions to provide region draggable
        return prevConstrainRegion.intersect(nextConstrainRegion);
    },

    // Performs the actual resizing of the previous and next components
    performResize: function(e, offset) {
        var me        = this,
            splitter  = me.getSplitter(),
            orient    = splitter.orientation,
            prevCmp   = me.getPrevCmp(),
            nextCmp   = me.getNextCmp(),
            owner     = splitter.ownerCt,
            flexedSiblings = owner.query('>[flex]'),
            len       = flexedSiblings.length,
            i         = 0,
            dimension,
            size,
            totalFlex = 0;

        // Convert flexes to pixel values proportional to the total pixel width of all flexes.
        for (; i < len; i++) {
            size = flexedSiblings[i].getWidth();
            totalFlex += size;
            flexedSiblings[i].flex = size;
        }

        offset = offset || me.getOffset('dragTarget');

        if (orient === 'vertical') {
            offset = offset[0];
            dimension = 'width';
        } else {
            dimension = 'height';
            offset = offset[1];
        }
        if (prevCmp) {
            size = me.prevBox[dimension] + offset;
            if (prevCmp.flex) {
                prevCmp.flex = size;
            } else {
                prevCmp[dimension] = size;
            }
        }
        if (nextCmp) {
            size = me.nextBox[dimension] - offset;
            if (nextCmp.flex) {
                nextCmp.flex = size;
            } else {
                nextCmp[dimension] = size;
            }
        }

        owner.updateLayout();
    },

    // Cleans up the overlay (if we have one) and calls the base. This cannot be done in
    // onEnd, because onEnd is only called if a drag is detected but the overlay is created
    // regardless (by onBeforeStart).
    endDrag: function () {
        var me = this;

        if (me.overlay) {
             me.overlay.remove();
             delete me.overlay;
        }

        me.callParent(arguments); // this calls onEnd
    },

    // perform the resize and remove the proxy class from the splitter el
    onEnd: function(e) {
        var me = this,
            splitter = me.getSplitter();
            
        splitter.removeCls(splitter.baseCls + '-active');
        me.performResize(e, me.getOffset('dragTarget'));
    },

    // Track the proxy and set the proper XY coordinates
    // while constraining the drag
    onDrag: function(e) {
        var me        = this,
            offset    = me.getOffset('dragTarget'),
            splitter  = me.getSplitter(),
            splitEl   = splitter.getEl(),
            orient    = splitter.orientation;

        if (orient === "vertical") {
            splitEl.setX(me.startRegion.left + offset[0]);
        } else {
            splitEl.setY(me.startRegion.top + offset[1]);
        }
    },

    getSplitter: function() {
        return this.splitter;
    }
});
/**
 * Implements row based navigation via keyboard.
 *
 * Must synchronize across grid sections.
 */
Ext.define('Ext.selection.RowModel', {
    extend: 'Ext.selection.Model',
    alias: 'selection.rowmodel',
    requires: ['Ext.util.KeyNav'],

    /**
     * @private
     * Number of pixels to scroll to the left/right when pressing
     * left/right keys.
     */
    deltaScroll: 5,

    /**
     * @cfg {Boolean} enableKeyNav
     *
     * Turns on/off keyboard navigation within the grid.
     */
    enableKeyNav: true,
    
    /**
     * @cfg {Boolean} [ignoreRightMouseSelection=false]
     * True to ignore selections that are made when using the right mouse button if there are
     * records that are already selected. If no records are selected, selection will continue 
     * as normal
     */
    ignoreRightMouseSelection: false,

    constructor: function() {
        this.addEvents(
            /**
             * @event beforedeselect
             * Fired before a record is deselected. If any listener returns false, the
             * deselection is cancelled.
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The deselected record
             * @param {Number} index The row index deselected
             */
            'beforedeselect',

            /**
             * @event beforeselect
             * Fired before a record is selected. If any listener returns false, the
             * selection is cancelled.
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The selected record
             * @param {Number} index The row index selected
             */
            'beforeselect',

            /**
             * @event deselect
             * Fired after a record is deselected
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The deselected record
             * @param {Number} index The row index deselected
             */
            'deselect',

            /**
             * @event select
             * Fired after a record is selected
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The selected record
             * @param {Number} index The row index selected
             */
            'select'
        );
        this.views = [];
        this.callParent(arguments);
    },

    bindComponent: function(view) {
        var me = this;

        me.views = me.views || [];
        me.views.push(view);
        me.bindStore(view.getStore(), true);

        view.on({
            itemmousedown: me.onRowMouseDown,
            scope: me
        });

        if (me.enableKeyNav) {
            me.initKeyNav(view);
        }
    },

    initKeyNav: function(view) {
        var me = this;

        if (!view.rendered) {
            view.on('render', Ext.Function.bind(me.initKeyNav, me, [view], 0), me, {single: true});
            return;
        }

        // view.el has tabIndex -1 to allow for
        // keyboard events to be passed to it.
        view.el.set({
            tabIndex: -1
        });

        // Drive the KeyNav off the View's itemkeydown event so that beforeitemkeydown listeners may veto
        me.keyNav = new Ext.util.KeyNav({
            target: view,
            eventName: 'itemkeydown',
            processEvent: function(view, record, node, index, event) {
                event.record = record;
                event.recordIndex = index;
                return event;
            },
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            pageDown: me.onKeyPageDown,
            pageUp: me.onKeyPageUp,
            home: me.onKeyHome,
            end: me.onKeyEnd,
            space: me.onKeySpace,
            scope: me
        });
    },

    // Returns the number of rows currently visible on the screen or
    // false if there were no rows. This assumes that all rows are
    // of the same height and the first view is accurate.
    getRowsVisible: function() {
        var rowsVisible = false,
            view = this.views[0],
            row = view.getNode(0),
            rowHeight, gridViewHeight;

        if (row) {
            rowHeight = Ext.fly(row).getHeight();
            gridViewHeight = view.el.getHeight();
            rowsVisible = Math.floor(gridViewHeight / rowHeight);
        }

        return rowsVisible;
    },

    // go to last visible record in grid.
    onKeyEnd: function(e) {
        var me = this,
            last = me.store.getAt(me.store.getCount() - 1);

        if (last) {
            if (e.shiftKey) {
                me.selectRange(last, me.lastFocused || 0);
                me.setLastFocused(last);
            } else if (e.ctrlKey) {
                me.setLastFocused(last);
            } else {
                me.doSelect(last);
            }
        }
    },

    // go to first visible record in grid.
    onKeyHome: function(e) {
        var me = this,
            first = me.store.getAt(0);

        if (first) {
            if (e.shiftKey) {
                me.selectRange(first, me.lastFocused || 0);
                me.setLastFocused(first);
            } else if (e.ctrlKey) {
                me.setLastFocused(first);
            } else {
                me.doSelect(first, false);
            }
        }
    },

    // Go one page up from the lastFocused record in the grid.
    onKeyPageUp: function(e) {
        var me = this,
            rowsVisible = me.getRowsVisible(),
            selIdx,
            prevIdx,
            prevRecord;

        if (rowsVisible) {
            selIdx = e.recordIndex;
            prevIdx = selIdx - rowsVisible;
            if (prevIdx < 0) {
                prevIdx = 0;
            }
            prevRecord = me.store.getAt(prevIdx);
            if (e.shiftKey) {
                me.selectRange(prevRecord, e.record, e.ctrlKey, 'up');
                me.setLastFocused(prevRecord);
            } else if (e.ctrlKey) {
                e.preventDefault();
                me.setLastFocused(prevRecord);
            } else {
                me.doSelect(prevRecord);
            }

        }
    },

    // Go one page down from the lastFocused record in the grid.
    onKeyPageDown: function(e) {
        var me = this,
            rowsVisible = me.getRowsVisible(),
            selIdx,
            nextIdx,
            nextRecord;

        if (rowsVisible) {
            selIdx = e.recordIndex;
            nextIdx = selIdx + rowsVisible;
            if (nextIdx >= me.store.getCount()) {
                nextIdx = me.store.getCount() - 1;
            }
            nextRecord = me.store.getAt(nextIdx);
            if (e.shiftKey) {
                me.selectRange(nextRecord, e.record, e.ctrlKey, 'down');
                me.setLastFocused(nextRecord);
            } else if (e.ctrlKey) {
                // some browsers, this means go thru browser tabs
                // attempt to stop.
                e.preventDefault();
                me.setLastFocused(nextRecord);
            } else {
                me.doSelect(nextRecord);
            }
        }
    },

    // Select/Deselect based on pressing Spacebar.
    // Assumes a SIMPLE selectionmode style
    onKeySpace: function(e) {
        var me = this,
            record = me.lastFocused;

        if (record) {
            if (me.isSelected(record)) {
                me.doDeselect(record, false);
            } else {
                me.doSelect(record, true);
            }
        }
    },

    // Navigate one record up. This could be a selection or
    // could be simply focusing a record for discontiguous
    // selection. Provides bounds checking.
    onKeyUp: function(e) {
        var me = this,
            idx  = me.store.indexOf(me.lastFocused),
            record;

        if (idx > 0) {
            // needs to be the filtered count as thats what
            // will be visible.
            record = me.store.getAt(idx - 1);
            if (e.shiftKey && me.lastFocused) {
                if (me.isSelected(me.lastFocused) && me.isSelected(record)) {
                    me.doDeselect(me.lastFocused, true);
                    me.setLastFocused(record);
                } else if (!me.isSelected(me.lastFocused)) {
                    me.doSelect(me.lastFocused, true);
                    me.doSelect(record, true);
                } else {
                    me.doSelect(record, true);
                }
            } else if (e.ctrlKey) {
                me.setLastFocused(record);
            } else {
                me.doSelect(record);
                //view.focusRow(idx - 1);
            }
        }
        // There was no lastFocused record, and the user has pressed up
        // Ignore??
        //else if (this.selected.getCount() == 0) {
        //
        //    this.doSelect(record);
        //    //view.focusRow(idx - 1);
        //}
    },

    // Navigate one record down. This could be a selection or
    // could be simply focusing a record for discontiguous
    // selection. Provides bounds checking.
    onKeyDown: function(e) {
        var me = this,
            idx  = me.store.indexOf(me.lastFocused),
            record;

        // needs to be the filtered count as thats what
        // will be visible.
        if (idx + 1 < me.store.getCount()) {
            record = me.store.getAt(idx + 1);
            if (me.selected.getCount() === 0) {
                if (!e.ctrlKey) {
                    me.doSelect(record);
                } else {
                    me.setLastFocused(record);
                }
                //view.focusRow(idx + 1);
            } else if (e.shiftKey && me.lastFocused) {
                if (me.isSelected(me.lastFocused) && me.isSelected(record)) {
                    me.doDeselect(me.lastFocused, true);
                    me.setLastFocused(record);
                } else if (!me.isSelected(me.lastFocused)) {
                    me.doSelect(me.lastFocused, true);
                    me.doSelect(record, true);
                } else {
                    me.doSelect(record, true);
                }
            } else if (e.ctrlKey) {
                me.setLastFocused(record);
            } else {
                me.doSelect(record);
                //view.focusRow(idx + 1);
            }
        }
    },

    scrollByDeltaX: function(delta) {
        var view    = this.views[0],
            section = view.up(),
            hScroll = section.horizontalScroller;

        if (hScroll) {
            hScroll.scrollByDeltaX(delta);
        }
    },

    onKeyLeft: function(e) {
        this.scrollByDeltaX(-this.deltaScroll);
    },

    onKeyRight: function(e) {
        this.scrollByDeltaX(this.deltaScroll);
    },

    // Select the record with the event included so that
    // we can take into account ctrlKey, shiftKey, etc
    onRowMouseDown: function(view, record, item, index, e) {
        if (!this.allowRightMouseSelection(e)) {
            return;
        }

        if (e.button === 0 || !this.isSelected(record)) {
            this.selectWithEvent(record, e);
        }
    },
    
    /**
     * Checks whether a selection should proceed based on the ignoreRightMouseSelection
     * option.
     * @private
     * @param {Ext.EventObject} e The event
     * @return {Boolean} False if the selection should not proceed
     */
    allowRightMouseSelection: function(e) {
        var disallow = this.ignoreRightMouseSelection && e.button !== 0;
        if (disallow) {
            disallow = this.hasSelection();
        }
        return !disallow;
    },

    // Allow the GridView to update the UI by
    // adding/removing a CSS class from the row.
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me      = this,
            views   = me.views,
            viewsLn = views.length,
            store   = me.store,
            rowIdx  = store.indexOf(record),
            eventName = isSelected ? 'select' : 'deselect',
            i = 0;

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record, rowIdx)) !== false &&
                commitFn() !== false) {

            for (; i < viewsLn; i++) {
                if (isSelected) {
                    views[i].onRowSelect(rowIdx, suppressEvent);
                } else {
                    views[i].onRowDeselect(rowIdx, suppressEvent);
                }
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record, rowIdx);
            }
        }
    },

    // Provide indication of what row was last focused via
    // the gridview.
    onLastFocusChanged: function(oldFocused, newFocused, supressFocus) {
        var views   = this.views,
            viewsLn = views.length,
            store   = this.store,
            rowIdx,
            i = 0;

        if (oldFocused) {
            rowIdx = store.indexOf(oldFocused);
            if (rowIdx != -1) {
                for (; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, false);
                }
            }
        }

        if (newFocused) {
            rowIdx = store.indexOf(newFocused);
            if (rowIdx != -1) {
                for (i = 0; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, true, supressFocus);
                }
            }
        }
        this.callParent();
    },

    onEditorTab: function(editingPlugin, e) {
        var me = this,
            view = me.views[0],
            record = editingPlugin.getActiveRecord(),
            header = editingPlugin.getActiveColumn(),
            position = view.getPosition(record, header),
            direction = e.shiftKey ? 'left' : 'right';

        do {
            position  = view.walkCells(position, direction, e, me.preventWrap);
        } while(position && !view.headerCt.getHeaderAtIndex(position.column).getEditor());

        if (position) {
            editingPlugin.startEditByPosition(position);
        }
    },

    selectByPosition: function(position) {
        var record = this.store.getAt(position.row);
        this.select(record);
    },


    /**
     * Selects the record immediately following the currently selected record.
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to false to not fire a select event
     * @return {Boolean} `true` if there is a next record, else `false`
     */
    selectNext: function(keepExisting, suppressEvent) {
        var me = this,
            store = me.store,
            selection = me.getSelection(),
            record = selection[selection.length - 1],
            index = store.indexOf(record) + 1,
            success;

        if(index === store.getCount() || index === 0) {
            success = false;
        } else {
            me.doSelect(index, keepExisting, suppressEvent);
            success = true;
        }
        return success;
    },

    /**
     * Selects the record that precedes the currently selected record.
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to false to not fire a select event
     * @return {Boolean} `true` if there is a previous record, else `false`
     */
    selectPrevious: function(keepExisting, suppressEvent) {
        var me = this,
            selection = me.getSelection(),
            record = selection[0],
            index = me.store.indexOf(record) - 1,
            success;

        if (index < 0) {
            success = false;
        } else {
            me.doSelect(index, keepExisting, suppressEvent);
            success = true;
        }
        return success;
    }
});
/**
 * Private utility class for Ext.BorderSplitter.
 * @private
 */
Ext.define('Ext.resizer.BorderSplitterTracker', {
    extend: 'Ext.resizer.SplitterTracker',
    requires: ['Ext.util.Region'],

    getPrevCmp: null,
    getNextCmp: null,

    // calculate the constrain Region in which the splitter el may be moved.
    calculateConstrainRegion: function() {
        var me = this,
            splitter = me.splitter,
            collapseTarget = splitter.collapseTarget,
            defaultSplitMin = splitter.defaultSplitMin,
            sizePropCap = splitter.vertical ? 'Width' : 'Height',
            minSizeProp = 'min' + sizePropCap,
            maxSizeProp = 'max' + sizePropCap,
            getSizeMethod = 'get' + sizePropCap,
            neighbors = splitter.neighbors,
            length = neighbors.length,
            box = collapseTarget.el.getBox(),
            left = box.x,
            top = box.y,
            right = box.right,
            bottom = box.bottom,
            size = splitter.vertical ? (right - left) : (bottom - top),
            //neighborSizes = [],
            i, neighbor, minRange, maxRange, maxGrowth, maxShrink, targetSize;

        // if size=100 and minSize=80, we can reduce by 20 so minRange = minSize-size = -20
        minRange = (collapseTarget[minSizeProp] || Math.min(size,defaultSplitMin)) - size;

        // if maxSize=150, maxRange = maxSize - size = 50
        maxRange = collapseTarget[maxSizeProp];
        if (!maxRange) {
            maxRange = 1e9;
        } else {
            maxRange -= size;
        }
        targetSize = size;

        for (i = 0; i < length; ++i) {
            neighbor = neighbors[i];
            size = neighbor[getSizeMethod]();
            //neighborSizes.push(size);

            maxGrowth = size - neighbor[maxSizeProp]; // NaN if no maxSize or negative
            maxShrink = size - (neighbor[minSizeProp] || Math.min(size,defaultSplitMin));

            if (!isNaN(maxGrowth)) {
                // if neighbor can only grow by 10 (maxGrowth = -10), minRange cannot be
                // -20 anymore, but now only -10:
                if (minRange < maxGrowth) {
                    minRange = maxGrowth;
                }
            }

            // if neighbor can shrink by 20 (maxShrink=20), maxRange cannot be 50 anymore,
            // but now only 20:
            if (maxRange > maxShrink) {
                maxRange = maxShrink;
            }
        }

        if (maxRange - minRange < 2) {
            return null;
        }

        box = new Ext.util.Region(top, right, bottom, left);

        me.constraintAdjusters[splitter.collapseDirection](box, minRange, maxRange, splitter);

        me.dragInfo = {
            minRange: minRange,
            maxRange: maxRange,
            //neighborSizes: neighborSizes,
            targetSize: targetSize
        };

        return box;
    },

    constraintAdjusters: {
        // splitter is to the right of the box
        left: function (box, minRange, maxRange, splitter) {
            box[0] = box.x = box.left = box.right + minRange;
            box.right += maxRange + splitter.getWidth();
        },

        // splitter is below the box
        top: function (box, minRange, maxRange, splitter) {
            box[1] = box.y = box.top = box.bottom + minRange;
            box.bottom += maxRange + splitter.getHeight();
        },

        // splitter is above the box
        bottom: function (box, minRange, maxRange, splitter) {
            box.bottom = box.top - minRange;
            box.top -= maxRange + splitter.getHeight();
        },

        // splitter is to the left of the box
        right: function (box, minRange, maxRange, splitter) {
            box.right = box.left - minRange;
            box.left -= maxRange + splitter.getWidth();
        }
    },

    onBeforeStart: function(e) {
        var me = this,
            splitter = me.splitter,
            collapseTarget = splitter.collapseTarget,
            neighbors = splitter.neighbors,
            collapseEl = me.getSplitter().collapseEl,
            target = e.getTarget(),
            length = neighbors.length,
            i, neighbor;
            
        if (collapseEl && target === splitter.collapseEl.dom) {
            return false;
        }

        if (collapseTarget.collapsed) {
            return false;
        }

        // disabled if any neighbors are collapsed in parallel direction.
        for (i = 0; i < length; ++i) {
            neighbor = neighbors[i];

            if (neighbor.collapsed && neighbor.isHorz === collapseTarget.isHorz) {
                return false;
            }
        }

        if (!(me.constrainTo = me.calculateConstrainRegion())) {
            return false;
        }

        me.createDragOverlay();
        return true;
    },

    performResize: function(e, offset) {
        var me = this,
            splitter = me.splitter,
            collapseDirection = splitter.collapseDirection,
            collapseTarget = splitter.collapseTarget,
            // a vertical splitter adjusts horizontal dimensions
            adjusters = me.splitAdjusters[splitter.vertical ? 'horz' : 'vert'],
            delta = offset[adjusters.index],
            dragInfo = me.dragInfo,
            //neighbors = splitter.neighbors,
            //length = neighbors.length,
            //neighborSizes = dragInfo.neighborSizes,
            //isVert = collapseTarget.isVert,
            //i, neighbor,
            owner;

        if (collapseDirection == 'right' || collapseDirection == 'bottom') {
            // these splitters grow by moving left/up, so flip the sign of delta...
            delta = -delta;
        }

        // now constrain delta to our computed range:
        delta = Math.min(Math.max(dragInfo.minRange, delta), dragInfo.maxRange);

        if (delta) {
            (owner = splitter.ownerCt).suspendLayouts();

            adjusters.adjustTarget(collapseTarget, dragInfo.targetSize, delta);

            //for (i = 0; i < length; ++i) {
            //    neighbor = neighbors[i];
            //    if (!neighbor.isCenter && !neighbor.maintainFlex && neighbor.isVert == isVert) {
            //        delete neighbor.flex;
            //        adjusters.adjustNeighbor(neighbor, neighborSizes[i], delta);
            //    }
            //}

            owner.resumeLayouts(true);
        }
    },

    splitAdjusters: {
        horz: {
            index: 0,
            //adjustNeighbor: function (neighbor, size, delta) {
            //    neighbor.setSize(size - delta);
            //},
            adjustTarget: function (target, size, delta) {
                target.flex = null;
                target.setSize(size + delta);
            }
        },
        vert: {
            index: 1,
            //adjustNeighbor: function (neighbor, size, delta) {
            //    neighbor.setSize(undefined, size - delta);
            //},
            adjustTarget: function (target, targetSize, delta) {
                target.flex = null;
                target.setSize(undefined, targetSize + delta);
            }
        }
    }
});

/**
 * Private utility class for Ext.layout.container.Border.
 * @private
 */
Ext.define('Ext.resizer.BorderSplitter', {
    extend: 'Ext.resizer.Splitter',

    uses: ['Ext.resizer.BorderSplitterTracker'],

    alias: 'widget.bordersplitter',

    // must be configured in by the border layout:
    collapseTarget: null,

    getTrackerConfig: function () {
        var trackerConfig = this.callParent();

        trackerConfig.xclass = 'Ext.resizer.BorderSplitterTracker';

        return trackerConfig;
    }
});

/**
 * This is a multi-pane, application-oriented UI layout style that supports multiple nested panels, automatic bars
 * between regions and built-in {@link Ext.panel.Panel#collapsible expanding and collapsing} of regions.
 *
 * This class is intended to be extended or created via the `layout:'border'` {@link Ext.container.Container#layout}
 * config, and should generally not need to be created directly via the new keyword.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         width: 500,
 *         height: 300,
 *         title: 'Border Layout',
 *         layout: 'border',
 *         items: [{
 *             title: 'South Region is resizable',
 *             region: 'south',     // position for region
 *             xtype: 'panel',
 *             height: 100,
 *             split: true,         // enable resizing
 *             margins: '0 5 5 5'
 *         },{
 *             // xtype: 'panel' implied by default
 *             title: 'West Region is collapsible',
 *             region:'west',
 *             xtype: 'panel',
 *             margins: '5 0 0 5',
 *             width: 200,
 *             collapsible: true,   // make collapsible
 *             id: 'west-region-container',
 *             layout: 'fit'
 *         },{
 *             title: 'Center Region',
 *             region: 'center',     // center region is required, no width/height specified
 *             xtype: 'panel',
 *             layout: 'fit',
 *             margins: '5 5 0 0'
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *
 * # Notes
 * 
 *   - When using the split option, the layout will automatically insert a {@link Ext.resizer.Splitter}
 *     into the appropriate place. This will modify the underlying
 *     {@link Ext.container.Container#property-items items} collection in the container.
 *
 *   - Any Container using the Border layout **must** have a child item with `region:'center'`.
 *     The child item in the center region will always be resized to fill the remaining space
 *     not used by the other regions in the layout.
 *
 *   - Any child items with a region of `west` or `east` may be configured with either an initial
 *     `width`, or a {@link Ext.layout.container.Box#flex} value, or an initial percentage width
 *     **string** (Which is simply divided by 100 and used as a flex value).
 *     The 'center' region has a flex value of `1`.
 *
 *   - Any child items with a region of `north` or `south` may be configured with either an initial
 *     `height`, or a {@link Ext.layout.container.Box#flex} value, or an initial percentage height
 *     **string** (Which is simply divided by 100 and used as a flex value).
 *     The 'center' region has a flex value of `1`.
 *
 *   - **There is no BorderLayout.Region class in ExtJS 4.0+**
 */
Ext.define('Ext.layout.container.Border', {

    alias: 'layout.border',

    extend: 'Ext.layout.container.Container',

    requires: ['Ext.resizer.BorderSplitter', 'Ext.Component', 'Ext.fx.Anim'],

    alternateClassName: 'Ext.layout.BorderLayout',


    targetCls: Ext.baseCSSPrefix + 'border-layout-ct',

    itemCls: [Ext.baseCSSPrefix + 'border-item', Ext.baseCSSPrefix + 'box-item'],

    type: 'border',

    /**
     * @cfg {Boolean} split
     * This configuration option is to be applied to the **child `items`** managed by this layout.
     * Each region with `split:true` will get a {@link Ext.resizer.BorderSplitter Splitter} that
     * allows for manual resizing of the container. Except for the `center` region.
     */

    /**
     * @cfg {Number/String/Object} padding
     * Sets the padding to be applied to all child items managed by this layout.
     * 
     * This property can be specified as a string containing space-separated, numeric
     * padding values. The order of the sides associated with each value matches the way
     * CSS processes padding values:
     *
     *  - If there is only one value, it applies to all sides.
     *  - If there are two values, the top and bottom borders are set to the first value
     *    and the right and left are set to the second.
     *  - If there are three values, the top is set to the first value, the left and right
     *    are set to the second, and the bottom is set to the third.
     *  - If there are four values, they apply to the top, right, bottom, and left,
     *    respectively.
     *
     */
    padding: undefined,

    percentageRe: /(\d+)%/,

    /**
     * Reused meta-data objects that describe axis properties.
     * @private
     */
    axisProps: {
        horz: {
            borderBegin: 'west',
            borderEnd: 'east',
            horizontal: true,
            posProp: 'x',
            sizeProp: 'width',
            sizePropCap: 'Width'
        },
        vert: {
            borderBegin: 'north',
            borderEnd: 'south',
            horizontal: false,
            posProp: 'y',
            sizeProp: 'height',
            sizePropCap: 'Height'
        }
    },

    // @private
    centerRegion: null,

    /**
     * Maps from region name to collapseDirection for panel.
     * @private
     */
    collapseDirections: {
        north: 'top',
        south: 'bottom',
        east: 'right',
        west: 'left'
    },

    manageMargins: true,

    panelCollapseAnimate: true,

    panelCollapseMode: 'placeholder',

    /**
     * @cfg {Object} regionWeights
     * The default weights to assign to regions in the border layout. These values are
     * used when a region does not contain a `weight` property. This object must have
     * properties for all regions ("north", "south", "east" and "west").
     * 
     * **IMPORTANT:** Since this is an object, changing its properties will impact ALL
     * instances of Border layout. If this is not desired, provide a replacement object as
     * a config option instead:
     * 
     *      layout: {
     *          type: 'border',
     *          regionWeights: {
     *              west: 20,
     *              north: 10,
     *              south: -10,
     *              east: -20
     *          }
     *      }
     *
     * The region with the highest weight is assigned space from the border before other
     * regions. Regions of equal weight are assigned space based on their position in the
     * owner's items list (first come, first served).
     */
    regionWeights: {
        north: 20,
        south: 10,
        center: 0,
        west: -10,
        east: -20
    },

    //----------------------------------
    // Layout processing

    /**
     * Creates the axis objects for the layout. These are only missing size information
     * which is added during {@link #calculate}.
     * @private
     */
    beginAxis: function (ownerContext, regions, name) {
        var me = this,
            props = me.axisProps[name],
            isVert = !props.horizontal,
            sizeProp = props.sizeProp,
            totalFlex = 0,
            childItems = ownerContext.childItems,
            length = childItems.length,
            center, i, childContext, centerFlex, comp, region, match, size, type, target, placeholder;

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            comp = childContext.target;

            childContext.layoutPos = {};

            if (comp.region) {
                childContext.region = region = comp.region;

                childContext.isCenter = comp.isCenter;
                childContext.isHorz = comp.isHorz;
                childContext.isVert = comp.isVert;

                childContext.weight = comp.weight || me.regionWeights[region] || 0;
                regions[comp.id] = childContext;

                if (comp.isCenter) {
                    center = childContext;
                    centerFlex = comp.flex;
                    ownerContext.centerRegion = center;

                    continue;
                }

                if (isVert !== childContext.isVert) {
                    continue;
                }

                // process regions "isVert ? north||south : east||center||west"

                childContext.reverseWeighting = (region == props.borderEnd);

                size = comp[sizeProp];
                type = typeof size;

                if (!comp.collapsed) {
                    if (type == 'string' && (match = me.percentageRe.exec(size))) {
                        childContext.percentage = parseInt(match[1], 10);
                    } else if (comp.flex) {
                        totalFlex += childContext.flex = comp.flex;
                    }
                }
            }
        }

        // Special cases for a collapsed center region
        if (center) {
            target = center.target;

            if (placeholder = target.placeholderFor) {
                if (!centerFlex && isVert === placeholder.collapsedVertical()) {
                    // The center region is a placeholder, collapsed in this axis
                    centerFlex = 0;
                    center.collapseAxis = name;
                }
            } else if (target.collapsed && (isVert === target.collapsedVertical())) {
                // The center region is a collapsed header, collapsed in this axis
                centerFlex = 0;
                center.collapseAxis = name;
            }
        }

        if (centerFlex == null) {
            // If we still don't have a center flex, default to 1
            centerFlex = 1;
        }

        totalFlex += centerFlex;

        return Ext.apply({
            before         : isVert ? 'top' : 'left',
            totalFlex      : totalFlex
        }, props);
    },

    beginLayout: function (ownerContext) {
        var me = this,
            items = me.getLayoutItems(),
            pad = me.padding,
            type = typeof pad,
            padOnContainer = false,
            childContext, item, length, i, regions, collapseTarget;

        // We sync the visibility state of splitters with their region:
        if (pad) {
            if (type == 'string' || type == 'number') {
                pad = Ext.util.Format.parseBox(pad);
            }
        } else {
            pad = ownerContext.getEl('getTargetEl').getPaddingInfo();
            padOnContainer = true;
        }
        ownerContext.outerPad = pad;
        ownerContext.padOnContainer = padOnContainer;

        for (i = 0, length = items.length; i < length; ++i) {
            item = items[i];
            collapseTarget = me.getSplitterTarget(item);

            if (collapseTarget && item.hidden !== collapseTarget.hidden) {
                if (item.hidden) {
                    item.show();
                } else {
                    item.hide();
                }
            }
        }

        // The above synchronized visibility of splitters with their regions, so we need
        // to make this call after that so that childItems and visibleItems are correct:
        //
        me.callParent(arguments);

        items = ownerContext.childItems;
        length = items.length;
        regions = {};

        ownerContext.borderAxisHorz = me.beginAxis(ownerContext, regions, 'horz');
        ownerContext.borderAxisVert = me.beginAxis(ownerContext, regions, 'vert');

        // Now that weights are assigned to the region's contextItems, we assign those
        // same weights to the contextItem for the splitters. We also cross link the
        // contextItems for the collapseTarget and its splitter.
        for (i = 0; i < length; ++i) {
            childContext = items[i];
            collapseTarget = me.getSplitterTarget(childContext.target);

            if (collapseTarget) { // if (splitter)
                childContext.collapseTarget = collapseTarget = regions[collapseTarget.id];
                childContext.weight = collapseTarget.weight;
                childContext.reverseWeighting = collapseTarget.reverseWeighting;
                collapseTarget.splitter = childContext;
                childContext.isHorz = collapseTarget.isHorz;
                childContext.isVert = collapseTarget.isVert;
            }
        }

        // Now we want to sort the childItems by their weight.
        me.sortWeightedItems(items, 'reverseWeighting');
        me.setupSplitterNeighbors(items);
    },

    calculate: function (ownerContext) {
        var me = this,
            containerSize = me.getContainerSize(ownerContext),
            childItems = ownerContext.childItems,
            length = childItems.length,
            horz = ownerContext.borderAxisHorz,
            vert = ownerContext.borderAxisVert,
            pad = ownerContext.outerPad,
            padOnContainer = ownerContext.padOnContainer,
            i, childContext, childMargins, size, horzPercentTotal, vertPercentTotal;

        horz.begin = pad.left;
        vert.begin = pad.top;
        // If the padding is already on the container we need to add it to the space
        // If not on the container, it's "virtual" padding.
        horzPercentTotal = horz.end = horz.flexSpace = containerSize.width + (padOnContainer ? pad.left : -pad.right);
        vertPercentTotal = vert.end = vert.flexSpace = containerSize.height + (padOnContainer ? pad.top : -pad.bottom);

        // Reduce flexSpace on each axis by the fixed/auto sized dimensions of items that
        // aren't flexed along that axis.
        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            childMargins = childContext.getMarginInfo();

            // Margins are always fixed size and must be removed from the space used for percentages and flexes
            if (childContext.isHorz || childContext.isCenter) {
                horz.addUnflexed(childMargins.width);
                horzPercentTotal -= childMargins.width;
            }

            if (childContext.isVert || childContext.isCenter) {
                vert.addUnflexed(childMargins.height);
                vertPercentTotal -= childMargins.height;
            }

            // Fixed size components must have their sizes removed from the space used for flex
            if (!childContext.flex && !childContext.percentage) {
                if (childContext.isHorz || (childContext.isCenter && childContext.collapseAxis === 'horz')) {
                    size = childContext.getProp('width');

                    horz.addUnflexed(size);

                    // splitters should not count towards percentages
                    if (childContext.collapseTarget) {
                        horzPercentTotal -= size;
                    }
                } else if (childContext.isVert || (childContext.isCenter && childContext.collapseAxis === 'vert')) {
                    size = childContext.getProp('height');

                    vert.addUnflexed(size);

                    // splitters should not count towards percentages
                    if (childContext.collapseTarget) {
                        vertPercentTotal -= size;
                    }
                }
                // else ignore center since it is fully flexed
            }
        }

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            childMargins = childContext.getMarginInfo();

            // Calculate the percentage sizes. After this calculation percentages are very similar to fixed sizes
            if (childContext.percentage) {
                if (childContext.isHorz) {
                    size = Math.ceil(horzPercentTotal * childContext.percentage / 100);
                    size = childContext.setWidth(size);
                    horz.addUnflexed(size);
                } else if (childContext.isVert) {
                    size = Math.ceil(vertPercentTotal * childContext.percentage / 100);
                    size = childContext.setHeight(size);
                    vert.addUnflexed(size);
                }
                // center shouldn't have a percentage but if it does it should be ignored
            }
        }


        // If we haven't gotten sizes for all unflexed dimensions on an axis, the flexSpace
        // will be NaN so we won't be calculating flexed dimensions until that is resolved.

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];

            if (!childContext.isCenter) {
                me.calculateChildAxis(childContext, horz);
                me.calculateChildAxis(childContext, vert);
            }
        }

        // Once all items are placed, the final size of the center can be determined. If we
        // can determine both width and height, we are done. We use '+' instead of '&&' to
        // avoid short-circuiting (we want to call both):
        if (me.finishAxis(ownerContext, vert) + me.finishAxis(ownerContext, horz) < 2) {
            me.done = false;
        } else {
            // Size information is published as we place regions but position is hard to do
            // that way (while avoiding published multiple times) so we publish all the
            // positions at the end.
            me.finishPositions(childItems);
        }
    },

    /**
     * Performs the calculations for a region on a specified axis.
     * @private
     */
    calculateChildAxis: function (childContext, axis) {
        var collapseTarget = childContext.collapseTarget,
            setSizeMethod = 'set' + axis.sizePropCap,
            sizeProp = axis.sizeProp,
            childMarginSize = childContext.getMarginInfo()[sizeProp],
            region, isBegin, flex, pos, size;

        if (collapseTarget) { // if (splitter)
            region = collapseTarget.region;
        } else {
            region = childContext.region;
            flex = childContext.flex;
        }

        isBegin = region == axis.borderBegin;

        if (!isBegin && region != axis.borderEnd) {
            // a north/south region on the horizontal axis or an east/west region on the
            // vertical axis: stretch to fill remaining space:
            childContext[setSizeMethod](axis.end - axis.begin - childMarginSize);
            pos = axis.begin;
        } else {
            if (flex) {
                size = Math.ceil(axis.flexSpace * (flex / axis.totalFlex));
                size = childContext[setSizeMethod](size);
            } else if (childContext.percentage) {
                // Like getProp but without registering a dependency - we calculated the size, we don't depend on it
                size = childContext.peek(sizeProp);
            } else {
                size = childContext.getProp(sizeProp);
            }

            size += childMarginSize;

            if (isBegin) {
                pos = axis.begin;
                axis.begin += size;
            } else {
                axis.end = pos = axis.end - size;
            }
        }

        childContext.layoutPos[axis.posProp] = pos;
    },

    /**
     * Finishes the calculations on an axis. This basically just assigns the remaining
     * space to the center region.
     * @private
     */
    finishAxis: function (ownerContext, axis) {
        var size = axis.end - axis.begin,
            center = ownerContext.centerRegion;

        if (center) {
            center['set' + axis.sizePropCap](size - center.getMarginInfo()[axis.sizeProp]);
            center.layoutPos[axis.posProp] = axis.begin;
        }

        return Ext.isNumber(size) ? 1 : 0;
    },

    /**
     * Finishes by setting the positions on the child items.
     * @private
     */
    finishPositions: function (childItems) {
        var length = childItems.length,
            index, childContext;

        for (index = 0; index < length; ++index) {
            childContext = childItems[index];

            childContext.setProp('x', childContext.layoutPos.x + childContext.marginInfo.left);
            childContext.setProp('y', childContext.layoutPos.y + childContext.marginInfo.top);
        }
    },

    getPlaceholder: function (comp) {
        return comp.getPlaceholder && comp.getPlaceholder();
    },

    getSplitterTarget: function (splitter) {
        var collapseTarget = splitter.collapseTarget;

        if (collapseTarget && collapseTarget.collapsed) {
            return collapseTarget.placeholder || collapseTarget;
        }

        return collapseTarget;
    },

    isItemBoxParent: function (itemContext) {
        return true;
    },

    isItemShrinkWrap: function (item) {
        return true;
    },

    //----------------------------------
    // Event handlers

    /**
     * Inserts the splitter for a given region. A reference to the splitter is also stored
     * on the component as "splitter".
     * @private
     */
    insertSplitter: function (item, index) {
        var region = item.region,
            splitter = {
                xtype: 'bordersplitter',
                collapseTarget: item,
                id: item.id + '-splitter',
                hidden: !!item.hidden
            },
            at = index + ((region == 'south' || region == 'east') ? 0 : 1);

        // remove the default fixed width or height depending on orientation:
        if (item.isHorz) {
            splitter.height = null;
        } else {
            splitter.width = null;
        }

        if (item.collapseMode == 'mini') {
            splitter.collapsedCls = item.collapsedCls;
        }

        item.splitter = this.owner.add(at, splitter);
    },

    /**
     * Called when a region (actually when any component) is added to the container. The
     * region is decorated with some helpful properties (isCenter, isHorz, isVert) and its
     * splitter is added if its "split" property is true.
     * @private
     */
    onAdd: function (item, index) {
        var me = this,
            placeholderFor = item.placeholderFor,
            region = item.region;

        me.callParent(arguments);

        if (region) {
            Ext.apply(item, me.regionFlags[region]);

            if (region == 'center') {
                if (me.centerRegion) {
                    Ext.Error.raise("Cannot have multiple center regions in a BorderLayout.");
                }
                me.centerRegion = item;
            } else {
                item.collapseDirection = this.collapseDirections[region];

                if (item.split && (item.isHorz || item.isVert)) {
                    me.insertSplitter(item, index);
                }
            }

            if (!item.hasOwnProperty('collapseMode')) {
                item.collapseMode = me.panelCollapseMode;
            }

            if (!item.hasOwnProperty('animCollapse')) {
                if (item.collapseMode != 'placeholder') {
                    // other collapse modes do not animate nicely in a border layout, so
                    // default them to off:
                    item.animCollapse = false;
                } else {
                    item.animCollapse = me.panelCollapseAnimate;
                }
            }
        } else if (placeholderFor) {
            Ext.apply(item, me.regionFlags[placeholderFor.region]);
            item.region = placeholderFor.region;
            item.weight = placeholderFor.weight;
        }
    },

    onDestroy: function() {
        this.centerRegion = null;
        this.callParent();
    },

    onRemove: function (item) {
        var me = this,
            region = item.region,
            splitter = item.splitter;

        if (region) {
            if (item.isCenter) {
                me.centerRegion = null;
            }

            delete item.isCenter;
            delete item.isHorz;
            delete item.isVert;

            if (splitter) {
                me.owner.doRemove(splitter, true); // avoid another layout
                delete item.splitter;
            }
        }

        me.callParent(arguments);
    },

    //----------------------------------
    // Misc

    regionFlags: {
        center: { isCenter: true, isHorz: false, isVert: false },

        north: { isCenter: false, isHorz: false, isVert: true },
        south: { isCenter: false, isHorz: false, isVert: true },

        west: { isCenter: false, isHorz: true, isVert: false },
        east: { isCenter: false, isHorz: true, isVert: false }
    },

    setupSplitterNeighbors: function (items) {
        var edgeRegions = {
                //north: null,
                //south: null,
                //east: null,
                //west: null
            },
            length = items.length,
            touchedRegions = this.touchedRegions,
            i, j, center, count, edge, comp, region, splitter, touched;

        for (i = 0; i < length; ++i) {
            comp = items[i].target;
            region = comp.region;

            if (comp.isCenter) {
                center = comp;
            } else if (region) {
                touched = touchedRegions[region];

                for (j = 0, count = touched.length; j < count; ++j) {
                    edge = edgeRegions[touched[j]];
                    if (edge) {
                        edge.neighbors.push(comp);
                    }
                }
                
                if (comp.placeholderFor) {
                    // placeholder, so grab the splitter for the actual panel
                    splitter = comp.placeholderFor.splitter;
                } else {
                    splitter = comp.splitter;
                }
                if (splitter) {
                    splitter.neighbors = [];
                }

                edgeRegions[region] = splitter;
            }
        }

        if (center) {
            touched = touchedRegions.center;

            for (j = 0, count = touched.length; j < count; ++j) {
                edge = edgeRegions[touched[j]];
                if (edge) {
                    edge.neighbors.push(center);
                }
            }
        }
    },

    /**
     * Lists the regions that would consider an interior region a neighbor. For example,
     * a north region would consider an east or west region its neighbords (as well as
     * an inner north region).
     * @private
     */
    touchedRegions: {
        center: [ 'north', 'south', 'east',  'west' ],

        north:  [ 'north', 'east',  'west'  ],
        south:  [ 'south', 'east',  'west'  ],
        east:   [ 'east',  'north', 'south' ],
        west:   [ 'west',  'north', 'south' ]
    },

    sizePolicies: {
        vert: {
            setsWidth: 1,
            setsHeight: 0
        },
        horz: {
            setsWidth: 0,
            setsHeight: 1
        },
        flexAll: {
            setsWidth: 1,
            setsHeight: 1
        }
    },

    getItemSizePolicy: function (item) {
        var me = this,
            policies = this.sizePolicies,
            collapseTarget, size, policy, placeholderFor;

        if (item.isCenter) {
            placeholderFor = item.placeholderFor;

            if (placeholderFor) {
                if (placeholderFor.collapsedVertical()) {
                    return policies.vert;
                }
                return policies.horz;
            }
            if (item.collapsed) {
                if (item.collapsedVertical()) {
                    return policies.vert;
                }
                return policies.horz;
            }
            return policies.flexAll;
        }

        collapseTarget = item.collapseTarget;

        if (collapseTarget) {
            return collapseTarget.isVert ? policies.vert : policies.horz;
        }

        if (item.region) {
            if (item.isVert) {
                size = item.height;
                policy = policies.vert;
            } else {
                size = item.width;
                policy = policies.horz;
            }

            if (item.flex || (typeof size == 'string' && me.percentageRe.test(size))) {
                return policies.flexAll;
            }

            return policy;
        }

        return me.autoSizePolicy;
    }
}, function () {
    var methods = {
        addUnflexed: function (px) {
            this.flexSpace = Math.max(this.flexSpace - px, 0);
        }
    },
    props = this.prototype.axisProps;

    Ext.apply(props.horz, methods);
    Ext.apply(props.vert, methods);
});

/**
 * @class MyApp.view.clients.MainContainer
 * @extends Ext.container.Container
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The main container that uses a border layout.
 */

Ext.define('MyApp.view.clients.MainContainer',{
	extend      : 'Ext.container.Container',
	alias       : 'widget.clients.main',
	requires	: [
		'Ext.layout.container.Border',
		'Ext.resizer.BorderSplitterTracker'
	],

	layout		: 'border',

	initComponent   : function(){
		var me = this;

		me.items = [{
			xtype : 'clients.grid',
			region: 'center'
		},{
			xtype : 'clients.form',
			width : 300,
			region: 'east',
			split : true,
			collapsible : true
		}];

		me.callParent();
	}
});
/**
 * A class which handles loading of data from a server into the Fields of an {@link Ext.form.Basic}.
 *
 * Instances of this class are only created by a {@link Ext.form.Basic Form} when {@link Ext.form.Basic#load load}ing.
 *
 * ## Response Packet Criteria
 *
 * A response packet **must** contain:
 *
 *   - **`success`** property : Boolean
 *   - **`data`** property : Object
 *
 * The `data` property contains the values of Fields to load. The individual value object for each Field is passed to
 * the Field's {@link Ext.form.field.Field#setValue setValue} method.
 *
 * ## JSON Packets
 *
 * By default, response packets are assumed to be JSON, so for the following form load call:
 *
 *     var myFormPanel = new Ext.form.Panel({
 *         title: 'Client and routing info',
 *         items: [{
 *             fieldLabel: 'Client',
 *             name: 'clientName'
 *         }, {
 *             fieldLabel: 'Port of loading',
 *             name: 'portOfLoading'
 *         }, {
 *             fieldLabel: 'Port of discharge',
 *             name: 'portOfDischarge'
 *         }]
 *     });
 *     myFormPanel.{@link Ext.form.Panel#getForm getForm}().{@link Ext.form.Basic#load load}({
 *         url: '/getRoutingInfo.php',
 *         params: {
 *             consignmentRef: myConsignmentRef
 *         },
 *         failure: function(form, action) {
 *             Ext.Msg.alert("Load failed", action.result.errorMessage);
 *         }
 *     });
 *
 * a **success response** packet may look like this:
 *
 *     {
 *         success: true,
 *         data: {
 *             clientName: "Fred. Olsen Lines",
 *             portOfLoading: "FXT",
 *             portOfDischarge: "OSL"
 *         }
 *     }
 *
 * while a **failure response** packet may look like this:
 *
 *     {
 *         success: false,
 *         errorMessage: "Consignment reference not found"
 *     }
 *
 * Other data may be placed into the response for processing the {@link Ext.form.Basic Form}'s callback or event handler
 * methods. The object decoded from this JSON is available in the {@link Ext.form.action.Action#result result} property.
 */
Ext.define('Ext.form.action.Load', {
    extend:'Ext.form.action.Action',
    requires: ['Ext.data.Connection'],
    alternateClassName: 'Ext.form.Action.Load',
    alias: 'formaction.load',

    type: 'load',

    /**
     * @private
     */
    run: function() {
        Ext.Ajax.request(Ext.apply(
            this.createCallback(),
            {
                method: this.getMethod(),
                url: this.getUrl(),
                headers: this.headers,
                params: this.getParams()
            }
        ));
    },

    /**
     * @private
     */
    onSuccess: function(response){
        var result = this.processResponse(response),
            form = this.form;
        if (result === true || !result.success || !result.data) {
            this.failureType = Ext.form.action.Action.LOAD_FAILURE;
            form.afterAction(this, false);
            return;
        }
        form.clearInvalid();
        form.setValues(result.data);
        form.afterAction(this, true);
    },

    /**
     * @private
     */
    handleResponse: function(response) {
        var reader = this.form.reader,
            rs, data;
        if (reader) {
            rs = reader.read(response);
            data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return {
                success : rs.success,
                data : data
            };
        }
        return Ext.decode(response.responseText);
    }
});


/**
 * A class which handles submission of data from {@link Ext.form.Basic Form}s and processes the returned response.
 *
 * Instances of this class are only created by a {@link Ext.form.Basic Form} when
 * {@link Ext.form.Basic#submit submit}ting.
 *
 * # Response Packet Criteria
 *
 * A response packet may contain:
 *
 *   - **`success`** property : Boolean - required.
 *
 *   - **`errors`** property : Object - optional, contains error messages for invalid fields.
 *
 * # JSON Packets
 *
 * By default, response packets are assumed to be JSON, so a typical response packet may look like this:
 *
 *     {
 *         success: false,
 *         errors: {
 *             clientCode: "Client not found",
 *             portOfLoading: "This field must not be null"
 *         }
 *     }
 *
 * Other data may be placed into the response for processing by the {@link Ext.form.Basic}'s callback or event handler
 * methods. The object decoded from this JSON is available in the {@link Ext.form.action.Action#result result} property.
 *
 * Alternatively, if an {@link Ext.form.Basic#errorReader errorReader} is specified as an
 * {@link Ext.data.reader.Xml XmlReader}:
 *
 *     errorReader: new Ext.data.reader.Xml({
 *             record : 'field',
 *             success: '@success'
 *         }, [
 *             'id', 'msg'
 *         ]
 *     )
 *
 * then the results may be sent back in XML format:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <message success="false">
 *     <errors>
 *         <field>
 *             <id>clientCode</id>
 *             <msg><![CDATA[Code not found. <br /><i>This is a test validation message from the server </i>]]></msg>
 *         </field>
 *         <field>
 *             <id>portOfLoading</id>
 *             <msg><![CDATA[Port not found. <br /><i>This is a test validation message from the server </i>]]></msg>
 *         </field>
 *     </errors>
 *     </message>
 *
 * Other elements may be placed into the response XML for processing by the {@link Ext.form.Basic}'s callback or event
 * handler methods. The XML document is available in the {@link Ext.form.Basic#errorReader errorReader}'s
 * {@link Ext.data.reader.Xml#xmlData xmlData} property.
 */
Ext.define('Ext.form.action.Submit', {
    extend:'Ext.form.action.Action',
    alternateClassName: 'Ext.form.Action.Submit',
    alias: 'formaction.submit',

    type: 'submit',

    /**
     * @cfg {Boolean} [clientValidation=true]
     * Determines whether a Form's fields are validated in a final call to {@link Ext.form.Basic#isValid isValid} prior
     * to submission. Pass false in the Form's submit options to prevent this.
     */

    // inherit docs
    run : function(){
        var form = this.form;
        if (this.clientValidation === false || form.isValid()) {
            this.doSubmit();
        } else {
            // client validation failed
            this.failureType = Ext.form.action.Action.CLIENT_INVALID;
            form.afterAction(this, false);
        }
    },

    /**
     * @private
     * Performs the submit of the form data.
     */
    doSubmit: function() {
        var formEl,
            ajaxOptions = Ext.apply(this.createCallback(), {
                url: this.getUrl(),
                method: this.getMethod(),
                headers: this.headers
            });

        // For uploads we need to create an actual form that contains the file upload fields,
        // and pass that to the ajax call so it can do its iframe-based submit method.
        if (this.form.hasUpload()) {
            formEl = ajaxOptions.form = this.buildForm();
            ajaxOptions.isUpload = true;
        } else {
            ajaxOptions.params = this.getParams();
        }

        Ext.Ajax.request(ajaxOptions);

        if (formEl) {
            Ext.removeNode(formEl);
        }
    },

    /**
     * @private
     * Builds the full set of parameters from the field values plus any additional configured params.
     */
    getParams: function() {
        var nope = false,
            configParams = this.callParent(),
            fieldParams = this.form.getValues(nope, nope, this.submitEmptyText !== nope);
        return Ext.apply({}, fieldParams, configParams);
    },

    /**
     * @private
     * Builds a form element containing fields corresponding to all the parameters to be
     * submitted (everything returned by {@link #getParams}.
     *
     * NOTE: the form element is automatically added to the DOM, so any code that uses
     * it must remove it from the DOM after finishing with it.
     *
     * @return {HTMLElement}
     */
    buildForm: function() {
        var fieldsSpec = [],
            formSpec,
            formEl,
            basicForm = this.form,
            params = this.getParams(),
            uploadFields = [],
            fields = basicForm.getFields().items,
            f,
            fLen   = fields.length,
            field, key, value, v, vLen,
            u, uLen;

        for (f = 0; f < fLen; f++) {
            field = fields[f];

            if (field.isFileUpload()) {
                uploadFields.push(field);
            }
        }

        function addField(name, val) {
            fieldsSpec.push({
                tag: 'input',
                type: 'hidden',
                name: name,
                value: Ext.String.htmlEncode(val)
            });
        }

        for (key in params) {
            if (params.hasOwnProperty(key)) {
                value = params[key];

                if (Ext.isArray(value)) {
                    vLen = value.length;
                    for (v = 0; v < vLen; v++) {
                        addField(key, value[v]);
                    }
                } else {
                    addField(key, value);
                }
            }
        }

        formSpec = {
            tag: 'form',
            action: this.getUrl(),
            method: this.getMethod(),
            target: this.target || '_self',
            style: 'display:none',
            cn: fieldsSpec
        };

        // Set the proper encoding for file uploads
        if (uploadFields.length) {
            formSpec.encoding = formSpec.enctype = 'multipart/form-data';
        }

        // Create the form
        formEl = Ext.DomHelper.append(Ext.getBody(), formSpec);

        // Special handling for file upload fields: since browser security measures prevent setting
        // their values programatically, and prevent carrying their selected values over when cloning,
        // we have to move the actual field instances out of their components and into the form.
        uLen = uploadFields.length;

        for (u = 0; u < uLen; u++) {
            field = uploadFields[u];
            if (field.rendered) { // can only have a selected file value after being rendered
                formEl.appendChild(field.extractFileInput());
            }
        }

        return formEl;
    },



    /**
     * @private
     */
    onSuccess: function(response) {
        var form = this.form,
            success = true,
            result = this.processResponse(response);
        if (result !== true && !result.success) {
            if (result.errors) {
                form.markInvalid(result.errors);
            }
            this.failureType = Ext.form.action.Action.SERVER_INVALID;
            success = false;
        }
        form.afterAction(this, success);
    },

    /**
     * @private
     */
    handleResponse: function(response) {
        var form = this.form,
            errorReader = form.errorReader,
            rs, errors, i, len, records;
        if (errorReader) {
            rs = errorReader.read(response);
            records = rs.records;
            errors = [];
            if (records) {
                for(i = 0, len = records.length; i < len; i++) {
                    errors[i] = records[i].data;
                }
            }
            if (errors.length < 1) {
                errors = null;
            }
            return {
                success : rs.success,
                errors : errors
            };
        }
        return Ext.decode(response.responseText);
    }
});

/**
 * Provides input field management, validation, submission, and form loading services for the collection
 * of {@link Ext.form.field.Field Field} instances within a {@link Ext.container.Container}. It is recommended
 * that you use a {@link Ext.form.Panel} as the form container, as that has logic to automatically
 * hook up an instance of {@link Ext.form.Basic} (plus other conveniences related to field configuration.)
 *
 * ## Form Actions
 *
 * The Basic class delegates the handling of form loads and submits to instances of {@link Ext.form.action.Action}.
 * See the various Action implementations for specific details of each one's functionality, as well as the
 * documentation for {@link #doAction} which details the configuration options that can be specified in
 * each action call.
 *
 * The default submit Action is {@link Ext.form.action.Submit}, which uses an Ajax request to submit the
 * form's values to a configured URL. To enable normal browser submission of an Ext form, use the
 * {@link #standardSubmit} config option.
 *
 * ## File uploads
 *
 * File uploads are not performed using normal 'Ajax' techniques; see the description for
 * {@link #hasUpload} for details. If you're using file uploads you should read the method description.
 *
 * ## Example usage:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Basic Form',
 *         renderTo: Ext.getBody(),
 *         bodyPadding: 5,
 *         width: 350,
 *
 *         // Any configuration items here will be automatically passed along to
 *         // the Ext.form.Basic instance when it gets created.
 *
 *         // The form will submit an AJAX request to this URL when submitted
 *         url: 'save-form.php',
 *
 *         items: [{
 *             xtype: 'textfield',
 *             fieldLabel: 'Field',
 *             name: 'theField'
 *         }],
 *
 *         buttons: [{
 *             text: 'Submit',
 *             handler: function() {
 *                 // The getForm() method returns the Ext.form.Basic instance:
 *                 var form = this.up('form').getForm();
 *                 if (form.isValid()) {
 *                     // Submit the Ajax request and handle the response
 *                     form.submit({
 *                         success: function(form, action) {
 *                            Ext.Msg.alert('Success', action.result.msg);
 *                         },
 *                         failure: function(form, action) {
 *                             Ext.Msg.alert('Failed', action.result ? action.result.msg : 'No response');
 *                         }
 *                     });
 *                 }
 *             }
 *         }]
 *     });
 *
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.form.Basic', {
    extend: 'Ext.util.Observable',
    alternateClassName: 'Ext.form.BasicForm',
    requires: ['Ext.util.MixedCollection', 'Ext.form.action.Load', 'Ext.form.action.Submit',
               'Ext.window.MessageBox', 'Ext.data.Errors', 'Ext.util.DelayedTask'],

    /**
     * Creates new form.
     * @param {Ext.container.Container} owner The component that is the container for the form, usually a {@link Ext.form.Panel}
     * @param {Object} config Configuration options. These are normally specified in the config to the
     * {@link Ext.form.Panel} constructor, which passes them along to the BasicForm automatically.
     */
    constructor: function(owner, config) {
        var me = this,
            onItemAddOrRemove = me.onItemAddOrRemove,
            api,
            fn;

        /**
         * @property {Ext.container.Container} owner
         * The container component to which this BasicForm is attached.
         */
        me.owner = owner;

        // Listen for addition/removal of fields in the owner container
        me.mon(owner, {
            add: onItemAddOrRemove,
            remove: onItemAddOrRemove,
            scope: me
        });

        Ext.apply(me, config);

        // Normalize the paramOrder to an Array
        if (Ext.isString(me.paramOrder)) {
            me.paramOrder = me.paramOrder.split(/[\s,|]/);
        }
        
        if (me.api) {
            api = me.api = Ext.apply({}, me.api);
            for (fn in api) {
                if (api.hasOwnProperty(fn)) {
                    api[fn] = Ext.direct.Manager.parseMethod(api[fn]);
                }
            }
        }

        me.checkValidityTask = new Ext.util.DelayedTask(me.checkValidity, me);

        me.addEvents(
            /**
             * @event beforeaction
             * Fires before any action is performed. Return false to cancel the action.
             * @param {Ext.form.Basic} this
             * @param {Ext.form.action.Action} action The {@link Ext.form.action.Action} to be performed
             */
            'beforeaction',
            /**
             * @event actionfailed
             * Fires when an action fails.
             * @param {Ext.form.Basic} this
             * @param {Ext.form.action.Action} action The {@link Ext.form.action.Action} that failed
             */
            'actionfailed',
            /**
             * @event actioncomplete
             * Fires when an action is completed.
             * @param {Ext.form.Basic} this
             * @param {Ext.form.action.Action} action The {@link Ext.form.action.Action} that completed
             */
            'actioncomplete',
            /**
             * @event validitychange
             * Fires when the validity of the entire form changes.
             * @param {Ext.form.Basic} this
             * @param {Boolean} valid `true` if the form is now valid, `false` if it is now invalid.
             */
            'validitychange',
            /**
             * @event dirtychange
             * Fires when the dirty state of the entire form changes.
             * @param {Ext.form.Basic} this
             * @param {Boolean} dirty `true` if the form is now dirty, `false` if it is no longer dirty.
             */
            'dirtychange'
        );
        me.callParent();
    },

    /**
     * Do any post layout initialization
     * @private
     */
    initialize : function() {
        var me = this;
        me.initialized = true;
        me.onValidityChange(!me.hasInvalidField());
    },


    /**
     * @cfg {String} method
     * The request method to use (GET or POST) for form actions if one isn't supplied in the action options.
     */

    /**
     * @cfg {Ext.data.reader.Reader} reader
     * An Ext.data.DataReader (e.g. {@link Ext.data.reader.Xml}) to be used to read
     * data when executing 'load' actions. This is optional as there is built-in
     * support for processing JSON responses.
     */

    /**
     * @cfg {Ext.data.reader.Reader} errorReader
     * An Ext.data.DataReader (e.g. {@link Ext.data.reader.Xml}) to be used to
     * read field error messages returned from 'submit' actions. This is optional
     * as there is built-in support for processing JSON responses.
     *
     * The Records which provide messages for the invalid Fields must use the
     * Field name (or id) as the Record ID, and must contain a field called 'msg'
     * which contains the error message.
     *
     * The errorReader does not have to be a full-blown implementation of a
     * Reader. It simply needs to implement a `read(xhr)` function
     * which returns an Array of Records in an object with the following
     * structure:
     *
     *     {
     *         records: recordArray
     *     }
     */

    /**
     * @cfg {String} url
     * The URL to use for form actions if one isn't supplied in the
     * {@link #doAction doAction} options.
     */

    /**
     * @cfg {Object} baseParams
     * Parameters to pass with all requests. e.g. baseParams: `{id: '123', foo: 'bar'}`.
     *
     * Parameters are encoded as standard HTTP parameters using {@link Ext.Object#toQueryString}.
     */

    /**
     * @cfg {Number} timeout
     * Timeout for form actions in seconds.
     */
    timeout: 30,

    /**
     * @cfg {Object} api
     * If specified, load and submit actions will be handled
     * with {@link Ext.form.action.DirectLoad} and {@link Ext.form.action.DirectLoad}.
     * Methods which have been imported by {@link Ext.direct.Manager} can be specified here to load and submit
     * forms. API methods may also be specified as strings. See {@link Ext.data.proxy.Direct#directFn}.
     * Such as the following:
     *
     *     api: {
     *         load: App.ss.MyProfile.load,
     *         submit: App.ss.MyProfile.submit
     *     }
     *
     * Load actions can use {@link #paramOrder} or {@link #paramsAsHash}
     * to customize how the load method is invoked.
     * Submit actions will always use a standard form submit. The `formHandler` configuration must
     * be set on the associated server-side method which has been imported by {@link Ext.direct.Manager}.
     */

    /**
     * @cfg {String/String[]} paramOrder
     * A list of params to be executed server side. Only used for the {@link #api} `load`
     * configuration.
     *
     * Specify the params in the order in which they must be executed on the
     * server-side as either (1) an Array of String values, or (2) a String of params
     * delimited by either whitespace, comma, or pipe. For example,
     * any of the following would be acceptable:
     *
     *     paramOrder: ['param1','param2','param3']
     *     paramOrder: 'param1 param2 param3'
     *     paramOrder: 'param1,param2,param3'
     *     paramOrder: 'param1|param2|param'
     */

    /**
     * @cfg {Boolean} paramsAsHash
     * Only used for the {@link #api} `load` configuration. If true, parameters will be sent as a
     * single hash collection of named arguments. Providing a {@link #paramOrder} nullifies this
     * configuration.
     */
    paramsAsHash: false,

    /**
     * @cfg {String} waitTitle
     * The default title to show for the waiting message box
     */
    //<locale>
    waitTitle: 'Please Wait...',
    //</locale>

    /**
     * @cfg {Boolean} trackResetOnLoad
     * If set to true, {@link #reset}() resets to the last loaded or {@link #setValues}() data instead of
     * when the form was first created.
     */
    trackResetOnLoad: false,

    /**
     * @cfg {Boolean} standardSubmit
     * If set to true, a standard HTML form submit is used instead of a XHR (Ajax) style form submission.
     * All of the field values, plus any additional params configured via {@link #baseParams}
     * and/or the `options` to {@link #submit}, will be included in the values submitted in the form.
     */

    /**
     * @cfg {String/HTMLElement/Ext.Element} waitMsgTarget
     * By default wait messages are displayed with Ext.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     */


    // Private
    wasDirty: false,


    /**
     * Destroys this object.
     */
    destroy: function() {
        this.clearListeners();
        this.checkValidityTask.cancel();
    },

    /**
     * @private
     * Handle addition or removal of descendant items. Invalidates the cached list of fields
     * so that {@link #getFields} will do a fresh query next time it is called. Also adds listeners
     * for state change events on added fields, and tracks components with formBind=true.
     */
    onItemAddOrRemove: function(parent, child) {
        var me = this,
            isAdding = !!child.ownerCt,
            isContainer = child.isContainer;

        function handleField(field) {
            // Listen for state change events on fields
            me[isAdding ? 'mon' : 'mun'](field, {
                validitychange: me.checkValidity,
                dirtychange: me.checkDirty,
                scope: me,
                buffer: 100 //batch up sequential calls to avoid excessive full-form validation
            });
            // Flush the cached list of fields
            delete me._fields;
        }

        if (child.isFormField) {
            handleField(child);
        } else if (isContainer) {
            // Walk down
            if (child.isDestroyed) {
                // the container is destroyed, this means we may have child fields, so here
                // we just invalidate all the fields to be sure.
                delete me._fields;
            } else {
                Ext.Array.forEach(child.query('[isFormField]'), handleField);
            }
        }

        // Flush the cached list of formBind components
        delete this._boundItems;

        // Check form bind, but only after initial add. Batch it to prevent excessive validation
        // calls when many fields are being added at once.
        if (me.initialized) {
            me.checkValidityTask.delay(10);
        }
    },

    /**
     * Return all the {@link Ext.form.field.Field} components in the owner container.
     * @return {Ext.util.MixedCollection} Collection of the Field objects
     */
    getFields: function() {
        var fields = this._fields;
        if (!fields) {
            fields = this._fields = new Ext.util.MixedCollection();
            fields.addAll(this.owner.query('[isFormField]'));
        }
        return fields;
    },

    /**
     * @private
     * Finds and returns the set of all items bound to fields inside this form
     * @return {Ext.util.MixedCollection} The set of all bound form field items
     */
    getBoundItems: function() {
        var boundItems = this._boundItems;
        
        if (!boundItems || boundItems.getCount() === 0) {
            boundItems = this._boundItems = new Ext.util.MixedCollection();
            boundItems.addAll(this.owner.query('[formBind]'));
        }
        
        return boundItems;
    },

    /**
     * Returns true if the form contains any invalid fields. No fields will be marked as invalid
     * as a result of calling this; to trigger marking of fields use {@link #isValid} instead.
     */
    hasInvalidField: function() {
        return !!this.getFields().findBy(function(field) {
            var preventMark = field.preventMark,
                isValid;
            field.preventMark = true;
            isValid = field.isValid();
            field.preventMark = preventMark;
            return !isValid;
        });
    },

    /**
     * Returns true if client-side validation on the form is successful. Any invalid fields will be
     * marked as invalid. If you only want to determine overall form validity without marking anything,
     * use {@link #hasInvalidField} instead.
     * @return Boolean
     */
    isValid: function() {
        var me = this,
            invalid;
        Ext.suspendLayouts();
        invalid = me.getFields().filterBy(function(field) {
            return !field.validate();
        });
        Ext.resumeLayouts(true);
        return invalid.length < 1;
    },

    /**
     * Check whether the validity of the entire form has changed since it was last checked, and
     * if so fire the {@link #validitychange validitychange} event. This is automatically invoked
     * when an individual field's validity changes.
     */
    checkValidity: function() {
        var me = this,
            valid = !me.hasInvalidField();
        if (valid !== me.wasValid) {
            me.onValidityChange(valid);
            me.fireEvent('validitychange', me, valid);
            me.wasValid = valid;
        }
    },

    /**
     * @private
     * Handle changes in the form's validity. If there are any sub components with
     * formBind=true then they are enabled/disabled based on the new validity.
     * @param {Boolean} valid
     */
    onValidityChange: function(valid) {
        var boundItems = this.getBoundItems(),
            items, i, iLen, cmp;

        if (boundItems) {
            items = boundItems.items;
            iLen  = items.length;

            for (i = 0; i < iLen; i++) {
                cmp = items[i];

                if (cmp.disabled === valid) {
                    cmp.setDisabled(!valid);
                }
            }
        }
    },

    /**
     * Returns true if any fields in this form have changed from their original values.
     *
     * Note that if this BasicForm was configured with {@link #trackResetOnLoad} then the
     * Fields' *original values* are updated when the values are loaded by {@link #setValues}
     * or {@link #loadRecord}.
     *
     * @return Boolean
     */
    isDirty: function() {
        return !!this.getFields().findBy(function(f) {
            return f.isDirty();
        });
    },

    /**
     * Check whether the dirty state of the entire form has changed since it was last checked, and
     * if so fire the {@link #dirtychange dirtychange} event. This is automatically invoked
     * when an individual field's dirty state changes.
     */
    checkDirty: function() {
        var dirty = this.isDirty();
        if (dirty !== this.wasDirty) {
            this.fireEvent('dirtychange', this, dirty);
            this.wasDirty = dirty;
        }
    },

    /**
     * Returns true if the form contains a file upload field. This is used to determine the method for submitting the
     * form: File uploads are not performed using normal 'Ajax' techniques, that is they are **not** performed using
     * XMLHttpRequests. Instead a hidden `<form>` element containing all the fields is created temporarily and submitted
     * with its [target][1] set to refer to a dynamically generated, hidden `<iframe>` which is inserted into the document
     * but removed after the return data has been gathered.
     *
     * The server response is parsed by the browser to create the document for the IFRAME. If the server is using JSON
     * to send the return object, then the [Content-Type][2] header must be set to "text/html" in order to tell the
     * browser to insert the text unchanged into the document body.
     *
     * Characters which are significant to an HTML parser must be sent as HTML entities, so encode `"<"` as `"&lt;"`,
     * `"&"` as `"&amp;"` etc.
     *
     * The response text is retrieved from the document, and a fake XMLHttpRequest object is created containing a
     * responseText property in order to conform to the requirements of event handlers and callbacks.
     *
     * Be aware that file upload packets are sent with the content type [multipart/form][3] and some server technologies
     * (notably JEE) may require some custom processing in order to retrieve parameter names and parameter values from
     * the packet content.
     *
     * [1]: http://www.w3.org/TR/REC-html40/present/frames.html#adef-target
     * [2]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
     * [3]: http://www.faqs.org/rfcs/rfc2388.html
     *
     * @return Boolean
     */
    hasUpload: function() {
        return !!this.getFields().findBy(function(f) {
            return f.isFileUpload();
        });
    },

    /**
     * Performs a predefined action (an implementation of {@link Ext.form.action.Action}) to perform application-
     * specific processing.
     *
     * @param {String/Ext.form.action.Action} action The name of the predefined action type, or instance of {@link
     * Ext.form.action.Action} to perform.
     *
     * @param {Object} [options] The options to pass to the {@link Ext.form.action.Action} that will get created,
     * if the action argument is a String.
     *
     * All of the config options listed below are supported by both the {@link Ext.form.action.Submit submit} and
     * {@link Ext.form.action.Load load} actions unless otherwise noted (custom actions could also accept other
     * config options):
     *
     * @param {String} options.url
     * The url for the action (defaults to the form's {@link #url}.)
     *
     * @param {String} options.method
     * The form method to use (defaults to the form's method, or POST if not defined)
     *
     * @param {String/Object} options.params
     * The params to pass (defaults to the form's baseParams, or none if not defined)
     *
     * Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode Ext.Object.toQueryString}.
     *
     * @param {Object} options.headers
     * Request headers to set for the action.
     *
     * @param {Function} options.success
     * The callback that will be invoked after a successful response (see top of {@link Ext.form.action.Submit submit}
     * and {@link Ext.form.action.Load load} for a description of what constitutes a successful response).
     * @param {Ext.form.Basic} options.success.form The form that requested the action.
     * @param {Ext.form.action.Action} options.success.action The Action object which performed the operation.
     * The action object contains these properties of interest:
     *
     *  - {@link Ext.form.action.Action#response response}
     *  - {@link Ext.form.action.Action#result result} - interrogate for custom postprocessing
     *  - {@link Ext.form.action.Action#type type}
     *
     * @param {Function} options.failure
     * The callback that will be invoked after a failed transaction attempt.
     * @param {Ext.form.Basic} options.failure.form The form that requested the action.
     * @param {Ext.form.action.Action} options.failure.action The Action object which performed the operation.
     * The action object contains these properties of interest:
     *
     * - {@link Ext.form.action.Action#failureType failureType}
     * - {@link Ext.form.action.Action#response response}
     * - {@link Ext.form.action.Action#result result} - interrogate for custom postprocessing
     * - {@link Ext.form.action.Action#type type}
     *
     * @param {Object} options.scope
     * The scope in which to call the callback functions (The this reference for the callback functions).
     *
     * @param {Boolean} options.clientValidation
     * Submit Action only. Determines whether a Form's fields are validated in a final call to {@link
     * Ext.form.Basic#isValid isValid} prior to submission. Set to false to prevent this. If undefined, pre-submission
     * field validation is performed.
     *
     * @return {Ext.form.Basic} this
     */
    doAction: function(action, options) {
        if (Ext.isString(action)) {
            action = Ext.ClassManager.instantiateByAlias('formaction.' + action, Ext.apply({}, options, {form: this}));
        }
        if (this.fireEvent('beforeaction', this, action) !== false) {
            this.beforeAction(action);
            Ext.defer(action.run, 100, action);
        }
        return this;
    },

    /**
     * Shortcut to {@link #doAction do} a {@link Ext.form.action.Submit submit action}. This will use the
     * {@link Ext.form.action.Submit AJAX submit action} by default. If the {@link #standardSubmit} config
     * is enabled it will use a standard form element to submit, or if the {@link #api} config is present
     * it will use the {@link Ext.form.action.DirectLoad Ext.direct.Direct submit action}.
     *
     * The following code:
     *
     *     myFormPanel.getForm().submit({
     *         clientValidation: true,
     *         url: 'updateConsignment.php',
     *         params: {
     *             newStatus: 'delivered'
     *         },
     *         success: function(form, action) {
     *            Ext.Msg.alert('Success', action.result.msg);
     *         },
     *         failure: function(form, action) {
     *             switch (action.failureType) {
     *                 case Ext.form.action.Action.CLIENT_INVALID:
     *                     Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
     *                     break;
     *                 case Ext.form.action.Action.CONNECT_FAILURE:
     *                     Ext.Msg.alert('Failure', 'Ajax communication failed');
     *                     break;
     *                 case Ext.form.action.Action.SERVER_INVALID:
     *                    Ext.Msg.alert('Failure', action.result.msg);
     *            }
     *         }
     *     });
     *
     * would process the following server response for a successful submission:
     *
     *     {
     *         "success":true, // note this is Boolean, not string
     *         "msg":"Consignment updated"
     *     }
     *
     * and the following server response for a failed submission:
     *
     *     {
     *         "success":false, // note this is Boolean, not string
     *         "msg":"You do not have permission to perform this operation"
     *     }
     *
     * @param {Object} options The options to pass to the action (see {@link #doAction} for details).
     * @return {Ext.form.Basic} this
     */
    submit: function(options) {
        return this.doAction(this.standardSubmit ? 'standardsubmit' : this.api ? 'directsubmit' : 'submit', options);
    },

    /**
     * Shortcut to {@link #doAction do} a {@link Ext.form.action.Load load action}.
     * @param {Object} options The options to pass to the action (see {@link #doAction} for details)
     * @return {Ext.form.Basic} this
     */
    load: function(options) {
        return this.doAction(this.api ? 'directload' : 'load', options);
    },

    /**
     * Persists the values in this form into the passed {@link Ext.data.Model} object in a beginEdit/endEdit block.
     * If the record is not specified, it will attempt to update (if it exists) the record provided to loadRecord.
     * @param {Ext.data.Model} [record] The record to edit
     * @return {Ext.form.Basic} this
     */
    updateRecord: function(record) {
        record = record || this._record;
        if (!record) {
            Ext.Error.raise("A record is required.");
        }
        var fields = record.fields.items,
            values = this.getFieldValues(),
            obj = {},
            i = 0,
            len = fields.length,
            name;

        for (; i < len; ++i) {
            name  = fields[i].name;

            if (values.hasOwnProperty(name)) {
                obj[name] = values[name];
            }
        }

        record.beginEdit();
        record.set(obj);
        record.endEdit();

        return this;
    },

    /**
     * Loads an {@link Ext.data.Model} into this form by calling {@link #setValues} with the
     * {@link Ext.data.Model#raw record data}.
     * See also {@link #trackResetOnLoad}.
     * @param {Ext.data.Model} record The record to load
     * @return {Ext.form.Basic} this
     */
    loadRecord: function(record) {
        this._record = record;
        return this.setValues(record.data);
    },

    /**
     * Returns the last Ext.data.Model instance that was loaded via {@link #loadRecord}
     * @return {Ext.data.Model} The record
     */
    getRecord: function() {
        return this._record;
    },

    /**
     * @private
     * Called before an action is performed via {@link #doAction}.
     * @param {Ext.form.action.Action} action The Action instance that was invoked
     */
    beforeAction: function(action) {
        var waitMsg = action.waitMsg,
            maskCls = Ext.baseCSSPrefix + 'mask-loading',
            fields  = this.getFields().items,
            f,
            fLen    = fields.length,
            field, waitMsgTarget;

        // Call HtmlEditor's syncValue before actions
        for (f = 0; f < fLen; f++) {
            field = fields[f];

            if (field.isFormField && field.syncValue) {
                field.syncValue();
            }
        }

        if (waitMsg) {
            waitMsgTarget = this.waitMsgTarget;
            if (waitMsgTarget === true) {
                this.owner.el.mask(waitMsg, maskCls);
            } else if (waitMsgTarget) {
                waitMsgTarget = this.waitMsgTarget = Ext.get(waitMsgTarget);
                waitMsgTarget.mask(waitMsg, maskCls);
            } else {
                Ext.MessageBox.wait(waitMsg, action.waitTitle || this.waitTitle);
            }
        }
    },

    /**
     * @private
     * Called after an action is performed via {@link #doAction}.
     * @param {Ext.form.action.Action} action The Action instance that was invoked
     * @param {Boolean} success True if the action completed successfully, false, otherwise.
     */
    afterAction: function(action, success) {
        if (action.waitMsg) {
            var MessageBox = Ext.MessageBox,
                waitMsgTarget = this.waitMsgTarget;
            if (waitMsgTarget === true) {
                this.owner.el.unmask();
            } else if (waitMsgTarget) {
                waitMsgTarget.unmask();
            } else {
                MessageBox.updateProgress(1);
                MessageBox.hide();
            }
        }
        if (success) {
            if (action.reset) {
                this.reset();
            }
            Ext.callback(action.success, action.scope || action, [this, action]);
            this.fireEvent('actioncomplete', this, action);
        } else {
            Ext.callback(action.failure, action.scope || action, [this, action]);
            this.fireEvent('actionfailed', this, action);
        }
    },


    /**
     * Find a specific {@link Ext.form.field.Field} in this form by id or name.
     * @param {String} id The value to search for (specify either a {@link Ext.Component#id id} or
     * {@link Ext.form.field.Field#getName name or hiddenName}).
     * @return {Ext.form.field.Field} The first matching field, or `null` if none was found.
     */
    findField: function(id) {
        return this.getFields().findBy(function(f) {
            return f.id === id || f.getName() === id;
        });
    },


    /**
     * Mark fields in this form invalid in bulk.
     * @param {Object/Object[]/Ext.data.Errors} errors
     * Either an array in the form `[{id:'fieldId', msg:'The message'}, ...]`,
     * an object hash of `{id: msg, id2: msg2}`, or a {@link Ext.data.Errors} object.
     * @return {Ext.form.Basic} this
     */
    markInvalid: function(errors) {
        var me = this,
            e, eLen, error, value,
            key;

        function mark(fieldId, msg) {
            var field = me.findField(fieldId);
            if (field) {
                field.markInvalid(msg);
            }
        }

        if (Ext.isArray(errors)) {
            eLen = errors.length;

            for (e = 0; e < eLen; e++) {
                error = errors[e];
                mark(error.id, error.msg);
            }
        } else if (errors instanceof Ext.data.Errors) {
            eLen  = errors.items.length;
            for (e = 0; e < eLen; e++) {
                error = errors.items[e];

                mark(error.field, error.message);
            }
        } else {
            for (key in errors) {
                if (errors.hasOwnProperty(key)) {
                    value = errors[key];
                    mark(key, value, errors);
                }
            }
        }
        return this;
    },

    /**
     * Set values for fields in this form in bulk.
     *
     * @param {Object/Object[]} values Either an array in the form:
     *
     *     [{id:'clientName', value:'Fred. Olsen Lines'},
     *      {id:'portOfLoading', value:'FXT'},
     *      {id:'portOfDischarge', value:'OSL'} ]
     *
     * or an object hash of the form:
     *
     *     {
     *         clientName: 'Fred. Olsen Lines',
     *         portOfLoading: 'FXT',
     *         portOfDischarge: 'OSL'
     *     }
     *
     * @return {Ext.form.Basic} this
     */
    setValues: function(values) {
        var me = this,
            v, vLen, val, field;

        function setVal(fieldId, val) {
            var field = me.findField(fieldId);
            if (field) {
                field.setValue(val);
                if (me.trackResetOnLoad) {
                    field.resetOriginalValue();
                }
            }
        }

        if (Ext.isArray(values)) {
            // array of objects
            vLen = values.length;

            for (v = 0; v < vLen; v++) {
                val = values[v];

                setVal(val.id, val.value);
            }
        } else {
            // object hash
            Ext.iterate(values, setVal);
        }
        return this;
    },

    /**
     * Retrieves the fields in the form as a set of key/value pairs, using their
     * {@link Ext.form.field.Field#getSubmitData getSubmitData()} method to collect the values.
     * If multiple fields return values under the same name those values will be combined into an Array.
     * This is similar to {@link #getFieldValues} except that this method collects only String values for
     * submission, while getFieldValues collects type-specific data values (e.g. Date objects for date fields.)
     *
     * @param {Boolean} [asString=false] If true, will return the key/value collection as a single
     * URL-encoded param string.
     * @param {Boolean} [dirtyOnly=false] If true, only fields that are dirty will be included in the result.
     * @param {Boolean} [includeEmptyText=false]] If true, the configured emptyText of empty fields will be used.
     * @return {String/Object}
     */
    getValues: function(asString, dirtyOnly, includeEmptyText, useDataValues) {
        var values  = {},
            fields  = this.getFields().items,
            f,
            fLen    = fields.length,
            isArray = Ext.isArray,
            field, data, val, bucket, name;

        for (f = 0; f < fLen; f++) {
            field = fields[f];

            if (!dirtyOnly || field.isDirty()) {
                data = field[useDataValues ? 'getModelData' : 'getSubmitData'](includeEmptyText);

                if (Ext.isObject(data)) {
                    for (name in data) {
                        if (data.hasOwnProperty(name)) {
                            val = data[name];

                            if (includeEmptyText && val === '') {
                                val = field.emptyText || '';
                            }

                            if (values.hasOwnProperty(name)) {
                                bucket = values[name];

                                if (!isArray(bucket)) {
                                    bucket = values[name] = [bucket];
                                }

                                if (isArray(val)) {
                                    values[name] = values[name] = bucket.concat(val);
                                } else {
                                    bucket.push(val);
                                }
                            } else {
                                values[name] = val;
                            }
                        }
                    }
                }
            }
        }

        if (asString) {
            values = Ext.Object.toQueryString(values);
        }
        return values;
    },

    /**
     * Retrieves the fields in the form as a set of key/value pairs, using their
     * {@link Ext.form.field.Field#getModelData getModelData()} method to collect the values.
     * If multiple fields return values under the same name those values will be combined into an Array.
     * This is similar to {@link #getValues} except that this method collects type-specific data values
     * (e.g. Date objects for date fields) while getValues returns only String values for submission.
     *
     * @param {Boolean} [dirtyOnly=false] If true, only fields that are dirty will be included in the result.
     * @return {Object}
     */
    getFieldValues: function(dirtyOnly) {
        return this.getValues(false, dirtyOnly, false, true);
    },

    /**
     * Clears all invalid field messages in this form.
     * @return {Ext.form.Basic} this
     */
    clearInvalid: function() {
        Ext.suspendLayouts();

        var me     = this,
            fields = me.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            fields[f].clearInvalid();
        }

        Ext.resumeLayouts(true);
        return me;
    },

    /**
     * Resets all fields in this form.
     * @return {Ext.form.Basic} this
     */
    reset: function() {
        Ext.suspendLayouts();

        var me     = this,
            fields = me.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            fields[f].reset();
        }

        Ext.resumeLayouts(true);
        return me;
    },

    /**
     * Calls {@link Ext#apply Ext.apply} for all fields in this form with the passed object.
     * @param {Object} obj The object to be applied
     * @return {Ext.form.Basic} this
     */
    applyToFields: function(obj) {
        var fields = this.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            Ext.apply(fields[f], obj);
        }

        return this;
    },

    /**
     * Calls {@link Ext#applyIf Ext.applyIf} for all field in this form with the passed object.
     * @param {Object} obj The object to be applied
     * @return {Ext.form.Basic} this
     */
    applyIfToFields: function(obj) {
        var fields = this.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            Ext.applyIf(fields[f], obj);
        }

        return this;
    }
});

/**
 * @docauthor Jason Johnston <jason@sencha.com>
 * 
 * FormPanel provides a standard container for forms. It is essentially a standard {@link Ext.panel.Panel} which
 * automatically creates a {@link Ext.form.Basic BasicForm} for managing any {@link Ext.form.field.Field}
 * objects that are added as descendants of the panel. It also includes conveniences for configuring and
 * working with the BasicForm and the collection of Fields.
 * 
 * # Layout
 * 
 * By default, FormPanel is configured with `{@link Ext.layout.container.Anchor layout:'anchor'}` for
 * the layout of its immediate child items. This can be changed to any of the supported container layouts.
 * The layout of sub-containers is configured in {@link Ext.container.Container#layout the standard way}.
 * 
 * # BasicForm
 * 
 * Although **not listed** as configuration options of FormPanel, the FormPanel class accepts all
 * of the config options supported by the {@link Ext.form.Basic} class, and will pass them along to
 * the internal BasicForm when it is created.
 * 
 * **Note**: If subclassing FormPanel, any configuration options for the BasicForm must be applied to
 * the `initialConfig` property of the FormPanel. Applying {@link Ext.form.Basic BasicForm}
 * configuration settings to `this` will *not* affect the BasicForm's configuration.
 * 
 *     Ext.define('MyForm', {
 *         extend: 'Ext.form.Panel',
 *         constructor: function(config) {
 *             Ext.applyIf(config, {
 *                 // defaults for configs that should be passed along to the Basic form constructor go here
 *                 trackResetOnLoad: true
 *             });
 *             this.callParent(arguments);
 *         }
 *     });
 * 
 * The following events fired by the BasicForm will be re-fired by the FormPanel and can therefore be
 * listened for on the FormPanel itself:
 * 
 * - {@link Ext.form.Basic#beforeaction beforeaction}
 * - {@link Ext.form.Basic#actionfailed actionfailed}
 * - {@link Ext.form.Basic#actioncomplete actioncomplete}
 * - {@link Ext.form.Basic#validitychange validitychange}
 * - {@link Ext.form.Basic#dirtychange dirtychange}
 * 
 * # Field Defaults
 * 
 * The {@link #fieldDefaults} config option conveniently allows centralized configuration of default values
 * for all fields added as descendants of the FormPanel. Any config option recognized by implementations
 * of {@link Ext.form.Labelable} may be included in this object. See the {@link #fieldDefaults} documentation
 * for details of how the defaults are applied.
 * 
 * # Form Validation
 * 
 * With the default configuration, form fields are validated on-the-fly while the user edits their values.
 * This can be controlled on a per-field basis (or via the {@link #fieldDefaults} config) with the field
 * config properties {@link Ext.form.field.Field#validateOnChange} and {@link Ext.form.field.Base#checkChangeEvents},
 * and the FormPanel's config properties {@link #pollForChanges} and {@link #pollInterval}.
 * 
 * Any component within the FormPanel can be configured with `formBind: true`. This will cause that
 * component to be automatically disabled when the form is invalid, and enabled when it is valid. This is most
 * commonly used for Button components to prevent submitting the form in an invalid state, but can be used on
 * any component type.
 * 
 * For more information on form validation see the following:
 * 
 * - {@link Ext.form.field.Field#validateOnChange}
 * - {@link #pollForChanges} and {@link #pollInterval}
 * - {@link Ext.form.field.VTypes}
 * - {@link Ext.form.Basic#doAction BasicForm.doAction clientValidation notes}
 * 
 * # Form Submission
 * 
 * By default, Ext Forms are submitted through Ajax, using {@link Ext.form.action.Action}. See the documentation for
 * {@link Ext.form.Basic} for details.
 *
 * # Example usage
 * 
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Simple Form',
 *         bodyPadding: 5,
 *         width: 350,
 * 
 *         // The form will submit an AJAX request to this URL when submitted
 *         url: 'save-form.php',
 * 
 *         // Fields will be arranged vertically, stretched to full width
 *         layout: 'anchor',
 *         defaults: {
 *             anchor: '100%'
 *         },
 * 
 *         // The fields
 *         defaultType: 'textfield',
 *         items: [{
 *             fieldLabel: 'First Name',
 *             name: 'first',
 *             allowBlank: false
 *         },{
 *             fieldLabel: 'Last Name',
 *             name: 'last',
 *             allowBlank: false
 *         }],
 * 
 *         // Reset and Submit buttons
 *         buttons: [{
 *             text: 'Reset',
 *             handler: function() {
 *                 this.up('form').getForm().reset();
 *             }
 *         }, {
 *             text: 'Submit',
 *             formBind: true, //only enabled once the form is valid
 *             disabled: true,
 *             handler: function() {
 *                 var form = this.up('form').getForm();
 *                 if (form.isValid()) {
 *                     form.submit({
 *                         success: function(form, action) {
 *                            Ext.Msg.alert('Success', action.result.msg);
 *                         },
 *                         failure: function(form, action) {
 *                             Ext.Msg.alert('Failed', action.result.msg);
 *                         }
 *                     });
 *                 }
 *             }
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *
 */
Ext.define('Ext.form.Panel', {
    extend:'Ext.panel.Panel',
    mixins: {
        fieldAncestor: 'Ext.form.FieldAncestor'
    },
    alias: 'widget.form',
    alternateClassName: ['Ext.FormPanel', 'Ext.form.FormPanel'],
    requires: ['Ext.form.Basic', 'Ext.util.TaskRunner'],

    /**
     * @cfg {Boolean} pollForChanges
     * If set to `true`, sets up an interval task (using the {@link #pollInterval}) in which the
     * panel's fields are repeatedly checked for changes in their values. This is in addition to the normal detection
     * each field does on its own input element, and is not needed in most cases. It does, however, provide a
     * means to absolutely guarantee detection of all changes including some edge cases in some browsers which
     * do not fire native events. Defaults to `false`.
     */

    /**
     * @cfg {Number} pollInterval
     * Interval in milliseconds at which the form's fields are checked for value changes. Only used if
     * the {@link #pollForChanges} option is set to `true`. Defaults to 500 milliseconds.
     */

    /**
     * @cfg {String} layout
     * The {@link Ext.container.Container#layout} for the form panel's immediate child items.
     * Defaults to `'anchor'`.
     */
    layout: 'anchor',

    ariaRole: 'form',

    initComponent: function() {
        var me = this;

        if (me.frame) {
            me.border = false;
        }

        me.initFieldAncestor();
        me.callParent();

        me.relayEvents(me.form, [
            /**
             * @event beforeaction
             * @inheritdoc Ext.form.Basic#beforeaction
             */
            'beforeaction',
            /**
             * @event actionfailed
             * @inheritdoc Ext.form.Basic#actionfailed
             */
            'actionfailed',
            /**
             * @event actioncomplete
             * @inheritdoc Ext.form.Basic#actioncomplete
             */
            'actioncomplete',
            /**
             * @event validitychange
             * @inheritdoc Ext.form.Basic#validitychange
             */
            'validitychange',
            /**
             * @event dirtychange
             * @inheritdoc Ext.form.Basic#dirtychange
             */
            'dirtychange'
        ]);

        // Start polling if configured
        if (me.pollForChanges) {
            me.startPolling(me.pollInterval || 500);
        }
    },

    initItems: function() {
        // Create the BasicForm
        var me = this;

        me.form = me.createForm();
        me.callParent();
    },

    // Initialize the BasicForm after all layouts have been completed.
    afterFirstLayout: function() {
        this.callParent();
        this.form.initialize();
    },

    /**
     * @private
     */
    createForm: function() {
        return new Ext.form.Basic(this, Ext.applyIf({listeners: {}}, this.initialConfig));
    },

    /**
     * Provides access to the {@link Ext.form.Basic Form} which this Panel contains.
     * @return {Ext.form.Basic} The {@link Ext.form.Basic Form} which this Panel contains.
     */
    getForm: function() {
        return this.form;
    },

    /**
     * Loads an {@link Ext.data.Model} into this form (internally just calls {@link Ext.form.Basic#loadRecord})
     * See also {@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad}.
     * @param {Ext.data.Model} record The record to load
     * @return {Ext.form.Basic} The Ext.form.Basic attached to this FormPanel
     */
    loadRecord: function(record) {
        return this.getForm().loadRecord(record);
    },

    /**
     * Returns the currently loaded Ext.data.Model instance if one was loaded via {@link #loadRecord}.
     * @return {Ext.data.Model} The loaded instance
     */
    getRecord: function() {
        return this.getForm().getRecord();
    },

    /**
     * Convenience function for fetching the current value of each field in the form. This is the same as calling
     * {@link Ext.form.Basic#getValues this.getForm().getValues()}
     * @param {Boolean} [asString=false] If true, will return the key/value collection as a single
     * URL-encoded param string.
     * @param {Boolean} [dirtyOnly=false] If true, only fields that are dirty will be included in the result.
     * @param {Boolean} [includeEmptyText=false]] If true, the configured emptyText of empty fields will be used.
     * @return {String/Object}
     */
    getValues: function(asString, dirtyOnly, includeEmptyText, useDataValues) {
        return this.getForm().getValues(asString, dirtyOnly, includeEmptyText, useDataValues);
    },

    beforeDestroy: function() {
        this.stopPolling();
        this.form.destroy();
        this.callParent();
    },

    /**
     * This is a proxy for the underlying BasicForm's {@link Ext.form.Basic#load} call.
     * @param {Object} options The options to pass to the action (see {@link Ext.form.Basic#load} and
     * {@link Ext.form.Basic#doAction} for details)
     */
    load: function(options) {
        this.form.load(options);
    },

    /**
     * This is a proxy for the underlying BasicForm's {@link Ext.form.Basic#submit} call.
     * @param {Object} options The options to pass to the action (see {@link Ext.form.Basic#submit} and
     * {@link Ext.form.Basic#doAction} for details)
     */
    submit: function(options) {
        this.form.submit(options);
    },

    /**
     * Start an interval task to continuously poll all the fields in the form for changes in their
     * values. This is normally started automatically by setting the {@link #pollForChanges} config.
     * @param {Number} interval The interval in milliseconds at which the check should run.
     */
    startPolling: function(interval) {
        this.stopPolling();
        var task = new Ext.util.TaskRunner(interval);
        task.start({
            interval: 0,
            run: this.checkChange,
            scope: this
        });
        this.pollTask = task;
    },

    /**
     * Stop a running interval task that was started by {@link #startPolling}.
     */
    stopPolling: function() {
        var task = this.pollTask;
        if (task) {
            task.stopAll();
            delete this.pollTask;
        }
    },

    /**
     * Forces each field within the form panel to
     * {@link Ext.form.field.Field#checkChange check if its value has changed}.
     */
    checkChange: function() {
        var fields = this.form.getFields().items,
            f,
            fLen   = fields.length,
            field;

        for (f = 0; f < fLen; f++) {
            fields[f].checkChange();
        }
    }
});

/**
 * @class MyApp.view.clients.ClientForm
 * @extends Ext.form.Panel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The clients form to collect data
 */

Ext.define('MyApp.view.clients.ClientForm',{
	extend      : 'Ext.form.Panel',
	alias       : 'widget.clients.form',
	requires    : [
		'Ext.form.field.Hidden'
	],

	title		: 'Client form',
	bodyPadding	: 5,
	border		: false,
	bodyBorder	: false,
	defaults	: {
		xtype	: 'textfield'
	},

	initComponent   : function(){
		var me = this;

		me.items = me.buildItems();
		me.dockedItems = me.buildToolbars();

		me.callParent();
	},

	buildToolbars : function(){
		return [{
			xtype : 'toolbar',
			docked: 'top',
			items : [
				{text:'New',iconCls:'new-icon16',action:'new'},
				{text:'Save',iconCls:'save-icon16',action:'save'},
				{text:'Delete',iconCls:'delete-icon16',action:'delete'}
			]
		}];
	},

	buildItems : function(){
		return [{
			xtype		: 'hidden',
			name		: 'id'
		},{
			fieldLabel	: 'Name',
			name		: 'name'
		},{
			fieldLabel	: 'Contact',
			name		: 'contact'
		},{
			xtype		: 'textarea',
			fieldLabel  : 'Address',
			name		: 'address'
		},{
			fieldLabel	: 'Phone',
			name		: 'phone'
		}];
	}
});
/**
 * @private
 */
Ext.define('Ext.grid.header.DragZone', {
    extend: 'Ext.dd.DragZone',
    colHeaderCls: Ext.baseCSSPrefix + 'column-header',
    maxProxyWidth: 120,

    constructor: function(headerCt) {
        this.headerCt = headerCt;
        this.ddGroup =  this.getDDGroup();
        this.callParent([headerCt.el]);
        this.proxy.el.addCls(Ext.baseCSSPrefix + 'grid-col-dd');
    },

    getDDGroup: function() {
        return 'header-dd-zone-' + this.headerCt.up('[scrollerOwner]').id;
    },

    getDragData: function(e) {
        var header = e.getTarget('.'+this.colHeaderCls),
            headerCmp,
            ddel;

        if (header) {
            headerCmp = Ext.getCmp(header.id);
            if (!this.headerCt.dragging && headerCmp.draggable && !(headerCmp.isOnLeftEdge(e) || headerCmp.isOnRightEdge(e))) {
                ddel = document.createElement('div');
                ddel.innerHTML = Ext.getCmp(header.id).text;
                return {
                    ddel: ddel,
                    header: headerCmp
                };
            }
        }
        return false;
    },

    onBeforeDrag: function() {
        return !(this.headerCt.dragging || this.disabled);
    },

    onInitDrag: function() {
        this.headerCt.dragging = true;
        this.callParent(arguments);
    },

    onDragDrop: function() {
        this.headerCt.dragging = false;
        this.callParent(arguments);
    },

    afterRepair: function() {
        this.callParent();
        this.headerCt.dragging = false;
    },

    getRepairXY: function() {
        return this.dragData.header.el.getXY();
    },
    
    disable: function() {
        this.disabled = true;
    },
    
    enable: function() {
        this.disabled = false;
    }
});

/**
 * @class Ext.view.AbstractView
 * This is an abstract superclass and should not be used directly. Please see {@link Ext.view.View}.
 * @private
 */
Ext.define('Ext.view.AbstractView', {
    extend: 'Ext.Component',
    requires: [
        'Ext.LoadMask',
        'Ext.data.StoreManager',
        'Ext.CompositeElementLite',
        'Ext.DomQuery',
        'Ext.selection.DataViewModel'
    ],
    mixins: {
        bindable: 'Ext.util.Bindable'
    },

    inheritableStatics: {
        getRecord: function(node) {
            return this.getBoundView(node).getRecord(node);
        },

        getBoundView: function(node) {
            return Ext.getCmp(node.boundView);
        }
    },

    /**
     * @cfg {String/String[]/Ext.XTemplate} tpl (required)
     * The HTML fragment or an array of fragments that will make up the template used by this DataView.  This should
     * be specified in the same format expected by the constructor of {@link Ext.XTemplate}.
     */
    /**
     * @cfg {Ext.data.Store} store (required)
     * The {@link Ext.data.Store} to bind this DataView to.
     */

    /**
     * @cfg {Boolean} deferInitialRefresh
     * <p>Defaults to <code>true</code> to defer the initial refresh of the view.</p>
     * <p>This allows the View to execute its render and initial layout more quickly because the process will not be encumbered
     * by the expensive update of the view structure.</p>
     * <p><b>Important: </b>Be aware that this will mean that the View's item elements will not be available immediately upon render, so
     * <i>selection</i> may not take place at render time. To access a View's item elements as soon as possible, use the {@link #viewready} event.
     * Or set <code>deferInitialrefresh</code> to false, but this will be at the cost of slower rendering.</p>
     */
    deferInitialRefresh: true,

    /**
     * @cfg {String} itemSelector (required)
     * <b>This is a required setting</b>. A simple CSS selector (e.g. <tt>div.some-class</tt> or
     * <tt>span:first-child</tt>) that will be used to determine what nodes this DataView will be
     * working with. The itemSelector is used to map DOM nodes to records. As such, there should
     * only be one root level element that matches the selector for each record.
     */

    /**
     * @cfg {String} itemCls
     * Specifies the class to be assigned to each element in the view when used in conjunction with the
     * {@link #itemTpl} configuration.
     */
    itemCls: Ext.baseCSSPrefix + 'dataview-item',

    /**
     * @cfg {String/String[]/Ext.XTemplate} itemTpl
     * The inner portion of the item template to be rendered. Follows an XTemplate
     * structure and will be placed inside of a tpl.
     */

    /**
     * @cfg {String} overItemCls
     * A CSS class to apply to each item in the view on mouseover.
     * Ensure {@link #trackOver} is set to `true` to make use of this.
     */

    /**
     * @cfg {String} loadingText
     * A string to display during data load operations.  If specified, this text will be
     * displayed in a loading div and the view's contents will be cleared while loading, otherwise the view's
     * contents will continue to display normally until the new data is loaded and the contents are replaced.
     */
    //<locale>
    loadingText: 'Loading...',
    //</locale>
    
    /**
     * @cfg {Boolean/Object} loadMask
     * False to disable a load mask from displaying will the view is loading. This can also be a
     * {@link Ext.LoadMask} configuration object.
     */
    loadMask: true,

    /**
     * @cfg {String} loadingCls
     * The CSS class to apply to the loading message element. Defaults to Ext.LoadMask.prototype.msgCls "x-mask-loading".
     */

    /**
     * @cfg {Boolean} loadingUseMsg
     * Whether or not to use the loading message.
     * @private
     */
    loadingUseMsg: true,


    /**
     * @cfg {Number} loadingHeight
     * If specified, gives an explicit height for the data view when it is showing the {@link #loadingText},
     * if that is specified. This is useful to prevent the view's height from collapsing to zero when the
     * loading mask is applied and there are no other contents in the data view.
     */

    /**
     * @cfg {String} [selectedItemCls='x-view-selected']
     * A CSS class to apply to each selected item in the view.
     */
    selectedItemCls: Ext.baseCSSPrefix + 'item-selected',

    /**
     * @cfg {String} emptyText
     * The text to display in the view when there is no data to display.
     * Note that when using local data the emptyText will not be displayed unless you set
     * the {@link #deferEmptyText} option to false.
     */
    //<locale>
    emptyText: "",
    //</locale>

    /**
     * @cfg {Boolean} deferEmptyText
     * True to defer emptyText being applied until the store's first load.
     */
    deferEmptyText: true,

    /**
     * @cfg {Boolean} trackOver
     * True to enable mouseenter and mouseleave events
     */
    trackOver: false,

    /**
     * @cfg {Boolean} blockRefresh
     * Set this to true to ignore refresh events on the bound store. This is useful if
     * you wish to provide custom transition animations via a plugin
     */
    blockRefresh: false,

    /**
     * @cfg {Boolean} disableSelection
     * True to disable selection within the DataView. This configuration will lock the selection model
     * that the DataView uses.
     */

    /**
     * @cfg {Boolean} preserveScrollOnRefresh=false
     * True to preserve scroll position across refresh operations.
     */
    preserveScrollOnRefresh: false,

    //private
    last: false,

    triggerEvent: 'itemclick',
    triggerCtEvent: 'containerclick',

    addCmpEvents: function() {

    },

    // private
    initComponent : function(){
        var me = this,
            isDef = Ext.isDefined,
            itemTpl = me.itemTpl,
            memberFn = {};

        if (itemTpl) {
            if (Ext.isArray(itemTpl)) {
                // string array
                itemTpl = itemTpl.join('');
            } else if (Ext.isObject(itemTpl)) {
                // tpl instance
                memberFn = Ext.apply(memberFn, itemTpl.initialConfig);
                itemTpl = itemTpl.html;
            }

            if (!me.itemSelector) {
                me.itemSelector = '.' + me.itemCls;
            }

            itemTpl = Ext.String.format('<tpl for="."><div class="{0}">{1}</div></tpl>', me.itemCls, itemTpl);
            me.tpl = new Ext.XTemplate(itemTpl, memberFn);
        }

        if (!isDef(me.tpl) || !isDef(me.itemSelector)) {
            Ext.Error.raise({
                sourceClass: 'Ext.view.View',
                tpl: me.tpl,
                itemSelector: me.itemSelector,
                msg: "DataView requires both tpl and itemSelector configurations to be defined."
            });
        }

        me.callParent();
        if(Ext.isString(me.tpl) || Ext.isArray(me.tpl)){
            me.tpl = new Ext.XTemplate(me.tpl);
        }

        // backwards compat alias for overClass/selectedClass
        // TODO: Consider support for overCls generation Ext.Component config
        if (isDef(me.overCls) || isDef(me.overClass)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.view.View: Using the deprecated overCls or overClass configuration. Use overItemCls instead.');
            }
            me.overItemCls = me.overCls || me.overClass;
            delete me.overCls;
            delete me.overClass;
        }

        if (me.overItemCls) {
            me.trackOver = true;
        }

        if (isDef(me.selectedCls) || isDef(me.selectedClass)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.view.View: Using the deprecated selectedCls or selectedClass configuration. Use selectedItemCls instead.');
            }
            me.selectedItemCls = me.selectedCls || me.selectedClass;
            delete me.selectedCls;
            delete me.selectedClass;
        }

        me.addEvents(
            /**
             * @event beforerefresh
             * Fires before the view is refreshed
             * @param {Ext.view.View} this The DataView object
             */
            'beforerefresh',
            /**
             * @event refresh
             * Fires when the view is refreshed
             * @param {Ext.view.View} this The DataView object
             */
            'refresh',
            /**
             * @event viewready
             * Fires when the View's item elements representing Store items has been rendered. If the {@link #deferInitialRefresh} flag
             * was set (and it is <code>true</code> by default), this will be <b>after</b> initial render, and no items will be available
             * for selection until this event fires.
             * @param {Ext.view.View} this
             */
            'viewready',
            /**
             * @event itemupdate
             * Fires when the node associated with an individual record is updated
             * @param {Ext.data.Model} record The model instance
             * @param {Number} index The index of the record/node
             * @param {HTMLElement} node The node that has just been updated
             */
            'itemupdate',
            /**
             * @event itemadd
             * Fires when the nodes associated with an recordset have been added to the underlying store
             * @param {Ext.data.Model[]} records The model instance
             * @param {Number} index The index at which the set of record/nodes starts
             * @param {HTMLElement[]} node The node that has just been updated
             */
            'itemadd',
            /**
             * @event itemremove
             * Fires when the node associated with an individual record is removed
             * @param {Ext.data.Model} record The model instance
             * @param {Number} index The index of the record/node
             */
            'itemremove'
        );

        me.addCmpEvents();

        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
        me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');
        me.bindStore(me.store, true);
        me.all = new Ext.CompositeElementLite();

        // We track the scroll position
        me.scrollState = {
            top: 0,
            left: 0
        };
        me.on({
            scroll: me.onViewScroll,
            element: 'el',
            scope: me
        });
    },

    onRender: function() {
        var me = this,
            mask = me.loadMask,
            cfg = {
                msg: me.loadingText,
                msgCls: me.loadingCls,
                useMsg: me.loadingUseMsg
            };

        me.callParent(arguments);

        if (mask) {
            // either a config object 
            if (Ext.isObject(mask)) {
                cfg = Ext.apply(cfg, mask);
            }
            // Attach the LoadMask to a *Component* so that it can be sensitive to resizing during long loads.
            // If this DataView is floating, then mask this DataView.
            // Otherwise, mask its owning Container (or this, if there *is* no owning Container).
            // LoadMask captures the element upon render.
            me.loadMask = new Ext.LoadMask(me, cfg);
            me.loadMask.on({
                scope: me,
                beforeshow: me.onMaskBeforeShow,
                hide: me.onMaskHide
            });
        }
    },
    
    onBoxReady: function(){
        var me = this,
            store = me.store;

        me.callParent(arguments);
        me.doFirstRefresh(me.store);
    },
    
    onMaskBeforeShow: function(){
        var me = this,
            loadingHeight = me.loadingHeight;

        me.getSelectionModel().deselectAll();
        me.all.clear();
        if (loadingHeight && loadingHeight > me.getHeight()) {
            me.hasLoadingHeight = true;
            me.oldMinHeight = me.minHeight;
            me.minHeight = loadingHeight;
            me.updateLayout();
        }
    },
    
    onMaskHide: function(){
        var me = this;
        
        if (!me.destroying && me.hasLoadingHeight) {
            me.minHeight = me.oldMinHeight;
            me.updateLayout();
            delete me.hasLoadingHeight;
        }
    },

    afterRender: function() {
        this.callParent(arguments);

        // Init the SelectionModel after any on('render') listeners have been added.
        // Drag plugins create a DragDrop instance in a render listener, and that needs
        // to see an itemmousedown event first.
        this.getSelectionModel().bindComponent(this);
    },

    /**
     * Gets the selection model for this view.
     * @return {Ext.selection.Model} The selection model
     */
    getSelectionModel: function(){
        var me = this,
            mode = 'SINGLE';

        if (!me.selModel) {
            me.selModel = {};
        }

        if (me.simpleSelect) {
            mode = 'SIMPLE';
        } else if (me.multiSelect) {
            mode = 'MULTI';
        }

        Ext.applyIf(me.selModel, {
            allowDeselect: me.allowDeselect,
            mode: mode
        });

        if (!me.selModel.events) {
            me.selModel = new Ext.selection.DataViewModel(me.selModel);
        }

        if (!me.selModel.hasRelaySetup) {
            me.relayEvents(me.selModel, [
                'selectionchange', 'beforeselect', 'beforedeselect', 'select', 'deselect', 'focuschange'
            ]);
            me.selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (me.disableSelection) {
            me.selModel.locked = true;
        }

        return me.selModel;
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
    refresh: function() {
        var me = this,
            targetEl,
            targetParent,
            oldDisplay,
            nextSibling,
            dom,
            records;

        if (!me.rendered || me.isDestroyed) {
            return;
        }

        if (!me.hasListeners.beforerefresh || me.fireEvent('beforerefresh', me) !== false) {
            targetEl = me.getTargetEl();
            records = me.store.getRange();
            dom = targetEl.dom;

            // Updating is much quicker if done when the targetEl is detached from the document, and not displayed.
            // But this resets the scroll position, so when preserving scroll position, this cannot be done.
            if (!me.preserveScrollOnRefresh) {
                targetParent = dom.parentNode;
                oldDisplay = dom.style.display;
                dom.style.display = 'none';
                nextSibling = dom.nextSibling;
                targetParent.removeChild(dom);
            }

            if (me.refreshCounter) {
                me.clearViewEl();
            } else {
                me.fixedNodes = targetEl.dom.childNodes.length;
                me.refreshCounter = 1;
            }

            // Always attempt to create the required markup after the fixedNodes.
            // Usually, for an empty record set, this would be blank, but when the Template
            // Creates markup outside of the record loop, this must still be honoured even if there are no
            // records.
            me.tpl.append(targetEl, me.collectData(records, 0));

            // The emptyText is now appended to the View's element
            // after any fixedNodes.
            if (records.length < 1) {
                if (!me.deferEmptyText || me.hasSkippedEmptyText) {
                    Ext.core.DomHelper.insertHtml('beforeEnd', targetEl.dom, me.emptyText);
                }
                me.all.clear();
            } else {
                me.all.fill(Ext.query(me.getItemSelector(), targetEl.dom));
                me.updateIndexes(0);
            }

            me.selModel.refresh();
            me.hasSkippedEmptyText = true;

            if (!me.preserveScrollOnRefresh) {
                targetParent.insertBefore(dom, nextSibling);
                dom.style.display = oldDisplay;
            }

            // Ensure layout system knows about new content size
            this.refreshSize();

            me.fireEvent('refresh', me);

            // Upon first refresh, fire the viewready event.
            // Reconfiguring the grid "renews" this event.
            if (!me.viewReady) {
                // Fire an event when deferred content becomes available.
                // This supports grid Panel's deferRowRender capability
                me.viewReady = true;
                me.fireEvent('viewready', me);
            }
        }
    },

    /**
     * @private
     * Called by the framework when the view is refreshed, or when rows are added or deleted.
     * 
     * These operations may cause the view's dimensions to change, and if the owning container
     * is shrinkwrapping this view, then the layout must be updated to accommodate these new dimensions.
     */
    refreshSize: function() {
        var sizeModel = this.getSizeModel();
        if (sizeModel.height.shrinkWrap || sizeModel.width.shrinkWrap) {
            this.updateLayout();
        }
    },

    clearViewEl: function(){
        // The purpose of this is to allow boilerplate HTML nodes to remain in place inside a View
        // while the transient, templated data can be discarded and recreated.
        // The first time through this code, we take a count of the number of existing child nodes.
        // Subsequent refreshes then do not clear the entire element, but remove all nodes
        // *after* the fixedNodes count.
        // In particular, this is used in infinite grid scrolling: A very tall "stretcher" element is
        // inserted into the View's element to create a scrollbar of the correct proportion.
        
        var me = this,
            el = me.getTargetEl();
            
        if (me.fixedNodes) {
            while (el.dom.childNodes[me.fixedNodes]) {
                el.dom.removeChild(el.dom.childNodes[me.fixedNodes]);
            }
        } else {
            el.update('');
        }
        me.refreshCounter++;
    },

    // Private template method to be overridden in subclasses.
    onViewScroll: Ext.emptyFn,

    /**
     * Saves the scrollState in a private variable. Must be used in conjunction with restoreScrollState.
     * @private
     */
    saveScrollState: function() {
        if (this.rendered) {
            var dom = this.el.dom,
                state = this.scrollState;
            
            state.left = dom.scrollLeft;
            state.top = dom.scrollTop;
        }
    },

    /**
     * Restores the scrollState.
     * Must be used in conjunction with saveScrollState
     * @private
     */
    restoreScrollState: function() {
        if (this.rendered) {
            var dom = this.el.dom, 
                state = this.scrollState;
            
            dom.scrollLeft = state.left;
            dom.scrollTop = state.top;
        }
    },

    /**
     * Function which can be overridden to provide custom formatting for each Record that is used by this
     * DataView's {@link #tpl template} to render each node.
     * @param {Object/Object[]} data The raw data object that was used to create the Record.
     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
     * @param {Ext.data.Model} record The Record being prepared for rendering.
     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
     */
    prepareData: function(data, index, record) {
        var associatedData, attr;
        if (record) {
            associatedData = record.getAssociatedData();
            for (attr in associatedData) {
                if (associatedData.hasOwnProperty(attr)) {
                    data[attr] = associatedData[attr];
                }
            }
        }
        return data;
    },

    /**
     * <p>Function which can be overridden which returns the data object passed to this
     * DataView's {@link #tpl template} to render the whole DataView.</p>
     * <p>This is usually an Array of data objects, each element of which is processed by an
     * {@link Ext.XTemplate XTemplate} which uses <tt>'&lt;tpl for="."&gt;'</tt> to iterate over its supplied
     * data object as an Array. However, <i>named</i> properties may be placed into the data object to
     * provide non-repeating data such as headings, totals etc.</p>
     * @param {Ext.data.Model[]} records An Array of {@link Ext.data.Model}s to be rendered into the DataView.
     * @param {Number} startIndex the index number of the Record being prepared for rendering.
     * @return {Object[]} An Array of data objects to be processed by a repeating XTemplate. May also
     * contain <i>named</i> properties.
     */
    collectData : function(records, startIndex){
        var data = [],
            i = 0,
            len = records.length,
            record;

        for (; i < len; i++) {
            record = records[i];
            data[i] = this.prepareData(record.data, startIndex + i, record);
        }
        return data;
    },

    // private
    bufferRender : function(records, index){
        var me = this,
            div = me.renderBuffer || (me.renderBuffer = document.createElement('div'));

        me.tpl.overwrite(div, me.collectData(records, index));
        return Ext.query(me.getItemSelector(), div);
    },

    // private
    onUpdate : function(ds, record){
        var me = this,
            index,
            node;

        if (me.rendered) {
            index = me.store.indexOf(record);
            if (index > -1) {
                node = me.bufferRender([record], index)[0];
                // ensure the node actually exists in the DOM
                if (me.getNode(record)) {
                    me.all.replaceElement(index, node, true);
                    me.updateIndexes(index, index);
                    // Maintain selection after update
                    // TODO: Move to approriate event handler.
                    me.selModel.refresh();
                    if (me.hasListeners.itemupdate) {
                        me.fireEvent('itemupdate', record, index, node);
                    }
                    return node;
                }
            }
        }

    },

    // private
    onAdd : function(ds, records, index) {
        var me = this,
            nodes;

        if (me.rendered) {
            // If we are adding into an empty view, we must refresh in order that the *full tpl* is applied
            // which might create boilerplate content *around* the record nodes.
            if (me.all.getCount() === 0) {
                me.refresh();
                return;
            }

            nodes = me.bufferRender(records, index);
            me.doAdd(nodes, records, index);

            me.selModel.refresh();
            me.updateIndexes(index);

            // Ensure layout system knows about new content size
            this.refreshSize();

            if (me.hasListeners.itemadd) {
                me.fireEvent('itemadd', records, index, nodes);
            }
        }
        
    },

    doAdd: function(nodes, records, index) {
        var all = this.all,
            count = all.getCount();

        if (count === 0) {
            this.clearViewEl();
            this.getTargetEl().appendChild(nodes);
        } else if (index < count) {
            if (index === 0) {
                all.item(index).insertSibling(nodes, 'before', true);
            } else {
                all.item(index - 1).insertSibling(nodes, 'after', true);
            }
        } else {
            all.last().insertSibling(nodes, 'after', true);
        }

        Ext.Array.insert(all.elements, index, nodes);
    },

    // private
    onRemove : function(ds, record, index) {
        var me = this;

        if (me.rendered) {
            if (me.store.getCount() === 0) {
                // Refresh so emptyText can be applied if necessary
                me.refresh();
            } else {
                // Just remove the element which corresponds to the removed record
                // The tpl's full HTML will still be in place.
                me.doRemove(record, index);
                me.updateIndexes(index);
            }

            // Ensure layout system knows about new content height
            this.refreshSize();

            if (me.hasListeners.itemremove) {
                me.fireEvent('itemremove', record, index);
            }
        }
    },

    doRemove: function(record, index) {
        this.all.removeElement(index, true);
    },

    /**
     * Refreshes an individual node's data from the store.
     * @param {Number} index The item's data index in the store
     */
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    // private
    updateIndexes : function(startIndex, endIndex) {
        var ns = this.all.elements,
            records = this.store.getRange(),
            i;
            
        startIndex = startIndex || 0;
        endIndex = endIndex || ((endIndex === 0) ? 0 : (ns.length - 1));
        for(i = startIndex; i <= endIndex; i++){
            ns[i].viewIndex = i;
            ns[i].viewRecordId = records[i].internalId;
            if (!ns[i].boundView) {
                ns[i].boundView = this.id;
            }
        }
    },

    /**
     * Returns the store associated with this DataView.
     * @return {Ext.data.Store} The store
     */
    getStore : function(){
        return this.store;
    },

    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     */
    bindStore : function(store, initial) {
        var me = this;
        me.mixins.bindable.bindStore.apply(me, arguments);
        // Bind the store to our selection model
        me.getSelectionModel().bindStore(me.store);

        // If we have already achieved our first layout, refresh immediately.
        // If we have bound to the Store before the first layout, then onBoxReady will
        // call doFirstRefresh1
        if (me.componentLayoutCounter) {
            me.doFirstRefresh(store);
        }
    },

    /**
     * @private
     * Perform the first refresh of the View from a newly bound store.
     * 
     * This is called when this View has been sized for the first time.
     */
    doFirstRefresh: function(store) {
        var me = this;

        // 4.1.0: If we have a store, and the Store is *NOT* already loading (a refresh is on the way), then
        // on first layout, refresh regardless of record count.
        // Template may contain boilerplate HTML outside of record iteration loop.
        // Also, emptyText is appended by the refresh method.
        // We call refresh on a defer if this is the initial call, and we are configured to defer the initial refresh.
        if (store && !store.loading) {
            if (me.deferInitialRefresh) {
                Ext.Function.defer(function () {
                    if (!me.isDestroyed) {
                        me.refresh();
                    }
                }, 1);
            } else {
                me.refresh();
            }
        }
    },
    
    onUnbindStore: function(store) {
        this.setMaskBind(null);
    },
    
    onBindStore: function(store) {
        this.setMaskBind(store);
    },
    
    setMaskBind: function(store) {
        var mask = this.loadMask;
        if (mask && mask.bindStore) {
            mask.bindStore(store);
        }
    },
    
    getStoreListeners: function() {
        var me = this;
        return {
            refresh: me.onDataRefresh,
            add: me.onAdd,
            remove: me.onRemove,
            update: me.onUpdate,
            clear: me.refresh    
        };
    },

    /**
     * @private
     * Calls this.refresh if this.blockRefresh is not true
     */
    onDataRefresh: function() {
        if (this.blockRefresh !== true) {
            this.refresh.apply(this, arguments);
        }
    },

    /**
     * Returns the template node the passed child belongs to, or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemByChild: function(node){
        return Ext.fly(node).findParent(this.getItemSelector(), this.getTargetEl());
    },

    /**
     * Returns the template node by the Ext.EventObject or null if it is not found.
     * @param {Ext.EventObject} e
     */
    findTargetByEvent: function(e) {
        return e.getTarget(this.getItemSelector(), this.getTargetEl());
    },


    /**
     * Gets the currently selected nodes.
     * @return {HTMLElement[]} An array of HTMLElements
     */
    getSelectedNodes: function(){
        var nodes   = [],
            records = this.selModel.getSelection(),
            ln = records.length,
            i  = 0;

        for (; i < ln; i++) {
            nodes.push(this.getNode(records[i]));
        }

        return nodes;
    },

    /**
     * Gets an array of the records from an array of nodes
     * @param {HTMLElement[]} nodes The nodes to evaluate
     * @return {Ext.data.Model[]} records The {@link Ext.data.Model} objects
     */
    getRecords: function(nodes) {
        var records = [],
            i = 0,
            len = nodes.length,
            data = this.store.data;

        for (; i < len; i++) {
            records[records.length] = data.getByKey(nodes[i].viewRecordId);
        }

        return records;
    },

    /**
     * Gets a record from a node
     * @param {Ext.Element/HTMLElement} node The node to evaluate
     *
     * @return {Ext.data.Model} record The {@link Ext.data.Model} object
     */
    getRecord: function(node){
        return this.store.data.getByKey(Ext.getDom(node).viewRecordId);
    },


    /**
     * Returns true if the passed node is selected, else false.
     * @param {HTMLElement/Number/Ext.data.Model} node The node, node index or record to check
     * @return {Boolean} True if selected, else false
     */
    isSelected : function(node) {
        // TODO: El/Idx/Record
        var r = this.getRecord(node);
        return this.selModel.isSelected(r);
    },

    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to false to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        this.selModel.select(records, keepExisting, suppressEvent);
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} suppressEvent Set to false to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.selModel.deselect(records, suppressEvent);
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo An HTMLElement template node, index of a template node,
     * the id of a template node or the record associated with the node.
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getNode : function(nodeInfo) {
        if ((!nodeInfo && nodeInfo !== 0) || !this.rendered) {
            return null;
        }
        
        if (Ext.isString(nodeInfo)) {
            return document.getElementById(nodeInfo);
        }
        if (Ext.isNumber(nodeInfo)) {
            return this.all.elements[nodeInfo];
        }
        if (nodeInfo.isModel) {
            return this.getNodeByRecord(nodeInfo);
        }
        return nodeInfo; // already an HTMLElement
    },

    /**
     * @private
     */
    getNodeByRecord: function(record) {
        var ns = this.all.elements,
            ln = ns.length,
            i = 0;

        for (; i < ln; i++) {
            if (ns[i].viewRecordId === record.internalId) {
                return ns[i];
            }
        }

        return null;
    },

    /**
     * Gets a range nodes.
     * @param {Number} start (optional) The index of the first node in the range
     * @param {Number} end (optional) The index of the last node in the range
     * @return {HTMLElement[]} An array of nodes
     */
    getNodes: function(start, end) {
        var ns = this.all.elements,
            nodes = [],
            i;

        start = start || 0;
        end = !Ext.isDefined(end) ? Math.max(ns.length - 1, 0) : end;
        if (start <= end) {
            for (i = start; i <= end && ns[i]; i++) {
                nodes.push(ns[i]);
            }
        } else {
            for (i = start; i >= end && ns[i]; i--) {
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    /**
     * Finds the index of the passed node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo An HTMLElement template node, index of a template node, the id of a template node
     * or a record associated with a node.
     * @return {Number} The index of the node or -1
     */
    indexOf: function(node) {
        node = this.getNode(node);
        if (Ext.isNumber(node.viewIndex)) {
            return node.viewIndex;
        }
        return this.all.indexOf(node);
    },

    onDestroy : function() {
        var me = this;

        me.all.clear();
        me.callParent();
        me.bindStore(null);
        me.selModel.destroy();
    },

    // invoked by the selection model to maintain visual UI cues
    onItemSelect: function(record) {
        var node = this.getNode(record);
        
        if (node) {
            Ext.fly(node).addCls(this.selectedItemCls);
        }
    },

    // invoked by the selection model to maintain visual UI cues
    onItemDeselect: function(record) {
        var node = this.getNode(record);
        
        if (node) {
            Ext.fly(node).removeCls(this.selectedItemCls);
        }
    },

    getItemSelector: function() {
        return this.itemSelector;
    }
}, function() {
    // all of this information is available directly
    // from the SelectionModel itself, the only added methods
    // to DataView regarding selection will perform some transformation/lookup
    // between HTMLElement/Nodes to records and vice versa.
    Ext.deprecate('extjs', '4.0', function() {
        Ext.view.AbstractView.override({
            /**
             * @cfg {Boolean} [multiSelect=false]
             * True to allow selection of more than one item at a time, false to allow selection of only a single item
             * at a time or no selection at all, depending on the value of {@link #singleSelect}.
             */
            /**
             * @cfg {Boolean} [singleSelect=false]
             * True to allow selection of exactly one item at a time, false to allow no selection at all.
             * Note that if {@link #multiSelect} = true, this value will be ignored.
             */
            /**
             * @cfg {Boolean} [simpleSelect=false]
             * True to enable multiselection by clicking on multiple items without requiring the user to hold Shift or Ctrl,
             * false to force the user to hold Ctrl or Shift to select more than on item.
             */

            /**
             * Gets the number of selected nodes.
             * @return {Number} The node count
             */
            getSelectionCount : function(){
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: getSelectionCount will be removed, please interact with the Ext.selection.DataViewModel");
                }
                return this.selModel.getSelection().length;
            },

            /**
             * Gets an array of the selected records
             * @return {Ext.data.Model[]} An array of {@link Ext.data.Model} objects
             */
            getSelectedRecords : function(){
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: getSelectedRecords will be removed, please interact with the Ext.selection.DataViewModel");
                }
                return this.selModel.getSelection();
            },

            select: function(records, keepExisting, supressEvents) {
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()");
                }
                var sm = this.getSelectionModel();
                return sm.select.apply(sm, arguments);
            },

            clearSelections: function() {
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()");
                }
                var sm = this.getSelectionModel();
                return sm.deselectAll();
            }
        });
    });
});

/**
 * A mechanism for displaying data using custom layout templates and formatting.
 *
 * The View uses an {@link Ext.XTemplate} as its internal templating mechanism, and is bound to an
 * {@link Ext.data.Store} so that as the data in the store changes the view is automatically updated
 * to reflect the changes. The view also provides built-in behavior for many common events that can
 * occur for its contained items including click, doubleclick, mouseover, mouseout, etc. as well as a
 * built-in selection model. **In order to use these features, an {@link #itemSelector} config must
 * be provided for the DataView to determine what nodes it will be working with.**
 *
 * The example below binds a View to a {@link Ext.data.Store} and renders it into an {@link Ext.panel.Panel}.
 *
 *     @example
 *     Ext.define('Image', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             { name:'src', type:'string' },
 *             { name:'caption', type:'string' }
 *         ]
 *     });
 *
 *     Ext.create('Ext.data.Store', {
 *         id:'imagesStore',
 *         model: 'Image',
 *         data: [
 *             { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
 *             { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
 *             { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
 *             { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' }
 *         ]
 *     });
 *
 *     var imageTpl = new Ext.XTemplate(
 *         '<tpl for=".">',
 *             '<div style="margin-bottom: 10px;" class="thumb-wrap">',
 *               '<img src="{src}" />',
 *               '<br/><span>{caption}</span>',
 *             '</div>',
 *         '</tpl>'
 *     );
 *
 *     Ext.create('Ext.view.View', {
 *         store: Ext.data.StoreManager.lookup('imagesStore'),
 *         tpl: imageTpl,
 *         itemSelector: 'div.thumb-wrap',
 *         emptyText: 'No images available',
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.view.View', {
    extend: 'Ext.view.AbstractView',
    alternateClassName: 'Ext.DataView',
    alias: 'widget.dataview',

    inheritableStatics: {
        EventMap: {
            mousedown: 'MouseDown',
            mouseup: 'MouseUp',
            click: 'Click',
            dblclick: 'DblClick',
            contextmenu: 'ContextMenu',
            mouseover: 'MouseOver',
            mouseout: 'MouseOut',
            mouseenter: 'MouseEnter',
            mouseleave: 'MouseLeave',
            keydown: 'KeyDown',
            focus: 'Focus'
        }
    },

    addCmpEvents: function() {
        this.addEvents(
            /**
             * @event beforeitemmousedown
             * Fires before the mousedown event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemmousedown',
            /**
             * @event beforeitemmouseup
             * Fires before the mouseup event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemmouseup',
            /**
             * @event beforeitemmouseenter
             * Fires before the mouseenter event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemmouseenter',
            /**
             * @event beforeitemmouseleave
             * Fires before the mouseleave event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemmouseleave',
            /**
             * @event beforeitemclick
             * Fires before the click event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemclick',
            /**
             * @event beforeitemdblclick
             * Fires before the dblclick event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemdblclick',
            /**
             * @event beforeitemcontextmenu
             * Fires before the contextmenu event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'beforeitemcontextmenu',
            /**
             * @event beforeitemkeydown
             * Fires before the keydown event on an item is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object. Use {@link Ext.EventObject#getKey getKey()} to retrieve the key that was pressed.
             */
            'beforeitemkeydown',
            /**
             * @event itemmousedown
             * Fires when there is a mouse down on an item
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemmousedown',
            /**
             * @event itemmouseup
             * Fires when there is a mouse up on an item
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemmouseup',
            /**
             * @event itemmouseenter
             * Fires when the mouse enters an item.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemmouseenter',
            /**
             * @event itemmouseleave
             * Fires when the mouse leaves an item.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemmouseleave',
            /**
             * @event itemclick
             * Fires when an item is clicked.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemclick',
            /**
             * @event itemdblclick
             * Fires when an item is double clicked.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemdblclick',
            /**
             * @event itemcontextmenu
             * Fires when an item is right clicked.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object
             */
            'itemcontextmenu',
            /**
             * @event itemkeydown
             * Fires when a key is pressed while an item is currently selected.
             * @param {Ext.view.View} this
             * @param {Ext.data.Model} record The record that belongs to the item
             * @param {HTMLElement} item The item's element
             * @param {Number} index The item's index
             * @param {Ext.EventObject} e The raw event object. Use {@link Ext.EventObject#getKey getKey()} to retrieve the key that was pressed.
             */
            'itemkeydown',
            /**
             * @event beforecontainermousedown
             * Fires before the mousedown event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainermousedown',
            /**
             * @event beforecontainermouseup
             * Fires before the mouseup event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainermouseup',
            /**
             * @event beforecontainermouseover
             * Fires before the mouseover event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainermouseover',
            /**
             * @event beforecontainermouseout
             * Fires before the mouseout event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainermouseout',
            /**
             * @event beforecontainerclick
             * Fires before the click event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainerclick',
            /**
             * @event beforecontainerdblclick
             * Fires before the dblclick event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainerdblclick',
            /**
             * @event beforecontainercontextmenu
             * Fires before the contextmenu event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'beforecontainercontextmenu',
            /**
             * @event beforecontainerkeydown
             * Fires before the keydown event on the container is processed. Returns false to cancel the default action.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object. Use {@link Ext.EventObject#getKey getKey()} to retrieve the key that was pressed.
             */
            'beforecontainerkeydown',
            /**
             * @event containermouseup
             * Fires when there is a mouse up on the container
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'containermouseup',
            /**
             * @event containermouseover
             * Fires when you move the mouse over the container.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'containermouseover',
            /**
             * @event containermouseout
             * Fires when you move the mouse out of the container.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'containermouseout',
            /**
             * @event containerclick
             * Fires when the container is clicked.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'containerclick',
            /**
             * @event containerdblclick
             * Fires when the container is double clicked.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'containerdblclick',
            /**
             * @event containercontextmenu
             * Fires when the container is right clicked.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object
             */
            'containercontextmenu',
            /**
             * @event containerkeydown
             * Fires when a key is pressed while the container is focused, and no item is currently selected.
             * @param {Ext.view.View} this
             * @param {Ext.EventObject} e The raw event object. Use {@link Ext.EventObject#getKey getKey()} to retrieve the key that was pressed.
             */
            'containerkeydown',

            /**
             * @event selectionchange
             * Fires when the selected nodes change. Relayed event from the underlying selection model.
             * @param {Ext.view.View} this
             * @param {HTMLElement[]} selections Array of the selected nodes
             */
            'selectionchange',
            /**
             * @event beforeselect
             * Fires before a selection is made. If any handlers return false, the selection is cancelled.
             * @param {Ext.view.View} this
             * @param {HTMLElement} node The node to be selected
             * @param {HTMLElement[]} selections Array of currently selected nodes
             */
            'beforeselect',
            
            /**
             * @event highlightitem
             * Fires when a node is highlighted using keyboard navigation, or mouseover.
             * @param {Ext.view.View} view This View Component.
             * @param {Ext.Element} node The highlighted node.
             */
            'highlightitem',
            
            /**
             * @event unhighlightitem
             * Fires when a node is unhighlighted using keyboard navigation, or mouseout.
             * @param {Ext.view.View} view This View Component.
             * @param {Ext.Element} node The previously highlighted node.
             */
            'unhighlightitem'
        );
    },

    getFocusEl: function() {
        return this.getTargetEl();
    },

    // private
    afterRender: function(){
        var me = this;
        me.callParent();
        me.mon(me.getTargetEl(), {
            scope: me,
            /*
             * We need to make copies of this since some of the events fired here will end up triggering
             * a new event to be called and the shared event object will be mutated. In future we should
             * investigate if there are any issues with creating a new event object for each event that
             * is fired.
             */
            freezeEvent: true,
            click: me.handleEvent,
            mousedown: me.handleEvent,
            mouseup: me.handleEvent,
            dblclick: me.handleEvent,
            contextmenu: me.handleEvent,
            mouseover: me.handleEvent,
            mouseout: me.handleEvent,
            keydown: me.handleEvent
        });
    },

    handleEvent: function(e) {
        var key = e.type == 'keydown' && e.getKey();

        if (this.processUIEvent(e) !== false) {
            this.processSpecialEvent(e);
        }

        // After all listeners have processed the event, prevent browser's default action
        // on SPACE which is to focus the event's target element.
        // Focusing causes the browser to attempt to scroll the element into view.
        if (key === e.SPACE) {
            e.stopEvent();
        }
    },

    // Private template method
    processItemEvent: Ext.emptyFn,
    processContainerEvent: Ext.emptyFn,
    processSpecialEvent: Ext.emptyFn,

    /*
     * Returns true if this mouseover/out event is still over the overItem.
     */
    stillOverItem: function (event, overItem) {
        var nowOver;

        // There is this weird bug when you hover over the border of a cell it is saying
        // the target is the table.
        // BrowserBug: IE6 & 7. If me.mouseOverItem has been removed and is no longer
        // in the DOM then accessing .offsetParent will throw an "Unspecified error." exception.
        // typeof'ng and checking to make sure the offsetParent is an object will NOT throw
        // this hard exception.
        if (overItem && typeof(overItem.offsetParent) === "object") {
            // mouseout : relatedTarget == nowOver, target == wasOver
            // mouseover: relatedTarget == wasOver, target == nowOver
            nowOver = (event.type == 'mouseout') ? event.getRelatedTarget() : event.getTarget();
            return Ext.fly(overItem).contains(nowOver);
        }

        return false;
    },

    processUIEvent: function(e) {
        var me = this,
            item = e.getTarget(me.getItemSelector(), me.getTargetEl()),
            map = this.statics().EventMap,
            index, record,
            type = e.type,
            overItem = me.mouseOverItem,
            newType;

        if (!item) {
            if (type == 'mouseover' && me.stillOverItem(e, overItem)) {
                item = overItem;
            }

            // Try to get the selected item to handle the keydown event, otherwise we'll just fire a container keydown event
            if (type == 'keydown') {
                record = me.getSelectionModel().getLastSelected();
                if (record) {
                    item = me.getNode(record);
                }
            }
        }

        if (item) {
            index = me.indexOf(item);
            if (!record) {
                record = me.getRecord(item);
            }

            // It is possible for an event to arrive for which there is no record... this
            // can happen with dblclick where the clicks are on removal actions (think a
            // grid w/"delete row" action column)
            if (!record || me.processItemEvent(record, item, index, e) === false) {
                return false;
            }

            newType = me.isNewItemEvent(item, e);
            if (newType === false) {
                return false;
            }

            if (
                (me['onBeforeItem' + map[newType]](record, item, index, e) === false) ||
                (me.fireEvent('beforeitem' + newType, me, record, item, index, e) === false) ||
                (me['onItem' + map[newType]](record, item, index, e) === false)
            ) {
                return false;
            }

            me.fireEvent('item' + newType, me, record, item, index, e);
        }
        else {
            if (
                (me.processContainerEvent(e) === false) ||
                (me['onBeforeContainer' + map[type]](e) === false) ||
                (me.fireEvent('beforecontainer' + type, me, e) === false) ||
                (me['onContainer' + map[type]](e) === false)
            ) {
                return false;
            }

            me.fireEvent('container' + type, me, e);
        }

        return true;
    },

    isNewItemEvent: function (item, e) {
        var me = this,
            overItem = me.mouseOverItem,
            type = e.type;

        switch (type) {
            case 'mouseover':
                if (item === overItem) {
                    return false;
                }
                me.mouseOverItem = item;
                return 'mouseenter';

            case 'mouseout':
                // If the currently mouseovered item contains the mouseover target, it's *NOT* a mouseleave
                if (me.stillOverItem(e, overItem)) {
                    return false;
                }
                me.mouseOverItem = null;
                return 'mouseleave';
        }
        return type;
    },

    // private
    onItemMouseEnter: function(record, item, index, e) {
        if (this.trackOver) {
            this.highlightItem(item);
        }
    },

    // private
    onItemMouseLeave : function(record, item, index, e) {
        if (this.trackOver) {
            this.clearHighlight();
        }
    },

    // @private, template methods
    onItemMouseDown: Ext.emptyFn,
    onItemMouseUp: Ext.emptyFn,
    onItemFocus: Ext.emptyFn,
    onItemClick: Ext.emptyFn,
    onItemDblClick: Ext.emptyFn,
    onItemContextMenu: Ext.emptyFn,
    onItemKeyDown: Ext.emptyFn,
    onBeforeItemMouseDown: Ext.emptyFn,
    onBeforeItemMouseUp: Ext.emptyFn,
    onBeforeItemFocus: Ext.emptyFn,
    onBeforeItemMouseEnter: Ext.emptyFn,
    onBeforeItemMouseLeave: Ext.emptyFn,
    onBeforeItemClick: Ext.emptyFn,
    onBeforeItemDblClick: Ext.emptyFn,
    onBeforeItemContextMenu: Ext.emptyFn,
    onBeforeItemKeyDown: Ext.emptyFn,

    // @private, template methods
    onContainerMouseDown: Ext.emptyFn,
    onContainerMouseUp: Ext.emptyFn,
    onContainerMouseOver: Ext.emptyFn,
    onContainerMouseOut: Ext.emptyFn,
    onContainerClick: Ext.emptyFn,
    onContainerDblClick: Ext.emptyFn,
    onContainerContextMenu: Ext.emptyFn,
    onContainerKeyDown: Ext.emptyFn,
    onBeforeContainerMouseDown: Ext.emptyFn,
    onBeforeContainerMouseUp: Ext.emptyFn,
    onBeforeContainerMouseOver: Ext.emptyFn,
    onBeforeContainerMouseOut: Ext.emptyFn,
    onBeforeContainerClick: Ext.emptyFn,
    onBeforeContainerDblClick: Ext.emptyFn,
    onBeforeContainerContextMenu: Ext.emptyFn,
    onBeforeContainerKeyDown: Ext.emptyFn,

    /**
     * Highlights a given item in the DataView. This is called by the mouseover handler if {@link #overItemCls}
     * and {@link #trackOver} are configured, but can also be called manually by other code, for instance to
     * handle stepping through the list via keyboard navigation.
     * @param {HTMLElement} item The item to highlight
     */
    highlightItem: function(item) {
        var me = this;
        me.clearHighlight();
        me.highlightedItem = item;
        Ext.fly(item).addCls(me.overItemCls);
        me.fireEvent('highlightitem', me, item);
    },

    /**
     * Un-highlights the currently highlighted item, if any.
     */
    clearHighlight: function() {
        var me = this,
            highlighted = me.highlightedItem;

        if (highlighted) {
            Ext.fly(highlighted).removeCls(me.overItemCls);
            me.fireEvent('unhighlightitem', me, highlighted);
            delete me.highlightedItem;
        }
    },
    
    onUpdate: function(store, record){
        var me = this,
            node,
            newNode,
            highlighted;
        
        if (me.rendered) {
            node = me.getNode(record);
            newNode = me.callParent(arguments);
            highlighted = me.highlightedItem;
            
            if (highlighted && highlighted === node) {
                delete me.highlightedItem;
                if (newNode) {
                    me.highlightItem(newNode);
                }
            }
        }
    },

    refresh: function() {
        this.clearHighlight();
        this.callParent(arguments);
    }
});
/**
 * This class encapsulates the user interface for a tabular data set.
 * It acts as a centralized manager for controlling the various interface
 * elements of the view. This includes handling events, such as row and cell
 * level based DOM events. It also reacts to events from the underlying {@link Ext.selection.Model}
 * to provide visual feedback to the user.
 *
 * This class does not provide ways to manipulate the underlying data of the configured
 * {@link Ext.data.Store}.
 *
 * This is the base class for both {@link Ext.grid.View} and {@link Ext.tree.View} and is not
 * to be used directly.
 */
Ext.define('Ext.view.Table', {
    extend: 'Ext.view.View',
    alias: 'widget.tableview',
    uses: [
        'Ext.view.TableChunker',
        'Ext.util.DelayedTask',
        'Ext.util.MixedCollection'
    ],

    baseCls: Ext.baseCSSPrefix + 'grid-view',

    // row
    itemSelector: 'tr.' + Ext.baseCSSPrefix + 'grid-row',
    // cell
    cellSelector: 'td.' + Ext.baseCSSPrefix + 'grid-cell',

    // keep a separate rowSelector, since we may need to select the actual row elements
    rowSelector: 'tr.' + Ext.baseCSSPrefix + 'grid-row',

    /**
     * @cfg {String} [firstCls='x-grid-cell-first']
     * A CSS class to add to the *first* cell in every row to enable special styling for the first column.
     * If no styling is needed on the first column, this may be configured as `null`.
     */
    firstCls: Ext.baseCSSPrefix + 'grid-cell-first',

    /**
     * @cfg {String} [lastCls='x-grid-cell-last']
     * A CSS class to add to the *last* cell in every row to enable special styling for the last column.
     * If no styling is needed on the last column, this may be configured as `null`.
     */
    lastCls: Ext.baseCSSPrefix + 'grid-cell-last',

    headerRowSelector: 'tr.' + Ext.baseCSSPrefix + 'grid-header-row',

    selectedItemCls: Ext.baseCSSPrefix + 'grid-row-selected',
    selectedCellCls: Ext.baseCSSPrefix + 'grid-cell-selected',
    focusedItemCls: Ext.baseCSSPrefix + 'grid-row-focused',
    overItemCls: Ext.baseCSSPrefix + 'grid-row-over',
    altRowCls:   Ext.baseCSSPrefix + 'grid-row-alt',
    rowClsRe: new RegExp('(?:^|\\s*)' + Ext.baseCSSPrefix + 'grid-row-(first|last|alt)(?:\\s+|$)', 'g'),
    cellRe: new RegExp(Ext.baseCSSPrefix + 'grid-cell-([^\\s]+) ', ''),

    // cfg docs inherited
    trackOver: true,

    /**
     * Override this function to apply custom CSS classes to rows during rendering. This function should return the
     * CSS class name (or empty string '' for none) that will be added to the row's wrapping div. To apply multiple
     * class names, simply return them space-delimited within the string (e.g. 'my-class another-class').
     * Example usage:
     *
     *     viewConfig: {
     *         getRowClass: function(record, rowIndex, rowParams, store){
     *             return record.get("valid") ? "row-valid" : "row-error";
     *         }
     *     }
     *
     * @param {Ext.data.Model} record The record corresponding to the current row.
     * @param {Number} index The row index.
     * @param {Object} rowParams **DEPRECATED.** For row body use the
     * {@link Ext.grid.feature.RowBody#getAdditionalData getAdditionalData} method of the rowbody feature.
     * @param {Ext.data.Store} store The store this grid is bound to
     * @return {String} a CSS class name to add to the row.
     * @method
     */
    getRowClass: null,

    /**
     * @cfg {Boolean} stripeRows
     * True to stripe the rows.
     *
     * This causes the CSS class **`x-grid-row-alt`** to be added to alternate rows of
     * the grid. A default CSS rule is provided which sets a background color, but you can override this
     * with a rule which either overrides the **background-color** style using the `!important`
     * modifier, or which uses a CSS selector of higher specificity.
     */
    stripeRows: true,
    
    /**
     * @cfg {Boolean} markDirty
     * True to show the dirty cell indicator when a cell has been modified.
     */
    markDirty : true,

    /**
     * @cfg {Boolean} enableTextSelection
     * True to enable text selections.
     */

    initComponent: function() {
        var me = this,
            scroll = me.scroll;

        // Scrolling within a TableView is controlled by the scroll config of its owning GridPanel
        // It must see undefined in this property in order to leave the scroll styles alone at afterRender time
        me.autoScroll = undefined;

        //Scrolling is handled at the View's element level
        if (scroll === true || scroll === 'both') {
            me.style = Ext.apply(me.style||{}, {
                overflow: 'auto'
            });
        } else if (scroll === 'horizontal') {
            me.style = Ext.apply(me.style||{}, {
                "overflow-x": 'auto',
                "overflow-y": 'hidden'
            });
        } else if (scroll === 'vertical') {
            me.style = Ext.apply(me.style||{}, {
                "overflow-x": 'hidden',
                "overflow-y": 'auto'
            });
        } else {
            me.style = Ext.apply(me.style||{}, {
                overflow: 'hidden'
            });
        }
        me.selModel.view = me;
        me.headerCt.view = me;
        me.headerCt.markDirty = me.markDirty;

        // Features need a reference to the grid.
        me.initFeatures(me.grid);
        delete me.grid;

        me.tpl = '<div></div>';
        me.callParent();
    },
    
    /**
     * @private
     * Move a grid column from one position to another
     * @param {Number} fromIdx The index from which to move columns
     * @param {Number} toIdx The index at which to insert columns.
     * @param {Number} [colsToMove=1] The number of columns to move beginning at the `fromIdx`
     */
    moveColumn: function(fromIdx, toIdx, colsToMove) {
        var me = this,
            fragment = (colsToMove > 1) ? document.createDocumentFragment() : undefined,
            destinationCellIdx = toIdx,
            colCount = me.getGridColumns().length,
            lastIdx = colCount - 1,
            doFirstLastClasses = (me.firstCls || me.lastCls) && (toIdx == 0 || toIdx == colCount || fromIdx == 0 || fromIdx == lastIdx),
            i,
            j,
            rows, len, tr, headerRows;

        if (me.rendered) {
            // Use select here. In most cases there will only be one row. In
            // the case of a grouping grid, each group also has a header.
            headerRows = me.el.query(me.headerRowSelector);
            rows = me.el.query(me.rowSelector);

            if (toIdx > fromIdx && fragment) {
                destinationCellIdx -= colsToMove;
            }

            // Move the column sizing header to match
            for (i = 0, len = headerRows.length; i < len; ++i) {
                tr = headerRows[i];
                if (fragment) {
                    for (j = 0; j < colsToMove; j++) {
                        fragment.appendChild(tr.cells[fromIdx]);
                    }
                    tr.insertBefore(fragment, tr.cells[destinationCellIdx] || null);
                } else {
                    tr.insertBefore(tr.cells[fromIdx], tr.cells[destinationCellIdx] || null);
                }
            }

            for (i = 0, len = rows.length; i < len; i++) {
                tr = rows[i];

                // Keep first cell class and last cell class correct *only if needed*
                if (doFirstLastClasses) {

                    if (fromIdx === 0) {
                        Ext.fly(tr.cells[0]).removeCls(me.firstCls);
                        Ext.fly(tr.cells[1]).addCls(me.firstCls);
                    } else if (fromIdx === lastIdx) {
                        Ext.fly(tr.cells[lastIdx]).removeCls(me.lastCls);
                        Ext.fly(tr.cells[lastIdx - 1]).addCls(me.lastCls);
                    }
                    if (toIdx === 0) {
                        Ext.fly(tr.cells[0]).removeCls(me.firstCls);
                        Ext.fly(tr.cells[fromIdx]).addCls(me.firstCls);
                    } else if (toIdx === colCount) {
                        Ext.fly(tr.cells[lastIdx]).removeCls(me.lastCls);
                        Ext.fly(tr.cells[fromIdx]).addCls(me.lastCls);
                    }
                }

                if (fragment) {
                    for (j = 0; j < colsToMove; j++) {
                        fragment.appendChild(tr.cells[fromIdx]);
                    }
                    tr.insertBefore(fragment, tr.cells[destinationCellIdx] || null);
                } else {
                    tr.insertBefore(tr.cells[fromIdx], tr.cells[destinationCellIdx] || null);
                }
            }
            me.setNewTemplate();
        }
    },

    // scroll the view to the top
    scrollToTop: Ext.emptyFn,

    /**
     * Add a listener to the main view element. It will be destroyed with the view.
     * @private
     */
    addElListener: function(eventName, fn, scope){
        this.mon(this, eventName, fn, scope, {
            element: 'el'
        });
    },

    /**
     * Get the columns used for generating a template via TableChunker.
     * See {@link Ext.grid.header.Container#getGridColumns}.
     * @private
     */
    getGridColumns: function() {
        return this.headerCt.getGridColumns();
    },

    /**
     * Get a leaf level header by index regardless of what the nesting
     * structure is.
     * @private
     * @param {Number} index The index
     */
    getHeaderAtIndex: function(index) {
        return this.headerCt.getHeaderAtIndex(index);
    },

    /**
     * Get the cell (td) for a particular record and column.
     * @param {Ext.data.Model} record
     * @param {Ext.grid.column.Column} column
     * @private
     */
    getCell: function(record, column) {
        var row = this.getNode(record);
        return Ext.fly(row).down(column.getCellSelector());
    },

    /**
     * Get a reference to a feature
     * @param {String} id The id of the feature
     * @return {Ext.grid.feature.Feature} The feature. Undefined if not found
     */
    getFeature: function(id) {
        var features = this.featuresMC;
        if (features) {
            return features.get(id);
        }
    },

    /**
     * Initializes each feature and bind it to this view.
     * @private
     */
    initFeatures: function(grid) {
        var me = this,
            i,
            features,
            feature,
            len;

        me.featuresMC = new Ext.util.MixedCollection();
        features = me.features = me.prepareFeatures();
        len = features ? features.length : 0;
        for (i = 0; i < len; i++) {
            feature = features[i];

            // inject a reference to view and grid - Features need both
            feature.view = me;
            feature.grid = grid;
            me.featuresMC.add(feature);
            feature.init();
        }
    },

    /**
     * @private
     * Converts the features array as configured, into an array of instantiated Feature objects.
     * 
     * This is borrowed by Lockable which clones and distributes Features to both child grids of a locking grid.
     * 
     * Must have no side effects other than Feature instantiation.
     * 
     * MUST NOT update the this.features property, and MUST NOT update the instantiated Features.
     */
    prepareFeatures: function() {
        var me = this,
            features = me.features,
            feature,
            result,
            i = 0, len;
        
        if (features) {
            result = [];
            len = features.length;
            for (; i < len; i++) {
                feature = features[i];
                if (!feature.isFeature) {
                    feature = Ext.create('feature.' + feature.ftype, feature);
                }
                result[i] = feature;
            }
        }
        return result;
    },

    /**
     * Gives features an injection point to attach events to the markup that
     * has been created for this view.
     * @private
     */
    attachEventsForFeatures: function() {
        var features = this.features,
            ln       = features.length,
            i        = 0;

        for (; i < ln; i++) {
            if (features[i].isFeature) {
                features[i].attachEvents();
            }
        }
    },

    afterRender: function() {
        var me = this;
        me.callParent();

        if (!me.enableTextSelection) {
            me.el.unselectable();
        }
        me.attachEventsForFeatures();
    },

    // Private template method implemented starting at the AbstractView class.
    onViewScroll: function(e, t) {
        this.callParent(arguments);
        this.fireEvent('bodyscroll', e, t);
    },

    /**
     * Uses the headerCt (Which is the repository of all information relating to Column definitions)
     * to transform data from dataIndex keys in a record to headerId keys in each header and then run
     * them through each feature to get additional data for variables they have injected into the view template.
     * @private
     */
    prepareData: function(data, idx, record) {
        var me       = this,
            result   = me.headerCt.prepareData(data, idx, record, me, me.ownerCt),
            features = me.features,
            ln       = features.length,
            i        = 0,
            feature;

        for (; i < ln; i++) {
            feature = features[i];
            if (feature.isFeature) {
                Ext.apply(result, feature.getAdditionalData(data, idx, record, result, me));
            }
        }

        return result;
    },

    // TODO: Refactor headerCt dependency here to colModel
    collectData: function(records, startIndex) {
        var preppedRecords = this.callParent(arguments),
            headerCt  = this.headerCt,
            fullWidth = headerCt.getFullWidth(),
            features  = this.features,
            ln = features.length,
            o = {
                rows: preppedRecords,
                fullWidth: fullWidth
            },
            i  = 0,
            feature,
            j = 0,
            jln,
            rowParams,
            rec,
            cls;

        jln = preppedRecords.length;
        // process row classes, rowParams has been deprecated and has been moved
        // to the individual features that implement the behavior.
        if (this.getRowClass) {
            for (; j < jln; j++) {
                rowParams = {};
                rec = preppedRecords[j];
                cls = rec.rowCls || '';
                rec.rowCls = this.getRowClass(records[j], j, rowParams, this.store) + ' ' + cls;
                if (rowParams.alt) {
                    Ext.Error.raise("The getRowClass alt property is no longer supported.");
                }
                if (rowParams.tstyle) {
                    Ext.Error.raise("The getRowClass tstyle property is no longer supported.");
                }
                if (rowParams.cells) {
                    Ext.Error.raise("The getRowClass cells property is no longer supported.");
                }
                if (rowParams.body) {
                    Ext.Error.raise("The getRowClass body property is no longer supported. Use the getAdditionalData method of the rowbody feature.");
                }
                if (rowParams.bodyStyle) {
                    Ext.Error.raise("The getRowClass bodyStyle property is no longer supported.");
                }
                if (rowParams.cols) {
                    Ext.Error.raise("The getRowClass cols property is no longer supported.");
                }
            }
        }
        // currently only one feature may implement collectData. This is to modify
        // what's returned to the view before its rendered
        for (; i < ln; i++) {
            feature = features[i];
            if (feature.isFeature && feature.collectData && !feature.disabled) {
                o = feature.collectData(records, preppedRecords, startIndex, fullWidth, o);
                break;
            }
        }
        return o;
    },

    /**
     * In FF10, flex columns transitioning from hidden to visible may not always be
     * displayed properly initially.  Simply re-measuring the width after the styling
     * changes take place seems to be enough to poke the browser into doing it's thing
     * @private
     */
    forceReflow: Ext.isGecko10
        ? function() {
            var el = this.el.down('table'),
                width;
            if (el) {
                width = el.getWidth();
            }
        }
        : Ext.emptyFn,

    /**
     * When a header is resized, setWidth on the individual columns resizer class,
     * the top level table, save/restore scroll state, generate a new template and
     * restore focus to the grid view's element so that keyboard navigation
     * continues to work.
     * @private
     */
    onHeaderResize: function(header, w, suppressFocus) {
        var me = this,
            el = me.el;

        if (el) {
            // Grab the col and set the width, css
            // class is generated in TableChunker.
            // Select composites because there may be several chunks.
            el.select('th.' + Ext.baseCSSPrefix + 'grid-col-resizer-'+header.id).setWidth(w);
            el.select('table.' + Ext.baseCSSPrefix + 'grid-table-resizer').setWidth(me.headerCt.getFullWidth());
            if (!me.ignoreTemplate) {
                me.setNewTemplate();
            }
            if (!suppressFocus) {
                me.el.focus();
            }
            me.forceReflow();
        }
    },

    /**
     * When a header is shown restore its oldWidth if it was previously hidden.
     * @private
     */
    onHeaderShow: function(headerCt, header, suppressFocus) {
        var me = this;
        me.ignoreTemplate = true;
        // restore headers that were dynamically hidden
        if (header.oldWidth) {
            me.onHeaderResize(header, header.oldWidth, suppressFocus);
            delete header.oldWidth;
        // flexed headers will have a calculated size set
        // this additional check has to do with the fact that
        // defaults: {width: 100} will fight with a flex value
        } else if (header.width && !header.flex) {
            me.onHeaderResize(header, header.width, suppressFocus);
        } else if (header.el) {
            me.onHeaderResize(header, header.el.getWidth(), suppressFocus);
        }
        delete me.ignoreTemplate;
        me.setNewTemplate();
    },

    /**
     * When the header hides treat it as a resize to 0.
     * @private
     */
    onHeaderHide: function(headerCt, header, suppressFocus) {
        this.onHeaderResize(header, 0, suppressFocus);
    },

    // Private. Called when the table changes height.
    // For example, see examples/grid/group-summary-grid.html
    // If we have flexed column headers, we need to update the header layout
    // because it may have to accommodate (or cease to accommodate) a vertical scrollbar.
    // Only do this on platforms with have a space-consuming scrollbar
    refreshSize: function() {
        var me = this,
            cmp;
            
        if (!me.hasLoadingHeight) {
            cmp = me.up('tablepanel');

            // Suspend layouts in case the superclass requests a layout. We might too, so they
            // must be coalescsed.
            Ext.suspendLayouts();

            me.callParent();

            if (cmp && Ext.getScrollbarSize().width) {
                cmp.updateLayout();
            }

            Ext.resumeLayouts(true);
        }
    },

    /**
     * Set a new template based on the current columns displayed in the grid.
     * @private
     */
    setNewTemplate: function() {
        var me = this,
            columns = me.headerCt.getColumnsForTpl(true);

        // Template generation requires the rowCount as well as the column definitions and features.
        me.tpl = me.getTableChunker().getTableTpl({
            rowCount: me.store.getCount(),
            columns: columns,
            features: me.features,
            enableTextSelection: me.enableTextSelection
        });
    },

    /**
     * Returns the configured chunker or default of Ext.view.TableChunker
     */
    getTableChunker: function() {
        return this.chunker || Ext.view.TableChunker;
    },

    /**
     * Adds a CSS Class to a specific row.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowInfo An HTMLElement, index or instance of a model
     * representing this row
     * @param {String} cls
     */
    addRowCls: function(rowInfo, cls) {
        var row = this.getNode(rowInfo);
        if (row) {
            Ext.fly(row).addCls(cls);
        }
    },

    /**
     * Removes a CSS Class from a specific row.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowInfo An HTMLElement, index or instance of a model
     * representing this row
     * @param {String} cls
     */
    removeRowCls: function(rowInfo, cls) {
        var row = this.getNode(rowInfo);
        if (row) {
            Ext.fly(row).removeCls(cls);
        }
    },

    // GridSelectionModel invokes onRowSelect as selection changes
    onRowSelect : function(rowIdx) {
        this.addRowCls(rowIdx, this.selectedItemCls);
    },

    // GridSelectionModel invokes onRowDeselect as selection changes
    onRowDeselect : function(rowIdx) {
        var me = this;

        me.removeRowCls(rowIdx, me.selectedItemCls);
        me.removeRowCls(rowIdx, me.focusedItemCls);
    },

    onCellSelect: function(position) {
        var cell = this.getCellByPosition(position);
        if (cell) {
            cell.addCls(this.selectedCellCls);
        }
    },

    onCellDeselect: function(position) {
        var cell = this.getCellByPosition(position);
        if (cell) {
            cell.removeCls(this.selectedCellCls);
        }

    },

    onCellFocus: function(position) {
        this.focusCell(position);
    },

    getCellByPosition: function(position) {
        if (position) {
            var node   = this.getNode(position.row),
                header = this.headerCt.getHeaderAtIndex(position.column);

            if (header && node) {
                return Ext.fly(node).down(header.getCellSelector());
            }
        }
        return false;
    },

    // GridSelectionModel invokes onRowFocus to 'highlight'
    // the last row focused
    onRowFocus: function(rowIdx, highlight, supressFocus) {
        var me = this;

        if (highlight) {
            me.addRowCls(rowIdx, me.focusedItemCls);
            if (!supressFocus) {
                me.focusRow(rowIdx);
            }
            //this.el.dom.setAttribute('aria-activedescendant', row.id);
        } else {
            me.removeRowCls(rowIdx, me.focusedItemCls);
        }
    },

    /**
     * Focuses a particular row and brings it into view. Will fire the rowfocus event.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowIdx
     * An HTMLElement template node, index of a template node, the id of a template node or the
     * record associated with the node.
     */
    focusRow: function(rowIdx) {
        var me         = this,
            row        = me.getNode(rowIdx),
            el         = me.el,
            adjustment = 0,
            panel      = me.ownerCt,
            rowRegion,
            elTop,
            elBottom,
            record;

        if (row && el) {
            // Viewable region must not include scrollbars, so use
            // DOM clientHeight to determine height
            elTop = el.getY();
            elBottom = elTop + el.dom.clientHeight;
            rowRegion = Ext.fly(row).getRegion();
            // row is above
            if (rowRegion.top < elTop) {
                adjustment = rowRegion.top - elTop;
            // row is below
            } else if (rowRegion.bottom > elBottom) {
                adjustment = rowRegion.bottom - elBottom;
            }
            record = me.getRecord(row);
            rowIdx = me.store.indexOf(record);

            if (adjustment) {
                panel.scrollByDeltaY(adjustment);
            }
            me.fireEvent('rowfocus', record, row, rowIdx);
        }
    },

    focusCell: function(position) {
        var me          = this,
            cell        = me.getCellByPosition(position),
            el          = me.el,
            adjustmentY = 0,
            adjustmentX = 0,
            elRegion    = el.getRegion(),
            panel       = me.ownerCt,
            cellRegion,
            record;

        // Viewable region must not include scrollbars, so use
        // DOM client dimensions
        elRegion.bottom = elRegion.top + el.dom.clientHeight;
        elRegion.right = elRegion.left + el.dom.clientWidth;
        if (cell) {
            cellRegion = cell.getRegion();
            // cell is above
            if (cellRegion.top < elRegion.top) {
                adjustmentY = cellRegion.top - elRegion.top;
            // cell is below
            } else if (cellRegion.bottom > elRegion.bottom) {
                adjustmentY = cellRegion.bottom - elRegion.bottom;
            }

            // cell is left
            if (cellRegion.left < elRegion.left) {
                adjustmentX = cellRegion.left - elRegion.left;
            // cell is right
            } else if (cellRegion.right > elRegion.right) {
                adjustmentX = cellRegion.right - elRegion.right;
            }

            if (adjustmentY) {
                panel.scrollByDeltaY(adjustmentY);
            }
            if (adjustmentX) {
                panel.scrollByDeltaX(adjustmentX);
            }
            el.focus();
            me.fireEvent('cellfocus', record, cell, position);
        }
    },

    /**
     * Scrolls by delta. This affects this individual view ONLY and does not
     * synchronize across views or scrollers.
     * @param {Number} delta
     * @param {String} [dir] Valid values are scrollTop and scrollLeft. Defaults to scrollTop.
     * @private
     */
    scrollByDelta: function(delta, dir) {
        dir = dir || 'scrollTop';
        var elDom = this.el.dom;
        elDom[dir] = (elDom[dir] += delta);
    },

    // private
    onUpdate : function(store, record, operation, changedFieldNames) {
        var me = this,
            index,
            newRow, oldRow,
            oldCells, newCells, len, i,
            columns, overItemCls,
            isHovered, row;
            
        if (me.rendered) {
            
            index = me.store.indexOf(record);
            columns = me.headerCt.getGridColumns();
            overItemCls = me.overItemCls;

            // If we have columns which may *need* updating (think lockable grid child with all columns either locked or unlocked)
            // and the changed record is within our view, then update the view
            if (columns.length && index > -1) {
                newRow = me.bufferRender([record], index)[0];
                oldRow = me.all.item(index);
                isHovered = oldRow.hasCls(overItemCls);
                oldRow.dom.className = newRow.className;
                if(isHovered) {
                    oldRow.addCls(overItemCls);
                }

                // Replace changed cells in the existing row structure with the new version from the rendered row.
                oldCells = oldRow.query(this.cellSelector);
                newCells = Ext.fly(newRow).query(this.cellSelector);
                len = newCells.length;
                // row is the element that contains the cells.  This will be a different element from oldRow when using a rowwrap feature
                row = oldCells[0].parentNode;
                for (i = 0; i < len; i++) {
                    // If the field at this column index was changed, replace the cell.
                    if (me.shouldUpdateCell(columns[i], changedFieldNames)) {
                        row.insertBefore(newCells[i], oldCells[i]);
                        row.removeChild(oldCells[i]);
                    }
                }

                // Maintain selection after update
                // TODO: Move to approriate event handler.
                me.selModel.refresh();
                me.doStripeRows(index, index);
                me.fireEvent('itemupdate', record, index, newRow);
            }
        }

    },
    
    shouldUpdateCell: function(column, changedFieldNames){
        // Though this may not be the most efficient, a renderer could be dependent on any field in the
        // store, so we must always update the cell
        if (column.hasCustomRenderer) {
            return true;
        }
        return !changedFieldNames || Ext.Array.contains(changedFieldNames, column.dataIndex);
    },

    /**
     * Refreshes the grid view. Saves and restores the scroll state, generates a new template, stripes rows and
     * invalidates the scrollers.
     */
    refresh: function() {
        this.setNewTemplate();
        this.callParent(arguments);
        this.doStripeRows(0);
    },

    processItemEvent: function(record, row, rowIndex, e) {
        var me = this,
            cell = e.getTarget(me.cellSelector, row),
            cellIndex = cell ? cell.cellIndex : -1,
            map = me.statics().EventMap,
            selModel = me.getSelectionModel(),
            type = e.type,
            result;

        if (type == 'keydown' && !cell && selModel.getCurrentPosition) {
            // CellModel, otherwise we can't tell which cell to invoke
            cell = me.getCellByPosition(selModel.getCurrentPosition());
            if (cell) {
                cell = cell.dom;
                cellIndex = cell.cellIndex;
            }
        }

        result = me.fireEvent('uievent', type, me, cell, rowIndex, cellIndex, e, record, row);

        if (result === false || me.callParent(arguments) === false) {
            return false;
        }

        // Don't handle cellmouseenter and cellmouseleave events for now
        if (type == 'mouseover' || type == 'mouseout') {
            return true;
        }

        if(!cell) {
            // if the element whose event is being processed is not an actual cell (for example if using a rowbody
            // feature and the rowbody element's event is being processed) then do not fire any "cell" events
            return true;
        }

        return !(
            // We are adding cell and feature events
            (me['onBeforeCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) ||
            (me.fireEvent('beforecell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false) ||
            (me['onCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) ||
            (me.fireEvent('cell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false)
        );
    },

    processSpecialEvent: function(e) {
        var me = this,
            map = me.statics().EventMap,
            features = me.features,
            ln = features.length,
            type = e.type,
            i, feature, prefix, featureTarget,
            beforeArgs, args,
            panel = me.ownerCt;

        me.callParent(arguments);

        if (type == 'mouseover' || type == 'mouseout') {
            return;
        }

        for (i = 0; i < ln; i++) {
            feature = features[i];
            if (feature.hasFeatureEvent) {
                featureTarget = e.getTarget(feature.eventSelector, me.getTargetEl());
                if (featureTarget) {
                    prefix = feature.eventPrefix;
                    // allows features to implement getFireEventArgs to change the
                    // fireEvent signature
                    beforeArgs = feature.getFireEventArgs('before' + prefix + type, me, featureTarget, e);
                    args = feature.getFireEventArgs(prefix + type, me, featureTarget, e);

                    if (
                        // before view event
                        (me.fireEvent.apply(me, beforeArgs) === false) ||
                        // panel grid event
                        (panel.fireEvent.apply(panel, beforeArgs) === false) ||
                        // view event
                        (me.fireEvent.apply(me, args) === false) ||
                        // panel event
                        (panel.fireEvent.apply(panel, args) === false)
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    },

    onCellMouseDown: Ext.emptyFn,
    onCellMouseUp: Ext.emptyFn,
    onCellClick: Ext.emptyFn,
    onCellDblClick: Ext.emptyFn,
    onCellContextMenu: Ext.emptyFn,
    onCellKeyDown: Ext.emptyFn,
    onBeforeCellMouseDown: Ext.emptyFn,
    onBeforeCellMouseUp: Ext.emptyFn,
    onBeforeCellClick: Ext.emptyFn,
    onBeforeCellDblClick: Ext.emptyFn,
    onBeforeCellContextMenu: Ext.emptyFn,
    onBeforeCellKeyDown: Ext.emptyFn,

    /**
     * Expands a particular header to fit the max content width.
     * This will ONLY expand, not contract.
     * @private
     */
    expandToFit: function(header) {
        if (header) {
            var maxWidth = this.getMaxContentWidth(header);
            delete header.flex;
            header.setWidth(maxWidth);
        }
    },

    /**
     * Returns the max contentWidth of the header's text and all cells
     * in the grid under this header.
     * @private
     */
    getMaxContentWidth: function(header) {
        var cellSelector = header.getCellInnerSelector(),
            cells        = this.el.query(cellSelector),
            i = 0,
            ln = cells.length,
            maxWidth = header.el.dom.scrollWidth,
            scrollWidth;

        for (; i < ln; i++) {
            scrollWidth = cells[i].scrollWidth;
            if (scrollWidth > maxWidth) {
                maxWidth = scrollWidth;
            }
        }
        return maxWidth;
    },

    getPositionByEvent: function(e) {
        var me       = this,
            cellNode = e.getTarget(me.cellSelector),
            rowNode  = e.getTarget(me.itemSelector),
            record   = me.getRecord(rowNode),
            header   = me.getHeaderByCell(cellNode);

        return me.getPosition(record, header);
    },

    getHeaderByCell: function(cell) {
        if (cell) {
            var m = cell.className.match(this.cellRe);
            if (m && m[1]) {
                return Ext.getCmp(m[1]);
            }
        }
        return false;
    },

    /**
     * @param {Object} position The current row and column: an object containing the following properties:
     *
     * - row - The row index
     * - column - The column index
     *
     * @param {String} direction 'up', 'down', 'right' and 'left'
     * @param {Ext.EventObject} e event
     * @param {Boolean} preventWrap Set to true to prevent wrap around to the next or previous row.
     * @param {Function} verifierFn A function to verify the validity of the calculated position.
     * When using this function, you must return true to allow the newPosition to be returned.
     * @param {Object} scope Scope to run the verifierFn in
     * @returns {Object} newPosition An object containing the following properties:
     *
     * - row - The row index
     * - column - The column index
     *
     * @private
     */
    walkCells: function(pos, direction, e, preventWrap, verifierFn, scope) {

        // Caller (probably CellModel) had no current position. This can happen
        // if the main el is focused and any navigation key is presssed.
        if (!pos) {
            return;
        }

        var me       = this,
            row      = pos.row,
            column   = pos.column,
            rowCount = me.store.getCount(),
            firstCol = me.getFirstVisibleColumnIndex(),
            lastCol  = me.getLastVisibleColumnIndex(),
            newPos   = {row: row, column: column},
            activeHeader = me.headerCt.getHeaderAtIndex(column);

        // no active header or its currently hidden
        if (!activeHeader || activeHeader.hidden) {
            return false;
        }

        e = e || {};
        direction = direction.toLowerCase();
        switch (direction) {
            case 'right':
                // has the potential to wrap if its last
                if (column === lastCol) {
                    // if bottom row and last column, deny right
                    if (preventWrap || row === rowCount - 1) {
                        return false;
                    }
                    if (!e.ctrlKey) {
                        // otherwise wrap to nextRow and firstCol
                        newPos.row = row + 1;
                        newPos.column = firstCol;
                    }
                // go right
                } else {
                    if (!e.ctrlKey) {
                        newPos.column = column + me.getRightGap(activeHeader);
                    } else {
                        newPos.column = lastCol;
                    }
                }
                break;

            case 'left':
                // has the potential to wrap
                if (column === firstCol) {
                    // if top row and first column, deny left
                    if (preventWrap || row === 0) {
                        return false;
                    }
                    if (!e.ctrlKey) {
                        // otherwise wrap to prevRow and lastCol
                        newPos.row = row - 1;
                        newPos.column = lastCol;
                    }
                // go left
                } else {
                    if (!e.ctrlKey) {
                        newPos.column = column + me.getLeftGap(activeHeader);
                    } else {
                        newPos.column = firstCol;
                    }
                }
                break;

            case 'up':
                // if top row, deny up
                if (row === 0) {
                    return false;
                // go up
                } else {
                    if (!e.ctrlKey) {
                        newPos.row = row - 1;
                    } else {
                        newPos.row = 0;
                    }
                }
                break;

            case 'down':
                // if bottom row, deny down
                if (row === rowCount - 1) {
                    return false;
                // go down
                } else {
                    if (!e.ctrlKey) {
                        newPos.row = row + 1;
                    } else {
                        newPos.row = rowCount - 1;
                    }
                }
                break;
        }

        if (verifierFn && verifierFn.call(scope || window, newPos) !== true) {
            return false;
        } else {
            return newPos;
        }
    },
    getFirstVisibleColumnIndex: function() {
        var firstVisibleHeader = this.getHeaderCt().getVisibleGridColumns()[0];

        return firstVisibleHeader ? firstVisibleHeader.getIndex() : -1;
    },

    getLastVisibleColumnIndex: function() {
        var visHeaders = this.getHeaderCt().getVisibleGridColumns(),
            lastHeader = visHeaders[visHeaders.length - 1];

        return lastHeader.getIndex();
    },

    getHeaderCt: function() {
        return this.headerCt;
    },

    // TODO: have this use the new Ext.grid.CellContext class
    getPosition: function(record, header) {
        var me = this,
            store = me.store,
            gridCols = me.headerCt.getGridColumns();

        return {
            row: store.indexOf(record),
            column: Ext.Array.indexOf(gridCols, header)
        };
    },

    /**
     * Determines the 'gap' between the closest adjacent header to the right
     * that is not hidden.
     * @private
     */
    getRightGap: function(activeHeader) {
        var headerCt        = this.getHeaderCt(),
            headers         = headerCt.getGridColumns(),
            activeHeaderIdx = Ext.Array.indexOf(headers, activeHeader),
            i               = activeHeaderIdx + 1,
            nextIdx;

        for (; i <= headers.length; i++) {
            if (!headers[i].hidden) {
                nextIdx = i;
                break;
            }
        }

        return nextIdx - activeHeaderIdx;
    },

    beforeDestroy: function() {
        if (this.rendered) {
            this.el.removeAllListeners();
        }
        this.callParent(arguments);
    },

    /**
     * Determines the 'gap' between the closest adjacent header to the left
     * that is not hidden.
     * @private
     */
    getLeftGap: function(activeHeader) {
        var headerCt        = this.getHeaderCt(),
            headers         = headerCt.getGridColumns(),
            activeHeaderIdx = Ext.Array.indexOf(headers, activeHeader),
            i               = activeHeaderIdx - 1,
            prevIdx;

        for (; i >= 0; i--) {
            if (!headers[i].hidden) {
                prevIdx = i;
                break;
            }
        }

        return prevIdx - activeHeaderIdx;
    },

    // after adding a row stripe rows from then on
    onAdd: function(ds, records, index) {
        this.callParent(arguments);
        this.doStripeRows(index);
    },
    
    // after removing a row stripe rows from then on
    onRemove: function(ds, records, index) {
        this.callParent(arguments);
        this.doStripeRows(index);
    },
    
    /**
     * Stripes rows from a particular row index.
     * @param {Number} startRow
     * @param {Number} [endRow] argument specifying the last row to process.
     * By default process up to the last row.
     * @private
     */
    doStripeRows: function(startRow, endRow) {
        var me = this,
            rows,
            rowsLn,
            i,
            row;
            
        // ensure stripeRows configuration is turned on
        if (me.rendered && me.stripeRows) {
            rows = me.getNodes(startRow, endRow);
                
            for (i = 0, rowsLn = rows.length; i < rowsLn; i++) {
                row = rows[i];
                // Remove prior applied row classes.
                row.className = row.className.replace(me.rowClsRe, ' ');
                startRow++;
                // Every odd row will get an additional cls
                if (startRow % 2 === 0) {
                    row.className += (' ' + me.altRowCls);
                }
            }
        }
    }
 
});

/**
 * The grid View class provides extra {@link Ext.grid.Panel} specific functionality to the
 * {@link Ext.view.Table}. In general, this class is not instanced directly, instead a viewConfig
 * option is passed to the grid:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         viewConfig: {
 *             stripeRows: false
 *         }
 *     });
 *
 * ## Drag Drop
 *
 * Drag and drop functionality can be achieved in the grid by attaching a {@link Ext.grid.plugin.DragDrop} plugin
 * when creating the view.
 *
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         viewConfig: {
 *             plugins: {
 *                 ddGroup: 'people-group',
 *                 ptype: 'gridviewdragdrop',
 *                 enableDrop: false
 *             }
 *         }
 *     });
 */
Ext.define('Ext.grid.View', {
    extend: 'Ext.view.Table',
    alias: 'widget.gridview',

    /**
     * @cfg
     * True to stripe the rows.
     *
     * This causes the CSS class **`x-grid-row-alt`** to be added to alternate rows of the grid. A default CSS rule is
     * provided which sets a background color, but you can override this with a rule which either overrides the
     * **background-color** style using the `!important` modifier, or which uses a CSS selector of higher specificity.
     */
    stripeRows: true,

    autoScroll: true
});

/**
 * @author Aaron Conran
 * @docauthor Ed Spencer
 *
 * Grids are an excellent way of showing large amounts of tabular data on the client side. Essentially a supercharged
 * `<table>`, GridPanel makes it easy to fetch, sort and filter large amounts of data.
 *
 * Grids are composed of two main pieces - a {@link Ext.data.Store Store} full of data and a set of columns to render.
 *
 * ## Basic GridPanel
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'simpsonsStore',
 *         fields:['name', 'email', 'phone'],
 *         data:{'items':[
 *             { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
 *             { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
 *             { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
 *             { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'items'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { header: 'Name',  dataIndex: 'name' },
 *             { header: 'Email', dataIndex: 'email', flex: 1 },
 *             { header: 'Phone', dataIndex: 'phone' }
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * The code above produces a simple grid with three columns. We specified a Store which will load JSON data inline.
 * In most apps we would be placing the grid inside another container and wouldn't need to use the
 * {@link #height}, {@link #width} and {@link #renderTo} configurations but they are included here to make it easy to get
 * up and running.
 *
 * The grid we created above will contain a header bar with a title ('Simpsons'), a row of column headers directly underneath
 * and finally the grid rows under the headers.
 *
 * ## Configuring columns
 *
 * By default, each column is sortable and will toggle between ASC and DESC sorting when you click on its header. Each
 * column header is also reorderable by default, and each gains a drop-down menu with options to hide and show columns.
 * It's easy to configure each column - here we use the same example as above and just modify the columns config:
 *
 *     columns: [
 *         {
 *             header: 'Name',
 *             dataIndex: 'name',
 *             sortable: false,
 *             hideable: false,
 *             flex: 1
 *         },
 *         {
 *             header: 'Email',
 *             dataIndex: 'email',
 *             hidden: true
 *         },
 *         {
 *             header: 'Phone',
 *             dataIndex: 'phone',
 *             width: 100
 *         }
 *     ]
 *
 * We turned off sorting and hiding on the 'Name' column so clicking its header now has no effect. We also made the Email
 * column hidden by default (it can be shown again by using the menu on any other column). We also set the Phone column to
 * a fixed with of 100px and flexed the Name column, which means it takes up all remaining width after the other columns
 * have been accounted for. See the {@link Ext.grid.column.Column column docs} for more details.
 *
 * ## Renderers
 *
 * As well as customizing columns, it's easy to alter the rendering of individual cells using renderers. A renderer is
 * tied to a particular column and is passed the value that would be rendered into each cell in that column. For example,
 * we could define a renderer function for the email column to turn each email address into a mailto link:
 *
 *     columns: [
 *         {
 *             header: 'Email',
 *             dataIndex: 'email',
 *             renderer: function(value) {
 *                 return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
 *             }
 *         }
 *     ]
 *
 * See the {@link Ext.grid.column.Column column docs} for more information on renderers.
 *
 * ## Selection Models
 *
 * Sometimes all you want is to render data onto the screen for viewing, but usually it's necessary to interact with or
 * update that data. Grids use a concept called a Selection Model, which is simply a mechanism for selecting some part of
 * the data in the grid. The two main types of Selection Model are RowSelectionModel, where entire rows are selected, and
 * CellSelectionModel, where individual cells are selected.
 *
 * Grids use a Row Selection Model by default, but this is easy to customise like so:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         selType: 'cellmodel',
 *         store: ...
 *     });
 *
 * Specifying the `cellmodel` changes a couple of things. Firstly, clicking on a cell now
 * selects just that cell (using a {@link Ext.selection.RowModel rowmodel} will select the entire row), and secondly the
 * keyboard navigation will walk from cell to cell instead of row to row. Cell-based selection models are usually used in
 * conjunction with editing.
 *
 * ## Editing
 *
 * Grid has built-in support for in-line editing. There are two chief editing modes - cell editing and row editing. Cell
 * editing is easy to add to your existing column setup - here we'll just modify the example above to include an editor
 * on both the name and the email columns:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { header: 'Name',  dataIndex: 'name', field: 'textfield' },
 *             { header: 'Email', dataIndex: 'email', flex: 1,
 *                 field: {
 *                     xtype: 'textfield',
 *                     allowBlank: false
 *                 }
 *             },
 *             { header: 'Phone', dataIndex: 'phone' }
 *         ],
 *         selType: 'cellmodel',
 *         plugins: [
 *             Ext.create('Ext.grid.plugin.CellEditing', {
 *                 clicksToEdit: 1
 *             })
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * This requires a little explanation. We're passing in {@link #store store} and {@link #columns columns} as normal, but
 * this time we've also specified a {@link Ext.grid.column.Column#field field} on two of our columns. For the Name column
 * we just want a default textfield to edit the value, so we specify 'textfield'. For the Email column we customized the
 * editor slightly by passing allowBlank: false, which will provide inline validation.
 *
 * To support cell editing, we also specified that the grid should use the 'cellmodel' {@link #selType}, and created an
 * instance of the {@link Ext.grid.plugin.CellEditing CellEditing plugin}, which we configured to activate each editor after a
 * single click.
 *
 * ## Row Editing
 *
 * The other type of editing is row-based editing, using the RowEditor component. This enables you to edit an entire row
 * at a time, rather than editing cell by cell. Row Editing works in exactly the same way as cell editing, all we need to
 * do is change the plugin type to {@link Ext.grid.plugin.RowEditing}, and set the selType to 'rowmodel':
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { header: 'Name',  dataIndex: 'name', field: 'textfield' },
 *             { header: 'Email', dataIndex: 'email', flex:1,
 *                 field: {
 *                     xtype: 'textfield',
 *                     allowBlank: false
 *                 }
 *             },
 *             { header: 'Phone', dataIndex: 'phone' }
 *         ],
 *         selType: 'rowmodel',
 *         plugins: [
 *             Ext.create('Ext.grid.plugin.RowEditing', {
 *                 clicksToEdit: 1
 *             })
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * Again we passed some configuration to our {@link Ext.grid.plugin.RowEditing} plugin, and now when we click each row a row
 * editor will appear and enable us to edit each of the columns we have specified an editor for.
 *
 * ## Sorting & Filtering
 *
 * Every grid is attached to a {@link Ext.data.Store Store}, which provides multi-sort and filtering capabilities. It's
 * easy to set up a grid to be sorted from the start:
 *
 *     var myGrid = Ext.create('Ext.grid.Panel', {
 *         store: {
 *             fields: ['name', 'email', 'phone'],
 *             sorters: ['name', 'phone']
 *         },
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name' },
 *             { text: 'Email', dataIndex: 'email' }
 *         ]
 *     });
 *
 * Sorting at run time is easily accomplished by simply clicking each column header. If you need to perform sorting on
 * more than one field at run time it's easy to do so by adding new sorters to the store:
 *
 *     myGrid.store.sort([
 *         { property: 'name',  direction: 'ASC' },
 *         { property: 'email', direction: 'DESC' }
 *     ]);
 *
 * See {@link Ext.data.Store} for examples of filtering.
 *
 * ## Grouping
 *
 * Grid supports the grouping of rows by any field. For example if we had a set of employee records, we might want to
 * group by the department that each employee works in. Here's how we might set that up:
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['name', 'seniority', 'department'],
 *         groupField: 'department',
 *         data: {'employees':[
 *             { "name": "Michael Scott",  "seniority": 7, "department": "Management" },
 *             { "name": "Dwight Schrute", "seniority": 2, "department": "Sales" },
 *             { "name": "Jim Halpert",    "seniority": 3, "department": "Sales" },
 *             { "name": "Kevin Malone",   "seniority": 4, "department": "Accounting" },
 *             { "name": "Angela Martin",  "seniority": 5, "department": "Accounting" }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'employees'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Employees',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             { header: 'Name',     dataIndex: 'name' },
 *             { header: 'Seniority', dataIndex: 'seniority' }
 *         ],
 *         features: [{ftype:'grouping'}],
 *         width: 200,
 *         height: 275,
 *         renderTo: Ext.getBody()
 *     });
 *
 * ## Infinite Scrolling
 *
 * Grid supports infinite scrolling as an alternative to using a paging toolbar. Your users can scroll through thousands
 * of records without the performance penalties of renderering all the records on screen at once. The grid should be bound
 * to a *buffered* store with a pageSize specified.
 *
 * The number of rows rendered outside the visible area, and the buffering of pages of data from the remote server for
 * immediate rendering upon scroll can be controlled by configuring the {@link Ext.grid.PagingScroller #verticalScroller}.
 *
 * You can tell it to create a larger table to provide more scrolling before a refresh is needed, and also to keep more pages
 * of records in memory for faster refreshing when scrolling.
 *
 *     var myStore = Ext.create('Ext.data.Store', {
 *         // ...
 *         buffered: true,
 *         pageSize: 100,
 *         // ...
 *     });
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *         // ...
 *         autoLoad: true,
 *         verticalScroller: {
 *             trailingBufferZone: 200,  // Keep 200 records buffered in memory behind scroll
 *             leadingBufferZone: 5000   // Keep 5000 records buffered in memory ahead of scroll
 *         },
 *         // ...
 *     });
 *
 * ## Paging
 *
 * Grid supports paging through large sets of data via a PagingToolbar or PagingGridScroller (see the Infinite Scrolling section above).
 * To leverage paging via a toolbar or scroller, you need to set a pageSize configuration on the Store.
 *
 *     @example
 *     var itemsPerPage = 2;   // set the number of items you want per page
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         id:'simpsonsStore',
 *         autoLoad: false,
 *         fields:['name', 'email', 'phone'],
 *         pageSize: itemsPerPage, // items per page
 *         proxy: {
 *             type: 'ajax',
 *             url: 'pagingstore.js',  // url that will load data with respect to start and limit params
 *             reader: {
 *                 type: 'json',
 *                 root: 'items',
 *                 totalProperty: 'total'
 *             }
 *         }
 *     });
 *
 *     // specify the page you want to load
 *     store.loadPage(1);
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: store,
 *         columns: [
 *             {header: 'Name',  dataIndex: 'name'},
 *             {header: 'Email', dataIndex: 'email', flex:1},
 *             {header: 'Phone', dataIndex: 'phone'}
 *         ],
 *         width: 400,
 *         height: 125,
 *         dockedItems: [{
 *             xtype: 'pagingtoolbar',
 *             store: store,   // same store GridPanel is using
 *             dock: 'bottom',
 *             displayInfo: true
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *     
 * ## State saving
 * 
 * When configured {@link #stateful}, grids save their column state (order and width) encapsulated within the default
 * Panel state of changed width and height and collapsed/expanded state.
 *
 * Each {@link @columns column} of the grid may be configured with a {@link Ext.grid.column.Column#stateId stateId} which
 * identifies that column locally within the grid.
 */
Ext.define('Ext.grid.Panel', {
    extend: 'Ext.panel.Table',
    requires: ['Ext.grid.View'],
    alias: ['widget.gridpanel', 'widget.grid'],
    alternateClassName: ['Ext.list.ListView', 'Ext.ListView', 'Ext.grid.GridPanel'],
    viewType: 'gridview',

    lockable: false,

    // Required for the Lockable Mixin. These are the configurations which will be copied to the
    // normal and locked sub tablepanels
    bothCfgCopy: [
        'invalidateScrollerOnRefresh',
        'hideHeaders',
        'enableColumnHide',
        'enableColumnMove',
        'enableColumnResize',
        'sortableColumns'
    ],
    normalCfgCopy: [ 
        'verticalScroller', 
        'verticalScrollDock', 
        'verticalScrollerType', 
        'scroll'
    ],
    lockedCfgCopy: [],

    /**
     * @cfg {Boolean} rowLines False to remove row line styling
     */
    rowLines: true

    // Columns config is required in Grid
    /**
     * @cfg {Ext.grid.column.Column[]/Object} columns (required)
     * @inheritdoc
     */

    /**
     * @event reconfigure
     * Fires after a reconfigure.
     * @param {Ext.grid.Panel} this
     * @param {Ext.data.Store} store The store that was passed to the {@link #method-reconfigure} method
     * @param {Object[]} columns The column configs that were passed to the {@link #method-reconfigure} method
     */

    /**
     * @method reconfigure
     * Reconfigures the grid with a new store/columns. Either the store or the columns can be omitted if you don't wish
     * to change them.
     * @param {Ext.data.Store} store (Optional) The new store.
     * @param {Object[]} columns (Optional) An array of column configs
     */
});
/**
 * A simple class that provides the basic implementation needed to make any element a drop target that can have
 * draggable items dropped onto it.  The drop has no effect until an implementation of notifyDrop is provided.
 */
Ext.define('Ext.dd.DropTarget', {
    extend: 'Ext.dd.DDTarget',
    requires: ['Ext.dd.ScrollManager'],

    /**
     * Creates new DropTarget.
     * @param {String/HTMLElement/Ext.Element} el The container element or ID of it.
     * @param {Object} config
     */
    constructor : function(el, config){
        this.el = Ext.get(el);

        Ext.apply(this, config);

        if(this.containerScroll){
            Ext.dd.ScrollManager.register(this.el);
        }

        this.callParent([this.el.dom, this.ddGroup || this.group,
              {isTarget: true}]);
    },

    /**
     * @cfg {String} ddGroup
     * A named drag drop group to which this object belongs.  If a group is specified, then this object will only
     * interact with other drag drop objects in the same group.
     */
    /**
     * @cfg {String} [overClass=""]
     * The CSS class applied to the drop target element while the drag source is over it.
     */
    /**
     * @cfg {String} dropAllowed
     * The CSS class returned to the drag source when drop is allowed.
     */
    dropAllowed : Ext.baseCSSPrefix + 'dd-drop-ok',
    /**
     * @cfg {String} dropNotAllowed
     * The CSS class returned to the drag source when drop is not allowed.
     */
    dropNotAllowed : Ext.baseCSSPrefix + 'dd-drop-nodrop',

    // private
    isTarget : true,

    // private
    isNotifyTarget : true,

    /**
     * The function a {@link Ext.dd.DragSource} calls once to notify this drop target that the source is now over the
     * target.  This default implementation adds the CSS class specified by overClass (if any) to the drop element
     * and returns the dropAllowed config value.  This method should be overridden if drop validation is required.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop target
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Ext.dd.StatusProxy} can be updated
     */
    notifyEnter : function(dd, e, data){
        if(this.overClass){
            this.el.addCls(this.overClass);
        }
        return this.dropAllowed;
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls continuously while it is being dragged over the target.
     * This method will be called on every mouse movement while the drag source is over the drop target.
     * This default implementation simply returns the dropAllowed config value.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop target
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Ext.dd.StatusProxy} can be updated
     */
    notifyOver : function(dd, e, data){
        return this.dropAllowed;
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls once to notify this drop target that the source has been dragged
     * out of the target without dropping.  This default implementation simply removes the CSS class specified by
     * overClass (if any) from the drop element.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop target
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     */
    notifyOut : function(dd, e, data){
        if(this.overClass){
            this.el.removeCls(this.overClass);
        }
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls once to notify this drop target that the dragged item has
     * been dropped on it.  This method has no default implementation and returns false, so you must provide an
     * implementation that does something to process the drop event and returns true so that the drag source's
     * repair action does not run.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop target
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} False if the drop was invalid.
     */
    notifyDrop : function(dd, e, data){
        return false;
    },

    destroy : function(){
        this.callParent();
        if(this.containerScroll){
            Ext.dd.ScrollManager.unregister(this.el);
        }
    }
});

/**
 * This class provides a container DD instance that allows dropping on multiple child target nodes.
 *
 * By default, this class requires that child nodes accepting drop are registered with {@link Ext.dd.Registry}.
 * However a simpler way to allow a DropZone to manage any number of target elements is to configure the
 * DropZone with an implementation of {@link #getTargetFromEvent} which interrogates the passed
 * mouse event to see if it has taken place within an element, or class of elements. This is easily done
 * by using the event's {@link Ext.EventObject#getTarget getTarget} method to identify a node based on a
 * {@link Ext.DomQuery} selector.
 *
 * Once the DropZone has detected through calling getTargetFromEvent, that the mouse is over
 * a drop target, that target is passed as the first parameter to {@link #onNodeEnter}, {@link #onNodeOver},
 * {@link #onNodeOut}, {@link #onNodeDrop}. You may configure the instance of DropZone with implementations
 * of these methods to provide application-specific behaviour for these events to update both
 * application state, and UI state.
 *
 * For example to make a GridPanel a cooperating target with the example illustrated in
 * {@link Ext.dd.DragZone DragZone}, the following technique might be used:
 *
 *     myGridPanel.on('render', function() {
 *         myGridPanel.dropZone = new Ext.dd.DropZone(myGridPanel.getView().scroller, {
 *
 *             // If the mouse is over a grid row, return that node. This is
 *             // provided as the "target" parameter in all "onNodeXXXX" node event handling functions
 *             getTargetFromEvent: function(e) {
 *                 return e.getTarget(myGridPanel.getView().rowSelector);
 *             },
 *
 *             // On entry into a target node, highlight that node.
 *             onNodeEnter : function(target, dd, e, data){
 *                 Ext.fly(target).addCls('my-row-highlight-class');
 *             },
 *
 *             // On exit from a target node, unhighlight that node.
 *             onNodeOut : function(target, dd, e, data){
 *                 Ext.fly(target).removeCls('my-row-highlight-class');
 *             },
 *
 *             // While over a target node, return the default drop allowed class which
 *             // places a "tick" icon into the drag proxy.
 *             onNodeOver : function(target, dd, e, data){
 *                 return Ext.dd.DropZone.prototype.dropAllowed;
 *             },
 *
 *             // On node drop we can interrogate the target to find the underlying
 *             // application object that is the real target of the dragged data.
 *             // In this case, it is a Record in the GridPanel's Store.
 *             // We can use the data set up by the DragZone's getDragData method to read
 *             // any data we decided to attach in the DragZone's getDragData method.
 *             onNodeDrop : function(target, dd, e, data){
 *                 var rowIndex = myGridPanel.getView().findRowIndex(target);
 *                 var r = myGridPanel.getStore().getAt(rowIndex);
 *                 Ext.Msg.alert('Drop gesture', 'Dropped Record id ' + data.draggedRecord.id +
 *                     ' on Record id ' + r.id);
 *                 return true;
 *             }
 *         });
 *     }
 *
 * See the {@link Ext.dd.DragZone DragZone} documentation for details about building a DragZone which
 * cooperates with this DropZone.
 */
Ext.define('Ext.dd.DropZone', {
    extend: 'Ext.dd.DropTarget',
    requires: ['Ext.dd.Registry'],

    /**
     * Returns a custom data object associated with the DOM node that is the target of the event.  By default
     * this looks up the event target in the {@link Ext.dd.Registry}, although you can override this method to
     * provide your own custom lookup.
     * @param {Event} e The event
     * @return {Object} data The custom data
     */
    getTargetFromEvent : function(e){
        return Ext.dd.Registry.getTargetFromEvent(e);
    },

    /**
     * Called when the DropZone determines that a {@link Ext.dd.DragSource} has entered a drop node
     * that has either been registered or detected by a configured implementation of {@link #getTargetFromEvent}.
     * This method has no default implementation and should be overridden to provide
     * node-specific processing if necessary.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from 
     * {@link #getTargetFromEvent} for this node)
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     */
    onNodeEnter : function(n, dd, e, data){
        
    },

    /**
     * Called while the DropZone determines that a {@link Ext.dd.DragSource} is over a drop node
     * that has either been registered or detected by a configured implementation of {@link #getTargetFromEvent}.
     * The default implementation returns this.dropNotAllowed, so it should be
     * overridden to provide the proper feedback.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from
     * {@link #getTargetFromEvent} for this node)
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Ext.dd.StatusProxy} can be updated
     */
    onNodeOver : function(n, dd, e, data){
        return this.dropAllowed;
    },

    /**
     * Called when the DropZone determines that a {@link Ext.dd.DragSource} has been dragged out of
     * the drop node without dropping.  This method has no default implementation and should be overridden to provide
     * node-specific processing if necessary.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from
     * {@link #getTargetFromEvent} for this node)
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     */
    onNodeOut : function(n, dd, e, data){
        
    },

    /**
     * Called when the DropZone determines that a {@link Ext.dd.DragSource} has been dropped onto
     * the drop node.  The default implementation returns false, so it should be overridden to provide the
     * appropriate processing of the drop event and return true so that the drag source's repair action does not run.
     * @param {Object} nodeData The custom data associated with the drop node (this is the same value returned from
     * {@link #getTargetFromEvent} for this node)
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} True if the drop was valid, else false
     */
    onNodeDrop : function(n, dd, e, data){
        return false;
    },

    /**
     * Called while the DropZone determines that a {@link Ext.dd.DragSource} is being dragged over it,
     * but not over any of its registered drop nodes.  The default implementation returns this.dropNotAllowed, so
     * it should be overridden to provide the proper feedback if necessary.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Ext.dd.StatusProxy} can be updated
     */
    onContainerOver : function(dd, e, data){
        return this.dropNotAllowed;
    },

    /**
     * Called when the DropZone determines that a {@link Ext.dd.DragSource} has been dropped on it,
     * but not on any of its registered drop nodes.  The default implementation returns false, so it should be
     * overridden to provide the appropriate processing of the drop event if you need the drop zone itself to
     * be able to accept drops.  It should return true when valid so that the drag source's repair action does not run.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} True if the drop was valid, else false
     */
    onContainerDrop : function(dd, e, data){
        return false;
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls once to notify this drop zone that the source is now over
     * the zone.  The default implementation returns this.dropNotAllowed and expects that only registered drop
     * nodes can process drag drop operations, so if you need the drop zone itself to be able to process drops
     * you should override this method and provide a custom implementation.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Ext.dd.StatusProxy} can be updated
     */
    notifyEnter : function(dd, e, data){
        return this.dropNotAllowed;
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls continuously while it is being dragged over the drop zone.
     * This method will be called on every mouse movement while the drag source is over the drop zone.
     * It will call {@link #onNodeOver} while the drag source is over a registered node, and will also automatically
     * delegate to the appropriate node-specific methods as necessary when the drag source enters and exits
     * registered nodes ({@link #onNodeEnter}, {@link #onNodeOut}). If the drag source is not currently over a
     * registered node, it will call {@link #onContainerOver}.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {String} status The CSS class that communicates the drop status back to the source so that the
     * underlying {@link Ext.dd.StatusProxy} can be updated
     */
    notifyOver : function(dd, e, data){
        var n = this.getTargetFromEvent(e);
        if(!n) { // not over valid drop target
            if(this.lastOverNode){
                this.onNodeOut(this.lastOverNode, dd, e, data);
                this.lastOverNode = null;
            }
            return this.onContainerOver(dd, e, data);
        }
        if(this.lastOverNode != n){
            if(this.lastOverNode){
                this.onNodeOut(this.lastOverNode, dd, e, data);
            }
            this.onNodeEnter(n, dd, e, data);
            this.lastOverNode = n;
        }
        return this.onNodeOver(n, dd, e, data);
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls once to notify this drop zone that the source has been dragged
     * out of the zone without dropping.  If the drag source is currently over a registered node, the notification
     * will be delegated to {@link #onNodeOut} for node-specific handling, otherwise it will be ignored.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop target
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag zone
     */
    notifyOut : function(dd, e, data){
        if(this.lastOverNode){
            this.onNodeOut(this.lastOverNode, dd, e, data);
            this.lastOverNode = null;
        }
    },

    /**
     * The function a {@link Ext.dd.DragSource} calls once to notify this drop zone that the dragged item has
     * been dropped on it.  The drag zone will look up the target node based on the event passed in, and if there
     * is a node registered for that event, it will delegate to {@link #onNodeDrop} for node-specific handling,
     * otherwise it will call {@link #onContainerDrop}.
     * @param {Ext.dd.DragSource} source The drag source that was dragged over this drop zone
     * @param {Event} e The event
     * @param {Object} data An object containing arbitrary data supplied by the drag source
     * @return {Boolean} False if the drop was invalid.
     */
    notifyDrop : function(dd, e, data){
        if(this.lastOverNode){
            this.onNodeOut(this.lastOverNode, dd, e, data);
            this.lastOverNode = null;
        }
        var n = this.getTargetFromEvent(e);
        return n ?
            this.onNodeDrop(n, dd, e, data) :
            this.onContainerDrop(dd, e, data);
    },

    // private
    triggerCacheRefresh : function() {
        Ext.dd.DDM.refreshCache(this.groups);
    }
});
/**
 * @private
 */
Ext.define('Ext.grid.header.DropZone', {
    extend: 'Ext.dd.DropZone',
    colHeaderCls: Ext.baseCSSPrefix + 'column-header',
    proxyOffsets: [-4, -9],

    constructor: function(headerCt){
        this.headerCt = headerCt;
        this.ddGroup = this.getDDGroup();
        this.callParent([headerCt.el]);
    },

    getDDGroup: function() {
        return 'header-dd-zone-' + this.headerCt.up('[scrollerOwner]').id;
    },

    getTargetFromEvent : function(e){
        return e.getTarget('.' + this.colHeaderCls);
    },

    getTopIndicator: function() {
        if (!this.topIndicator) {
            this.topIndicator = Ext.DomHelper.append(Ext.getBody(), {
                cls: "col-move-top",
                html: "&#160;"
            }, true);
        }
        return this.topIndicator;
    },

    getBottomIndicator: function() {
        if (!this.bottomIndicator) {
            this.bottomIndicator = Ext.DomHelper.append(Ext.getBody(), {
                cls: "col-move-bottom",
                html: "&#160;"
            }, true);
        }
        return this.bottomIndicator;
    },

    getLocation: function(e, t) {
        var x      = e.getXY()[0],
            region = Ext.fly(t).getRegion(),
            pos, header;

        if ((region.right - x) <= (region.right - region.left) / 2) {
            pos = "after";
        } else {
            pos = "before";
        }
        return {
            pos: pos,
            header: Ext.getCmp(t.id),
            node: t
        };
    },

    positionIndicator: function(draggedHeader, node, e){
        var location = this.getLocation(e, node),
            header = location.header,
            pos    = location.pos,
            nextHd = draggedHeader.nextSibling('gridcolumn:not([hidden])'),
            prevHd = draggedHeader.previousSibling('gridcolumn:not([hidden])'),
            region, topIndicator, bottomIndicator, topAnchor, bottomAnchor,
            topXY, bottomXY, headerCtEl, minX, maxX,
            allDropZones, ln, i, dropZone;

        // Cannot drag beyond non-draggable start column
        if (!header.draggable && header.getIndex() === 0) {
            return false;
        }

        this.lastLocation = location;

        if ((draggedHeader !== header) &&
            ((pos === "before" && nextHd !== header) ||
            (pos === "after" && prevHd !== header)) &&
            !header.isDescendantOf(draggedHeader)) {

            // As we move in between different DropZones that are in the same
            // group (such as the case when in a locked grid), invalidateDrop
            // on the other dropZones.
            allDropZones = Ext.dd.DragDropManager.getRelated(this);
            ln = allDropZones.length;
            i  = 0;

            for (; i < ln; i++) {
                dropZone = allDropZones[i];
                if (dropZone !== this && dropZone.invalidateDrop) {
                    dropZone.invalidateDrop();
                }
            }


            this.valid = true;
            topIndicator = this.getTopIndicator();
            bottomIndicator = this.getBottomIndicator();
            if (pos === 'before') {
                topAnchor = 'tl';
                bottomAnchor = 'bl';
            } else {
                topAnchor = 'tr';
                bottomAnchor = 'br';
            }
            topXY = header.el.getAnchorXY(topAnchor);
            bottomXY = header.el.getAnchorXY(bottomAnchor);

            // constrain the indicators to the viewable section
            headerCtEl = this.headerCt.el;
            minX = headerCtEl.getLeft();
            maxX = headerCtEl.getRight();

            topXY[0] = Ext.Number.constrain(topXY[0], minX, maxX);
            bottomXY[0] = Ext.Number.constrain(bottomXY[0], minX, maxX);

            // adjust by offsets, this is to center the arrows so that they point
            // at the split point
            topXY[0] -= 4;
            topXY[1] -= 9;
            bottomXY[0] -= 4;

            // position and show indicators
            topIndicator.setXY(topXY);
            bottomIndicator.setXY(bottomXY);
            topIndicator.show();
            bottomIndicator.show();
        // invalidate drop operation and hide indicators
        } else {
            this.invalidateDrop();
        }
    },

    invalidateDrop: function() {
        this.valid = false;
        this.hideIndicators();
    },

    onNodeOver: function(node, dragZone, e, data) {
        var me = this,
            header = me.headerCt,
            doPosition = true,
            from = data.header,
            to;
            
        if (data.header.el.dom === node) {
            doPosition = false;
        } else {
            to = me.getLocation(e, node).header;
            doPosition = (from.ownerCt === to.ownerCt) || (!from.ownerCt.sealed && !to.ownerCt.sealed);
        }
        
        if (doPosition) {
            me.positionIndicator(data.header, node, e);
        } else {
            me.valid = false;
        }
        return me.valid ? me.dropAllowed : me.dropNotAllowed;
    },

    hideIndicators: function() {
        this.getTopIndicator().hide();
        this.getBottomIndicator().hide();
    },

    onNodeOut: function() {
        this.hideIndicators();
    },

    onNodeDrop: function(node, dragZone, e, data) {
        if (this.valid) {
            this.invalidateDrop();
            var dragHeader   = data.header,
                lastLocation = this.lastLocation,
                targetHeader = lastLocation.header,
                fromCt       = dragHeader.ownerCt,
                localFromIdx = fromCt.items.indexOf(dragHeader), // Container.items is a MixedCollection
                toCt         = targetHeader.ownerCt,
                localToIdx   = toCt.items.indexOf(targetHeader),
                headerCt     = this.headerCt,
                fromIdx      = headerCt.getHeaderIndex(dragHeader),
                colsToMove   = dragHeader.isGroupHeader ? dragHeader.query(':not([isGroupHeader])').length : 1,
                toIdx        = headerCt.getHeaderIndex(targetHeader),
                groupCt,
                scrollerOwner;

            // Drop position is to the right of the targetHeader, increment the toIdx correctly
            if (lastLocation.pos === 'after') {
                localToIdx++;
                toIdx += targetHeader.isGroupHeader ? targetHeader.query(':not([isGroupHeader])').length : 1;
            }

            // If we are dragging in between two HeaderContainers that have had the lockable
            // mixin injected we will lock/unlock headers in between sections. Note that lockable
            // does NOT currently support grouped headers.
            if (fromCt !== toCt && fromCt.lockableInjected && toCt.lockableInjected && toCt.lockedCt) {
                scrollerOwner = fromCt.up('[scrollerOwner]');
                scrollerOwner.lock(dragHeader, localToIdx);
            } else if (fromCt !== toCt && fromCt.lockableInjected && toCt.lockableInjected && fromCt.lockedCt) {
                scrollerOwner = fromCt.up('[scrollerOwner]');
                scrollerOwner.unlock(dragHeader, localToIdx);
            } else {
                // If dragging rightwards, then after removal, the insertion index will be less when moving
                // within the same container.
                if ((fromCt === toCt) && (localToIdx > localFromIdx)) {

                    // Wer're dragging whole headers, so locally, the adjustment is only one
                    localToIdx -= 1;
                }

                // Suspend layouts while we sort all this out.
                Ext.suspendLayouts();

                // Remove dragged header from where it was.
                if (fromCt !== toCt) {
                    fromCt.remove(dragHeader, false);

                    // Dragged the last header out of the fromCt group... The fromCt group must die
                    if (fromCt.isGroupHeader) {
                        if (!fromCt.items.getCount()) {
                            groupCt = fromCt.ownerCt;
                            groupCt.remove(fromCt, false);
                            fromCt.el.dom.parentNode.removeChild(fromCt.el.dom);
                        }
                    }
                }

                // Move dragged header into its drop position
                if (fromCt === toCt) {
                    toCt.move(localFromIdx, localToIdx);
                } else {
                    toCt.insert(localToIdx, dragHeader);
                }

                // Group headers acquire the aggregate width of their child headers
                // Therefore a child header may not flex; it must contribute a fixed width.
                // But we restore the flex value when moving back into the main header container
                if (toCt.isGroupHeader) {
                    // Adjust the width of the "to" group header only if we dragged in from somewhere else.
                    if (toCt !== fromCt) {
                        dragHeader.savedFlex = dragHeader.flex;
                        delete dragHeader.flex;
                        dragHeader.width = dragHeader.getWidth();
                    }
                } else {
                    if (dragHeader.savedFlex) {
                        dragHeader.flex = dragHeader.savedFlex;
                        delete dragHeader.width;
                    }
                }

                // Refresh columns cache in case we remove an emptied group column
                headerCt.purgeCache();
                Ext.resumeLayouts(true);
                headerCt.onHeaderMoved(dragHeader, colsToMove, fromIdx, toIdx);

                // Emptied group header can only be destroyed after the header and grid have been refreshed
                if (!fromCt.items.getCount()) {
                    fromCt.destroy();
                }
            }
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.grid.plugin.HeaderReorderer', {
    extend: 'Ext.util.Observable',
    requires: ['Ext.grid.header.DragZone', 'Ext.grid.header.DropZone'],
    alias: 'plugin.gridheaderreorderer',

    init: function(headerCt) {
        this.headerCt = headerCt;
        headerCt.on({
            render: this.onHeaderCtRender,
            single: true,
            scope: this
        });
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        Ext.destroy(this.dragZone, this.dropZone);
    },

    onHeaderCtRender: function() {
        var me = this;
        
        me.dragZone = new Ext.grid.header.DragZone(me.headerCt);
        me.dropZone = new Ext.grid.header.DropZone(me.headerCt);
        if (me.disabled) {
            me.dragZone.disable();
        }
    },
    
    enable: function() {
        this.disabled = false;
        if (this.dragZone) {
            this.dragZone.enable();
        }
    },
    
    disable: function() {
        this.disabled = true;
        if (this.dragZone) {
            this.dragZone.disable();
        }
    }
});

/**
 * Container which holds headers and is docked at the top or bottom of a TablePanel.
 * The HeaderContainer drives resizing/moving/hiding of columns within the TableView.
 * As headers are hidden, moved or resized the headercontainer is responsible for
 * triggering changes within the view.
 */
Ext.define('Ext.grid.header.Container', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.grid.ColumnLayout',
        'Ext.grid.plugin.HeaderResizer',
        'Ext.grid.plugin.HeaderReorderer'
    ],
    uses: [
        'Ext.grid.column.Column',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.menu.Separator'
    ],
    border: true,

    alias: 'widget.headercontainer',

    baseCls: Ext.baseCSSPrefix + 'grid-header-ct',
    dock: 'top',

    /**
     * @cfg {Number} weight
     * HeaderContainer overrides the default weight of 0 for all docked items to 100.
     * This is so that it has more priority over things like toolbars.
     */
    weight: 100,

    defaultType: 'gridcolumn',
    
    detachOnRemove: false,

    /**
     * @cfg {Number} defaultWidth
     * Width of the header if no width or flex is specified.
     */
    defaultWidth: 100,
    
    /**
     * @cfg {Boolean} [sealed=false]
     * Specify as `true` to constrain column dragging so that a column cannot be dragged into or out of this column.
     *
     * **Note that this config is only valid for column headers which contain child column headers, eg:**
     *     {
     *         sealed: true
     *         text: 'ExtJS',
     *         columns: [{
     *             text: '3.0.4',
     *             dataIndex: 'ext304'
     *         }, {
     *             text: '4.1.0',
     *             dataIndex: 'ext410'
     *         }
     *     }
     *
     */

    //<locale>
    sortAscText: 'Sort Ascending',
    //</locale>
    //<locale>
    sortDescText: 'Sort Descending',
    //</locale>
    //<locale>
    sortClearText: 'Clear Sort',
    //</locale>
    //<locale>
    columnsText: 'Columns',
    //</locale>

    headerOpenCls: Ext.baseCSSPrefix + 'column-header-open',

    // private; will probably be removed by 4.0
    triStateSort: false,

    ddLock: false,

    dragging: false,

    /**
     * @property {Boolean} isGroupHeader
     * True if this HeaderContainer is in fact a group header which contains sub headers.
     */

    /**
     * @cfg {Boolean} sortable
     * Provides the default sortable state for all Headers within this HeaderContainer.
     * Also turns on or off the menus in the HeaderContainer. Note that the menu is
     * shared across every header and therefore turning it off will remove the menu
     * items for every header.
     */
    sortable: true,

    initComponent: function() {
        var me = this;

        me.headerCounter = 0;
        me.plugins = me.plugins || [];

        // TODO: Pass in configurations to turn on/off dynamic
        //       resizing and disable resizing all together

        // Only set up a Resizer and Reorderer for the topmost HeaderContainer.
        // Nested Group Headers are themselves HeaderContainers
        if (!me.isHeader) {
            if (me.enableColumnResize) {
                me.resizer = new Ext.grid.plugin.HeaderResizer();
                me.plugins.push(me.resizer);
            }
            if (me.enableColumnMove) {
                me.reorderer = new Ext.grid.plugin.HeaderReorderer();
                me.plugins.push(me.reorderer);
            }
        }

        // Base headers do not need a box layout
        if (me.isHeader && !me.items) {
            me.layout = me.layout || 'auto';
        }
        // HeaderContainer and Group header needs a gridcolumn layout.
        else {
            me.layout = Ext.apply({
                type: 'gridcolumn',
                align: 'stretchmax'
            }, me.initialConfig.layout);
        }
        me.defaults = me.defaults || {};
        Ext.applyIf(me.defaults, {
            triStateSort: me.triStateSort,
            sortable: me.sortable
        });
        
        me.menuTask = new Ext.util.DelayedTask(me.updateMenuDisabledState, me);
        me.callParent();
        me.addEvents(
            /**
             * @event columnresize
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             * @param {Number} width
             */
            'columnresize',

            /**
             * @event headerclick
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             * @param {Ext.EventObject} e
             * @param {HTMLElement} t
             */
            'headerclick',

            /**
             * @event headertriggerclick
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             * @param {Ext.EventObject} e
             * @param {HTMLElement} t
             */
            'headertriggerclick',

            /**
             * @event columnmove
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             * @param {Number} fromIdx
             * @param {Number} toIdx
             */
            'columnmove',
            /**
             * @event columnhide
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             */
            'columnhide',
            /**
             * @event columnshow
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             */
            'columnshow',
            /**
             * @event sortchange
             * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
             * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
             * @param {String} direction
             */
            'sortchange',
            /**
             * @event menucreate
             * Fired immediately after the column header menu is created.
             * @param {Ext.grid.header.Container} ct This instance
             * @param {Ext.menu.Menu} menu The Menu that was created
             */
            'menucreate'
        );
    },

    onDestroy: function() {
        var me = this;
        
        me.menuTask.cancel();
        Ext.destroy(me.resizer, me.reorderer);
        me.callParent();
    },

    applyColumnsState: function(columns) {
        if (!columns || !columns.length) {
            return;
        }

        var me     = this,
            items  = me.items.items,
            count  = items.length,
            i      = 0,
            length = columns.length,
            c, col, columnState, index;

        for (c = 0; c < length; c++) {
            columnState = columns[c];

            for (index = count; index--; ) {
                col = items[index];
                if (col.getStateId && col.getStateId() == columnState.id) {
                    // If a column in the new grid matches up with a saved state...
                    // Ensure that the column is restored to the state order.
                    // i is incremented upon every column match, so all persistent
                    // columns are ordered before any new columns.
                    if (i !== index) {
                        me.moveHeader(index, i);
                    }

                    if (col.applyColumnState) {
                        col.applyColumnState(columnState);
                    }
                    ++i;
                    break;
                }
            }
        }
    },

    getColumnsState: function () {
        var me = this,
            columns = [],
            state;

        me.items.each(function (col) {
            state = col.getColumnState && col.getColumnState();
            if (state) {
                columns.push(state);
            }
        });

        return columns;
    },

    // Invalidate column cache on add
    // We cannot refresh the View on every add because this method is called
    // when the HeaderDropZone moves Headers around, that will also refresh the view
    onAdd: function(c) {
        var me = this;
        if (!c.headerId) {
            c.headerId = c.initialConfig.id || Ext.id(null, 'header-');
        }

        if (!c.stateId) {
            // This was the headerId generated in 4.0, so to preserve saved state, we now
            // assign a default stateId in that same manner. The stateId's of a column are
            // not global at the stateProvider, but are local to the grid state data. The
            // headerId should still follow our standard naming convention.
            c.stateId = c.initialConfig.id || ('h' + (++me.headerCounter));
        }

        if (Ext.global.console && Ext.global.console.warn) {
            if (!me._usedIDs) {
                me._usedIDs = {};
            }
            if (me._usedIDs[c.headerId]) {
                Ext.global.console.warn(this.$className, 'attempted to reuse an existing id', c.headerId);
            }
            me._usedIDs[c.headerId] = true;
        }
        me.callParent(arguments);
        me.purgeCache();
    },

    // Invalidate column cache on remove
    // We cannot refresh the View on every remove because this method is called
    // when the HeaderDropZone moves Headers around, that will also refresh the view
    onRemove: function(c) {
        var me = this;
        me.callParent(arguments);
        me.purgeCache();
    },

    // @private
    applyDefaults: function(config) {
        var ret; 
        /*
         * Ensure header.Container defaults don't get applied to a RowNumberer 
         * if an xtype is supplied. This isn't an ideal solution however it's 
         * much more likely that a RowNumberer with no options will be created, 
         * wanting to use the defaults specified on the class as opposed to 
         * those setup on the Container.
         */
        if (config && !config.isComponent && config.xtype == 'rownumberer') {
            ret = config;
        } else {
            ret = this.callParent(arguments);
            if (!('width' in ret) && !ret.flex) {
                ret.width = this.defaultWidth;
            }
        }
        return ret;
    },

    afterRender: function() {
        this.callParent();
        this.setSortState();
        
    },
    
    setSortState: function(){
        var store   = this.up('[store]').store,
            sorters = store.sorters,
            first   = sorters.first(),
            hd;

        if (first) {
            hd = this.down('gridcolumn[dataIndex=' + first.property  +']');
            if (hd) {
                hd.setSortState(first.direction, false, true);
            }
        }
    },
    
    getHeaderMenu: function(){
        var menu = this.getMenu(),
            item;
            
        if (menu) {
            item = menu.child('#columnItem');
            if (item) {
                return item.menu;
            }
        }   
        return null; 
    },
    
    onHeaderVisibilityChange: function(header, visible){
        var me = this,
            menu = me.getHeaderMenu(),
            item;
        
        if (menu) {
            // If the header was hidden programmatically, sync the Menu state
            item = me.getMenuItemForHeader(menu, header);
            if (item) {
                item.setChecked(visible, true);
            }
            // delay this since the headers may fire a number of times if we're hiding/showing groups
            me.menuTask.delay(50);
        }
    },
    
    /**
     * @private
     * Gets all "leaf" menu nodes and returns the checked count for those leaves.
     * Only includes columns that are hideable via the menu
     */
    getLeafMenuItems: function() {
        var me = this,
            columns = me.getGridColumns(),
            items = [],
            i = 0,
            count = 0,
            len = columns.length,
            menu = me.getMenu(),
            item;
            
        for (; i < len; ++i) {
            item = columns[i];
            if (item.hideable) {
                item = me.getMenuItemForHeader(menu, item);
                if (item) {
                    items.push(item);
                    if (item.checked) {
                        ++count;
                    }
                }
            }
        }
        
        return {
            items: items,
            checkedCount: count    
        };
    },
    
    updateMenuDisabledState: function(){
        var me = this,
            result = me.getLeafMenuItems(),
            total = result.checkedCount,
            items = result.items,
            len = items.length,
            i = 0,
            rootItem = me.getMenu().child('#columnItem');
            
        if (total <= 1) {
            // only one column visible, prevent hiding of the remaining item
            me.disableMenuItems(rootItem, Ext.ComponentQuery.query('[checked=true]', items)[0]);
        } else {
            // at least 2 visible, set the state appropriately
            for (; i < len; ++i) {
                me.setMenuItemState(total, rootItem, items[i]);
            }
        }
    },
    
    disableMenuItems: function(rootItem, item){
        while (item && item != rootItem) {
            item.disableCheckChange();
            item = item.parentMenu.ownerItem;
        }
    },
    
    setMenuItemState: function(total, rootItem, item){
        var parentMenu,
            checkedChildren;
            
        while (item && item != rootItem) {
            parentMenu = item.parentMenu;
            checkedChildren = item.parentMenu.query('[checked=true]:not([menu])').length;
            item.enableCheckChange();
            item = parentMenu.ownerItem;
            if (checkedChildren === total) {
                // contains all the checked children, jump out the item and all parents
                break;
            }
        }
        
        // while we're not at the top, disable from the current item up
        this.disableMenuItems(rootItem, item);
    },
    
    getMenuItemForHeader: function(menu, header){
        return header ? menu.down('menucheckitem[headerId=' + header.id + ']') : null;
    },

    onHeaderShow: function(header) {
        // Pass up to the GridSection
        var me = this,
            gridSection = me.ownerCt;

        me.onHeaderVisibilityChange(header, true);

        // Only update the grid UI when we are notified about base level Header shows;
        // Group header shows just cause a layout of the HeaderContainer
        if (!header.isGroupHeader) {
            if (me.view) {
                me.view.onHeaderShow(me, header, true);
            }
            if (gridSection) {
                gridSection.onHeaderShow(me, header);
            }
        }
        me.fireEvent('columnshow', me, header);
        me.updateLayout();
    },

    onHeaderHide: function(header) {
        // Pass up to the GridSection
        var me = this,
            gridSection = me.ownerCt;

        me.onHeaderVisibilityChange(header, false);

        // Only update the UI when we are notified about base level Header hides;
        if (!header.isGroupHeader) {
            if (me.view) {
                me.view.ignoreTemplate = true;
                me.view.onHeaderHide(me, header, true);
                me.view.ignoreTemplate = false;
            }
            if (gridSection) {
                gridSection.onHeaderHide(me, header);
            }
            me.updateLayout();
        }
        me.fireEvent('columnhide', me, header);
    },

    /**
     * Temporarily lock the headerCt. This makes it so that clicking on headers
     * don't trigger actions like sorting or opening of the header menu. This is
     * done because extraneous events may be fired on the headers after interacting
     * with a drag drop operation.
     * @private
     */
    tempLock: function() {
        this.ddLock = true;
        Ext.Function.defer(function() {
            this.ddLock = false;
        }, 200, this);
    },

    onHeaderResize: function(header, w, suppressFocus) {
        var me = this,
            view = me.view,
            gridSection = me.ownerCt,
            viewEl;

        // Do not react to header sizing during initial Panel layout when there is no view content to size.
        if (view && (viewEl = view.el) && viewEl.dom.firstChild) {
            me.tempLock();
            view.onHeaderResize(header, w, suppressFocus);
            if (gridSection) {
                gridSection.onHeaderResize(me, header, w);
            }
        }
        me.fireEvent('columnresize', this, header, w);
    },

    onHeaderClick: function(header, e, t) {
        header.fireEvent('headerclick', this, header, e, t);
        this.fireEvent("headerclick", this, header, e, t);
    },

    onHeaderTriggerClick: function(header, e, t) {
        // generate and cache menu, provide ability to cancel/etc
        var me = this;
        if (header.fireEvent('headertriggerclick', me, header, e, t) !== false && me.fireEvent("headertriggerclick", me, header, e, t) !== false) {
            me.showMenuBy(t, header);
        }
    },

    showMenuBy: function(t, header) {
        var menu = this.getMenu(),
            ascItem  = menu.down('#ascItem'),
            descItem = menu.down('#descItem'),
            sortableMth;

        menu.activeHeader = menu.ownerCt = header;
        menu.setFloatParent(header);
        // TODO: remove coupling to Header's titleContainer el
        header.titleEl.addCls(this.headerOpenCls);

        // enable or disable asc & desc menu items based on header being sortable
        sortableMth = header.sortable ? 'enable' : 'disable';
        if (ascItem) {
            ascItem[sortableMth]();
        }
        if (descItem) {
            descItem[sortableMth]();
        }
        menu.showBy(t);
    },

    // remove the trigger open class when the menu is hidden
    onMenuDeactivate: function() {
        var menu = this.getMenu();
        // TODO: remove coupling to Header's titleContainer el
        menu.activeHeader.titleEl.removeCls(this.headerOpenCls);
    },

    moveHeader: function(fromIdx, toIdx) {

        // An automatically expiring lock
        this.tempLock();
        this.onHeaderMoved(this.move(fromIdx, toIdx), fromIdx, toIdx);
    },

    purgeCache: function() {
        var me = this;
        // Delete column cache - column order has changed.
        delete me.gridDataColumns;
        delete me.hideableColumns;

        // Menu changes when columns are moved. It will be recreated.
        if (me.menu) {
            // Must hide before destroy so that trigger el is deactivated
            me.menu.hide();
            me.menu.destroy();
            delete me.menu;
        }
    },

    onHeaderMoved: function(header, colsToMove, fromIdx, toIdx) {
        var me = this,
            gridSection = me.ownerCt;

        if (gridSection && gridSection.onHeaderMove) {
            gridSection.onHeaderMove(me, header, colsToMove, fromIdx, toIdx);
        }
        me.fireEvent("columnmove", me, header, fromIdx, toIdx);
    },

    /**
     * Gets the menu (and will create it if it doesn't already exist)
     * @private
     */
    getMenu: function() {
        var me = this;

        if (!me.menu) {
            me.menu = new Ext.menu.Menu({
                hideOnParentHide: false,  // Persists when owning ColumnHeader is hidden
                items: me.getMenuItems(),
                listeners: {
                    deactivate: me.onMenuDeactivate,
                    scope: me
                }
            });
            me.updateMenuDisabledState();
            me.fireEvent('menucreate', me, me.menu);
        }
        return me.menu;
    },

    /**
     * Returns an array of menu items to be placed into the shared menu
     * across all headers in this header container.
     * @returns {Array} menuItems
     */
    getMenuItems: function() {
        var me = this,
            menuItems = [],
            hideableColumns = me.enableColumnHide ? me.getColumnMenu(me) : null;

        if (me.sortable) {
            menuItems = [{
                itemId: 'ascItem',
                text: me.sortAscText,
                cls: Ext.baseCSSPrefix + 'hmenu-sort-asc',
                handler: me.onSortAscClick,
                scope: me
            },{
                itemId: 'descItem',
                text: me.sortDescText,
                cls: Ext.baseCSSPrefix + 'hmenu-sort-desc',
                handler: me.onSortDescClick,
                scope: me
            }];
        }
        if (hideableColumns && hideableColumns.length) {
            menuItems.push('-', {
                itemId: 'columnItem',
                text: me.columnsText,
                cls: Ext.baseCSSPrefix + 'cols-icon',
                menu: hideableColumns
            });
        }
        return menuItems;
    },

    // sort asc when clicking on item in menu
    onSortAscClick: function() {
        var menu = this.getMenu(),
            activeHeader = menu.activeHeader;

        activeHeader.setSortState('ASC');
    },

    // sort desc when clicking on item in menu
    onSortDescClick: function() {
        var menu = this.getMenu(),
            activeHeader = menu.activeHeader;

        activeHeader.setSortState('DESC');
    },

    /**
     * Returns an array of menu CheckItems corresponding to all immediate children
     * of the passed Container which have been configured as hideable.
     */
    getColumnMenu: function(headerContainer) {
        var menuItems = [],
            i = 0,
            item,
            items = headerContainer.query('>gridcolumn[hideable]'),
            itemsLn = items.length,
            menuItem;

        for (; i < itemsLn; i++) {
            item = items[i];
            menuItem = new Ext.menu.CheckItem({
                text: item.menuText || item.text,
                checked: !item.hidden,
                hideOnClick: false,
                headerId: item.id,
                menu: item.isGroupHeader ? this.getColumnMenu(item) : undefined,
                checkHandler: this.onColumnCheckChange,
                scope: this
            });
            menuItems.push(menuItem);

            // If the header is ever destroyed - for instance by dragging out the last remaining sub header,
            // then the associated menu item must also be destroyed.
            item.on({
                destroy: Ext.Function.bind(menuItem.destroy, menuItem)
            });
        }
        return menuItems;
    },

    onColumnCheckChange: function(checkItem, checked) {
        var header = Ext.getCmp(checkItem.headerId);
        header[checked ? 'show' : 'hide']();
    },

    /**
     * Get the columns used for generating a template via TableChunker.
     * Returns an array of all columns and their
     *
     *  - dataIndex
     *  - align
     *  - width
     *  - id
     *  - columnId - used to create an identifying CSS class
     *  - cls The tdCls configuration from the Column object
     *
     * @private
     */
    getColumnsForTpl: function(flushCache) {
        var cols    = [],
            headers   = this.getGridColumns(flushCache),
            headersLn = headers.length,
            i = 0,
            header,
            width;

        for (; i < headersLn; i++) {
            header = headers[i];

            if (header.hidden || header.up('headercontainer[hidden=true]')) {
                width = 0;
            } else {
                width = header.getDesiredWidth();
            }
            cols.push({
                dataIndex: header.dataIndex,
                align: header.align,
                width: width,
                id: header.id,
                cls: header.tdCls,
                columnId: header.getItemId()
            });
        }
        return cols;
    },

    /**
     * Returns the number of <b>grid columns</b> descended from this HeaderContainer.
     * Group Columns are HeaderContainers. All grid columns are returned, including hidden ones.
     */
    getColumnCount: function() {
        return this.getGridColumns().length;
    },

    /**
     * Gets the full width of all columns that are visible.
     */
    getFullWidth: function(flushCache) {
        var fullWidth = 0,
            headers = this.getVisibleGridColumns(flushCache),
            headersLn = headers.length,
            i = 0,
            header;
           

        for (; i < headersLn; i++) {
            header = headers[i];
            // use headers getDesiredWidth if its there
            if (header.getDesiredWidth) {
                fullWidth += header.getDesiredWidth() || 0;
            // if injected a diff cmp use getWidth
            } else {
                fullWidth += header.getWidth();
            }
        }
        return fullWidth;
    },

    // invoked internally by a header when not using triStateSorting
    clearOtherSortStates: function(activeHeader) {
        var headers   = this.getGridColumns(),
            headersLn = headers.length,
            i         = 0;

        for (; i < headersLn; i++) {
            if (headers[i] !== activeHeader) {
                // unset the sortstate and dont recurse
                headers[i].setSortState(null, true);
            }
        }
    },

    /**
     * Returns an array of the **visible** columns in the grid. This goes down to the lowest column header
     * level, and does not return **grouped** headers which contain sub headers.
     * @param {Boolean} refreshCache If omitted, the cached set of columns will be returned. Pass true to refresh the cache.
     * @returns {Array}
     */
    getVisibleGridColumns: function(refreshCache) {
        return Ext.ComponentQuery.query(':not([hidden])', this.getGridColumns(refreshCache));
    }, 

    /**
     * Returns an array of all columns which map to Store fields. This goes down to the lowest column header
     * level, and does not return **grouped** headers which contain sub headers.
     * @param {Boolean} refreshCache If omitted, the cached set of columns will be returned. Pass true to refresh the cache.
     * @returns {Array}
     */
    getGridColumns: function(refreshCache) {
        var me = this,
            result = refreshCache ? null : me.gridDataColumns;

        // Not already got the column cache, so collect the base columns
        if (!result) {
            me.gridDataColumns = result = [];
            me.cascade(function(c) {
                if ((c !== me) && !c.isGroupHeader) {
                    result.push(c);
                }
            });
        }

        return result;
    },

    /**
     * @private
     * For use by column headers in determining whether there are any hideable columns when deciding whether or not
     * the header menu should be disabled.
     */
    getHideableColumns: function(refreshCache) {
        var me = this,
            result = refreshCache ? null : me.hideableColumns;

        if (!result) {
            result = me.hideableColumns = me.query('[hideable]');
        }
        return result;
    },

    /**
     * Returns the index of a leaf level header regardless of what the nesting
     * structure is.
     *
     * If a group header is passed, the index of the first leaf level heder within it is returned.
     *
     * @param {Ext.grid.column.Column} header The header to find the index of
     * @return {Number} The index of the specified column header
     */
    getHeaderIndex: function(header) {
        // If we are being asked the index of a group header, find the first leaf header node, and return the index of that
        if (header.isGroupHeader) {
            header = header.down(':not([isgroupHeader])');
        }
        return Ext.Array.indexOf(this.getGridColumns(), header);
    },

    /**
     * Get a leaf level header by index regardless of what the nesting
     * structure is.
     * @param {Number} The column index for which to retrieve the column.
     */
    getHeaderAtIndex: function(index) {
        var columns = this.getGridColumns();
        return columns.length ? columns[index] : null;
    },

    /**
     * When passed a column index, returns the closet *visible* column to that. If the column at the passed index is visible,
     * that is returned. If it is hidden, either the next visible, or the previous visible column is returned.
     * @param {Number} index Position at which to find the closest visible column.
     */
    getVisibleHeaderClosestToIndex: function(index) {
        var result = this.getHeaderAtIndex(index);
        if (result && result.hidden) {
            result = result.next(':not([hidden])') || result.next(':not([hidden])');
        }
        return result;
    },

    /**
     * Maps the record data to base it on the header id's.
     * This correlates to the markup/template generated by
     * TableChunker.
     */
    prepareData: function(data, rowIdx, record, view, panel) {
        var me        = this,
            obj       = {},
            headers   = me.gridDataColumns || me.getGridColumns(),
            headersLn = headers.length,
            colIdx    = 0,
            header,
            headerId,
            renderer,
            value,
            metaData,
            store = panel.store;

        for (; colIdx < headersLn; colIdx++) {
            metaData = {
                tdCls: '',
                style: ''
            };
            header = headers[colIdx];
            headerId = header.id;
            renderer = header.renderer;
            value = data[header.dataIndex];

            if (typeof renderer == "function") {
                value = renderer.call(
                    header.scope || me.ownerCt,
                    value,
                    // metadata per cell passing an obj by reference so that
                    // it can be manipulated inside the renderer
                    metaData,
                    record,
                    rowIdx,
                    colIdx,
                    store,
                    view
                );
            }

            if (metaData.css) {
                // This warning attribute is used by the compat layer
                obj.cssWarning = true;
                metaData.tdCls = metaData.css;
                delete metaData.css;
            }
            if (me.markDirty) {
                obj[headerId + '-modified'] = record.isModified(header.dataIndex) ? Ext.baseCSSPrefix + 'grid-dirty-cell' : '';
            }
            obj[headerId+'-tdCls'] = metaData.tdCls;
            obj[headerId+'-tdAttr'] = metaData.tdAttr;
            obj[headerId+'-style'] = metaData.style;
            if (typeof value === 'undefined' || value === null || value === '') {
                value = header.emptyCellText;
            }
            obj[headerId] = value;
        }
        return obj;
    },

    expandToFit: function(header) {
        var view = this.view;
        if (view) {
            view.expandToFit(header);
        }
    }
});

/**
 * This class specifies the definition for a column inside a {@link Ext.grid.Panel}. It encompasses
 * both the grid header configuration as well as displaying data within the grid itself. If the
 * {@link #columns} configuration is specified, this column will become a column group and can
 * contain other columns inside. In general, this class will not be created directly, rather
 * an array of column configurations will be passed to the grid:
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['firstname', 'lastname', 'seniority', 'dep', 'hired'],
 *         data:[
 *             {firstname:"Michael", lastname:"Scott", seniority:7, dep:"Management", hired:"01/10/2004"},
 *             {firstname:"Dwight", lastname:"Schrute", seniority:2, dep:"Sales", hired:"04/01/2004"},
 *             {firstname:"Jim", lastname:"Halpert", seniority:3, dep:"Sales", hired:"02/22/2006"},
 *             {firstname:"Kevin", lastname:"Malone", seniority:4, dep:"Accounting", hired:"06/10/2007"},
 *             {firstname:"Angela", lastname:"Martin", seniority:5, dep:"Accounting", hired:"10/21/2008"}
 *         ]
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Column Demo',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             {text: 'First Name',  dataIndex:'firstname'},
 *             {text: 'Last Name',  dataIndex:'lastname'},
 *             {text: 'Hired Month',  dataIndex:'hired', xtype:'datecolumn', format:'M'},
 *             {text: 'Department (Yrs)', xtype:'templatecolumn', tpl:'{dep} ({seniority})'}
 *         ],
 *         width: 400,
 *         forceFit: true,
 *         renderTo: Ext.getBody()
 *     });
 *
 * # Convenience Subclasses
 *
 * There are several column subclasses that provide default rendering for various data types
 *
 *  - {@link Ext.grid.column.Action}: Renders icons that can respond to click events inline
 *  - {@link Ext.grid.column.Boolean}: Renders for boolean values
 *  - {@link Ext.grid.column.Date}: Renders for date values
 *  - {@link Ext.grid.column.Number}: Renders for numeric values
 *  - {@link Ext.grid.column.Template}: Renders a value using an {@link Ext.XTemplate} using the record data
 *
 * # Setting Sizes
 *
 * The columns are laid out by a {@link Ext.layout.container.HBox} layout, so a column can either
 * be given an explicit width value or a flex configuration. If no width is specified the grid will
 * automatically the size the column to 100px. For column groups, the size is calculated by measuring
 * the width of the child columns, so a width option should not be specified in that case.
 *
 * # Header Options
 *
 *  - {@link #text}: Sets the header text for the column
 *  - {@link #sortable}: Specifies whether the column can be sorted by clicking the header or using the column menu
 *  - {@link #hideable}: Specifies whether the column can be hidden using the column menu
 *  - {@link #menuDisabled}: Disables the column header menu
 *  - {@link #cfg-draggable}: Specifies whether the column header can be reordered by dragging
 *  - {@link #groupable}: Specifies whether the grid can be grouped by the column dataIndex. See also {@link Ext.grid.feature.Grouping}
 *
 * # Data Options
 *
 *  - {@link #dataIndex}: The dataIndex is the field in the underlying {@link Ext.data.Store} to use as the value for the column.
 *  - {@link #renderer}: Allows the underlying store value to be transformed before being displayed in the grid
 */
Ext.define('Ext.grid.column.Column', {
    extend: 'Ext.grid.header.Container',
    alias: 'widget.gridcolumn',
    requires: ['Ext.util.KeyNav', 'Ext.grid.ColumnComponentLayout', 'Ext.grid.ColumnLayout'],
    alternateClassName: 'Ext.grid.Column',

    baseCls: Ext.baseCSSPrefix + 'column-header ' + Ext.baseCSSPrefix + 'unselectable',

    // Not the standard, automatically applied overCls because we must filter out overs of child headers.
    hoverCls: Ext.baseCSSPrefix + 'column-header-over',

    handleWidth: 5,

    sortState: null,

    possibleSortStates: ['ASC', 'DESC'],

    childEls: [
        'titleEl', 'triggerEl', 'textEl'
    ],

    renderTpl:
        '<div id="{id}-titleEl" class="' + Ext.baseCSSPrefix + 'column-header-inner">' +
            '<span id="{id}-textEl" class="' + Ext.baseCSSPrefix + 'column-header-text">' +
                '{text}' +
            '</span>' +
            '<tpl if="!menuDisabled">'+
                '<div id="{id}-triggerEl" class="' + Ext.baseCSSPrefix + 'column-header-trigger"></div>'+
            '</tpl>' +
        '</div>' +
        '{%this.renderContainer(out,values)%}',

    /**
     * @cfg {Object[]} columns
     * An optional array of sub-column definitions. This column becomes a group, and houses the columns defined in the
     * `columns` config.
     *
     * Group columns may not be sortable. But they may be hideable and moveable. And you may move headers into and out
     * of a group. Note that if all sub columns are dragged out of a group, the group is destroyed.
     */

    /**
     * @override
     * @cfg {String} stateId
     * An identifier which identifies this column uniquely within the owning grid's {@link #stateful state}.
     * 
     * This does not have to be *globally* unique. A column's state is not saved standalone. It is encapsulated within
     * the owning grid's state.
     */

    /**
     * @cfg {String} dataIndex
     * The name of the field in the grid's {@link Ext.data.Store}'s {@link Ext.data.Model} definition from
     * which to draw the column's value. **Required.**
     */
    dataIndex: null,

    /**
     * @cfg {String} text
     * The header text to be used as innerHTML (html tags are accepted) to display in the Grid.
     * **Note**: to have a clickable header with no text displayed you can use the default of `&#160;` aka `&nbsp;`.
     */
    text: '&#160;',

    /**
     * @cfg {String} menuText
     * The text to render in the column visibility selection menu for this column.  If not
     * specified, will default to the text value.
     */
    menuText: null,

    /**
     * @cfg {String} [emptyCellText=undefined]
     * The text to diplay in empty cells (cells with a value of `undefined`, `null`, or `''`).
     *
     * Defaults to `&#160;` aka `&nbsp;`.
     */
    emptyCellText: '&#160;',

    /**
     * @cfg {Boolean} sortable
     * False to disable sorting of this column. Whether local/remote sorting is used is specified in
     * `{@link Ext.data.Store#remoteSort}`.
     */
    sortable: true,

    /**
     * @cfg {Boolean} groupable
     * If the grid uses a {@link Ext.grid.feature.Grouping}, this option may be used to disable the header menu
     * item to group by the column selected. By default, the header menu group option is enabled. Set to false to
     * disable (but still show) the group option in the header menu for the column.
     */

    /**
     * @cfg {Boolean} fixed
     * True to prevent the column from being resizable.
     * @deprecated
     */

    /**
     * @cfg {Boolean} resizable
     * False to prevent the column from being resizable.
     */
    resizable: true,

    /**
     * @cfg {Boolean} hideable
     * False to prevent the user from hiding this column.
     */
    hideable: true,

    /**
     * @cfg {Boolean} menuDisabled
     * True to disable the column header menu containing sort/hide options.
     */
    menuDisabled: false,

    /**
     * @cfg {Function} renderer
     * A renderer is an 'interceptor' method which can be used transform data (value, appearance, etc.)
     * before it is rendered. Example:
     *
     *     {
     *         renderer: function(value){
     *             if (value === 1) {
     *                 return '1 person';
     *             }
     *             return value + ' people';
     *         }
     *     }
     *
     * @cfg {Object} renderer.value The data value for the current cell
     * @cfg {Object} renderer.metaData A collection of metadata about the current cell; can be used or modified
     * by the renderer. Recognized properties are: tdCls, tdAttr, and style.
     * @cfg {Ext.data.Model} renderer.record The record for the current row
     * @cfg {Number} renderer.rowIndex The index of the current row
     * @cfg {Number} renderer.colIndex The index of the current column
     * @cfg {Ext.data.Store} renderer.store The data store
     * @cfg {Ext.view.View} renderer.view The current view
     * @cfg {String} renderer.return The HTML string to be rendered.
     */
    renderer: false,
    
    /**
     * @cfg {Function} editRenderer
     * A renderer to be used in conjunction with {@link Ext.grid.plugin.RowEditing RowEditing}. This renderer is used to
     * display a custom value for non-editable fields.
     */
    editRenderer: false,

    /**
     * @cfg {String} align
     * Sets the alignment of the header and rendered columns.
     * Possible values are: `'left'`, `'center'`, and `'right'`.
     */
    align: 'left',

    /**
     * @cfg {Boolean} draggable
     * False to disable drag-drop reordering of this column.
     */
    draggable: true,

    // Header does not use the typical ComponentDraggable class and therefore we
    // override this with an emptyFn. It is controlled at the HeaderDragZone.
    initDraggable: Ext.emptyFn,

    /**
     * @cfg {String} tdCls
     * A CSS class names to apply to the table cells for this column.
     */

    /**
     * @cfg {Object/String} editor
     * An optional xtype or config object for a {@link Ext.form.field.Field Field} to use for editing.
     * Only applicable if the grid is using an {@link Ext.grid.plugin.Editing Editing} plugin.
     */

    /**
     * @cfg {Object/String} field
     * Alias for {@link #editor}.
     * @deprecated 4.0.5 Use {@link #editor} instead.
     */

    /**
     * @property {Ext.Element} triggerEl
     * Element that acts as button for column header dropdown menu.
     */

    /**
     * @property {Ext.Element} textEl
     * Element that contains the text in column header.
     */

    /**
     * @property {Boolean} isHeader
     * Set in this class to identify, at runtime, instances which are not instances of the
     * HeaderContainer base class, but are in fact, the subclass: Header.
     */
    isHeader: true,

    componentLayout: 'columncomponent',
    
    // We need to override the default component resizable behaviour here
    initResizable: Ext.emptyFn,

    initComponent: function() {
        var me = this,
            renderer;

        if (Ext.isDefined(me.header)) {
            me.text = me.header;
            delete me.header;
        }

        if (!me.triStateSort) {
            me.possibleSortStates.length = 2;
        }

        // A group header; It contains items which are themselves Headers
        if (Ext.isDefined(me.columns)) {
            me.isGroupHeader = true;

            if (me.dataIndex) {
                Ext.Error.raise('Ext.grid.column.Column: Group header may not accept a dataIndex');
            }
            if ((me.width && me.width !== Ext.grid.header.Container.prototype.defaultWidth) || me.flex) {
                Ext.Error.raise('Ext.grid.column.Column: Group header does not support setting explicit widths or flexs. The group header width is calculated by the sum of its children.');
            }

            // The headers become child items
            me.items = me.columns;
            delete me.columns;
            delete me.flex;
            delete me.width;
            me.cls = (me.cls||'') + ' ' + Ext.baseCSSPrefix + 'group-header';
            me.sortable = false;
            me.resizable = false;
            me.align = 'center';
        } else {
            // If we are not a group header, then this is not to be used as a container, and must not have a container layout executed, and it must
            // acquire layout height from DOM content, not from child items.
            me.isContainer = false;

            // Flexed Headers need to have a minWidth defined so that they can never be squeezed out of existence by the
            // HeaderContainer's specialized Box layout, the ColumnLayout. The ColumnLayout's overridden calculateChildboxes
            // method extends the available layout space to accommodate the "desiredWidth" of all the columns.
            if (me.flex) {
                me.minWidth = me.minWidth || Ext.grid.plugin.HeaderResizer.prototype.minColWidth;
            }
        }
        me.addCls(Ext.baseCSSPrefix + 'column-header-align-' + me.align);
        
        renderer = me.renderer;
        if (renderer) {
            // When specifying a renderer as a string, it always resolves
            // to Ext.util.Format
            if (typeof renderer == 'string') {
                me.renderer = Ext.util.Format[renderer];
            }
            me.hasCustomRenderer = true;
        } else if (me.defaultRenderer) {
            me.scope = me;
            me.renderer = me.defaultRenderer;
        }

        // Initialize as a HeaderContainer
        me.callParent(arguments);

        me.on({
            element:  'el',
            click:    me.onElClick,
            dblclick: me.onElDblClick,
            scope:    me
        });
        me.on({
            element:    'titleEl',
            mouseenter: me.onTitleMouseOver,
            mouseleave: me.onTitleMouseOut,
            scope:      me
        });
    },

    onAdd: function(childHeader) {
        childHeader.isSubHeader = true;
        childHeader.addCls(Ext.baseCSSPrefix + 'group-sub-header');
        this.callParent(arguments);
    },

    onRemove: function(childHeader) {
        childHeader.isSubHeader = false;
        childHeader.removeCls(Ext.baseCSSPrefix + 'group-sub-header');
        this.callParent(arguments);
    },

    initRenderData: function() {
        var me = this;
        return Ext.applyIf(me.callParent(arguments), {
            text: me.text,
            menuDisabled: me.menuDisabled
        });
    },

    applyColumnState: function (state) {
        var me = this,
            defined = Ext.isDefined;
            
        // apply any columns
        me.applyColumnsState(state.columns);

        // Only state properties which were saved should be restored.
        // (Only user-changed properties were saved by getState)
        if (defined(state.hidden)) {
            me.hidden = state.hidden;
        }
        if (defined(state.locked)) {
            me.locked = state.locked;
        }
        if (defined(state.sortable)) {
            me.sortable = state.sortable;
        }
        if (defined(state.width)) {
            delete me.flex;
            me.width = state.width;
        } else if (defined(state.flex)) {
            delete me.width;
            me.flex = state.flex;
        }
    },

    getColumnState: function () {
        var me = this,
            items = me.items.items,
            // Check for the existence of items, since column.Action won't have them
            iLen = items ? items.length : 0,
            i,
            columns = [],
            state = {
                id: me.getStateId()
            };

        me.savePropsToState(['hidden', 'sortable', 'locked', 'flex', 'width'], state);
        
        if (me.isGroupHeader) {
            for (i = 0; i < iLen; i++) {
                columns.push(items[i].getColumnState());
            }

            if (columns.length) {
                state.columns = columns;
            }
        } else if (me.isSubHeader && me.ownerCt.hidden) {
            // don't set hidden on the children so they can auto height
            delete me.hidden;
        }

        if ('width' in state) {
            delete state.flex; // width wins
        }
        return state;
    },

    getStateId: function () {
        return this.stateId || this.headerId;
    },

    /**
     * Sets the header text for this Column.
     * @param {String} text The header to display on this Column.
     */
    setText: function(text) {
        this.text = text;
        if (this.rendered) {
            this.textEl.update(text);
        }
    },

    // Find the topmost HeaderContainer: An ancestor which is NOT a Header.
    // Group Headers are themselves HeaderContainers
    getOwnerHeaderCt: function() {
        return this.up(':not([isHeader])');
    },

    /**
     * Returns the index of this column only if this column is a base level Column. If it
     * is a group column, it returns `false`.
     * @return {Number}
     */
    getIndex: function() {
        return this.isGroupColumn ? false : this.getOwnerHeaderCt().getHeaderIndex(this);
    },
    
    /**
     * Returns the index of this column in the list of *visible* columns only if this column is a base level Column. If it
     * is a group column, it returns `false`.
     * @return {Number}
     */
    getVisibleIndex: function() {
        return this.isGroupColumn ? false : Ext.Array.indexOf(this.getOwnerHeaderCt().getVisibleGridColumns(), this);
    },

    beforeRender: function() {
        var me = this,
            grid = me.up('tablepanel');

        me.callParent();

        // Disable the menu if there's nothing to show in the menu, ie:
        // Column cannot be sorted, grouped or locked, and there are no grid columns which may be hidden
        if (grid && (!me.sortable || grid.sortableColumns === false) && !me.groupable &&
                     !me.lockable && (grid.enableColumnHide === false ||
                     !me.getOwnerHeaderCt().getHideableColumns().length)) {
            me.menuDisabled = true;
        }
    },

    afterRender: function() {
        var me = this,
            el = me.el;

        me.callParent(arguments);

        if (me.overCls) {
            el.addClsOnOver(me.overCls);
        }

        // BrowserBug: Ie8 Strict Mode, this will break the focus for this browser,
        // must be fixed when focus management will be implemented.
        if (!Ext.isIE8 || !Ext.isStrict) {
            me.mon(me.getFocusEl(), {
                focus: me.onTitleMouseOver,
                blur: me.onTitleMouseOut,
                scope: me
            });
        }

        me.keyNav = new Ext.util.KeyNav(el, {
            enter: me.onEnterKey,
            down: me.onDownKey,
            scope: me
        });
    },

   
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this,
            ownerHeaderCt = me.getOwnerHeaderCt();

        me.callParent(arguments);

        if (ownerHeaderCt && (oldWidth != null || me.flex) && width !== oldWidth) {
            ownerHeaderCt.onHeaderResize(me, width, true);
        }
        delete me.oldWidth;
    },

    // private
    // After the container has laid out and stretched, it calls this to correctly pad the inner to center the text vertically
    // Total available header height must be passed to enable padding for inner elements to be calculated.
    setPadding: function(headerHeight) {
        var me = this,
            lineHeight = parseInt(me.textEl.getStyle('line-height'), 10),
            textHeight = me.textEl.dom.offsetHeight,
            titleEl = me.titleEl,
            availableHeight = headerHeight - me.el.getBorderWidth('tb'),
            titleElHeight;

        // Top title containing element must stretch to match height of sibling group headers
        if (!me.isGroupHeader) {
            if (titleEl.getHeight() < availableHeight) {
                titleEl.setHeight(availableHeight);
                // the column el's parent element (the 'innerCt') may have an incorrect height
                // at this point because it may have been shrink wrapped prior to the titleEl's
                // height being set, so we need to sync it up here
                me.ownerCt.layout.innerCt.setHeight(headerHeight);
            }
        }
        titleElHeight = titleEl.getViewSize().height;

        // Vertically center the header text in potentially vertically stretched header
        if (textHeight) {
            if(lineHeight) {
                textHeight = Math.ceil(textHeight / lineHeight) * lineHeight;
            }
            titleEl.setStyle({
                paddingTop: Math.floor(Math.max(((titleElHeight - textHeight) / 2), 0)) + 'px'
            });
        }

        // Only IE needs this
        if (Ext.isIE && me.triggerEl) {
            me.triggerEl.setHeight(titleElHeight);
        }
    },

    onDestroy: function() {
        var me = this;
        // force destroy on the textEl, IE reports a leak
        Ext.destroy(me.textEl, me.keyNav);
        delete me.keyNav;
        me.callParent(arguments);
    },

    onTitleMouseOver: function() {
        this.titleEl.addCls(this.hoverCls);
    },

    onTitleMouseOut: function() {
        this.titleEl.removeCls(this.hoverCls);
    },

    onDownKey: function(e) {
        if (this.triggerEl) {
            this.onElClick(e, this.triggerEl.dom || this.el.dom);
        }
    },

    onEnterKey: function(e) {
        this.onElClick(e, this.el.dom);
    },

    /**
     * @private
     * Double click
     * @param e
     * @param t
     */
    onElDblClick: function(e, t) {
        var me = this,
            ownerCt = me.ownerCt;
        if (ownerCt && Ext.Array.indexOf(ownerCt.items, me) !== 0 && me.isOnLeftEdge(e) ) {
            ownerCt.expandToFit(me.previousSibling('gridcolumn'));
        }
    },

    onElClick: function(e, t) {

        // The grid's docked HeaderContainer.
        var me = this,
            ownerHeaderCt = me.getOwnerHeaderCt();

        if (ownerHeaderCt && !ownerHeaderCt.ddLock) {
            // Firefox doesn't check the current target in a within check.
            // Therefore we check the target directly and then within (ancestors)
            if (me.triggerEl && (e.target === me.triggerEl.dom || t === me.triggerEl.dom || e.within(me.triggerEl))) {
                ownerHeaderCt.onHeaderTriggerClick(me, e, t);
            // if its not on the left hand edge, sort
            } else if (e.getKey() || (!me.isOnLeftEdge(e) && !me.isOnRightEdge(e))) {
                me.toggleSortState();
                ownerHeaderCt.onHeaderClick(me, e, t);
            }
        }
    },

    /**
     * @private
     * Process UI events from the view. The owning TablePanel calls this method, relaying events from the TableView
     * @param {String} type Event type, eg 'click'
     * @param {Ext.view.Table} view TableView Component
     * @param {HTMLElement} cell Cell HtmlElement the event took place within
     * @param {Number} recordIndex Index of the associated Store Model (-1 if none)
     * @param {Number} cellIndex Cell index within the row
     * @param {Ext.EventObject} e Original event
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
        return this.fireEvent.apply(this, arguments);
    },

    toggleSortState: function() {
        var me = this,
            idx,
            nextIdx;

        if (me.sortable) {
            idx = Ext.Array.indexOf(me.possibleSortStates, me.sortState);

            nextIdx = (idx + 1) % me.possibleSortStates.length;
            me.setSortState(me.possibleSortStates[nextIdx]);
        }
    },

    doSort: function(state) {
        var ds = this.up('tablepanel').store;
        ds.sort({
            property: this.getSortParam(),
            direction: state
        });
    },

    /**
     * Returns the parameter to sort upon when sorting this header. By default this returns the dataIndex and will not
     * need to be overriden in most cases.
     * @return {String}
     */
    getSortParam: function() {
        return this.dataIndex;
    },

    //setSortState: function(state, updateUI) {
    //setSortState: function(state, doSort) {
    setSortState: function(state, skipClear, initial) {
        var me = this,
            colSortClsPrefix = Ext.baseCSSPrefix + 'column-header-sort-',
            ascCls = colSortClsPrefix + 'ASC',
            descCls = colSortClsPrefix + 'DESC',
            nullCls = colSortClsPrefix + 'null',
            ownerHeaderCt = me.getOwnerHeaderCt(),
            oldSortState = me.sortState;

        if (oldSortState !== state && me.getSortParam()) {
            me.addCls(colSortClsPrefix + state);
            // don't trigger a sort on the first time, we just want to update the UI
            if (state && !initial) {
                me.doSort(state);
            }
            switch (state) {
                case 'DESC':
                    me.removeCls([ascCls, nullCls]);
                    break;
                case 'ASC':
                    me.removeCls([descCls, nullCls]);
                    break;
                case null:
                    me.removeCls([ascCls, descCls]);
                    break;
            }
            if (ownerHeaderCt && !me.triStateSort && !skipClear) {
                ownerHeaderCt.clearOtherSortStates(me);
            }
            me.sortState = state;
            // we only want to fire the event if we have a null state when using triStateSort
            if (me.triStateSort || state != null) {
                ownerHeaderCt.fireEvent('sortchange', ownerHeaderCt, me, state);
            }
        }
    },

    hide: function(fromOwner) {
        var me = this,
            ownerHeaderCt = me.getOwnerHeaderCt(),
            owner = me.ownerCt,
            ownerIsGroup = owner.isGroupHeader,
            item, items, len, i;

        // owner is a group, hide call didn't come from the owner
        if (ownerIsGroup && !fromOwner) {
            items = owner.query('>:not([hidden])');
            // only have one item that isn't hidden, this is it.
            if (items.length === 1 && items[0] == me) {
                me.ownerCt.hide();
                return;
            }
        }

        Ext.suspendLayouts();

        if (me.isGroupHeader) {
            items = me.items.items;
            for (i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (!item.hidden) {
                    item.hide(true);
                }
            }
        }

        me.callParent();
        // Notify owning HeaderContainer
        ownerHeaderCt.onHeaderHide(me);

        Ext.resumeLayouts(true);
    },

    show: function(fromOwner, fromChild) {
        var me = this,
            ownerCt = me.ownerCt,
            items,
            len, i,
            item;

        Ext.suspendLayouts();

        // If a sub header, ensure that the group header is visible
        if (me.isSubHeader && ownerCt.hidden) {
            ownerCt.show(false, true);
        }

        me.callParent(arguments);

        // If we've just shown a group with all its sub headers hidden, then show all its sub headers
        if (me.isGroupHeader && fromChild !== true && !me.query(':not([hidden])').length) {
            items = me.query('>*');
            for (i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (item.hidden) {
                    item.show(true);
                }
            }
        }

        Ext.resumeLayouts(true);

        // Notify owning HeaderContainer AFTER layout has been flushed so that header and headerCt widths are all correct
        ownerCt = me.getOwnerHeaderCt();
        if (ownerCt) {
            ownerCt.onHeaderShow(me);
        }
    },

    getDesiredWidth: function() {
        var me = this;
        if (me.rendered && me.componentLayout && me.componentLayout.lastComponentSize) {
            // headers always have either a width or a flex
            // because HeaderContainer sets a defaults width
            // therefore we can ignore the natural width
            // we use the componentLayout's tracked width so that
            // we can calculate the desired width when rendered
            // but not visible because its being obscured by a layout
            return me.componentLayout.lastComponentSize.width;
        // Flexed but yet to be rendered this could be the case
        // where a HeaderContainer and Headers are simply used as data
        // structures and not rendered.
        }
        else if (me.flex) {
            // this is going to be wrong, the defaultWidth
            return me.width;
        }
        else {
            return me.width;
        }
    },

    getCellSelector: function() {
        return '.' + Ext.baseCSSPrefix + 'grid-cell-' + this.getItemId();
    },

    getCellInnerSelector: function() {
        return this.getCellSelector() + ' .' + Ext.baseCSSPrefix + 'grid-cell-inner';
    },

    isOnLeftEdge: function(e) {
        return (e.getXY()[0] - this.el.getLeft() <= this.handleWidth);
    },

    isOnRightEdge: function(e) {
        return (this.el.getRight() - e.getXY()[0] <= this.handleWidth);
    }

    // intentionally omit getEditor and setEditor definitions bc we applyIf into columns
    // when the editing plugin is injected

    /**
     * @method getEditor
     * Retrieves the editing field for editing associated with this header. Returns false if there is no field
     * associated with the Header the method will return false. If the field has not been instantiated it will be
     * created. Note: These methods only has an implementation if a Editing plugin has been enabled on the grid.
     * @param {Object} record The {@link Ext.data.Model Model} instance being edited.
     * @param {Object} defaultField An object representing a default field to be created
     * @return {Ext.form.field.Field} field
     */
    /**
     * @method setEditor
     * Sets the form field to be used for editing. Note: This method only has an implementation if an Editing plugin has
     * been enabled on the grid.
     * @param {Object} field An object representing a field to be created. If no xtype is specified a 'textfield' is
     * assumed.
     */
});

/**
 * @class MyApp.view.clients.ClientsGrid
 * @extends Ext.grid.Panel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The client's grid
 */

Ext.define('MyApp.view.clients.ClientsGrid',{
	extend      : 'Ext.grid.Panel',
	alias       : 'widget.clients.grid',
	requires	: [
		'Ext.view.TableChunker',
		'Ext.selection.RowModel',
		'Ext.grid.column.Column'
	],

	border		: false,
	
	initComponent   : function(){
		var me = this;

		me.store = me.buildStore();
		me.columns = me.buildColumns();

		me.callParent();

		me.store.load();
	},

	buildColumns	: function(){
		return [
			{text:'Name',dataIndex:'name',flex:1},
			{text:'Contact',dataIndex:'contact',flex:1},
			{text:'Address',dataIndex:'address',flex:1},
			{text:'Phone',dataIndex:'phone'}
		];
	},

	buildStore	: function(){
		return Ext.create('MyApp.store.clients.Clients');
	}
});
/**
 * @class MyApp.controller.clients.Clients
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The client's controller, in here we define all the needed login for the client's module
 */

Ext.define('MyApp.controller.clients.Clients',{
	extend      : 'Ext.app.Controller',
	models		: [
		'clients.Client'//,
		//'MyApp.model.clients.Client' //Same as the line 12
	],
	stores		: [
		'clients.Clients'
	],
	views		: [
		'clients.ClientForm',
		'clients.ClientsGrid',
		'clients.MainContainer'
	],

	refs	: [{
		ref			: 'clientForm',
		selector	: '#maintabs #clientmain form'
	}],

	init   : function(){
		var me = this;

		me.control({
			'#maintabs #clientmain grid' : {
				itemdblclick : me.loadForm
			},
			'#maintabs #clientmain form button[action=save]' : {
				click : me.save
			},
			'#maintabs #clientmain form button[action=new]' : {
				click : me.clearForm
			},
			'#maintabs #clientmain form button[action=delete]' : {
				click : me.remove
			}
		});
	},

	remove		: function(){
		var me = this,
			form = me.getClientForm(),//me.container.down('form'),
			id = form.getForm().getValues().id;

		Ext.Msg.confirm('Confirm','Are you sure that you want to delete this client?',function(btn){
			if(btn === 'yes'){
				Ext.Ajax.request({
					url		: 'serverside/clients/delete',
					params	: {id:id},
					success : function(response){
						var grid = me.container.down('grid'),
							record = grid.getStore().getById(id);

						grid.getStore().remove(record);
						form.getForm().reset();
					}
				});
			}
		});
	},

	clearForm	: function(){
		var form = this.getClientForm();//this.container.down('form');

		form.getForm().reset();
	},

	save		: function(){
		var form = this.getClientForm();//this.container.down('form');

		Ext.Ajax.request({
			url : 'serverside/clients/save',
			params : form.getForm().getValues(),
			success: function(response,options){
				var data = Ext.decode(response.responseText);
				
				Ext.Msg.alert('Alert',data.message);
			}
		});
	},

	loadForm	: function(grid,record,item,index,event,options){
		var form = this.getClientForm();//this.container.down('form');

		form.getForm().loadRecord(record);
	},

	addContent	: function(){
		this.container.add({
			xtype : 'clients.main',
			itemId: 'clientmain'
		});
	}
});
/**
 * This class monitors scrolling of the {@link Ext.view.Table TableView} within a
 * {@link Ext.grid.Panel GridPanel} which is using a buffered store to only cache
 * and render a small section of a very large dataset.
 *
 * The GridPanel will instantiate this to perform monitoring, this class should
 * never be instantiated by user code.
 */
Ext.define('Ext.grid.PagingScroller', {

    /**
     * @cfg
     * @deprecated This config is now ignored.
     */
    percentageFromEdge: 0.35,

    /**
     * @cfg
     * The zone which causes a refresh of the rendered viewport. As soon as the edge
     * of the rendered grid is this number of rows from the edge of the viewport, the view is moved.
     */
    numFromEdge: 2,

    /**
     * @cfg
     * The number of extra rows to render on the trailing side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    trailingBufferZone: 5,

    /**
     * @cfg
     * The number of extra rows to render on the leading side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    leadingBufferZone: 15,

    /**
     * @cfg
     * This is the time in milliseconds to buffer load requests when scrolling the PagingScrollbar.
     */
    scrollToLoadBuffer: 200,

    // private. Initial value of zero.
    viewSize: 0,
    // private. Start at default value
    rowHeight: 21,
    // private. Table extent at startup time
    tableStart: 0,
    tableEnd: 0,

    constructor: function(config) {
        var me = this;
        me.variableRowHeight = config.variableRowHeight;
        me.bindView(config.view);
        Ext.apply(me, config);
        me.callParent(arguments);
    },

    bindView: function(view) {
        var me = this,
            viewListeners = {
                scroll: {
                    fn: me.onViewScroll,
                    element: 'el',
                    scope: me
                },
                render: me.onViewRender,
                resize: me.onViewResize,
                boxready: {
                    fn: me.onViewResize,
                    scope: me,
                    single: true
                },
                refresh: me.onViewRefresh,
                scope: me
            },
            storeListeners = {
                guaranteedrange: me.onGuaranteedRange,
                scope: me
            },
            gridListeners = {
                reconfigure: me.onGridReconfigure,
                scope: me
            };

        // If there are variable row heights, then in beforeRefresh, we have to find a common
        // row so that we can synchronize the table's top position after the refresh
        if (me.variableRowHeight) {
            viewListeners.beforerefresh = me.beforeViewRefresh;
        }

        // If we need unbinding...
        if (me.view) {
            me.view.el.un('scroll', me.onViewScroll, me); // un does not understand the element options
            me.view.un(viewListeners);
            me.store.un(storeListeners);
            if (me.grid) {
                me.grid.un(gridListeners);
            }
            delete me.view.refreshSize; // Remove the injected refreshSize implementation
        }

        me.view = view;
        me.grid = me.view.up('tablepanel');
        me.store = view.store;
        if (view.rendered) {
            me.viewSize = me.store.viewSize = Math.ceil(view.getHeight() / me.rowHeight) + me.trailingBufferZone + (me.numFromEdge * 2) + me.leadingBufferZone;
        }

        // During scrolling we do not need to refresh the height - the Grid height must be set by config or layout in order to create a scrollable
        // table just larger than that, so removing the layout call improves efficiency and removes the flicker when the
        // HeaderContainer is reset to scrollLeft:0, and then resynced on the very next "scroll" event.
        me.view.refreshSize = Ext.Function.createInterceptor(me.view.refreshSize, me.beforeViewrefreshSize, me);

        /**
         * @property {Number} position
         * Current pixel scroll position of the associated {@link Ext.view.Table View}.
         */
        me.position = 0;

        // We are created in View constructor. There won't be an ownerCt at this time.
        if (me.grid) {
            me.grid.on(gridListeners);
        } else {
            me.view.on({
                added: function() {
                    me.grid = me.view.up('tablepanel');
                    me.grid.on(gridListeners);
                },
                single: true
            });
        }

        me.view.on(me.viewListeners = viewListeners);
        me.store.on(storeListeners);
    },

    onGridReconfigure: function (grid) {
        this.bindView(grid.view);
    },

    // Ensure that the stretcher element is inserted into the View as the first element.
    onViewRender: function() {
        var me = this,
            el = me.view.el;

        el.setStyle('position', 'relative');
        me.stretcher = el.createChild({
            style:{
                position: 'absolute',
                width: '1px',
                height: 0,
                top: 0,
                left: 0
            }
        }, el.dom.firstChild);
    },

    onViewResize: function(view, width, height) {
        var me = this,
            newViewSize;

        newViewSize = Math.ceil(height / me.rowHeight) + me.trailingBufferZone + (me.numFromEdge * 2) + me.leadingBufferZone;
        if (newViewSize > me.viewSize) {
            me.viewSize = me.store.viewSize = newViewSize;
            me.handleViewScroll(me.lastScrollDirection || 1);
        }
    },

    // Used for variable row heights. Try to find the offset from scrollTop of a common row
    beforeViewRefresh: function() {
        var me = this,
            view = me.view,
            rows,
            direction = me.lastScrollDirection;

        me.commonRecordIndex = undefined;

        // If we are refreshing in response to a scroll,
        // And we know where the previous start was,
        // and we're not teleporting out of visible range
        if (direction && (me.previousStart !== undefined) && (me.scrollProportion === undefined)) {
            rows = view.getNodes();

            // We have scrolled downwards
            if (direction === 1) {

                // If the ranges overlap, we are going to be able to position the table exactly
                if (me.tableStart <= me.previousEnd) {
                    me.commonRecordIndex = rows.length - 1;

                }
            }
            // We have scrolled upwards
            else if (direction === -1) {

                // If the ranges overlap, we are going to be able to position the table exactly
                if (me.tableEnd >= me.previousStart) {
                    me.commonRecordIndex = 0;
                }
            }
            // Cache the old offset of the common row from the scrollTop
            me.scrollOffset = -view.el.getOffsetsTo(rows[me.commonRecordIndex])[1];

            // In the new table the common row is at a different index
            me.commonRecordIndex -= (me.tableStart - me.previousStart);
        } else {
            me.scrollOffset = undefined;
        }
    },

    // Used for variable row heights. Try to find the offset from scrollTop of a common row
    // Ensure, upon each refresh, that the stretcher element is the correct height
    onViewRefresh: function() {
        var me = this,
            store = me.store,
            newScrollHeight,
            view = me.view,
            viewEl = view.el,
            viewDom = viewEl.dom,
            rows,
            newScrollOffset,
            scrollDelta,
            table = viewEl.child('table', true),
            tableTop,
            scrollTop;

        // Scroll events caused by processing in here must be ignored, so disable for the duration
        me.disabled = true;

        // No scroll monitoring is needed if
        //    All data is in view OR
        //  Store is filtered locally.
        //    - scrolling a locally filtered page is obv a local operation within the context of a huge set of pages 
        //      so local scrolling is appropriate.
        if (store.getCount() === store.getTotalCount() || (store.isFiltered() && !store.remoteFilter)) {
            me.stretcher.setHeight(0);
            me.position = viewDom.scrollTop = 0;

            // Chrome's scrolling went crazy upon zeroing of the stretcher, and left the view's scrollTop stuck at -15
            // This is the only thing that fixes that
            table.style.position = 'absolute';

            // We remain disabled now because no scrolling is needed - we have the full dataset in the Store
            return;
        }

        me.stretcher.setHeight(newScrollHeight = me.getScrollHeight());

        scrollTop = viewDom.scrollTop;

        // Flag to the refreshSize interceptor that regular refreshSize postprocessing should be vetoed.
        me.isScrollRefresh = (scrollTop > 0);

        // If we have had to calculate the store position from the pure scroll bar position,
        // then we must calculate the table's vertical position from the scrollProportion
        if (me.scrollProportion !== undefined) {
            me.scrollProportion = scrollTop / (newScrollHeight - table.offsetHeight);
            table.style.position = 'absolute';
            table.style.top = (me.scrollProportion ? (newScrollHeight * me.scrollProportion) - (table.offsetHeight * me.scrollProportion) : 0) + 'px';
        }
        else {
            table.style.position = 'absolute';
            table.style.top = (tableTop = (me.tableStart||0) * me.rowHeight) + 'px';

            // ScrollOffset to a common row was calculated in beforeViewRefresh, so we can synch table position with how it was before
            if (me.scrollOffset) {
                rows = view.getNodes();
                newScrollOffset = -viewEl.getOffsetsTo(rows[me.commonRecordIndex])[1];
                scrollDelta = newScrollOffset - me.scrollOffset;
                me.position = (scrollTop += scrollDelta);
            }

            // If the table is not fully in view view, scroll to where it is in view.
            // This will happen when the page goes out of view unexpectedly, outside the
            // control of the PagingScroller. For example, a refresh caused by a remote sort or filter reverting
            // back to page 1.
            // Note that with buffered Stores, only remote sorting is allowed, otherwise the locally
            // sorted page will be out of order with the whole dataset.
            else if ((tableTop > scrollTop) || ((tableTop + table.offsetHeight) < scrollTop + viewDom.clientHeight)) {
                me.lastScrollDirection = -1;
                me.position = viewDom.scrollTop = tableTop;
            }
        }

        // Re-enable upon function exit
        me.disabled = false;
    },

    beforeViewrefreshSize: function() {
        // Veto the refreshSize if the refresh is due to a scroll.
        if (this.isScrollRefresh) {
            return (this.isScrollRefresh = false);
        }
    },

    onGuaranteedRange: function(range, start, end) {
        var me = this,
            ds = me.store;

        // this should never happen
        if (range.length && me.visibleStart < range[0].index) {
            return;
        }

        // Cache last table position in dataset so that if we are using variableRowHeight,
        // we can attempt to locate a common row to align the table on.
        me.previousStart = me.tableStart;
        me.previousEnd = me.tableEnd;

        me.tableStart = start;
        me.tableEnd = end;
        ds.loadRecords(range);
    },

    onViewScroll: function(e, t) {
        var me = this,
            view = me.view,
            lastPosition = me.position;

        me.position = view.el.dom.scrollTop;

        // Only check for nearing the edge if we are enabled.
        // If there is no paging to be done (Store's dataset is all in memory) we will be disabled.
        if (!me.disabled) {
            me.lastScrollDirection = me.position > lastPosition ? 1 : -1;
            // Check the position so we ignore horizontal scrolling
            if (lastPosition !== me.position) {
                me.handleViewScroll(me.lastScrollDirection);
            }
        }
    },

    handleViewScroll: function(direction) {
        var me                = this,
            store             = me.store,
            view              = me.view,
            viewSize          = me.viewSize,
            totalCount        = store.getTotalCount(),
            highestStartPoint = totalCount - viewSize,
            visibleStart      = me.getFirstVisibleRowIndex(),
            visibleEnd        = me.getLastVisibleRowIndex(),
            requestStart,
            requestEnd;

        // Only process if the total rows is larger than the visible page size
        if (totalCount >= viewSize) {

            // This is only set if we are using variable row height, and the thumb is dragged so that
            // There are no remaining visible rows to vertically anchor the new table to.
            // In this case we use the scrollProprtion to anchor the table to the correct relative
            // position on the vertical axis.
            me.scrollProportion = undefined;

            // We're scrolling up
            if (direction == -1) {
                if (visibleStart !== undefined) {
                    if (visibleStart < (me.tableStart + me.numFromEdge)) {
                        requestStart = Math.max(0, visibleEnd + me.trailingBufferZone - viewSize);
                    }
                }

                // The only way we can end up without a visible start is if, in variableRowHeight mode, the user drags
                // the thumb up out of the visible range. In this case, we have to estimate the start row index
                else {
                    // If we have no visible rows to orientate with, then use the scroll proportion
                    me.scrollProportion = view.el.dom.scrollTop / (view.el.dom.scrollHeight - view.el.dom.clientHeight);
                    requestStart = Math.max(0, totalCount * me.scrollProportion - (viewSize / 2) - me.numFromEdge - ((me.leadingBufferZone + me.trailingBufferZone) / 2));
                }
            }
            // We're scrolling down
            else {
                if (visibleStart !== undefined) {
                    if (visibleEnd > (me.tableEnd - me.numFromEdge)) {
                        requestStart = Math.max(0, visibleStart - me.trailingBufferZone);
                    }
                }

                // The only way we can end up without a visible end is if, in variableRowHeight mode, the user drags
                // the thumb down out of the visible range. In this case, we have to estimate the start row index
                else {
                    // If we have no visible rows to orientate with, then use the scroll proportion
                    me.scrollProportion = view.el.dom.scrollTop / (view.el.dom.scrollHeight - view.el.dom.clientHeight);
                    requestStart = totalCount * me.scrollProportion - (viewSize / 2) - me.numFromEdge - ((me.leadingBufferZone + me.trailingBufferZone) / 2);
                }
            }

            // We scrolled close to the edge and the Store needs reloading
            if (requestStart !== undefined) {
                // The calculation walked off the end; Request the highest possible chunk which starts on an even row count (Because of row striping)
                if (requestStart > highestStartPoint) {
                    requestStart = highestStartPoint & ~1;
                    requestEnd = totalCount - 1;
                }
                // Make sure first row is even to ensure correct even/odd row striping
                else {
                    requestStart = requestStart & ~1;
                    requestEnd = requestStart + viewSize - 1;
                }

                // If range is satsfied within the prefetch buffer, then just draw it from the prefetch buffer
                if (store.rangeCached(requestStart, requestEnd)) {
                    me.cancelLoad();
                    store.guaranteeRange(requestStart, requestEnd);
                }

                // Required range is not in the prefetch buffer. Ask the store to prefetch it.
                // We will recieve a guaranteedrange event when that is done.
                else {
                    me.attemptLoad(requestStart, requestEnd);
                }
            }
        }
    },

    getFirstVisibleRowIndex: function() {
        var me = this,
            store = me.store,
            view = me.view,
            scrollTop = view.el.dom.scrollTop,
            rows,
            count,
            i,
            rowBottom;

        if (me.variableRowHeight) {
            rows = view.getNodes();
            count = store.getCount();
            for (i = 0; i < count; i++) {
                rowBottom = Ext.fly(rows[i]).getOffsetsTo(view.el)[1] + rows[i].offsetHeight;

                // Searching for the first visible row, and off the bottom of the clientArea, then there's no visible first row!
                if (rowBottom > view.el.dom.clientHeight) {
                    return;
                }

                if (rowBottom > 0) {
                    return i + me.tableStart;
                }
            }
        } else {
            return Math.floor(scrollTop / me.rowHeight);
        }
    },

    getLastVisibleRowIndex: function() {
        var me = this,
            store = me.store,
            view = me.view,
            clientHeight = view.el.dom.clientHeight,
            rows,
            count,
            i,
            rowTop;

        if (me.variableRowHeight) {
            rows = view.getNodes();
            count = store.getCount();
            for (i = count - 1; i >= 0; i--) {
                rowTop = Ext.fly(rows[i]).getOffsetsTo(view.el)[1];

                // Searching for the last visible row, and off the top of the clientArea, then there's no visible last row!
                if (rowTop < 0) {
                    return;
                }
                if (rowTop < clientHeight) {
                    return i + me.tableStart;
                }
            }
        } else {
            return me.getFirstVisibleRowIndex() + Math.ceil(clientHeight / me.rowHeight) + 1;
        }
    },

    getScrollHeight: function() {
        var me = this,
            view   = me.view,
            table,
            firstRow,
            store  = me.store,
            deltaHeight = 0,
            doCalcHeight = !me.hasOwnProperty('rowHeight');

        if (me.variableRowHeight) {
            table = me.view.el.down('table', true);
            if (doCalcHeight) {
                me.initialTableHeight = table.offsetHeight;
                me.rowHeight = me.initialTableHeight / me.store.getCount();
            } else {
                deltaHeight = table.offsetHeight - me.initialTableHeight;
            }
        } else if (doCalcHeight) {
            firstRow = view.el.down(view.getItemSelector());
            if (firstRow) {
                me.rowHeight = firstRow.getHeight(false, true);
            }
        }

        return Math.floor(store.getTotalCount() * me.rowHeight) + deltaHeight;
    },

    attemptLoad: function(start, end) {
        var me = this;
        if (me.scrollToLoadBuffer) {
            if (!me.loadTask) {
                me.loadTask = new Ext.util.DelayedTask(me.doAttemptLoad, me, []);
            }
            me.loadTask.delay(me.scrollToLoadBuffer, me.doAttemptLoad, me, [start, end]);
        } else {
            me.store.guaranteeRange(start, end);
        }
    },

    cancelLoad: function() {
        if (this.loadTask) {
            this.loadTask.cancel();
        }
    },

    doAttemptLoad:  function(start, end) {
        this.store.guaranteeRange(start, end);
    },

    destroy: function() {
        var me = this,
            scrollListener = me.viewListeners.scroll;

        me.store.un({
            guaranteedrange: me.onGuaranteedRange,
            scope: me
        });
        me.view.un(me.viewListeners);
        if (me.view.rendered) {
            me.stretcher.remove();
            me.view.el.un('scroll', scrollListener.fn, scrollListener.scope);
        }
    }
});

/**
 * This class is used internally to provide a single interface when using
 * a locking grid. Internally, the locking grid creates two separate grids,
 * so this class is used to map calls appropriately.
 * @private
 */
Ext.define('Ext.grid.LockingView', {

    mixins: {
        observable: 'Ext.util.Observable'
    },

    eventRelayRe: /^(beforeitem|beforecontainer|item|container|cell)/,

    constructor: function(config){
        var me = this,
            eventNames = [],
            eventRe = me.eventRelayRe,
            locked = config.locked.getView(),
            normal = config.normal.getView(),
            events,
            event;

        Ext.apply(me, {
            lockedView: locked,
            normalView: normal,
            lockedGrid: config.locked,
            normalGrid: config.normal,
            panel: config.panel
        });
        me.mixins.observable.constructor.call(me, config);

        // relay events
        events = locked.events;
        for (event in events) {
            if (events.hasOwnProperty(event) && eventRe.test(event)) {
                eventNames.push(event);
            }
        }
        me.relayEvents(locked, eventNames);
        me.relayEvents(normal, eventNames);

        normal.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });

        locked.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });
    },

    getGridColumns: function() {
        var cols = this.lockedGrid.headerCt.getGridColumns();
        return cols.concat(this.normalGrid.headerCt.getGridColumns());
    },

    getEl: function(column){
        return this.getViewForColumn(column).getEl();
    },

    getViewForColumn: function(column) {
        var view = this.lockedView,
            inLocked;

        view.headerCt.cascade(function(col){
            if (col === column) {
                inLocked = true;
                return false;
            }
        });

        return inLocked ? view : this.normalView;
    },

    onItemMouseEnter: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView,
            item;

        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            item = other.getNode(record);
            other.highlightItem(item);
        }
    },

    onItemMouseLeave: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView;

        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            other.clearHighlight();
        }
    },

    relayFn: function(name, args){
        args = args || [];

        var view = this.lockedView;
        view[name].apply(view, args || []);
        view = this.normalView;
        view[name].apply(view, args || []);
    },

    getSelectionModel: function(){
        return this.panel.getSelectionModel();
    },

    getStore: function(){
        return this.panel.store;
    },

    getNode: function(nodeInfo){
        // default to the normal view
        return this.normalView.getNode(nodeInfo);
    },

    getCell: function(record, column){
        var view = this.getViewForColumn(column),
            row;

        row = view.getNode(record);
        return Ext.fly(row).down(column.getCellSelector());
    },

    getRecord: function(node){
        var result = this.lockedView.getRecord(node);
        if (!node) {
            result = this.normalView.getRecord(node);
        }
        return result;
    },

    addElListener: function(eventName, fn, scope){
        this.relayFn('addElListener', arguments);
    },

    refreshNode: function(){
        this.relayFn('refreshNode', arguments);
    },

    refresh: function(){
        this.relayFn('refresh', arguments);
    },

    bindStore: function(){
        this.relayFn('bindStore', arguments);
    },

    addRowCls: function(){
        this.relayFn('addRowCls', arguments);
    },

    removeRowCls: function(){
        this.relayFn('removeRowCls', arguments);
    }

});
/**
 * @private
 *
 * Lockable is a private mixin which injects lockable behavior into any
 * TablePanel subclass such as GridPanel or TreePanel. TablePanel will
 * automatically inject the Ext.grid.Lockable mixin in when one of the
 * these conditions are met:
 *
 *  - The TablePanel has the lockable configuration set to true
 *  - One of the columns in the TablePanel has locked set to true/false
 *
 * Each TablePanel subclass must register an alias. It should have an array
 * of configurations to copy to the 2 separate tablepanel's that will be generated
 * to note what configurations should be copied. These are named normalCfgCopy and
 * lockedCfgCopy respectively.
 *
 * Columns which are locked must specify a fixed width. They do NOT support a
 * flex width.
 *
 * Configurations which are specified in this class will be available on any grid or
 * tree which is using the lockable functionality.
 */
Ext.define('Ext.grid.Lockable', {

    requires: [
        'Ext.grid.LockingView',
        'Ext.view.Table'
    ],

    /**
     * @cfg {Boolean} syncRowHeight Synchronize rowHeight between the normal and
     * locked grid view. This is turned on by default. If your grid is guaranteed
     * to have rows of all the same height, you should set this to false to
     * optimize performance.
     */
    syncRowHeight: true,

    /**
     * @cfg {String} subGridXType The xtype of the subgrid to specify. If this is
     * not specified lockable will determine the subgrid xtype to create by the
     * following rule. Use the superclasses xtype if the superclass is NOT
     * tablepanel, otherwise use the xtype itself.
     */

    /**
     * @cfg {Object} lockedViewConfig A view configuration to be applied to the
     * locked side of the grid. Any conflicting configurations between lockedViewConfig
     * and viewConfig will be overwritten by the lockedViewConfig.
     */

    /**
     * @cfg {Object} normalViewConfig A view configuration to be applied to the
     * normal/unlocked side of the grid. Any conflicting configurations between normalViewConfig
     * and viewConfig will be overwritten by the normalViewConfig.
     */

    headerCounter: 0,

    /**
     * @cfg {Number} scrollDelta
     * Number of pixels to scroll when scrolling the locked section with mousewheel.
     */
    scrollDelta: 40,
    
    /**
     * @cfg {Object} lockedGridConfig
     * Any special configuration options for the locked part of the grid
     */
    
    /**
     * @cfg {Object} normalGridConfig
     * Any special configuration options for the normal part of the grid
     */

    // i8n text
    //<locale>
    unlockText: 'Unlock',
    //</locale>
    //<locale>
    lockText: 'Lock',
    //</locale>

    determineXTypeToCreate: function() {
        var me = this,
            typeToCreate,
            xtypes, xtypesLn, xtype, superxtype;

        if (me.subGridXType) {
            typeToCreate = me.subGridXType;
        } else {
            xtypes     = this.getXTypes().split('/');
            xtypesLn   = xtypes.length;
            xtype      = xtypes[xtypesLn - 1];
            superxtype = xtypes[xtypesLn - 2];

            if (superxtype !== 'tablepanel') {
                typeToCreate = superxtype;
            } else {
                typeToCreate = xtype;
            }
        }

        return typeToCreate;
    },

    // injectLockable will be invoked before initComponent's parent class implementation
    // is called, so throughout this method this. are configurations
    injectLockable: function() {
        // ensure lockable is set to true in the TablePanel
        this.lockable = true;
        // Instruct the TablePanel it already has a view and not to create one.
        // We are going to aggregate 2 copies of whatever TablePanel we are using
        this.hasView = true;

        var me = this,
            // If the OS does not show a space-taking scrollbar, the locked view can be overflow:auto
            scrollLocked = Ext.getScrollbarSize().width === 0,
            store = me.store = Ext.StoreManager.lookup(me.store),
            // xtype of this class, 'treepanel' or 'gridpanel'
            // (Note: this makes it a requirement that any subclass that wants to use lockable functionality needs to register an
            // alias.)
            xtype = me.determineXTypeToCreate(),
            // share the selection model
            selModel = me.getSelectionModel(),
            lockedFeatures = me.prepareFeatures(),
            normalFeatures = me.prepareFeatures(),
            lockedGrid,
            normalGrid,
            i = 0, len,
            columns,
            lockedHeaderCt,
            normalHeaderCt,
            lockedView,
            normalView,
            listeners;

        // Each Feature must have a reference to its counterpart on the opposite side of the locking view
        for (i = 0, len = (lockedFeatures ? lockedFeatures.length : 0); i < len; i++) {
            lockedFeatures[i].lockingPartner = normalFeatures[i];
            normalFeatures[i].lockingPartner = lockedFeatures[i];
        }

        lockedGrid = Ext.apply({
            xtype: xtype,
            store: store,
            scrollerOwner: false,
            // Lockable does NOT support animations for Tree
            enableAnimations: false,
            scroll: scrollLocked ? 'vertical' : false,
            selModel: selModel,
            border: false,
            cls: Ext.baseCSSPrefix + 'grid-inner-locked',
            isLayoutRoot: function() {
                return false;
            },
            features: lockedFeatures
        }, me.lockedGridConfig);

        normalGrid = Ext.apply({
            xtype: xtype,
            store: store,
            scrollerOwner: false,
            enableAnimations: false,
            selModel: selModel,
            border: false,
            isLayoutRoot: function() {
                return false;
            },
            features: normalFeatures
        }, me.normalGridConfig);

        me.addCls(Ext.baseCSSPrefix + 'grid-locked');

        // copy appropriate configurations to the respective
        // aggregated tablepanel instances and then delete them
        // from the master tablepanel.
        Ext.copyTo(normalGrid, me, me.bothCfgCopy);
        Ext.copyTo(lockedGrid, me, me.bothCfgCopy);
        Ext.copyTo(normalGrid, me, me.normalCfgCopy);
        Ext.copyTo(lockedGrid, me, me.lockedCfgCopy);
        for (i = 0; i < me.normalCfgCopy.length; i++) {
            delete me[me.normalCfgCopy[i]];
        }
        for (i = 0; i < me.lockedCfgCopy.length; i++) {
            delete me[me.lockedCfgCopy[i]];
        }

        me.addEvents(
            /**
             * @event lockcolumn
             * Fires when a column is locked.
             * @param {Ext.grid.Panel} this The gridpanel.
             * @param {Ext.grid.column.Column} column The column being locked.
             */
            'lockcolumn',

            /**
             * @event unlockcolumn
             * Fires when a column is unlocked.
             * @param {Ext.grid.Panel} this The gridpanel.
             * @param {Ext.grid.column.Column} column The column being unlocked.
             */
            'unlockcolumn'
        );

        me.addStateEvents(['lockcolumn', 'unlockcolumn']);

        me.lockedHeights = [];
        me.normalHeights = [];

        columns = me.processColumns(me.columns);

        lockedGrid.width = columns.lockedWidth + Ext.num(selModel.headerWidth, 0);
        lockedGrid.columns = columns.locked;
        normalGrid.columns = columns.normal;

        // normal grid should flex the rest of the width
        normalGrid.flex = 1;
        lockedGrid.viewConfig = me.lockedViewConfig || {};
        lockedGrid.viewConfig.loadingUseMsg = false;
        normalGrid.viewConfig = me.normalViewConfig || {};

        Ext.applyIf(lockedGrid.viewConfig, me.viewConfig);
        Ext.applyIf(normalGrid.viewConfig, me.viewConfig);

        me.normalGrid = Ext.ComponentManager.create(normalGrid);
        me.lockedGrid = Ext.ComponentManager.create(lockedGrid);

        me.view = new Ext.grid.LockingView({
            locked: me.lockedGrid,
            normal: me.normalGrid,
            panel: me
        });

        lockedView = me.lockedGrid.getView();
        normalView = me.normalGrid.getView();

        // Set up listeners for the locked view
        // If the OS does not show a space-taking scrollbar, the locked view can be overflow:auto
        // And therefore we can listen for the DOM scroll event on its element
        if (scrollLocked) {
            listeners = {
                scroll: {
                    fn: me.onLockedViewScroll,
                    element: 'el',
                    scope: me
                }
            };
        }
        // If there are scrollbars, we have to monitor the mousewheel and fake a scroll
        else {
            listeners = {
                mousewheel: {
                    fn: me.onLockedViewMouseWheel,
                    element: 'el',
                    scope: me
                }
            };
        }
        if (me.syncRowHeight) {
            listeners.refresh = me.onLockedViewRefresh;
            listeners.itemupdate = me.onLockedViewItemUpdate;
            listeners.scope = me;
        }
        lockedView.on(listeners);

        // Set up listeners for the normal view
        listeners = {
            scroll: {
                fn: me.onNormalViewScroll,
                element: 'el',
                scope: me
            },
            refresh: me.syncRowHeight ? me.onNormalViewRefresh : me.updateSpacer,
            scope: me
        };
        normalView.on(listeners);

        lockedHeaderCt = me.lockedGrid.headerCt;
        normalHeaderCt = me.normalGrid.headerCt;

        lockedHeaderCt.lockedCt = true;
        lockedHeaderCt.lockableInjected = true;
        normalHeaderCt.lockableInjected = true;

        lockedHeaderCt.on({
            columnshow: me.onLockedHeaderShow,
            columnhide: me.onLockedHeaderHide,
            columnmove: me.onLockedHeaderMove,
            sortchange: me.onLockedHeaderSortChange,
            columnresize: me.onLockedHeaderResize,
            scope: me
        });

        normalHeaderCt.on({
            columnmove: me.onNormalHeaderMove,
            sortchange: me.onNormalHeaderSortChange,
            scope: me
        });

        me.modifyHeaderCt();
        me.items = [me.lockedGrid, me.normalGrid];

        me.relayHeaderCtEvents(lockedHeaderCt);
        me.relayHeaderCtEvents(normalHeaderCt);

        me.layout = {
            type: 'hbox',
            align: 'stretch'
        };
    },

    processColumns: function(columns){
        // split apart normal and lockedWidths
        var i = 0,
            len = columns.length,
            lockedWidth = 0,
            lockedHeaders = [],
            normalHeaders = [],
            column;

        for (; i < len; ++i) {
            column = columns[i];
            // MUST clone the column config because we mutate it, and we must not mutate passed in config objects in case they are re-used
            // eg, in an extend-to-configure scenario.
            if (!column.isComponent) {
                column = Ext.apply({}, columns[i]);
            }

            // mark the column as processed so that the locked attribute does not
            // trigger trying to aggregate the columns again.
            column.processed = true;
            if (column.locked) {
                if (column.flex) {
                    Ext.Error.raise("Columns which are locked do NOT support a flex width. You must set a width on the " + columns[i].text + "column.");
                }
                if (!column.hidden) {
                    lockedWidth += column.width || Ext.grid.header.Container.prototype.defaultWidth;
                }
                lockedHeaders.push(column);
            } else {
                normalHeaders.push(column);
            }
            if (!column.headerId) {
                column.headerId = (column.initialConfig || column).id || ('L' + (++this.headerCounter));
            }
        }
        return {
            lockedWidth: lockedWidth,
            locked: {
                items: lockedHeaders,
                itemId: 'lockedHeaderCt',
                stretchMaxPartner: '^^>>#normalHeaderCt'
            },
            normal: {
                items: normalHeaders,
                itemId: 'normalHeaderCt',
                stretchMaxPartner: '^^>>#lockedHeaderCt'
            }
        };
    },

    /**
     * @private
     * Listen for mousewheel events on the locked section which does not scroll.
     * Scroll it in response, and the other section will automatically sync.
     */
    onLockedViewMouseWheel: function(e) {
        var me = this,
            scrollDelta = -me.scrollDelta,
            deltaY = scrollDelta * e.getWheelDeltas().y,
            vertScrollerEl = me.lockedGrid.getView().el.dom,
            verticalCanScrollDown, verticalCanScrollUp;

        if (vertScrollerEl) {
            verticalCanScrollDown = vertScrollerEl.scrollTop !== vertScrollerEl.scrollHeight - vertScrollerEl.clientHeight;
            verticalCanScrollUp   = vertScrollerEl.scrollTop !== 0;
        }

        if ((deltaY < 0 && verticalCanScrollUp) || (deltaY > 0 && verticalCanScrollDown)) {
            e.stopEvent();

            // Inhibit processing of any scroll events we *may* cause here.
            // Some OSs do not fire a scroll event when we set the scrollTop of an overflow:hidden element,
            // so we invoke the scroll handler programatically below.
            me.scrolling = true;
            vertScrollerEl.scrollTop += deltaY;
            me.normalGrid.getView().el.dom.scrollTop = vertScrollerEl.scrollTop;
            me.scrolling = false;

            // Invoke the scroll event handler programatically to sync everything.
            me.onNormalViewScroll();
        }
    },

    onLockedViewScroll: function() {
        var me = this,
            lockedView = me.lockedGrid.getView(),
            normalView = me.normalGrid.getView(),
            normalTable,
            lockedTable;

        // Set a flag so that the scroll even doesn't bounce back when we set the normal view's scroll position
        if (!me.scrolling) {
            me.scrolling = true;
            normalView.el.dom.scrollTop = lockedView.el.dom.scrollTop;
    
            // For buffered views, the absolute position is important as well as scrollTop
            if (me.store.buffered) {
                lockedTable = lockedView.el.child('table', true);
                normalTable = normalView.el.child('table', true);
                lockedTable.style.position = 'absolute';
            }
            me.scrolling = false;
        }
    },
    
    onNormalViewScroll: function() {
        var me = this,
            lockedView = me.lockedGrid.getView(),
            normalView = me.normalGrid.getView(),
            normalTable,
            lockedTable;

        // Set a flag so that the scroll even doesn't bounce back when we set the locked view's scroll position
        if (!me.scrolling) {
            me.scrolling = true;
            lockedView.el.dom.scrollTop = normalView.el.dom.scrollTop;
    
            // For buffered views, the absolute position is important as well as scrollTop
            if (me.store.buffered) {
                lockedTable = lockedView.el.child('table', true);
                normalTable = normalView.el.child('table', true);
                lockedTable.style.position = 'absolute';
                lockedTable.style.top = normalTable.style.top;
            }
            me.scrolling = false;
        }
    },

    // trigger a pseudo refresh on the normal side
    onLockedHeaderMove: function() {
        if (this.syncRowHeight) {
            this.onNormalViewRefresh();
        }
    },

    // trigger a pseudo refresh on the locked side
    onNormalHeaderMove: function() {
        if (this.syncRowHeight) {
            this.onLockedViewRefresh();
        }
    },
    
    // Create a spacer in lockedsection and store a reference.
    // This is to allow the locked section to scroll past the bottom to
    // take the mormal section's horizontal scrollbar into account
    // TODO: Should destroy before refreshing content
    updateSpacer: function() {
        var me   = this,
            // This affects scrolling all the way to the bottom of a locked grid
            // additional test, sort a column and make sure it synchronizes
            lockedViewEl   = me.lockedGrid.getView().el,
            normalViewEl = me.normalGrid.getView().el.dom,
            spacerId = lockedViewEl.dom.id + '-spacer',
            spacerHeight = (normalViewEl.offsetHeight - normalViewEl.clientHeight) + 'px';

        me.spacerEl = Ext.getDom(spacerId);
        if (me.spacerEl) {
            me.spacerEl.style.height = spacerHeight;
        } else {
            Ext.core.DomHelper.append(lockedViewEl, {
                id: spacerId,
                style: 'height: ' + spacerHeight
            });
        }
    },

    // cache the heights of all locked rows and sync rowheights
    onLockedViewRefresh: function() {

        // Only bother if there are some columns in the normal grid to sync
        if (this.normalGrid.headerCt.getGridColumns().length) {
            var me     = this,
                view   = me.lockedGrid.getView(),
                el     = view.el,
                rowEls = el.query(view.getItemSelector()),
                ln     = rowEls.length,
                i = 0;
    
            // reset heights each time.
            me.lockedHeights = [];

            for (; i < ln; i++) {
                me.lockedHeights[i] = rowEls[i].clientHeight;
            }
            me.syncRowHeights();
        }
    },

    // cache the heights of all normal rows and sync rowheights
    onNormalViewRefresh: function() {

        // Only bother if there are some columns in the locked grid to sync
        if (this.lockedGrid.headerCt.getGridColumns().length) {
            var me     = this,
                view   = me.normalGrid.getView(),
                el     = view.el,
                rowEls = el.query(view.getItemSelector()),
                ln     = rowEls.length,
                i = 0;
    
            // reset heights each time.
            me.normalHeights = [];
    
            for (; i < ln; i++) {
                me.normalHeights[i] = rowEls[i].clientHeight;
            }
            me.syncRowHeights();
            me.updateSpacer();
        }
    },

    // rows can get bigger/smaller
    onLockedViewItemUpdate: function(record, index, node) {

        // Only bother if there are some columns in the normal grid to sync
        if (this.normalGrid.headerCt.getGridColumns().length) {
            this.lockedHeights[index] = node.clientHeight;
            this.syncRowHeights();
        }
    },

    // rows can get bigger/smaller
    onNormalViewItemUpdate: function(record, index, node) {
    
        // Only bother if there are some columns in the locked grid to sync
        if (this.lockedGrid.headerCt.getGridColumns().length) {
            this.normalHeights[index] = node.clientHeight;
            this.syncRowHeights();
        }
    },

    /**
     * Synchronizes the row heights between the locked and non locked portion of the grid for each
     * row. If one row is smaller than the other, the height will be increased to match the larger one.
     */
    syncRowHeights: function() {
        var me = this,
            lockedHeights = me.lockedHeights,
            normalHeights = me.normalHeights,
            calcHeights   = [],
            ln = lockedHeights.length,
            i  = 0,
            lockedView, normalView,
            lockedRowEls, normalRowEls,
            scrollTop;

        // ensure there are an equal num of locked and normal
        // rows before synchronization
        if (lockedHeights.length && normalHeights.length) {
            lockedView = me.lockedGrid.getView();
            normalView = me.normalGrid.getView();
            lockedRowEls = lockedView.el.query(lockedView.getItemSelector());
            normalRowEls = normalView.el.query(normalView.getItemSelector());

            // loop thru all of the heights and sync to the other side
            for (; i < ln; i++) {
                // ensure both are numbers
                if (!isNaN(lockedHeights[i]) && !isNaN(normalHeights[i])) {
                    if (lockedHeights[i] > normalHeights[i]) {
                        Ext.fly(normalRowEls[i]).setHeight(lockedHeights[i]);
                    } else if (lockedHeights[i] < normalHeights[i]) {
                        Ext.fly(lockedRowEls[i]).setHeight(normalHeights[i]);
                    }
                }
            }

            // Synchronize the scrollTop positions of the two views
            // We don't use setScrollTop here because if the scrollTop is
            // set to the exact same value some browsers won't fire the scroll
            // event. Instead, we directly set the scrollTop.
            scrollTop = normalView.el.dom.scrollTop;
            normalView.el.dom.scrollTop = scrollTop;
            lockedView.el.dom.scrollTop = scrollTop;
            
            // reset the heights
            me.lockedHeights = [];
            me.normalHeights = [];
        }
    },

    // inject Lock and Unlock text
    modifyHeaderCt: function() {
        var me = this;
        me.lockedGrid.headerCt.getMenuItems = me.getMenuItems(true);
        me.normalGrid.headerCt.getMenuItems = me.getMenuItems(false);
    },

    onUnlockMenuClick: function() {
        this.unlock();
    },

    onLockMenuClick: function() {
        this.lock();
    },

    getMenuItems: function(locked) {
        var me            = this,
            unlockText    = me.unlockText,
            lockText      = me.lockText,
            unlockCls     = Ext.baseCSSPrefix + 'hmenu-unlock',
            lockCls       = Ext.baseCSSPrefix + 'hmenu-lock',
            unlockHandler = Ext.Function.bind(me.onUnlockMenuClick, me),
            lockHandler   = Ext.Function.bind(me.onLockMenuClick, me);

        // runs in the scope of headerCt
        return function() {
            var o = Ext.grid.header.Container.prototype.getMenuItems.call(this);
            o.push('-',{
                cls: unlockCls,
                text: unlockText,
                handler: unlockHandler,
                disabled: !locked
            });
            o.push({
                cls: lockCls,
                text: lockText,
                handler: lockHandler,
                disabled: locked
            });
            return o;
        };
    },

    // going from unlocked section to locked
    /**
     * Locks the activeHeader as determined by which menu is open OR a header
     * as specified.
     * @param {Ext.grid.column.Column} [header] Header to unlock from the locked section.
     * Defaults to the header which has the menu open currently.
     * @param {Number} [toIdx] The index to move the unlocked header to.
     * Defaults to appending as the last item.
     * @private
     */
    lock: function(activeHd, toIdx) {
        var me         = this,
            normalGrid = me.normalGrid,
            lockedGrid = me.lockedGrid,
            normalHCt  = normalGrid.headerCt,
            lockedHCt  = lockedGrid.headerCt;

        activeHd = activeHd || normalHCt.getMenu().activeHeader;

        // if column was previously flexed, get/set current width
        // and remove the flex
        if (activeHd.flex) {
            activeHd.width = activeHd.getWidth();
            delete activeHd.flex;
        }

        Ext.suspendLayouts();
        normalHCt.remove(activeHd, false);
        activeHd.locked = true;
        if (Ext.isDefined(toIdx)) {
            lockedHCt.insert(toIdx, activeHd);
        } else {
            lockedHCt.add(activeHd);
        }
        me.syncLockedSection();
        Ext.resumeLayouts(true);
        me.updateSpacer();

        me.fireEvent('lockcolumn', me, activeHd);
    },

    syncLockedSection: function() {
        var me = this;
        me.syncLockedWidth();
        me.lockedGrid.getView().refresh();
        me.normalGrid.getView().refresh();
    },

    // adjust the locked section to the width of its respective
    // headerCt
    syncLockedWidth: function() {
        var me = this,
            locked = me.lockedGrid,
            width = locked.headerCt.getFullWidth(true);
            
        Ext.suspendLayouts();
        if (width > 0) {
            locked.setWidth(width);
            locked.show();
        } else {
            locked.hide();
        }
        Ext.resumeLayouts(true);
        
        return width > 0;
    },

    onLockedHeaderResize: function() {
        this.syncLockedWidth();
    },

    onLockedHeaderHide: function() {
        this.syncLockedWidth();
    },

    onLockedHeaderShow: function() {
        this.syncLockedWidth();
    },

    onLockedHeaderSortChange: function(headerCt, header, sortState) {
        if (sortState) {
            // no real header, and silence the event so we dont get into an
            // infinite loop
            this.normalGrid.headerCt.clearOtherSortStates(null, true);
        }
    },

    onNormalHeaderSortChange: function(headerCt, header, sortState) {
        if (sortState) {
            // no real header, and silence the event so we dont get into an
            // infinite loop
            this.lockedGrid.headerCt.clearOtherSortStates(null, true);
        }
    },

    // going from locked section to unlocked
    /**
     * Unlocks the activeHeader as determined by which menu is open OR a header
     * as specified.
     * @param {Ext.grid.column.Column} [header] Header to unlock from the locked section.
     * Defaults to the header which has the menu open currently.
     * @param {Number} [toIdx=0] The index to move the unlocked header to.
     * @private
     */
    unlock: function(activeHd, toIdx) {
        var me         = this,
            normalGrid = me.normalGrid,
            lockedGrid = me.lockedGrid,
            normalHCt  = normalGrid.headerCt,
            lockedHCt  = lockedGrid.headerCt,
            refreshLocked = false;

        if (!Ext.isDefined(toIdx)) {
            toIdx = 0;
        }
        activeHd = activeHd || lockedHCt.getMenu().activeHeader;

        Ext.suspendLayouts();
        lockedHCt.remove(activeHd, false);
        if (me.syncLockedWidth()) {
            refreshLocked = true;
        }
        activeHd.locked = false;

        // Refresh the locked section first in case it was empty
        normalHCt.insert(toIdx, activeHd);
        me.normalGrid.getView().refresh();

        if (refreshLocked) {
            me.lockedGrid.getView().refresh();
        }
        Ext.resumeLayouts(true);

        me.fireEvent('unlockcolumn', me, activeHd);
    },

    applyColumnsState: function (columns) {
        var me             = this,
            lockedGrid     = me.lockedGrid,
            lockedHeaderCt = lockedGrid.headerCt,
            normalHeaderCt = me.normalGrid.headerCt,
            lockedCols     = Ext.Array.toMap(lockedHeaderCt.items, 'headerId'),
            normalCols     = Ext.Array.toMap(normalHeaderCt.items, 'headerId'),
            locked         = [],
            normal         = [],
            lockedWidth    = 1,
            length         = columns.length,
            i, existing,
            lockedDefault,
            col;

        for (i = 0; i < length; i++) {
            col = columns[i];

            lockedDefault = lockedCols[col.id];
            existing = lockedDefault || normalCols[col.id];

            if (existing) {
                if (existing.applyColumnState) {
                    existing.applyColumnState(col);
                }
                if (existing.locked === undefined) {
                    existing.locked = !!lockedDefault;
                }
                if (existing.locked) {
                    locked.push(existing);
                    if (!existing.hidden && typeof existing.width == 'number') {
                        lockedWidth += existing.width;
                    }
                } else {
                    normal.push(existing);
                }
            }
        }

        // state and config must have the same columns (compare counts for now):
        if (locked.length + normal.length == lockedHeaderCt.items.getCount() + normalHeaderCt.items.getCount()) {
            lockedHeaderCt.removeAll(false);
            normalHeaderCt.removeAll(false);

            lockedHeaderCt.add(locked);
            normalHeaderCt.add(normal);

            lockedGrid.setWidth(lockedWidth);
        }
    },

    getColumnsState: function () {
        var me = this,
            locked = me.lockedGrid.headerCt.getColumnsState(),
            normal = me.normalGrid.headerCt.getColumnsState();

        return locked.concat(normal);
    },

    // we want to totally override the reconfigure behaviour here, since we're creating 2 sub-grids
    reconfigureLockable: function(store, columns) {
        var me = this,
            lockedGrid = me.lockedGrid,
            normalGrid = me.normalGrid;

        if (columns) {
            Ext.suspendLayouts();
            lockedGrid.headerCt.removeAll();
            normalGrid.headerCt.removeAll();

            columns = me.processColumns(columns);
            lockedGrid.setWidth(columns.lockedWidth);
            lockedGrid.headerCt.add(columns.locked.items);
            normalGrid.headerCt.add(columns.normal.items);
            Ext.resumeLayouts(true);
        }

        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            me.store = store;
            lockedGrid.bindStore(store);
            normalGrid.bindStore(store);
        } else {
            lockedGrid.getView().refresh();
            normalGrid.getView().refresh();
        }
    }
}, function() {
    this.borrow(Ext.view.Table, ['prepareFeatures']);
});



