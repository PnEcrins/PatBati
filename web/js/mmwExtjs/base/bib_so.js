mmw.bib_soGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_soGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_soObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_soGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Edition d\'un élément de second œuvre'),
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
		{name:'bib_so__codeso',fieldLabel:mmw.getI18nLabel('bib_so__codeso', 'Elément'),width:250,itemId:'bib_so__codeso',allowBlank:true,xtype:'hidden'},{name:'bib_so__second_oeuvre',fieldLabel:mmw.getI18nLabel('bib_so__second_oeuvre', 'Second oeuvre'),width:250,itemId:'bib_so__second_oeuvre',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_so__codetypeso--name',fieldLabel:mmw.getI18nLabel('bib_so__codetypeso', 'Catégorie'),width:250,itemId:'bib_so__codetypeso',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_soObject, fields: [mmw.baseSfBib_type_soObject.keyField, mmw.baseSfBib_type_soObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'bib_so__codetypeso',displayField:mmw.baseSfBib_type_soObject.displayField,valueField:mmw.baseSfBib_type_soObject.keyField,triggerAction:'all',lastQuery:''}
	]
	]        });
        
        mmw.bib_soGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib so';
mmw.sfBib_soObject = Ext.extend(mmw.sfObject, {
	url: 'bib_so',
	keyField : 'bib_so__codeso',
	displayField: 'bib_so__second_oeuvre',
	singularName: 'bib_so',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_soObject = new mmw.sfBib_soObject;

mmw.bib_soStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_soStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_so__second_oeuvre',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_soObject,
		fields: [
		'bib_so__codeso',
		'bib_so__second_oeuvre',
		'bib_so__codetypeso',
		'bib_so__typeso',
		'bib_so__codetypeso'
	] 
	}, c));
};

Ext.extend(mmw.bib_soStore, mmw.Store);

mmw.bib_soFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_soFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_soObject,
			itemsLists: [
		[
		{name:'bib_so__codeso',fieldLabel:mmw.getI18nLabel('bib_so__codeso', 'Elément'),width:250,itemId:'bib_so__codeso',allowBlank:true,xtype:'hidden'},{name:'bib_so__second_oeuvre',fieldLabel:mmw.getI18nLabel('bib_so__second_oeuvre', 'Second oeuvre'),width:250,itemId:'bib_so__second_oeuvre',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_so__codetypeso--name',fieldLabel:mmw.getI18nLabel('bib_so__codetypeso', 'Catégorie'),width:250,itemId:'bib_so__codetypeso',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_soObject, fields: [mmw.baseSfBib_type_soObject.keyField, mmw.baseSfBib_type_soObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'bib_so__codetypeso',displayField:mmw.baseSfBib_type_soObject.displayField,valueField:mmw.baseSfBib_type_soObject.keyField,triggerAction:'all',lastQuery:''}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_soFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_soGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_soObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_soGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_so__codeso',type:'string',disabled:true},
		{dataIndex:'bib_so__second_oeuvre',type:'string'},
		{dataIndex:'bib_so__typeso',type:'string'},
		{dataIndex:'bib_so__codetypeso',options:Ext.decode(this.filtersData['bib_so__codetypeso']),type:'list'}
	]	}, c));
};

Ext.extend(mmw.bib_soGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_soGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_soGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_soStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_soObject; 
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
		{header:mmw.getI18nColumnHeader('bib_so__codeso', 'N°'),hidden:1,width:75,sortable:true,dataIndex:'bib_so__codeso'},
		{header:mmw.getI18nColumnHeader('bib_so__second_oeuvre', 'Second oeuvre'),width:75,sortable:true,dataIndex:'bib_so__second_oeuvre'},
		{header:mmw.getI18nColumnHeader('bib_so__codetypeso', 'Code catégorie'),hidden:1,width:75,sortable:true,dataIndex:'bib_so__codetypeso'},
		{header:mmw.getI18nColumnHeader('bib_so__typeso', 'Catégorie'),width:75,sortable:true,dataIndex:'bib_so__typeso'}
	]        });
        mmw.bib_soGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_soEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_soEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_soStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_soObject;
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
		{header:mmw.getI18nColumnHeader('bib_so__codeso', 'Elément'),hidden:1,width:75,sortable:true,dataIndex:'bib_so__codeso',editor:{itemId:'bib_so__codeso',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_so__second_oeuvre', 'Second oeuvre'),width:75,sortable:true,dataIndex:'bib_so__second_oeuvre',editor:{itemId:'bib_so__second_oeuvre',allowBlank:true,maxLength:50,xtype:'textfield'}},
		{header:mmw.getI18nColumnHeader('bib_so__codetypeso', 'Catégorie'),width:75,sortable:true,dataIndex:'bib_so__codetypeso',editor:{itemId:'bib_so__codetypeso',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_soObject, fields: [mmw.baseSfBib_type_soObject.keyField, mmw.baseSfBib_type_soObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_type_soObject.displayField,valueField:mmw.baseSfBib_type_soObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }}
	]		});
		mmw.bib_soEditorGridPanel.superclass.initComponent.call(this);
	}
});