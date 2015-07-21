mmw.bib_faitageGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_faitageGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_faitageObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_faitageGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_faitage__codefaitage',fieldLabel:mmw.getI18nLabel('bib_faitage__codefaitage', 'Codefaitage'),width:250,itemId:'bib_faitage__codefaitage',allowBlank:true,xtype:'hidden'},{name:'bib_faitage__faitage',fieldLabel:mmw.getI18nLabel('bib_faitage__faitage', 'Faitage'),width:250,itemId:'bib_faitage__faitage',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_faitageGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib faitage';
mmw.sfBib_faitageObject = Ext.extend(mmw.sfObject, {
	url: 'bib_faitage',
	keyField : 'bib_faitage__codefaitage',
	displayField: 'bib_faitage__faitage',
	singularName: 'bib_faitage',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_faitageObject = new mmw.sfBib_faitageObject;

mmw.bib_faitageStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_faitageStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_faitage__faitage',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_faitageObject,
		fields: [
		'bib_faitage__codefaitage',
		'bib_faitage__faitage'
	] 
	}, c));
};

Ext.extend(mmw.bib_faitageStore, mmw.Store);

mmw.bib_faitageFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_faitageFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_faitageObject,
			itemsLists: [
		[
		{name:'bib_faitage__codefaitage',fieldLabel:mmw.getI18nLabel('bib_faitage__codefaitage', 'Codefaitage'),width:250,itemId:'bib_faitage__codefaitage',allowBlank:true,xtype:'hidden'},{name:'bib_faitage__faitage',fieldLabel:mmw.getI18nLabel('bib_faitage__faitage', 'Faitage'),width:250,itemId:'bib_faitage__faitage',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_faitageFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_faitageGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_faitageObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_faitageGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_faitage__codefaitage',type:'string',disabled:true},
		{dataIndex:'bib_faitage__faitage',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_faitageGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_faitageGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_faitageGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_faitageStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_faitageObject; 
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
		{header:mmw.getI18nColumnHeader('bib_faitage__codefaitage', 'Codefaitage'),hidden:1,width:75,sortable:true,dataIndex:'bib_faitage__codefaitage'},
		{header:mmw.getI18nColumnHeader('bib_faitage__faitage', 'Faitage'),width:75,sortable:true,dataIndex:'bib_faitage__faitage'}
	]        });
        mmw.bib_faitageGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_faitageEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_faitageEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_faitageStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_faitageObject;
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
		{header:mmw.getI18nColumnHeader('bib_faitage__codefaitage', 'Codefaitage'),hidden:1,width:75,sortable:true,dataIndex:'bib_faitage__codefaitage',editor:{itemId:'bib_faitage__codefaitage',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_faitage__faitage', 'Faitage'),width:75,sortable:true,dataIndex:'bib_faitage__faitage',editor:{itemId:'bib_faitage__faitage',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_faitageEditorGridPanel.superclass.initComponent.call(this);
	}
});