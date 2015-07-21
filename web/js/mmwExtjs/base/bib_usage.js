mmw.bib_usageGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_usageGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_usageObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_usageGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_usage__codeusage',fieldLabel:mmw.getI18nLabel('bib_usage__codeusage', 'Codeusage'),width:250,itemId:'bib_usage__codeusage',allowBlank:true,xtype:'hidden'},{name:'bib_usage__usage',fieldLabel:mmw.getI18nLabel('bib_usage__usage', 'Usage'),width:250,itemId:'bib_usage__usage',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_usageGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib usage';
mmw.sfBib_usageObject = Ext.extend(mmw.sfObject, {
	url: 'bib_usage',
	keyField : 'bib_usage__codeusage',
	displayField: 'bib_usage__usage',
	singularName: 'bib_usage',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_usageObject = new mmw.sfBib_usageObject;

mmw.bib_usageStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_usageStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_usage__usage',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_usageObject,
		fields: [
		'bib_usage__codeusage',
		'bib_usage__usage'
	] 
	}, c));
};

Ext.extend(mmw.bib_usageStore, mmw.Store);

mmw.bib_usageFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_usageFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_usageObject,
			itemsLists: [
		[
		{name:'bib_usage__codeusage',fieldLabel:mmw.getI18nLabel('bib_usage__codeusage', 'Codeusage'),width:250,itemId:'bib_usage__codeusage',allowBlank:true,xtype:'hidden'},{name:'bib_usage__usage',fieldLabel:mmw.getI18nLabel('bib_usage__usage', 'Usage'),width:250,itemId:'bib_usage__usage',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_usageFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_usageGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_usageObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_usageGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_usage__codeusage',type:'string',disabled:true},
		{dataIndex:'bib_usage__usage',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_usageGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_usageGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_usageGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_usageStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_usageObject; 
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
		{header:mmw.getI18nColumnHeader('bib_usage__codeusage', 'Codeusage'),hidden:1,width:75,sortable:true,dataIndex:'bib_usage__codeusage'},
		{header:mmw.getI18nColumnHeader('bib_usage__usage', 'Usage'),width:75,sortable:true,dataIndex:'bib_usage__usage'}
	]        });
        mmw.bib_usageGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_usageEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_usageEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_usageStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_usageObject;
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
		{header:mmw.getI18nColumnHeader('bib_usage__codeusage', 'Codeusage'),hidden:1,width:75,sortable:true,dataIndex:'bib_usage__codeusage',editor:{itemId:'bib_usage__codeusage',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_usage__usage', 'Usage'),width:75,sortable:true,dataIndex:'bib_usage__usage',editor:{itemId:'bib_usage__usage',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_usageEditorGridPanel.superclass.initComponent.call(this);
	}
});