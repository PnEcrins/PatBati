mmw.bib_notepatriGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_notepatriGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_notepatriObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_notepatriGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_notepatri__indexnotepatri',fieldLabel:mmw.getI18nLabel('bib_notepatri__indexnotepatri', 'Indexnotepatri'),width:250,itemId:'bib_notepatri__indexnotepatri',allowBlank:true,xtype:'hidden'},{name:'bib_notepatri__valnotepatri',fieldLabel:mmw.getI18nLabel('bib_notepatri__valnotepatri', 'Valnotepatri'),width:250,itemId:'bib_notepatri__valnotepatri',allowBlank:false,xtype:'textfield',vtype:'num'}
	]
	]        });
        
        mmw.bib_notepatriGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib notepatri';
mmw.sfBib_notepatriObject = Ext.extend(mmw.sfObject, {
	url: 'bib_notepatri',
	keyField : 'bib_notepatri__indexnotepatri',
	singularName: 'bib_notepatri',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_notepatriObject = new mmw.sfBib_notepatriObject;

mmw.bib_notepatriStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_notepatriStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfBib_notepatriObject,
		fields: [
		'bib_notepatri__indexnotepatri',
		'bib_notepatri__valnotepatri'
	] 
	}, c));
};

Ext.extend(mmw.bib_notepatriStore, mmw.Store);

mmw.bib_notepatriFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_notepatriFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_notepatriObject,
			itemsLists: [
		[
		{name:'bib_notepatri__indexnotepatri',fieldLabel:mmw.getI18nLabel('bib_notepatri__indexnotepatri', 'Indexnotepatri'),width:250,itemId:'bib_notepatri__indexnotepatri',allowBlank:true,xtype:'hidden'},{name:'bib_notepatri__valnotepatri',fieldLabel:mmw.getI18nLabel('bib_notepatri__valnotepatri', 'Valnotepatri'),width:250,itemId:'bib_notepatri__valnotepatri',allowBlank:false,xtype:'textfield',vtype:'num'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_notepatriFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_notepatriGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_notepatriObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_notepatriGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_notepatri__indexnotepatri',type:'string',disabled:true},
		{dataIndex:'bib_notepatri__valnotepatri',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_notepatriGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_notepatriGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_notepatriGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_notepatriStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_notepatriObject; 
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
		{header:mmw.getI18nColumnHeader('bib_notepatri__indexnotepatri', 'Indexnotepatri'),hidden:1,width:75,sortable:true,dataIndex:'bib_notepatri__indexnotepatri'},
		{header:mmw.getI18nColumnHeader('bib_notepatri__valnotepatri', 'Valnotepatri'),width:75,sortable:true,dataIndex:'bib_notepatri__valnotepatri'}
	]        });
        mmw.bib_notepatriGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_notepatriEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_notepatriEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_notepatriStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_notepatriObject;
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
		{header:mmw.getI18nColumnHeader('bib_notepatri__indexnotepatri', 'Indexnotepatri'),hidden:1,width:75,sortable:true,dataIndex:'bib_notepatri__indexnotepatri',editor:{itemId:'bib_notepatri__indexnotepatri',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_notepatri__valnotepatri', 'Valnotepatri'),width:75,sortable:true,dataIndex:'bib_notepatri__valnotepatri',editor:{itemId:'bib_notepatri__valnotepatri',allowBlank:false,xtype:'textfield',vtype:'num'}}
	]		});
		mmw.bib_notepatriEditorGridPanel.superclass.initComponent.call(this);
	}
});