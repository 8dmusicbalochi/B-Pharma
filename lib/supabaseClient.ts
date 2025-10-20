import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://aalssohunyxerncystdm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbHNzb2h1bnl4ZXJuY3lzdGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDkyOTUsImV4cCI6MjA3NjUyNTI5NX0.-SWGrWQyeRILak9QKweM6PHyyiXIxXWhbdeTrrottCg";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
