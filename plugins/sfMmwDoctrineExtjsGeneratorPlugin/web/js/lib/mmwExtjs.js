Ext.namespace('mmw');
Ext.namespace('mmw.util');

var appCredentials = null;
Ext.apply(mmw, {
    getAndSetCredentials: function() {
      Ext.Ajax.request({
        async : false,
        url : './credentials',
        success : function(response) {
          var x = Ext.decode(response.responseText);
          appCredentials = x.credentials;
        },
        failure : function(e) {
          console.warn('failure in getAndSetCredentials %o',e);
        }
      });
    },
    
    hasCredential: function(credential) {
      if (appCredentials === null) {
        mmw.getAndSetCredentials();
      }
      return appCredentials[credential];

    }
});


Ext.override(Ext.form.Action.Load, {
    success: function(response){
        var result = this.processResponse(response);
        if (result === true || !result.success || !result.data) {
            this.failureType = Ext.form.Action.LOAD_FAILURE;
            this.form.afterAction(this, false);
            return;
        }
        
        this.form.afterAction(this, true);
    }
});

// Symfony errors processing
Ext.lib.Ajax.onStatus([401], function() {
	mmw.showAuthenticationBox();
});

/******************
 * FUNCTIONS LIST *
 ******************/
mmw.showAuthenticationBox = function() {
	document.location.href = './login';
	
	/*************
	 * LOGIN BOX *
	 *************/
//	// create the window on the first method call and reuse on subsequent method calls
//	if (!mmw.loginWindow) {
//		mmw.loginForm = new Ext.FormPanel({
//			labelWidth: 75,
//			url: 'sfGuardAuth/signin',
//			frame: true,
//			bodyStyle: 'padding:5px 5px 0',
//			defaults: {
//				width: 230
//			},
//			defaultType: 'textfield',
//			
//			items: [{
//				fieldLabel: mmw.getI18nLabel('MmwLoginUsername'),
//				name: 'signin[username]',
//				allowBlank: false
//			}, {
//				fieldLabel: mmw.getI18nLabel('MmwLoginPassword'),
//				name: 'signin[password]',
//				allowBlank: false
//			}, {
//				name: 'signin[remember]',
//				fieldLabel: mmw.getI18nLabel('MmwLoginRemember'),
//				allowBlank: true,
//				xtype: 'checkbox'
//			}]
//		});
//		
//		mmw.loginForm.getForm().on('actioncomplete', function(f, a) {
//			console.log(a);
//		})
//		
//		mmw.loginWindow = new Ext.Window({
//			//		applyTo: 'mmw-login-window',
//			title: mmw.getI18nGeneral('LoginWindowTitle'),
//			layout: 'fit',
//			width: 500,
//			height: 300,
//			closeAction: 'hide',
//			plain: true,
//			modal: true,
//			
//			items: mmw.loginForm,
//			
//			buttons: [{
//				text: 'Submit',
//				handler: function(){
//					mmw.loginForm.getForm().submit({
//						success: function(form, action) {
//							mmw.loginWindow.hide();
//					    },
//					});
//				}
//			}]
//		});
//	}
//	
//	mmw.loginWindow.show();
};

mmw.errorlog = function(error_msg, error_lvl) {
    if ((typeof(mmw_debug_mode) == 'undefined') || !((mmw_debug_mode == true) || (mmw_debug_mode == 1) || (mmw_debug_mode == 'on'))) {
        return;
    }
    
    var pre_msg = '';
    switch (error_lvl) {
        case 1:
            pre_msg = 'Error: ';
            break;
        case 2:
        default:
            pre_msg = 'Warning: ';
            break;
		case 3: 
			pre_msg = 'Debug: ';
			break;
    }
    
    if (Ext.isArray(error_msg) || Ext.isObject(error_msg)) {
        var completeMsg = 'List:';
    }
    else {
        var completeMsg = pre_msg + error_msg;
    }
    
    // If firebug is activated
    if (typeof(window['console']) != 'undefined') {
        if (Ext.isArray(error_msg) || Ext.isObject(error_msg)) {
            console.dir(error_msg);
        }
    }
    // Else, we drop an alert
    else {
        alert(completeMsg);
    }
};

mmw.i18nNameSpace = function(nameSpace, inheritance) {
	if (!(Ext.isObject(mmw.i18nNameSpacesInheritances))) {
		mmw.i18nNameSpacesInheritances = {};
	}
	
	mmw.i18nNameSpacesInheritances[nameSpace] = inheritance || false;
	
	return nameSpace;
};

mmw.getLl = function(nameSpace, i18nKey, replacementValues, otherText, inheritanceFirst){
    var text = '';
	
    if (mmw.i18nCustomLocalLanguage && Ext.isObject(mmw.i18nCustomLocalLanguage) && Ext.isObject(mmw.i18nCustomLocalLanguage[nameSpace]) && (Ext.isEmpty(mmw.i18nCustomLocalLanguage[nameSpace][i18nKey]) == false)) {
        text = mmw.i18nCustomLocalLanguage[nameSpace][i18nKey];
    }
	// Si on doit prendre en compte l'héritage en priorité sur le otherText, on ne prend pas en compte tout de suite le otherText
    else if (!(inheritanceFirst && ((inheritanceFirst == true) || (inheritanceFirst == 1))) && Ext.isEmpty(otherText) == false) {
        text = otherText;
    }
    else if (mmw.i18nLocalLanguage && Ext.isObject(mmw.i18nLocalLanguage) && Ext.isObject(mmw.i18nLocalLanguage[nameSpace]) && (Ext.isEmpty(mmw.i18nLocalLanguage[nameSpace][i18nKey]) == false)) {
        text = mmw.i18nLocalLanguage[nameSpace][i18nKey];
    }
    else if (mmw.i18nDefaultLanguage && Ext.isObject(mmw.i18nDefaultLanguage) && Ext.isObject(mmw.i18nDefaultLanguage[nameSpace]) && (Ext.isEmpty(mmw.i18nDefaultLanguage[nameSpace][i18nKey]) == false)) {
        text = mmw.i18nDefaultLanguage[nameSpace][i18nKey];
    }
	// Si ce nameSpace hérite d'un autre nameSpace
	else if ((Ext.isEmpty(mmw.i18nNameSpacesInheritances) == false) && mmw.i18nNameSpacesInheritances[nameSpace] && (mmw.i18nNameSpacesInheritances[nameSpace] != false)) {
		// Si on doit prendre en compte l'héritage en priorité, et qu'il existe un héritage après le prochain niveau d'héritage, le prochain niveau doit aussi être setté en inheritanceFirst
		if (inheritanceFirst && ((inheritanceFirst == true) || (inheritanceFirst == 1))
			&& mmw.i18nNameSpacesInheritances[mmw.i18nNameSpacesInheritances[nameSpace]] && (mmw.i18nNameSpacesInheritances[mmw.i18nNameSpacesInheritances[nameSpace]] != false)) {
			var nextInheritanceFirst = true;
		}
		else {
			var nextInheritanceFirst = false;
		}
		return mmw.getLl(mmw.i18nNameSpacesInheritances[nameSpace], i18nKey, replacementValues, otherText, nextInheritanceFirst);
	}
    else {
        mmw.errorlog('No default i18n array has been found for i18nKey "' + i18nKey + '" in the nameSpace "' + nameSpace + '"', 1);
        return i18nKey;
    }
    
    if (Ext.isArray(replacementValues)) {
        for (var key in replacementValues) {
            var reg = new RegExp("(%" + key + "%)", 'g');
            text = text.replace(reg, replacementValues[key]);
        }
    }
    
    return text;
};

mmw.getI18nLabel = function(fieldName, fieldLabel, replacementValues) {
    return mmw.getLl('FieldsLabels', fieldName, replacementValues, (typeof(fieldLabel) != 'undefined') ? fieldLabel : null);
};

mmw.getI18nColumnHeader = function(columnName, columnHeader) {
    return mmw.getLl('ColumnsHeaders', columnName, new Array(), (typeof(columnHeader) != 'undefined') ? columnHeader : null, true);
};

mmw.getI18nGeneral = function(i18nKey, otherText) {
    return mmw.getLl('GeneralText', i18nKey, new Array(), otherText);
};
/*************************
 * END OF FUNCTIONS LIST *
 *************************/

/*****************************
 * CLASSES UTILITY FUNCTIONS *
 *****************************/
mmw.util.ucfirst = function(str) {
    if (Ext.isString(str) && str.length > 0) {
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }
    
    return str;
};

mmw.util.in_array = function(needle, collection, strict){
    if (Ext.isArray(collection)) {
		if (strict == null) {
	        strict = false;
	    }
	    
	    var i = collection.length - 1;
	    
	    if (i >= 0) {
	    
	        do {
	            if (collection[i] == needle) {
	            
	                if (strict && typeof(collection[i]) != typeof(needle)) {
	                    continue;
	                }
	                
	                return true;
	            }
	        }
	        while (i--);
	    }	
	}
    
    return false;
};

mmw.util.formatRetrievedStoresData = function(storesData){
    var formattedData = {};

    for (var fieldname in storesData) {
        var i = 0;
        formattedData[fieldname] = [];
        for (var key in (storesData[fieldname])) {
			if (!Ext.isFunction(storesData[fieldname][key])) {
				// Format objet: {nom_champ1: valeur_champ1, nom_champ2: valeur_champ2, ...}
				if (Ext.isObject(storesData[fieldname][key])) {
					var values = new Array();
					// On parcourt chaque objet pour en traiter les valeurs
					for (key2 in storesData[fieldname][key]) {
						 values.push(storesData[fieldname][key][key2]);
					}
					formattedData[fieldname][i++] = values;
				}
				// Format valeur_champ1 => valeur_champ2
				else {
					formattedData[fieldname][i++] = [key, storesData[fieldname][key]];
				}
			}
        }
    }
    return formattedData;
};

mmw.util.getRecordDisplayFieldValue = function(gridPanel, colIndex, id){ 
	var colId = gridPanel.getColumnModel().getColumnId(colIndex);
	
	if (typeof(colId) == 'undefined') {
		return id;
	}
	
	var column = gridPanel.getColumnModel().getColumnById(colId);

	var index = column.getEditor().getStore().find(column.getEditor().getStore().sfObject.keyField, id);
    
    return (index != "-1") ? column.getEditor().getStore().getAt(index).get(column.getEditor().getStore().sfObject.displayField) : id;
};
/************************************
 * END OF CLASSES UTILITY FUNCTIONS *
 ************************************/

/* Setting defaults */
mmw.i18nNameSpace('GeneralText');
mmw.i18nNameSpace('FieldsLabels');
mmw.i18nNameSpace('ColumnsHeaders', 'FieldsLabels');

// Images paths declarations
var trueImg = 'js/mmwExtjs/images/yes.png';
var falseImg = 'js/mmwExtjs/images/no.png';
/* End of setting defaults */

Ext.form.VTypes["num"] = function(v){
    return /^[0-9]+$/.test(v);
};

Ext.onReady(function() {
	Ext.form.VTypes["numText"] = mmw.getI18nGeneral('VTypeNumText');
});

mmw.sfObject = function(){
};

mmw.sfObject.prototype = {
	getEditUrl: function(id) {
		return this.url + '/' + id + '/edit';
	},
	getNewUrl: function() {
		return this.url + '/new';
	},
	getUpdateUrl: function(id) {
		return this.url + '/' + id;
	},
	getCreateUrl: function() {
		return this.url + '/create';
	},
	getDeleteUrl: function(id) {
		return this.url + '/' + id;
	},
	getListUrl: function() {
		return this.url;
	},
	getLoadStoresUrl: function() {
		return this.url + '/loadStores';
	},
	getLoadFiltersUrl: function() {
		return this.url + '/loadFilters';
	},
	
    getActionUrl: function(type, id){
        var url = '';
        switch (type) {
            case 'edit':
                url = this.getEditUrl(id);
                break;
            case 'new':
                url = this.getNewUrl();
                break;
            case 'update':
                url = this.getUpdateUrl(id);
                break;
            case 'create':
                url = this.getCreateUrl();
                break;
            case 'delete':
                url = this.getDeleteUrl(id);
                break;
            case 'list':
                url = this.getListUrl();
                break;
			case 'loadStores':
				url = this.getLoadStoresUrl();
				break;
			case 'loadFilters':
				url = this.getLoadFiltersUrl();
				break;
            default:
                mmw.errorlog('invalid type for getActionUrl:' + type, 2);
        }
        return url;
    },
    
    getActionParams: function(type){
        var params = {};
        switch (type) {
            case 'edit':
                params = {
                    sf_method: 'GET'
                };
                break;
            case 'new':
                params = {
                    sf_method: 'GET'
                };
                break;
            case 'update':
                params = {
                    cmd: 'submit',
                    sf_method: 'put'
                };
                break;
            case 'create':
                params = {
                    cmd: 'submit'
                };
                break;
            case 'delete':
                params = {
                    sf_method: 'delete'
                };
                break;
            case 'list':
                params = {
                    sf_method: 'GET'
                };
                break;
			case 'loadStores':
				params = {
                    method: 'GET'
                };
				break;
            default:
                mmw.errorlog('invalid type for getActionParams', 2);
        }
        return params;
    },
    
    getKeyField: function(){
        return this.name + '__' + this.keyField;
    },
};

/*
 * Basic mmw Form Panel Class
 */
mmw.FormPanel = Ext.extend(Ext.FormPanel, {
	i18nNameSpace: mmw.i18nNameSpace('FormPanel'),
	
    initComponent: function(){
        Ext.apply(this, this.initialConfig, {
            frame: true,
            autoScroll:true,
            height: '100%',
            itemsListToLoad: 0,
 
            buttons: [new Ext.Button({
                text: this.getLl('SaveButtonText'),
                scope: this,
//                autoShow: true,
                hidden: false,
                formBind: true,
                handler: this.doSubmit
            })],
		
			beforeSetStoresAndValuesFunction: function(result, formPanel){
                // add fields to the form is action.addFields.params is defined in the json response
                if (result.action && result.action.addFields) {
                    // We browse the lists of fields to add
                    for (var key in result.action.addFields) {
                        if (result.action.addFields[key].list) {
                            var fieldsToAdd = Ext.decode(result.action.addFields[key].list);
                            
                            var container = formPanel;
                            if (result.action.addFields[key].containerId) {
                                // We try to find the container by the given id
                                var findRes = formPanel.find('itemId', result.action.addFields[key].containerId);
								
                                if (findRes.length > 0) {
                                    var container = findRes[0];
                                }
                            }
							
                            // We add the fields
                            if (container.add) {
                                container.add(fieldsToAdd);
                            }
                            else 
                                if ((container.xtype == "radiogroup") || (container.xtype == "checkboxgroup")) {
                                    var column = container.panel.getComponent(0);
                                    
                                    for (var key in fieldsToAdd) {
                                        if (Ext.isFunction(fieldsToAdd[key]) == false) {
                                            var field = column.add(fieldsToAdd[key]);
                                            container.items.add(field);
                                        }
                                    }
                                }
                        }
                    }
                    formPanel.doLayout();
                }
            },
			
            afterLoadFunction: function(result, formPanel){
                // load the data in the form
                // set the values only if the form is not a new form
                // otherwise the danger is that empty values are set, causing the validation rules waking up
                if (formPanel.ObjectId) {           	
                    formPanel.getForm().setValues(result.data);
					
                    formPanel.doLayout();
                }
            }
        });

		this.processPersonnalizedFields();

        this.addFieldsInItems(this.getFieldsFromList());

        mmw.FormPanel.superclass.initComponent.call(this);
    },
    
    getLl: function(i18nKey, replacementValues, otherText){
        return mmw.getLl(this.i18nNameSpace, i18nKey, replacementValues, otherText);
    },
    
    // load data in form in according to the row selected in the grid
    retrieveDataAndLoad: function(id) {
		if (!id) {
			var id = this.ObjectId;
		}
		
        var form = this.getForm();
        var actionUrl = '';
        var scope = this;
        //var data;
        
        if (id) {
            actionUrl = this.sfObject.getActionUrl('edit', id);
        }
        else {
            actionUrl = this.sfObject.getActionUrl('new');
        }
        
        form.params = form.baseParams || {};
		
        if (!this.storesLoaded) {
            form.params['loadStores'] = true;
        }
        else {
            form.params['loadStores'] = false;
        }
        
        form.load({
            url: actionUrl,
            method: 'GET',
            waitMsg: this.getLl('LoadingMsg'),
            params: form.params,
            success: function(f, a){
				saveButton = scope.buttons[0];            
                scope.formProcessLoad(a.result, scope); 
                
                // set credentials
                scope.credentials = a.result.credentials;  
                
                if(!mmw.hasCredential('save')) {
					saveButton.hide();
					scope.doLayout();
				};
            }
        });
    },
	formProcessLoad: function(result, scope) {
		// If a function is passed in parameter, we execute it
        if (Ext.isFunction(this.beforeSetStoresAndValuesFunction)) {
            this.beforeSetStoresAndValuesFunction(result, scope);
        }

        // If the stores aren't loaded, we load it
        if (!scope.storesLoaded) {
            scope.setFieldsStores(mmw.util.formatRetrievedStoresData(result.list));
            scope.storesLoaded = true;
        }

        scope.form.clearInvalid();
        var data = result.data;
        var pFKey = scope.getPrincipalForeignKey();
        if (pFKey != null) {
            if (!data[pFKey.completeName] || (data[pFKey.completeName] && (data[pFKey.completeName] == null))) {
                data[pFKey.completeName] = pFKey.value;
            }
        }
		
		    scope.enable();
		    if(!mmw.hasCredential('save')){
          Ext.each(scope.findByType('field'), function(item){
            item.disable();
            if(Ext.isFunction(item.setHideTrigger)){
              item.setHideTrigger(true);
            }
            
            if(item.button && Ext.isFunction(item.button.hide)){
              item.button.hide();
            }
          });
        }

        // If a function is passed in parameter, we execute it
        if (Ext.isFunction(this.afterLoadFunction)) {
            this.afterLoadFunction(result, scope);
        }
		
        scope.fireEvent('afterload', result);
	},
	
    addFieldsInItems: function(fields) {
        this.items = fields;
    },
    
    getFieldsFromList: function() {
        var fields = this.getItemsListToLoad();

        var pFKey = this.getPrincipalForeignKey();

        var foundPFKey = false;
        var items = [];

       	result = this.browseFields(fields, items, pFKey, foundPFKey);
		
		items = result[0];
		foundPFKey = result[1];

        if ((pFKey != null) && (foundPFKey != true)) {
            mmw.errorlog('The chosen principal foreign key ("'+pFKey.name+'") doesn\'t exists in the chosen items list (for the form of the class ' + this.sfObject.singularName + ').', 2);
        }
		
        return items;
    },
	
	// private
	browseFields: function(fields, items, pFKey, foundPFKey, fieldsetMode) {
		for (var key in fields) {
			if (!Ext.isFunction(fields[key])) {
				// Si on tombe sur un fieldset
				if (fields[key].xtype == 'fieldset') {
					var fieldsetConfig = fields[key];
					
					// On récupère tous les champs qui sont à l'intérieur et on les traite pour vérifier si la principalForeignKey n'y est pas
					var temp = this.browseFields(fields[key].items, [], pFKey, foundPFKey, true);
					
					// Puis on remplace les items du fieldset par les champs qu'on a traité
					fieldsetConfig.items = temp[0];
					
					foundPFKey = temp[1];

					var result = this.processField(fieldsetConfig, items, pFKey, foundPFKey);
				}
				else {
		            var result = this.processField(fields[key], items, pFKey, foundPFKey, fieldsetMode);
				}
				
	            items = result[0];
                foundPFKey = result[1];
			}
        }
		
		return [items, foundPFKey];
	},
    
	// private
	processPersonnalizedFields: function() {
		if (typeof(this.personnalizedFields) != 'undefined') {
			// Si le paramètre de config personnalizedFields n'est pas un tableau associatif, il contient les champs à surcharger de l'itemsList associée à l'objet FormPanel
			if (Ext.isArray(this.personnalizedFields)) {
				var temp = this.personnalizedFields;
				this.personnalizedFields = {};
				this.personnalizedFields[this.itemsListToLoad] = temp;
			}
			
			// On parcourt les différentes itemsLists à surcharger du FormPanel
			for (var itemsListIndex in this.personnalizedFields) {
				// Si la surcharge de l'itemslist n'est pas un tableau de champ, elle ne contient qu'un champ à surcharger 
				if (!Ext.isArray(this.personnalizedFields[itemsListIndex])) {
					this.personnalizedFields[itemsListIndex] = new Array(this.personnalizedFields[itemsListIndex]);
				}
				
				// On parcourt les différents champs définis pour la surcharge dans l'itemsList parcourue
				for (var key in this.personnalizedFields[itemsListIndex]) {
					// Tests de validité des configurations de champs surchargés
					if (!Ext.isFunction(this.personnalizedFields[itemsListIndex][key])) {
						if (Ext.isObject(this.personnalizedFields[itemsListIndex][key])) {
							if (typeof(this.personnalizedFields[itemsListIndex][key].itemId) != 'undefined') {
								var itemsList = this.getItemsList(itemsListIndex);

								// On parcourt les différents champs de l'itemsList du FormPanel que l'on souhaite surcharger
								var fieldtoOverride = this.browsePersonnalizedFields(this.personnalizedFields[itemsListIndex][key], itemsList);
								
								// Si le champ n'a pas été trouvé dans l'itemsList, on le crée
								if (typeof(fieldtoOverride) == 'undefined') {
									itemsList.push(this.personnalizedFields[itemsListIndex][key]);
								}
								else {
									delete (this.personnalizedFields[itemsListIndex][key]['itemId']);
									for (var configOption in this.personnalizedFields[itemsListIndex][key]) {
										if ((configOption == 'xtype') && (this.personnalizedFields[itemsListIndex][key][configOption] != 'combo')
											&& (fieldtoOverride.xtype == 'combo') && (typeof(this.personnalizedFields[itemsListIndex][key].name) == 'undefined')) {
											fieldtoOverride['name'] = fieldtoOverride.hiddenName;
										}
										
										fieldtoOverride[configOption] = this.personnalizedFields[itemsListIndex][key][configOption];
									}
								}
							}
							else {
								mmw.errorlog('A field to override hasn\'t a itemId in the itemsList ' + itemsListIndex + '.', 2);
							}
						}
						else {
							mmw.errorlog('A field to override hasn\'t been defined correctly in the itemsList ' + itemsListIndex + ' (it\'s not a javascript object).', 2);
						}
					}
				}
			}
		}	
	},
	
	// private
	browsePersonnalizedFields: function(fieldToFind, items) {
		for (var key in items) {
			if (!Ext.isFunction(items[key])) {
				
				if (fieldToFind.itemId == items[key].itemId) {
					return items[key];
				}
				
				else if (items[key].xtype == 'fieldset') {
					var result = this.browsePersonnalizedFields(fieldToFind, items[key].items);
					if (typeof(result) != 'undefined') {
						return result;
					}
				}
				
			}
		}
	},
	
    // private
    processField: function(field, items, pFKey, foundPFKey, fieldsetMode){
        if (Ext.isFunction(field) == false) {
			if ((typeof(fieldsetMode) == 'undefined') || (fieldsetMode != true)) {
				var fieldsetMode = false;
			}

            if ((pFKey != null) && (field.itemId == pFKey.completeName)) {
                foundPFKey = true;

                var pFKConfig = {
                    name: field.itemId,
                    xtype: 'hidden',
                    value: pFKey.value,
                    itemId: field.itemId,
                    displayField: field.displayField,
					
                };
				
				if (fieldsetMode) {
					items.push(pFKConfig);
				}
				else {
					items.push(new Ext.form.Hidden(pFKConfig));
				}
            }
            else {				
				if (fieldsetMode) {
					items.push(field);
				}
				else {
					items.push(Ext.ComponentMgr.create(field, this.defaultType));
				}
            }
        }
        
        return [items, foundPFKey];
    },
    
    setFieldsStores: function(dataForStores){
        var fields = {};
        if (this.fieldsetConfig) {
            fields = this.fieldsetConfig.items;
        }
        else {
            fields = this.items.items;
        }
        
        for (var key in dataForStores) {
            var field = this.getForm().findField(key);
            if (field && (typeof(field.store) != 'undefined')) {
				if (typeof(field.sfDatabaseMode) != 'undefined' && field.sfDatabaseMode == true) {
					field.store.loadData(dataForStores[field.itemId]);
				}
				else {
	                field.store = new Ext.data.ArrayStore({
	                    sfObject: this.sfObject,
	                    fields: [field.valueField, field.displayField],
	                    data: dataForStores[field.itemId]
	                });
				}

                if (field.xtype == 'mmwItemSelector') {
                    field.setValue('');
                }
            }
        }
        
    },
    
    getItemsList: function(itemsListToRetrieve){
        if (!this.itemsLists) {
            mmw.errorlog('No items List is defined for the form of the class ' + this.sfObject.singularName + '.', 1);
            return [];
        }
        else 
            if (!this.itemsLists[itemsListToRetrieve]) {
                mmw.errorlog('The selected items list (index: ' + this.itemsListToLoad + ') to load doesn\'t exists  (for the form of the class ' + this.sfObject.singularName + ').', 2);
                return [];
            }
        return this.itemsLists[itemsListToRetrieve];
    },
    
    getItemsListToLoad: function(){
        return this.getItemsList(this.itemsListToLoad);
    },
    
    //private
    browseFieldsIdsInItemsList: function(itemsListToBrowse, fieldsIds){
        for (var key in itemsListToBrowse) {
			if (mmw.util.in_array(itemsListToBrowse[key].itemId, this.fieldsToPostBlacklist)) {
				mmw.errorlog('The field "'+itemsListToBrowse[key].itemId+'" has been placed in black list.', 3);
			}
			else {
				switch (itemsListToBrowse[key].xtype) {
					case "fieldset":
						fieldsIds = this.browseFieldsIdsInItemsList(itemsListToBrowse[key].items, fieldsIds);
						fieldsIds.push(itemsListToBrowse[key].itemId);
						break;
					case "mmwFileUploadField":
					case "checkbox":
						fieldsIds.push(itemsListToBrowse[key].itemId);				
						break;
				}
			}
        }
        return fieldsIds;
    },
    
    getFieldsIds: function(){
        var fieldsList = this.getForm().getValues();
        
        var fieldsIds = new Array();
        for (var key in fieldsList) {
			if (!mmw.util.in_array(fieldsList[key].itemId, this.fieldsToPostBlacklist)) {
				fieldsIds.push(key);
			}
        }
        
        var itemsList = this.getItemsListToLoad();
        
        fieldsIds = this.browseFieldsIdsInItemsList(itemsList, fieldsIds);
        
        for (var key in this.personnalizedFieldsIds) {
			if (!mmw.util.in_array(this.personnalizedFieldsIds[key].itemId, this.fieldsToPostBlacklist)) {
				fieldsIds.push(this.personnalizedFieldsIds[key]);
			}
        }
        
        return fieldsIds;
    },
    
    addPersonnalizedFieldsIds: function(fields_ids){
        if (this.personnalizedFieldsIds == undefined) {
            this.personnalizedFieldsIds = [];
        }
        
        if (Ext.isArray(fields_ids) == false) {
            fields_ids = [field_ids];
        }
        
        for (var key in fields_ids) {
            if (Ext.isString(fields_ids[key])) {
                this.personnalizedFieldsIds.push(fields_ids[key]);
            }
        }
    },
    
    getPrincipalForeignKey: function(){
        if (this.principalForeignKey) {
            if (!this.principalForeignKey.name || !this.principalForeignKey.value) {
//                mmw.errorlog('The setted principal foreign key is not defined correctly (for the form of the class ' + this.sfObject.singularName + ').', 2);
                return null;
            }
            if (!this.principalForeignKey.completeName) {
                this.principalForeignKey.completeName = this.getFieldCompleteName(this.principalForeignKey.name);
            }
            
            return this.principalForeignKey;
        }
        return null;
    },

    setPrincipalForeignKeyValue: function(value){
        var pFKey = this.getPrincipalForeignKey();
        if (pFKey != null) {
            if (typeof(value) == 'undefined') {
                mmw.errorlog('The setted principal foreign key value is not correct (' + value + ').', 2);
                return null;
            }
			
            pFKey.value = value;
			
            this.principalForeignKey = pFKey;
			
			var pFKeyField = this.find('itemId', pFKey.completeName)[0];
			
			if (typeof(pFKeyField) != 'undefined') {
				// Hack: the originalValue is posted instead of the actual value in case of submitting after a first submit 
				pFKeyField.originalValue = pFKey.value;
				pFKeyField.setValue(pFKey.value);
			}
        }
    },

    getFieldCompleteName: function(fieldname){
        return this.sfObject.singularName + '__' + fieldname;
    },
    
    getFieldDisplayValueById: function(itemId, value){
        var field = this.find('itemId', itemId)[0];
        if (field == undefined) {
            return value;
        }
        
        if (field.getXType() != 'combo') {
            return value;
        }
        
        var record = field.findRecord(field.valueField, value);
        
        return record ? record.get(field.displayField) : value;
    },
    
    doSubmit: function(){
		var scope = this;
		var isNew = ((typeof(this.ObjectId) != 'undefined') && (this.ObjectId != null) && (this.ObjectId != 0) && (this.ObjectId != '')) ? false : true;
		var submitUrl = (isNew == false) ? this.sfObject.getActionUrl('update', this.ObjectId) : this.sfObject.getActionUrl('create');
		var paramsUrl = (isNew == false) ? this.sfObject.getActionParams('update') : this.sfObject.getActionParams('create');
		paramsUrl['fields'] = Ext.encode(this.getFieldsIds());
				
		this.getForm().submit({
			url: submitUrl,
			method: 'POST',
			params: paramsUrl,
			waitMsg: this.getLl('SaveWaitMsg'),
			
			success: function(f, a){
				scope.submitSucces(f, a, isNew);
			},
			
			failure: function(f, a){
				scope.submitFailure(f, a);
			}
		});
    },
    
    submitSucces: function(form, a, isNew){
        var data = a.result.data;
        
        if (data) {
            form.setValues(data);
            this.ObjectId = data[this.sfObject.keyField];
        }
        
        this.afterSubmitSuccess(form, a, isNew);
    },
    
    afterSubmitSuccess: function(form, a, isNew){
        return true;
    },
    
    submitFailure: function(form, a){
        if (a && a.result) {
			Ext.MessageBox.alert(this.getLl('SaveErrorTitle'), this.getLl('SaveErrorMsg'));
            
			mmw.errorlog(this.getLl('SaveErrorMsg'), 1);
            mmw.errorlog(a.result.errors, 1);
        }
        else {
			Ext.MessageBox.alert(this.getLl('SaveErrorTitle'), this.getLl('SaveFatalErrorMsg'));
            mmw.errorlog('An error has been returned by Symfony', 1);
        }
    },
    
    afterFailureSuccess: function(form, a){
        return true;
    },
    
    blankForm: function(){
        this.getForm().reset();
        if (this.ObjectId) {
            this.ObjectId = null;
        }
        this.getForm().fireEvent('blank');
    },
	
	forceStoreLoadingAtNextLoad: function() {
		this.storesLoaded = false;
	},
	
    listeners: {
        beforerender: function(){
            // The form is disabled until the end of the loading
            this.disable();
            this.retrieveDataAndLoad();
        }
    }
});

/*
 * Basic mmw Grid Panel Class
 */
mmw.GridPanel = Ext.extend(Ext.grid.GridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('GridPanel'),
	
    initComponent: function(){
        
		// Traitement de la principalForeignKey
        var pFKey = null;
        if (this.form) {
            pFKey = this.form.getPrincipalForeignKey();
        }
        else {
            pFKey = this.getPrincipalForeignKey();
        }
        if (pFKey != null) {
            this.getStore().addFilter(pFKey.name, pFKey.value);
            
            for (var key in this.columns) {
                if (this.columns[key].dataIndex == pFKey.completeName) {
                    this.columns[key].hidden = true;
                    //					var foundPFKey = true;
                    break;
                }
            }
            //
            //			if (!foundPFKey) {
            //				this.columns.push(new Ext.grid.Column({
            //					header:'Indexstructure',
            //					width:75,
            //					sortable:true,
            //					dataIndex:'structures__test'
            //				}));
            //			}
        }
        // Fin du traitement de la principalForeignKey
        
        Ext.apply(this, this.initialConfig, {
            viewConfig: {
                forceFit: true
            },
            insertHandler: this.newLine,
            frame: true,
            stripeRows: true,
            tbar: new Ext.Toolbar(),
            filter: '', // filter value
            
        });
		
        mmw.GridPanel.superclass.initComponent.call(this);
		
//		this.getStore().on('beforeload', function() {
//			this.disable();
//		}, this);
//		

//		this.getStore().on('load', function() {
//			this.enable();
//		}, this);
    },
    getLl: function(i18nKey, replacementValues, otherText){
        return mmw.getLl(this.i18nNameSpace, i18nKey, replacementValues, otherText);
    },
    
    addInsertButton: function(handler){
      if (! mmw.hasCredential('save')) {
        return;
      }
  
      var toolbar = this.getTopToolbar();
      if (!handler)
        var handler = this.insertHandler;
  
      toolbar.add({
        xtype : 'button',
        scope : this,
        text : this.getLl('NewButtonText'),
        handler : handler
      }); 
    },
    
    newLineFromForm: function(formValues, autoSelect){		
        var line = Ext.data.Record.create([{}]);
        var newLine = new line();
        
        var columns = this.getColumnModel().lookup;
        for (var key in columns) {
            if (formValues[columns[key].dataIndex]) {
                newLine.set(columns[key].dataIndex, formValues[columns[key].dataIndex]);
            }
        }
        
        this.store.insert(0, newLine);
		
		// par défaut, la sélection automatique de la nouvelle ligne est active
		if ((typeof(autoSelect) == 'undefined') || ((autoSelect != false) && (autoSelect != 0))) {
			this.getSelectionModel().selectRow(0);
		}
    },
    
    updateLineFromForm: function(formValues){
        var index = this.store.find(this.sfObject.keyField, formValues[this.sfObject.keyField]);
		
		if (index == -1) {
			this.newLineFromForm(formValues);
		}
		else {
			var line = this.store.getAt(index);
			
			var columns = this.getColumnModel().lookup;
			for (var key in columns) {
				if (formValues[columns[key].dataIndex]) {
					line.set(columns[key].dataIndex, formValues[columns[key].dataIndex]);
				}
			}
		}
    },

    addFilter: function(flt_fieldname){
        this.getTopToolbar().add({
			xtype: 'label',
			scope: this,
			text: this.getLl('SearchButtonText') + ' :',
			tooltip: this.getLl('SearchButtonTooltip')
		});
		
		this.searchField = new mmw.SearchField({
			searchFieldName: flt_fieldname,
			grid: this,
			minChars: 3
		});
		
		this.getTopToolbar().add(this.searchField);
    },

    addDeleteButton: function(handler){
      if (! mmw.hasCredential('save')) {
        return;
      }
      var toolbar = this.getTopToolbar();
      if (!handler) {
        handler = this.confirmDelete;
      }
  
      toolbar.add({
        xtype : 'button',
        scope : this,
        text : this.getLl('DeleteButtonText'),
        handler : handler
      }); 
    },
    
    confirmDelete: function(){
        var m = this.getSelectionModel().getSelected();
        
        if (m) {
        	Ext.MessageBox.confirm('Message', this.getLl('DeleteConfirmMsg2', new Array(this.sfObject.humanName)), this.doDelete, this);

/*
            if (this.sfObject.displayField != undefined) {
                Ext.MessageBox.confirm('Message', this.getLl('DeleteConfirmMsg1', new Array(this.sfObject.humanName, m.get(this.sfObject.displayField))), this.doDelete, this);
            }
            else {
                Ext.MessageBox.confirm('Message', this.getLl('DeleteConfirmMsg2', new Array(this.sfObject.humanName)), this.doDelete, this);
            }
*/         
        }
        else {
            Ext.MessageBox.alert('Message', this.getLl('DeleteConfirmMsg3', new Array(this.sfObject.humanName)));
        }
    },
    
    doDelete: function(btn){
        if (btn == 'yes') {
            var r = this.getSelectionModel().getSelected();
            var ObjectId = r.get(this.sfObject.keyField);
            var scope = this;
            
            Ext.Ajax.request({
                url: this.sfObject.getActionUrl('delete', ObjectId),
                params: this.sfObject.getActionParams('delete'),
                success: function(result, request){
//					Ext.MessageBox.alert('Success', 'Delete OK'); //+ result.responseText
					scope.getStore().remove(r);
                    scope.fireEvent('delete');
                },
                failure: function(result, request){
                    Ext.MessageBox.alert(scope.getLl('DeleteErrorTitle'), scope.getLl('DeleteErrorMsg'));
                }
            });
        }
    },
    
	// from mmw.FormPanel
    getPrincipalForeignKey: function(){
        if (this.principalForeignKey) {
            if (!this.principalForeignKey.name || (this.principalForeignKey.value == undefined)) {
                mmw.errorlog('The setted principal foreign key is not defined correctly (for the form of the class ' + this.sfObject.singularName + ').', 2);
                return null;
            }
            if (!this.principalForeignKey.completeName) {
                this.principalForeignKey.completeName = this.getFieldCompleteName(this.principalForeignKey.name);
            }
            
            return this.principalForeignKey;
        }
        return null;
    },
	
	// from mmw.FormPanel
    getFieldCompleteName: function(fieldname){
        return this.sfObject.singularName + '__' + fieldname;
    },
	
    setPrincipalForeignKeyValue: function(value){
        var pFKey = this.getPrincipalForeignKey();
        if (pFKey != null) {
            if (typeof(value) == 'undefined') {
                mmw.errorlog('The setted principal foreign key value is not correct (' + value + ').', 2);
                return null;
            }
            
            pFKey.value = value;
            this.principalForeignKey = pFKey;
            this.getStore().addFilter(pFKey.name, pFKey.value);
        }
    },
		
    getRecordCheckboxDisplayImage: function(value){
        if ((value == true) || (value == 'true')) {
            return '<img src="' + trueImg + '">';
        }
        
        else 
            if ((value == false) || (value == 'false') || (typeof(value) == 'undefined')) {
                return '<img src="' + falseImg + '">';
            }
        
        return value;
    },
    
    getRecordCorrectDateFormat: function(date){
        var dateObject = Date.parseDate(date, 'Y-m-d');
        return (dateObject) ? dateObject.format(this.getLl('DateFormat')) : date;
    },
    
    listeners: {
		beforerender: function() {
			// TRAITEMENT DES personnalizedColumns
			var colModel = this.getColumnModel();
			if (typeof(this.personnalizedColumns) != 'undefined') {
				if (!(Ext.isArray(this.personnalizedColumns))) {
					this.personnalizedColumns = new Array(this.personnalizedColumns);
				}
				for (var key in this.personnalizedColumns) {
					if (!Ext.isFunction(this.personnalizedColumns[key])) {
						var colIndex = colModel.findColumnIndex(this.personnalizedColumns[key].dataIndex);
						if (colIndex != -1) {
							delete (this.personnalizedColumns[key]['dataIndex']);
							var column = colModel.getColumnById(colModel.getColumnId(colIndex));
							for (var configOption in this.personnalizedColumns[key]) {
								column[configOption] = this.personnalizedColumns[key][configOption];
							}
						}
					}
				}
			}
			// FIN TRAITEMENT DES personnalizedColumns
			
			if (typeof(this.beforerenderAfterExecFunc) == 'function') {
				var returnValue = this.beforerenderAfterExecFunc();
				
				if (returnValue != undefined) {
					return returnValue;
				}
			}
		},
		
        afterrender: function() {
			this.getStore().loadWithTrace();
            this.getStore().on('load', function(){
				if (typeof(this.getStore()) != 'undefined') {
					if (this.getStore().getCount() > 0) {
	                    this.getSelectionModel().selectFirstRow();                           
	                }
				}
            }, this);
			this.doLayout();
        },

		sortchange: function() {
      if (this.getStore().isLoaded && this.getBottomToolbar().getPageData().activePage !== 1) {
        this.getBottomToolbar().moveFirst();
      }
    }
  }
});

mmw.GridFormPanel = Ext.extend(mmw.FormPanel, {
	i18nNameSpace: mmw.i18nNameSpace('GridFormPanel', 'FormPanel'),
	
    initComponent: function(){
        Ext.apply(this, this.initialConfig, {
            insertHandler: this.blankForm,
            frame: true,
            itemsListToLoad: this.itemsListToLoad ? this.itemsListToLoad : 0
        });
        
        this.grid.getSelectionModel().on('rowselect', function(grid, rowIndex, e){
            var selection = this.grid.getSelectionModel().getSelected();
            var selectedId = selection.get(this.sfObject.keyField);
            this.ObjectId = selectedId;
            
            this.retrieveDataAndLoad();
        }, this);
        
        mmw.GridFormPanel.superclass.initComponent.call(this);
    },
    
    getLl: function(i18nKey, replacementValues, otherText){
        return mmw.getLl('GridFormPanel', i18nKey, replacementValues, otherText);
    },
    
    // Shortcut to this.grid.addInsertButton
    addInsertButton: function(handler){
      if (! mmw.hasCredential('save')) {
        return;
      }
      
      if (!handler) {
        var handler = this.insertHandler.createDelegate(this);
      }
  
      this.grid.addInsertButton(handler); 
    },
    
    // Shortcut to this.grid.addDeleteButton
    addDeleteButton: function(handler){
      if (! mmw.hasCredential('save')) {
        return;
      }
      if (handler) {
        this.grid.addDeleteButton(handler);
      } else {
        this.grid.addDeleteButton();
      }
  
      this.grid.on('delete', function() {
        this.afterDeleteSuccess(this.afterSubmitSuccess);
      }, this); 
    },

    afterDeleteSuccess: function(afterSubmitSuccess){
        this.blankForm();
        this.grid.getStore().reload();
    },
    
    blankForm: function(){
        this.grid.getSelectionModel().clearSelections();
        
        this.getForm().reset();
        if (this.ObjectId) {
            this.ObjectId = null;
        }
        this.getForm().fireEvent('blank');
    },
    
    // Shortcut to this.grid.newLineFromForm(formValues)
    newLineFromForm: function(formValues){
        if (formValues == undefined) {
            var formValues = this.getForm().getValues();
        }
        
        for (var key in formValues) {
            formValues[key] = this.getFieldDisplayValueById(key, formValues[key]);
        }
        
        this.grid.newLineFromForm(formValues);
    },
    
    // Shortcut to this.grid.updateLineFromForm(formValues)
    updateLineFromForm: function(formValues){
        if (formValues == undefined) {
            var formValues = this.getForm().getValues();
        }
        
        for (var key in formValues) {
            formValues[key] = this.getFieldDisplayValueById(key, formValues[key]);
        }
        
        this.grid.updateLineFromForm(formValues);
    },
    
	setPrincipalForeignKeyValue: function(value){
        var pFKey = this.getPrincipalForeignKey();
        if (pFKey != null) {
            if (typeof(value) == 'undefined') {
                mmw.errorlog('The setted principal foreign key value is not correct (' + value + ').', 2);
                return null;
            }
            
            pFKey.value = value;
            this.principalForeignKey = pFKey;
			this.getForm().setValues([{id: pFKey.completeName, value: pFKey.value}]);
			
			this.grid.setPrincipalForeignKeyValue(value);
        }
    },
	
    addFieldsInItems: function(fields){
        this.fieldsetConfig.items = fields;
        this.fieldset = new Ext.form.FieldSet(this.fieldsetConfig);
        this.items.push(this.fieldset);
    },
    
    afterSubmitSuccess: function(form, a, isNew) {
        if (isNew == true) {
            this.newLineFromForm(a.result.data);
        }
        else {
            this.updateLineFromForm(a.result.data);
        }
        
        return mmw.GridFormPanel.superclass.afterSubmitSuccess.call(form, a, isNew);
    },
    
	getGrid: function() {
		return this.grid;
	},
    listeners: {
        beforerender: function(){
            // The gridform is disabled until the end of the loading
            this.disable();
        },
        
        afterrender: function(){
            // activate the first selection only for the first no row has been previously selected
            // useful if the GridFormPanel is in a tabPanel because otherwise
            // the first row will be activated on each click on the tab panel
            this.grid.getStore().loadWithTrace();
            
            this.grid.getStore().on('load', function(){
                if (this.grid.getStore().getCount() == 0) {
                    this.retrieveDataAndLoad();
                }
            }, this);
        }
    },
});

mmw.EditorGridPanel = Ext.extend(mmw.GridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('EditorGridPanel', 'GridPanel'),
	
    initComponent: function(){
      this.editor = new mmw.grid.RowEditor({
        saveMode : 'remote'
      });
      var plugins = [];
      if (mmw.hasCredential('save')) {
        plugins.push(this.editor);
      }
      Ext.apply(this, this.initialConfig, {
        plugins : plugins,
        insertHandler : this.newLine
      });
  
      // Traitement de la principalForeignKey
      pFKey = this.getPrincipalForeignKey();
  
      if (pFKey != null) {
        for (var key in this.columns) {
          if ((this.columns[key].dataIndex == pFKey.completeName) && this.columns[key].editor) {
            this.columns[key].editor.allowBlank = true;
            //          var foundPFKey = true;
            break;
          }
        }
      }
      // Fin du traitement de la principalForeignKey
  
      mmw.EditorGridPanel.superclass.initComponent.call(this);
    },
    
    getLl: function(i18nKey, replacementValues, otherText){
        return mmw.getLl('EditorGridPanel', i18nKey, replacementValues, otherText);
    },
    
    newLine: function(){
        this.editor.stopEditing();
        var newRecord = new this.line;
        this.store.insert(0, newRecord);
        this.getView().refresh();
        this.getSelectionModel().selectRow(0);
		
        this.editor.on('canceledit', function(hasChange) {
	        this.store.remove(newRecord);
			this.store.reload();
		}, this, {
            single: true
        });
        
        this.editor.startEditing(0, true, true);
        this.fireEvent('newline');
    },

    // from mmw.FormPanel
    getFieldCompleteName: function(fieldname){
        return this.sfObject.singularName + '__' + fieldname;
    },

	loadStores: function() {
		var scope = this;
		Ext.Ajax.request({
			async: false,
			url: this.sfObject.getActionUrl('loadStores'),
			method: this.sfObject.getActionParams('loadStores').method,
			success: function(a) {
				var response = Ext.decode(a.responseText);
				
				if (Ext.isObject(response)) {
					var dataForStores = mmw.util.formatRetrievedStoresData(response.list);
					
		            var columns = scope.getColumnModel().getColumnsBy(function(c) {
		                if (typeof(c.getEditor) == 'undefined' || typeof(c.getEditor()) == 'undefined' || typeof(c.getEditor().getStore) == 'undefined') {
		                    return false;
		                }
						
		                return (typeof(c.getEditor().getStore()) != 'undefined') ? true : false;
		            });
					
					for (var key in columns) {
						if (typeof(dataForStores[columns[key].dataIndex]) != 'undefined') {
							columns[key].getEditor().getStore().loadData(dataForStores[columns[key].dataIndex]);
						}
					}
				}
			} 
//			failure: otherFn
		});
	},

	beforerenderAfterExecFunc: function() {
		var colModel = this.getColumnModel();
		
		// TRAITEMENT DES personnalizedColumnsEditors
		if (typeof(this.personnalizedColumnsEditors) != 'undefined') {
			if (!(Ext.isArray(this.personnalizedColumnsEditors))) {
				this.personnalizedColumnsEditors = new Array(this.personnalizedColumnsEditors);
			}
			for (var key in this.personnalizedColumnsEditors) {
				if (!Ext.isFunction(this.personnalizedColumnsEditors[key])) {
					var colIndex = colModel.findColumnIndex(this.personnalizedColumnsEditors[key].dataIndex);
					if (colIndex != -1) {
						// On supprime le champ dataIndex pour éviter de le traiter
						delete(this.personnalizedColumnsEditors[key]['dataIndex']);
						var column = colModel.getColumnById(colModel.getColumnId(colIndex));
						for (var configOption in this.personnalizedColumnsEditors[key]) {
							column.editor[configOption] = this.personnalizedColumnsEditors[key][configOption];
						}
					}
				}
			}
		}
		// FIN TRAITEMENT DES personnalizedColumnsEditors
		this.loadStores();
    }
});

mmw.Store = function(c){
	if (typeof(c) == 'undefined') {
		c = {};
	}

    this.sfFilters = [];
    this.isLoaded = false;

    mmw.Store.superclass.constructor.call(this, Ext.apply({
        proxy: new Ext.data.HttpProxy({
            url: c.sfObject.getActionUrl('list'),
            method: c.sfObject.getActionParams('list').sf_method
        }),
        root: 'data',
        totalProperty: 'count',
        remoteSort: true,

        addFilter: function(flt_fieldname, flt_value){
			this.setBaseParam('filters__' + this.sfObject.singularName + '__' + flt_fieldname, flt_value);			
        },

        getFilterValue: function(flt_fieldname){			
			return this.baseParams['filters__' + this.sfObject.singularName + '__' + flt_fieldname];			
        },

        removeFilter: function(flt_fieldname){
			for (var key in this.baseParams) {
				if (key.indexOf('filters__' + this.sfObject.singularName + '__' + flt_fieldname) == 0) {
					delete this.baseParams[key];
				}
				
				// Hack which permits to clear the search when pagination is active
				if (typeof(this.lastOptions.params) != 'undefined') {
					for (var key2 in this.lastOptions.params) {
						if (key2.indexOf('filters__' + this.sfObject.singularName + '__' + flt_fieldname) == 0) {
							delete this.lastOptions.params[key2];
						}
					}
				}
			}
        },
        
        removeAllFilters: function(){
			for (var key in this.baseParams) {
				delete this.baseParams[key];
			}
        },

        clearOldFilters: function(){
			// Hack which permits to clear the search when pagination is active			
			if (typeof(this.lastOptions.params) != 'undefined') {
				for (var key in this.lastOptions.params) {
					if (key.indexOf('filters__' + this.sfObject.singularName + '__') == 0) {
						delete this.lastOptions.params[key];
					}
				}
			}
        },

        loadWithTrace: function(){
            if (this.isLoaded == false) {
                this.load();
                this.isLoaded = true;
            }
        },

        listeners: {
            beforeload: function(store, options) {				
                if (this.editorGrid) {
                    this.setBaseParam('editorGrid', true);
                }
				
				if (this.retrieveDataMode == 'simple') {
					this.setBaseParam('dontUsePager', true);
				}
			},
			load: function() {
				this.clearOldFilters();
			}			
        }
    }, c));
};
Ext.extend(mmw.Store, Ext.data.JsonStore);
