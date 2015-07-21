mmw.elements_paysagersGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('elements_paysagersGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfElements_paysagersObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['title'] = 'Liste des éléments paysagers';
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.elements_paysagersGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description de l\'élément paysager'),
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
		{name:'elements_paysagers__indexbatiment--name',fieldLabel:mmw.getI18nLabel('elements_paysagers__indexbatiment', 'Indexbatiment'),width:250,itemId:'elements_paysagers__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'elements_paysagers__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'elements_paysagers__indexep',fieldLabel:mmw.getI18nLabel('elements_paysagers__indexep', 'Indexep'),width:250,itemId:'elements_paysagers__indexep',allowBlank:true,xtype:'hidden'},{name:'elements_paysagers__codeep--name',fieldLabel:mmw.getI18nLabel('elements_paysagers__codeep', 'Elément du paysage'),width:250,itemId:'elements_paysagers__codeep',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_element_paysagerObject, fields: [mmw.baseSfBib_element_paysagerObject.keyField, mmw.baseSfBib_element_paysagerObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'elements_paysagers__codeep',displayField:mmw.baseSfBib_element_paysagerObject.displayField,valueField:mmw.baseSfBib_element_paysagerObject.keyField,triggerAction:'all',lastQuery:''},{name:'elements_paysagers__ep_rem',fieldLabel:mmw.getI18nLabel('elements_paysagers__ep_rem', 'Elément remarquable'),width:250,itemId:'elements_paysagers__ep_rem',allowBlank:true,xtype:'checkbox'},{name:'elements_paysagers__codeconservation--name',fieldLabel:mmw.getI18nLabel('elements_paysagers__codeconservation', 'Conservation'),width:250,itemId:'elements_paysagers__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'elements_paysagers__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'elements_paysagers__info_ep',fieldLabel:mmw.getI18nLabel('elements_paysagers__info_ep', 'Commentaire'),width:250,itemId:'elements_paysagers__info_ep',allowBlank:true,maxLength:200,height:40,xtype:'textarea'}
	]
	]        });
        
        mmw.elements_paysagersGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'elements paysagers';
mmw.sfElements_paysagersObject = Ext.extend(mmw.sfObject, {
	url: 'elements_paysagers',
	keyField : 'elements_paysagers__indexep',
	displayField: 'elements_paysagers__codeep',
	singularName: 'elements_paysagers',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfElements_paysagersObject = new mmw.sfElements_paysagersObject;

mmw.elements_paysagersStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.elements_paysagersStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'elements_paysagers__codeep',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfElements_paysagersObject,
		fields: [
		'elements_paysagers__indexbatiment',
		'elements_paysagers__indexep',
		'elements_paysagers__codeep',
		'elements_paysagers__ep_rem',
		'elements_paysagers__codeconservation',
		'elements_paysagers__info_ep'
	] 
	}, c));
};

Ext.extend(mmw.elements_paysagersStore, mmw.Store);

mmw.elements_paysagersFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('elements_paysagersFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfElements_paysagersObject,
			itemsLists: [
		[
		{name:'elements_paysagers__indexbatiment--name',fieldLabel:mmw.getI18nLabel('elements_paysagers__indexbatiment', 'Indexbatiment'),width:250,itemId:'elements_paysagers__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'elements_paysagers__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'elements_paysagers__indexep',fieldLabel:mmw.getI18nLabel('elements_paysagers__indexep', 'Indexep'),width:250,itemId:'elements_paysagers__indexep',allowBlank:true,xtype:'hidden'},{name:'elements_paysagers__codeep--name',fieldLabel:mmw.getI18nLabel('elements_paysagers__codeep', 'Elément du paysage'),width:250,itemId:'elements_paysagers__codeep',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_element_paysagerObject, fields: [mmw.baseSfBib_element_paysagerObject.keyField, mmw.baseSfBib_element_paysagerObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'elements_paysagers__codeep',displayField:mmw.baseSfBib_element_paysagerObject.displayField,valueField:mmw.baseSfBib_element_paysagerObject.keyField,triggerAction:'all',lastQuery:''},{name:'elements_paysagers__ep_rem',fieldLabel:mmw.getI18nLabel('elements_paysagers__ep_rem', 'Elément remarquable'),width:250,itemId:'elements_paysagers__ep_rem',allowBlank:true,xtype:'checkbox'},{name:'elements_paysagers__codeconservation--name',fieldLabel:mmw.getI18nLabel('elements_paysagers__codeconservation', 'Conservation'),width:250,itemId:'elements_paysagers__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'elements_paysagers__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'elements_paysagers__info_ep',fieldLabel:mmw.getI18nLabel('elements_paysagers__info_ep', 'Commentaire'),width:250,itemId:'elements_paysagers__info_ep',allowBlank:true,maxLength:200,height:40,xtype:'textarea'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.elements_paysagersFormPanel.superclass.initComponent.call(this);
    }
});

mmw.elements_paysagersGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfElements_paysagersObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.elements_paysagersGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'elements_paysagers__indexbatiment',options:Ext.decode(this.filtersData['elements_paysagers__indexbatiment']),type:'list'},
		{dataIndex:'elements_paysagers__indexep',type:'string',disabled:true},
		{dataIndex:'elements_paysagers__codeep',options:Ext.decode(this.filtersData['elements_paysagers__codeep']),type:'list'},
		{dataIndex:'elements_paysagers__ep_rem',options:Ext.decode(this.filtersData['elements_paysagers__ep_rem']),type:'list'},
		{dataIndex:'elements_paysagers__codeconservation',options:Ext.decode(this.filtersData['elements_paysagers__codeconservation']),type:'list'},
		{dataIndex:'elements_paysagers__info_ep',type:'string'}
	]	}, c));
};

Ext.extend(mmw.elements_paysagersGridFilters, Ext.ux.grid.GridFilters);

mmw.elements_paysagersGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('elements_paysagersGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.elements_paysagersStore();
		var scope = this;
		this.sfObject = mmw.baseSfElements_paysagersObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des éléments paysagers'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Eléments paysagers {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'éléments paysagers')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('elements_paysagers__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'elements_paysagers__indexbatiment'},
		{header:mmw.getI18nColumnHeader('elements_paysagers__indexep', 'Indexep'),hidden:1,width:75,sortable:true,dataIndex:'elements_paysagers__indexep'},
		{header:mmw.getI18nColumnHeader('elements_paysagers__codeep', 'Elément du paysage'),width:75,sortable:true,dataIndex:'elements_paysagers__codeep'},
		{header:mmw.getI18nColumnHeader('elements_paysagers__ep_rem', 'Elément remarquable'),width:75,sortable:true,dataIndex:'elements_paysagers__ep_rem',renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('elements_paysagers__codeconservation', 'Conservation'),width:75,sortable:true,dataIndex:'elements_paysagers__codeconservation'},
		{header:mmw.getI18nColumnHeader('elements_paysagers__info_ep', 'Commentaire'),width:75,sortable:true,dataIndex:'elements_paysagers__info_ep'}
	]        });
        mmw.elements_paysagersGridPanel.superclass.initComponent.call(this);
    }
});

mmw.elements_paysagersEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('elements_paysagersEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.elements_paysagersStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfElements_paysagersObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des éléments paysagers'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Eléments paysagers {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'éléments paysagers')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('elements_paysagers__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'elements_paysagers__indexbatiment',editor:{itemId:'elements_paysagers__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('elements_paysagers__indexep', 'Indexep'),hidden:1,width:75,sortable:true,dataIndex:'elements_paysagers__indexep',editor:{itemId:'elements_paysagers__indexep',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('elements_paysagers__codeep', 'Elément du paysage'),width:75,sortable:true,dataIndex:'elements_paysagers__codeep',editor:{itemId:'elements_paysagers__codeep',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_element_paysagerObject, fields: [mmw.baseSfBib_element_paysagerObject.keyField, mmw.baseSfBib_element_paysagerObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_element_paysagerObject.displayField,valueField:mmw.baseSfBib_element_paysagerObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('elements_paysagers__ep_rem', 'Elément remarquable'),width:75,sortable:true,dataIndex:'elements_paysagers__ep_rem',editor:{itemId:'elements_paysagers__ep_rem',allowBlank:true,xtype:'checkbox'},renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); }},
		{header:mmw.getI18nColumnHeader('elements_paysagers__codeconservation', 'Conservation'),width:75,sortable:true,dataIndex:'elements_paysagers__codeconservation',editor:{itemId:'elements_paysagers__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('elements_paysagers__info_ep', 'Commentaire'),width:75,sortable:true,dataIndex:'elements_paysagers__info_ep',editor:{itemId:'elements_paysagers__info_ep',allowBlank:true,maxLength:200,xtype:'textarea'}}
	]		});
		mmw.elements_paysagersEditorGridPanel.superclass.initComponent.call(this);
	}
});