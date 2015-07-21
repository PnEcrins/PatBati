mmw.<?php echo $this->getSingularName() ?>GridFormPanel = Ext.extend(mmw.GridFormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('<?php echo $this->getSingularName() ?>GridFormPanel', 'GridFormPanel'),
	overrideGridConfig: {},
	
	initComponent: function() {
		var scope = this;
	
		this.sfObject = new mmw.sf<?php echo ucfirst($this->getSingularName()) ?>Object;
		
		this.overrideGridConfig['title'] = this.overrideGridConfig['title'] || this.getLl('GridTitle', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName)<?php echo (($gfGridTitle = $this->configuration->getListFormListTitle()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($gfGridTitle)) : ''; ?>);
		this.overrideGridConfig['height'] = this.overrideGridConfig['height'] || <?php echo $this->configuration->getListFormListHeight() ?>;
		this.overrideGridConfig['form'] = this.overrideGridConfig['form'] || this;
		
		this.grid = new mmw.<?php echo $this->getSingularName() ?>GridPanel(this.overrideGridConfig);
		
		this.fieldsetConfig = {
			columnWidth: <?php echo $this->configuration->getListFormFormWidth() ?>,
	        xtype: 'fieldset',
	        labelWidth: 90,
	        title: this.getLl('FormTitle', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName)<?php echo (($gfFormTitle = $this->configuration->getListFormFormTitle()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($gfFormTitle)) : ''; ?>),
	        defaultType: 'textfield',
	        autoHeight: true,
	        bodyStyle:	'padding:10px 15px;',
	        border: true,
	        style: {"margin-left": "10px"}
		};
		 
		Ext.apply(this, this.initialConfig, {
			frame: true,
		    layout: 'column',	
		    <?php if($this->isFileUpload()) echo 'fileUpload: true,' ?>	
		    items: [{
			        columnWidth: <?php echo $this->configuration->getListFormListWidth() ?>,
			        layout: 'fit',
			        items:[
			        	this.grid
			        ]
			    }],
			itemsLists: <?php echo $this->getFormFields() ?>
        });
        
        mmw.<?php echo $this->getSingularName() ?>GridFormPanel.superclass.initComponent.call(this);  
    }
});

<?php $display_field = $this->configuration->getDisplayField(); ?>

var humanName = '<?php echo strtolower(sfInflector::humanize($this->getSingularName())); ?>';
mmw.sf<?php echo ucfirst($this->getSingularName()) ?>Object = Ext.extend(mmw.sfObject, {
	url: '<?php echo $this->getModuleName() ?>',
	keyField : <?php echo sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), sfInflector::underscore($this->getPrimaryKey()), true); ?>,
<?php if (!empty($display_field)): ?>
	displayField: <?php echo sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $this->configuration->getDisplayField(), true); ?>,
<?php endif; ?>
	singularName: '<?php echo $this->getSingularName() ?>',
	humanName: humanName,
	upHumanName: mmw.util.ucfirst(humanName),
	pluralHumanName: humanName+'s',
	pluralUpHumanName: mmw.util.ucfirst(humanName)+'s',
});

mmw.baseSf<?php echo ucfirst($this->getSingularName()) ?>Object = new mmw.sf<?php echo ucfirst($this->getSingularName()) ?>Object;

mmw.<?php echo $this->getSingularName() ?>Store = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	mmw.<?php echo $this->getSingularName() ?>Store.superclass.constructor.call(this, Ext.apply({
		<?php if ((list($sortField, $sortOrder) = $this->getGridSorting()) != null): ?>
		retrieveDataMode: 'pager',
		sortInfo: {
		    field: '<?php echo $sortField ?>',
		    direction: '<?php echo $sortOrder ?>'
		},
		<?php endif; ?>
		sfObject: new mmw.sf<?php echo ucfirst($this->getSingularName()) ?>Object,
		fields: <?php echo $this->getStoreFields() ?> 
	}, c));
};

Ext.extend(mmw.<?php echo $this->getSingularName() ?>Store, mmw.Store);

mmw.<?php echo $this->getSingularName() ?>FormPanel = Ext.extend(mmw.FormPanel,{
	i18nNameSpace: mmw.i18nNameSpace('<?php echo $this->getSingularName() ?>FormPanel', 'FormPanel'),
	
	initComponent: function() {
		Ext.apply(this, this.initialConfig, {
            sfObject : new mmw.sf<?php echo ucfirst($this->getSingularName()) ?>Object,
			itemsLists: <?php echo $this->getFormFields() ?>,
            bodyStyle: 'padding: 10px',
            <?php if($this->isFileUpload()) echo 'fileUpload: true,' ?>
        });
		mmw.<?php echo $this->getSingularName() ?>FormPanel.superclass.initComponent.call(this);
    }
});

mmw.<?php echo $this->getSingularName() ?>GridFilters = function(c) {
	if (typeof(c) == 'undefined') {
		c = {};
	}
	
	var scope = this;
	Ext.Ajax.request({
		url: mmw.baseSf<?php echo ucfirst($this->getSingularName()) ?>Object.getActionUrl('loadFilters'),
		async: false,
		method: 'GET',
		waitMsg: 'Loading...',
		success: function(a) {
			var response = Ext.decode(a.responseText);
			scope.filtersData = response.list;
		},
		failure: Ext.emptyFn
	});
	
	mmw.<?php echo $this->getSingularName() ?>GridFilters.superclass.constructor.call(this, Ext.apply({
	    local: false,
		encode: true,
		paramPrefix: 'mmwExtJSFilters',
	    menuFilterText: mmw.getLl('GridFilters', 'menuFilterText', null, 'Filters'),
	    filters: <?php echo $this->getGridFilters(); ?>
	}, c));
};

Ext.extend(mmw.<?php echo $this->getSingularName() ?>GridFilters, Ext.ux.grid.GridFilters);

mmw.<?php echo $this->getSingularName() ?>GridPanel = Ext.extend(mmw.GridPanel,{
	i18nNameSpace: mmw.i18nNameSpace('<?php echo $this->getSingularName() ?>GridPanel', 'GridPanel'),
		
	initComponent: function() {
		<?php echo $this->configuration->haveToEnableListFilters() ? 'var gridFilters = new mmw.' . $this->getSingularName() . 'GridFilters();' : ''; ?>
		var store = new mmw.<?php echo $this->getSingularName() ?>Store();
		var scope = this;
		this.sfObject = mmw.baseSf<?php echo ucfirst($this->getSingularName()) ?>Object; 
        Ext.apply(this, this.initialConfig, {
        	title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName)<?php echo (($gridTitle = $this->configuration->getListTitle()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($gridTitle)) : ''; ?>),
			store: store,
			<?php echo $this->configuration->haveToEnableListFilters() ? 'plugins: [gridFilters],' : ''; ?>
			bbar: new Ext.PagingToolbar({
		        pageSize: <?php echo $this->configuration->getPagerMaxPerPage() ?>,
		        store: store,
				<?php echo $this->configuration->haveToEnableListFilters() ? 'plugins: [gridFilters],' : ''; ?>
		        displayInfo: true,
				displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')<?php echo (($pagerCaption = $this->configuration->getListPagerCaption()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($pagerCaption . ' {0} to {1} of {2}')) : ''; ?>), 
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}')<?php echo (($pagerEmptyCaption = $this->configuration->getListPagerEmptyCaption()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($pagerEmptyCaption)) : ''; ?>)
		    }),
			columns: <?php echo $this->getGridColumns() ?>
        });
        mmw.<?php echo $this->getSingularName() ?>GridPanel.superclass.initComponent.call(this);
    }
});

mmw.<?php echo $this->getSingularName() ?>EditorGridPanel = Ext.extend(mmw.EditorGridPanel, {
	i18nNameSpace: mmw.i18nNameSpace('<?php echo $this->getSingularName() ?>EditorGridPanel', 'EditorGridPanel'),
	
	initComponent: function() {
		var store = new mmw.<?php echo $this->getSingularName() ?>Store({editorGrid: true});
		var scope = this;
		this.sfObject = new mmw.sf<?php echo ucfirst($this->getSingularName()) ?>Object;
		Ext.apply(this, this.initialConfig, {
			title: this.getLl('Title', new Array(this.sfObject.pluralHumanName, this.sfObject.pluralUpHumanName)<?php echo (($gridTitle = $this->configuration->getListTitle()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($gridTitle)) : ''; ?>),
			line: Ext.data.Record.create([{}]),
			store: store,
			bbar: new Ext.PagingToolbar({
		        pageSize: 15,
		        store: store,
		        displayInfo: true,
		        displayMsg: this.getLl('PagerDisplayMsg', new Array(scope.sfObject.pluralHumanName, scope.sfObject.pluralUpHumanName, '{0}', '{1}', '{2}')<?php echo (($pagerCaption = $this->configuration->getListPagerCaption()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($pagerCaption . ' {0} to {1} of {2}')) : ''; ?>),
		        emptyMsg: this.getLl('PagerEmptyMsg', new Array(scope.sfObject.humanName, scope.sfObject.upHumanName, '{0}', '{1}', '{2}')<?php echo (($pagerEmptyCaption = $this->configuration->getListPagerEmptyCaption()) != null) ? ', ' . sfMmwExtjsUtil::addQuote(addslashes($pagerEmptyCaption)) : ''; ?>)
		    }),
			columns: <?php echo $this->getGridColumns(true) ?>
		});
		mmw.<?php echo $this->getSingularName() ?>EditorGridPanel.superclass.initComponent.call(this);
	}
});