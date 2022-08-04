<!-- an example footer for pages -->
<template>
  <footer
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="text-gray-400 absolute bottom-0 left-max right-1 p-1"
    style="font-size: 0.7rem;"
  >
    <span>ぼくのかんがえたさいきょうの開発環境 天下一武道会</span> -
    [ {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }} ]
  </footer>
</template>
