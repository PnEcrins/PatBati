mmw.bib_materiaux_geGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_geGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_materiaux_geObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_materiaux_geGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_materiaux_ge__codematge',fieldLabel:mmw.getI18nLabel('bib_materiaux_ge__codematge', 'Codematge'),width:250,itemId:'bib_materiaux_ge__codematge',allowBlank:true,xtype:'hidden'},{name:'bib_materiaux_ge__matge',fieldLabel:mmw.getI18nLabel('bib_materiaux_ge__matge', 'Matge'),width:250,itemId:'bib_materiaux_ge__matge',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_materiaux_ge__rel_matge_meos_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_ge__rel_matge_meos_list', 'Rel matge meos list'),width:450,itemId:'bib_materiaux_ge__rel_matge_meos_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_meoeuvreStore,height:130}
	]
	]        });
        
        mmw.bib_materiaux_geGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib materiaux ge';
mmw.sfBib_materiaux_geObject = Ext.extend(mmw.sfObject, {
	url: 'bib_materiaux_ge',
	keyField : 'bib_materiaux_ge__codematge',
	displayField: 'bib_materiaux_ge__matge',
	singularName: 'bib_materiaux_ge',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_materiaux_geObject = new mmw.sfBib_materiaux_geObject;

mmw.bib_materiaux_geStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_materiaux_geStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_materiaux_ge__matge',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_materiaux_geObject,
		fields: [
		'bib_materiaux_ge__codematge',
		'bib_materiaux_ge__matge'
	] 
	}, c));
};

Ext.extend(mmw.bib_materiaux_geStore, mmw.Store);

mmw.bib_materiaux_geFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_geFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_materiaux_geObject,
			itemsLists: [
		[
		{name:'bib_materiaux_ge__codematge',fieldLabel:mmw.getI18nLabel('bib_materiaux_ge__codematge', 'Codematge'),width:250,itemId:'bib_materiaux_ge__codematge',allowBlank:true,xtype:'hidden'},{name:'bib_materiaux_ge__matge',fieldLabel:mmw.getI18nLabel('bib_materiaux_ge__matge', 'Matge'),width:250,itemId:'bib_materiaux_ge__matge',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_materiaux_ge__rel_matge_meos_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_ge__rel_matge_meos_list', 'Rel matge meos list'),width:450,itemId:'bib_materiaux_ge__rel_matge_meos_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_meoeuvreStore,height:130}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_materiaux_geFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_materiaux_geGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_materiaux_geObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_materiaux_geGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_materiaux_ge__codematge',type:'string',disabled:true},
		{dataIndex:'bib_materiaux_ge__matge',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_materiaux_geGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_materiaux_geGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_geGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_materiaux_geStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_materiaux_geObject; 
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
		{header:mmw.getI18nColumnHeader('bib_materiaux_ge__codematge', 'Codematge'),hidden:1,width:75,sortable:true,dataIndex:'bib_materiaux_ge__codematge'},
		{header:mmw.getI18nColumnHeader('bib_materiaux_ge__matge', 'Matge'),width:75,sortable:true,dataIndex:'bib_materiaux_ge__matge'}
	]        });
        mmw.bib_materiaux_geGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_materiaux_geEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_geEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_materiaux_geStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_materiaux_geObject;
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
		{header:mmw.getI18nColumnHeader('bib_materiaux_ge__codematge', 'Codematge'),hidden:1,width:75,sortable:true,dataIndex:'bib_materiaux_ge__codematge',editor:{itemId:'bib_materiaux_ge__codematge',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_materiaux_ge__matge', 'Matge'),width:75,sortable:true,dataIndex:'bib_materiaux_ge__matge',editor:{itemId:'bib_materiaux_ge__matge',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_materiaux_geEditorGridPanel.superclass.initComponent.call(this);
	}
});