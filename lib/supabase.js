import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yhzkgfgwblhwuatkpmbg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloemtnZmd3Ymxod3VhdGtwbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDc4MTksImV4cCI6MjA2MzgyMzgxOX0.SG_aqjc9bvXaiUTvObK8pmNw0ZlSUpFAksP4ejZvciI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)