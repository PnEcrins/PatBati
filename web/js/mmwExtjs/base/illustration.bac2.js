mmw.illustrationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('illustrationGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfIllustrationObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.illustrationGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description de l\'illustration'),
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
		{name:'illustration__indexbatiment--name',fieldLabel:mmw.getI18nLabel('illustration__indexbatiment', 'Indexbatiment'),width:250,itemId:'illustration__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'illustration__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'illustration__indexilustration',fieldLabel:mmw.getI18nLabel('illustration__indexilustration', 'Indexilustration'),width:250,itemId:'illustration__indexilustration',allowBlank:true,xtype:'hidden'},{name:'illustration__codeillustration--name',fieldLabel:mmw.getI18nLabel('illustration__codeillustration', 'Type d\'illustration'),width:250,itemId:'illustration__codeillustration',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_illustrationObject, fields: [mmw.baseSfBib_illustrationObject.keyField, mmw.baseSfBib_illustrationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'illustration__codeillustration',displayField:mmw.baseSfBib_illustrationObject.displayField,valueField:mmw.baseSfBib_illustrationObject.keyField,triggerAction:'all',lastQuery:''},{name:'illustration__codepersonne--name',fieldLabel:mmw.getI18nLabel('illustration__codepersonne', 'Auteur'),width:250,itemId:'illustration__codepersonne',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'illustration__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},{name:'illustration__date_illustration',fieldLabel:mmw.getI18nLabel('illustration__date_illustration', 'Date'),width:250,itemId:'illustration__date_illustration',allowBlank:true,xtype:'datefield', format: 'd M Y'},{name:'illustration__fichier_source',fieldLabel:mmw.getI18nLabel('illustration__fichier_source', 'Fichier source'),width:250,itemId:'illustration__fichier_source',allowBlank:true,xtype:'mmwFileUploadField',emptyText:mmw.getI18nGeneral('FileFieldDefaultText'),buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	]        });
        
        mmw.illustrationGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'illustration';
mmw.sfIllustrationObject = Ext.extend(mmw.sfObject, {
	url: 'illustration',
	keyField : 'illustration__indexilustration',
	displayField: 'illustration__codeillustration',
	singularName: 'illustration',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfIllustrationObject = new mmw.sfIllustrationObject;

mmw.illustrationStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.illustrationStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'illustration__codeillustration',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfIllustrationObject,
		fields: [
		'illustration__indexbatiment',
		'illustration__indexilustration',
		'illustration__codeillustration',
		'illustration__list_thumb'
	] 
	}, c));
};

Ext.extend(mmw.illustrationStore, mmw.Store);

mmw.illustrationFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('illustrationFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfIllustrationObject,
			itemsLists: [
		[
		{name:'illustration__indexbatiment--name',fieldLabel:mmw.getI18nLabel('illustration__indexbatiment', 'Indexbatiment'),width:250,itemId:'illustration__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'illustration__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'illustration__indexilustration',fieldLabel:mmw.getI18nLabel('illustration__indexilustration', 'Indexilustration'),width:250,itemId:'illustration__indexilustration',allowBlank:true,xtype:'hidden'},{name:'illustration__codeillustration--name',fieldLabel:mmw.getI18nLabel('illustration__codeillustration', 'Type d\'illustration'),width:250,itemId:'illustration__codeillustration',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_illustrationObject, fields: [mmw.baseSfBib_illustrationObject.keyField, mmw.baseSfBib_illustrationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'illustration__codeillustration',displayField:mmw.baseSfBib_illustrationObject.displayField,valueField:mmw.baseSfBib_illustrationObject.keyField,triggerAction:'all',lastQuery:''},{name:'illustration__codepersonne--name',fieldLabel:mmw.getI18nLabel('illustration__codepersonne', 'Auteur'),width:250,itemId:'illustration__codepersonne',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_personnesObject, fields: [mmw.baseSfBib_personnesObject.keyField, mmw.baseSfBib_personnesObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'illustration__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,triggerAction:'all',lastQuery:''},{name:'illustration__date_illustration',fieldLabel:mmw.getI18nLabel('illustration__date_illustration', 'Date'),width:250,itemId:'illustration__date_illustration',allowBlank:true,xtype:'datefield'},{name:'illustration__fichier_source',fieldLabel:mmw.getI18nLabel('illustration__fichier_source', 'Fichier source'),width:250,itemId:'illustration__fichier_source',allowBlank:true,xtype:'mmwFileUploadField',emptyText:mmw.getI18nGeneral('FileFieldDefaultText'),buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	],
            bodyStyle: 'padding: 10px',
            fileUpload: true,        });
		mmw.illustrationFormPanel.superclass.initComponent.call(this);
    }
});

mmw.illustrationGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfIllustrationObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.illustrationGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'illustration__indexbatiment',options:Ext.decode(this.filtersData['illustration__indexbatiment']),type:'list'},
		{dataIndex:'illustration__indexilustration',type:'string',disabled:true},
		{dataIndex:'illustration__codeillustration',options:Ext.decode(this.filtersData['illustration__codeillustration']),type:'list'}
	]	}, c));
};

Ext.extend(mmw.illustrationGridFilters, Ext.ux.grid.GridFilters);

mmw.illustrationGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('illustrationGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.illustrationStore();
		var scope = this;
		this.sfObject = mmw.baseSfIllustrationObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des illustrations'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 20,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Illustrations {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'illustrations')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('illustration__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'illustration__indexbatiment'},
		{header:mmw.getI18nColumnHeader('illustration__indexilustration', 'Indexilustration'),hidden:1,width:75,sortable:true,dataIndex:'illustration__indexilustration'},
		{header:mmw.getI18nColumnHeader('illustration__codeillustration', 'Type d\'illustration'),width:75,sortable:false,dataIndex:'illustration__codeillustration'},
		{header:mmw.getI18nColumnHeader('illustration__list_thumb', 'Aperçu'),width:75,sortable:false,dataIndex:'illustration__list_thumb'}
	]        });
        mmw.illustrationGridPanel.superclass.initComponent.call(this);
    }
});

mmw.illustrationEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('illustrationEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.illustrationStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfIllustrationObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des illustrations'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Illustrations {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'illustrations')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('illustration__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'illustration__indexbatiment',editor:{itemId:'illustration__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('illustration__indexilustration', 'Indexilustration'),hidden:1,width:75,sortable:true,dataIndex:'illustration__indexilustration',editor:{itemId:'illustration__indexilustration',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('illustration__codeillustration', 'Type d\'illustration'),width:75,sortable:false,dataIndex:'illustration__codeillustration',editor:{itemId:'illustration__codeillustration',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_illustrationObject, fields: [mmw.baseSfBib_illustrationObject.keyField, mmw.baseSfBib_illustrationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_illustrationObject.displayField,valueField:mmw.baseSfBib_illustrationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('illustration__list_thumb', 'Aperçu'),width:75,sortable:false,dataIndex:'illustration__list_thumb'}
	]		});
		mmw.illustrationEditorGridPanel.superclass.initComponent.call(this);
	}
});