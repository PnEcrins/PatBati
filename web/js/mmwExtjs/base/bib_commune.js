mmw.bib_communeGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_communeGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_communeObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_communeGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_commune__codeinsee',fieldLabel:mmw.getI18nLabel('bib_commune__codeinsee', 'Codeinsee'),width:250,itemId:'bib_commune__codeinsee',allowBlank:true,xtype:'hidden'},{name:'bib_commune__codecanton--name',fieldLabel:mmw.getI18nLabel('bib_commune__codecanton', 'Codecanton'),width:250,itemId:'bib_commune__codecanton',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_cantonObject, fields: [mmw.baseSfBib_cantonObject.keyField, mmw.baseSfBib_cantonObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'bib_commune__codecanton',displayField:mmw.baseSfBib_cantonObject.displayField,valueField:mmw.baseSfBib_cantonObject.keyField,triggerAction:'all',lastQuery:''},{name:'bib_commune__codesecteur--name',fieldLabel:mmw.getI18nLabel('bib_commune__codesecteur', 'Codesecteur'),width:250,itemId:'bib_commune__codesecteur',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_secteurObject, fields: [mmw.baseSfBib_secteurObject.keyField, mmw.baseSfBib_secteurObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'bib_commune__codesecteur',displayField:mmw.baseSfBib_secteurObject.displayField,valueField:mmw.baseSfBib_secteurObject.keyField,triggerAction:'all',lastQuery:''},{name:'bib_commune__commune',fieldLabel:mmw.getI18nLabel('bib_commune__commune', 'Commune'),width:250,itemId:'bib_commune__commune',allowBlank:true,maxLength:30,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_communeGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib commune';
mmw.sfBib_communeObject = Ext.extend(mmw.sfObject, {
	url: 'bib_commune',
	keyField : 'bib_commune__codeinsee',
	displayField: 'bib_commune__commune',
	singularName: 'bib_commune',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_communeObject = new mmw.sfBib_communeObject;

mmw.bib_communeStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_communeStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_commune__commune',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_communeObject,
		fields: [
		'bib_commune__codeinsee',
		'bib_commune__codecanton',
		'bib_commune__codesecteur',
		'bib_commune__commune'
	] 
	}, c));
};

Ext.extend(mmw.bib_communeStore, mmw.Store);

mmw.bib_communeFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_communeFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_communeObject,
			itemsLists: [
		[
		{name:'bib_commune__codeinsee',fieldLabel:mmw.getI18nLabel('bib_commune__codeinsee', 'Codeinsee'),width:250,itemId:'bib_commune__codeinsee',allowBlank:true,xtype:'hidden'},{name:'bib_commune__codecanton--name',fieldLabel:mmw.getI18nLabel('bib_commune__codecanton', 'Codecanton'),width:250,itemId:'bib_commune__codecanton',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_cantonObject, fields: [mmw.baseSfBib_cantonObject.keyField, mmw.baseSfBib_cantonObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'bib_commune__codecanton',displayField:mmw.baseSfBib_cantonObject.displayField,valueField:mmw.baseSfBib_cantonObject.keyField,triggerAction:'all',lastQuery:''},{name:'bib_commune__codesecteur--name',fieldLabel:mmw.getI18nLabel('bib_commune__codesecteur', 'Codesecteur'),width:250,itemId:'bib_commune__codesecteur',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_secteurObject, fields: [mmw.baseSfBib_secteurObject.keyField, mmw.baseSfBib_secteurObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'bib_commune__codesecteur',displayField:mmw.baseSfBib_secteurObject.displayField,valueField:mmw.baseSfBib_secteurObject.keyField,triggerAction:'all',lastQuery:''},{name:'bib_commune__commune',fieldLabel:mmw.getI18nLabel('bib_commune__commune', 'Commune'),width:250,itemId:'bib_commune__commune',allowBlank:true,maxLength:30,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_communeFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_communeGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_communeObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_communeGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_commune__codeinsee',type:'string',disabled:true},
		{dataIndex:'bib_commune__codecanton',options:Ext.decode(this.filtersData['bib_commune__codecanton']),type:'list'},
		{dataIndex:'bib_commune__codesecteur',options:Ext.decode(this.filtersData['bib_commune__codesecteur']),type:'list'},
		{dataIndex:'bib_commune__commune',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_communeGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_communeGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_communeGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_communeStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_communeObject; 
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
		{header:mmw.getI18nColumnHeader('bib_commune__codeinsee', 'Codeinsee'),hidden:1,width:75,sortable:true,dataIndex:'bib_commune__codeinsee'},
		{header:mmw.getI18nColumnHeader('bib_commune__codecanton', 'Codecanton'),width:75,sortable:true,dataIndex:'bib_commune__codecanton'},
		{header:mmw.getI18nColumnHeader('bib_commune__codesecteur', 'Codesecteur'),width:75,sortable:true,dataIndex:'bib_commune__codesecteur'},
		{header:mmw.getI18nColumnHeader('bib_commune__commune', 'Commune'),width:75,sortable:true,dataIndex:'bib_commune__commune'}
	]        });
        mmw.bib_communeGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_communeEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_communeEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_communeStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_communeObject;
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
		{header:mmw.getI18nColumnHeader('bib_commune__codeinsee', 'Codeinsee'),hidden:1,width:75,sortable:true,dataIndex:'bib_commune__codeinsee',editor:{itemId:'bib_commune__codeinsee',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_commune__codecanton', 'Codecanton'),width:75,sortable:true,dataIndex:'bib_commune__codecanton',editor:{itemId:'bib_commune__codecanton',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_cantonObject, fields: [mmw.baseSfBib_cantonObject.keyField, mmw.baseSfBib_cantonObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_cantonObject.displayField,valueField:mmw.baseSfBib_cantonObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('bib_commune__codesecteur', 'Codesecteur'),width:75,sortable:true,dataIndex:'bib_commune__codesecteur',editor:{itemId:'bib_commune__codesecteur',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_secteurObject, fields: [mmw.baseSfBib_secteurObject.keyField, mmw.baseSfBib_secteurObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_secteurObject.displayField,valueField:mmw.baseSfBib_secteurObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('bib_commune__commune', 'Commune'),width:75,sortable:true,dataIndex:'bib_commune__commune',editor:{itemId:'bib_commune__commune',allowBlank:true,maxLength:30,xtype:'textfield'}}
	]		});
		mmw.bib_communeEditorGridPanel.superclass.initComponent.call(this);
	}
});