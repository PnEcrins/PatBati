mmw.bib_expositionGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_expositionGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_expositionObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_expositionGridPanel(this.overrideGridConfig);
		
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
		{name:'bib_exposition__indexexposition',fieldLabel:mmw.getI18nLabel('bib_exposition__indexexposition', 'Indexexposition'),width:250,itemId:'bib_exposition__indexexposition',allowBlank:true,xtype:'hidden'},{name:'bib_exposition__nomexposition',fieldLabel:mmw.getI18nLabel('bib_exposition__nomexposition', 'Nomexposition'),width:250,itemId:'bib_exposition__nomexposition',allowBlank:false,maxLength:2,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_expositionGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib exposition';
mmw.sfBib_expositionObject = Ext.extend(mmw.sfObject, {
	url: 'bib_exposition',
	keyField : 'bib_exposition__indexexposition',
	singularName: 'bib_exposition',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_expositionObject = new mmw.sfBib_expositionObject;

mmw.bib_expositionStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_expositionStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfBib_expositionObject,
		fields: [
		'bib_exposition__indexexposition',
		'bib_exposition__nomexposition'
	] 
	}, c));
};

Ext.extend(mmw.bib_expositionStore, mmw.Store);

mmw.bib_expositionFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_expositionFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_expositionObject,
			itemsLists: [
		[
		{name:'bib_exposition__indexexposition',fieldLabel:mmw.getI18nLabel('bib_exposition__indexexposition', 'Indexexposition'),width:250,itemId:'bib_exposition__indexexposition',allowBlank:true,xtype:'hidden'},{name:'bib_exposition__nomexposition',fieldLabel:mmw.getI18nLabel('bib_exposition__nomexposition', 'Nomexposition'),width:250,itemId:'bib_exposition__nomexposition',allowBlank:false,maxLength:2,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_expositionFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_expositionGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_expositionObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_expositionGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_exposition__indexexposition',type:'string',disabled:true},
		{dataIndex:'bib_exposition__nomexposition',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_expositionGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_expositionGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_expositionGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_expositionStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_expositionObject; 
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
		{header:mmw.getI18nColumnHeader('bib_exposition__indexexposition', 'Indexexposition'),hidden:1,width:75,sortable:true,dataIndex:'bib_exposition__indexexposition'},
		{header:mmw.getI18nColumnHeader('bib_exposition__nomexposition', 'Nomexposition'),width:75,sortable:true,dataIndex:'bib_exposition__nomexposition'}
	]        });
        mmw.bib_expositionGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_expositionEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_expositionEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_expositionStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_expositionObject;
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
		{header:mmw.getI18nColumnHeader('bib_exposition__indexexposition', 'Indexexposition'),hidden:1,width:75,sortable:true,dataIndex:'bib_exposition__indexexposition',editor:{itemId:'bib_exposition__indexexposition',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_exposition__nomexposition', 'Nomexposition'),width:75,sortable:true,dataIndex:'bib_exposition__nomexposition',editor:{itemId:'bib_exposition__nomexposition',allowBlank:false,maxLength:2,xtype:'textfield'}}
	]		});
		mmw.bib_expositionEditorGridPanel.superclass.initComponent.call(this);
	}
});