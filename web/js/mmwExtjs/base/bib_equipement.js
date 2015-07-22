mmw.bib_equipementGridFormPanel = Ext.extend(mmw.GridFormPanel, {
  i18nNameSpace : mmw.i18nNameSpace('bib_equipementGridFormPanel', 'GridFormPanel'),
  overrideGridConfig : {},

  initComponent : function() {
    var scope = this;

    this.sfObject = new mmw.sfBib_equipementObject;

    this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName));
    this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || 299;
    this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;

    this.grid = new mmw.bib_equipementGridPanel(this.overrideGridConfig);

    this.fieldsetConfig = {
      columnWidth : 0.66,
      xtype : 'fieldset',
      labelWidth : 90,
      title : this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName), 'Édition d\'un équipement'),
      defaultType : 'textfield',
      autoHeight : true,
      bodyStyle : 'padding:10px 15px;',
      border : true,
      style : {
        "margin-left" : "10px"
      }
    };

    Ext.apply(this, this.initialConfig, {
      frame : true,
      layout : 'column',
      items : [{
        columnWidth : 0.33,
        layout : 'fit',
        items : [this.grid]
      }],
      itemsLists : [[{
        name : 'bib_equipement__codeequipement',
        fieldLabel : mmw.getI18nLabel('bib_equipement__codeequipement', 'Codeequipement'),
        width : 250,
        itemId : 'bib_equipement__codeequipement',
        allowBlank : true,
        xtype : 'hidden'
      }, {
        name : 'bib_equipement__equipement',
        fieldLabel : mmw.getI18nLabel('bib_equipement__equipement', 'Equipement'),
        width : 250,
        itemId : 'bib_equipement__equipement',
        allowBlank : true,
        maxLength : 50,
        xtype : 'textfield'
      }, {
        name : 'bib_equipement__codetypeequip--name',
        fieldLabel : mmw.getI18nLabel('bib_equipement__codetypeequip', 'Catégorie'),
        width : 250,
        itemId : 'bib_equipement__codetypeequip',
        allowBlank : false,
        xtype : 'combo',
        store : new Ext.data.ArrayStore({
          sfObject : mmw.baseSfBib_type_equipementObject,
          fields : [mmw.baseSfBib_type_equipementObject.keyField, mmw.baseSfBib_type_equipementObject.displayField]
        }),
        sfDatabaseMode : true,
        mode : 'local',
        hiddenName : 'bib_equipement__codetypeequip',
        displayField : mmw.baseSfBib_type_equipementObject.displayField,
        valueField : mmw.baseSfBib_type_equipementObject.keyField,
        triggerAction : 'all',
        lastQuery : ''
      }]]
    });

    mmw.bib_equipementGridFormPanel.superclass.initComponent.call(this);
  }
});

var humanName = 'bib equipement';
mmw.sfBib_equipementObject = Ext.extend(mmw.sfObject, {
  url : 'bib_equipement',
  keyField : 'bib_equipement__codeequipement',
  displayField : 'bib_equipement__equipement',
  singularName : 'bib_equipement',
  humanName : humanName,
  upHumanName : mmw.util.ucfirst(humanName),
  pluralHumanName : humanName + 's',
  pluralUpHumanName : mmw.util.ucfirst(humanName) + 's',
});

mmw.baseSfBib_equipementObject = new mmw.sfBib_equipementObject;

mmw.bib_equipementStore = function(c) {
  if ( typeof (c) == 'undefined') {
    c = {};
  }
  mmw.bib_equipementStore.superclass.constructor.call(this, Ext.apply({
    sfObject : new mmw.sfBib_equipementObject,
    fields : ['bib_equipement__codeequipement', 'bib_equipement__equipement', 'bib_equipement__codetypeequip', 'bib_equipement__typeequip', 'bib_equipement__codetypeequip']
  }, c));
};

Ext.extend(mmw.bib_equipementStore, mmw.Store);

mmw.bib_equipementFormPanel = Ext.extend(mmw.FormPanel, {
  i18nNameSpace : mmw.i18nNameSpace('bib_equipementFormPanel', 'FormPanel'),

  initComponent : function() {
    Ext.apply(this, this.initialConfig, {
      sfObject : new mmw.sfBib_equipementObject,
      itemsLists : [[{
        name : 'bib_equipement__codeequipement',
        fieldLabel : mmw.getI18nLabel('bib_equipement__codeequipement', 'Codeequipement'),
        width : 250,
        itemId : 'bib_equipement__codeequipement',
        allowBlank : true,
        xtype : 'hidden'
      }, {
        name : 'bib_equipement__equipement',
        fieldLabel : mmw.getI18nLabel('bib_equipement__equipement', 'Equipement'),
        width : 250,
        itemId : 'bib_equipement__equipement',
        allowBlank : true,
        maxLength : 50,
        xtype : 'textfield'
      }, {
        name : 'bib_equipement__codetypeequip--name',
        fieldLabel : mmw.getI18nLabel('bib_equipement__codetypeequip', 'Catégorie'),
        width : 250,
        itemId : 'bib_equipement__codetypeequip',
        allowBlank : false,
        xtype : 'combo',
        store : new Ext.data.ArrayStore({
          sfObject : mmw.baseSfBib_type_equipementObject,
          fields : [mmw.baseSfBib_type_equipementObject.keyField, mmw.baseSfBib_type_equipementObject.displayField]
        }),
        sfDatabaseMode : true,
        mode : 'local',
        hiddenName : 'bib_equipement__codetypeequip',
        displayField : mmw.baseSfBib_type_equipementObject.displayField,
        valueField : mmw.baseSfBib_type_equipementObject.keyField,
        triggerAction : 'all',
        lastQuery : ''
      }]],
      bodyStyle : 'padding: 10px',
    });
    mmw.bib_equipementFormPanel.superclass.initComponent.call(this);
  }
});

mmw.bib_equipementGridFilters = function(c) {
  if ( typeof (c) == 'undefined') {
    c = {};
  }

  var scope = this;
  Ext.Ajax.request({
    url : mmw.baseSfBib_equipementObject.getActionUrl('loadFilters'),
    async : false,
    method : 'GET',
    waitMsg : 'Loading...',
    success : function(a) {
      var response = Ext.decode(a.responseText);
      scope.filtersData = response.list;
    },
    failure : Ext.emptyFn
  });

  mmw.bib_equipementGridFilters.superclass.constructor.call(this, Ext.apply({
    local : false,
    encode : true,
    paramPrefix : 'mmwExtJSFilters',
    menuFilterText : mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
    filters : [{
      dataIndex : 'bib_equipement__codeequipement',
      type : 'string',
      disabled : true
    }, {
      dataIndex : 'bib_equipement__equipement',
      type : 'string'
    }, {
      dataIndex : 'bib_equipement__typeequip',
      type : 'string'
    }, {
      dataIndex : 'bib_equipement__codetypeequip',
      options : Ext.decode(this.filtersData['bib_equipement__codetypeequip']),
      type : 'list'
    }]
  }, c));
};

Ext.extend(mmw.bib_equipementGridFilters, Ext.ux.grid.GridFilters);

mmw.bib_equipementGridPanel = Ext.extend(mmw.GridPanel, {
  i18nNameSpace : mmw.i18nNameSpace('bib_equipementGridPanel', 'GridPanel'),

  initComponent : function() {
    var store = new mmw.bib_equipementStore();
    var scope = this;
    this.sfObject = mmw.baseSfBib_equipementObject;
    Ext.apply(this, this.initialConfig, {
      title : this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName)),
      store : store,
      bbar : new Ext.PagingToolbar({
        pageSize : 20,
        store : store,
        displayInfo : true,
        displayMsg : this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')),
        emptyMsg : this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
      }),
      columns : [{
        header : mmw.getI18nColumnHeader('bib_equipement__codeequipement', 'N°'),
        hidden : 1,
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__codeequipement'
      }, {
        header : mmw.getI18nColumnHeader('bib_equipement__equipement', 'Equipement'),
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__equipement'
      }, {
        header : mmw.getI18nColumnHeader('bib_equipement__codetypeequip', 'Code catégorie'),
        hidden : 1,
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__codetypeequip'
      }, {
        header : mmw.getI18nColumnHeader('bib_equipement__typeequip', 'Catégorie'),
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__typeequip'
      }]
    });
    mmw.bib_equipementGridPanel.superclass.initComponent.call(this);
  }
});

mmw.bib_equipementEditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
  i18nNameSpace : mmw.i18nNameSpace('bib_equipementEditorGridPanel', 'EditorGridPanel'),

  initComponent : function() {
    var store = new mmw.bib_equipementStore({
      editorGrid : true
    });
    var scope = this;
    this.sfObject = new mmw.sfBib_equipementObject;
    Ext.apply(this, this.initialConfig, {
      title : this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName)),
      line : Ext.data.Record.create([{}]),
      store : store,
      bbar : new Ext.PagingToolbar({
        pageSize : 15,
        store : store,
        displayInfo : true,
        displayMsg : this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')),
        emptyMsg : this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}'))
      }),
      columns : [{
        header : mmw.getI18nColumnHeader('bib_equipement__codeequipement', 'Codeequipement'),
        hidden : 1,
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__codeequipement',
        editor : {
          itemId : 'bib_equipement__codeequipement',
          allowBlank : true,
          xtype : 'hidden'
        }
      }, {
        header : mmw.getI18nColumnHeader('bib_equipement__equipement', 'Equipement'),
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__equipement',
        editor : {
          itemId : 'bib_equipement__equipement',
          allowBlank : true,
          maxLength : 50,
          xtype : 'textfield'
        }
      }, {
        header : mmw.getI18nColumnHeader('bib_equipement__typeequip', 'Catégorie'),
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__typeequip',
        editor : {
          itemId : 'bib_equipement__typeequip',
          allowBlank : true,
          maxLength : 50,
          xtype : 'textfield'
        }
      }, {
        header : mmw.getI18nColumnHeader('bib_equipement__codetypeequip', 'Code catégorie'),
        width : 75,
        sortable : true,
        dataIndex : 'bib_equipement__codetypeequip',
        editor : {
          itemId : 'bib_equipement__codetypeequip',
          allowBlank : false,
          xtype : 'combo',
          store : new Ext.data.ArrayStore({
            sfObject : mmw.baseSfBib_type_equipementObject,
            fields : [mmw.baseSfBib_type_equipementObject.keyField, mmw.baseSfBib_type_equipementObject.displayField]
          }),
          sfDatabaseMode : true,
          displayField : mmw.baseSfBib_type_equipementObject.displayField,
          valueField : mmw.baseSfBib_type_equipementObject.keyField,
          triggerAction : 'all',
          lastQuery : ''
        },
        renderer : function(value, metaData, record, rowIndex, colIndex) {
          return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value);
        }
      }]
    });
    mmw.bib_equipementEditorGridPanel.superclass.initComponent.call(this);
  }
});
