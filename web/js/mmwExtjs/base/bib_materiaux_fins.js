mmw.bib_materiaux_finsGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_finsGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_materiaux_finsObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_materiaux_finsGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_materiaux_fins__codematfins',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__codematfins', 'Codematfins'),width:250,itemId:'bib_materiaux_fins__codematfins',allowBlank:true,xtype:'hidden'},{name:'bib_materiaux_fins__matfins',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__matfins', 'Matfins'),width:250,itemId:'bib_materiaux_fins__matfins',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_materiaux_fins__type_matfins',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__type_matfins', 'Type matfins'),width:250,itemId:'bib_materiaux_fins__type_matfins',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_materiaux_fins__rel_so_matfinss_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__rel_so_matfinss_list', 'Rel so matfinss list'),width:450,itemId:'bib_materiaux_fins__rel_so_matfinss_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.second_oeuvreStore,height:130},{name:'bib_materiaux_fins__rel_structures_matfinss_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__rel_structures_matfinss_list', 'Rel structures matfinss list'),width:450,itemId:'bib_materiaux_fins__rel_structures_matfinss_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.structuresStore,height:130},{name:'bib_materiaux_fins__rel_matfins_finitions_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__rel_matfins_finitions_list', 'Rel matfins finitions list'),width:450,itemId:'bib_materiaux_fins__rel_matfins_finitions_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_finitionStore,height:130}
	]
	]        });
        
        mmw.bib_materiaux_finsGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib materiaux fins';
mmw.sfBib_materiaux_finsObject = Ext.extend(mmw.sfObject, {
	url: 'bib_materiaux_fins',
	keyField : 'bib_materiaux_fins__codematfins',
	displayField: 'bib_materiaux_fins__matfins',
	singularName: 'bib_materiaux_fins',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_materiaux_finsObject = new mmw.sfBib_materiaux_finsObject;

mmw.bib_materiaux_finsStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_materiaux_finsStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_materiaux_fins__matfins',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_materiaux_finsObject,
		fields: [
		'bib_materiaux_fins__codematfins',
		'bib_materiaux_fins__matfins',
		'bib_materiaux_fins__type_matfins'
	] 
	}, c));
};

Ext.extend(mmw.bib_materiaux_finsStore, mmw.Store);

mmw.bib_materiaux_finsFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_finsFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_materiaux_finsObject,
			itemsLists: [
		[
		{name:'bib_materiaux_fins__codematfins',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__codematfins', 'Codematfins'),width:250,itemId:'bib_materiaux_fins__codematfins',allowBlank:true,xtype:'hidden'},{name:'bib_materiaux_fins__matfins',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__matfins', 'Matfins'),width:250,itemId:'bib_materiaux_fins__matfins',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_materiaux_fins__type_matfins',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__type_matfins', 'Type matfins'),width:250,itemId:'bib_materiaux_fins__type_matfins',allowBlank:true,maxLength:50,xtype:'textfield'},{name:'bib_materiaux_fins__rel_so_matfinss_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__rel_so_matfinss_list', 'Rel so matfinss list'),width:450,itemId:'bib_materiaux_fins__rel_so_matfinss_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.second_oeuvreStore,height:130},{name:'bib_materiaux_fins__rel_structures_matfinss_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__rel_structures_matfinss_list', 'Rel structures matfinss list'),width:450,itemId:'bib_materiaux_fins__rel_structures_matfinss_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.structuresStore,height:130},{name:'bib_materiaux_fins__rel_matfins_finitions_list',fieldLabel:mmw.getI18nLabel('bib_materiaux_fins__rel_matfins_finitions_list', 'Rel matfins finitions list'),width:450,itemId:'bib_materiaux_fins__rel_matfins_finitions_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_finitionStore,height:130}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_materiaux_finsFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_materiaux_finsGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_materiaux_finsObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_materiaux_finsGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_materiaux_fins__codematfins',type:'string',disabled:true},
		{dataIndex:'bib_materiaux_fins__matfins',type:'string'},
		{dataIndex:'bib_materiaux_fins__type_matfins',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_materiaux_finsGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_materiaux_finsGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_finsGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_materiaux_finsStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_materiaux_finsObject; 
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
		{header:mmw.getI18nColumnHeader('bib_materiaux_fins__codematfins', 'Codematfins'),hidden:1,width:75,sortable:true,dataIndex:'bib_materiaux_fins__codematfins'},
		{header:mmw.getI18nColumnHeader('bib_materiaux_fins__matfins', 'Matfins'),width:75,sortable:true,dataIndex:'bib_materiaux_fins__matfins'},
		{header:mmw.getI18nColumnHeader('bib_materiaux_fins__type_matfins', 'Type matfins'),width:75,sortable:true,dataIndex:'bib_materiaux_fins__type_matfins'}
	]        });
        mmw.bib_materiaux_finsGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_materiaux_finsEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_materiaux_finsEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_materiaux_finsStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_materiaux_finsObject;
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
		{header:mmw.getI18nColumnHeader('bib_materiaux_fins__codematfins', 'Codematfins'),hidden:1,width:75,sortable:true,dataIndex:'bib_materiaux_fins__codematfins',editor:{itemId:'bib_materiaux_fins__codematfins',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_materiaux_fins__matfins', 'Matfins'),width:75,sortable:true,dataIndex:'bib_materiaux_fins__matfins',editor:{itemId:'bib_materiaux_fins__matfins',allowBlank:true,maxLength:50,xtype:'textfield'}},
		{header:mmw.getI18nColumnHeader('bib_materiaux_fins__type_matfins', 'Type matfins'),width:75,sortable:true,dataIndex:'bib_materiaux_fins__type_matfins',editor:{itemId:'bib_materiaux_fins__type_matfins',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_materiaux_finsEditorGridPanel.superclass.initComponent.call(this);
	}
});