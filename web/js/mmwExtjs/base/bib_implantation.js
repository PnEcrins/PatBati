mmw.bib_implantationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_implantationGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_implantationObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_implantationGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_implantation__codepem',fieldLabel:mmw.getI18nLabel('bib_implantation__codepem', 'Codepem'),width:250,itemId:'bib_implantation__codepem',allowBlank:true,xtype:'hidden'},{name:'bib_implantation__pem',fieldLabel:mmw.getI18nLabel('bib_implantation__pem', 'Pem'),width:250,itemId:'bib_implantation__pem',allowBlank:true,maxLength:10,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_implantationGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib implantation';
mmw.sfBib_implantationObject = Ext.extend(mmw.sfObject, {
	url: 'bib_implantation',
	keyField : 'bib_implantation__codepem',
	displayField: 'bib_implantation__pem',
	singularName: 'bib_implantation',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_implantationObject = new mmw.sfBib_implantationObject;

mmw.bib_implantationStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_implantationStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_implantation__pem',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_implantationObject,
		fields: [
		'bib_implantation__codepem',
		'bib_implantation__pem'
	] 
	}, c));
};

Ext.extend(mmw.bib_implantationStore, mmw.Store);

mmw.bib_implantationFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_implantationFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_implantationObject,
			itemsLists: [
		[
		{name:'bib_implantation__codepem',fieldLabel:mmw.getI18nLabel('bib_implantation__codepem', 'Codepem'),width:250,itemId:'bib_implantation__codepem',allowBlank:true,xtype:'hidden'},{name:'bib_implantation__pem',fieldLabel:mmw.getI18nLabel('bib_implantation__pem', 'Pem'),width:250,itemId:'bib_implantation__pem',allowBlank:true,maxLength:10,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_implantationFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_implantationGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_implantationObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_implantationGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_implantation__codepem',type:'string',disabled:true},
		{dataIndex:'bib_implantation__pem',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_implantationGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_implantationGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_implantationGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_implantationStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_implantationObject; 
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
		{header:mmw.getI18nColumnHeader('bib_implantation__codepem', 'Codepem'),hidden:1,width:75,sortable:true,dataIndex:'bib_implantation__codepem'},
		{header:mmw.getI18nColumnHeader('bib_implantation__pem', 'Pem'),width:75,sortable:true,dataIndex:'bib_implantation__pem'}
	]        });
        mmw.bib_implantationGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_implantationEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_implantationEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_implantationStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_implantationObject;
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
		{header:mmw.getI18nColumnHeader('bib_implantation__codepem', 'Codepem'),hidden:1,width:75,sortable:true,dataIndex:'bib_implantation__codepem',editor:{itemId:'bib_implantation__codepem',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_implantation__pem', 'Pem'),width:75,sortable:true,dataIndex:'bib_implantation__pem',editor:{itemId:'bib_implantation__pem',allowBlank:true,maxLength:10,xtype:'textfield'}}
	]		});
		mmw.bib_implantationEditorGridPanel.superclass.initComponent.call(this);
	}
});