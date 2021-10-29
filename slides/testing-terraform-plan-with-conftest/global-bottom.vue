<!-- an example footer for pages -->
<template>
  <footer
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="text-gray-400 absolute bottom-0 left-max right-1 p-1"
  >
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
  </footer>
</template>
