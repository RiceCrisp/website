<?php
class Video extends Module {
  public $slug = 'video';
  public $name = 'Video';
  public $desc = 'Video HTML';
  public function backend($pb) {
    return
    '<li>
      <label for="video-type-0-0">Video Source</label>
      <select id="video-type-0-0" class="video-type-sel" name="pagebuilder[0][0][video-type]">
        <option value="youtube" ' . ($pb['video-type']=='youtube' ? 'selected' : '') . '>YouTube</option>
        <option value="vimeo" ' . ($pb['video-type']=='vimeo' ? 'selected' : '') . '>Vimeo</option>
        <option value="local" ' . ($pb['video-type']=='local' ? 'selected' : '') . '>Local</option>
      </select>
    </li>
    <li class="youtube video-type">
      <label for="youtube-0-0">YouTube Video ID <small>Numbers/Letters at end of video url</small></label>
      <input id="youtube-0-0" name="pagebuilder[0][0][youtube]" type="text" value="' . $pb['youtube'] . '" />
    </li>
    <li class="vimeo video-type">
      <label for="vimeo-0-0">Vimeo Video ID <small>Numbers at end of video url</small></label>
      <input id="vimeo-0-0" name="pagebuilder[0][0][vimeo]" type="text" value="' . $pb['vimeo'] . '" />
    </li>
    <li class="local video-type">
      <label for="local-0-0">Video URL</label>
      <input id="local-0-0" name="pagebuilder[0][0][local]" type="text" value="' . $pb['local'] . '" />
    </li>
    <li>
      <label for="full-screen-0-0">Allow Full Screen</label>
      <input id="full-screen-0-0" name="pagebuilder[0][0][full-screen]" type="checkbox" ' . (empty($pb['full-screen']) ? '' : 'checked') . ' />
    </li>';
  }
  public function frontend($pb) {
    $output = '';
    if ($pb['video-type']=='youtube' && $pb['youtube']) {
      $output = '<div class="video-container"><iframe src="https://www.youtube.com/embed/' . $pb['youtube'] . '" frameborder="0" ' . (empty($pb['full-screen']) ? '' : 'allowfullscreen') . '></iframe></div>';
    } else if ($pb['video-type']=='vimeo' && $pb['vimeo']) {
      $output = '<div class="video-container"><iframe src="https://player.vimeo.com/video/' . $pb['vimeo'] . '" frameborder="0" ' . (empty($pb['full-screen']) ? '' : 'allowfullscreen') . '></iframe></div>';
    } else if ($pb['video-type']=='local' && $pb['local']) {
      $output = '<video' . (empty($pb['full-screen']) ? '' : ' class="no-fullscreen"') . ' controls><source src="' . $pb['local'] . '" type="video/mp4" /></video>';
    } else {
      $output = '<div><small><i>There was an error with the video settings.</i></small></div>';
    }
    return $output;
  }
}
$modules['video'] = new Video();
