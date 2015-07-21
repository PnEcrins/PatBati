mmw.bib_protectionGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_protectionGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_protectionObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_protectionGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_protection__codeprotection',fieldLabel:mmw.getI18nLabel('bib_protection__codeprotection', 'Codeprotection'),width:250,itemId:'bib_protection__codeprotection',allowBlank:true,xtype:'hidden'},{name:'bib_protection__protection',fieldLabel:mmw.getI18nLabel('bib_protection__protection', 'Protection'),width:250,itemId:'bib_protection__protection',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_protection__rel_protections_list',fieldLabel:mmw.getI18nLabel('bib_protection__rel_protections_list', 'Rel protections list'),width:450,itemId:'bib_protection__rel_protections_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.identificationStore,height:130}
	]
	]        });
        
        mmw.bib_protectionGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib protection';
mmw.sfBib_protectionObject = Ext.extend(mmw.sfObject, {
	url: 'bib_protection',
	keyField : 'bib_protection__codeprotection',
	singularName: 'bib_protection',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_protectionObject = new mmw.sfBib_protectionObject;

mmw.bib_protectionStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_protectionStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfBib_protectionObject,
		fields: [
		'bib_protection__codeprotection',
		'bib_protection__protection'
	] 
	}, c));
};

Ext.extend(mmw.bib_protectionStore, mmw.Store);

mmw.bib_protectionFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_protectionFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_protectionObject,
			itemsLists: [
		[
		{name:'bib_protection__codeprotection',fieldLabel:mmw.getI18nLabel('bib_protection__codeprotection', 'Codeprotection'),width:250,itemId:'bib_protection__codeprotection',allowBlank:true,xtype:'hidden'},{name:'bib_protection__protection',fieldLabel:mmw.getI18nLabel('bib_protection__protection', 'Protection'),width:250,itemId:'bib_protection__protection',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_protection__rel_protections_list',fieldLabel:mmw.getI18nLabel('bib_protection__rel_protections_list', 'Rel protections list'),width:450,itemId:'bib_protection__rel_protections_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.identificationStore,height:130}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_protectionFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_protectionGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_protectionObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_protectionGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_protection__codeprotection',type:'string',disabled:true},
		{dataIndex:'bib_protection__protection',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_protectionGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_protectionGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_protectionGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_protectionStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_protectionObject; 
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
		{header:mmw.getI18nColumnHeader('bib_protection__codeprotection', 'Codeprotection'),hidden:1,width:75,sortable:true,dataIndex:'bib_protection__codeprotection'},
		{header:mmw.getI18nColumnHeader('bib_protection__protection', 'Protection'),width:75,sortable:true,dataIndex:'bib_protection__protection'}
	]        });
        mmw.bib_protectionGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_protectionEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_protectionEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_protectionStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_protectionObject;
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
		{header:mmw.getI18nColumnHeader('bib_protection__codeprotection', 'Codeprotection'),hidden:1,width:75,sortable:true,dataIndex:'bib_protection__codeprotection',editor:{itemId:'bib_protection__codeprotection',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_protection__protection', 'Protection'),width:75,sortable:true,dataIndex:'bib_protection__protection',editor:{itemId:'bib_protection__protection',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_protectionEditorGridPanel.superclass.initComponent.call(this);
	}
});