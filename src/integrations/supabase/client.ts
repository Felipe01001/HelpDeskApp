
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ukftwcsxxeynrytujvkg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZnR3Y3N4eGV5bnJ5dHVqdmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDY3MzEsImV4cCI6MjA2MzU4MjczMX0.ZqAzDONxe1AtVpeLbwYsD69f2pYHMwxMaI0BkeFshZE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
