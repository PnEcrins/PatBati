mmw.bib_perspectiveGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_perspectiveGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_perspectiveObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_perspectiveGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_perspective__codeperspective',fieldLabel:mmw.getI18nLabel('bib_perspective__codeperspective', 'Codeperspective'),width:250,itemId:'bib_perspective__codeperspective',allowBlank:true,xtype:'hidden'},{name:'bib_perspective__perspective',fieldLabel:mmw.getI18nLabel('bib_perspective__perspective', 'Perspective'),width:250,itemId:'bib_perspective__perspective',allowBlank:false,maxLength:50,xtype:'textfield'},{name:'bib_perspective__rel_ident_perspectives_list',fieldLabel:mmw.getI18nLabel('bib_perspective__rel_ident_perspectives_list', 'Rel ident perspectives list'),width:450,itemId:'bib_perspective__rel_ident_perspectives_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.identificationStore,height:130}
	]
	]        });
        
        mmw.bib_perspectiveGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib perspective';
mmw.sfBib_perspectiveObject = Ext.extend(mmw.sfObject, {
	url: 'bib_perspective',
	keyField : 'bib_perspective__codeperspective',
	displayField: 'bib_perspective__perspective',
	singularName: 'bib_perspective',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_perspectiveObject = new mmw.sfBib_perspectiveObject;

mmw.bib_perspectiveStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_perspectiveStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_perspective__perspective',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_perspectiveObject,
		fields: [
		'bib_perspective__codeperspective',
		'bib_perspective__perspective'
	] 
	}, c));
};

Ext.extend(mmw.bib_perspectiveStore, mmw.Store);

mmw.bib_perspectiveFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_perspectiveFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_perspectiveObject,
			itemsLists: [
		[
		{name:'bib_perspective__codeperspective',fieldLabel:mmw.getI18nLabel('bib_perspective__codeperspective', 'Codeperspective'),width:250,itemId:'bib_perspective__codeperspective',allowBlank:true,xtype:'hidden'},{name:'bib_perspective__perspective',fieldLabel:mmw.getI18nLabel('bib_perspective__perspective', 'Perspective'),width:250,itemId:'bib_perspective__perspective',allowBlank:false,maxLength:50,xtype:'textfield'},{name:'bib_perspective__rel_ident_perspectives_list',fieldLabel:mmw.getI18nLabel('bib_perspective__rel_ident_perspectives_list', 'Rel ident perspectives list'),width:450,itemId:'bib_perspective__rel_ident_perspectives_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.identificationStore,height:130}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_perspectiveFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_perspectiveGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_perspectiveObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_perspectiveGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_perspective__codeperspective',type:'string',disabled:true},
		{dataIndex:'bib_perspective__perspective',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_perspectiveGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_perspectiveGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_perspectiveGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_perspectiveStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_perspectiveObject; 
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
		{header:mmw.getI18nColumnHeader('bib_perspective__codeperspective', 'Codeperspective'),hidden:1,width:75,sortable:true,dataIndex:'bib_perspective__codeperspective'},
		{header:mmw.getI18nColumnHeader('bib_perspective__perspective', 'Perspective'),width:75,sortable:true,dataIndex:'bib_perspective__perspective'}
	]        });
        mmw.bib_perspectiveGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_perspectiveEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_perspectiveEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_perspectiveStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_perspectiveObject;
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
		{header:mmw.getI18nColumnHeader('bib_perspective__codeperspective', 'Codeperspective'),hidden:1,width:75,sortable:true,dataIndex:'bib_perspective__codeperspective',editor:{itemId:'bib_perspective__codeperspective',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_perspective__perspective', 'Perspective'),width:75,sortable:true,dataIndex:'bib_perspective__perspective',editor:{itemId:'bib_perspective__perspective',allowBlank:false,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_perspectiveEditorGridPanel.superclass.initComponent.call(this);
	}
});