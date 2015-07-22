mmw.documentsGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('documentsGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfDocumentsObject;
		
		// this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['title'] = 'Liste des documents';
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.documentsGridPanel(this.overrideGridConfig);
		
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
		{name:'documents__indexbatiment--name',fieldLabel:mmw.getI18nLabel('documents__indexbatiment', 'Indexbatiment'),width:250,itemId:'documents__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'documents__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'documents__indexdocument',fieldLabel:mmw.getI18nLabel('documents__indexdocument', 'Indexdocument'),width:250,itemId:'documents__indexdocument',allowBlank:true,xtype:'hidden'},{name:'documents__date_document',fieldLabel:mmw.getI18nLabel('documents__date_document', 'Date'),width:250,itemId:'documents__date_document',allowBlank:true,xtype:'datefield'},{name:'documents__fichier_source',fieldLabel:mmw.getI18nLabel('documents__fichier_source', 'Fichier source'),width:250,itemId:'documents__fichier_source',allowBlank:true,xtype:'mmwFileUploadField',emptyText:mmw.getI18nGeneral('FileFieldDefaultText'),buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	]        });
        
        mmw.documentsGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'documents';
mmw.sfDocumentsObject = Ext.extend(mmw.sfObject, {
	url: 'documents',
	keyField : 'documents__indexdocument',
	displayField: 'documents__fichier_source',
	singularName: 'documents',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfDocumentsObject = new mmw.sfDocumentsObject;

mmw.documentsStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.documentsStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'documents__fichier_source',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfDocumentsObject,
		fields: [
		'documents__indexbatiment',
		'documents__indexdocument',
		'documents__fichier_source'
	] 
	}, c));
};

Ext.extend(mmw.documentsStore, mmw.Store);

mmw.documentsFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('documentsFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfDocumentsObject,
			itemsLists: [
		[
		{name:'documents__indexbatiment--name',fieldLabel:mmw.getI18nLabel('documents__indexbatiment', 'Indexbatiment'),width:250,itemId:'documents__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'documents__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'documents__indexdocument',fieldLabel:mmw.getI18nLabel('documents__indexdocument', 'Indexdocument'),width:250,itemId:'documents__indexdocument',allowBlank:true,xtype:'hidden'},{name:'documents__date_document',fieldLabel:mmw.getI18nLabel('documents__date_document', 'Date'),width:250,itemId:'documents__date_document',allowBlank:true,xtype:'datefield'},{name:'documents__fichier_source',fieldLabel:mmw.getI18nLabel('documents__fichier_source', 'Fichier source'),width:250,itemId:'documents__fichier_source',allowBlank:true,xtype:'mmwFileUploadField',emptyText:mmw.getI18nGeneral('FileFieldDefaultText'),buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	],
            bodyStyle: 'padding: 10px',
            fileUpload: true,        });
		mmw.documentsFormPanel.superclass.initComponent.call(this);
    }
});

mmw.documentsGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfDocumentsObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.documentsGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'documents__indexbatiment',options:Ext.decode(this.filtersData['documents__indexbatiment']),type:'list'},
		{dataIndex:'documents__indexdocument',type:'string',disabled:true},
		{dataIndex:'documents__fichier_source',type:'string'}
	]	}, c));
};

Ext.extend(mmw.documentsGridFilters, Ext.ux.grid.GridFilters);

mmw.documentsGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('documentsGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.documentsStore();
		var scope = this;
		this.sfObject = mmw.baseSfDocumentsObject; 
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
		{header:mmw.getI18nColumnHeader('documents__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'documents__indexbatiment'},
		{header:mmw.getI18nColumnHeader('documents__indexdocument', 'Indexdocument'),hidden:1,width:75,sortable:true,dataIndex:'documents__indexdocument'},
		{header:mmw.getI18nColumnHeader('documents__fichier_source', 'Fichier source'),width:75,sortable:false,dataIndex:'documents__fichier_source'}
	]        });
        mmw.documentsGridPanel.superclass.initComponent.call(this);
    }
});

mmw.documentsEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('documentsEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.documentsStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfDocumentsObject;
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
		{header:mmw.getI18nColumnHeader('documents__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'documents__indexbatiment',editor:{itemId:'documents__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('documents__indexdocument', 'Indexdocument'),hidden:1,width:75,sortable:true,dataIndex:'documents__indexdocument',editor:{itemId:'documents__indexdocument',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('documents__fichier_source', 'Fichier source'),width:75,sortable:false,dataIndex:'documents__fichier_source',editor:{itemId:'documents__fichier_source',allowBlank:true,xtype:'mmwFileUploadField',emptyText:mmw.getI18nGeneral('FileFieldDefaultText'),buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}}
	]		});
		mmw.documentsEditorGridPanel.superclass.initComponent.call(this);
	}
});