mmw.rel_masqueGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('rel_masqueGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfRel_masqueObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.rel_masqueGridPanel(this.overrideGridConfig);
		
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
		{name:'rel_masque__codemasque',fieldLabel:mmw.getI18nLabel('rel_masque__codemasque', 'Codemasque'),width:250,itemId:'rel_masque__codemasque',allowBlank:true,xtype:'hidden'},{name:'rel_masque__indexbatiment',fieldLabel:mmw.getI18nLabel('rel_masque__indexbatiment', 'Indexbatiment'),width:250,itemId:'rel_masque__indexbatiment',allowBlank:true,xtype:'hidden'}
	]
	]        });
        
        mmw.rel_masqueGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'rel masque';
mmw.sfRel_masqueObject = Ext.extend(mmw.sfObject, {
	url: 'rel_masque',
	keyField : 'rel_masque__codemasque',
	singularName: 'rel_masque',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfRel_masqueObject = new mmw.sfRel_masqueObject;

mmw.rel_masqueStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.rel_masqueStore.superclass.constructor.call(this, Ext.apply({
				sfObject: new mmw.sfRel_masqueObject,
		fields: [
		'rel_masque__codemasque',
		'rel_masque__indexbatiment'
	] 
	}, c));
};

Ext.extend(mmw.rel_masqueStore, mmw.Store);

mmw.rel_masqueFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('rel_masqueFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfRel_masqueObject,
			itemsLists: [
		[
		{name:'rel_masque__codemasque',fieldLabel:mmw.getI18nLabel('rel_masque__codemasque', 'Codemasque'),width:250,itemId:'rel_masque__codemasque',allowBlank:true,xtype:'hidden'},{name:'rel_masque__indexbatiment',fieldLabel:mmw.getI18nLabel('rel_masque__indexbatiment', 'Indexbatiment'),width:250,itemId:'rel_masque__indexbatiment',allowBlank:true,xtype:'hidden'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.rel_masqueFormPanel.superclass.initComponent.call(this);
    }
});

mmw.rel_masqueGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfRel_masqueObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.rel_masqueGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'rel_masque__codemasque',type:'string',disabled:true},
		{dataIndex:'rel_masque__indexbatiment',type:'string',disabled:true}
	]	}, c));
};

Ext.extend(mmw.rel_masqueGridFilters, Ext.ux.grid.GridFilters);

mmw.rel_masqueGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('rel_masqueGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.rel_masqueStore();
		var scope = this;
		this.sfObject = mmw.baseSfRel_masqueObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des masques'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 20,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('rel_masque__codemasque', 'Codemasque'),hidden:1,width:75,sortable:true,dataIndex:'rel_masque__codemasque'},
		{header:mmw.getI18nColumnHeader('rel_masque__indexbatiment', 'Indexbatiment'),hidden:1,width:75,sortable:true,dataIndex:'rel_masque__indexbatiment'}
	]        });
        mmw.rel_masqueGridPanel.superclass.initComponent.call(this);
    }
});

mmw.rel_masqueEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('rel_masqueEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.rel_masqueStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfRel_masqueObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des masques'),
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
		{header:mmw.getI18nColumnHeader('rel_masque__codemasque', 'Codemasque'),hidden:1,width:75,sortable:true,dataIndex:'rel_masque__codemasque',editor:{itemId:'rel_masque__codemasque',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('rel_masque__indexbatiment', 'Indexbatiment'),hidden:1,width:75,sortable:true,dataIndex:'rel_masque__indexbatiment',editor:{itemId:'rel_masque__indexbatiment',allowBlank:true,xtype:'hidden'}}
	]		});
		mmw.rel_masqueEditorGridPanel.superclass.initComponent.call(this);
	}
});