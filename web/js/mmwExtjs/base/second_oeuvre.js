mmw.second_oeuvreGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('second_oeuvreGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfSecond_oeuvreObject;
		
		// this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['title'] = 'Liste des éléments';
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.second_oeuvreGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.5,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Description de l\'élément'),
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
            {
                name:'second_oeuvre__indexbatiment--name',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__indexbatiment', 'Indexbatiment'),
                width:250,
                itemId:'second_oeuvre__indexbatiment',
                allowBlank:false,
                xtype:'combo',
                store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),
                sfDatabaseMode:true,
                mode:'local',
                hiddenName:'second_oeuvre__indexbatiment',
                displayField:mmw.baseSfIdentificationObject.displayField,
                valueField:mmw.baseSfIdentificationObject.keyField,
                triggerAction:'all',
                lastQuery:''
            },
            {
                name:'second_oeuvre__indexso',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__indexso', 'Indexso'),
                width:250,
                itemId:'second_oeuvre__indexso',
                allowBlank:true,
                xtype:'hidden'
            },
            {
                name:'second_oeuvre__codetypeso--name',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__codetypeso', 'Catégorie'),
                width:250,
                itemId:'second_oeuvre__codetypeso',
                allowBlank:false,
                xtype:'combo',
                store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_soObject, fields: [mmw.baseSfBib_type_soObject.keyField, mmw.baseSfBib_type_soObject.displayField]})
                ,sfDatabaseMode:true,
                mode:'local',
                hiddenName:'second_oeuvre__codetypeso',
                displayField:mmw.baseSfBib_type_soObject.displayField,
                valueField:mmw.baseSfBib_type_soObject.keyField,
                triggerAction:'all',
                lastQuery:''},
            {
                name:'second_oeuvre__codeso--name',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__codeso', 'Elément'),
                width:250,
                itemId:'second_oeuvre__codeso',
                allowBlank:false,xtype:'combo',
                store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_soObject, fields: [mmw.baseSfBib_soObject.keyField, mmw.baseSfBib_soObject.displayField]}),
                sfDatabaseMode:true,
                mode:'local',
                hiddenName:'second_oeuvre__codeso',
                displayField:mmw.baseSfBib_soObject.displayField,valueField:mmw.baseSfBib_soObject.keyField,
                triggerAction:'all',
                lastQuery:''
            },
            {
                name:'second_oeuvre__so_rem',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__so_rem', 'Remarquable'),
                width:250,
                itemId:'second_oeuvre__so_rem',
                allowBlank:true,
                xtype:'checkbox'
            },
            {
                name:'second_oeuvre__codeconservation--name',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__codeconservation', 'Conservation'),
                width:250,
                itemId:'second_oeuvre__codeconservation',
                allowBlank:false,
                xtype:'combo',
                store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),
                sfDatabaseMode:true,
                mode:'local',
                hiddenName:'second_oeuvre__codeconservation',
                displayField:mmw.baseSfBib_conservationObject.displayField,
                valueField:mmw.baseSfBib_conservationObject.keyField,
                triggerAction:'all',
                lastQuery:''
            },
            {
                name:'second_oeuvre__info_so',
                fieldLabel:mmw.getI18nLabel('second_oeuvre__info_so', 'Commentaire'),
                width:'100%',
                itemId:'second_oeuvre__info_so',
                allowBlank:true,
                maxLength:1000,
                height:170,
                xtype:'textarea'
            }
        ]
	]        });
        
        mmw.second_oeuvreGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'second oeuvre';
mmw.sfSecond_oeuvreObject = Ext.extend(mmw.sfObject, {
	url: 'second_oeuvre',
	keyField : 'second_oeuvre__indexso',
	displayField: 'second_oeuvre__codeso',
	singularName: 'second_oeuvre',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfSecond_oeuvreObject = new mmw.sfSecond_oeuvreObject;

mmw.second_oeuvreStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.second_oeuvreStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'second_oeuvre__codeso',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfSecond_oeuvreObject,
		fields: [
		'second_oeuvre__indexbatiment',
		'second_oeuvre__indexso',
		'second_oeuvre__codeso'
	] 
	}, c));
};

Ext.extend(mmw.second_oeuvreStore, mmw.Store);

mmw.second_oeuvreFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('second_oeuvreFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfSecond_oeuvreObject,
			itemsLists: [
		[
		{name:'second_oeuvre__indexbatiment--name',fieldLabel:mmw.getI18nLabel('second_oeuvre__indexbatiment', 'Indexbatiment'),width:250,itemId:'second_oeuvre__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'second_oeuvre__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},{name:'second_oeuvre__indexso',fieldLabel:mmw.getI18nLabel('second_oeuvre__indexso', 'Indexso'),width:250,itemId:'second_oeuvre__indexso',allowBlank:true,xtype:'hidden'},{name:'second_oeuvre__codetypeso--name',fieldLabel:mmw.getI18nLabel('second_oeuvre__codetypeso', 'Catégorie'),width:250,itemId:'second_oeuvre__codetypeso',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_type_soObject, fields: [mmw.baseSfBib_type_soObject.keyField, mmw.baseSfBib_type_soObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'second_oeuvre__codetypeso',displayField:mmw.baseSfBib_type_soObject.displayField,valueField:mmw.baseSfBib_type_soObject.keyField,triggerAction:'all',lastQuery:''},{name:'second_oeuvre__codeso--name',fieldLabel:mmw.getI18nLabel('second_oeuvre__codeso', 'Elément'),width:250,itemId:'second_oeuvre__codeso',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_soObject, fields: [mmw.baseSfBib_soObject.keyField, mmw.baseSfBib_soObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'second_oeuvre__codeso',displayField:mmw.baseSfBib_soObject.displayField,valueField:mmw.baseSfBib_soObject.keyField,triggerAction:'all',lastQuery:''},{name:'second_oeuvre__so_rem',fieldLabel:mmw.getI18nLabel('second_oeuvre__so_rem', 'Remarquable'),width:250,itemId:'second_oeuvre__so_rem',allowBlank:true,xtype:'checkbox'},{name:'second_oeuvre__codeconservation--name',fieldLabel:mmw.getI18nLabel('second_oeuvre__codeconservation', 'Conservation'),width:250,itemId:'second_oeuvre__codeconservation',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'second_oeuvre__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},{name:'second_oeuvre__info_so',fieldLabel:mmw.getI18nLabel('second_oeuvre__info_so', 'Commentaire'),width:'100%',itemId:'second_oeuvre__info_so',allowBlank:true,maxLength:1000,height:170,xtype:'textarea'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.second_oeuvreFormPanel.superclass.initComponent.call(this);
    }
});

mmw.second_oeuvreGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfSecond_oeuvreObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.second_oeuvreGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'second_oeuvre__indexbatiment',options:Ext.decode(this.filtersData['second_oeuvre__indexbatiment']),type:'list'},
		{dataIndex:'second_oeuvre__indexso',type:'string',disabled:true},
		{dataIndex:'second_oeuvre__codeso',options:Ext.decode(this.filtersData['second_oeuvre__codeso']),type:'list'}
	]	}, c));
};

Ext.extend(mmw.second_oeuvreGridFilters, Ext.ux.grid.GridFilters);

mmw.second_oeuvreGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('second_oeuvreGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.second_oeuvreStore();
		var scope = this;
		this.sfObject = mmw.baseSfSecond_oeuvreObject; 
        Ext.apply(this, this.initialConfig, {
        	// title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des éléments'),
        	title: 'Liste des éléments',
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Eléments {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'éléments')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('second_oeuvre__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'second_oeuvre__indexbatiment'},
		{header:mmw.getI18nColumnHeader('second_oeuvre__indexso', 'Indexso'),hidden:1,width:75,sortable:true,dataIndex:'second_oeuvre__indexso'},
		{header:mmw.getI18nColumnHeader('second_oeuvre__codeso', 'Elément'),width:75,sortable:true,dataIndex:'second_oeuvre__codeso'}
	]        });
        mmw.second_oeuvreGridPanel.superclass.initComponent.call(this);
    }
});

mmw.second_oeuvreEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('second_oeuvreEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.second_oeuvreStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfSecond_oeuvreObject;
		Ext.apply(this, this.initialConfig, {
			// title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des éléments'),
			title: 'Liste des éléments',
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Eléments {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'), 'Pas d\'éléments')
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('second_oeuvre__indexbatiment', 'Indexbatiment'),width:75,sortable:true,dataIndex:'second_oeuvre__indexbatiment',editor:{itemId:'second_oeuvre__indexbatiment',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfIdentificationObject, fields: [mmw.baseSfIdentificationObject.keyField, mmw.baseSfIdentificationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('second_oeuvre__indexso', 'Indexso'),hidden:1,width:75,sortable:true,dataIndex:'second_oeuvre__indexso',editor:{itemId:'second_oeuvre__indexso',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('second_oeuvre__codeso', 'Elément'),width:75,sortable:true,dataIndex:'second_oeuvre__codeso',editor:{itemId:'second_oeuvre__codeso',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_soObject, fields: [mmw.baseSfBib_soObject.keyField, mmw.baseSfBib_soObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_soObject.displayField,valueField:mmw.baseSfBib_soObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }}
	]		});
		mmw.second_oeuvreEditorGridPanel.superclass.initComponent.call(this);
	}
});