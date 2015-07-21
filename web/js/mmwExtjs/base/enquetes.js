mmw.enquetesGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('enquetesGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfEnquetesObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.enquetesGridPanel(this.overrideGridConfig);
		
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
		{name:'enquetes__indexenquete',fieldLabel:mmw.getI18nLabel('enquetes__indexenquete', 'Indexenquete'),width:250,itemId:'enquetes__indexenquete',allowBlank:true,xtype:'hidden'},{name:'enquetes__codepersonne--name',fieldLabel:mmw.getI18nLabel('enquetes__codepersonne', 'Codepersonne'),width:250,itemId:'enquetes__codepersonne',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'enquetes__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},{name:'enquetes__indexbatiment--name',fieldLabel:mmw.getI18nLabel('enquetes__indexbatiment', 'Indexbatiment'),width:250,itemId:'enquetes__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'enquetes__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'enquetes__date_enquete',fieldLabel:mmw.getI18nLabel('enquetes__date_enquete', 'Date enquete'),width:250,itemId:'enquetes__date_enquete',allowBlank:true,xtype:'datefield'},{name:'enquetes__date_redaction',fieldLabel:mmw.getI18nLabel('enquetes__date_redaction', 'Date redaction'),width:250,itemId:'enquetes__date_redaction',allowBlank:true,xtype:'datefield'}
	]
	]        });
        
        mmw.enquetesGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'enquetes';
mmw.sfEnquetesObject = Ext.extend(mmw.sfObject, {
	url: 'enquetes',
	keyField : 'enquetes__indexenquete',
	singularName: 'enquetes',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfEnquetesObject = new mmw.sfEnquetesObject;

mmw.enquetesStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.enquetesStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfEnquetesObject,
		fields: [
		'enquetes__indexenquete',
		'enquetes__codepersonne',
		'enquetes__indexbatiment',
		'enquetes__date_enquete',
		'enquetes__date_redaction'
	] 
	}, c));
};

Ext.extend(mmw.enquetesStore, mmw.Store);

mmw.enquetesFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('enquetesFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfEnquetesObject,
			itemsLists: [
		[
		{name:'enquetes__indexenquete',fieldLabel:mmw.getI18nLabel('enquetes__indexenquete', 'Indexenquete'),width:250,itemId:'enquetes__indexenquete',allowBlank:true,xtype:'hidden'},{name:'enquetes__codepersonne--name',fieldLabel:mmw.getI18nLabel('enquetes__codepersonne', 'Codepersonne'),width:250,itemId:'enquetes__codepersonne',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'enquetes__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},{name:'enquetes__indexbatiment--name',fieldLabel:mmw.getI18nLabel('enquetes__indexbatiment', 'Indexbatiment'),width:250,itemId:'enquetes__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'enquetes__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'enquetes__date_enquete',fieldLabel:mmw.getI18nLabel('enquetes__date_enquete', 'Date enquete'),width:250,itemId:'enquetes__date_enquete',allowBlank:true,xtype:'datefield'},{name:'enquetes__date_redaction',fieldLabel:mmw.getI18nLabel('enquetes__date_redaction', 'Date redaction'),width:250,itemId:'enquetes__date_redaction',allowBlank:true,xtype:'datefield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.enquetesFormPanel.superclass.initComponent.call(this);
    }
});

mmw.enquetesGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfEnquetesObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.enquetesGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'enquetes__indexenquete',type:'string',disabled:true},
		{dataIndex:'enquetes__codepersonne',options:Ext.decode(this.filtersData['enquetes__codepersonne']),type:'list'},
		{dataIndex:'enquetes__indexbatiment',options:Ext.decode(this.filtersData['enquetes__indexbatiment']),type:'list'},
		{dataIndex:'enquetes__date_enquete',type:'date'},
		{dataIndex:'enquetes__date_redaction',type:'date'}
	]	}, c));
};

Ext.extend(mmw.enquetesGridFilters, Ext.ux.grid.GridFilters);

mmw.enquetesGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('enquetesGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.enquetesStore();
		var scope = this;
		this.sfObject = mmw.baseSfEnquetesObject; 
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
		{header:mmw.getI18nColumnHeader('enquetes__indexenquete', 'Indexenquete'),hidden:1,width:75,sortable:true,dataIndex:'enquetes__indexenquete'},
		{header:mmw.getI18nColumnHeader('enquetes__codepersonne', 'Codepersonne'),width:75,sortable:true,dataIndex:'enquetes__codepersonne'},
		{header:mmw.getI18nColumnHeader('enquetes__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'enquetes__indexbatiment'},
		{header:mmw.getI18nColumnHeader('enquetes__date_enquete', 'Date enquete'),width:75,sortable:true,dataIndex:'enquetes__date_enquete',renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('enquetes__date_redaction', 'Date redaction'),width:75,sortable:true,dataIndex:'enquetes__date_redaction',renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }}
	]        });
        mmw.enquetesGridPanel.superclass.initComponent.call(this);
    }
});

mmw.enquetesEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('enquetesEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.enquetesStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfEnquetesObject;
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
		{header:mmw.getI18nColumnHeader('enquetes__indexenquete', 'Indexenquete'),hidden:1,width:75,sortable:true,dataIndex:'enquetes__indexenquete',editor:{itemId:'enquetes__indexenquete',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('enquetes__codepersonne', 'Codepersonne'),width:75,sortable:true,dataIndex:'enquetes__codepersonne',editor:{itemId:'enquetes__codepersonne',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('enquetes__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'enquetes__indexbatiment',editor:{itemId:'enquetes__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('enquetes__date_enquete', 'Date enquete'),width:75,sortable:true,dataIndex:'enquetes__date_enquete',editor:{itemId:'enquetes__date_enquete',allowBlank:true,xtype:'datefield'},renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('enquetes__date_redaction', 'Date redaction'),width:75,sortable:true,dataIndex:'enquetes__date_redaction',editor:{itemId:'enquetes__date_redaction',allowBlank:true,xtype:'datefield'},renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }}
	]		});
		mmw.enquetesEditorGridPanel.superclass.initComponent.call(this);
	}
});