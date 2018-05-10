//=include vue/dist/vue.js

// SVG
function checkSVG() {
  var svgs = document.querySelectorAll('.svg-options .sortable-item');
  for (i = 0; i < svgs.length; i++) {
    if (svgs[i].querySelector('[v-model]')) {
      new Vue({
        el: svgs[i],
        data: {
          viewbox: svgs[i].querySelector('[v-model=viewbox]') ? svgs[i].querySelector('[v-model=viewbox]').value : '',
          paths: svgs[i].querySelector('[v-model=paths]') ? svgs[i].querySelector('[v-model=paths]').value : '',
          valid: true
        },
        computed: {
          validViewbox: function() {
            var match = this.viewbox.match(/(-?\d+(\.\d+)?) (-?\d+(\.\d+)?) (-?\d+(\.\d+)?) (-?\d+(\.\d+)?)/g);
            if (match && match[0] == this.viewbox) {
              this.valid = true;
              return this.viewbox;
            }
            else if (this.viewbox == '') {
              this.valid = true;
            }
            else {
              this.valid = false;
            }
          }
        }
      });
    }
  }
}
checkSVG();
var svgString = '<li class="sortable-item svg"><div class="sortable-header"><span class="dashicons dashicons-move sortable-handle"></span><span class="dashicons dashicons-trash sortable-delete"></span></div><div class="sortable-content row"><div class="col-xs-6"><svg v-if="validViewbox" v-bind:view-box.camel="validViewbox" v-html="paths"></svg></div><div class="col-xs-6"><label for="svg[00][id]">ID</label><input id="svg[00][id]" name="svg[00][id]" type="text" value="" /><label for="svg[00][title]">Title</label><input id="svg[00][title]" name="svg[00][title]" type="text" value="" /><label for="svg[00][viewbox]">ViewBox</label><input id="svg[00][viewbox]" v-bind:class="{invalid: !valid}" name="svg[00][viewbox]" type="text" v-model="viewbox" value="" /></div><div class="col-xs-12"><label for="svg[00][path]">Paths</label><textarea id="svg[00][path]" name="svg[00][path]" v-model="paths"></textarea></div></div></li>'
jQuery('#add-svg-top').on('click', function(e) {
  e.preventDefault();
  jQuery(this).next().prepend(svgString);
  checkOrder();
  checkSVG();
});
jQuery('#add-svg-bottom').on('click', function(e) {
  e.preventDefault();
  jQuery(this).prev().append(svgString);
  checkOrder();
  checkSVG();
});
jQuery('#svg-import').on('change', function(e) {
  var reader = new FileReader();
  reader.onload = function() {
    try {
      var result = reader.result.replace(/[\n\t\r]+/g, '')
      var xml = jQuery.parseXML(result);
      var svgs = xml.querySelectorAll('symbol') || xml.querySelectorAll('svg');
      for (i = 0; i < svgs.length; i++) {
        var id = svgs[i].id || '';
        var title = svgs[i].querySelector('title').innerHTML || '';
        var viewBox = svgs[i].getAttribute('viewBox') || '';
        var paths = svgs[i].querySelectorAll('*:not(title)') || '';
        var output = '';
        for (ii = 0; ii < paths.length; ii++) {
          output += paths[ii].outerHTML.replace(/xmlns=".*" /g, '') + "\n";
        }
        output = output.slice(0, -1);
        jQuery('.sortable-container').prepend('<li class="sortable-item svg"><div class="sortable-header"><span class="dashicons dashicons-move sortable-handle"></span><span class="dashicons dashicons-trash sortable-delete"></span></div><div class="sortable-content row"><div class="col-xs-6"><svg v-if="validViewbox" v-bind:view-box.camel="validViewbox" v-html="paths"></svg></div><div class="col-xs-6"><label for="svg[00][id]">ID</label><input id="svg[00][id]" name="svg[00][id]" type="text" value="' + id + '" /><label for="svg[00][title]">Title</label><input id="svg[00][title]" name="svg[00][title]" type="text" value="' + title + '" /><label for="svg[00][viewbox]">ViewBox</label><input id="svg[00][viewbox]" v-bind:class="{invalid: !valid}" name="svg[00][viewbox]" type="text" v-model="viewbox" value="' + viewBox + '" /></div><div class="col-xs-12"><label for="svg[00][path]">Paths</label><textarea id="svg[00][path]" name="svg[00][path]" v-model="paths">' + output + '</textarea></div></div></li>');
        checkOrder();
        checkSVG();
      }
      document.querySelector('.import-msg').innerHTML = 'Data successfully imported.';
      document.querySelector('.import-msg').style.color = 'green';
    }
    catch (err) {
      document.querySelector('.import-msg').innerHTML = 'There was an error reading the file. Confirm it is a .svg file and that the data is valid.';
      document.querySelector('.import-msg').style.color = 'red';
    }
  };
  reader.readAsText(e.target.files[0]);
});

// SEO advanced options toggle
jQuery('#seo-meta-inside #seo-advanced-options-toggle').on('click', function(e) {
  e.preventDefault();
  jQuery('#seo-meta-inside #seo-advanced-options').slideToggle();
});

// Handle SEO preview
jQuery('#seo-meta-inside #seo-title').on('input', function() {
  jQuery('#seo-meta-inside #seo-preview-title .title').html(jQuery(this).val());
});
jQuery('#seo-meta-inside #seo-canonical').on('input', function() {
  jQuery('#seo-meta-inside #seo-preview-url').html(jQuery(this).val());
});
jQuery('#seo-meta-inside #seo-desc').on('input', function() {
  jQuery('#seo-meta-inside #seo-preview-desc').html(jQuery(this).val());
});
if (jQuery('#seo-meta-inside #seo-title').val()) {
  jQuery('#seo-meta-inside #seo-title').trigger('input');
}
if (jQuery('#seo-meta-inside #seo-canonical').val()) {
  jQuery('#seo-meta-inside #seo-canonical').trigger('input');
}
if (jQuery('#seo-meta-inside #seo-desc').val()) {
  jQuery('#seo-meta-inside #seo-desc').trigger('input');
}

// Media selector
var mediaUploader;
jQuery(document).on('click', '.media-selector', function(e) {
  e.preventDefault();
  var target = jQuery(this).attr('target');
  var size = jQuery(this).attr('size');
  mediaUploader = wp.media.frames.file_frame = wp.media({
    title: 'Select Image',
    button: {
    text: 'Select Image'
  }, multiple: false });
  mediaUploader.on('select', function() {
    attachment = mediaUploader.state().get('selection').first().toJSON();
    if (size && attachment.sizes[size]) {
      jQuery(target).val(attachment.sizes[size].url.substring(attachment.sizes[size].url.indexOf('/wp-content/')));
    } else {
      jQuery(target).val(attachment.url.substring(attachment.url.indexOf('/wp-content/')));
    }
  });
  mediaUploader.open();
});

// Actually enfore the min/max for inputs
jQuery('input[type=number]').on('input keypress', function(e) {
  // if (e.key=='-' || e.key=='.' || e.key=='+') {
  //   return false;
  // }
  if (jQuery(this).val() > parseInt(jQuery(this).attr('max'))) {
    jQuery(this).val(jQuery(this).attr('max'));
  } else if (jQuery(this).val() < parseInt(jQuery(this).attr('min'))) {
    jQuery(this).val(jQuery(this).attr('min'));
  }
});

// Post selector
jQuery('.post-selector').each(function() {
  jQuery(this).attr('type', 'hidden');
  jQuery.ajax({
    context: this,
    url: locals.ajax_url,
    method: 'post',
    data: {
      action: '_ws_post_picker_types',
      id: jQuery(this).attr('id'),
      value: jQuery(this).val(),
      post_type: jQuery(this).attr('post-type') || ''
    },
    success: function(res) {
      jQuery(this).after(res);
    }
  });
});
jQuery('body').on('change', '.post-selector-type input[type=radio]', function() {
  var field = jQuery(this).closest('.post-selector-container').prev();
  jQuery.ajax({
    context: this,
    url: locals.ajax_url,
    method: 'post',
    data: {
      action: '_ws_post_picker_posts',
      id: field.attr('id'),
      post_type: jQuery(this).val()
    },
    success: function(res) {
      jQuery(this).closest('.post-selector-container').children('.post-selector-id').html(res);
    }
  });
});
jQuery('body').on('change', '.post-selector-id input[type=radio]', function() {
  var field = jQuery(this).closest('.post-selector-container').prev();
  field.val(jQuery(this).val());
});
jQuery('body').on('input', '.post-selector-filter', function() {
  var value = jQuery(this).val().toLowerCase();
  jQuery(this).next().children().each(function() {
    try {
      var thisValue = jQuery(this).children('label').html().toLowerCase();
      if (thisValue.includes(value)) {
        jQuery(this).show();
      } else {
        jQuery(this).hide();
      }
    } catch (err) {}
  });
});

// Initialize any text editors
jQuery(document).ready(function() {
  jQuery('.text-editor').each(function() {
    if (jQuery(this).closest('.sortable-item').length) {
      return true;
    }
    wp.editor.initialize(this.id, {
      tinymce: true,
      quicktags: true
    });
  });
});

// Check order of sortable items (we add a tildes so that no fields share the same id at any single moment)
function checkOrder() {
  jQuery('.sortable-container').each(function() {
    jQuery(this).find('.sortable-item').each(function(i) {
      // We want to remove wp.editor fields first before their ids change
      jQuery(this).find('.text-editor').each(function() {
        jQuery('.text-editor').each(function() {
          wp.editor.remove(this.id);
        });
      });
      jQuery(this).find('label').each(function() {
        if (jQuery(this).attr('for')) {
          var oldFor = jQuery(this).attr('for');
          jQuery(this).attr('for', oldFor.replace(/\d+/g, '~'+i));
        }
      });
      jQuery(this).find('input, textarea').each(function() {
        if (jQuery(this).attr('id')) {
          var oldId = jQuery(this).attr('id');
          jQuery(this).attr('id', oldId.replace(/\d+/g, '~'+i));
        }
        if (jQuery(this).attr('name')) {
          var oldName = jQuery(this).attr('name');
          jQuery(this).attr('name', oldName.replace(/\d+/g, '~'+i));
        }
      });
      jQuery(this).find('button').each(function() {
        if (jQuery(this).attr('target')) {
          var oldTarget = jQuery(this).attr('target');
          jQuery(this).attr('target', oldTarget.replace(/\d+/g, '~'+i));
        }
      });
    });
    // Remove the tildes
    jQuery(this).find('label').each(function() {
      if (v = jQuery(this).attr('for')) {
        jQuery(this).attr('for', v.replace(/~/g, ''));
      }
    });
    jQuery(this).find('input, textarea').each(function() {
      if (v = jQuery(this).attr('id')) {
        jQuery(this).attr('id', v.replace(/~/g, ''));
      }
      if (v = jQuery(this).attr('name')) {
        jQuery(this).attr('name', v.replace(/~/g, ''));
      }
    });
    jQuery(this).find('button').each(function() {
      if (v = jQuery(this).attr('target')) {
        jQuery(this).attr('target', v.replace(/~/g, ''));
      }
    });
    jQuery(this).find('.text-editor').each(function() {
      jQuery('.text-editor').each(function() {
        wp.editor.initialize(this.id, {
          tinymce: true,
          quicktags: true
        });
      });
    });
  });
}
// Sortable items are draggable if they have a child element with the "sortable-handle" class
jQuery('.sortable-container').sortable({
  axis: 'y',
  handle: '.sortable-handle',
  cursor: 'ns-resize',
  placeholder: 'sortable-placeholder',
  forcePlaceholderSize: true,
  stop: function(e, ui) {
    checkOrder();
  }
});
// Delete sortable item functionality
jQuery('body').on('click', '.sortable-delete', function(e) {
  e.preventDefault();
  jQuery(this).closest('.sortable-item').remove();
  checkOrder();
});
// We have to wait for the necessary wp-editor scripts to be loaded
jQuery(document).ready(function() {
  checkOrder();
});

// Add redirect
jQuery('.redirect-options .add button').on('click', function(e) {
  e.preventDefault();
  var container = jQuery(this).closest('.redirect');
  var oldVal = jQuery(this).closest('.redirect').find('.old input').val();
  var newVal = jQuery(this).closest('.redirect').find('.new input').val();
  if (oldVal.charAt(0) != '/' || !oldVal.includes('http://') || !oldVal.includes('https://')) {
    oldVal = '/' + oldVal;
  }
  if (newVal.charAt(0) != '/' || !newVal.includes('http://') || !newVal.includes('https://')) {
    newVal = '/' + newVal;
  }
  jQuery(this).closest('.redirect').find('.old input').val('');
  jQuery(this).closest('.redirect').find('.new input').val('');
  jQuery('.sortable-container').prepend('<li class="sortable-item redirect"><div class="old"><input name="redirects[00][old]" type="text" value="' + oldVal + '" readonly /></div><div class="new"><input name="redirects[00][new]" type="text" value="' + newVal + '" readonly /></div><span class="dashicons dashicons-move sortable-handle"></span><span class="dashicons dashicons-trash sortable-delete"></span></li>');
  checkOrder();
});
jQuery('#redirect-import').on('change', function(e) {
  var reader = new FileReader();
  reader.onload = function() {
    try {
      var results = reader.result.split("\n");
      for (i = 0; i < results.length; i++) {
        var result = results[i].split(',');
        var oldVal = result[0];
        var newVal = result[1];
        if (oldVal.charAt(0) != '/' || !oldVal.includes('http://') || !oldVal.includes('https://')) {
          oldVal = '/' + oldVal;
        }
        if (newVal.charAt(0) != '/' || !newVal.includes('http://') || !newVal.includes('https://')) {
          newVal = '/' + newVal;
        }
        jQuery('.sortable-container').prepend('<li class="sortable-item redirect"><div class="old"><input name="redirects[00][old]" type="text" value="' + oldVal + '" readonly /></div><div class="new"><input name="redirects[00][new]" type="text" value="' + newVal + '" readonly /></div><span class="dashicons dashicons-move sortable-handle"></span><span class="dashicons dashicons-trash sortable-delete"></span></li>');
        checkOrder();
      }
      document.querySelector('.import-msg').innerHTML = 'Data successfully imported.';
      document.querySelector('.import-msg').style.color = 'green';
    }
    catch (err) {
      document.querySelector('.import-msg').innerHTML = 'There was an error reading the file. Confirm it is a .csv file and that the data is valid (old url in first column and new url in second column).';
      document.querySelector('.import-msg').style.color = 'red';
    }
  };
  reader.readAsText(e.target.files[0]);
});

//=include _admin-color-picker.js
