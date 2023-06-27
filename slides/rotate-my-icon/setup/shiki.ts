import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(async({ loadTheme }) => {
  return {
    theme: {
      dark: await loadTheme('themes/dracula.json'),
      light: await loadTheme('themes/github-light.json'),
    },
  }
})
