mmw.bib_structureGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_structureGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_structureObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_structureGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_structure__codestructure',fieldLabel:mmw.getI18nLabel('bib_structure__codestructure', 'Codestructure'),width:250,itemId:'bib_structure__codestructure',allowBlank:true,xtype:'hidden'},{name:'bib_structure__structure',fieldLabel:mmw.getI18nLabel('bib_structure__structure', 'Structure'),width:250,itemId:'bib_structure__structure',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_structureGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib structure';
mmw.sfBib_structureObject = Ext.extend(mmw.sfObject, {
	url: 'bib_structure',
	keyField : 'bib_structure__codestructure',
	displayField: 'bib_structure__structure',
	singularName: 'bib_structure',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_structureObject = new mmw.sfBib_structureObject;

mmw.bib_structureStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_structureStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_structure__structure',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_structureObject,
		fields: [
		'bib_structure__codestructure',
		'bib_structure__structure'
	] 
	}, c));
};

Ext.extend(mmw.bib_structureStore, mmw.Store);

mmw.bib_structureFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_structureFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_structureObject,
			itemsLists: [
		[
		{name:'bib_structure__codestructure',fieldLabel:mmw.getI18nLabel('bib_structure__codestructure', 'Codestructure'),width:250,itemId:'bib_structure__codestructure',allowBlank:true,xtype:'hidden'},{name:'bib_structure__structure',fieldLabel:mmw.getI18nLabel('bib_structure__structure', 'Structure'),width:250,itemId:'bib_structure__structure',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_structureFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_structureGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_structureObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_structureGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_structure__codestructure',type:'string',disabled:true},
		{dataIndex:'bib_structure__structure',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_structureGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_structureGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_structureGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_structureStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_structureObject; 
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
		{header:mmw.getI18nColumnHeader('bib_structure__codestructure', 'Codestructure'),hidden:1,width:75,sortable:true,dataIndex:'bib_structure__codestructure'},
		{header:mmw.getI18nColumnHeader('bib_structure__structure', 'Structure'),width:75,sortable:true,dataIndex:'bib_structure__structure'}
	]        });
        mmw.bib_structureGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_structureEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_structureEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_structureStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_structureObject;
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
		{header:mmw.getI18nColumnHeader('bib_structure__codestructure', 'Codestructure'),hidden:1,width:75,sortable:true,dataIndex:'bib_structure__codestructure',editor:{itemId:'bib_structure__codestructure',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_structure__structure', 'Structure'),width:75,sortable:true,dataIndex:'bib_structure__structure',editor:{itemId:'bib_structure__structure',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_structureEditorGridPanel.superclass.initComponent.call(this);
	}
});