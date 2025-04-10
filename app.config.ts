export default defineAppConfig({
    ui: {
      primary: 'seagull',
      gray: 'cool',
      toggle:{
        inactive: 'bg-chenin-300 dark:bg-chenin-300',
        icon:{on:'dark:text-seagull-600', off: 'text-chenin-600 dark:text-chenin-500',},
      },
      card:{
        base: '',
        background: 'bg-white dark:bg-gray-900',
        divide: 'divide-y divide-gray-200 dark:divide-gray-800',
        ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
        rounded: 'rounded-lg',
        shadow: 'shadow',
        body: {
          base: '',
          background: '',
          padding: 'px-4 py-5 sm:p-6'
        }
      }
    }
  })