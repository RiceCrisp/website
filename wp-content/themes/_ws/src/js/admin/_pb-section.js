// Add section
jQuery('#add-section').on('click', function(e) {
  e.preventDefault();
  jQuery.ajax({
    context: this,
    url: pbInfo.ajax_url,
    method: 'get',
    data: {
      action: 'empty_section'
    },
    success: function(res) {
      jQuery('#sections').append(res);
      updateOrder();
    }
  });
});

// Save section
jQuery(document).on('click', '.section-save', function(e) {
  e.preventDefault();
  jQuery(this).after(
    '<div id="section-save" class="lightbox">'+
    '<div class="postbox">'+
    '<div class="lightbox-header">'+
    '<h2 class="lightbox-title">Save Section?</h2>'+
    '<button class="lightbox-cancel"><span class="dashicons dashicons-no-alt"></span></button>'+
    '</div>'+
    '<div class="inside">'+
    '<input type="text" id="save-name" placeholder="Save Name" />'+
    '<div id="save-warning"><i>A saved section already exists with that name.</i></div>'+
    '<div class="choices">'+
    '<button class="button lightbox-cancel">Cancel</button>'+
    '<button class="button section-save-confirm">Save</button>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'
    );
  jQuery('#save-name').focus();


  jQuery(document).on('click', '.section-save-confirm', function(e) {
    e.preventDefault();
    var section_name = jQuery(this).parents('.lightbox').find('#save-name');
    var section_json = '{"section-name": "' + section_name.val() + '"';
    // Section
    jQuery(this).parents('.section').find('.section-options input:not([type=button]), .section-options select').each(function(index, el) {
      section_json += ', "' + el.id.replace(/-\d+/g, '') + '": ';
      if (el.type == 'checkbox') {
        section_json += el.checked;
      } else {
        section_json += '"' + el.value + '"';
      }
    });
    // Modules
    section_json += ', "modules": [';
    var length = jQuery(this).parents('.section').find('.module').length;
    jQuery(this).parents('.section').find('.module').each(function(index, el) {
      section_json += '{';
      var length2 = jQuery(this).find('input:not([type=button]), textarea, select').length;
      jQuery(this).find('input:not([type=button]), textarea, select').each(function(index2, el2) {
        section_json += '"' + el2.id.replace(/-\d+/g, '') + '":';
        if (el2.type == 'checkbox') {
          section_json += el2.checked + ',';
        } else {
          section_json += '"' + el2.value + '",';
        }
        if (index2 == length2-1) {
          section_json = section_json.slice(0, -1);
        }
      });
      section_json += '},';
      if (index == length-1) {
        section_json = section_json.slice(0, -1);
      }
    });
    section_json += ']}';
    jQuery.ajax({
      context: this,
      url: pbInfo.ajax_url,
      method: 'post',
      data: {
        action: 'save_section',
        section: section_json
      },
      success: function(res) {
        if (res=='err') {
          jQuery('#save-name').css('border-color', '#f66');
          jQuery('#save-warning').show();
        } else {
          jQuery(this).parents('.lightbox').remove();
        }
      }
    });
  });
});

// Load section
jQuery('#load-section').on('click', function(e) {
  e.preventDefault();
  jQuery.ajax({
    context: this,
    url: pbInfo.ajax_url,
    method: 'get',
    data: {
      action: 'get_sections'
    },
    success: function(res) {
      jQuery(this).after(
        '<div id="section-load" class="lightbox">'+
        '<div class="postbox">'+
        '<div class="lightbox-header">'+
        '<h2 class="lightbox-title">Saved Sections</h2>'+
        '<button class="lightbox-cancel"><span class="dashicons dashicons-no-alt"></span></button>'+
        '</div>'+
        '<div class="inside">'+
        res+
        '</div>'+
        '</div>'+
        '</div>'
      );
    }
  });
});
jQuery(document).on('click', '.saved-sections li button', function(e) {
  e.preventDefault();
  jQuery.ajax({
    context: this,
    url: pbInfo.ajax_url,
    method: 'get',
    data: {
      action: 'load_section',
      section: jQuery(this).parent().attr('index')
    },
    success: function(res) {
      jQuery('#sections').append(res);
      updateOrder();
      jQuery(this).parents('.lightbox').remove();
    }
  });
});
jQuery(document).on('click', '.saved-sections li a', function(e) {
  e.preventDefault();
  jQuery.ajax({
    context: this,
    url: pbInfo.ajax_url,
    method: 'post',
    data: {
      action: 'delete_section',
      section: jQuery(this).parent().attr('index')
    },
    success: function(res) {
      jQuery(this).parent().remove();
    }
  });
});

// Delete section
jQuery(document).on('click', '.section-delete', function(e) {
  e.preventDefault();
  jQuery(this).after(
    '<div id="section-save" class="lightbox">'+
      '<div class="postbox">'+
        '<div class="lightbox-header">'+
          '<h2 class="lightbox-title">Delete Section?</h2>'+
          '<button class="lightbox-cancel"><span class="dashicons dashicons-no-alt"></span></button>'+
        '</div>'+
        '<div class="inside">'+
          '<div class="choices">'+
            '<button class="button lightbox-cancel">Cancel</button>'+
            '<button class="button section-delete-confirm">Delete</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'
  );
  jQuery(document).on('click', '.section-delete-confirm', function() {
    var section = jQuery(this).parents('.section');
    section.find('.text-editor').each(function() {
      wp.editor.remove(this.id);
    });
    section.remove();
    updateOrder();
  });
});

// Collapse section
jQuery(document).on('click', '.section-collapse', function(e) {
  e.preventDefault();
  jQuery(this).children().toggleClass('flip');
  jQuery(this).parents('.section-header').siblings('.section-inside').slideToggle();
});

// Section options
jQuery(document).on('click', '.section-settings', function(e) {
  e.preventDefault();
  jQuery(this).parents('.section-header').next().slideToggle();
});

// Make sections sortable
jQuery('#sections').sortable({
  axis: 'y',
  handle: '.section-handle',
  cursor: 'ns-resize',
  placeholder: 'sortable-placeholder',
  forcePlaceholderSize: true,
  stop: function(e, ui) {
    updateOrder();
  }
});

// Build module slots
jQuery('#sections').on('change', '.section-options select', function() {
  if (jQuery(this).val()=='one') {
    jQuery(this).parents('.section').find('.section-inside .modules').html('<li class="module-slot col-xs-12"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li>');
  } else if (jQuery(this).val()=='halves') {
    jQuery(this).parents('.section').find('.section-inside .modules').html('<li class="module-slot col-xs-6"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li><li class="module-slot col-xs-6"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li>');
  } else if (jQuery(this).val()=='one-third') {
    jQuery(this).parents('.section').find('.section-inside .modules').html('<li class="module-slot col-xs-4"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li><li class="module-slot col-xs-8"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li>');
  } else if (jQuery(this).val()=='two-thirds') {
    jQuery(this).parents('.section').find('.section-inside .modules').html('<li class="module-slot col-xs-8"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li><li class="module-slot col-xs-4"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li>');
  } else {
    jQuery(this).parents('.section').find('.section-inside .modules').html('<li class="module-slot col-xs-4"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li><li class="module-slot col-xs-4"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li><li class="module-slot col-xs-4"><div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div></li>');
  }
});
