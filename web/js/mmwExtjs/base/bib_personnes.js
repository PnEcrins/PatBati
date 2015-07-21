mmw.bib_personnesGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_personnesGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_personnesObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_personnesGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Edition d\'une personne'),
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
		{name:'bib_personnes__codepersonne',fieldLabel:mmw.getI18nLabel('bib_personnes__codepersonne', 'Codepersonne'),width:250,itemId:'bib_personnes__codepersonne',allowBlank:true,xtype:'hidden'},{name:'bib_personnes__personne',fieldLabel:mmw.getI18nLabel('bib_personnes__personne', 'Personne'),width:250,itemId:'bib_personnes__personne',allowBlank:false,maxLength:50,xtype:'textfield'},{name:'bib_personnes__descriptif',fieldLabel:mmw.getI18nLabel('bib_personnes__descriptif', 'Descriptif'),width:250,itemId:'bib_personnes__descriptif',allowBlank:true,maxLength:100,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_personnesGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib personnes';
mmw.sfBib_personnesObject = Ext.extend(mmw.sfObject, {
	url: 'bib_personnes',
	keyField : 'bib_personnes__codepersonne',
	displayField: 'bib_personnes__personne',
	singularName: 'bib_personnes',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_personnesObject = new mmw.sfBib_personnesObject;

mmw.bib_personnesStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_personnesStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_personnes__personne',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_personnesObject,
		fields: [
		'bib_personnes__codepersonne',
		'bib_personnes__personne',
		'bib_personnes__descriptif'
	] 
	}, c));
};

Ext.extend(mmw.bib_personnesStore, mmw.Store);

mmw.bib_personnesFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_personnesFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_personnesObject,
			itemsLists: [
		[
		{name:'bib_personnes__codepersonne',fieldLabel:mmw.getI18nLabel('bib_personnes__codepersonne', 'Codepersonne'),width:250,itemId:'bib_personnes__codepersonne',allowBlank:true,xtype:'hidden'},{name:'bib_personnes__personne',fieldLabel:mmw.getI18nLabel('bib_personnes__personne', 'Personne'),width:250,itemId:'bib_personnes__personne',allowBlank:false,maxLength:50,xtype:'textfield'},{name:'bib_personnes__descriptif',fieldLabel:mmw.getI18nLabel('bib_personnes__descriptif', 'Descriptif'),width:250,itemId:'bib_personnes__descriptif',allowBlank:true,maxLength:100,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_personnesFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_personnesGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_personnesObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_personnesGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_personnes__codepersonne',type:'string',disabled:true},
		{dataIndex:'bib_personnes__personne',type:'string'},
		{dataIndex:'bib_personnes__descriptif',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_personnesGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_personnesGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_personnesGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_personnesStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_personnesObject; 
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
		{header:mmw.getI18nColumnHeader('bib_personnes__codepersonne', 'Codepersonne'),hidden:1,width:75,sortable:true,dataIndex:'bib_personnes__codepersonne'},
		{header:mmw.getI18nColumnHeader('bib_personnes__personne', 'Personne'),width:75,sortable:true,dataIndex:'bib_personnes__personne'},
		{header:mmw.getI18nColumnHeader('bib_personnes__descriptif', 'Descriptif'),width:75,sortable:true,dataIndex:'bib_personnes__descriptif'}
	]        });
        mmw.bib_personnesGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_personnesEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_personnesEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_personnesStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_personnesObject;
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
		{header:mmw.getI18nColumnHeader('bib_personnes__codepersonne', 'Codepersonne'),hidden:1,width:75,sortable:true,dataIndex:'bib_personnes__codepersonne',editor:{itemId:'bib_personnes__codepersonne',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_personnes__personne', 'Personne'),width:75,sortable:true,dataIndex:'bib_personnes__personne',editor:{itemId:'bib_personnes__personne',allowBlank:false,maxLength:50,xtype:'textfield'}},
		{header:mmw.getI18nColumnHeader('bib_personnes__descriptif', 'Descriptif'),width:75,sortable:true,dataIndex:'bib_personnes__descriptif',editor:{itemId:'bib_personnes__descriptif',allowBlank:true,maxLength:100,xtype:'textfield'}}
	]		});
		mmw.bib_personnesEditorGridPanel.superclass.initComponent.call(this);
	}
});