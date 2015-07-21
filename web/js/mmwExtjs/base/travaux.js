mmw.travauxGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('travauxGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfTravauxObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.travauxGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description du travail'),
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
		{name:'travaux__indexdemande--name',fieldLabel:mmw.getI18nLabel('travaux__indexdemande', 'Indexdemande'),width:250,itemId:'travaux__indexdemande',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfDemandeObject, fields: [mmw.baseSfDemandeObject.keyField, mmw.baseSfDemandeObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'travaux__indexdemande',displayField:mmw.baseSfDemandeObject.displayField,valueField:mmw.baseSfDemandeObject.keyField,triggerAction:'all',lastQuery:''},{name:'travaux__indextravaux',fieldLabel:mmw.getI18nLabel('travaux__indextravaux', 'Indextravaux'),width:250,itemId:'travaux__indextravaux',allowBlank:true,xtype:'hidden'},{name:'travaux__date_travaux',fieldLabel:mmw.getI18nLabel('travaux__date_travaux', 'Date des travaux'),width:250,itemId:'travaux__date_travaux',allowBlank:true,xtype:'datefield'},{name:'travaux__autorisation',fieldLabel:mmw.getI18nLabel('travaux__autorisation', 'Autorisation du parc'),width:250,itemId:'travaux__autorisation',allowBlank:true,xtype:'checkbox'},{name:'travaux__subvention_pne',fieldLabel:mmw.getI18nLabel('travaux__subvention_pne', 'Subvention accordée par le parc'),width:250,itemId:'travaux__subvention_pne',allowBlank:true,xtype:'textfield',vtype:'num'},{name:'travaux__codenature--name',fieldLabel:mmw.getI18nLabel('travaux__codenature', 'Nature des travaux'),width:250,itemId:'travaux__codenature',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_natureObject, fields: [mmw.baseSfBib_natureObject.keyField, mmw.baseSfBib_natureObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'travaux__codenature',displayField:mmw.baseSfBib_natureObject.displayField,valueField:mmw.baseSfBib_natureObject.keyField,triggerAction:'all',lastQuery:''},{name:'travaux__codeusage--name',fieldLabel:mmw.getI18nLabel('travaux__codeusage', 'Nouvel usage'),width:250,itemId:'travaux__codeusage',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_usageObject, fields: [mmw.baseSfBib_usageObject.keyField, mmw.baseSfBib_usageObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'travaux__codeusage',displayField:mmw.baseSfBib_usageObject.displayField,valueField:mmw.baseSfBib_usageObject.keyField,triggerAction:'all',lastQuery:''}
	]
	]        });
        
        mmw.travauxGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'travaux';
mmw.sfTravauxObject = Ext.extend(mmw.sfObject, {
	url: 'travaux',
	keyField : 'travaux__indextravaux',
	singularName: 'travaux',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfTravauxObject = new mmw.sfTravauxObject;

mmw.travauxStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.travauxStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfTravauxObject,
		fields: [
		'travaux__indexdemande',
		'travaux__indextravaux',
		'travaux__date_travaux',
		'travaux__autorisation',
		'travaux__subvention_pne',
		'travaux__codenature',
		'travaux__codeusage'
	] 
	}, c));
};

Ext.extend(mmw.travauxStore, mmw.Store);

mmw.travauxFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('travauxFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfTravauxObject,
			itemsLists: [
		[
		{name:'travaux__indexdemande--name',fieldLabel:mmw.getI18nLabel('travaux__indexdemande', 'Indexdemande'),width:250,itemId:'travaux__indexdemande',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfDemandeObject, fields: [mmw.baseSfDemandeObject.keyField, mmw.baseSfDemandeObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'travaux__indexdemande',displayField:mmw.baseSfDemandeObject.displayField,valueField:mmw.baseSfDemandeObject.keyField,triggerAction:'all',lastQuery:''},{name:'travaux__indextravaux',fieldLabel:mmw.getI18nLabel('travaux__indextravaux', 'Indextravaux'),width:250,itemId:'travaux__indextravaux',allowBlank:true,xtype:'hidden'},{name:'travaux__date_travaux',fieldLabel:mmw.getI18nLabel('travaux__date_travaux', 'Date des travaux'),width:250,itemId:'travaux__date_travaux',allowBlank:true,xtype:'datefield'},{name:'travaux__autorisation',fieldLabel:mmw.getI18nLabel('travaux__autorisation', 'Autorisation du parc'),width:250,itemId:'travaux__autorisation',allowBlank:true,xtype:'checkbox'},{name:'travaux__subvention_pne',fieldLabel:mmw.getI18nLabel('travaux__subvention_pne', 'Subvention accordée par le parc'),width:250,itemId:'travaux__subvention_pne',allowBlank:true,xtype:'textfield',vtype:'num'},{name:'travaux__codenature--name',fieldLabel:mmw.getI18nLabel('travaux__codenature', 'Nature des travaux'),width:250,itemId:'travaux__codenature',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_natureObject, fields: [mmw.baseSfBib_natureObject.keyField, mmw.baseSfBib_natureObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'travaux__codenature',displayField:mmw.baseSfBib_natureObject.displayField,valueField:mmw.baseSfBib_natureObject.keyField,triggerAction:'all',lastQuery:''},{name:'travaux__codeusage--name',fieldLabel:mmw.getI18nLabel('travaux__codeusage', 'Nouvel usage'),width:250,itemId:'travaux__codeusage',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_usageObject, fields: [mmw.baseSfBib_usageObject.keyField, mmw.baseSfBib_usageObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'travaux__codeusage',displayField:mmw.baseSfBib_usageObject.displayField,valueField:mmw.baseSfBib_usageObject.keyField,triggerAction:'all',lastQuery:''}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.travauxFormPanel.superclass.initComponent.call(this);
    }
});

mmw.travauxGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfTravauxObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.travauxGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'travaux__indexdemande',options:Ext.decode(this.filtersData['travaux__indexdemande']),type:'list'},
		{dataIndex:'travaux__indextravaux',type:'string',disabled:true},
		{dataIndex:'travaux__date_travaux',type:'date'},
		{dataIndex:'travaux__autorisation',options:Ext.decode(this.filtersData['travaux__autorisation']),type:'list'},
		{dataIndex:'travaux__subvention_pne',type:'string'},
		{dataIndex:'travaux__codenature',options:Ext.decode(this.filtersData['travaux__codenature']),type:'list'},
		{dataIndex:'travaux__codeusage',options:Ext.decode(this.filtersData['travaux__codeusage']),type:'list'}
	]	}, c));
};

Ext.extend(mmw.travauxGridFilters, Ext.ux.grid.GridFilters);

mmw.travauxGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('travauxGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.travauxStore();
		var scope = this;
		this.sfObject = mmw.baseSfTravauxObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Travaux'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Travaux {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de travaux')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('travaux__indexdemande', 'Indexdemande'),width:75,sortable:true,dataIndex:'travaux__indexdemande'},
		{header:mmw.getI18nColumnHeader('travaux__indextravaux', 'Indextravaux'),hidden:1,width:75,sortable:true,dataIndex:'travaux__indextravaux'},
		{header:mmw.getI18nColumnHeader('travaux__date_travaux', 'Date des travaux'),width:75,sortable:true,dataIndex:'travaux__date_travaux',renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('travaux__autorisation', 'Autorisation du parc'),width:75,sortable:true,dataIndex:'travaux__autorisation',renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('travaux__subvention_pne', 'Subvention accordée par le parc'),width:75,sortable:true,dataIndex:'travaux__subvention_pne'},
		{header:mmw.getI18nColumnHeader('travaux__codenature', 'Nature des travaux'),width:75,sortable:true,dataIndex:'travaux__codenature'},
		{header:mmw.getI18nColumnHeader('travaux__codeusage', 'Nouvel usage'),width:75,sortable:true,dataIndex:'travaux__codeusage'}
	]        });
        mmw.travauxGridPanel.superclass.initComponent.call(this);
    }
});

mmw.travauxEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('travauxEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.travauxStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfTravauxObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Travaux'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Travaux {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de travaux')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('travaux__indexdemande', 'Indexdemande'),width:75,sortable:true,dataIndex:'travaux__indexdemande',editor:{itemId:'travaux__indexdemande',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfDemandeObject, fields: [mmw.baseSfDemandeObject.keyField, mmw.baseSfDemandeObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfDemandeObject.displayField,valueField:mmw.baseSfDemandeObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('travaux__indextravaux', 'Indextravaux'),hidden:1,width:75,sortable:true,dataIndex:'travaux__indextravaux',editor:{itemId:'travaux__indextravaux',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('travaux__date_travaux', 'Date des travaux'),width:75,sortable:true,dataIndex:'travaux__date_travaux',editor:{itemId:'travaux__date_travaux',allowBlank:true,xtype:'datefield'},renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('travaux__autorisation', 'Autorisation du parc'),width:75,sortable:true,dataIndex:'travaux__autorisation',editor:{itemId:'travaux__autorisation',allowBlank:true,xtype:'checkbox'},renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('travaux__subvention_pne', 'Subvention accordée par le parc'),width:75,sortable:true,dataIndex:'travaux__subvention_pne',editor:{itemId:'travaux__subvention_pne',allowBlank:true,xtype:'textfield',vtype:'num'}},
		{header:mmw.getI18nColumnHeader('travaux__codenature', 'Nature des travaux'),width:75,sortable:true,dataIndex:'travaux__codenature',editor:{itemId:'travaux__codenature',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_natureObject, fields: [mmw.baseSfBib_natureObject.keyField, mmw.baseSfBib_natureObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_natureObject.displayField,valueField:mmw.baseSfBib_natureObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('travaux__codeusage', 'Nouvel usage'),width:75,sortable:true,dataIndex:'travaux__codeusage',editor:{itemId:'travaux__codeusage',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_usageObject, fields: [mmw.baseSfBib_usageObject.keyField, mmw.baseSfBib_usageObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_usageObject.displayField,valueField:mmw.baseSfBib_usageObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }}
	]		});
		mmw.travauxEditorGridPanel.superclass.initComponent.call(this);
	}
});