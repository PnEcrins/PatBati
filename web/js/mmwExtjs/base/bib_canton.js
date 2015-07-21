mmw.bib_cantonGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_cantonGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_cantonObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_cantonGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_canton__codecanton',fieldLabel:mmw.getI18nLabel('bib_canton__codecanton', 'Codecanton'),width:250,itemId:'bib_canton__codecanton',allowBlank:true,xtype:'hidden'},{name:'bib_canton__canton',fieldLabel:mmw.getI18nLabel('bib_canton__canton', 'Canton'),width:250,itemId:'bib_canton__canton',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_cantonGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib canton';
mmw.sfBib_cantonObject = Ext.extend(mmw.sfObject, {
	url: 'bib_canton',
	keyField : 'bib_canton__codecanton',
	displayField: 'bib_canton__canton',
	singularName: 'bib_canton',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_cantonObject = new mmw.sfBib_cantonObject;

mmw.bib_cantonStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_cantonStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_canton__canton',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_cantonObject,
		fields: [
		'bib_canton__codecanton',
		'bib_canton__canton'
	] 
	}, c));
};

Ext.extend(mmw.bib_cantonStore, mmw.Store);

mmw.bib_cantonFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_cantonFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_cantonObject,
			itemsLists: [
		[
		{name:'bib_canton__codecanton',fieldLabel:mmw.getI18nLabel('bib_canton__codecanton', 'Codecanton'),width:250,itemId:'bib_canton__codecanton',allowBlank:true,xtype:'hidden'},{name:'bib_canton__canton',fieldLabel:mmw.getI18nLabel('bib_canton__canton', 'Canton'),width:250,itemId:'bib_canton__canton',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_cantonFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_cantonGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_cantonObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_cantonGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_canton__codecanton',type:'string',disabled:true},
		{dataIndex:'bib_canton__canton',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_cantonGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_cantonGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_cantonGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_cantonStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_cantonObject; 
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
		{header:mmw.getI18nColumnHeader('bib_canton__codecanton', 'Codecanton'),hidden:1,width:75,sortable:true,dataIndex:'bib_canton__codecanton'},
		{header:mmw.getI18nColumnHeader('bib_canton__canton', 'Canton'),width:75,sortable:true,dataIndex:'bib_canton__canton'}
	]        });
        mmw.bib_cantonGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_cantonEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_cantonEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_cantonStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_cantonObject;
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
		{header:mmw.getI18nColumnHeader('bib_canton__codecanton', 'Codecanton'),hidden:1,width:75,sortable:true,dataIndex:'bib_canton__codecanton',editor:{itemId:'bib_canton__codecanton',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_canton__canton', 'Canton'),width:75,sortable:true,dataIndex:'bib_canton__canton',editor:{itemId:'bib_canton__canton',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_cantonEditorGridPanel.superclass.initComponent.call(this);
	}
});