mmw.bib_meoeuvreGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_meoeuvreGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_meoeuvreObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_meoeuvreGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_meoeuvre__codemeo',fieldLabel:mmw.getI18nLabel('bib_meoeuvre__codemeo', 'Codemeo'),width:250,itemId:'bib_meoeuvre__codemeo',allowBlank:true,xtype:'hidden'},{name:'bib_meoeuvre__meoeuvre',fieldLabel:mmw.getI18nLabel('bib_meoeuvre__meoeuvre', 'Meoeuvre'),width:250,itemId:'bib_meoeuvre__meoeuvre',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_meoeuvre__rel_matge_meos_list',fieldLabel:mmw.getI18nLabel('bib_meoeuvre__rel_matge_meos_list', 'Rel matge meos list'),width:450,itemId:'bib_meoeuvre__rel_matge_meos_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_materiaux_geStore,height:130}
	]
	]        });
        
        mmw.bib_meoeuvreGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib meoeuvre';
mmw.sfBib_meoeuvreObject = Ext.extend(mmw.sfObject, {
	url: 'bib_meoeuvre',
	keyField : 'bib_meoeuvre__codemeo',
	displayField: 'bib_meoeuvre__meoeuvre',
	singularName: 'bib_meoeuvre',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_meoeuvreObject = new mmw.sfBib_meoeuvreObject;

mmw.bib_meoeuvreStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_meoeuvreStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_meoeuvre__meoeuvre',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_meoeuvreObject,
		fields: [
		'bib_meoeuvre__codemeo',
		'bib_meoeuvre__meoeuvre',
		'bib_meoeuvre__codematgelist'
	] 
	}, c));
};

Ext.extend(mmw.bib_meoeuvreStore, mmw.Store);

mmw.bib_meoeuvreFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_meoeuvreFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_meoeuvreObject,
			itemsLists: [
		[
		{name:'bib_meoeuvre__codemeo',fieldLabel:mmw.getI18nLabel('bib_meoeuvre__codemeo', 'Codemeo'),width:250,itemId:'bib_meoeuvre__codemeo',allowBlank:true,xtype:'hidden'},{name:'bib_meoeuvre__meoeuvre',fieldLabel:mmw.getI18nLabel('bib_meoeuvre__meoeuvre', 'Meoeuvre'),width:250,itemId:'bib_meoeuvre__meoeuvre',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_meoeuvre__rel_matge_meos_list',fieldLabel:mmw.getI18nLabel('bib_meoeuvre__rel_matge_meos_list', 'Rel matge meos list'),width:450,itemId:'bib_meoeuvre__rel_matge_meos_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_materiaux_geStore,height:130}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_meoeuvreFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_meoeuvreGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_meoeuvreObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_meoeuvreGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_meoeuvre__codemeo',type:'string',disabled:true},
		{dataIndex:'bib_meoeuvre__meoeuvre',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_meoeuvreGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_meoeuvreGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_meoeuvreGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_meoeuvreStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_meoeuvreObject; 
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
		{header:mmw.getI18nColumnHeader('bib_meoeuvre__codemeo', 'Codemeo'),hidden:1,width:75,sortable:true,dataIndex:'bib_meoeuvre__codemeo'},
		{header:mmw.getI18nColumnHeader('bib_meoeuvre__meoeuvre', 'Meoeuvre'),width:75,sortable:true,dataIndex:'bib_meoeuvre__meoeuvre'}
	]        });
        mmw.bib_meoeuvreGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_meoeuvreEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_meoeuvreEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_meoeuvreStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_meoeuvreObject;
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
		{header:mmw.getI18nColumnHeader('bib_meoeuvre__codemeo', 'Codemeo'),hidden:1,width:75,sortable:true,dataIndex:'bib_meoeuvre__codemeo',editor:{itemId:'bib_meoeuvre__codemeo',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_meoeuvre__meoeuvre', 'Meoeuvre'),width:75,sortable:true,dataIndex:'bib_meoeuvre__meoeuvre',editor:{itemId:'bib_meoeuvre__meoeuvre',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_meoeuvreEditorGridPanel.superclass.initComponent.call(this);
	}
});