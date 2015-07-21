mmw.bib_element_paysagerGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_element_paysagerGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_element_paysagerObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_element_paysagerGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Edition d\'un élément paysager'),
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
		{name:'bib_element_paysager__codeep',fieldLabel:mmw.getI18nLabel('bib_element_paysager__codeep', 'Codeep'),width:250,itemId:'bib_element_paysager__codeep',allowBlank:true,xtype:'hidden'},{name:'bib_element_paysager__naturels_construits--name',fieldLabel:mmw.getI18nLabel('bib_element_paysager__naturels_construits', 'Naturels construits'),width:250,itemId:'bib_element_paysager__naturels_construits',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({fields: ["valueField", "displayField"]}),sfDatabaseMode:false,mode:'local',hiddenName:'bib_element_paysager__naturels_construits',displayField:"displayField",valueField:"valueField",triggerAction:'all',lastQuery:''},{name:'bib_element_paysager__elements_paysagers',fieldLabel:mmw.getI18nLabel('bib_element_paysager__elements_paysagers', 'Elements paysagers'),width:250,itemId:'bib_element_paysager__elements_paysagers',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_element_paysagerGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib element paysager';
mmw.sfBib_element_paysagerObject = Ext.extend(mmw.sfObject, {
	url: 'bib_element_paysager',
	keyField : 'bib_element_paysager__codeep',
	singularName: 'bib_element_paysager',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_element_paysagerObject = new mmw.sfBib_element_paysagerObject;

mmw.bib_element_paysagerStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_element_paysagerStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfBib_element_paysagerObject,
		fields: [
		'bib_element_paysager__codeep',
		'bib_element_paysager__naturels_construits',
		'bib_element_paysager__elements_paysagers'
	] 
	}, c));
};

Ext.extend(mmw.bib_element_paysagerStore, mmw.Store);

mmw.bib_element_paysagerFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_element_paysagerFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_element_paysagerObject,
			itemsLists: [
		[
		{name:'bib_element_paysager__codeep',fieldLabel:mmw.getI18nLabel('bib_element_paysager__codeep', 'Codeep'),width:250,itemId:'bib_element_paysager__codeep',allowBlank:true,xtype:'hidden'},{name:'bib_element_paysager__naturels_construits--name',fieldLabel:mmw.getI18nLabel('bib_element_paysager__naturels_construits', 'Naturels construits'),width:250,itemId:'bib_element_paysager__naturels_construits',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({fields: ["valueField", "displayField"]}),sfDatabaseMode:false,mode:'local',hiddenName:'bib_element_paysager__naturels_construits',displayField:"displayField",valueField:"valueField",triggerAction:'all',lastQuery:''},{name:'bib_element_paysager__elements_paysagers',fieldLabel:mmw.getI18nLabel('bib_element_paysager__elements_paysagers', 'Elements paysagers'),width:250,itemId:'bib_element_paysager__elements_paysagers',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_element_paysagerFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_element_paysagerGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_element_paysagerObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_element_paysagerGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_element_paysager__codeep',type:'string',disabled:true},
		{dataIndex:'bib_element_paysager__naturels_construits',type:'string'},
		{dataIndex:'bib_element_paysager__elements_paysagers',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_element_paysagerGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_element_paysagerGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_element_paysagerGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_element_paysagerStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_element_paysagerObject; 
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
		{header:mmw.getI18nColumnHeader('bib_element_paysager__codeep', 'Codeep'),hidden:1,width:75,sortable:true,dataIndex:'bib_element_paysager__codeep'},
		{header:mmw.getI18nColumnHeader('bib_element_paysager__naturels_construits', 'Naturels construits'),width:75,sortable:true,dataIndex:'bib_element_paysager__naturels_construits'},
		{header:mmw.getI18nColumnHeader('bib_element_paysager__elements_paysagers', 'Elements paysagers'),width:75,sortable:true,dataIndex:'bib_element_paysager__elements_paysagers'}
	]        });
        mmw.bib_element_paysagerGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_element_paysagerEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_element_paysagerEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_element_paysagerStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_element_paysagerObject;
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
		{header:mmw.getI18nColumnHeader('bib_element_paysager__codeep', 'Codeep'),hidden:1,width:75,sortable:true,dataIndex:'bib_element_paysager__codeep',editor:{itemId:'bib_element_paysager__codeep',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_element_paysager__naturels_construits', 'Naturels construits'),width:75,sortable:true,dataIndex:'bib_element_paysager__naturels_construits',editor:{itemId:'bib_element_paysager__naturels_construits',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({fields: ["valueField", "displayField"]}),sfDatabaseMode:false,displayField:"displayField",valueField:"valueField",triggerAction:'all',lastQuery:''}},
		{header:mmw.getI18nColumnHeader('bib_element_paysager__elements_paysagers', 'Elements paysagers'),width:75,sortable:true,dataIndex:'bib_element_paysager__elements_paysagers',editor:{itemId:'bib_element_paysager__elements_paysagers',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_element_paysagerEditorGridPanel.superclass.initComponent.call(this);
	}
});