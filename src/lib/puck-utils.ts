import { PuckDatabase } from './puck-database'
import { Data } from '@measured/puck'

// Utility functions for Puck Editor management
export class PuckUtils {
  
  // Auto-save functionality
  private static autoSaveInterval: NodeJS.Timeout | null = null
  
  // Start auto-save for a page
  static startAutoSave(pageName: string, getData: () => Data, intervalMs: number = 30000) {
    this.stopAutoSave() // Clear any existing auto-save
    
    console.log(`🔄 Starting auto-save for '${pageName}' every ${intervalMs/1000}s`)
    
    this.autoSaveInterval = setInterval(async () => {
      try {
        const data = getData()
        await PuckDatabase.savePage({
          page_name: pageName,
          page_data: data,
          is_published: false
        })
        console.log(`💾 Auto-saved '${pageName}'`)
      } catch (error) {
        console.error('❌ Auto-save failed:', error)
      }
    }, intervalMs)
  }
  
  // Stop auto-save
  static stopAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
      this.autoSaveInterval = null
      console.log('🛑 Auto-save stopped')
    }
  }
  
  // Load page with fallback strategy
  static async loadPageWithFallback(pageName: string, defaultData: Data): Promise<Data> {
    try {
      // Try published first
      const published = await PuckDatabase.getPublishedPage(pageName)
      if (published?.page_data) {
        console.log('✅ Loaded published data')
        return published.page_data
      }
      
      // Try draft
      const draft = await PuckDatabase.getDraftPage(pageName)
      if (draft?.page_data) {
        console.log('✅ Loaded draft data')
        return draft.page_data
      }
      
      // Try any version
      const any = await PuckDatabase.loadPage(pageName)
      if (any?.page_data) {
        console.log('✅ Loaded any version data')
        return any.page_data
      }
      
      // Try localStorage
      const localKey = `puck-${pageName}-data`
      const savedData = localStorage.getItem(localKey)
      if (savedData) {
        console.log('📦 Loaded from localStorage')
        return JSON.parse(savedData)
      }
      
      console.log('🔧 Using default data')
      return defaultData
    } catch (error) {
      console.error('❌ Failed to load page:', error)
      return defaultData
    }
  }
  
  // Save with localStorage backup
  static async savePageWithBackup(pageName: string, data: Data, isPublished: boolean = false) {
    try {
      // Save to database
      const result = await PuckDatabase.savePage({
        page_name: pageName,
        page_data: data,
        is_published: isPublished
      })
      
      // Backup to localStorage
      const localKey = `puck-${pageName}-data`
      localStorage.setItem(localKey, JSON.stringify(data))
      localStorage.setItem(`${localKey}-timestamp`, new Date().toISOString())
      
      return result
    } catch (error) {
      console.error('❌ Database save failed, saving to localStorage only:', error)
      // Fallback to localStorage only
      const localKey = `puck-${pageName}-data`
      localStorage.setItem(localKey, JSON.stringify(data))
      localStorage.setItem(`${localKey}-timestamp`, new Date().toISOString())
      localStorage.setItem(`${localKey}-failed`, 'true')
      throw error
    }
  }
  
  // Export page data
  static exportPage(pageName: string, data: Data) {
    const exportData = {
      page_name: pageName,
      page_data: data,
      exported_at: new Date().toISOString(),
      version: Date.now()
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${pageName}_${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    console.log('📤 Page exported:', exportFileDefaultName)
  }
  
  // Import page data
  static importPage(file: File): Promise<{page_name: string, page_data: Data}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string
          const importData = JSON.parse(result)
          
          if (!importData.page_name || !importData.page_data) {
            throw new Error('Invalid file format')
          }
          
          console.log('📥 Page imported:', importData.page_name)
          resolve({
            page_name: importData.page_name,
            page_data: importData.page_data
          })
        } catch (error) {
          console.error('❌ Import failed:', error)
          reject(error)
        }
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsText(file)
    })
  }
  
  // Get page statistics
  static async getPageStats(pageName: string) {
    try {
      const page = await PuckDatabase.loadPage(pageName)
      if (!page) {
        return null
      }
      
      const content = page.page_data?.content || []
      const componentCounts: {[key: string]: number} = {}
      
      content.forEach((item: any) => {
        const type = item.type || 'Unknown'
        componentCounts[type] = (componentCounts[type] || 0) + 1
      })
      
      return {
        page_name: pageName,
        component_count: content.length,
        component_types: componentCounts,
        is_published: page.is_published,
        last_updated: page.updated_at,
        version: page.version
      }
    } catch (error) {
      console.error('❌ Failed to get page stats:', error)
      return null
    }
  }
  
  // Validate page data
  static validatePageData(data: Data): {isValid: boolean, errors: string[]} {
    const errors: string[] = []
    
    if (!data) {
      errors.push('Page data is required')
      return {isValid: false, errors}
    }
    
    if (!data.content || !Array.isArray(data.content)) {
      errors.push('Page content must be an array')
    }
    
    if (!data.root) {
      errors.push('Page root is required')
    }
    
    // Check for duplicate IDs
    const ids: string[] = []
    data.content?.forEach((item: any, index: number) => {
      if (item.props?.id) {
        if (ids.includes(item.props.id)) {
          errors.push(`Duplicate ID found: ${item.props.id}`)
        } else {
          ids.push(item.props.id)
        }
      } else {
        errors.push(`Component at index ${index} is missing an ID`)
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Clear local storage for a page
  static clearLocalStorage(pageName: string) {
    const keys = [
      `puck-${pageName}-data`,
      `puck-${pageName}-data-timestamp`,
      `puck-${pageName}-data-failed`
    ]
    
    keys.forEach(key => {
      localStorage.removeItem(key)
    })
    
    console.log('🧹 Local storage cleared for:', pageName)
  }
  
  // Get all local storage backups
  static getLocalBackups(): {[pageName: string]: {data: Data, timestamp: string, failed?: boolean}} {
    const backups: {[pageName: string]: {data: Data, timestamp: string, failed?: boolean}} = {}
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('puck-') && key.endsWith('-data')) {
        const pageName = key.replace('puck-', '').replace('-data', '')
        const dataStr = localStorage.getItem(key)
        const timestampStr = localStorage.getItem(`${key}-timestamp`)
        const failed = localStorage.getItem(`${key}-failed`) === 'true'
        
        if (dataStr && timestampStr) {
          try {
            backups[pageName] = {
              data: JSON.parse(dataStr),
              timestamp: timestampStr,
              failed
            }
          } catch (error) {
            console.warn('Invalid backup data for:', pageName)
          }
        }
      }
    }
    
    return backups
  }
}