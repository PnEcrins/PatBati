/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.form.mmwFileUploadField = Ext.extend(Ext.form.TextField,  {
	i18nNameSpace: mmw.i18nNameSpace('FileUpload'),
    /**
     * @cfg {String} buttonText The button text to display on the upload button (defaults to
     * 'Browse...').  Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text
     * value will be used instead if available.
     */
    buttonText: 'Browse...',
    /**
     * @cfg {Boolean} buttonOnly True to display the file upload field as a button with no visible
     * text field (defaults to false).  If true, all inherited TextField members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonOffset The number of pixels of space reserved between the button and the text field
     * (defaults to 3).  Note that this only applies if {@link #buttonOnly} = false.
     */
    buttonOffset: 3,
    /**
     * @cfg {Object} buttonCfg A standard {@link Ext.Button} config object.
     */

    // private
    readOnly: true,
    
    /**
     * @hide 
     * @method autoSize
     */
    autoSize: Ext.emptyFn,
    
    // private
    initComponent: function(){
        Ext.form.mmwFileUploadField.superclass.initComponent.call(this);
        
        this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.form.mmwFileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected'
        );
    },
    
	getLl: function(i18nKey, replacementValues, otherText) {
		return mmw.getLl(this.i18nNameSpace, i18nKey, replacementValues, otherText);
	},
	
    // private
    onRender : function(ct, position){
        Ext.form.mmwFileUploadField.superclass.onRender.call(this, ct, position);
        
        var parentForm = new Ext.Element(this.el.findParent('form'));
        
        parentForm.on('submit', function() {
        	this.fileField.setValue('');
			this.fileField.fileInput.dom.value = '';
        });
        
        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});
        this.el.addClass('x-form-file-text');
        this.el.dom.removeAttribute('name');

		this.checkBox = ct.createChild({
         	tag: 'div',
			children:[{
				tag:'p',
				id: this.name+'-fileName',
				html:'fichier: '
			}]
         });
        
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-file',
            tag: 'input', 
            type: 'file',
            size: 1
        });

		// add hidden field
		// when the parent form change the value, this value displayed on the "-fileName" tag
		this.hiddenField = this.ownerCt.add({
			xtype:'hidden',
			name:this.name+'_hidden',
			fileField: this
		});
		// when the form change the value of the hidden field,
		// this values is displayed
		this.hiddenField.setValue = function(value) {
			this.fileField.setDisplayFileValue(value);
			this.fileField.uncheckCheckBox();
			this.fileField.setValue('');
//			this.fileField.fileInput.dom.value = '';
        };
        
        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
            text: this.buttonText
        });
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
			text: '...',
            cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')
        }));
        
        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());
        }
        
        this.fileInput.on('change', function(){
            var v = this.fileInput.dom.value;
            this.setValue(v);
            this.hiddenField.setValue(v);
            this.fireEvent('fileselected', this, v);
        }, this);
        
        // add a listener to the form 

    },
    
    // private
    getFileInputId: function(){
        return this.id+'-file';
    },
    
    // private
    onResize : function(w, h){
        Ext.form.mmwFileUploadField.superclass.onResize.call(this, w, h);
        
        this.wrap.setWidth(w);
        
        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },
    
    // private
    preFocus : Ext.emptyFn,
    
    // private
    getResizeEl : function(){
        return this.wrap;
    },

    // private
    getPositionEl : function(){
        return this.wrap;
    },

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    },
    
    setDisplayFileValue: function(value) {    	
    	this.checkBox.child('#'+this.name+'-fileName').update('fichier: '+value);
    },

    uncheckCheckBox: function() {    	
    	//this.checkBox.child('#'+this.name+'-delete').dom.checked = false;
    }

});
Ext.reg('mmwFileUploadField', Ext.form.mmwFileUploadField);