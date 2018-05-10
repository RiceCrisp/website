// Add module
jQuery(document).on('click', '.add-module', function(e) {
  e.preventDefault();
  var sectionId = jQuery(this).parents('.module-slot');
  jQuery('#module-choices').show(0, function() {
    jQuery('.module-choice').bind('click', function(e) {
      e.preventDefault();
      jQuery.ajax({
        context: this,
        url: pbInfo.ajax_url,
        method: 'get',
        data: {
          action: 'empty_module',
          module: jQuery(this).attr('module')
        },
        success: function(res) {
          jQuery(sectionId).html(res);
          jQuery('#module-choices').hide();
          jQuery('.modules').sortable({
            axis: 'x',
            handle: '.module-handle',
            cursor: 'ew-resize',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            stop: function(e, ui) {
              updateOrder();
            }
          });
          jQuery('.module-choice').unbind();
          updateOrder();
        }
      });
      // jQuery('#module-choices').hide();
      // jQuery('.modules').sortable({
      //   axis: 'x',
      //   handle: '.module-handle',
      //   cursor: 'ew-resize',
      //   placeholder: 'sortable-placeholder',
      //   forcePlaceholderSize: true,
      //   stop: function(e, ui) {
      //     updateOrder();
      //   }
      // });
      // updateOrder();
      // jQuery('.module-choice').unbind();
    });
  });
});

// Save module
jQuery(document).on('click', '.module-save', function(e) {
  e.preventDefault();
  var filename = prompt('What would you like to save this module as?');
});

// Delete module
jQuery(document).on('click', '.module-delete', function(e) {
  e.preventDefault();
  jQuery(this).after(
    '<div id="module-delete" class="lightbox">'+
      '<div class="postbox">'+
        '<div class="lightbox-header">'+
          '<h2 class="lightbox-title">Delete Module?</h2>'+
          '<button class="lightbox-cancel"><span class="dashicons dashicons-no-alt"></span></button>'+
        '</div>'+
        '<div class="inside">'+
          '<div class="choices">'+
            '<button class="button lightbox-cancel">Cancel</button>'+
            '<button class="button module-delete-confirm">Delete</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'
  );
  jQuery(document).on('click', '.module-delete-confirm', function() {
    var module = jQuery(this).parents('.module-slot');
    module.find('.text-editor').each(function() {
      wp.editor.remove(this.id);
    });
    module.html('<div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div>');
    updateOrder();
  });
});

// Switch between module tabs
jQuery(document).on('click', '.module-tab', function(e) {
  var sel = jQuery(this).attr('sel');
  jQuery(this).siblings().removeClass('current');
  jQuery(this).addClass('current');
  jQuery(this).parent().parent().next().children().hide();
  jQuery(this).parent().parent().next().children('.'+sel).show();
});

// Video module
jQuery(document).on('change', '.video-type-sel', function() {
  var sel = '.' + jQuery(this).val();
  jQuery(this).parents('ul').find('.video-type').hide();
  jQuery(this).parents('ul').find(sel).show();
});
jQuery('.video-type-sel').each(function() {
  var sel = '.' + jQuery(this).val();
  jQuery(this).parents('ul').find('.video-type').hide();
  jQuery(this).parents('ul').find(sel).show();
});

// Make modules sortable
// jQuery('.modules').sortable({
//   axis: 'x',
//   handle: '.module-handle',
//   cursor: 'ew-resize',
//   placeholder: 'sortable-placeholder',
//   forcePlaceholderSize: true,
//   stop: function(e, ui) {
//     updateOrder();
//   }
// });
