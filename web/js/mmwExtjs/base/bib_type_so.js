mmw.bib_type_soGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_type_soGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_type_soObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_type_soGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_type_so__codetypeso',fieldLabel:mmw.getI18nLabel('bib_type_so__codetypeso', 'Codetypeso'),width:250,itemId:'bib_type_so__codetypeso',allowBlank:true,xtype:'hidden'},{name:'bib_type_so__type_so',fieldLabel:mmw.getI18nLabel('bib_type_so__type_so', 'Type so'),width:250,itemId:'bib_type_so__type_so',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_type_soGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib type so';
mmw.sfBib_type_soObject = Ext.extend(mmw.sfObject, {
	url: 'bib_type_so',
	keyField : 'bib_type_so__codetypeso',
	displayField: 'bib_type_so__type_so',
	singularName: 'bib_type_so',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_type_soObject = new mmw.sfBib_type_soObject;

mmw.bib_type_soStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_type_soStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_type_so__type_so',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_type_soObject,
		fields: [
		'bib_type_so__codetypeso',
		'bib_type_so__type_so'
	] 
	}, c));
};

Ext.extend(mmw.bib_type_soStore, mmw.Store);

mmw.bib_type_soFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_type_soFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_type_soObject,
			itemsLists: [
		[
		{name:'bib_type_so__codetypeso',fieldLabel:mmw.getI18nLabel('bib_type_so__codetypeso', 'Codetypeso'),width:250,itemId:'bib_type_so__codetypeso',allowBlank:true,xtype:'hidden'},{name:'bib_type_so__type_so',fieldLabel:mmw.getI18nLabel('bib_type_so__type_so', 'Type so'),width:250,itemId:'bib_type_so__type_so',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_type_soFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_type_soGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_type_soObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_type_soGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_type_so__codetypeso',type:'string',disabled:true},
		{dataIndex:'bib_type_so__type_so',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_type_soGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_type_soGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_type_soGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_type_soStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_type_soObject; 
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
		{header:mmw.getI18nColumnHeader('bib_type_so__codetypeso', 'Codetypeso'),hidden:1,width:75,sortable:true,dataIndex:'bib_type_so__codetypeso'},
		{header:mmw.getI18nColumnHeader('bib_type_so__type_so', 'Type so'),width:75,sortable:true,dataIndex:'bib_type_so__type_so'}
	]        });
        mmw.bib_type_soGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_type_soEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_type_soEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_type_soStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_type_soObject;
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
		{header:mmw.getI18nColumnHeader('bib_type_so__codetypeso', 'Codetypeso'),hidden:1,width:75,sortable:true,dataIndex:'bib_type_so__codetypeso',editor:{itemId:'bib_type_so__codetypeso',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_type_so__type_so', 'Type so'),width:75,sortable:true,dataIndex:'bib_type_so__type_so',editor:{itemId:'bib_type_so__type_so',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_type_soEditorGridPanel.superclass.initComponent.call(this);
	}
});