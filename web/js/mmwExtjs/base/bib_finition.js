mmw.bib_finitionGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_finitionGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_finitionObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_finitionGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_finition__codefinition',fieldLabel:mmw.getI18nLabel('bib_finition__codefinition', 'Codefinition'),width:250,itemId:'bib_finition__codefinition',allowBlank:true,xtype:'hidden'},{name:'bib_finition__finition',fieldLabel:mmw.getI18nLabel('bib_finition__finition', 'Finition'),width:250,itemId:'bib_finition__finition',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_finition__rel_matfins_finitions_list',fieldLabel:mmw.getI18nLabel('bib_finition__rel_matfins_finitions_list', 'Rel matfins finitions list'),width:450,itemId:'bib_finition__rel_matfins_finitions_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_materiaux_finsStore,height:130}
	]
	]        });
        
        mmw.bib_finitionGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib finition';
mmw.sfBib_finitionObject = Ext.extend(mmw.sfObject, {
	url: 'bib_finition',
	keyField : 'bib_finition__codefinition',
	displayField: 'bib_finition__finition',
	singularName: 'bib_finition',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_finitionObject = new mmw.sfBib_finitionObject;

mmw.bib_finitionStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_finitionStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_finition__finition',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_finitionObject,
		fields: [
		'bib_finition__codefinition',
		'bib_finition__finition',
		'bib_finition__codematfinslist'
	] 
	}, c));
};

Ext.extend(mmw.bib_finitionStore, mmw.Store);

mmw.bib_finitionFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_finitionFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_finitionObject,
			itemsLists: [
		[
		{name:'bib_finition__codefinition',fieldLabel:mmw.getI18nLabel('bib_finition__codefinition', 'Codefinition'),width:250,itemId:'bib_finition__codefinition',allowBlank:true,xtype:'hidden'},{name:'bib_finition__finition',fieldLabel:mmw.getI18nLabel('bib_finition__finition', 'Finition'),width:250,itemId:'bib_finition__finition',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_finition__rel_matfins_finitions_list',fieldLabel:mmw.getI18nLabel('bib_finition__rel_matfins_finitions_list', 'Rel matfins finitions list'),width:450,itemId:'bib_finition__rel_matfins_finitions_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_materiaux_finsStore,height:130}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_finitionFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_finitionGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_finitionObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_finitionGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_finition__codefinition',type:'string',disabled:true},
		{dataIndex:'bib_finition__finition',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_finitionGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_finitionGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_finitionGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_finitionStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_finitionObject; 
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
		{header:mmw.getI18nColumnHeader('bib_finition__codefinition', 'Codefinition'),hidden:1,width:75,sortable:true,dataIndex:'bib_finition__codefinition'},
		{header:mmw.getI18nColumnHeader('bib_finition__finition', 'Finition'),width:75,sortable:true,dataIndex:'bib_finition__finition'}
	]        });
        mmw.bib_finitionGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_finitionEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_finitionEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_finitionStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_finitionObject;
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
		{header:mmw.getI18nColumnHeader('bib_finition__codefinition', 'Codefinition'),hidden:1,width:75,sortable:true,dataIndex:'bib_finition__codefinition',editor:{itemId:'bib_finition__codefinition',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_finition__finition', 'Finition'),width:75,sortable:true,dataIndex:'bib_finition__finition',editor:{itemId:'bib_finition__finition',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_finitionEditorGridPanel.superclass.initComponent.call(this);
	}
});