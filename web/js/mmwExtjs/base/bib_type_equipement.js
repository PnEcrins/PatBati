mmw.bib_type_equipementGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_type_equipementGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_type_equipementObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_type_equipementGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName)),
	        defaultType: 'textfield',
	        autoHeight: true,
	        bodyStyle:	'padding:10px 15px;',
	        border: true,
	        style: {"margin-left": "10px"}
		};
		 
		Ext.apply(this, this.initialConfig, {
			frame: true,
		    layout: 'column',	
		    	
		    items: [{
			        columnWidth: 0.33,
			        layout: 'fit',
			        items:[
			        	this.grid
			        ]
			    }],
			itemsLists: [
		[
		{name:'bib_type_equipement__codetypeequip',fieldLabel:mmw.getI18nLabel('bib_type_equipement__codetypeequip', 'Codetypeequip'),width:250,itemId:'bib_type_equipement__codetypeequip',allowBlank:true,xtype:'hidden'},{name:'bib_type_equipement__type_equip',fieldLabel:mmw.getI18nLabel('bib_type_equipement__type_equip', 'Type equip'),width:250,itemId:'bib_type_equipement__type_equip',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_type_equipementGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib type equipement';
mmw.sfBib_type_equipementObject = Ext.extend(mmw.sfObject, {
	url: 'bib_type_equipement',
	keyField : 'bib_type_equipement__codetypeequip',
	displayField: 'bib_type_equipement__type_equip',
	singularName: 'bib_type_equipement',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_type_equipementObject = new mmw.sfBib_type_equipementObject;

mmw.bib_type_equipementStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_type_equipementStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_type_equipement__type_equip',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_type_equipementObject,
		fields: [
		'bib_type_equipement__codetypeequip',
		'bib_type_equipement__type_equip'
	] 
	}, c));
};

Ext.extend(mmw.bib_type_equipementStore, mmw.Store);

mmw.bib_type_equipementFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_type_equipementFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_type_equipementObject,
			itemsLists: [
		[
		{name:'bib_type_equipement__codetypeequip',fieldLabel:mmw.getI18nLabel('bib_type_equipement__codetypeequip', 'Codetypeequip'),width:250,itemId:'bib_type_equipement__codetypeequip',allowBlank:true,xtype:'hidden'},{name:'bib_type_equipement__type_equip',fieldLabel:mmw.getI18nLabel('bib_type_equipement__type_equip', 'Type equip'),width:250,itemId:'bib_type_equipement__type_equip',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_type_equipementFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_type_equipementGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_type_equipementObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_type_equipementGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_type_equipement__codetypeequip',type:'string',disabled:true},
		{dataIndex:'bib_type_equipement__type_equip',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_type_equipementGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_type_equipementGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_type_equipementGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_type_equipementStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_type_equipementObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName)),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 20,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('bib_type_equipement__codetypeequip', 'Codetypeequip'),hidden:1,width:75,sortable:true,dataIndex:'bib_type_equipement__codetypeequip'},
		{header:mmw.getI18nColumnHeader('bib_type_equipement__type_equip', 'Type equip'),width:75,sortable:true,dataIndex:'bib_type_equipement__type_equip'}
	]        });
        mmw.bib_type_equipementGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_type_equipementEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_type_equipementEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_type_equipementStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_type_equipementObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName)),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('bib_type_equipement__codetypeequip', 'Codetypeequip'),hidden:1,width:75,sortable:true,dataIndex:'bib_type_equipement__codetypeequip',editor:{itemId:'bib_type_equipement__codetypeequip',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_type_equipement__type_equip', 'Type equip'),width:75,sortable:true,dataIndex:'bib_type_equipement__type_equip',editor:{itemId:'bib_type_equipement__type_equip',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_type_equipementEditorGridPanel.superclass.initComponent.call(this);
	}
});