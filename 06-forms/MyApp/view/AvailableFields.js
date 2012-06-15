/**
 * @class MyApp.view.AvailableFields
 * @extends Ext.form.Panel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('MyApp.view.AvailableFields',{
    extend      : 'Ext.form.Panel',
    alias       : 'widget.availablefields',

    title : 'Available fields',
	width : 280,
	bodyPadding : 5,

	initComponent   : function(){
		var me = this;

		me.items = me.buildItems();
		me.tbar = [{text:'Save',handler:me.saveData,scope:me}];

		me.callParent();
	},

	buildItems : function(){
		var txt = Ext.create('Ext.form.field.Text',{
			fieldLabel	: 'First name',
			name		: 'firstname',
			enableKeyEvents : true
		});

		txt.on('keyup',function(field,event,options){
			if(event.getCharCode() === event.ENTER){
				Ext.Msg.alert('Alert','Welcome: '+field.getValue());
			}
		});

		var num = Ext.create('Ext.form.field.Number',{
			emptyText	: 'Price',
			name		: 'price',
			step		: 10,
			minValue	: 30,
			maxValue	: 100,
			flex		: 1,
			margins		: '0 5 0 0'
			//hideTrigger : true
		});

		var store = Ext.create('Ext.data.Store',{
			fields	: ['key','label'],
			autoLoad: true,
			proxy	: {
				type	: 'ajax',
				url		: 'serverside/sizes.json',
				reader	: {
					type	: 'json',
					root	: 'data'
				}
			}
		});
		var combobox = Ext.create('Ext.form.ComboBox',{
			emptyText	: 'Size',
			name		: 'size',
			store		: store,
			queryMode	: 'local',
			displayField: 'label',
			valueField	: 'key',
			forceSelection : true,
			flex		: 1
		});

		combobox.on('select',function(combo,records){
			Ext.Msg.alert('Alert',records[0].get('label'));
		});

		var datefield = Ext.create('Ext.form.field.Date',{
			fieldLabel	: 'Date',
			name		: 'date',
			format		: 'd/m/Y',
			submitFormat: 'Y-m-d H:m:s',
			altFormats	: 'd-m-Y|d m Y|d.m.Y',
			minValue	: new Date(),
			disabledDates: ['30/04/2012','15/05/2012']
		});

		var chkbox = Ext.create('Ext.form.field.Checkbox',{
			fieldLabel	: ' ',
			labelSeparator : '',
			boxLabel	: 'Active',
			name		: 'active'
		});

		var group = Ext.create('Ext.form.CheckboxGroup',{
			fieldLabel	: 'Languages',
			columns		: 2,
			items		: [
				{name:'lan',boxLabel:'JavaScript',inputValue:'js'},
				{name:'lan',boxLabel:'C/C++',inputValue:'c/cpp'},
				{name:'lan',boxLabel:'Java',inputValue:'java'},
				{name:'lan',boxLabel:'PHP',inputValue:'php'},
				{name:'lan',boxLabel:'SQL',inputValue:'sql'},
				{name:'lan',boxLabel:'Python',inputValue:'py'},
				{name:'lan',boxLabel:'Ruby',inputValue:'rb'}
			]
		});

		var yes = Ext.create('Ext.form.field.Radio',{
			name		: 'option',
			boxLabel	: 'Yes',
			inputValue	: true,
			flex		: 1
		}),
		no = Ext.create('Ext.form.field.Radio',{
			name		: 'option',
			boxLabel	: 'No',
			inputValue	: false,
			flex		: 1
		});

		var container = {
			xtype		: 'fieldcontainer',
			fieldLabel	: 'Are you a developer?',
			layout		: 'hbox',
			items		: [yes,no]
		};

		var pricesize = {
			xtype		: 'fieldcontainer',
			fieldLabel	: 'Price/Size',
			layout		: 'hbox',
			items : [num,combobox]
		};
		return [txt, pricesize ,datefield,chkbox,group,container];
	},

	saveData	: function(){
		var me = this;

		me.getForm().submit({
			url		: 'serverside/save.do',
			success	: function(form,action){
				Ext.Msg.alert('Success','Successfully saved');
			},
			failure	: function(form,action){
				Ext.Msg.alert('Failure','Something is wrong');
			}
		});
	}
});