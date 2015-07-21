mmw.bib_risquenatGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_risquenatGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_risquenatObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_risquenatGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Edition d\'un risque naturel'),
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
		{name:'bib_risquenat__coderisque',fieldLabel:mmw.getI18nLabel('bib_risquenat__coderisque', 'Coderisque'),width:250,itemId:'bib_risquenat__coderisque',allowBlank:true,xtype:'hidden'},{name:'bib_risquenat__risque',fieldLabel:mmw.getI18nLabel('bib_risquenat__risque', 'Risque'),width:250,itemId:'bib_risquenat__risque',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_risquenatGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib risquenat';
mmw.sfBib_risquenatObject = Ext.extend(mmw.sfObject, {
	url: 'bib_risquenat',
	keyField : 'bib_risquenat__coderisque',
	singularName: 'bib_risquenat',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_risquenatObject = new mmw.sfBib_risquenatObject;

mmw.bib_risquenatStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_risquenatStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfBib_risquenatObject,
		fields: [
		'bib_risquenat__coderisque',
		'bib_risquenat__risque'
	] 
	}, c));
};

Ext.extend(mmw.bib_risquenatStore, mmw.Store);

mmw.bib_risquenatFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_risquenatFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_risquenatObject,
			itemsLists: [
		[
		{name:'bib_risquenat__coderisque',fieldLabel:mmw.getI18nLabel('bib_risquenat__coderisque', 'Coderisque'),width:250,itemId:'bib_risquenat__coderisque',allowBlank:true,xtype:'hidden'},{name:'bib_risquenat__risque',fieldLabel:mmw.getI18nLabel('bib_risquenat__risque', 'Risque'),width:250,itemId:'bib_risquenat__risque',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_risquenatFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_risquenatGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_risquenatObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_risquenatGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_risquenat__coderisque',type:'string',disabled:true},
		{dataIndex:'bib_risquenat__risque',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_risquenatGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_risquenatGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_risquenatGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_risquenatStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_risquenatObject; 
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
		{header:mmw.getI18nColumnHeader('bib_risquenat__coderisque', 'Coderisque'),hidden:1,width:75,sortable:true,dataIndex:'bib_risquenat__coderisque'},
		{header:mmw.getI18nColumnHeader('bib_risquenat__risque', 'Risque'),width:75,sortable:true,dataIndex:'bib_risquenat__risque'}
	]        });
        mmw.bib_risquenatGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_risquenatEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_risquenatEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_risquenatStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_risquenatObject;
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
		{header:mmw.getI18nColumnHeader('bib_risquenat__coderisque', 'Coderisque'),hidden:1,width:75,sortable:true,dataIndex:'bib_risquenat__coderisque',editor:{itemId:'bib_risquenat__coderisque',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_risquenat__risque', 'Risque'),width:75,sortable:true,dataIndex:'bib_risquenat__risque',editor:{itemId:'bib_risquenat__risque',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_risquenatEditorGridPanel.superclass.initComponent.call(this);
	}
});