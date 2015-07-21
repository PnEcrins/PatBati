mmw.illustrationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	
	initComponent: function() {   
		this.sfObject = new mmw.sfIllustrationObject;
		
		this.grid = new mmw.illustrationGridPanel({
			title: 'Liste des illustrations',
    		height: 299,
    		form: this
    	});
		
		this.fieldsetConfig = {
			columnWidth: 0.66,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: 'Description de l\'illustration',
	        defaultType: 'textfield',
	        autoHeight: true,
	        bodyStyle:	'padding:10px 15px;',
	        border: true,
	        style: {"margin-left": "10px"}
		};
		 
		Ext.apply(this, {
			frame: true,
		    layout: 'column',	
		    fileUpload: true,	
		    items: [{
			        columnWidth: 0.33,
			        layout: 'fit',
			        items:[
			        	this.grid
			        ]
			    }],
			itemsLists: [
		[
		{name:'illustration__indexbatiment--name',fieldId:'illustration__indexbatiment',fieldLabel:'Indexbatiment',width:250,allowBlank:false,xtype:'combo',mode:'local',store:new Ext.data.SimpleStore(),hiddenName:'illustration__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,emptyText:'Enter a value',triggerAction:'all'},
		{name:'illustration__indexilustration',fieldId:'illustration__indexilustration',fieldLabel:'Indexilustration',width:250,allowBlank:true,xtype:'hidden'},
		{name:'illustration__codeillustration--name',fieldId:'illustration__codeillustration',fieldLabel:'Type de photographie',width:250,allowBlank:false,xtype:'combo',mode:'local',store:new Ext.data.SimpleStore(),hiddenName:'illustration__codeillustration',displayField:mmw.baseSfBib_illustrationObject.displayField,valueField:mmw.baseSfBib_illustrationObject.keyField,emptyText:'Enter a value',triggerAction:'all'},
		{name:'illustration__codepersonne--name',fieldId:'illustration__codepersonne',fieldLabel:'Photographe',width:250,allowBlank:true,xtype:'combo',mode:'local',store:new Ext.data.SimpleStore(),hiddenName:'illustration__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,emptyText:'Enter a value',triggerAction:'all'},
		{name:'illustration__date_illustration',fieldId:'illustration__date_illustration',fieldLabel:'Date de la photographie',width:250,allowBlank:true,xtype:'datefield'},
		{name:'illustration__fichier_source',fieldId:'illustration__fichier_source',fieldLabel:'Fichier source',width:250,allowBlank:true,xtype:'mmwFileUploadField',emptyText:'Select a file',buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	]        });
        
        mmw.illustrationGridFormPanel.superclass.initComponent.call(this);  
    }
});

mmw.sfIllustrationObject = Ext.extend(mmw.sfObject, {
	url: 'illustration',
	keyField : 'illustration__indexilustration',
	displayField: 'illustration__',
	singularName: 'illustration',
	humanName: 'Illustration'
});

mmw.baseSfIllustrationObject = new mmw.sfIllustrationObject;

mmw.illustrationStore = function(c) {
	if (c == undefined) {
		c = {};
	}
	mmw.illustrationStore.superclass.constructor.call(this, Ext.apply(c, {
		sfObject: new mmw.sfIllustrationObject,
		fields: [
		'illustration__indexbatiment',
		'illustration__indexilustration',
		'illustration__codeillustration',
		'illustration__list_thumb'
	] 
	}));
};

Ext.extend(mmw.illustrationStore, mmw.Store);

mmw.illustrationFormPanel = Ext.extend(mmw.FormPanel,{	
	initComponent: function() {
		Ext.apply(this, {
			itemsLists: [
		[
		{name:'illustration__indexbatiment--name',fieldId:'illustration__indexbatiment',fieldLabel:'Indexbatiment',width:250,allowBlank:false,xtype:'combo',mode:'local',store:new Ext.data.SimpleStore(),hiddenName:'illustration__indexbatiment',displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,emptyText:'Enter a value',triggerAction:'all'},
		{name:'illustration__indexilustration',fieldId:'illustration__indexilustration',fieldLabel:'Indexilustration',width:250,allowBlank:true,xtype:'hidden'},
		{name:'illustration__codeillustration--name',fieldId:'illustration__codeillustration',fieldLabel:'Type de photographie',width:250,allowBlank:false,xtype:'combo',mode:'local',store:new Ext.data.SimpleStore(),hiddenName:'illustration__codeillustration',displayField:mmw.baseSfBib_illustrationObject.displayField,valueField:mmw.baseSfBib_illustrationObject.keyField,emptyText:'Enter a value',triggerAction:'all'},
		{name:'illustration__codepersonne--name',fieldId:'illustration__codepersonne',fieldLabel:'Photographe',width:250,allowBlank:true,xtype:'combo',mode:'local',store:new Ext.data.SimpleStore(),hiddenName:'illustration__codepersonne',displayField:mmw.baseSfBib_personnesObject.displayField,valueField:mmw.baseSfBib_personnesObject.keyField,emptyText:'Enter a value',triggerAction:'all'},
		{name:'illustration__date_illustration',fieldId:'illustration__date_illustration',fieldLabel:'Date de la photographie',width:250,allowBlank:true,xtype:'datefield'},
		{name:'illustration__fichier_source',fieldId:'illustration__fichier_source',fieldLabel:'Fichier source',width:250,allowBlank:true,xtype:'mmwFileUploadField',emptyText:'Select a file',buttonText:'',buttonCfg:{iconCls: 'upload-icon'}}
	]
	],
            sfObject : new mmw.sfIllustrationObject,
            bodyStyle: 'padding: 10px',
            fileUpload: true     });
		mmw.illustrationFormPanel.superclass.initComponent.call(this);
    }
});

mmw.illustrationGridPanel = Ext.extend(mmw.GridPanel,{
	initComponent: function() {    
		var store = new mmw.illustrationStore();
		var scope = this; 
        Ext.apply(this, {
        	title: 'Liste des illustrations',
			store: store,
			sfObject: mmw.baseSfIllustrationObject,
			columns: [
		{header:'Indexbatiment',width:75,sortable:true,dataIndex:'illustration__indexbatiment'},
		{header:'Indexilustration',hidden:1,width:75,sortable:true,dataIndex:'illustration__indexilustration'},
		{header:'Type de photographie',width:75,sortable:true,dataIndex:'illustration__codeillustration'},
		{header:'Aperçu',width:75,sortable:false,dataIndex:'illustration__list_thumb',renderer: function(id) {  return '<a rel="lightbox" href="illustration/show?indexillustration=' + id + '"><img src="illustration/listThumb?indexillustration=' + id + '"></a>'; }}
	],
			bbar: new Ext.PagingToolbar({
		        pageSize: 20,
		        store: store,
		        displayInfo: true,
				displayMsg: 'Illustrations {0} à {1} des {2}',
		        emptyMsg: 'Pas d\'illustrations' })
        });
        mmw.illustrationGridPanel.superclass.initComponent.call(this);   
    }
});

mmw.illustrationEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	initComponent: function() {
		var identificationStore = new mmw.identificationStore({autoLoad: true});
var bib_illustrationStore = new mmw.bib_illustrationStore({autoLoad: true});
		var store = new mmw.illustrationStore({editorGrid: true});
		var scope = this;
		Ext.apply(this, {
			title: 'Liste des illustrations',
			line: Ext.data.Record.create([{}]),
			store: store,
			sfObject: new mmw.sfIllustrationObject,
			columns: [
		{header:'Indexbatiment',width:75,sortable:true,dataIndex:'illustration__indexbatiment',editor:{allowBlank:false,xtype:'combo',store:identificationStore,displayField:mmw.baseSfIdentificationObject.displayField,valueField:mmw.baseSfIdentificationObject.keyField,emptyText:'Enter a value',triggerAction:'all'},renderer:function(value) { return identificationStore.getRecordDisplayFieldValue(value); }},
		{header:'Indexilustration',hidden:1,width:75,sortable:true,dataIndex:'illustration__indexilustration',editor:{allowBlank:true,xtype:'hidden'}},
		{header:'Type de photographie',width:75,sortable:true,dataIndex:'illustration__codeillustration',editor:{allowBlank:false,xtype:'combo',store:bib_illustrationStore,displayField:mmw.baseSfBib_illustrationObject.displayField,valueField:mmw.baseSfBib_illustrationObject.keyField,emptyText:'Enter a value',triggerAction:'all'},renderer:function(value) { return bib_illustrationStore.getRecordDisplayFieldValue(value); }},
		{header:'Aperçu',width:75,sortable:false,dataIndex:'illustration__list_thumb'}
	],
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: 'Illustrations {0} à {1} des {2}',
		        emptyMsg: 'Pas d\'illustrations'		    })
		});
		mmw.illustrationEditorGridPanel.superclass.initComponent.call(this);
	}
});