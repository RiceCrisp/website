// Page builder toggle
if (jQuery('ul#sections > li').length) {
  jQuery('#postdivrich, #page-builder').toggle();
}
jQuery(document).on('click', '#page-builder-btn', function(e) {
  e.preventDefault();
  jQuery('#postdivrich, #page-builder').toggle();
  if (jQuery('#page-builder').is(':visible')) {
    jQuery('#page-builder-btn').html('<span class="dashicons dashicons-text"></span>Switch to Editor');
  } else {
    jQuery('#page-builder-btn').html('<span class="dashicons dashicons-hammer"></span>Switch to Page Builder');
  }
});
if (jQuery('#page-builder').is(':visible')) {
  jQuery('#postdivrich').before('<button id="page-builder-btn" class="button"><span class="dashicons dashicons-text"></span>Switch to Editor</button>');
} else {
  jQuery('#postdivrich').before('<button id="page-builder-btn" class="button"><span class="dashicons dashicons-hammer"></span>Switch to Page Builder</button>');
}

// Close lightbox if cancelled
jQuery(document).on('click', '.lightbox-cancel', function(e) {
  e.preventDefault();
  jQuery(this).parents('.lightbox').hide();
  jQuery(this).parents('.lightbox:not(#module-choices)').remove();
  jQuery('.module-choice button').unbind();
});
jQuery('#module-choices').css('display', 'flex').hide();

// Update sortable order (we add a tilde so that no fields share the same id at any single moment)
function updateOrder() {
  // Update sections
  var c = 0;
  jQuery('ul#sections > li').each(function(index) {
    // We want to remove wp.editor fields first before their ids change
    jQuery(this).find('.text-editor').each(function() {
      wp.editor.remove(this.id);
    });
    if (oldId = this.id) {
      jQuery(this).attr('id', oldId.replace(/\d+/g, '~'+index));
    }
    jQuery(this).find('.section-options input, .section-options select, .section-options label').each(function() {
      if (oldId = this.id) {
        jQuery(this).attr('id', oldId.replace(/\d+/g, '~'+index));
      }
      if (oldName = jQuery(this).attr('name')) {
        jQuery(this).attr('name', oldName.replace(/\d+/g, '~'+index));
      }
      if (oldFor = jQuery(this).attr('for')) {
        jQuery(this).attr('for', oldFor.replace(/\d+/g, '~'+index));
      }
    });
    // Update modules
    jQuery(this).find('.module').each(function(index2) {
      jQuery(this).find('input, textarea, select, label').each(function() {
        if (oldId = this.id) {
          c = 0;
          jQuery(this).attr('id', oldId.replace(/\d+/g, function(match) {
            c++;
            return c==1 ? '~'+index : c==2 ? '~'+index2 : '~'+match;
          }));
        }
        if (oldName = jQuery(this).attr('name')) {
          c = 0;
          jQuery(this).attr('name', oldName.replace(/\d+/g, function(match) {
            c++;
            return c==1 ? '~'+index : c==2 ? '~'+index2 : '~'+match;
          }));
        }
        if (oldFor = jQuery(this).attr('for')) {
          c = 0;
          jQuery(this).attr('for', oldFor.replace(/\d+/g, function(match) {
            c++;
            return c==1 ? '~'+index : c==2 ? '~'+index2 : '~'+match;
          }));
        }
      });
      jQuery(this).find('.media-selector').each(function() {
        if (oldTarget = jQuery(this).attr('target')) {
          c = 0;
          jQuery(this).attr('target', oldTarget.replace(/\d+/g, function(match) {
            c++;
            return c==1 ? '~'+index : c==2 ? '~'+index2 : '~'+match;
          }));
        }
      });
    });
  });
  // Remove all tildes
  jQuery('ul#sections > li').each(function(index) {
    if (oldId = this.id) {
      jQuery(this).attr('id', oldId.replace(/~/g, ''));
    }
    jQuery(this).find('.section-options input, .section-options select, .section-options label').each(function() {
      if (oldId = this.id) {
        jQuery(this).attr('id', oldId.replace(/~/g, ''));
      }
      if (oldName = jQuery(this).attr('name')) {
        jQuery(this).attr('name', oldName.replace(/~/g, ''));
      }
      if (oldFor = jQuery(this).attr('for')) {
        jQuery(this).attr('for', oldFor.replace(/~/g, ''));
      }
    });
    // Update modules
    jQuery(this).find('.module').each(function(index2) {
      jQuery(this).find('input, textarea, select, label').each(function() {
        if (oldId = this.id) {
          jQuery(this).attr('id', oldId.replace(/~/g, ''));
        }
        if (oldName = jQuery(this).attr('name')) {
          jQuery(this).attr('name', oldName.replace(/~/g, ''));
        }
        if (oldFor = jQuery(this).attr('for')) {
          jQuery(this).attr('for', oldFor.replace(/~/g, ''));
        }
      });
      jQuery(this).find('.media-selector').each(function() {
        if (oldTarget = jQuery(this).attr('target')) {
          jQuery(this).attr('target', oldTarget.replace(/~/g, ''));
        }
      });
      jQuery(this).find('.text-editor').each(function() {
        wp.editor.initialize(this.id, {
          tinymce: true,
          quicktags: true
        });
      });
    });
  });
  jQuery('.color-picker').wpColorPicker();
}

jQuery(document).ready(function() {
  updateOrder();
});

//=include _pb-section.js
//=include _pb-module.js
