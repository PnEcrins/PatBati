// On active le mode debug
mmw_debug_mode = false;

// lightbox fro displaying images - false to not allow gallery fonction
Ext.ux.Lightbox.register('a[rel^=lightbox]', false);

/******************************************************************
 *               	PARTIE ECRANS D'ADMINISTRATION          	  *
 ******************************************************************/

var adminElementsSoGridFormPanel = new mmw.bib_soGridFormPanel({
	title: 'Second Œuvre',
	height: 450,
    region: 'center',
    overrideGridConfig: {
        title: 'Liste des éléments de second œuvre'
    }
});

adminElementsSoGridFormPanel.addInsertButton();
adminElementsSoGridFormPanel.addDeleteButton();

var adminBibFinitionGridFormPanel = new mmw.bib_finitionGridFormPanel({
	title: 'Finition',
	height: 450,
    region: 'center'
});

adminBibFinitionGridFormPanel.addInsertButton();
adminBibFinitionGridFormPanel.addDeleteButton();

var adminBibElementPaysagerGridFormPanel = new mmw.bib_element_paysagerGridFormPanel({
	title: 'Eléments paysagers',
	height: 450,
    region: 'center',
    overrideGridConfig: {
        title: 'Liste des éléments paysagers'
    }
});

adminBibElementPaysagerGridFormPanel.addInsertButton();
adminBibElementPaysagerGridFormPanel.addDeleteButton();

var adminBibEquipementGridFormPanel = new mmw.bib_equipementGridFormPanel({
	title: 'Equipements',
	height: 450,
    region: 'center',
    overrideGridConfig: {
        title: 'Liste des équipements'
    }
});

adminBibEquipementGridFormPanel.addInsertButton();
adminBibEquipementGridFormPanel.addDeleteButton();

var adminBibMasqueGridFormPanel = new mmw.bib_masqueGridFormPanel({
	title: 'Masques',
	height: 450,
    region: 'center',
    overrideGridConfig: {
        title: 'Liste des Masques'
    }
});

adminBibMasqueGridFormPanel.addInsertButton();
adminBibMasqueGridFormPanel.addDeleteButton();

var adminBibPersonnesGridFormPanel = new mmw.bib_personnesGridFormPanel({
	title: 'Personnes',
	height: 450,
    region: 'center',
    overrideGridConfig: {
        title: 'Liste des personnes'
    }
});

adminBibPersonnesGridFormPanel.addInsertButton();
adminBibPersonnesGridFormPanel.addDeleteButton();

//
var adminBibRisquenatGridFormPanel = new mmw.bib_risquenatGridFormPanel({
	title: 'Risques naturels',
	height: 450,
    region: 'center',
    overrideGridConfig: {
        title: 'Liste des risques naturels'
    }
});

adminBibRisquenatGridFormPanel.addInsertButton();
adminBibRisquenatGridFormPanel.addDeleteButton();

var adminContentPanel = new Ext.TabPanel({
	activeTab: 0,
	title: 'Ecran d\'administration',
//	layout: 'fit',
	frame: true,
	region: 'center',
//	width: '100%',
	closable: true,
//	autoScroll: true,
	items: [
		adminElementsSoGridFormPanel, 
		adminBibElementPaysagerGridFormPanel,
		adminBibEquipementGridFormPanel,
		adminBibMasqueGridFormPanel,
		adminBibPersonnesGridFormPanel,
		adminBibRisquenatGridFormPanel
	]
});

/******************************************************************
 *                  PARTIE GESTION DES BÂTIMENTS                  *
 ******************************************************************/

var batimentGridPanel = new mmw.identificationGridPanel({
    region: 'center',
    width: '100%',
	
	personnalizedColumns: [
		{dataIndex:'identification__link_fiche', renderer: function(id) { return '<a  href="export/complete/' + id + '">fiche</a>'; }},
		{dataIndex:'identification__link_fiche_summary', renderer: function(id) { return '<a href="export/synthese/' + id + '">fiche-résumé</a>'; }}
	],
	
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: true
    }),
	
	tbar: new Ext.Toolbar(),
	
	doSearch: function() {
		name = this.getTopToolbar().getComponent('search_textfield').getValue(); 
		
		if (name) {
			this.getStore().addFilter('name', name);
		}
		else {
			this.getStore().removeFilter('name');
		}
		
		this.getStore().reload();
	},
	
	doAdvancedSearch: function(form) {

    var formValues = {
      'codesecteur' : form.get('codesecteur_combobox').getValue(),
      'codeclasse' : form.get('codeclasse_combobox').getValue(),
      'codematge_spv' : form.get('codematge_spv_combobox').getValue(),
      'codematge_ch' : form.get('codematge_ch_combobox').getValue(),
      'codematge_co' : form.get('codematge_co_combobox').getValue(),
      'codeequipement' : form.get('codeequipement_combobox').getValue(),
      'codeperspective' : form.get('codeperspective_combobox').getValue()
    }; 
		
		// On sauvegarde les valeurs du formulaire: si la fenêtre des filtres est fermée, puis qu'on la rouvre, on pourra retrouver ces valeurs
		batimentGridPanel.advancedSearchFormValues = formValues;
		
		var store = this.getStore();
		
		for (var key in formValues) {
			if (!Ext.isEmpty(formValues[key])) {
				store.addFilter(key, formValues[key]);
			}
			else {
				store.removeFilter(key);
			}
		}
		
		store.reload();
	},

    getExportUrl: function(url) {
         var store = this.getStore();
         
         result = './'+url+'?';
         for (var key in store.baseParams) {
			result = result+'filters['+key+']='+store.baseParams[key]+'&';
		 }			
		return result;
    },

	openAdvancedSearchWindow: function() {

    if (Ext.isEmpty(this.win)) {
      var advancedSearchForm = new Ext.form.FormPanel({
        frame : true,
        items : [{
          xtype : 'combo',
          name : 'identification_filter__codesecteur',
          width : 250,
          fieldLabel : 'Secteur',
          itemId : 'codesecteur_combobox',
          allowBlank : true,
          store : new mmw.bib_secteurStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_secteurObject.displayField,
          valueField : mmw.baseSfBib_secteurObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'combo',
          name : 'identification_filter__codeclasse',
          fieldLabel : 'Type architectural',
          width : 250,
          itemId : 'codeclasse_combobox',
          allowBlank : true,
          store : new mmw.bib_classe_archiStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_classe_archiObject.displayField,
          valueField : mmw.baseSfBib_classe_archiObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'combo',
          name : 'identification_filter__codematge_spv',
          fieldLabel : 'Structure porteuse verticale',
          width : 250,
          itemId : 'codematge_spv_combobox',
          allowBlank : true,
          store : new mmw.bib_materiaux_geStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_materiaux_geObject.displayField,
          valueField : mmw.baseSfBib_materiaux_geObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'combo',
          name : 'identification_filter__codematge_ch',
          fieldLabel : 'Charpente',
          width : 250,
          itemId : 'codematge_ch_combobox',
          allowBlank : true,
          store : new mmw.bib_materiaux_geStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_materiaux_geObject.displayField,
          valueField : mmw.baseSfBib_materiaux_geObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'combo',
          name : 'identification_filter__codematge_co',
          fieldLabel : 'Couverture',
          width : 250,
          itemId : 'codematge_co_combobox',
          allowBlank : true,
          store : new mmw.bib_materiaux_geStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_materiaux_geObject.displayField,
          valueField : mmw.baseSfBib_materiaux_geObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'combo',
          name : 'identification_filter__codeequipement',
          fieldLabel : 'Équipement',
          width : 250,
          itemId : 'codeequipement_combobox',
          allowBlank : true,
          store : new mmw.bib_equipementStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_equipementObject.displayField,
          valueField : mmw.baseSfBib_equipementObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'combo',
          name : 'identification_filter__codeperspective',
          fieldLabel : 'Perspective',
          width : 250,
          itemId : 'codeperspective_combobox',
          allowBlank : true,
          store : new mmw.bib_perspectiveStore({
            autoLoad : true
          }),
          displayField : mmw.baseSfBib_perspectiveObject.displayField,
          valueField : mmw.baseSfBib_perspectiveObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        }, {
          xtype : 'spacer',
          height : 20
        }, {
          xtype : 'panel',
          layout : 'column',
          items : [{
            xtype : 'button',
            columnWidth : .33,
            text : 'Appliquer',
            handler : function(button, event) {
              batimentGridPanel.doAdvancedSearch.createDelegate(batimentGridPanel, [button.ownerCt.ownerCt])();
            }
          }, {
            xtype : 'button',
            columnWidth : .33,
            text : 'Vider le formulaire',

            handler : function(button, event) {
              button.ownerCt.ownerCt.getForm().reset();
            }
          }, {
            xtype : 'button',
            columnWidth : .33,
            text : 'Réinitialiser les filtres',

            handler : function(button, event) {
              button.ownerCt.ownerCt.getForm().reset();

              batimentGridPanel.doAdvancedSearch.createDelegate(batimentGridPanel, [button.ownerCt.ownerCt])();
            }
          }]
        }],

        listeners : {
          show : function(form) {
            if ( typeof (batimentGridPanel.advancedSearchFormValues) != 'undefined') {
              form.getForm().setValues(batimentGridPanel.advancedSearchFormValues);
              form.doLayout();
            }
          }
        }
      });

      advancedSearchForm.getForm().on('actioncomplete', function(form, action) {
        if ( typeof (batimentGridPanel.advancedSearchFormValues) != 'undefined') {
          this.getForm().setValues(batimentGridPanel.advancedSearchFormValues);
          this.doLayout();
        }
      }.createDelegate(advancedSearchForm));

      this.win = new Ext.Window({
        title : 'Recherche avancée',
        closable : true,
        width : 383,
        height : 320,
        plain : false,
        layout : 'fit',
        autoScroll : true,
        resizable : false,
        autoDestroy: false,
        closeAction: 'hide',
        items : [advancedSearchForm],
        listeners : {
          show : function() {
            globalContentPanel.disable();
          },
          hide : function() {
            globalContentPanel.enable();
          }
        }
      });
    }

    this.win.show(); 

	}
});

// Ajout des éléments de la barre d'outils de la grid des bâtiments
batimentGridPanel.getTopToolbar().add(
	{
		xtype: 'label',
		text: 'Recherche rapide :'
	},
	'',
	{
		xtype: 'textfield',
		itemId: 'search_textfield',
		fieldLabel: 'Recherche rapide',
		emptyText: 'Tapez un nom de bâtiment',
		enableKeyEvents: true,
		listeners: {
			// Réagit lorsqu'on tape du texte en direct
			keyup: function(textfield, event) {
				if(textfield.getValue().length > 2 || textfield.getValue().length==0) this.doSearch();
			}.createDelegate(batimentGridPanel),
			// Réagit lorsque la valeur est changée d'une autre manière
			change: function(textfield, value) {
				if (Ext.isEmpty(value)) {
					this.getStore().removeFilter('appelation__text');
				}
			}.createDelegate(batimentGridPanel)
		}
	},
	'',
	{
	    xtype: 'button',
	    text: batimentGridPanel.getLl('ResetButtonText'),
	    tooltip: batimentGridPanel.getLl('ResetButtonTooltip'),
		
	    handler: function() {
			var appellationField = this.getTopToolbar().getComponent('search_textfield');
	        appellationField.setValue('');
	        this.getStore().removeAllFilters();
	        this.getStore().addFilter('bat_suppr', false);
	        this.getStore().reload();
	    }.createDelegate(batimentGridPanel)
	},
	'-',
	{
		xtype: 'button',
		text: 'Recherche avancee',
		handler: batimentGridPanel.openAdvancedSearchWindow
	},
	'-',
	{
    xtype: 'button',
    text: 'Exporter tous les bâtiments selectionnées',
    handler: function() {
      Ext.getBody().mask("Géneration du fichier Excel des bâtiments …");
  
      //FileDownloader.load renvoi une promise
      var p = FileDownloader.load({
        url : './exportBatiments.xls',
        format : 'xls',
        filename : 'export_batiment_' + ((new Date()).format('d_m_Y'))
      });
      p.then(function() {
        Ext.getBody().unmask();
      });
      p['catch'](function(e) {
        Ext.getBody().unmask();
        Ext.Msg.alert('Erreur', e);
      });
    }
	},
	'-',
	{
		xtype: 'button',
		text: 'Exporter la partie travaux',
		handler: function() {
      Ext.getBody().mask("Géneration du fichier Excel des travaux …");
      
      //FileDownloader.load renvoi une promise
      var p = FileDownloader.load({
        url : batimentGridPanel.getExportUrl('exportTravaux.xls'),
        format : 'xls',
        filename : 'export_travaux_' + ((new Date()).format('d_m_Y'))
      });
      p.then(function() {
        Ext.getBody().unmask();
      });
      p['catch'](function(e) {
        Ext.getBody().unmask();
        Ext.Msg.alert('Erreur', e);
      }); 
		}
	}
);

batimentGridPanel.getTopToolbar().add('->');

if (batimentGridPanel.hasCredential('admin')) {
	batimentGridPanel.getTopToolbar().add(
		{
		    xtype: 'button',
		    text: 'Administration',
		    handler: function() {
				batiContentPanel.add(adminContentPanel).show();
			}
		}
	);
} 

if (batimentGridPanel.hasCredential('save')) {
	batimentGridPanel.getTopToolbar().add(
		'-',
		{
		    xtype: 'button',
		    text: batimentGridPanel.getLl('NewButtonText'),
		    handler: function(){
				batiContentPanel.addNewBatiment();
			}
		},
		{
			xtype: 'button',
		    scope: batimentGridPanel,
		    text: batimentGridPanel.getLl('DeleteButtonText'),
		    handler: batimentGridPanel.confirmDelete
		}
	);
}


batimentGridPanel.getStore().addFilter('bat_suppr', false);

// active double click pour afficher batiment
batimentGridPanel.on('rowdblclick', function(batimentGridPanel, data, e){
    var selection = batimentGridPanel.getSelectionModel().getSelections();
    var batimentTitle = selection[0].get("identification__appelation");
    var batimentId = selection[0].get("identification__indexbatiment");
	
    // if the tab is not existing create it
//	console.log('on cherche le bâtiment qui a l\'itemId "batiment_' + batimentId + '"');
    if (!batiContentPanel.getComponent('batiment_' + batimentId)) {
		batiContentPanel.addBatiment(batimentId, batimentTitle);
    }
    // if the tab is existing, set the focus on it
    else {
        batiContentPanel.setActiveTab('batiment_' + batimentId);
    }
});

// batiment Panel
mmw.batimentPanel = Ext.extend(Ext.Panel, {
    initComponent: function(){
        this.batimentInfoTabs = new mmw.batimentInfoTabs({
            region: 'south',
            width: '100%',
            height: 520,
            activeTab: 0,
            frame: true,
            batimentId: this.batimentId,
			batimentPanel: this
        });
		
		this.topLeftPanel = new Ext.Panel({
	        width: 300,
			margins: '5 0 0 5'
	    });
		
		this.topCenterPanel = new Ext.Panel({
	        columnWidth: .3,
			margins: '5 0 0 10'
	    });
		
		this.topRightPanel = new Ext.Panel({
	        columnWidth: .3,
			margins: '5 0 0 10'
	    });
		
		this.topPanel = new Ext.Panel({
//            title: 'Main Content',
            itemId: 'main_content' + this.batimentId, // change that when we will create a new batiment
		    layout:'column',
			region: 'center',
//		    margins: '5 0 0 0',
			items: [this.topLeftPanel, this.topCenterPanel, this.topRightPanel]
        });
		
        Ext.apply(this, {
            layout: 'border',
            defaults: {
                hideMode: 'offsets'
            },
            deferredRender: false,
            layoutOnTabChange: true,
            autodestroy: false,
            items: [this.topPanel, this.batimentInfoTabs]
            // statut bar
            /*
             bbar: new Ext.StatusBar({
             id: 'form-statusbar',
             defaultText: 'Ready'
             })
             */
        });
        mmw.batimentPanel.superclass.initComponent.call(this);
    },
    
    onRender: function(ct, position){
        mmw.batimentPanel.superclass.onRender.call(this, ct, position);
        this.batimentInfoTabs.addTabs(this.batimentId ? this.batimentId : 0);
    }
});

// batiment Info Tabs
mmw.batimentInfoTabs = Ext.extend(Ext.TabPanel, {
    initComponent: function(){
        mmw.batimentInfoTabs.superclass.initComponent.call(this);
    },
    
    deferredRender: true,
    
    addTabs: function(id){
        //tab identification
        var batimentInfoTabs = this;
		
		// On définit le batiment id à -1 par défaut
        if (!id) {
			batimentInfoTabs.batimentId = -1;
		}
		
		var updateBandeauIllustration = function() {
			var timestamp = new Date().getTime();
			
			if (batimentInfoTabs.batimentId != -1){
				var img_src = 'illustration/bandeauThumb?indexbatiment='+batimentInfoTabs.batimentId+'&ts='+timestamp;
			}
			else {
				var img_src = 'illustration/bandeauThumb';
			}
			
			// Photo du batiment
			var topLeftContent = '<a rel="lightbox" href="illustration/show?indexbatiment='+batimentInfoTabs.batimentId+'"><img src="'+img_src+'" /></a>';
			batimentInfoTabs.batimentPanel.topLeftPanel.getEl().on('load', function() {
				batimentInfoTabs.batimentPanel.topLeftPanel.doLayout();
			});
			batimentInfoTabs.batimentPanel.topLeftPanel.getEl().update(topLeftContent);
			batimentInfoTabs.batimentPanel.topLeftPanel.doLayout();
		};
		
		var updateBandeau = function(result) {
			// Définition du titre de la tab du bâtiment
			if (result.data.identification__appelation) {
				batiContentPanel.getActiveTab().setTitle(result.data.identification__appelation);
			}
		
			/* TOP CENTER CONTENT */
			var topCenterContent = '<div style="margin-top: 20px; line-height: 30px;">';
			
			// Appelation
			topCenterContent+= '<p>'+(result.data.identification__appelation || 'Pas d\'appelation')+'</p>';
			// Type architectural
			topCenterContent+= '<p><i>'+(result.list.identification__codeclasse[result.data.identification__codeclasse] || 'Pas de type architectural')+'</i></p>';
			
			topCenterContent+= '</div>'; 
			/* FIN TOP CENTER CONTENT */
			
			/* TOP RIGHT CONTENT */
			var topRightContent = '<div style="margin-top: 20px; line-height: 30px;">';
			
			// Secteur
			topRightContent+= '<p>'+(result.data.identification__secteur || 'Pas de secteur')+'</p>';
			// Commune
			topRightContent+= '<p>'+(result.list.identification__codeinsee[result.data.identification__codeinsee] || 'Pas de commune')+'</p>';
			// Lieu-dit
			topRightContent+= '<p>'+(result.data.identification__lieu_dit || 'Pas de lieu-dit')+'</p>';
			
			topRightContent+= '</div>'; 
			/* FIN TOP RIGHT CONTENT */
			
//			if ((result.data.identification__lieu_dit != '') && (result.data.identification__lieu_dit != null)) {
//				topCenterContent+= '<p>Lieu dit: '+result.data.identification__lieu_dit+'</p>';
//			}
			batimentInfoTabs.batimentPanel.topCenterPanel.getEl().update(topCenterContent);
			batimentInfoTabs.batimentPanel.topRightPanel.getEl().update(topRightContent);
			batimentInfoTabs.batimentPanel.topPanel.doLayout();
		};
		
        // tab renseignements
        var renseignementsFormPanel = new mmw.identificationFormPanel({
            height: '100%',
            region: 'center',
            ObjectId: id,
            itemsListToLoad: 0,
			
			personnalizedFields: [
				{itemId: 'identification__indexbatiment', xtype: 'displayfield'}
			],
			
            // for new batiment, set the title of the tab after the submit
            afterSubmitSuccess: function(form, a, isNew){
				mmw.identificationFormPanel.superclass.afterSubmitSuccess.call(form, a);
				
                if (batiContentPanel.getActiveTab().isNew == true) {
					var actualActiveTab = batiContentPanel.getActiveTab();
					
                    actualActiveTab.isNew = false;
					
					// Un bug se produit dans le tabpanel quand on change l'itemId
//					batiContentPanel.getActiveTab().itemId = 'batiment_' + a.result.data.identification__indexbatiment;
//console.log('batiContentPanel.getActiveTab()');
//console.log(batiContentPanel.getActiveTab());
//					enquetesEditorGridPanel.enable();					
//					enquetesEditorGridPanel.setPrincipalForeignKeyValue(a.result.data.identification__indexbatiment);					
//                    batimentInfoTabs.items.each(batimentInfoTabs.activateTabs, batimentInfoTabs);
//                    batimentInfoTabs.batimentId = this.ObjectId;
//					batimentGridPanel.newLineFromForm(a.result.data);
					
					// Pour résoudre ce problème, on supprime la tab actuelle et on la remplace
					batiContentPanel.remove(actualActiveTab);
					
					batiContentPanel.addBatiment(a.result.data.identification__indexbatiment, a.result.data.identification__appelation);					
					batiContentPanel.setActiveTab('batiment_' + a.result.data.identification__indexbatiment);
					
					actualActiveTab.destroy();
					
					batimentGridPanel.newLineFromForm(a.result.data);
                }
		        else {
					updateBandeau(a.result);
					
		            batimentGridPanel.updateLineFromForm(a.result.data);
		        }
		
        	return mmw.GridFormPanel.superclass.afterSubmitSuccess.call(form, a, isNew);
            }
        });
		
		renseignementsFormPanel.removeAll();
		
        var enquetesEditorGridPanel = new mmw.enquetesEditorGridPanel({
            height: 185,
			disabled: true,
            principalForeignKey: {
                name: 'indexbatiment',
                value: this.batimentId
            }
        });
		
		if (batiContentPanel.getActiveTab().isNew != true) {
			enquetesEditorGridPanel.enable();
		}
		
        enquetesEditorGridPanel.addInsertButton();
        enquetesEditorGridPanel.addDeleteButton();
		
		var geographieFormPanel = renseignementsFormPanel.getItemsList(0)[1];
		
		renseignementsFormPanel.add(new Ext.Panel({
			// column layout with 2 columns
			layout: 'column',
			autoScroll: true,
			
			// defaults for columns
			defaults: {
				columnWidth: 0.5,
				layout: 'form',
				border: false,
				xtype: 'panel',
				bodyStyle: 'padding:0 18px 0 0'
			},
			items: [{
				// left column
				defaults: {
					anchor: '100%'
				},
				items: [renseignementsFormPanel.getItemsList(0)[0]]
			}, {
				// right column
				items: [{
						defaults: {
							anchor: '100%'
						},
						items: [
							geographieFormPanel,
							enquetesEditorGridPanel
						]
					}
				]
			}]
		}));
		
		renseignementsFormPanel.on('afterload', function(result){
			updateBandeauIllustration();
			updateBandeau(result);
		});
		
        // adding renseignements tab
        this.add({
            title: 'Informations générales',
            layout: 'border',
			autoScroll: true,
            items: [renseignementsFormPanel]
        }).show();
        
        // tab environnement
        var environnementTab = new Ext.Panel({
            title: 'Environnement',
            layout: 'border'
        });
        
        environnementTab.on('beforeshow', function() {
            var environnementFormPanel = new mmw.identificationFormPanel({
                height: 450,
                region: 'center',
                ObjectId: batimentInfoTabs.batimentId,
                itemsListToLoad: 1
            });
            
			environnementFormPanel.removeAll();
			
			environnementFormPanel.add(new Ext.Panel({
				// column layout with 2 columns
				layout: 'column',
				autoScroll: true,
				
				// defaults for columns
				defaults: {
					columnWidth: 0.5,
					layout: 'form',
					border: false,
					xtype: 'panel',
					bodyStyle: 'padding:0 18px 0 0'
				},
				items: [{
					// left column
					// defaults for fields
					defaults: {
						anchor: '100%'
					},
					items: [renseignementsFormPanel.getItemsList(1)[0]]
				}, {
					// right column
					// defaults for fields
					defaults: {
						anchor: '100%'
					},
					items: [renseignementsFormPanel.getItemsList(1)[1]]
				}]
			}));
			
            environnementTab.add(environnementFormPanel);
        }, this);
        
        // add environnement tabs
        this.add(environnementTab);
		
        // tab travaux
        var travauxTab = new Ext.Panel({
            title: 'Travaux',
            layout: 'fit',
            autoShow: true
        });
        
        travauxTab.on('beforeshow', function(){
            var demandeEditorGridPanel = new mmw.demandeEditorGridPanel({
                height: 299,
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                }
            });
			
			
			if(demandeEditorGridPanel.hasCredential('save')) {
            	demandeEditorGridPanel.addInsertButton();
            	demandeEditorGridPanel.addDeleteButton();
            };
			
            var travauxEditorGridPanel = new mmw.travauxEditorGridPanel({
                height: 299,
				disabled: true,
                principalForeignKey: {
                    name: 'indexdemande',
                    value: -1
                }
            });
			
			if(travauxEditorGridPanel.hasCredential('save')) {
            	travauxEditorGridPanel.addInsertButton();
            	travauxEditorGridPanel.addDeleteButton();
			}
			demandeEditorGridPanel.on('newline', function () {
				travauxEditorGridPanel.setPrincipalForeignKeyValue(0);
				travauxEditorGridPanel.getStore().reload();
//				travauxEditorGridPanel.getStore().removeAll();
//				travauxEditorGridPanel.getStore().reload();
				travauxEditorGridPanel.disable();
			});

			demandeEditorGridPanel.on('delete', function(){
				if (this.getStore().getCount() == 1) {
					travauxEditorGridPanel.setPrincipalForeignKeyValue(0);
					travauxEditorGridPanel.getStore().reload();
//					travauxEditorGridPanel.getStore().removeAll();
					travauxEditorGridPanel.disable();
				}
			}, demandeEditorGridPanel);

			demandeEditorGridPanel.getSelectionModel().on('rowselect', function(sm, rowIndex, r){
	        	var selection = this.getSelectionModel().getSelected();
	    		var selectedId = selection.get(this.sfObject.keyField);
				
				travauxEditorGridPanel.enable();

				travauxEditorGridPanel.setPrincipalForeignKeyValue(selectedId);
				travauxEditorGridPanel.getStore().reload();
			}, demandeEditorGridPanel);
			
			demandeEditorGridPanel.editor.on('remotesave', function(){
				this.getSelectionModel().deselectRow();
				this.getSelectionModel().selectFirstRow();
			}, demandeEditorGridPanel);
			
			var demandeAndTravauxPanel = new Ext.Panel({
				frame: true,
			    layout: 'column',
			    items: [
					{
				        columnWidth: 0.5,
				        layout: 'fit',
				        items:[
				        	demandeEditorGridPanel
				        ]
				    },
					{
				        columnWidth: 0.5,
				        layout: 'fit',
				        items:[
				        	travauxEditorGridPanel
				        ]
				    }
				]
			});
            
            travauxTab.add(demandeAndTravauxPanel);
        }, this);
        
        // adding travaux tab
        this.add(travauxTab);      
		
		/* PARTIE MATFINS / FINITION */
		var finitionsFilter = function(record, record_id, matfins_value) {
			var codeMatfinsList = record.data.bib_finition__codematfinslist;
			
			if (!Ext.isArray(codeMatfinsList)) {
				codeMatfinsList = [codeMatfinsList];
			}
			for (key in codeMatfinsList) {
				if (codeMatfinsList[key] == matfins_value) {
					return true;
				}
			}
			return false;
		};

		var meoeuvresFilter = function(record, record_id, matge_value) {
			var codeMatgeList = record.data.bib_meoeuvre__codematgelist;
			if (!Ext.isArray(codeMatgeList)) {
				codeMatgeList = [codeMatgeList];
			}
			for (key in codeMatgeList) {
				if (codeMatgeList[key] == matge_value) {
					return true;
				}
			}
			return false;
		};

		var addDoubleComboPanel = function(formPanel){
			var formPrefix = formPanel.sfObject.singularName;
			
			// On clone la config du bouton d'ajout
			var cloneAddRelationButtonConfig = formPanel.addRelationButton.cloneConfig();
			// Puis on supprime le bouton (pour l'ajouter à la fin)
			formPanel.doubleCombosFieldset.remove(formPanel.addRelationButton);
			
			// On initialise ou incrément le nombre de doubleCombos
			if (typeof(formPanel.nbDoubleComboPanel) == 'undefined') {
				formPanel.nbDoubleComboPanel = 1;
			}
			else {
				formPanel.nbDoubleComboPanel++;
			}
			
			var staticIndex = (formPanel.nbDoubleComboPanel - 1);

			// On instancie un combo pour les finitions
			var comboCodefinition = new Ext.form.ComboBox({
				name: formPrefix+'__codefinition__'+staticIndex+'--name',
				itemId: formPrefix+'__codefinition__'+staticIndex,
				hideLabel: true,
				disabled: true,
				width: 250,
				allowBlank: false,
				hiddenName: formPrefix+'__codefinition__'+staticIndex,
				xtype: 'combo',
				triggerAction: 'all',
				lastQuery: '',
//				store: new mmw.bib_finitionStore({data: finitionsStore.data}),
				store: new Ext.data.ArrayStore({
					fields: finitionsStore.fields,
					data: finitionsStore.data
				}),
				displayField: mmw.baseSfBib_finitionObject.displayField,
				valueField: mmw.baseSfBib_finitionObject.keyField
			});
			
			// Puis pour les matfins
			var comboCodematfins = new Ext.form.ComboBox({
				name: formPrefix+'__codematfins__'+staticIndex+'--name',
				itemId: formPrefix+'__codematfins__'+staticIndex,
				hideLabel: true,
				width: 250,
				allowBlank: false,
				mode: 'local',
				hiddenName: formPrefix+'__codematfins__'+staticIndex,
				xtype: 'combo',
				triggerAction: 'all',
				lastQuery: '',
//				store: new mmw.bib_materiaux_finsStore({data: matFinsStore.data}),
				store: new Ext.data.ArrayStore({
					fields: matFinsStore.fields,
					data: matFinsStore.data
				}),			
				displayField: mmw.baseSfBib_materiaux_finsObject.displayField,
				valueField: mmw.baseSfBib_materiaux_finsObject.keyField,
				listeners: {
//					select: function(c, record, i){
//						loadFinitionBySelectedMatFins(comboCodefinition, comboCodematfins.getValue());
//					}
					select: function(c, record, i){
						if ((Ext.isDefined(comboCodematfins.oldValue) == false) || (comboCodematfins.oldValue != record.json[0])) {
							comboCodefinition.setRawValue('');
						}
						comboCodefinition.store.filterBy(finitionsFilter.createDelegate(this, comboCodematfins.getValue(), true));
						if (comboCodefinition.disabled == true) {
							comboCodefinition.enable();
						}
						comboCodematfins.oldValue = record.json[0];
					}
				}
			});

			// On crée le panel qui va accueillir le nouveau doubleCombo
			var doubleComboPanel = new Ext.Panel({
				// column layout with 3 columns
				layout: 'column',
				id: formPrefix+'_doubleComboPanel_'+staticIndex,
				hidden: true,
				
				// defaults for columns
				defaults: {
					columnWidth: 0.45,
					layout: 'form',
					border: false,
					xtype: 'panel',
					bodyStyle: 'padding:0 18px 0 0'
				},
				items: [{
					// left column
					// defaults for fields
					defaults: {
						anchor: '100%'
					},
					items: [comboCodematfins]
				}, {
					// center column
					// defaults for fields
					defaults: {
						anchor: '100%'
					},
					items: [comboCodefinition]
				}, {
					// right column
					// defaults for fields
					defaults: {
						anchor: '100%'
					},
					columnWidth: 0.1,
					items: [new Ext.Button({
						cls: 'x-btn-icon',
						icon: 'js/mmwExtjs/images/delete.png',
						handler: function(){
							deleteDoubleComboPanel(formPanel, staticIndex);
						}
					})]
				}]
			});
			
			// On ajoute ensuite le panel qui accueille le doubleCombo dans le fieldset qui accueille tous les doubleCombo
			formPanel.doubleCombosFieldset.add(doubleComboPanel);
			
			// On crée un nouveau bouton d'ajout de relation
			formPanel.addRelationButton = new Ext.Button(cloneAddRelationButtonConfig);
			// Puis on l'ajoute à la fin du fieldset
            formPanel.doubleCombosFieldset.add(formPanel.addRelationButton);
			
			doubleComboPanel.show();
			// On effectue un nouveau layout sur le formulaire pour afficher le nouveau doubleCombo
			formPanel.doLayout();

			return staticIndex;
		};
	
		var deleteDoubleComboPanel = function(formPanel, index){
			formPanel.doubleCombosFieldset.remove(formPanel.doubleCombosFieldset.find('id', formPanel.sfObject.singularName+'_doubleComboPanel_'+index)[0]);
		};
		
		var deleteAllDoubleComboPanels = function(formPanel) {
			// On supprime tous les couples de champs (matfins, finition)
			if (formPanel.nbDoubleComboPanel != undefined) {
				for (var i = 1; i <= formPanel.nbDoubleComboPanel; i++) {
					deleteDoubleComboPanel(formPanel, (i-1));
				}
				formPanel.nbDoubleComboPanel = 0;
			}
		};
		
		var processMatfinsFinitionDoubleComboPanels = function(formPanel, result) {
			// On supprime d'abord tous les doubleCombos existants
			deleteAllDoubleComboPanels(formPanel);
			
			var data = result.data;
			// On parcourt chaque champ des données reçues par AJAX
			for (fieldname in data) {
				var fieldnameSplit = fieldname.split('__');
				
				// Si on tombe sur un couple de champs (matfins, finition)
				if ((fieldnameSplit[1] == 'codematfins') && fieldnameSplit[2] && data[fieldnameSplit[0]+'__codefinition__'+fieldnameSplit[2]]) {
					// On crée un nouveau doubleCombo qui va accueillir les données de ce couple
					var fieldIndex = addDoubleComboPanel(formPanel);
					var comboMatfins = formPanel.doubleCombosFieldset.find('itemId', fieldnameSplit[0]+'__'+fieldnameSplit[1]+'__'+fieldIndex)[0];
					var comboCodefinition = formPanel.doubleCombosFieldset.find('itemId', fieldnameSplit[0]+'__codefinition__'+fieldIndex)[0];
					
					// On filtre les données du combo de finitions à l'aide de la valeur du combo des matfins
					comboCodefinition.store.filterBy(finitionsFilter.createDelegate(comboCodefinition, data[comboMatfins.itemId], true));
					comboCodefinition.enable();
					
					comboMatfins.setValue(data[comboMatfins.itemId]);
					comboMatfins.oldValue = data[comboMatfins.itemId];
					
					comboCodefinition.setValue(data[comboCodefinition.itemId]);
				}
			}
		};

		var initMatfinsFinitionsDoubleComboPanelsForForm = function(formPanel) {
			// On définit le bouton d'ajout d'une nouvelle relation
			formPanel.addRelationButton = new Ext.Button({
				text: 'Nouveau matériau fin',
				handler: function() {
					addDoubleComboPanel(formPanel);
				}
			});
			
			// On initialise le fieldset qui va contenir les doubleCombos
			formPanel.doubleCombosFieldset = new Ext.form.FieldSet({
				columnWidth: 0.25,
				title: 'Matériaux Fins / Finitions',
		        autoHeight: true,
		        bodyStyle:	'padding: 5px 5px;',
		        border: true,
		        style: {"margin-left": "5px"}
			});
			
			// On ajoute le bouton d'ajout au fiedlset
			formPanel.doubleCombosFieldset.add(formPanel.addRelationButton);
			formPanel.doLayout();
			
			// Lorsque la fin du chargement du formulaire est atteinte, on ajoute les doubleCombos
            formPanel.getForm().on('actioncomplete', function(f, a){
				if (a.type == 'load') {
					processMatfinsFinitionDoubleComboPanels(formPanel, a.result);
				}
			});
			
			// Lorsque le formulaire est vidé (création d'un nouvel élément), on supprime tous les doubleCombos
			formPanel.getForm().on('blank', function(){
				deleteAllDoubleComboPanels(formPanel);
			});
		};

		var initMatfinsFinitionsDoubleComboPanels = function(formPanel) {
			if ((typeof(matFinsFinitionsRequestInitialized) != 'undefined') && (matFinsFinitionsRequestInitialized == true)) {
				initMatfinsFinitionsDoubleComboPanelsForForm(formPanel);
			}
			else {
				Ext.Ajax.request({
					url: 'matFinsFinitions/index',
					method: 'GET',
					async: false,
					success: function(a) {
						// On récupère la réponse AJAX
						var response = Ext.decode(a.responseText);
											
						// Puis on la "formatte"
						var dataForStores = mmw.util.formatRetrievedStoresData(response.list);
						
						if (Ext.isObject(dataForStores)) {
							// On définit ici les configs par défaut des champs matFins et finitions								
							matFinsStore = {
								fields: [mmw.baseSfBib_materiaux_finsObject.keyField, mmw.baseSfBib_materiaux_finsObject.displayField],
								data: dataForStores['matfins']
							};
							
							finitionsStore = {
								fields: [mmw.baseSfBib_finitionObject.keyField, mmw.baseSfBib_finitionObject.displayField, 'bib_finition__codematfinslist'],
								data: dataForStores['finitions']
							};
							
							matFinsFinitionsRequestInitialized = true;
							
							initMatfinsFinitionsDoubleComboPanelsForForm(formPanel);					
						}
					}
				});	
			}
		};
		/* FIN PARTIE MATFINS / FINITION */

        // tab gros oeuvre
        var structuresTab = new Ext.Panel({
            title: 'Gros Oeuvre',
            layout: 'fit',
            autoShow: true
        });
		
        structuresTab.on('beforeshow', function(){		
            var structuresFormPanel = new mmw.structuresGridFormPanel({
                height: 450,
                region: 'center',
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                },
                // afterLoadFunction overriden in order to reset the store on fld_so
                afterLoadFunction: function(result, formPanel){
	                // load the data in the form
	                // set the values only if the form is not a new form
	                // otherwise the danger is that empty values are set, causing the validation rules waking up
	                if (formPanel.ObjectId) {  
	                    
	                    fld_meo.store.clearFilter(); 
	                    formPanel.getForm().setValues(result.data);
	                    fld_meo.store.filterBy(meoeuvresFilter.createDelegate(this, fld_matge.value, true));
						
	                    formPanel.doLayout();
	                }
	            },
				personnalizedFieldsIds: ['structures__codematfins', 'structures__codefinition']
            });
            
            // ligne suivante est un hack, sinon, 2 bâtiment ouverts dans 2 onglets ont la même structure
            structuresFormPanel.grid.store.addFilter('indexbatiment', this.batimentId);	
		
			/* PARTIE MATFINS / FINITION */
			initMatfinsFinitionsDoubleComboPanels(structuresFormPanel);			
			/* FIN PARTIE MATFINS / FINITION */
	
			/* PARTIE MATGE / MEO */			
            var fld_matge = structuresFormPanel.items.items[1].find('itemId', 'structures__codematge')[0];
            var fld_meo = structuresFormPanel.items.items[1].find('itemId', 'structures__codemeo')[0];
			
            structuresFormPanel.getForm().on('actioncomplete', function(f, a){
                if (a.type == 'load') {	
		            if (fld_meo.storeChanged == undefined) {
		                fld_meo.store = new mmw.bib_meoeuvreStore({autoLoad: true});
		                fld_meo.storeChanged = true;
		            }
					
					if (fld_matge.value != null) {
						fld_meo.store.on('load', function() {
							// Le filtre doit être effectué au premier chargement des équipements
							fld_meo.store.filterBy(meoeuvresFilter.createDelegate(this, fld_matge.value, true));
						});
					}
					
					fld_matge.on('beforeselect', function(combo, record, i){		
						fld_meo.setRawValue('');
					}, structuresFormPanel);
					
					fld_matge.on('change', function(field, newValue, OldValue){
						fld_meo.store.clearFilter(true);	
						fld_meo.store.filterBy(meoeuvresFilter.createDelegate(this, newValue, true));
					}, structuresFormPanel);
					
                }
            }, structuresFormPanel, {single: true});
            /* FIN PARTIE MATGE / MEO */
			
			if(structuresFormPanel.hasCredential('save')) {
            	structuresFormPanel.addInsertButton();
            	structuresFormPanel.addDeleteButton();
            };
			
			// On finit par ajouter le fieldset qui va contenir les doubleCombos
			structuresFormPanel.add(structuresFormPanel.doubleCombosFieldset);
			
			structuresTab.add(structuresFormPanel);
        }, this);
		
        // adding gros oeuvre tab
        this.add(structuresTab);

        // tab second oeuvre
        var second_oeuvreTab = new Ext.Panel({
            title: 'Second Oeuvre',
            layout: 'fit',
            autoShow: true
        });

        second_oeuvreTab.on('beforeshow', function(){
            var second_oeuvreFormPanel = new mmw.second_oeuvreGridFormPanel({
                height: 450,
                region: 'center',
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                },
                
                // afterLoadFunction overriden in order to reset the store on fld_so
                afterLoadFunction: function(result, formPanel){
	                // load the data in the form
	                // set the values only if the form is not a new form
	                // otherwise the danger is that empty values are set, causing the validation rules waking up
	                if (formPanel.ObjectId) {  
	                    
	                    fld_so.store.clearFilter(); 
	                    formPanel.getForm().setValues(result.data);
	                    fld_so.store.filter('bib_so__codetypeso', fld_typeso.value);
						
	                    formPanel.doLayout();
	                }
	            },
				personnalizedFieldsIds: ['structures__codematfins', 'structures__codefinition']
            });
            
			/* PARTIE SECOND OEUVRES / CATEGORIES */
            var fld_typeso = second_oeuvreFormPanel.items.items[1].find('itemId', 'second_oeuvre__codetypeso')[0];
            var fld_so = second_oeuvreFormPanel.items.items[1].find('itemId', 'second_oeuvre__codeso')[0];
			
          	second_oeuvreFormPanel.getForm().on('actioncomplete', function(f, a){
				if(a.type == 'load') {
		            
		            if (fld_so.storeChanged == undefined) {
		                fld_so.store = new mmw.bib_soStore({autoLoad: true});
		                fld_so.storeChanged = true;
		            }
					
					if (fld_typeso.value != null) {
						fld_so.store.on('load', function() {
							// Le filtre doit être effectué au premier chargement des équipements
							fld_so.store.filter('bib_so__codetypeso', fld_typeso.value);
						});
					}
					
					fld_typeso.on('beforeselect', function(c, record, i){
						fld_so.setRawValue('');
					}, second_oeuvreFormPanel);
					
					fld_typeso.on('change', function(field, newValue, OldValue){
						fld_so.store.clearFilter(true);	
						fld_so.store.filter('bib_so__codetypeso', newValue);	
					}, second_oeuvreFormPanel);
					
                }
            }, second_oeuvreFormPanel, {single: true});
            /* FIN PARTIE SECOND OEUVRES / CATEGORIES */
			
			/* PARTIE MATFINS / FINITION */
			initMatfinsFinitionsDoubleComboPanels(second_oeuvreFormPanel);	
			/* FIN PARTIE MATFINS / FINITION */
			
			if(second_oeuvreFormPanel.hasCredential('save')) {
            	second_oeuvreFormPanel.addInsertButton();
            	second_oeuvreFormPanel.addDeleteButton();
            }
			// On finit par ajouter le fieldset qui va contenir les doubleCombos
			second_oeuvreFormPanel.add(second_oeuvreFormPanel.doubleCombosFieldset);
			
            second_oeuvreTab.add(second_oeuvreFormPanel);
        }, this);
        
        // adding second oeuvre tab
        this.add(second_oeuvreTab);

        // tab equipements interieurs
        var equipementsTab = new Ext.Panel({
            title: 'Equipements',
            layout: 'fit',
            autoShow: true
        });
		
        equipementsTab.on('beforeshow', function(){
            var equipementsEditorGridPanel = new mmw.equipementsEditorGridPanel({
				title: 'Equipements intérieurs',
                height: 450,
                region: 'center',
				personnalizedColumnsEditors: [
					{
						dataIndex: 'equipements__codeequipement',
						store: new Ext.data.ArrayStore({
							sfObject: mmw.baseSfBib_equipementObject,
							fields: [mmw.baseSfBib_equipementObject.keyField, mmw.baseSfBib_equipementObject.displayField, 'bib_equipement__codetypeequip']
						}),
						disabled: true
					}
				],
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                }
            });

			/* PARTIE EQUIPEMENTS / CATEGORIES */
			equipementsEditorGridPanel.editor.on('fieldsinitialized', function(editor, editorItems) {
				var fld_typeequip_index = editorItems.findIndex('itemId', 'equipements__codetypeequip');
	            var fld_equipement_index = editorItems.findIndex('itemId', 'equipements__codeequipement');
				
				if ((fld_typeequip_index != -1) && (fld_equipement_index != -1)) {
					var fld_typeequip = editorItems.get(fld_typeequip_index);
					var fld_equipement = editorItems.get(fld_equipement_index);

					// Le filtre doit être effectué au premier affichage
					editor.on('valuessetted', function(f, a){
						if (fld_typeequip.value != null) {
							// Le filtre doit être effectué au premier chargement des équipements
							if (typeof(fld_equipement.store.firstFilterInitialized) == 'undefined') {
								fld_equipement.store.filter('bib_equipement__codetypeequip', fld_typeequip.value);
								fld_equipement.enable();
								fld_equipement.store.firstFilterInitialized = true;
							}
						}
						
						this.oldTypeequipValue = fld_typeequip.value;
						// Le filtre doit être effectué lors de la sélection d'une nouvelle valeur de catégorie
						fld_typeequip.on('select', function(c, record, i){
							/*
							if (this.oldTypeequipValue != record.json.bib_type_equipement__codetypeequip) {
								fld_equipement.setRawValue('');
							}
							*/
							fld_equipement.setRawValue('');
							fld_equipement.store.filter('bib_equipement__codetypeequip', record.json[0]);
							fld_equipement.enable();
							this.oldTypeequipValue = record.json.bib_type_equipement__codetypeequip;
						}, editor);
						
						// A l'édition d'une autre ligne, on réinitialise l'affichage et on vide le filtre
						editor.on('beforeedit', function(){
							fld_equipement.store.clearFilter();
							fld_equipement.disable();
							fld_equipement.setRawValue('');
							fld_typeequip.setRawValue('');
						});
						
						// Après avoir vidé le filtre à l'édition d'une nouvelle ligne, on définit le nouveau filtre une fois que les valeurs ont été définies
						editor.on('valuessetted', function(){
							this.oldTypeequipValue = fld_typeequip.value;
							if (!Ext.isEmpty(fld_typeequip.value)) {
								fld_equipement.store.filter('bib_equipement__codetypeequip', fld_typeequip.value);
								fld_equipement.enable();
							}
						}, editor);
					}, editor, {single: true});
				}
			}, equipementsEditorGridPanel, {single: true});
            /* FIN PARTIE EQUIPEMENTS / CATEGORIES */
			
			if(equipementsEditorGridPanel.hasCredential('save')) {			
            	equipementsEditorGridPanel.addInsertButton();
            	equipementsEditorGridPanel.addDeleteButton();
            }

            equipementsTab.add(equipementsEditorGridPanel);
        }, this);

        // adding equipements interieurs tab
        this.add(equipementsTab);
        
        // tab éléments paysagers
        var elementsPaysagersTab = new Ext.Panel({
            title: 'Eléments paysagers',
            layout: 'fit',
            autoShow: true
        });
		
        elementsPaysagersTab.on('beforeshow', function(){			
            var elements_paysagersEditorGridPanel = new mmw.elements_paysagersEditorGridPanel({
				title: 'Eléments paysagers',
                height: 450,
                region: 'center',
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                }
            });
            
            if(elements_paysagersEditorGridPanel.hasCredential('save')) {
            	elements_paysagersEditorGridPanel.addInsertButton();
            	elements_paysagersEditorGridPanel.addDeleteButton();
            }
			
            elementsPaysagersTab.add(elements_paysagersEditorGridPanel);
        }, this);
		
		// adding éléments paysagers tab
        this.add(elementsPaysagersTab);
		
        // tab illustrations
        var illustrationTab = new Ext.Panel({
            title: 'Illustrations',
            layout: 'fit',
            autoShow: true
        });
        
        illustrationTab.on('beforeshow', function(){
            var illustrationFormPanel = new mmw.illustrationGridFormPanel({
                height: 450,
                region: 'center',
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                },
				overrideGridConfig: {
					personnalizedColumns: [
						{dataIndex:'illustration__list_thumb', renderer: function(id) { return '<a rel="lightbox" href="illustration/show?indexillustration=' + id + '"><img src="illustration/listThumb?indexillustration=' + id + '"></a>'; }}
					]
				},
				newLineFromForm: function(formValues) {
					formValues['illustration__list_thumb'] = formValues.illustration__indexilustration;
					mmw.illustrationGridFormPanel.superclass.newLineFromForm.call(this, formValues);
				},
				updateLineFromForm: function(formValues) {
					formValues['illustration__list_thumb'] = formValues.illustration__indexilustration;
					mmw.illustrationGridFormPanel.superclass.updateLineFromForm.call(this, formValues);
				},
				afterSubmitSuccess: function(form, a, isNew) {
					mmw.illustrationGridFormPanel.superclass.afterSubmitSuccess.call(this, form, a, isNew);
					
					updateBandeauIllustration();
				},
				afterDeleteSuccess: function() {					
					updateBandeauIllustration();
					
					mmw.illustrationGridFormPanel.superclass.afterDeleteSuccess.call(this);
				}
            });
			
			if(illustrationFormPanel.hasCredential('save')) {
            	illustrationFormPanel.addInsertButton();
            	illustrationFormPanel.addDeleteButton();
            }
			
            illustrationTab.add(illustrationFormPanel);

        }, this);
        
        // adding illustrations tab
        this.add(illustrationTab);
        
        // tab documents
        var documentTab = new Ext.Panel({
            title: 'Documents',
            layout: 'fit',
            autoShow: true
        });
        
        documentTab.on('beforeshow', function(){
            var documentFormPanel = new mmw.documentsGridFormPanel({
                height: 450,
                region: 'center',
                principalForeignKey: {
                    name: 'indexbatiment',
                    value: this.batimentId
                },
				overrideGridConfig: {
					personnalizedColumns: [
						{dataIndex:'documents__fichier_source', renderer: function(fichierSource) { return '<a href="../uploads/documents/' + fichierSource + '">' + fichierSource + '</a>'; }}
					]
				},
				newLineFromForm: function(formValues) {
					formValues['documents__list_link'] = formValues.documents__indexdocument;
					mmw.documentsGridFormPanel.superclass.newLineFromForm.call(this, formValues);
				},
				updateLineFromForm: function(formValues) {
					formValues['documents__list_link'] = formValues.documents__indexdocument;
					mmw.documentsGridFormPanel.superclass.updateLineFromForm.call(this, formValues);
				},
				afterSubmitSuccess: function(form, a, isNew) {
					mmw.documentsGridFormPanel.superclass.afterSubmitSuccess.call(this, form, a, isNew);
					
					//updateBandeauDocument();
				},
				afterDeleteSuccess: function() {					
					//updateBandeauDocument();
					
					mmw.documentsGridFormPanel.superclass.afterDeleteSuccess.call(this);
				}
            });
			
			if(documentFormPanel.hasCredential('save')) {
				documentFormPanel.addInsertButton();
				documentFormPanel.addDeleteButton();
            }
			
			documentTab.add(documentFormPanel);

        }, this);
        
        // adding documents tab
        this.add(documentTab);
        
		var remarquesFormPanel = new mmw.identificationFormPanel({
            ObjectId: batimentInfoTabs.batimentId,
            itemsListToLoad: 2
        });
		
		remarquesFormPanel.removeAll();
				
		remarquesFormPanel.add(new Ext.Panel({
			// column layout with 2 columns
			layout: 'column',
			autoScroll: true,
			
			// defaults for columns
			defaults: {
				columnWidth: 0.5,
				layout: 'form',
				border: false,
				xtype: 'panel',
				bodyStyle: 'padding:0 18px 0 0'
			},
			
			items: [{
				// left column
				defaults: {
					anchor: '100%'
				},
				items: [remarquesFormPanel.getItemsList(2)[0]]
			}, {
				// right column
				defaults: {
					anchor: '100%'
				},
				items: [remarquesFormPanel.getItemsList(2)[1],remarquesFormPanel.getItemsList(2)[2]]

			}]
		}));

//renseignementsFormPanel


        // tab remarques
        var remarquesTab = new Ext.Panel({
            title: 'Etat et perspectives',
            layout: 'fit',
			items: [remarquesFormPanel]
        });
		
        // add remarques tabs
        this.add(remarquesTab);
		
        if (!id) {
			this.items.each(this.desactivateTabsExceptFirst, this);
		}
    },
    
    desactivateTabsExceptFirst: function(item, index){
        if (index) {
            this.getItem(index).disable();
        }
    },
    
    activateTabs: function(item, index){
        this.getItem(index).enable();
    }
});

// content is the main object
var batiContentPanel = new Ext.TabPanel({
    region: 'center',
    width: '100%',
    activeTab: 0,
    frame: true,
    deferredRender: false,
    layoutOnTabChange: true,// super important pour charger
    enableTabScroll: true,
    
	defaults: {
        autoScroll: true,
        hideMode: 'offsets'
    },
	
	addBatiment: function(batimentId, batimentTitle) {
		batiContentPanel.add({
            itemId: 'batiment_' + batimentId,
            title: batimentTitle,
            closable: true,
            bodyStyle: 'padding:5px',
            layout: 'border',
            isNew: false,
            items: [new mmw.batimentPanel({
                itemId: 'batimentPanel_' + batimentId,
                batimentId: batimentId,
                region: 'center'
            })]
        }).show();
	},

	addNewBatiment: function() {
	    batiContentPanel.add({
	        title: "Nouveau Batiment",
	        closable: true,
	        bodyStyle: 'padding:5px',
	        layout: 'border',
	        isNew: true,
	        items: [new mmw.batimentPanel({
	            region: 'center',
	        })]
	    }).show();
	}
});

/*---- MODE PRODUCTION ----*/

// add batiment grid to panel	

batiContentPanel.add({
    id: 'Recherche',
    title: 'Bâtiments',
    layout: 'fit',
    items: [batimentGridPanel]
});

/*---- FIN MODE PRODUCTION ----*/

/*==== MODE DEBUG!! ====*/

//batiContentPanel.add({
//    id: 'batiment_1',
//    title: 'Batiment 1',
//    closable: true,
//    bodyStyle: 'padding:5px',
//    layout: 'border',
//    isNew: false,
//    items: [new mmw.batimentPanel({
//        id: 'batimentPanel_1',
//        batimentId: 1,
//        region: 'center'
//    })]
//}).show();

/*==== MODE DEBUG!! ====*/

/******************************************************************
 *                       PARTIE AFFICHAGE                         *
 ******************************************************************/
/*
 * Start the javascript
 */
Ext.onReady(function(){	
    // Need to intialize the tips. Otherwhise the tabs of tab panels does not close
    Ext.QuickTips.init();
	
	// header (bandeau)
	var headerMenu = new Ext.Panel({
		border: false,
		layout:'anchor',
		region:'north',
		cls: 'docs-header',
		height:60,

		items: [{
			xtype:'box',
			el: 'header',
			border: false,
			height: 60,
			//anchor: 'none -25'
			}
		]
	});
	
	globalContentPanel = new Ext.Panel({
		layout: 'fit',
		border: false,
		region:'center',
		
		items: [batiContentPanel]
	});
	
    new Ext.Viewport({
        layout: 'border',
        title: 'Parc des écrins',
        items: [headerMenu, globalContentPanel]
    });
});

/******************************************************************
 *                FONCTIONS APPELEES PAR LE MENU                  *
 ******************************************************************/
Ext.namespace('menu');

menu.showGestionBati = function() {
	if (batiContentPanel.hidden == true) {
		soContentPanel.hide();
		batiContentPanel.show();
	}
};

menu.showGestionSO = function() {
	if (soContentPanel.hidden == true) {
		batiContentPanel.hide();
		soContentPanel.show();
	}
};
