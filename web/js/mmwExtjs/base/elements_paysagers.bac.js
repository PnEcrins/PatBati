mmw.elements_paysagersGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	
	initComponent: function() {   
		this.sfObject = new mmw.sfElements_paysagersObject;
		
		this.grid = new mmw.elements_paysagersGridPanel({
    		height: 299,
    		form: this,
    	});
		
		this.fieldsetConfig = {
			columnWidth: 0.4,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: 'Vue d\'édition de '+this.sfObject.humanName,
	        defaultType: 'textfield',
	        autoHeight: true,
	        bodyStyle:	'padding:10px 15px;',
	        border: true,
	        style: {"margin-left": "10px"}
		};
		 
		Ext.apply(this, {
			frame: true,
		    layout: 'column',	
		    	
		    items: [{
			        columnWidth: 0.6,
			        layout: 'fit',
			        items:[
			        	this.grid
			        ]
			    }],
			itemsLists: [
		[
		{name:'elements_paysagers__indexbatiment--name',fieldId:'elements_paysagers__indexbatiment',fieldLabel:'Indexbatiment',width:250,allowBlank:false,hiddenName:'elements_paysagers__indexbatiment',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new Ext.data.SimpleStore(),displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField},
		{name:'elements_paysagers__indexep',fieldId:'elements_paysagers__indexep',fieldLabel:'Indexep',width:250,allowBlank:true,xtype:'hidden'},
		{name:'elements_paysagers__codeep--name',fieldId:'elements_paysagers__codeep',fieldLabel:'Eléments du paysage',width:250,allowBlank:false,hiddenName:'elements_paysagers__codeep',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new Ext.data.SimpleStore(),displayField:mmw.baseSfBib_element_paysagerObject.displayField,valueField:mmw.baseSfBib_element_paysagerObject.keyField},
		{name:'elements_paysagers__ep_rem',fieldId:'elements_paysagers__ep_rem',fieldLabel:'Elément remarquable',width:250,allowBlank:true,xtype:'checkbox'},
		{name:'elements_paysagers__codeconservation--name',fieldId:'elements_paysagers__codeconservation',fieldLabel:'Conservation',width:250,allowBlank:false,hiddenName:'elements_paysagers__codeconservation',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new Ext.data.SimpleStore(),displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField}
	]
	]        });
        
        mmw.elements_paysagersGridFormPanel.superclass.initComponent.call(this);  
    }
});

mmw.sfElements_paysagersObject = Ext.extend(mmw.sfObject, {
	url: 'elements_paysagers',
	keyField : 'elements_paysagers__indexep',
	displayField: 'elements_paysagers__codeep',
	singularName: 'elements_paysagers',
	humanName: 'Elements paysagers'
});

mmw.baseSfElements_paysagersObject = new mmw.sfElements_paysagersObject;

mmw.elements_paysagersStore = function(c) {
	if (c == undefined) {
		c = {};
	}
	mmw.elements_paysagersStore.superclass.constructor.call(this, Ext.apply(c, {
		sfObject: new mmw.sfElements_paysagersObject,
		fields: [
		'elements_paysagers__indexbatiment',
		'elements_paysagers__indexep',
		'elements_paysagers__codeep',
		'elements_paysagers__ep_rem',
		'elements_paysagers__codeconservation'
	] 
	}));
};

Ext.extend(mmw.elements_paysagersStore, mmw.Store);

mmw.elements_paysagersFormPanel = Ext.extend(mmw.FormPanel,{	
	initComponent: function() {
		Ext.apply(this, {
			itemsLists: [
		[
		{name:'elements_paysagers__indexbatiment--name',fieldId:'elements_paysagers__indexbatiment',fieldLabel:'Indexbatiment',width:250,allowBlank:false,hiddenName:'elements_paysagers__indexbatiment',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new Ext.data.SimpleStore(),displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField},
		{name:'elements_paysagers__indexep',fieldId:'elements_paysagers__indexep',fieldLabel:'Indexep',width:250,allowBlank:true,xtype:'hidden'},
		{name:'elements_paysagers__codeep--name',fieldId:'elements_paysagers__codeep',fieldLabel:'Eléments du paysage',width:250,allowBlank:false,hiddenName:'elements_paysagers__codeep',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new Ext.data.SimpleStore(),displayField:mmw.baseSfBib_element_paysagerObject.displayField,valueField:mmw.baseSfBib_element_paysagerObject.keyField},
		{name:'elements_paysagers__ep_rem',fieldId:'elements_paysagers__ep_rem',fieldLabel:'Elément remarquable',width:250,allowBlank:true,xtype:'checkbox'},
		{name:'elements_paysagers__codeconservation--name',fieldId:'elements_paysagers__codeconservation',fieldLabel:'Conservation',width:250,allowBlank:false,hiddenName:'elements_paysagers__codeconservation',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new Ext.data.SimpleStore(),displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField}
	]
	],
            sfObject : new mmw.sfElements_paysagersObject,
            bodyStyle: 'padding: 10px',
                    });
		mmw.elements_paysagersFormPanel.superclass.initComponent.call(this);
    }
});

mmw.elements_paysagersGridPanel = Ext.extend(mmw.GridPanel,{
	initComponent: function() {    
		var store = new mmw.elements_paysagersStore(); 
        Ext.apply(this, {
			store: store,
			sfObject: mmw.baseSfElements_paysagersObject,
			columns: [
		{header:'Indexbatiment',width:75,sortable:true,dataIndex:'elements_paysagers__indexbatiment'},
		{header:'Indexep',hidden:1,width:75,sortable:true,dataIndex:'elements_paysagers__indexep'},
		{header:'Eléments du paysage',width:75,sortable:true,dataIndex:'elements_paysagers__codeep'},
		{header:'Elément remarquable',width:75,sortable:true,dataIndex:'elements_paysagers__ep_rem'},
		{header:'Conservation',width:75,sortable:true,dataIndex:'elements_paysagers__codeconservation'}
	],
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: 'ELEMENTS_PAYSAGERS {0} A {1} des {2}',
		        emptyMsg: "PAS DE ELEMENTS_PAYSAGERS"
		    })
        });
        mmw.elements_paysagersGridPanel.superclass.initComponent.call(this);   
    }
});

mmw.elements_paysagersEditorGridLine = Ext.data.Record.create([{}]);

var storeTemp = new mmw.bib_conservationStore({autoLoad: true});

mmw.elements_paysagersEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	initComponent: function() {
		var store = new mmw.elements_paysagersStore();
		Ext.apply(this, {
			line: mmw.elements_paysagersEditorGridLine,
			store: store,
			sfObject: new mmw.sfElements_paysagersObject,
			columns: [
		{header:'Indexbatiment',width:75,sortable:true,dataIndex:'elements_paysagers__indexbatiment',editor:{allowBlank:false,xtype:'combo',emptyText:'Enter a value',triggerAction:'all',store: new mmw.identificationStore({autoLoad: true}),displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField}},
		{header:'Indexep',hidden:1,width:75,sortable:true,dataIndex:'elements_paysagers__indexep',editor:{allowBlank:true,xtype:'hidden'}},
		{header:'Eléments du paysage',width:75,sortable:true,dataIndex:'elements_paysagers__codeep',editor:{allowBlank:false,xtype:'combo',emptyText:'Enter a value',triggerAction:'all',store:new mmw.bib_element_paysagerStore({autoLoad: true}),displayField:mmw.baseSfBib_element_paysagerObject.displayField,valueField:mmw.baseSfBib_element_paysagerObject.keyField}},
		{header:'Elément remarquable',width:75,sortable:true,dataIndex:'elements_paysagers__ep_rem',editor:{allowBlank:true,xtype:'checkbox'}},
		{header:'Conservation',width:75,sortable:true,dataIndex:'elements_paysagers__codeconservation',editor:{allowBlank:false,xtype:'combo',emptyText:'Enter a value',triggerAction:'all',store:storeTemp,displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField},renderer:
                    function(value) {
                        var idx = storeTemp.find(mmw.baseSfBib_conservationObject.keyField, value);
                        return (idx != "-1") ? storeTemp.getAt(idx).data[mmw.baseSfBib_conservationObject.displayField] : '{unknown}';
                    }}
	],
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: 'ELEMENTS_PAYSAGERS {0} A {1} des {2}',
		        emptyMsg: "PAS DE ELEMENTS_PAYSAGERS"
		    })
		});
		mmw.elements_paysagersEditorGridPanel.superclass.initComponent.call(this);
	}
});