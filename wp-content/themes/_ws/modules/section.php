<?php
class Section {
  public function output($pb) {
    $mod_array = array();
    if (isset($pb['modules'])) {
      $mod_array = $pb['modules'];
    } else {
      foreach ($pb as $module) {
        if (is_array($module)) {
          array_push($mod_array, $module);
        }
      }
    }
    if ($pb['col-grid']=='halves') {
      $columns = '<li class="module-slot col-xs-6">' . $this->moduleCheck($mod_array, 0) . '</li><li class="module-slot col-xs-6">' . $this->moduleCheck($mod_array, 1) . '</li>';
    } else if ($pb['col-grid']=='one-third') {
      $columns = '<li class="module-slot col-xs-4">' . $this->moduleCheck($mod_array, 0) . '</li><li class="module-slot col-xs-8">' . $this->moduleCheck($mod_array, 1) . '</li>';
    } else if ($pb['col-grid']=='two-thirds') {
      $columns = '<li class="module-slot col-xs-8">' . $this->moduleCheck($mod_array, 0) . '</li><li class="module-slot col-xs-4">' . $this->moduleCheck($mod_array, 1) . '</li>';
    } else if ($pb['col-grid']=='thirds') {
      $columns = '<li class="module-slot col-xs-4">' . $this->moduleCheck($mod_array, 0) . '</li><li class="module-slot col-xs-4">' . $this->moduleCheck($mod_array, 1) . '</li><li class="module-slot col-xs-4">' . $this->moduleCheck($mod_array, 2) . '</li>';
    } else {
      $columns = '<li class="module-slot col-xs-12">' . $this->moduleCheck($mod_array, 0) . '</li>';
    }
    return
    '<li id="section-0" class="section postbox">
      <div class="section-header section-handle">
        <button class="section-collapse">
          <span class="dashicons dashicons-arrow-up"></span>
        </button>
        <h2 class="section-title">Section</h2>
        <button class="section-settings" title="Section Settings">
          <span class="dashicons dashicons-admin-settings"></span>
        </button>
        <button class="section-save" title="Save Section">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
          </svg>
        </button>
        <button class="section-delete" title="Delete Section">
          <span class="dashicons dashicons-trash"></span>
        </button>
      </div>
      <div class="section-options">
        <ul>
          <li class="row">
            <div class="flex-1">
              <label for="custom-id-0">ID</label>
              <input id="custom-id-0" name="pagebuilder[0][custom-id]" type="text" value="' . $pb['custom-id'] . '" />
            </div>
            <div class="flex-1">
              <label for="custom-class-0">Class</label>
              <input id="custom-class-0" name="pagebuilder[0][custom-class]" type="text" value="' . $pb['custom-class'] . '" />
            </div>
          </li>
          <li>
            <label for="col-grid-0">Column Layout</label>
            <select id="col-grid-0" name="pagebuilder[0][col-grid]">
              <option value="one" ' . ($pb['col-grid']=='one' ? 'selected' : '') . '>1/1</option>
              <option value="halves" ' . ($pb['col-grid']=='halves' ? 'selected' : '') . '>1/2 + 1/2</option>
              <option value="one-third" ' . ($pb['col-grid']=='one-third' ? 'selected' : '') . '>1/3 + 2/3</option>
              <option value="two-thirds" ' . ($pb['col-grid']=='two-thirds' ? 'selected' : '') . '>2/3 + 1/3</option>
              <option value="thirds" ' . ($pb['col-grid']=='thirds' ? 'selected' : '') . '>1/3 + 1/3 + 1/3</option>
            </select>
          </li>
          <li>
            <label for="background-color-0">Background Overlay</label>
            <input id="background-color-0" class="color-picker" data-alpha="true" name="pagebuilder[0][background-color]" type="text" value="' . $pb['background-color'] . '" />
          </li>
          <li>
            <label for="background-img-0">Background Image</label>
            <div class="row">
              <button class="button media-selector" target="#background-img-0">Select Image</button>
              <input id="background-img-0" class="flex-1" name="pagebuilder[0][background-img]" type="text" value="' . $pb['background-img'] . '" />
            </div>
          </li>
          <li class="inline-option">
            <input id="background-fixed-0" name="pagebuilder[0][background-fixed]" type="checkbox" ' . (empty($pb['background-fixed']) ? '' : 'checked') . '/>
            <label for="background-fixed-0">Fixed Background <small>Gives background a parallax effect. Switches to scroll on mobile.</small></label>
          </li>
          <li class="inline-option">
            <input id="background-repeat-0" name="pagebuilder[0][background-repeat]" type="checkbox" ' . (empty($pb['background-repeat']) ? '' : 'checked') . ' />
            <label for="background-repeat-0">Repeat Background <small>Repeats background image. Good for patterns.</small></label>
          </li>
          <li class="inline-option">
            <input id="background-fixed-0" name="pagebuilder[0][full-width]" type="checkbox" ' . (empty($pb['full-width']) ? '' : 'checked') . '/>
            <label for="background-fixed-0">Full Width <small>Forces the section to take up the entire page width.</small></label>
          </li>
        </ul>
      </div>
      <div class="inside section-inside">
        <ul class="modules row">
          ' . $columns . '
        </ul>
      </div>
    </li>';
  }

  private function moduleCheck($array, $num) {
    global $modules;
    if (isset($array[$num])) {
      return $modules[$array[$num]['module-type']]->output($array[$num]);
    } else {
      return '<div class="add-module"><span class="dashicons dashicons-plus-alt"></span><span class="add-module-text">Add Module</span></div>';
    }
  }
}
$section = new Section();
