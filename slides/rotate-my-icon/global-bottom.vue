<template>
  <footer
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="text-gray-400 absolute bottom-0 left-max right-1 p-1"
    style="font-size: 0.7rem;"
  >
    [ {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }} ]
  </footer>
</template>
