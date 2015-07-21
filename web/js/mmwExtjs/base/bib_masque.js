mmw.bib_masqueGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_masqueGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfBib_masqueObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.bib_masqueGridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Edition du masque'),
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
		{name:'bib_masque__codemasque',fieldLabel:mmw.getI18nLabel('bib_masque__codemasque', 'Codemasque'),width:250,itemId:'bib_masque__codemasque',allowBlank:true,xtype:'hidden'},{name:'bib_masque__masque',fieldLabel:mmw.getI18nLabel('bib_masque__masque', 'Masque'),width:250,itemId:'bib_masque__masque',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	]        });
        
        mmw.bib_masqueGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'bib masque';
mmw.sfBib_masqueObject = Ext.extend(mmw.sfObject, {
	url: 'bib_masque',
	keyField : 'bib_masque__codemasque',
	singularName: 'bib_masque',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfBib_masqueObject = new mmw.sfBib_masqueObject;

mmw.bib_masqueStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.bib_masqueStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfBib_masqueObject,
		fields: [
		'bib_masque__codemasque',
		'bib_masque__masque'
	] 
	}, c));
};

Ext.extend(mmw.bib_masqueStore, mmw.Store);

mmw.bib_masqueFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_masqueFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfBib_masqueObject,
			itemsLists: [
		[
		{name:'bib_masque__codemasque',fieldLabel:mmw.getI18nLabel('bib_masque__codemasque', 'Codemasque'),width:250,itemId:'bib_masque__codemasque',allowBlank:true,xtype:'hidden'},{name:'bib_masque__masque',fieldLabel:mmw.getI18nLabel('bib_masque__masque', 'Masque'),width:250,itemId:'bib_masque__masque',allowBlank:true,maxLength:50,xtype:'textfield'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.bib_masqueFormPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_masqueGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfBib_masqueObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.bib_masqueGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'bib_masque__codemasque',type:'string',disabled:true},
		{dataIndex:'bib_masque__masque',type:'string'}
	]	}, c));
};

Ext.extend(mmw.bib_masqueGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_masqueGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('bib_masqueGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.bib_masqueStore();
		var scope = this;
		this.sfObject = mmw.baseSfBib_masqueObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des masques'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 20,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Demandes de permis {0} to {1} of {2}'), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('bib_masque__codemasque', 'Codemasque'),hidden:1,width:75,sortable:true,dataIndex:'bib_masque__codemasque'},
		{header:mmw.getI18nColumnHeader('bib_masque__masque', 'Masque'),width:75,sortable:true,dataIndex:'bib_masque__masque'}
	]        });
        mmw.bib_masqueGridPanel.superclass.initComponent.call(this);
    }
});

mmw.bib_masqueEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('bib_masqueEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.bib_masqueStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfBib_masqueObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des masques'),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}'), 'Demandes de permis {0} to {1} of {2}'),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('bib_masque__codemasque', 'Codemasque'),hidden:1,width:75,sortable:true,dataIndex:'bib_masque__codemasque',editor:{itemId:'bib_masque__codemasque',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('bib_masque__masque', 'Masque'),width:75,sortable:true,dataIndex:'bib_masque__masque',editor:{itemId:'bib_masque__masque',allowBlank:true,maxLength:50,xtype:'textfield'}}
	]		});
		mmw.bib_masqueEditorGridPanel.superclass.initComponent.call(this);
	}
});