mmw.structuresGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('structuresGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfStructuresObject;
		
		// this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['title'] = 'Liste des structures'
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.structuresGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.5,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description de la structure'),
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
			        columnWidth: 0.25,
			        layout: 'fit',
			        items:[
			        	this.grid
			        ]
			    }],
			itemsLists: [
		[
		{name:'structures__indexbatiment--name',fieldLabel:mmw.getI18nLabel('structures__indexbatiment', 'Indexbatiment'),width:250,itemId:'structures__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__indexstructure',fieldLabel:mmw.getI18nLabel('structures__indexstructure', 'Indexstructure'),width:250,itemId:'structures__indexstructure',allowBlank:true,xtype:'hidden'},{name:'structures__codestructure--name',fieldLabel:mmw.getI18nLabel('structures__codestructure', 'Structure'),width:250,itemId:'structures__codestructure',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_structureObject, fields: [mmw.baseSfBib_structureObject.keyField, mmw.baseSfBib_structureObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codestructure',displayField:mmw.baseSfBib_structureObject.displayField,valueField:mmw.baseSfBib_structureObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__structure_rem',fieldLabel:mmw.getI18nLabel('structures__structure_rem', 'Structure remarquable'),width:250,itemId:'structures__structure_rem',allowBlank:true,xtype:'checkbox'},{name:'structures__codeconservation--name',fieldLabel:mmw.getI18nLabel('structures__codeconservation', 'Conservation'),width:250,itemId:'structures__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__codematge--name',fieldLabel:mmw.getI18nLabel('structures__codematge', 'Matériau principal'),width:250,itemId:'structures__codematge',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_materiaux_geObject, fields: [mmw.baseSfBib_materiaux_geObject.keyField, mmw.baseSfBib_materiaux_geObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codematge',displayField:mmw.baseSfBib_materiaux_geObject.displayField,valueField:mmw.baseSfBib_materiaux_geObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__codemeo--name',fieldLabel:mmw.getI18nLabel('structures__codemeo', 'Mise en oeuvre'),width:250,itemId:'structures__codemeo',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_meoeuvreObject, fields: [mmw.baseSfBib_meoeuvreObject.keyField, mmw.baseSfBib_meoeuvreObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codemeo',displayField:mmw.baseSfBib_meoeuvreObject.displayField,valueField:mmw.baseSfBib_meoeuvreObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__info_structure',fieldLabel:mmw.getI18nLabel('structures__info_structure', 'Commentaire'),width:'100%',itemId:'structures__info_structure',allowBlank:true,maxLength:1000,height:130,xtype:'textarea'}
	]
	]        });
        
        mmw.structuresGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'structures';
mmw.sfStructuresObject = Ext.extend(mmw.sfObject, {
	url: 'structures',
	keyField : 'structures__indexstructure',
	displayField: 'structures__codestructure',
	singularName: 'structures',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfStructuresObject = new mmw.sfStructuresObject;

mmw.structuresStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.structuresStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'structures__codestructure',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfStructuresObject,
		fields: [
		'structures__indexbatiment',
		'structures__indexstructure',
		'structures__codestructure'
	] 
	}, c));
};

Ext.extend(mmw.structuresStore, mmw.Store);

mmw.structuresFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('structuresFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfStructuresObject,
			itemsLists: [
		[
		{name:'structures__indexbatiment--name',fieldLabel:mmw.getI18nLabel('structures__indexbatiment', 'Indexbatiment'),width:250,itemId:'structures__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__indexstructure',fieldLabel:mmw.getI18nLabel('structures__indexstructure', 'Indexstructure'),width:250,itemId:'structures__indexstructure',allowBlank:true,xtype:'hidden'},{name:'structures__codestructure--name',fieldLabel:mmw.getI18nLabel('structures__codestructure', 'Structure'),width:250,itemId:'structures__codestructure',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_structureObject, fields: [mmw.baseSfBib_structureObject.keyField, mmw.baseSfBib_structureObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codestructure',displayField:mmw.baseSfBib_structureObject.displayField,valueField:mmw.baseSfBib_structureObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__structure_rem',fieldLabel:mmw.getI18nLabel('structures__structure_rem', 'Structure remarquable'),width:250,itemId:'structures__structure_rem',allowBlank:true,xtype:'checkbox'},{name:'structures__codeconservation--name',fieldLabel:mmw.getI18nLabel('structures__codeconservation', 'Conservation'),width:250,itemId:'structures__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__codematge--name',fieldLabel:mmw.getI18nLabel('structures__codematge', 'Matériau principal'),width:250,itemId:'structures__codematge',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_materiaux_geObject, fields: [mmw.baseSfBib_materiaux_geObject.keyField, mmw.baseSfBib_materiaux_geObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codematge',displayField:mmw.baseSfBib_materiaux_geObject.displayField,valueField:mmw.baseSfBib_materiaux_geObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__codemeo--name',fieldLabel:mmw.getI18nLabel('structures__codemeo', 'Mise en oeuvre'),width:250,itemId:'structures__codemeo',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_meoeuvreObject, fields: [mmw.baseSfBib_meoeuvreObject.keyField, mmw.baseSfBib_meoeuvreObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'structures__codemeo',displayField:mmw.baseSfBib_meoeuvreObject.displayField,valueField:mmw.baseSfBib_meoeuvreObject.keyField,triggerAction:'all',lastQuery:''},{name:'structures__info_structure',fieldLabel:mmw.getI18nLabel('structures__info_structure', 'Commentaire'),width:'100%',itemId:'structures__info_structure',allowBlank:true,maxLength:1000,height:130,xtype:'textarea'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.structuresFormPanel.superclass.initComponent.call(this);
    }
});

mmw.structuresGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfStructuresObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.structuresGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'structures__codestructure',options:Ext.decode(this.filtersData['structures__codestructure']),type:'list'}
	]	}, c));
};

Ext.extend(mmw.structuresGridFilters, Ext.ux.grid.GridFilters);

mmw.structuresGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('structuresGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.structuresStore();
		var scope = this;
		this.sfObject = mmw.baseSfStructuresObject; 
        Ext.apply(this, this.initialConfig, {
        	title: 'Liste des structures',
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Structures {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de structures')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('structures__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'structures__indexbatiment'},
		{header:mmw.getI18nColumnHeader('structures__indexstructure', 'Indexstructure'),hidden:1,width:75,sortable:true,dataIndex:'structures__indexstructure'},
		{header:mmw.getI18nColumnHeader('structures__codestructure', 'Structure'),width:75,sortable:true,dataIndex:'structures__codestructure'}
	]        });
        mmw.structuresGridPanel.superclass.initComponent.call(this);
    }
});

mmw.structuresEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('structuresEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.structuresStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfStructuresObject;
		Ext.apply(this, this.initialConfig, {
			title: 'Liste des structures',
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Structures {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas de structures')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('structures__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'structures__indexbatiment',editor:{itemId:'structures__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('structures__indexstructure', 'Indexstructure'),hidden:1,width:75,sortable:true,dataIndex:'structures__indexstructure',editor:{itemId:'structures__indexstructure',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('structures__codestructure', 'Structure'),width:75,sortable:true,dataIndex:'structures__codestructure',editor:{itemId:'structures__codestructure',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_structureObject, fields: [mmw.baseSfBib_structureObject.keyField, mmw.baseSfBib_structureObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_structureObject.displayField,valueField:mmw.baseSfBib_structureObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }}
	]		});
		mmw.structuresEditorGridPanel.superclass.initComponent.call(this);
	}
});