mmw.identificationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	
	initComponent: function() {    

		this.grid = new mmw.identificationGridPanel({
    		height: 299,
    		form: this,
    	});
		
		this.sfObject = new mmw.sfIdentificationObject;
			
		Ext.apply(this, {
			frame: true,
		    layout: 'column',				
		    items: [{
		        columnWidth: 0.6,
		        layout: 'fit',
		        items:[
		        	this.grid
		        ],
		    },{
		    	columnWidth: 0.4,
		        xtype: 'fieldset',
		        labelWidth: 90,
		        title: 'Detail du travail',
		        defaults: {width: 140},	
		        defaultType: 'textfield',
		        autoHeight: true,
		        bodyStyle:	'padding:10px 15px;',
		        border: true,
		        style: {"margin-left": "10px"},
		        items: [{name:'identification__indexbatiment',fieldLabel:'indexbatiment',xtype:'hidden'},{name:'identification__codepem--name',fieldLabel:'codepem',hiddenName:'identification__codepem',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_implantationStore,displayField:mmw.baseSfBib_implantationObject.displayField,valueField:mmw.baseSfBib_implantationObject.keyField},{name:'identification__codeclasse--name',fieldLabel:'codeclasse',hiddenName:'identification__codeclasse',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_classe_archiStore,displayField:mmw.baseSfBib_classe_archiObject.displayField,valueField:mmw.baseSfBib_classe_archiObject.keyField},{name:'identification__codefaitage--name',fieldLabel:'codefaitage',hiddenName:'identification__codefaitage',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_faitageStore,displayField:mmw.baseSfBib_faitageObject.displayField,valueField:mmw.baseSfBib_faitageObject.keyField},{name:'identification__codeinsee--name',fieldLabel:'codeinsee',hiddenName:'identification__codeinsee',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_communeStore,displayField:mmw.baseSfBib_communeObject.displayField,valueField:mmw.baseSfBib_communeObject.keyField},{name:'identification__appelation',fieldLabel:'appelation',xtype:'textarea',width:300,height:20},{name:'identification__bat_suppr',fieldLabel:'bat_suppr',xtype:'checkbox'},{name:'identification__rel_masque_list',fieldLabel:'rel_masque_list'}]		    }],	 
        });
        
        mmw.identificationGridFormPanel.superclass.initComponent.call(this);  
    }
});

mmw.sfIdentificationObject = Ext.extend(mmw.sfObject, {
	url: 'identification',
	keyField : 'identification__indexbatiment',
	displayField: 'identification__appelation' 
});

mmw.baseSfIdentificationObject = new mmw.sfIdentificationObject;

mmw.identificationStore = function() {
	mmw.identificationStore.superclass.constructor.call(this, Ext.apply({
		sfObject: new mmw.sfIdentificationObject,
		fields: ['identification__indexbatiment','identification__appelation'] 
	}));
};

Ext.extend(mmw.identificationStore, mmw.Store);

var ds = new Ext.data.ArrayStore({
        data: [[123,"One Hundred Twenty Three"],
            ["1", "One"], ["2", "Two"], ["3", "Three"], ["4", "Four"], ["5", "Five"],
            ["6", "Six"], ["7", "Seven"], ["8", "Eight"], ["9", "Nine"]],
        fields: ['value','text'],
        sortInfo: {
            field: 'value',
            direction: 'ASC'
        }
    });

//var ds = new mmw.bib_masqueStore();

mmw.identificationFormPanel = Ext.extend(mmw.FormPanel,{
	initComponent: function() {
		Ext.apply(this, {
            sfObject : new mmw.sfIdentificationObject,
            bodyStyle: 'padding: 10px',
            
            items: [{name:'identification__indexbatiment',fieldLabel:'indexbatiment',xtype:'hidden'},
                    {name:'identification__codepem--name',fieldLabel:'codepem',hiddenName:'identification__codepem',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_implantationStore,displayField:mmw.baseSfBib_implantationObject.displayField,valueField:mmw.baseSfBib_implantationObject.keyField},{name:'identification__codeclasse--name',fieldLabel:'codeclasse',hiddenName:'identification__codeclasse',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_classe_archiStore,displayField:mmw.baseSfBib_classe_archiObject.displayField,valueField:mmw.baseSfBib_classe_archiObject.keyField},
                    {name:'identification__codefaitage--name',fieldLabel:'codefaitage',hiddenName:'identification__codefaitage',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_faitageStore,displayField:mmw.baseSfBib_faitageObject.displayField,valueField:mmw.baseSfBib_faitageObject.keyField},{name:'identification__codeinsee--name',fieldLabel:'codeinsee',hiddenName:'identification__codeinsee',xtype:'combo',emptyText:'Enter a value',triggerAction:'all',mode:'local',store:new mmw.bib_communeStore,displayField:mmw.baseSfBib_communeObject.displayField,valueField:mmw.baseSfBib_communeObject.keyField},
                    {name:'identification__appelation',fieldLabel:'appelation',xtype:'textarea',width:300,height:20},{name:'identification__bat_suppr',fieldLabel:'bat_suppr',xtype:'checkbox'},
                    
            
            {
	            xtype:'mmwItemSelector',
	            name:'identification__rel_masque_list',
	            fieldLabel:'rel_masque_list',
	            store: new mmw.bib_masqueStore(),
	            displayField: 'bib_masque__masque',
	            valueField: 'bib_masque__codemasque',
            }]        
            
            });
		
		mmw.identificationFormPanel.superclass.initComponent.call(this);
    }

});

mmw.identificationGridPanel = Ext.extend(mmw.GridPanel,{
	initComponent: function() {    
		var store = new mmw.identificationStore(); 
	    //store.load();
        Ext.apply(this, {
			store: store,  
			columns: [{header:'Indexbatiment',width:75,sortable:true,dataIndex:'identification__indexbatiment'},{header:'Appelation',width:75,sortable:true,dataIndex:'identification__appelation'}],
						
			//autoExpandColumn: 'identification__appelation',
			bbar: new Ext.PagingToolbar({
		        pageSize: 7,
		        store: store,
		        displayInfo: true,
		        displayMsg: 'IDENTIFICATION {0} A {1} des {2}',
		        emptyMsg: "PAS DE IDENTIFICATION"
		    })
        });
        mmw.identificationGridPanel.superclass.initComponent.call(this);   
    }
});