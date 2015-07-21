mmw.bib_natureGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_natureGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_natureObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_natureGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_nature__codenature',fieldLabel:mmw.getI18nLabel('bib_nature__codenature', 'Codenature'),width:250,itemId:'bib_nature__codenature',allowBlank:true,xtype:'hidden'},{name:'bib_nature__nature',fieldLabel:mmw.getI18nLabel('bib_nature__nature', 'Nature'),width:250,itemId:'bib_nature__nature',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_natureGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib nature';
mmw.sfBib_natureObject = Ext.extend(mmw.sfObject, {
	url: 'bib_nature',
	keyField : 'bib_nature__codenature',
	displayField: 'bib_nature__nature',
	singularName: 'bib_nature',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_natureObject = new mmw.sfBib_natureObject;

mmw.bib_natureStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_natureStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_nature__codenature',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_natureObject,
		fields: [
		'bib_nature__codenature',
		'bib_nature__nature'
	] 
	}, c));
};

Ext.extend(mmw.bib_natureStore, mmw.Store);

mmw.bib_natureFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_natureFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_natureObject,
			itemsLists: [
		[
		{name:'bib_nature__codenature',fieldLabel:mmw.getI18nLabel('bib_nature__codenature', 'Codenature'),width:250,itemId:'bib_nature__codenature',allowBlank:true,xtype:'hidden'},{name:'bib_nature__nature',fieldLabel:mmw.getI18nLabel('bib_nature__nature', 'Nature'),width:250,itemId:'bib_nature__nature',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_natureFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_natureGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_natureObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_natureGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_nature__codenature',type:'string',disabled:true},
		{dataIndex:'bib_nature__nature',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_natureGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_natureGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_natureGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_natureStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_natureObject; 
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
		{header:mmw.getI18nColumnHeader('bib_nature__codenature', 'Codenature'),hidden:1,width:75,sortable:true,dataIndex:'bib_nature__codenature'},
		{header:mmw.getI18nColumnHeader('bib_nature__nature', 'Nature'),width:75,sortable:true,dataIndex:'bib_nature__nature'}
	]        });
        mmw.bib_natureGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_natureEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_natureEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_natureStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_natureObject;
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
		{header:mmw.getI18nColumnHeader('bib_nature__codenature', 'Codenature'),hidden:1,width:75,sortable:true,dataIndex:'bib_nature__codenature',editor:{itemId:'bib_nature__codenature',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_nature__nature', 'Nature'),width:75,sortable:true,dataIndex:'bib_nature__nature',editor:{itemId:'bib_nature__nature',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_natureEditorGridPanel.superclass.initComponent.call(this);
	}
});