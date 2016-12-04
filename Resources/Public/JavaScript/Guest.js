webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _guestFrameApi = __webpack_require__(461);
	
	var _guestFrameApi2 = _interopRequireDefault(_guestFrameApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.defineProperty(window, 'NeosCKEditorApi', {
	    value: _guestFrameApi2.default,
	    enumerable: false,
	    writable: false,
	    configurable: true
	});

/***/ },

/***/ 461:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var noop = {
	    initialize: function initialize() {},
	    toggleFormat: function toggleFormat() {},
	    createEditor: function createEditor() {}
	};
	
	var createCKEditorAPI = function createCKEditorAPI(CKEDITOR) {
	    if (!CKEDITOR) {
	        console.error('CKEditor not found!');
	
	        //
	        // Return noop to not break things
	        //
	        return noop;
	    }
	
	    // an object with the following keys:
	    // - globalRegistry
	    // - setFormattingUnderCursor
	    // - setCurrentlyEditedPropertyName
	    var editorConfig = null;
	    var currentEditor = null;
	
	    var handleUserInteractionCallbackFactory = function handleUserInteractionCallbackFactory(editor) {
	        return function () {
	            var formattingUnderCursor = {};
	            Object.keys(editorConfig.formattingRules).forEach(function (key) {
	                var formattingRule = editorConfig.formattingRules[key];
	
	                if (formattingRule.command !== undefined) {
	                    if (!editor.getCommand(formattingRule.command)) {
	                        formattingUnderCursor[key] = false;
	                        return;
	                    }
	
	                    formattingUnderCursor[key] = editor.getCommand(formattingRule.command).state;
	                    return;
	                }
	
	                if (formattingRule.style !== undefined) {
	                    if (!editor.elementPath()) {
	                        formattingUnderCursor[key] = false;
	                        return;
	                    }
	
	                    var style = new CKEDITOR.style(formattingRule.style); // eslint-disable-line babel/new-cap
	
	                    formattingUnderCursor[key] = style.checkActive(editor.elementPath(), editor);
	                    return;
	                }
	
	                throw new Error('\n                An error occured while checking a format in CK Editor.\n                The description parameter needs to either have a key "command" or\n                a key "style" - none of which could be found.\n            ');
	            });
	
	            editorConfig.setFormattingUnderCursor(formattingUnderCursor);
	        };
	    };
	
	    //
	    // Perform global initialization tasks
	    //
	    CKEDITOR.disableAutoInline = true;
	
	    //
	    // Workaround as per http://stackoverflow.com/questions/14575036/enable-ckeditor4-inline-on-span-and-other-inline-tags
	    // The issue won't be fixed, we have to live with this...
	    //
	    Object.assign(CKEDITOR.dtd.$editable, {
	        b: true,
	        big: true,
	        i: true,
	        small: true,
	        tt: true,
	        abbr: true,
	        acronym: true,
	        cite: true,
	        code: true,
	        dfn: true,
	        em: true,
	        kbd: true,
	        strong: true,
	        samp: true,
	        var: true,
	        a: true,
	        bdo: true,
	        img: true,
	        q: true,
	        span: true,
	        sub: true,
	        sup: true,
	        button: true,
	        label: true
	    });
	
	    // Public (singleton) API for CK editor
	    return {
	        initialize: function initialize(_editorConfig) {
	            editorConfig = _editorConfig;
	        },
	        toggleFormat: function toggleFormat(formatting) {
	            var formattingRule = editorConfig.formattingRules[formatting];
	            if (!formattingRule) {
	                console.warn('Formatting instruction ' + formatting + ' not found.');
	                return;
	            }
	            if (!currentEditor) {
	                console.warn('Current editor not found!');
	                return;
	            }
	            if (formattingRule.command !== undefined) {
	                if (!currentEditor.getCommand(formattingRule.command)) {
	                    console.warn('Command ' + currentEditor + ' not found.');
	                    return;
	                }
	
	                currentEditor.execCommand(formattingRule.command);
	                currentEditor.fire('change');
	                handleUserInteractionCallbackFactory(currentEditor)();
	                return;
	            }
	
	            if (formattingRule.style !== undefined) {
	                if (!currentEditor.elementPath()) {
	                    return;
	                }
	
	                var style = new CKEDITOR.style(formattingRule.style); // eslint-disable-line babel/new-cap
	                var operation = style.checkActive(currentEditor.elementPath(), currentEditor) ? 'removeStyle' : 'applyStyle';
	
	                currentEditor[operation](style);
	                currentEditor.fire('change');
	                handleUserInteractionCallbackFactory(currentEditor)();
	                return;
	            }
	
	            throw new Error('\n                An error occured while applying a format in CK Editor.\n                The description parameter needs to either have a key "command",\n                or "style" - none of which could be found.\n            ');
	        },
	        createEditor: function createEditor(dom, finalOptions, propertyName, onChange) {
	            dom.contentEditable = 'true';
	
	            var editor = CKEDITOR.inline(dom, finalOptions);
	
	            editor.on('loaded', function () {
	                if (editor.config.buttons) {
	                    editor.config.buttons.forEach(function (button) {
	                        // The next two lines actually do the ACF auto-configuration
	                        var editorFeature = editor.ui.create(button);
	                        editor.addFeature(editorFeature);
	                    });
	                }
	            });
	
	            var handleUserInteraction = handleUserInteractionCallbackFactory(editor);
	
	            editor.once('contentDom', function () {
	                editor.on('focus', function () {
	                    currentEditor = editor;
	                    editorConfig.setCurrentlyEditedPropertyName(propertyName);
	
	                    handleUserInteraction();
	                });
	
	                editor.on('selectionChange', function () {
	                    handleUserInteraction();
	                });
	
	                //
	                // TODO: This should be debounced!
	                //
	                editor.on('change', function () {
	                    onChange(editor.getData());
	                });
	            });
	        }
	    };
	};
	
	exports.default = createCKEditorAPI(window.CKEDITOR);

/***/ }

});
//# sourceMappingURL=Guest.js.map