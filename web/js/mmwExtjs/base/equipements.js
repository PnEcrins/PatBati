mmw.equipementsGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('equipementsGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfEquipementsObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.equipementsGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description de l\'équipement'),
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
		{name:'equipements__indexbatiment--name',fieldLabel:mmw.getI18nLabel('equipements__indexbatiment', 'Indexbatiment'),width:250,itemId:'equipements__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__indexequipement',fieldLabel:mmw.getI18nLabel('equipements__indexequipement', 'Indexequipement'),width:250,itemId:'equipements__indexequipement',allowBlank:true,xtype:'hidden'},{name:'equipements__codetypeequip--name',fieldLabel:mmw.getI18nLabel('equipements__codetypeequip', 'Catégorie'),width:250,itemId:'equipements__codetypeequip',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_equipementObject, fields: [mmw.baseSfBib_type_equipementObject.keyField, mmw.baseSfBib_type_equipementObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__codetypeequip',displayField:mmw.baseSfBib_type_equipementObject.displayField,valueField:mmw.baseSfBib_type_equipementObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__codeequipement--name',fieldLabel:mmw.getI18nLabel('equipements__codeequipement', 'Equipement'),width:250,itemId:'equipements__codeequipement',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_equipementObject, fields: [mmw.baseSfBib_equipementObject.keyField, mmw.baseSfBib_equipementObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__codeequipement',displayField:mmw.baseSfBib_equipementObject.displayField,valueField:mmw.baseSfBib_equipementObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__equipement_rem',fieldLabel:mmw.getI18nLabel('equipements__equipement_rem', 'Equipement remarquable'),width:250,itemId:'equipements__equipement_rem',allowBlank:true,xtype:'checkbox'},{name:'equipements__codeconservation--name',fieldLabel:mmw.getI18nLabel('equipements__codeconservation', 'Conservation'),width:250,itemId:'equipements__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__info_equip',fieldLabel:mmw.getI18nLabel('equipements__info_equip', 'Commentaire'),width:250,itemId:'equipements__info_equip',allowBlank:true,maxLength:200,height:40,xtype:'textarea'}
	]
	]        });
        
        mmw.equipementsGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'equipements';
mmw.sfEquipementsObject = Ext.extend(mmw.sfObject, {
	url: 'equipements',
	keyField : 'equipements__indexequipement',
	displayField: 'equipements__codeequipement',
	singularName: 'equipements',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfEquipementsObject = new mmw.sfEquipementsObject;

mmw.equipementsStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.equipementsStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'equipements__codeequipement',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfEquipementsObject,
		fields: [
		'equipements__indexbatiment',
		'equipements__indexequipement',
		'equipements__codetypeequip',
		'equipements__codeequipement',
		'equipements__equipement_rem',
		'equipements__codeconservation',
		'equipements__info_equip'
	] 
	}, c));
};

Ext.extend(mmw.equipementsStore, mmw.Store);

mmw.equipementsFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('equipementsFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfEquipementsObject,
			itemsLists: [
		[
		{name:'equipements__indexbatiment--name',fieldLabel:mmw.getI18nLabel('equipements__indexbatiment', 'Indexbatiment'),width:250,itemId:'equipements__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__indexequipement',fieldLabel:mmw.getI18nLabel('equipements__indexequipement', 'Indexequipement'),width:250,itemId:'equipements__indexequipement',allowBlank:true,xtype:'hidden'},{name:'equipements__codetypeequip--name',fieldLabel:mmw.getI18nLabel('equipements__codetypeequip', 'Catégorie'),width:250,itemId:'equipements__codetypeequip',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_equipementObject, fields: [mmw.baseSfBib_type_equipementObject.keyField, mmw.baseSfBib_type_equipementObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__codetypeequip',displayField:mmw.baseSfBib_type_equipementObject.displayField,valueField:mmw.baseSfBib_type_equipementObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__codeequipement--name',fieldLabel:mmw.getI18nLabel('equipements__codeequipement', 'Equipement'),width:250,itemId:'equipements__codeequipement',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_equipementObject, fields: [mmw.baseSfBib_equipementObject.keyField, mmw.baseSfBib_equipementObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__codeequipement',displayField:mmw.baseSfBib_equipementObject.displayField,valueField:mmw.baseSfBib_equipementObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__equipement_rem',fieldLabel:mmw.getI18nLabel('equipements__equipement_rem', 'Equipement remarquable'),width:250,itemId:'equipements__equipement_rem',allowBlank:true,xtype:'checkbox'},{name:'equipements__codeconservation--name',fieldLabel:mmw.getI18nLabel('equipements__codeconservation', 'Conservation'),width:250,itemId:'equipements__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'equipements__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'equipements__info_equip',fieldLabel:mmw.getI18nLabel('equipements__info_equip', 'Commentaire'),width:250,itemId:'equipements__info_equip',allowBlank:true,maxLength:200,height:40,xtype:'textarea'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.equipementsFormPanel.superclass.initComponent.call(this);
    }
});

mmw.equipementsGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfEquipementsObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.equipementsGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'equipements__indexbatiment',options:Ext.decode(this.filtersData['equipements__indexbatiment']),type:'list'},
		{dataIndex:'equipements__indexequipement',type:'string',disabled:true},
		{dataIndex:'equipements__codeequipement',options:Ext.decode(this.filtersData['equipements__codeequipement']),type:'list'},
		{dataIndex:'equipements__equipement_rem',options:Ext.decode(this.filtersData['equipements__equipement_rem']),type:'list'},
		{dataIndex:'equipements__codeconservation',options:Ext.decode(this.filtersData['equipements__codeconservation']),type:'list'},
		{dataIndex:'equipements__info_equip',type:'string'}
	]	}, c));
};

Ext.extend(mmw.equipementsGridFilters, Ext.ux.grid.GridFilters);

mmw.equipementsGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('equipementsGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.equipementsStore();
		var scope = this;
		this.sfObject = mmw.baseSfEquipementsObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des équipements'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Equipements {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'équipements')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('equipements__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'equipements__indexbatiment'},
		{header:mmw.getI18nColumnHeader('equipements__indexequipement', 'Indexequipement'),hidden:1,width:75,sortable:true,dataIndex:'equipements__indexequipement'},
		{header:mmw.getI18nColumnHeader('equipements__codetypeequip', 'Catégorie'),width:75,sortable:true,dataIndex:'equipements__codetypeequip'},
		{header:mmw.getI18nColumnHeader('equipements__codeequipement', 'Equipement'),width:75,sortable:true,dataIndex:'equipements__codeequipement'},
		{header:mmw.getI18nColumnHeader('equipements__equipement_rem', 'Equipement remarquable'),width:75,sortable:true,dataIndex:'equipements__equipement_rem',renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('equipements__codeconservation', 'Conservation'),width:75,sortable:true,dataIndex:'equipements__codeconservation'},
		{header:mmw.getI18nColumnHeader('equipements__info_equip', 'Commentaire'),width:75,sortable:true,dataIndex:'equipements__info_equip'}
	]        });
        mmw.equipementsGridPanel.superclass.initComponent.call(this);
    }
});

mmw.equipementsEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('equipementsEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.equipementsStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfEquipementsObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des équipements'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Equipements {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'équipements')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('equipements__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'equipements__indexbatiment',editor:{itemId:'equipements__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('equipements__indexequipement', 'Indexequipement'),hidden:1,width:75,sortable:true,dataIndex:'equipements__indexequipement',editor:{itemId:'equipements__indexequipement',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('equipements__codetypeequip', 'Catégorie'),width:75,sortable:true,dataIndex:'equipements__codetypeequip',editor:{itemId:'equipements__codetypeequip',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_equipementObject, fields: [mmw.baseSfBib_type_equipementObject.keyField, mmw.baseSfBib_type_equipementObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_type_equipementObject.displayField,valueField:mmw.baseSfBib_type_equipementObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('equipements__codeequipement', 'Equipement'),width:75,sortable:true,dataIndex:'equipements__codeequipement',editor:{itemId:'equipements__codeequipement',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_equipementObject, fields: [mmw.baseSfBib_equipementObject.keyField, mmw.baseSfBib_equipementObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_equipementObject.displayField,valueField:mmw.baseSfBib_equipementObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('equipements__equipement_rem', 'Equipement remarquable'),width:75,sortable:true,dataIndex:'equipements__equipement_rem',editor:{itemId:'equipements__equipement_rem',allowBlank:true,xtype:'checkbox'},renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('equipements__codeconservation', 'Conservation'),width:75,sortable:true,dataIndex:'equipements__codeconservation',editor:{itemId:'equipements__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('equipements__info_equip', 'Commentaire'),width:75,sortable:true,dataIndex:'equipements__info_equip',editor:{itemId:'equipements__info_equip',allowBlank:true,maxLength:200,xtype:'textarea'}}
	]		});
		mmw.equipementsEditorGridPanel.superclass.initComponent.call(this);
	}
});