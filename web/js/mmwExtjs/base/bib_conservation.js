mmw.bib_conservationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_conservationGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_conservationObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_conservationGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_conservation__codeconservation',fieldLabel:mmw.getI18nLabel('bib_conservation__codeconservation', 'Codeconservation'),width:250,itemId:'bib_conservation__codeconservation',allowBlank:true,xtype:'hidden'},{name:'bib_conservation__conservation',fieldLabel:mmw.getI18nLabel('bib_conservation__conservation', 'Conservation'),width:250,itemId:'bib_conservation__conservation',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_conservationGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib conservation';
mmw.sfBib_conservationObject = Ext.extend(mmw.sfObject, {
	url: 'bib_conservation',
	keyField : 'bib_conservation__codeconservation',
	displayField: 'bib_conservation__conservation',
	singularName: 'bib_conservation',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_conservationObject = new mmw.sfBib_conservationObject;

mmw.bib_conservationStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_conservationStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_conservation__codeconservation',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_conservationObject,
		fields: [
		'bib_conservation__codeconservation',
		'bib_conservation__conservation'
	] 
	}, c));
};

Ext.extend(mmw.bib_conservationStore, mmw.Store);

mmw.bib_conservationFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_conservationFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_conservationObject,
			itemsLists: [
		[
		{name:'bib_conservation__codeconservation',fieldLabel:mmw.getI18nLabel('bib_conservation__codeconservation', 'Codeconservation'),width:250,itemId:'bib_conservation__codeconservation',allowBlank:true,xtype:'hidden'},{name:'bib_conservation__conservation',fieldLabel:mmw.getI18nLabel('bib_conservation__conservation', 'Conservation'),width:250,itemId:'bib_conservation__conservation',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_conservationFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_conservationGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_conservationObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_conservationGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_conservation__codeconservation',type:'string',disabled:true},
		{dataIndex:'bib_conservation__conservation',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_conservationGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_conservationGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_conservationGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_conservationStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_conservationObject; 
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
		{header:mmw.getI18nColumnHeader('bib_conservation__codeconservation', 'Codeconservation'),hidden:1,width:75,sortable:true,dataIndex:'bib_conservation__codeconservation'},
		{header:mmw.getI18nColumnHeader('bib_conservation__conservation', 'Conservation'),width:75,sortable:true,dataIndex:'bib_conservation__conservation'}
	]        });
        mmw.bib_conservationGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_conservationEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_conservationEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_conservationStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_conservationObject;
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
		{header:mmw.getI18nColumnHeader('bib_conservation__codeconservation', 'Codeconservation'),hidden:1,width:75,sortable:true,dataIndex:'bib_conservation__codeconservation',editor:{itemId:'bib_conservation__codeconservation',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_conservation__conservation', 'Conservation'),width:75,sortable:true,dataIndex:'bib_conservation__conservation',editor:{itemId:'bib_conservation__conservation',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_conservationEditorGridPanel.superclass.initComponent.call(this);
	}
});