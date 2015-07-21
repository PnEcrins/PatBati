mmw.documentGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('documentGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfDocumentObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.documentGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description du document'),
	        defaultType: 'textfield',
	        autoHeight: true,
	        bodyStyle:	'padding:10px 15px;',
	        border: true,
	        style: {"margin-left": "10px"}
		};
		 
		Ext.apply(this, this.initialConfig, {
			frame: true,
		    layout: 'column',	
		    fileUpload: true,
		    items: [{
			        columnWidth: 0.33,
			        layout: 'fit',
			        items:[
			        	this.grid
			        ]
			    }],
			itemsLists: [
		[
		{name:'document__indexbatiment--name',fieldLabel:mmw.getI18nLabel('document__indexbatiment', 'Indexbatiment'),width:250,itemId:'document__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'document__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'document__indexdocument',fieldLabel:mmw.getI18nLabel('document__indexdocument', 'Indexdocument'),width:250,itemId:'document__indexdocument',allowBlank:true,xtype:'hidden'},{name:'document__codepersonne--name',fieldLabel:mmw.getI18nLabel('document__codepersonne', 'Auteur'),width:250,itemId:'document__codepersonne',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'document__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},{name:'document__date_document',fieldLabel:mmw.getI18nLabel('document__date_document', 'Date'),width:250,itemId:'document__date_document',allowBlank:true,xtype:'datefield'},{name:'document__fichier_source',fieldLabel:mmw.getI18nLabel('document__fichier_source', 'Fichier source'),width:250,itemId:'document__fichier_source',allowBlank:true,xtype:'mmwFileUploadField',emptyText:mmw.getI18nGeneral('FileFieldDefaultText'),buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	]        });
        
        mmw.documentGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'document';
mmw.sfDocumentObject = Ext.extend(mmw.sfObject, {
	url: 'document',
	keyField : 'document__indexdocument',
	displayField: 'document__fichier_source',
	singularName: 'document',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s'
});

mmw.baseSfDocumentObject = new mmw.sfDocumentObject;

mmw.documentStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.documentStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'document__fichier_source',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfDocumentObject,
		fields: [
		'document__indexbatiment',
		'document__indexdocument',
		'document__list_link'
	] 
	}, c));
};

Ext.extend(mmw.documentStore, mmw.Store);

mmw.documentFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('documentFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfDocumentObject,
			itemsLists: [
		[
		{name:'document__indexbatiment--name',fieldLabel:mmw.getI18nLabel('document__indexbatiment', 'Indexbatiment'),width:250,itemId:'document__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'document__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'document__indexdocument',fieldLabel:mmw.getI18nLabel('document__indexdocument', 'Indexdocument'),width:250,itemId:'document__indexdocument',allowBlank:true,xtype:'hidden'},{name:'document__codepersonne--name',fieldLabel:mmw.getI18nLabel('document__codepersonne', 'Auteur'),width:250,itemId:'document__codepersonne',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'document__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},{name:'document__date_document',fieldLabel:mmw.getI18nLabel('document__date_document', 'Date'),width:250,itemId:'document__date_document',allowBlank:true,xtype:'datefield'},{name:'document__fichier_source',fieldLabel:mmw.getI18nLabel('document__fichier_source', 'Fichier source'),width:250,itemId:'document__fichier_source',allowBlank:true,maxLength:100,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
            fileUpload: true          });
		mmw.documentFormPanel.superclass.initComponent.call(this);
    }
});

mmw.documentGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfDocumentObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.documentGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'document__indexbatiment',options:Ext.decode(this.filtersData['document__indexbatiment']),type:'list'},
		{dataIndex:'document__indexdocument',type:'string',disabled:true}
	]	}, c));
};

Ext.extend(mmw.documentGridFilters, Ext.ux.grid.GridFilters);

mmw.documentGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('documentGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.documentStore();
		var scope = this;
		this.sfObject = mmw.baseSfDocumentObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des documents'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 20,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Documents {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de documents')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('document__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'document__indexbatiment'},
		{header:mmw.getI18nColumnHeader('document__indexdocument', 'Indexdocument'),hidden:1,width:75,sortable:true,dataIndex:'document__indexdocument'},
		{header:mmw.getI18nColumnHeader('document__list_link', 'List link'),width:75,sortable:false,dataIndex:'document__list_link',renderer: function(id) { return '<a href="document/show?indexdocument=' + id + '">' + id + '</a>'; }}
	]        });
        mmw.documentGridPanel.superclass.initComponent.call(this);
    }
});

mmw.documentEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('documentEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.documentStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfDocumentObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des documents'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Documents {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de documents')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('document__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'document__indexbatiment',editor:{itemId:'document__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('document__indexdocument', 'Indexdocument'),hidden:1,width:75,sortable:true,dataIndex:'document__indexdocument',editor:{itemId:'document__indexdocument',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('document__list_link', 'List link'),width:75,sortable:false,dataIndex:'document__list_link'}
	]		});
		mmw.documentEditorGridPanel.superclass.initComponent.call(this);
	}
});