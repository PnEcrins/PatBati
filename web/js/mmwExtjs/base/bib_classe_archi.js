mmw.bib_classe_archiGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_classe_archiGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_classe_archiObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_classe_archiGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_classe_archi__codeclasse',fieldLabel:mmw.getI18nLabel('bib_classe_archi__codeclasse', 'Codeclasse'),width:250,itemId:'bib_classe_archi__codeclasse',allowBlank:true,xtype:'hidden'},{name:'bib_classe_archi__classe',fieldLabel:mmw.getI18nLabel('bib_classe_archi__classe', 'Classe'),width:250,itemId:'bib_classe_archi__classe',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_classe_archiGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib classe archi';
mmw.sfBib_classe_archiObject = Ext.extend(mmw.sfObject, {
	url: 'bib_classe_archi',
	keyField : 'bib_classe_archi__codeclasse',
	displayField: 'bib_classe_archi__classe',
	singularName: 'bib_classe_archi',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_classe_archiObject = new mmw.sfBib_classe_archiObject;

mmw.bib_classe_archiStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_classe_archiStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_classe_archi__classe',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_classe_archiObject,
		fields: [
		'bib_classe_archi__codeclasse',
		'bib_classe_archi__classe'
	] 
	}, c));
};

Ext.extend(mmw.bib_classe_archiStore, mmw.Store);

mmw.bib_classe_archiFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_classe_archiFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_classe_archiObject,
			itemsLists: [
		[
		{name:'bib_classe_archi__codeclasse',fieldLabel:mmw.getI18nLabel('bib_classe_archi__codeclasse', 'Codeclasse'),width:250,itemId:'bib_classe_archi__codeclasse',allowBlank:true,xtype:'hidden'},{name:'bib_classe_archi__classe',fieldLabel:mmw.getI18nLabel('bib_classe_archi__classe', 'Classe'),width:250,itemId:'bib_classe_archi__classe',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_classe_archiFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_classe_archiGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_classe_archiObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_classe_archiGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_classe_archi__codeclasse',type:'string',disabled:true},
		{dataIndex:'bib_classe_archi__classe',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_classe_archiGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_classe_archiGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_classe_archiGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_classe_archiStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_classe_archiObject; 
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
		{header:mmw.getI18nColumnHeader('bib_classe_archi__codeclasse', 'Codeclasse'),hidden:1,width:75,sortable:true,dataIndex:'bib_classe_archi__codeclasse'},
		{header:mmw.getI18nColumnHeader('bib_classe_archi__classe', 'Classe'),width:75,sortable:true,dataIndex:'bib_classe_archi__classe'}
	]        });
        mmw.bib_classe_archiGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_classe_archiEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_classe_archiEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_classe_archiStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_classe_archiObject;
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
		{header:mmw.getI18nColumnHeader('bib_classe_archi__codeclasse', 'Codeclasse'),hidden:1,width:75,sortable:true,dataIndex:'bib_classe_archi__codeclasse',editor:{itemId:'bib_classe_archi__codeclasse',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_classe_archi__classe', 'Classe'),width:75,sortable:true,dataIndex:'bib_classe_archi__classe',editor:{itemId:'bib_classe_archi__classe',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_classe_archiEditorGridPanel.superclass.initComponent.call(this);
	}
});