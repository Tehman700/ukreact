import { createClient } from '@supabase/supabase-js'

// Supabase configuration - access environment variables properly
const supabaseUrl = 'https://vzfmkofzkrgawlmoidlg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6Zm1rb2Z6a3JnYXdsbW9pZGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTA2MjYsImV4cCI6MjA3MzE2NjYyNn0.6SsUEcOL5H9EGGUhGNMplmnFWBn7tgImpYDJ0RYWVyY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Debug logging to verify configuration
console.log('🔧 Supabase Configuration:')
console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
console.log('Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing')

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('puck_pages').select('count').limit(1)
    if (error) {
      console.error('❌ Supabase connection test failed:', error)
      return false
    }
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection error:', error)
    return false
  }
}

// Database types
export interface PuckPageData {
  id: string
  page_name: string
  page_data: any
  created_at: string
  updated_at: string
  version: number
  is_published: boolean
}

export interface PuckComponent {
  id: string
  component_type: string
  component_data: any
  page_id: string
  order_index: number
  created_at: string
  updated_at: string
}