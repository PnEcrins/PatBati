mmw.bib_illustrationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_illustrationGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_illustrationObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_illustrationGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_illustration__codeillustration',fieldLabel:mmw.getI18nLabel('bib_illustration__codeillustration', 'Codeillustration'),width:250,itemId:'bib_illustration__codeillustration',allowBlank:true,xtype:'hidden'},{name:'bib_illustration__illustration',fieldLabel:mmw.getI18nLabel('bib_illustration__illustration', 'Illustration'),width:250,itemId:'bib_illustration__illustration',allowBlank:false,maxLength:50,xtype:'textfield'},{name:'bib_illustration__ordre_illustration',fieldLabel:mmw.getI18nLabel('bib_illustration__ordre_illustration', 'Ordre illustration'),width:250,itemId:'bib_illustration__ordre_illustration',allowBlank:true,xtype:'textfield',vtype:'num'}
	]
	]        });
        
        mmw.bib_illustrationGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib illustration';
mmw.sfBib_illustrationObject = Ext.extend(mmw.sfObject, {
	url: 'bib_illustration',
	keyField : 'bib_illustration__codeillustration',
	displayField: 'bib_illustration__illustration',
	singularName: 'bib_illustration',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_illustrationObject = new mmw.sfBib_illustrationObject;

mmw.bib_illustrationStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_illustrationStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'bib_illustration__illustration',
		    direction: 'ASC'
		},
				sfObject: new mmw.sfBib_illustrationObject,
		fields: [
		'bib_illustration__codeillustration',
		'bib_illustration__illustration',
		'bib_illustration__ordre_illustration'
	] 
	}, c));
};

Ext.extend(mmw.bib_illustrationStore, mmw.Store);

mmw.bib_illustrationFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_illustrationFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_illustrationObject,
			itemsLists: [
		[
		{name:'bib_illustration__codeillustration',fieldLabel:mmw.getI18nLabel('bib_illustration__codeillustration', 'Codeillustration'),width:250,itemId:'bib_illustration__codeillustration',allowBlank:true,xtype:'hidden'},{name:'bib_illustration__illustration',fieldLabel:mmw.getI18nLabel('bib_illustration__illustration', 'Illustration'),width:250,itemId:'bib_illustration__illustration',allowBlank:false,maxLength:50,xtype:'textfield'},{name:'bib_illustration__ordre_illustration',fieldLabel:mmw.getI18nLabel('bib_illustration__ordre_illustration', 'Ordre illustration'),width:250,itemId:'bib_illustration__ordre_illustration',allowBlank:true,xtype:'textfield',vtype:'num'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_illustrationFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_illustrationGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_illustrationObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_illustrationGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_illustration__codeillustration',type:'string',disabled:true},
		{dataIndex:'bib_illustration__illustration',type:'string'},
		{dataIndex:'bib_illustration__ordre_illustration',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_illustrationGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_illustrationGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_illustrationGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_illustrationStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_illustrationObject; 
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
		{header:mmw.getI18nColumnHeader('bib_illustration__codeillustration', 'Codeillustration'),hidden:1,width:75,sortable:true,dataIndex:'bib_illustration__codeillustration'},
		{header:mmw.getI18nColumnHeader('bib_illustration__illustration', 'Illustration'),width:75,sortable:true,dataIndex:'bib_illustration__illustration'},
		{header:mmw.getI18nColumnHeader('bib_illustration__ordre_illustration', 'Ordre illustration'),width:75,sortable:true,dataIndex:'bib_illustration__ordre_illustration'}
	]        });
        mmw.bib_illustrationGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_illustrationEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_illustrationEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_illustrationStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_illustrationObject;
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
		{header:mmw.getI18nColumnHeader('bib_illustration__codeillustration', 'Codeillustration'),hidden:1,width:75,sortable:true,dataIndex:'bib_illustration__codeillustration',editor:{itemId:'bib_illustration__codeillustration',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_illustration__illustration', 'Illustration'),width:75,sortable:true,dataIndex:'bib_illustration__illustration',editor:{itemId:'bib_illustration__illustration',allowBlank:false,maxLength:50,xtype:'textfield'}},
		{header:mmw.getI18nColumnHeader('bib_illustration__ordre_illustration', 'Ordre illustration'),width:75,sortable:true,dataIndex:'bib_illustration__ordre_illustration',editor:{itemId:'bib_illustration__ordre_illustration',allowBlank:true,xtype:'textfield',vtype:'num'}}
	]		});
		mmw.bib_illustrationEditorGridPanel.superclass.initComponent.call(this);
	}
});