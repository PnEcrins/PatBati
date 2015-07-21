mmw.rel_structures_matfinsGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('rel_structures_matfinsGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfRel_structures_matfinsObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.rel_structures_matfinsGridPanel(this.overrideGridConfig);
		
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
		{name:'rel_structures_matfins__indexstructure',fieldLabel:mmw.getI18nLabel('rel_structures_matfins__indexstructure', 'Indexstructure'),width:250,itemId:'rel_structures_matfins__indexstructure',allowBlank:true,xtype:'hidden'},{name:'rel_structures_matfins__codematfins',fieldLabel:mmw.getI18nLabel('rel_structures_matfins__codematfins', 'Codematfins'),width:250,itemId:'rel_structures_matfins__codematfins',allowBlank:true,xtype:'hidden'},{name:'rel_structures_matfins__codefinition',fieldLabel:mmw.getI18nLabel('rel_structures_matfins__codefinition', 'Codefinition'),width:250,itemId:'rel_structures_matfins__codefinition',allowBlank:true,xtype:'hidden'}
	]
	]        });
        
        mmw.rel_structures_matfinsGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'rel structures matfins';
mmw.sfRel_structures_matfinsObject = Ext.extend(mmw.sfObject, {
	url: 'rel_structures_matfins',
	keyField : 'rel_structures_matfins__indexstructure',
	singularName: 'rel_structures_matfins',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfRel_structures_matfinsObject = new mmw.sfRel_structures_matfinsObject;

mmw.rel_structures_matfinsStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.rel_structures_matfinsStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfRel_structures_matfinsObject,
		fields: [
		'rel_structures_matfins__indexstructure',
		'rel_structures_matfins__codematfins',
		'rel_structures_matfins__codefinition'
	] 
	}, c));
};

Ext.extend(mmw.rel_structures_matfinsStore, mmw.Store);

mmw.rel_structures_matfinsFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('rel_structures_matfinsFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfRel_structures_matfinsObject,
			itemsLists: [
		[
		{name:'rel_structures_matfins__indexstructure',fieldLabel:mmw.getI18nLabel('rel_structures_matfins__indexstructure', 'Indexstructure'),width:250,itemId:'rel_structures_matfins__indexstructure',allowBlank:true,xtype:'hidden'},{name:'rel_structures_matfins__codematfins',fieldLabel:mmw.getI18nLabel('rel_structures_matfins__codematfins', 'Codematfins'),width:250,itemId:'rel_structures_matfins__codematfins',allowBlank:true,xtype:'hidden'},{name:'rel_structures_matfins__codefinition',fieldLabel:mmw.getI18nLabel('rel_structures_matfins__codefinition', 'Codefinition'),width:250,itemId:'rel_structures_matfins__codefinition',allowBlank:true,xtype:'hidden'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.rel_structures_matfinsFormPanel.superclass.initComponent.call(this);
    }
});

mmw.rel_structures_matfinsGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfRel_structures_matfinsObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.rel_structures_matfinsGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'rel_structures_matfins__indexstructure',type:'string',disabled:true},
		{dataIndex:'rel_structures_matfins__codematfins',type:'string',disabled:true},
		{dataIndex:'rel_structures_matfins__codefinition',type:'string',disabled:true}
	]	}, c));
};

Ext.extend(mmw.rel_structures_matfinsGridFilters, Ext.ux.grid.GridFilters);

mmw.rel_structures_matfinsGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('rel_structures_matfinsGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.rel_structures_matfinsStore();
		var scope = this;
		this.sfObject = mmw.baseSfRel_structures_matfinsObject; 
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
		{header:mmw.getI18nColumnHeader('rel_structures_matfins__indexstructure', 'Indexstructure'),hidden:1,width:75,sortable:true,dataIndex:'rel_structures_matfins__indexstructure'},
		{header:mmw.getI18nColumnHeader('rel_structures_matfins__codematfins', 'Codematfins'),hidden:1,width:75,sortable:true,dataIndex:'rel_structures_matfins__codematfins'},
		{header:mmw.getI18nColumnHeader('rel_structures_matfins__codefinition', 'Codefinition'),hidden:1,width:75,sortable:true,dataIndex:'rel_structures_matfins__codefinition'}
	]        });
        mmw.rel_structures_matfinsGridPanel.superclass.initComponent.call(this);
    }
});

mmw.rel_structures_matfinsEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('rel_structures_matfinsEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.rel_structures_matfinsStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfRel_structures_matfinsObject;
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
		{header:mmw.getI18nColumnHeader('rel_structures_matfins__indexstructure', 'Indexstructure'),hidden:1,width:75,sortable:true,dataIndex:'rel_structures_matfins__indexstructure',editor:{itemId:'rel_structures_matfins__indexstructure',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('rel_structures_matfins__codematfins', 'Codematfins'),hidden:1,width:75,sortable:true,dataIndex:'rel_structures_matfins__codematfins',editor:{itemId:'rel_structures_matfins__codematfins',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('rel_structures_matfins__codefinition', 'Codefinition'),hidden:1,width:75,sortable:true,dataIndex:'rel_structures_matfins__codefinition',editor:{itemId:'rel_structures_matfins__codefinition',allowBlank:true,xtype:'hidden'}}
	]		});
		mmw.rel_structures_matfinsEditorGridPanel.superclass.initComponent.call(this);
	}
});