// Main exports for Puck Editor integration
export { supabase, testSupabaseConnection } from './supabase'
export { PuckDatabase } from './puck-database'
export { PuckUtils } from './puck-utils'

// Re-export types
export type { PuckPageData, PuckComponent } from './supabase'

// Version info
export const PUCK_LIB_VERSION = '1.0.0'

// Configuration constants
export const PUCK_CONFIG = {
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  DEFAULT_PAGE_NAME: 'surgery-readiness-assessment',
  LOCAL_STORAGE_PREFIX: 'puck-',
  BACKUP_RETENTION_DAYS: 30
}

// Utility function to get all available functionality
export const getPuckCapabilities = () => {
  return {
    database: {
      save: 'Save pages to Supabase database',
      load: 'Load pages from database',
      publish: 'Publish pages live',
      draft: 'Manage draft versions',
      delete: 'Delete pages',
      duplicate: 'Duplicate pages',
      search: 'Search page content',
      history: 'Version history tracking',
      backup: 'Create page backups'
    },
    utils: {
      autoSave: 'Automatic saving every 30 seconds',
      fallback: 'Multi-tier loading strategy',
      export: 'Export pages as JSON',
      import: 'Import pages from JSON',
      validate: 'Page data validation',
      stats: 'Page analytics and statistics',
      localStorage: 'Local storage management'
    },
    features: {
      realTime: 'Real-time auto-save',
      offline: 'Offline localStorage fallback',
      versioning: 'Page version management',
      publishing: 'Draft/published workflow',
      search: 'Full-text search capability',
      analytics: 'Component usage statistics'
    }
  }
}