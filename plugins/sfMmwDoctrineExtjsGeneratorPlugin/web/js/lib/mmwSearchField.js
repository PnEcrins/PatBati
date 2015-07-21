mmw.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
	i18nNameSpace: mmw.i18nNameSpace('SearchField'),
	
    initComponent : function(){
        Ext.apply(this, this.initialConfig, {
			searchFieldName: '',
			grid: this.ownerCt,
			selectOnFocus: true,
		    validationEvent: false,
		    validateOnBlur: false,
		    trigger1Class: 'x-form-clear-trigger',
		    trigger2Class: this.initialConfig.minChars ? 'x-hidden' : 'x-form-search-trigger',
		    hideTrigger1: true,
		    width: 180,
		    hasSearch: false
		});
		
		mmw.SearchField.superclass.initComponent.call(this);
		
        this.on('specialkey', function(f, e) {
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },

    getLl: function(i18nKey, replacementValues, otherText){
        return mmw.getLl(this.i18nNameSpace, i18nKey, replacementValues, otherText);
    },

	// Clear method
    onTrigger1Click : function() {
        if(this.hasSearch){
            this.el.dom.value = '';
            this.grid.getStore().removeFilter(this.searchFieldName + '__text');
            this.grid.getStore().reload();
            this.triggers[0].hide();
            this.hasSearch = false;
        }
    },

	// Filter method
    onTrigger2Click : function() {
        var value = this.getRawValue();
		
		// If value is empty, we clear the search
        if(value.length < 1){
            this.onTrigger1Click();
            return;
        }
		
        this.grid.getStore().addFilter(this.searchFieldName + '__text', value);
        this.grid.getStore().reload();
        this.hasSearch = true;
        this.triggers[0].show();
    },
	
	onKeyUp: function(){
		var length = this.getValue().toString().length;
		
		// If the value is bigger than the minimum size, or if the value is empty
		if (0 === length || length >= this.minChars) {
			this.onTrigger2Click();
		}
	},
	
	listeners: {
		afterRender: function() {
			this.el.dom.qtip = this.minChars ? this.getLl('minCharsTipText', [this.minChars]) : this.getLl('standardTipText');
			
			if(this.minChars) {
				this.el.on({scope:this, buffer:300, keyup:this.onKeyUp});
			}
		}
	}
});