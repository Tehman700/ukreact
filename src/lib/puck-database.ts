import { supabase } from './supabase'

// Database functions for Puck Editor
export class PuckDatabase {
  // Save page data to Supabase
  static async savePage(pageData: {
    page_name: string
    page_data: any
    is_published?: boolean
  }) {
    try {
      console.log('💾 Saving page to Supabase:', pageData.page_name)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .upsert({
          page_name: pageData.page_name,
          page_data: pageData.page_data,
          is_published: pageData.is_published || false,
          updated_at: new Date().toISOString(),
          version: Date.now() // Simple versioning using timestamp
        }, {
          onConflict: 'page_name'
        })
        .select()

      if (error) {
        console.error('❌ Error saving page:', error)
        throw error
      }

      console.log('✅ Page saved to Supabase:', data)
      return data[0]
    } catch (error) {
      console.error('❌ Failed to save page:', error)
      throw error
    }
  }

  // Load page data from Supabase
  static async loadPage(pageName: string) {
    try {
      console.log('📥 Loading page from Supabase:', pageName)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .select('*')
        .eq('page_name', pageName)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('❌ Error loading page:', error)
        throw error
      }

      if (data) {
        console.log('✅ Page loaded from Supabase:', data.page_name)
      } else {
        console.log('📝 No page found with name:', pageName)
      }
      return data
    } catch (error) {
      console.error('❌ Failed to load page:', error)
      return null
    }
  }

  // Get all pages
  static async getAllPages() {
    try {
      console.log('📋 Fetching all pages from Supabase...')
      
      const { data, error } = await supabase
        .from('puck_pages')
        .select('id, page_name, created_at, updated_at, is_published, version')
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching pages:', error)
        throw error
      }

      console.log('✅ Pages fetched from Supabase:', data?.length || 0, 'pages')
      return data
    } catch (error) {
      console.error('❌ Failed to fetch pages:', error)
      throw error
    }
  }

  // Publish page (make it live)
  static async publishPage(pageName: string) {
    try {
      console.log('🚀 Publishing page:', pageName)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .update({
          is_published: true,
          updated_at: new Date().toISOString()
        })
        .eq('page_name', pageName)
        .select()

      if (error) {
        console.error('❌ Error publishing page:', error)
        throw error
      }

      console.log('✅ Page published:', data)
      return data[0]
    } catch (error) {
      console.error('❌ Failed to publish page:', error)
      throw error
    }
  }

  // Get published page data
  static async getPublishedPage(pageName: string) {
    try {
      console.log('📖 Loading published page from Supabase:', pageName)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .select('*')
        .eq('page_name', pageName)
        .eq('is_published', true)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Error loading published page:', error)
        throw error
      }

      if (data) {
        console.log('✅ Published page loaded:', data.page_name)
      } else {
        console.log('📝 No published page found with name:', pageName)
      }
      return data
    } catch (error) {
      console.error('❌ Failed to load published page:', error)
      return null
    }
  }

  // Get draft page data (unpublished)
  static async getDraftPage(pageName: string) {
    try {
      console.log('📝 Loading draft page from Supabase:', pageName)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .select('*')
        .eq('page_name', pageName)
        .eq('is_published', false)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Error loading draft page:', error)
        throw error
      }

      if (data) {
        console.log('✅ Draft page loaded:', data.page_name)
      } else {
        console.log('📝 No draft page found with name:', pageName)
      }
      return data
    } catch (error) {
      console.error('❌ Failed to load draft page:', error)
      return null
    }
  }

  // Delete page
  static async deletePage(pageName: string) {
    try {
      console.log('🗑️ Deleting page from Supabase:', pageName)
      
      const { error } = await supabase
        .from('puck_pages')
        .delete()
        .eq('page_name', pageName)

      if (error) {
        console.error('❌ Error deleting page:', error)
        throw error
      }

      console.log('✅ Page deleted from Supabase')
      return true
    } catch (error) {
      console.error('❌ Failed to delete page:', error)
      throw error
    }
  }

  // Duplicate page
  static async duplicatePage(sourceName: string, newName: string) {
    try {
      console.log('📄 Duplicating page:', sourceName, '→', newName)
      
      // First, get the source page
      const sourcePage = await this.loadPage(sourceName)
      if (!sourcePage) {
        throw new Error(`Source page '${sourceName}' not found`)
      }

      // Create new page with copied data
      const { data, error } = await supabase
        .from('puck_pages')
        .insert({
          page_name: newName,
          page_data: sourcePage.page_data,
          is_published: false, // New pages are always drafts
          version: Date.now()
        })
        .select()

      if (error) {
        console.error('❌ Error duplicating page:', error)
        throw error
      }

      console.log('✅ Page duplicated successfully:', data)
      return data[0]
    } catch (error) {
      console.error('❌ Failed to duplicate page:', error)
      throw error
    }
  }

  // Get page history/versions
  static async getPageHistory(pageName: string) {
    try {
      console.log('📚 Fetching page history for:', pageName)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .select('id, version, created_at, updated_at, is_published')
        .eq('page_name', pageName)
        .order('version', { ascending: false })

      if (error) {
        console.error('❌ Error fetching page history:', error)
        throw error
      }

      console.log('✅ Page history fetched:', data?.length || 0, 'versions')
      return data
    } catch (error) {
      console.error('❌ Failed to fetch page history:', error)
      throw error
    }
  }

  // Backup page data
  static async backupPage(pageName: string) {
    try {
      console.log('💾 Creating backup for page:', pageName)
      
      const page = await this.loadPage(pageName)
      if (!page) {
        throw new Error(`Page '${pageName}' not found`)
      }

      // Create backup with timestamp
      const backupName = `${pageName}_backup_${Date.now()}`
      const { data, error } = await supabase
        .from('puck_pages')
        .insert({
          page_name: backupName,
          page_data: page.page_data,
          is_published: false,
          version: Date.now()
        })
        .select()

      if (error) {
        console.error('❌ Error creating backup:', error)
        throw error
      }

      console.log('✅ Backup created:', backupName)
      return data[0]
    } catch (error) {
      console.error('❌ Failed to create backup:', error)
      throw error
    }
  }

  // Search pages by name or content
  static async searchPages(searchTerm: string) {
    try {
      console.log('🔍 Searching pages for:', searchTerm)
      
      const { data, error } = await supabase
        .from('puck_pages')
        .select('id, page_name, created_at, updated_at, is_published')
        .or(`page_name.ilike.%${searchTerm}%,page_data::text.ilike.%${searchTerm}%`)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('❌ Error searching pages:', error)
        throw error
      }

      console.log('✅ Search completed:', data?.length || 0, 'results')
      return data
    } catch (error) {
      console.error('❌ Failed to search pages:', error)
      throw error
    }
  }
}