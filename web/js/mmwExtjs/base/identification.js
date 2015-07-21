mmw.identificationGridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('identificationGridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sfIdentificationObject;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.identificationGridPanel(this.overrideGridConfig);
		
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
		{title:mmw.getI18nLabel('Renseignements', 'Renseignements'),xtype:'fieldset',width:400,items:[
		{name:'identification__indexbatiment',fieldLabel:mmw.getI18nLabel('identification__indexbatiment', 'Nouveau numéro'),width:250,itemId:'identification__indexbatiment',allowBlank:true,xtype:'hidden'},
		{name:'identification__ancienindexbatiment',fieldLabel:mmw.getI18nLabel('identification__ancienindexbatiment', 'Ancien numéro'),width:250,itemId:'identification__ancienindexbatiment',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__appelation',fieldLabel:mmw.getI18nLabel('identification__appelation', 'Appellation'),width:250,itemId:'identification__appelation',allowBlank:false,maxLength:50,xtype:'textfield'},
		{name:'identification__notepatri--name',fieldLabel:mmw.getI18nLabel('identification__notepatri', 'Valeur patrimoniale'),width:250,itemId:'identification__notepatri',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_notepatriObject, fields: [mmw.baseSfBib_notepatriObject.keyField, mmw.baseSfBib_notepatriObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__notepatri',displayField:mmw.baseSfBib_notepatriObject.displayField,valueField:mmw.baseSfBib_notepatriObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__patrimonialite',fieldLabel:mmw.getI18nLabel('identification__patrimonialite', 'Patrimonialité'),width:'100%',itemId:'identification__patrimonialite',allowBlank:true,maxLength:200,height:'100%',xtype:'textarea'},
		{name:'identification__codeclasse--name',fieldLabel:mmw.getI18nLabel('identification__codeclasse', 'Type architectural'),width:250,itemId:'identification__codeclasse',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_classe_archiObject, fields: [mmw.baseSfBib_classe_archiObject.keyField, mmw.baseSfBib_classe_archiObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codeclasse',displayField:mmw.baseSfBib_classe_archiObject.displayField,valueField:mmw.baseSfBib_classe_archiObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__proprietaire',fieldLabel:mmw.getI18nLabel('identification__proprietaire', 'Propriétaire(s)'),width:250,itemId:'identification__proprietaire',allowBlank:true,maxLength:150,xtype:'textfield'},
		{name:'identification__indivision',fieldLabel:mmw.getI18nLabel('identification__indivision', 'Bâtiment en indivision'),width:250,itemId:'identification__indivision',allowBlank:true,xtype:'checkbox'},
		{name:'identification__rel_protections_list',fieldLabel:mmw.getI18nLabel('identification__rel_protections_list', 'Règlementation'),width:450,itemId:'identification__rel_protections_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_protectionStore,height:130}
	],itemId:'Renseignements'},
		{title:mmw.getI18nLabel('Géographie', 'Géographie'),xtype:'fieldset',width:400,items:[
		{name:'identification__codeinsee--name',fieldLabel:mmw.getI18nLabel('identification__codeinsee', 'Commune'),width:250,itemId:'identification__codeinsee',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_communeObject, fields: [mmw.baseSfBib_communeObject.keyField, mmw.baseSfBib_communeObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codeinsee',displayField:mmw.baseSfBib_communeObject.displayField,valueField:mmw.baseSfBib_communeObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__lieu_dit',fieldLabel:mmw.getI18nLabel('identification__lieu_dit', 'Lieu dit'),width:325,itemId:'identification__lieu_dit',allowBlank:true,maxLength:100,xtype:'textfield'},
		{name:'identification__cadastre',fieldLabel:mmw.getI18nLabel('identification__cadastre', 'N° de parcelle du cadastre'),width:250,itemId:'identification__cadastre',allowBlank:true,maxLength:20,xtype:'textfield'},
		{name:'identification__l2x',fieldLabel:mmw.getI18nLabel('identification__l2x', 'Coordonnée X'),width:250,itemId:'identification__l2x',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__l2y',fieldLabel:mmw.getI18nLabel('identification__l2y', 'Coordonnée Y'),width:250,itemId:'identification__l2y',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__altitude',fieldLabel:mmw.getI18nLabel('identification__altitude', 'Altitude'),width:250,itemId:'identification__altitude',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__denivelle',fieldLabel:mmw.getI18nLabel('identification__denivelle', 'Dénivellé'),width:250,itemId:'identification__denivelle',allowBlank:true,xtype:'textfield',vtype:'num'}
	],itemId:'Géographie'}
	],
		[
		{title:mmw.getI18nLabel('Situation', 'Situation'),xtype:'fieldset',width:400,items:[
		{name:'identification__indexbatiment',fieldLabel:mmw.getI18nLabel('identification__indexbatiment', 'Nouveau numéro'),width:250,itemId:'identification__indexbatiment',allowBlank:true,xtype:'hidden'},
		{name:'identification__codepem--name',fieldLabel:mmw.getI18nLabel('identification__codepem', 'Emplacement dans la pente'),width:250,itemId:'identification__codepem',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_implantationObject, fields: [mmw.baseSfBib_implantationObject.keyField, mmw.baseSfBib_implantationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codepem',displayField:mmw.baseSfBib_implantationObject.displayField,valueField:mmw.baseSfBib_implantationObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__codefaitage--name',fieldLabel:mmw.getI18nLabel('identification__codefaitage', 'Orientation du faitage'),width:250,itemId:'identification__codefaitage',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_faitageObject, fields: [mmw.baseSfBib_faitageObject.keyField, mmw.baseSfBib_faitageObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codefaitage',displayField:mmw.baseSfBib_faitageObject.displayField,valueField:mmw.baseSfBib_faitageObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__situationgeo',fieldLabel:mmw.getI18nLabel('identification__situationgeo', 'Situation géographique'),width:'95%',itemId:'identification__situationgeo',allowBlank:true,maxLength:200,height:150,xtype:'textarea'},
		{name:'identification__exposition--name',fieldLabel:mmw.getI18nLabel('identification__exposition', 'Exposition'),width:250,itemId:'identification__exposition',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_expositionObject, fields: [mmw.baseSfBib_expositionObject.keyField, mmw.baseSfBib_expositionObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__exposition',displayField:mmw.baseSfBib_expositionObject.displayField,valueField:mmw.baseSfBib_expositionObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__pente',fieldLabel:mmw.getI18nLabel('identification__pente', 'Pente (en degrés)'),width:250,itemId:'identification__pente',allowBlank:true,xtype:'textfield',vtype:'num'}
	],itemId:'Situation'},
		{title:mmw.getI18nLabel('Contexte naturel', 'Contexte naturel'),xtype:'fieldset',width:400,items:[
		{name:'identification__rel_risquenats_list',fieldLabel:mmw.getI18nLabel('identification__rel_risquenats_list', 'Evènements'),width:450,itemId:'identification__rel_risquenats_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_risquenatStore,height:130},
		{name:'identification__info_risquenat',fieldLabel:mmw.getI18nLabel('identification__info_risquenat', 'Commentaire'),width:450,itemId:'identification__info_risquenat',allowBlank:true,maxLength:200,height:40,xtype:'textarea'},
		{name:'identification__rel_masques_list',fieldLabel:mmw.getI18nLabel('identification__rel_masques_list', 'Masques'),width:450,itemId:'identification__rel_masques_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_masqueStore,height:130},
		{name:'identification__info_masque',fieldLabel:mmw.getI18nLabel('identification__info_masque', 'Commentaire'),width:450,itemId:'identification__info_masque',allowBlank:true,maxLength:200,height:40,xtype:'textarea'}
	],itemId:'Contexte naturel'}
	],
		[
		{title:mmw.getI18nLabel('Etat', 'Etat'),xtype:'fieldset',width:400,items:[
		{name:'identification__codeconservation--name',fieldLabel:mmw.getI18nLabel('identification__codeconservation', 'Etat général'),width:250,itemId:'identification__codeconservation',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__remarques',fieldLabel:mmw.getI18nLabel('identification__remarques', 'Remarques'),width:'100%',itemId:'identification__remarques',allowBlank:true,maxLength:1000,height:200,xtype:'textarea'}
	],itemId:'Etat'},
		{title:mmw.getI18nLabel('Perspectives', 'Perspectives'),xtype:'fieldset',width:400,items:[
		{name:'identification__rel_ident_perspectives_list',fieldLabel:mmw.getI18nLabel('identification__rel_ident_perspectives_list', 'Perspectives'),width:450,itemId:'identification__rel_ident_perspectives_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_perspectiveStore,height:130}
	],itemId:'Perspectives'},
		{title:mmw.getI18nLabel('Inventaire du bâtiment', 'Inventaire du bâtiment'),xtype:'fieldset',width:400,items:[
		{name:'identification__valide',fieldLabel:mmw.getI18nLabel('identification__valide', 'Validé'),width:250,itemId:'identification__valide',allowBlank:true,xtype:'checkbox'}
	],itemId:'Inventaire du bâtiment'}
	]
	]        });
        
        mmw.identificationGridFormPanel.superclass.initComponent.call(this);  
    }
});


var humanName = 'identification';
mmw.sfIdentificationObject = Ext.extend(mmw.sfObject, {
	url: 'identification',
	keyField : 'identification__indexbatiment',
	displayField: 'identification__appelation',
	singularName: 'identification',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSfIdentificationObject = new mmw.sfIdentificationObject;

mmw.identificationStore = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.identificationStore.superclass.constructor.call(this, Ext.apply({
				retrieveDataMode: 'pager',
		sortInfo: {
		    field: 'identification__date_update',
		    direction: 'DESC'
		},
				sfObject: new mmw.sfIdentificationObject,
		fields: [
		'identification__valide',
		'identification__indexbatiment',
		'identification__appelation',
		'identification__codeclasse',
		'identification__notepatri',
		'identification__codeconservation',
		'identification__codeinsee',
		'identification__secteur_commune',
		'identification__link_fiche_summary',
		'identification__link_fiche',
		'identification__date_update'
	] 
	}, c));
};

Ext.extend(mmw.identificationStore, mmw.Store);

mmw.identificationFormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('identificationFormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sfIdentificationObject,
			itemsLists: [
		[
		{title:mmw.getI18nLabel('Renseignements', 'Renseignements'),xtype:'fieldset',width:400,items:[
		{name:'identification__indexbatiment',fieldLabel:mmw.getI18nLabel('identification__indexbatiment', 'Nouveau numéro'),width:250,itemId:'identification__indexbatiment',allowBlank:true,xtype:'hidden'},
		{name:'identification__ancienindexbatiment',fieldLabel:mmw.getI18nLabel('identification__ancienindexbatiment', 'Ancien numéro'),width:250,itemId:'identification__ancienindexbatiment',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__appelation',fieldLabel:mmw.getI18nLabel('identification__appelation', 'Appellation'),width:250,itemId:'identification__appelation',allowBlank:false,maxLength:50,xtype:'textfield'},
		{name:'identification__notepatri--name',fieldLabel:mmw.getI18nLabel('identification__notepatri', 'Valeur patrimoniale'),width:250,itemId:'identification__notepatri',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_notepatriObject, fields: [mmw.baseSfBib_notepatriObject.keyField, mmw.baseSfBib_notepatriObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__notepatri',displayField:mmw.baseSfBib_notepatriObject.displayField,valueField:mmw.baseSfBib_notepatriObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__patrimonialite',fieldLabel:mmw.getI18nLabel('identification__patrimonialite', 'Patrimonialité'),width:'100%',itemId:'identification__patrimonialite',allowBlank:true,maxLength:200,height:'100%',xtype:'textarea'},
		{name:'identification__codeclasse--name',fieldLabel:mmw.getI18nLabel('identification__codeclasse', 'Type architectural'),width:250,itemId:'identification__codeclasse',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_classe_archiObject, fields: [mmw.baseSfBib_classe_archiObject.keyField, mmw.baseSfBib_classe_archiObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codeclasse',displayField:mmw.baseSfBib_classe_archiObject.displayField,valueField:mmw.baseSfBib_classe_archiObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__proprietaire',fieldLabel:mmw.getI18nLabel('identification__proprietaire', 'Propriétaire(s)'),width:250,itemId:'identification__proprietaire',allowBlank:true,maxLength:150,xtype:'textfield'},
		{name:'identification__indivision',fieldLabel:mmw.getI18nLabel('identification__indivision', 'Bâtiment en indivision'),width:250,itemId:'identification__indivision',allowBlank:true,xtype:'checkbox'},
		{name:'identification__rel_protections_list',fieldLabel:mmw.getI18nLabel('identification__rel_protections_list', 'Règlementation'),width:450,itemId:'identification__rel_protections_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_protectionStore,height:130}
	],itemId:'Renseignements'},
		{title:mmw.getI18nLabel('Géographie', 'Géographie'),xtype:'fieldset',width:400,items:[
		{name:'identification__codeinsee--name',fieldLabel:mmw.getI18nLabel('identification__codeinsee', 'Commune'),width:250,itemId:'identification__codeinsee',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_communeObject, fields: [mmw.baseSfBib_communeObject.keyField, mmw.baseSfBib_communeObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codeinsee',displayField:mmw.baseSfBib_communeObject.displayField,valueField:mmw.baseSfBib_communeObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__lieu_dit',fieldLabel:mmw.getI18nLabel('identification__lieu_dit', 'Lieu dit'),width:325,itemId:'identification__lieu_dit',allowBlank:true,maxLength:100,xtype:'textfield'},
		{name:'identification__cadastre',fieldLabel:mmw.getI18nLabel('identification__cadastre', 'N° de parcelle du cadastre'),width:250,itemId:'identification__cadastre',allowBlank:true,maxLength:20,xtype:'textfield'},
		{name:'identification__l2x',fieldLabel:mmw.getI18nLabel('identification__l2x', 'Coordonnée X'),width:250,itemId:'identification__l2x',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__l2y',fieldLabel:mmw.getI18nLabel('identification__l2y', 'Coordonnée Y'),width:250,itemId:'identification__l2y',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__altitude',fieldLabel:mmw.getI18nLabel('identification__altitude', 'Altitude'),width:250,itemId:'identification__altitude',allowBlank:true,xtype:'textfield',vtype:'num'},
		{name:'identification__denivelle',fieldLabel:mmw.getI18nLabel('identification__denivelle', 'Dénivellé'),width:250,itemId:'identification__denivelle',allowBlank:true,xtype:'textfield',vtype:'num'}
	],itemId:'Géographie'}
	],
		[
		{title:mmw.getI18nLabel('Situation', 'Situation'),xtype:'fieldset',width:400,items:[
		{name:'identification__indexbatiment',fieldLabel:mmw.getI18nLabel('identification__indexbatiment', 'Nouveau numéro'),width:250,itemId:'identification__indexbatiment',allowBlank:true,xtype:'hidden'},
		{name:'identification__codepem--name',fieldLabel:mmw.getI18nLabel('identification__codepem', 'Emplacement dans la pente'),width:250,itemId:'identification__codepem',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_implantationObject, fields: [mmw.baseSfBib_implantationObject.keyField, mmw.baseSfBib_implantationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codepem',displayField:mmw.baseSfBib_implantationObject.displayField,valueField:mmw.baseSfBib_implantationObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__codefaitage--name',fieldLabel:mmw.getI18nLabel('identification__codefaitage', 'Orientation du faitage'),width:250,itemId:'identification__codefaitage',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_faitageObject, fields: [mmw.baseSfBib_faitageObject.keyField, mmw.baseSfBib_faitageObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codefaitage',displayField:mmw.baseSfBib_faitageObject.displayField,valueField:mmw.baseSfBib_faitageObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__situationgeo',fieldLabel:mmw.getI18nLabel('identification__situationgeo', 'Situation géographique'),width:'95%',itemId:'identification__situationgeo',allowBlank:true,maxLength:200,height:150,xtype:'textarea'},
		{name:'identification__exposition--name',fieldLabel:mmw.getI18nLabel('identification__exposition', 'Exposition'),width:250,itemId:'identification__exposition',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_expositionObject, fields: [mmw.baseSfBib_expositionObject.keyField, mmw.baseSfBib_expositionObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__exposition',displayField:mmw.baseSfBib_expositionObject.displayField,valueField:mmw.baseSfBib_expositionObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__pente',fieldLabel:mmw.getI18nLabel('identification__pente', 'Pente (en degrés)'),width:250,itemId:'identification__pente',allowBlank:true,xtype:'textfield',vtype:'num'}
	],itemId:'Situation'},
		{title:mmw.getI18nLabel('Contexte naturel', 'Contexte naturel'),xtype:'fieldset',width:400,items:[
		{name:'identification__rel_risquenats_list',fieldLabel:mmw.getI18nLabel('identification__rel_risquenats_list', 'Evènements'),width:450,itemId:'identification__rel_risquenats_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_risquenatStore,height:130},
		{name:'identification__info_risquenat',fieldLabel:mmw.getI18nLabel('identification__info_risquenat', 'Commentaire'),width:450,itemId:'identification__info_risquenat',allowBlank:true,maxLength:200,height:40,xtype:'textarea'},
		{name:'identification__rel_masques_list',fieldLabel:mmw.getI18nLabel('identification__rel_masques_list', 'Masques'),width:450,itemId:'identification__rel_masques_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_masqueStore,height:130},
		{name:'identification__info_masque',fieldLabel:mmw.getI18nLabel('identification__info_masque', 'Commentaire'),width:450,itemId:'identification__info_masque',allowBlank:true,maxLength:200,height:40,xtype:'textarea'}
	],itemId:'Contexte naturel'}
	],
		[
		{title:mmw.getI18nLabel('Etat', 'Etat'),xtype:'fieldset',width:400,items:[
		{name:'identification__codeconservation--name',fieldLabel:mmw.getI18nLabel('identification__codeconservation', 'Etat général'),width:250,itemId:'identification__codeconservation',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,mode:'local',hiddenName:'identification__codeconservation',displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},
		{name:'identification__remarques',fieldLabel:mmw.getI18nLabel('identification__remarques', 'Remarques'),width:'100%',itemId:'identification__remarques',allowBlank:true,maxLength:1000,height:200,xtype:'textarea'}
	],itemId:'Etat'},
		{title:mmw.getI18nLabel('Perspectives', 'Perspectives'),xtype:'fieldset',width:400,items:[
		{name:'identification__rel_ident_perspectives_list',fieldLabel:mmw.getI18nLabel('identification__rel_ident_perspectives_list', 'Perspectives'),width:450,itemId:'identification__rel_ident_perspectives_list',allowBlank:true,xtype:'mmwItemSelector',store:new mmw.bib_perspectiveStore,height:130}
	],itemId:'Perspectives'},
		{title:mmw.getI18nLabel('Inventaire du bâtiment', 'Inventaire du bâtiment'),xtype:'fieldset',width:400,items:[
		{name:'identification__valide',fieldLabel:mmw.getI18nLabel('identification__valide', 'Validé'),width:250,itemId:'identification__valide',allowBlank:true,xtype:'checkbox'}
	],itemId:'Inventaire du bâtiment'}
	]
	],
            bodyStyle: 'padding: 10px',
                    });
		mmw.identificationFormPanel.superclass.initComponent.call(this);
    }
});

mmw.identificationGridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSfIdentificationObject.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.identificationGridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: [
		{dataIndex:'identification__appelation',type:'string'}
	]	}, c));
};

Ext.extend(mmw.identificationGridFilters, Ext.ux.grid.GridFilters);

mmw.identificationGridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('identificationGridPanel', 'GridPanel'),
		
	initComponent: function() {
				var store = new mmw.identificationStore();
		var scope = this;
		this.sfObject = mmw.baseSfIdentificationObject; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des bâtiments'),
			store: store,
						bbar: new Ext.PagingToolbar({
		        pageSize: 500,
		        store: store,
						        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
		    }),
			columns: [
		{header:mmw.getI18nColumnHeader('identification__valide', 'Validé'),width:75,renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); },sortable:true,dataIndex:'identification__valide'},
		{header:mmw.getI18nColumnHeader('identification__indexbatiment', 'Nouveau numéro'),hidden:1,width:75,sortable:true,dataIndex:'identification__indexbatiment'},
		{header:mmw.getI18nColumnHeader('identification__appelation', 'Appellation'),width:75,sortable:true,dataIndex:'identification__appelation'},
		{header:mmw.getI18nColumnHeader('identification__codeclasse', 'Type architectural'),width:75,sortable:true,dataIndex:'identification__codeclasse'},
		{header:mmw.getI18nColumnHeader('identification__notepatri', 'Valeur patrimoniale'),width:75,sortable:true,dataIndex:'identification__notepatri'},
		{header:mmw.getI18nColumnHeader('identification__codeconservation', 'Etat général'),width:75,sortable:true,dataIndex:'identification__codeconservation'},
		{header:mmw.getI18nColumnHeader('identification__codeinsee', 'Commune'),width:75,sortable:true,dataIndex:'identification__codeinsee'},
		{header:mmw.getI18nColumnHeader('identification__secteur_commune', 'Secteur'),width:75,sortable:false,dataIndex:'identification__secteur_commune'},
		{header:mmw.getI18nColumnHeader('identification__link_fiche_summary', 'Fiche résumé'),width:75,sortable:false,dataIndex:'identification__link_fiche_summary'},
		{header:mmw.getI18nColumnHeader('identification__link_fiche', 'Fiche'),width:75,sortable:false,dataIndex:'identification__link_fiche'},
		{header:mmw.getI18nColumnHeader('identification__date_update', 'Date de mise à jour'),width:75,sortable:true,dataIndex:'identification__date_update',renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }}
	]        });
        mmw.identificationGridPanel.superclass.initComponent.call(this);
    }
});

mmw.identificationEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('identificationEditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.identificationStore({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sfIdentificationObject;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName), 'Liste des bâtiments'),
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
		{header:mmw.getI18nColumnHeader('identification__valide', 'Validé'),width:75,renderer:function(value) { return scope.getRecordCheckboxDisplayImage(value); },sortable:true,dataIndex:'identification__valide',editor:{itemId:'identification__valide',allowBlank:true,xtype:'checkbox'}},
		{header:mmw.getI18nColumnHeader('identification__indexbatiment', 'Nouveau numéro'),hidden:1,width:75,sortable:true,dataIndex:'identification__indexbatiment',editor:{itemId:'identification__indexbatiment',allowBlank:true,xtype:'hidden'}},
		{header:mmw.getI18nColumnHeader('identification__appelation', 'Appellation'),width:75,sortable:true,dataIndex:'identification__appelation',editor:{itemId:'identification__appelation',allowBlank:false,maxLength:50,xtype:'textfield'}},
		{header:mmw.getI18nColumnHeader('identification__codeclasse', 'Type architectural'),width:75,sortable:true,dataIndex:'identification__codeclasse',editor:{itemId:'identification__codeclasse',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_classe_archiObject, fields: [mmw.baseSfBib_classe_archiObject.keyField, mmw.baseSfBib_classe_archiObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_classe_archiObject.displayField,valueField:mmw.baseSfBib_classe_archiObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('identification__notepatri', 'Valeur patrimoniale'),width:75,sortable:true,dataIndex:'identification__notepatri',editor:{itemId:'identification__notepatri',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_notepatriObject, fields: [mmw.baseSfBib_notepatriObject.keyField, mmw.baseSfBib_notepatriObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_notepatriObject.displayField,valueField:mmw.baseSfBib_notepatriObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('identification__codeconservation', 'Etat général'),width:75,sortable:true,dataIndex:'identification__codeconservation',editor:{itemId:'identification__codeconservation',allowBlank:true,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_conservationObject, fields: [mmw.baseSfBib_conservationObject.keyField, mmw.baseSfBib_conservationObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_conservationObject.displayField,valueField:mmw.baseSfBib_conservationObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('identification__codeinsee', 'Commune'),width:75,sortable:true,dataIndex:'identification__codeinsee',editor:{itemId:'identification__codeinsee',allowBlank:false,xtype:'combo',store:new Ext.data.ArrayStore({sfObject: mmw.baseSfBib_communeObject, fields: [mmw.baseSfBib_communeObject.keyField, mmw.baseSfBib_communeObject.displayField]}),sfDatabaseMode:true,displayField:mmw.baseSfBib_communeObject.displayField,valueField:mmw.baseSfBib_communeObject.keyField,triggerAction:'all',lastQuery:''},renderer:function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }},
		{header:mmw.getI18nColumnHeader('identification__secteur_commune', 'Secteur'),width:75,sortable:false,dataIndex:'identification__secteur_commune'},
		{header:mmw.getI18nColumnHeader('identification__link_fiche_summary', 'Fiche résumé'),width:75,sortable:false,dataIndex:'identification__link_fiche_summary'},
		{header:mmw.getI18nColumnHeader('identification__link_fiche', 'Fiche'),width:75,sortable:false,dataIndex:'identification__link_fiche'},
		{header:mmw.getI18nColumnHeader('identification__date_update', 'Date de mise à jour'),width:75,sortable:true,dataIndex:'identification__date_update',editor:{itemId:'identification__date_update',allowBlank:true,xtype:'datefield'},renderer:function(value) { return scope.getRecordCorrectDateFormat(value); }}
	]		});
		mmw.identificationEditorGridPanel.superclass.initComponent.call(this);
	}
});