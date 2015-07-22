mmw.demandeGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('demandeGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfDemandeObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.demandeGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description de la demande'),
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
		{name:'demande__indexbatiment--name',fieldLabel:mmw.getI18nLabel('demande__indexbatiment', 'Indexbatiment'),width:250,itemId:'demande__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'demande__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'demande__indexdemande',fieldLabel:mmw.getI18nLabel('demande__indexdemande', 'Indexdemande'),width:250,itemId:'demande__indexdemande',allowBlank:true,xtype:'hidden'},{name:'demande__demandep',fieldLabel:mmw.getI18nLabel('demande__demandep', 'Demande de permis de construire'),width:250,itemId:'demande__demandep',allowBlank:true,xtype:'checkbox'},{name:'demande__date_demandep',fieldLabel:mmw.getI18nLabel('demande__date_demandep', 'Date de la demande'),width:250,itemId:'demande__date_demandep',allowBlank:true,xtype:'datefield'},{name:'demande__autorisationp',fieldLabel:mmw.getI18nLabel('demande__autorisationp', 'Autorisation de permis de construire'),width:250,itemId:'demande__autorisationp',allowBlank:true,xtype:'checkbox'},{name:'demande__date_permis',fieldLabel:mmw.getI18nLabel('demande__date_permis', 'Date du permis'),width:250,itemId:'demande__date_permis',allowBlank:true,xtype:'datefield'},{name:'demande__num_permis',fieldLabel:mmw.getI18nLabel('demande__num_permis', 'N° du permis'),width:250,itemId:'demande__num_permis',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.demandeGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'demande';
mmw.sfDemandeObject = Ext.extend(mmw.sfObject, {
	url: 'demande',
	keyField : 'demande__indexdemande',
	singularName: 'demande',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfDemandeObject = new mmw.sfDemandeObject;

mmw.demandeStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.demandeStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfDemandeObject,
		fields: [
		'demande__indexbatiment',
		'demande__indexdemande',
		'demande__demandep',
		'demande__date_demandep',
		'demande__autorisationp',
		'demande__date_permis',
		'demande__num_permis'
	] 
	}, c));
};

Ext.extend(mmw.demandeStore, mmw.Store);

mmw.demandeFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('demandeFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfDemandeObject,
			itemsLists: [
		[
		{name:'demande__indexbatiment--name',fieldLabel:mmw.getI18nLabel('demande__indexbatiment', 'Indexbatiment'),width:250,itemId:'demande__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'demande__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'demande__indexdemande',fieldLabel:mmw.getI18nLabel('demande__indexdemande', 'Indexdemande'),width:250,itemId:'demande__indexdemande',allowBlank:true,xtype:'hidden'},{name:'demande__demandep',fieldLabel:mmw.getI18nLabel('demande__demandep', 'Demande de permis de construire'),width:250,itemId:'demande__demandep',allowBlank:true,xtype:'checkbox'},{name:'demande__date_demandep',fieldLabel:mmw.getI18nLabel('demande__date_demandep', 'Date de la demande'),width:250,itemId:'demande__date_demandep',allowBlank:true,xtype:'datefield'},{name:'demande__autorisationp',fieldLabel:mmw.getI18nLabel('demande__autorisationp', 'Autorisation de permis de construire'),width:250,itemId:'demande__autorisationp',allowBlank:true,xtype:'checkbox'},{name:'demande__date_permis',fieldLabel:mmw.getI18nLabel('demande__date_permis', 'Date du permis'),width:250,itemId:'demande__date_permis',allowBlank:true,xtype:'datefield'},{name:'demande__num_permis',fieldLabel:mmw.getI18nLabel('demande__num_permis', 'N° du permis'),width:250,itemId:'demande__num_permis',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.demandeFormPanel.superclass.initComponent.call(this);
    }
});

mmw.demandeGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfDemandeObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.demandeGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'demande__indexbatiment',options:Ext.decode(this.filtersData['demande__indexbatiment']),type:'list'},
		{dataIndex:'demande__indexdemande',type:'string',disabled:true},
		{dataIndex:'demande__demandep',options:Ext.decode(this.filtersData['demande__demandep']),type:'list'},
		{dataIndex:'demande__date_demandep',type:'date'},
		{dataIndex:'demande__autorisationp',options:Ext.decode(this.filtersData['demande__autorisationp']),type:'list'},
		{dataIndex:'demande__date_permis',type:'date'},
		{dataIndex:'demande__num_permis',type:'string'}
	]	}, c));
};

Ext.extend(mmw.demandeGridFilters, Ext.ux.grid.GridFilters);

mmw.demandeGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('demandeGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.demandeStore();
		var scope = this;
		this.sfObject = mmw.baseSfDemandeObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Demande de permis (ou absence de demande)'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Demandes de permis {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de demande de permis')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('demande__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'demande__indexbatiment'},
		{header:mmw.getI18nColumnHeader('demande__indexdemande', 'Indexdemande'),hidden:1,width:75,sortable:true,dataIndex:'demande__indexdemande'},
		{header:mmw.getI18nColumnHeader('demande__demandep', 'Demande de permis de construire'),width:75,sortable:true,dataIndex:'demande__demandep',renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('demande__date_demandep', 'Date de la demande'),width:75,sortable:true,dataIndex:'demande__date_demandep',renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('demande__autorisationp', 'Autorisation de permis de construire'),width:75,sortable:true,dataIndex:'demande__autorisationp',renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('demande__date_permis', 'Date du permis'),width:75,sortable:true,dataIndex:'demande__date_permis',renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('demande__num_permis', 'N° du permis'),width:75,sortable:true,dataIndex:'demande__num_permis'}
	]        });
        mmw.demandeGridPanel.superclass.initComponent.call(this);
    }
});

mmw.demandeEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('demandeEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.demandeStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfDemandeObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Demande de permis (ou absence de demande)'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Demandes de permis {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de demande de permis')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('demande__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'demande__indexbatiment',editor:{itemId:'demande__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('demande__indexdemande', 'Indexdemande'),hidden:1,width:75,sortable:true,dataIndex:'demande__indexdemande',editor:{itemId:'demande__indexdemande',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('demande__demandep', 'Demande de permis de construire'),width:75,sortable:true,dataIndex:'demande__demandep',editor:{itemId:'demande__demandep',allowBlank:true,xtype:'checkbox'},renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('demande__date_demandep', 'Date de la demande'),width:75,sortable:true,dataIndex:'demande__date_demandep',editor:{itemId:'demande__date_demandep',allowBlank:true,xtype:'datefield'},renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('demande__autorisationp', 'Autorisation de permis de construire'),width:75,sortable:true,dataIndex:'demande__autorisationp',editor:{itemId:'demande__autorisationp',allowBlank:true,xtype:'checkbox'},renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('demande__date_permis', 'Date du permis'),width:75,sortable:true,dataIndex:'demande__date_permis',editor:{itemId:'demande__date_permis',allowBlank:true,xtype:'datefield'},renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }},
		{header:mmw.getI18nColumnHeader('demande__num_permis', 'N° du permis'),width:75,sortable:true,dataIndex:'demande__num_permis',editor:{itemId:'demande__num_permis',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.demandeEditorGridPanel.superclass.initComponent.call(this);
	}
});