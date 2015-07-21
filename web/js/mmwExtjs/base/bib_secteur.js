mmw.bib_secteurGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_secteurGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_secteurObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_secteurGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName)),
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
		{name:'bib_secteur__codesecteur',fieldLabel:mmw.getI18nLabel('bib_secteur__codesecteur', 'Codesecteur'),width:250,itemId:'bib_secteur__codesecteur',allowBlank:true,xtype:'hidden'},{name:'bib_secteur__secteur',fieldLabel:mmw.getI18nLabel('bib_secteur__secteur', 'Secteur'),width:250,itemId:'bib_secteur__secteur',allowBlank:true,maxLength:12,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_secteurGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib secteur';
mmw.sfBib_secteurObject = Ext.extend(mmw.sfObject, {
	url: 'bib_secteur',
	keyField : 'bib_secteur__codesecteur',
	displayField: 'bib_secteur__secteur',
	singularName: 'bib_secteur',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_secteurObject = new mmw.sfBib_secteurObject;

mmw.bib_secteurStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_secteurStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_secteur__secteur',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_secteurObject,
		fields: [
		'bib_secteur__codesecteur',
		'bib_secteur__secteur'
	] 
	}, c));
};

Ext.extend(mmw.bib_secteurStore, mmw.Store);

mmw.bib_secteurFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_secteurFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_secteurObject,
			itemsLists: [
		[
		{name:'bib_secteur__codesecteur',fieldLabel:mmw.getI18nLabel('bib_secteur__codesecteur', 'Codesecteur'),width:250,itemId:'bib_secteur__codesecteur',allowBlank:true,xtype:'hidden'},{name:'bib_secteur__secteur',fieldLabel:mmw.getI18nLabel('bib_secteur__secteur', 'Secteur'),width:250,itemId:'bib_secteur__secteur',allowBlank:true,maxLength:12,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_secteurFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_secteurGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_secteurObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_secteurGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_secteur__codesecteur',type:'string',disabled:true},
		{dataIndex:'bib_secteur__secteur',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_secteurGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_secteurGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_secteurGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_secteurStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_secteurObject; 
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
		{header:mmw.getI18nColumnHeader('bib_secteur__codesecteur', 'Codesecteur'),hidden:1,width:75,sortable:true,dataIndex:'bib_secteur__codesecteur'},
		{header:mmw.getI18nColumnHeader('bib_secteur__secteur', 'Secteur'),width:75,sortable:true,dataIndex:'bib_secteur__secteur'}
	]        });
        mmw.bib_secteurGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_secteurEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_secteurEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_secteurStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_secteurObject;
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
		{header:mmw.getI18nColumnHeader('bib_secteur__codesecteur', 'Codesecteur'),hidden:1,width:75,sortable:true,dataIndex:'bib_secteur__codesecteur',editor:{itemId:'bib_secteur__codesecteur',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_secteur__secteur', 'Secteur'),width:75,sortable:true,dataIndex:'bib_secteur__secteur',editor:{itemId:'bib_secteur__secteur',allowBlank:true,maxLength:12,xtype:'textfield'}}
	]		});
		mmw.bib_secteurEditorGridPanel.superclass.initComponent.call(this);
	}
});