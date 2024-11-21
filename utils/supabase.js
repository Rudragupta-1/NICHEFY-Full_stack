
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.SUPABASE_URL
export const supabaseKey = process.env.SUPABASE_KEY

const supabaseClinet=async(supabaseAccessToken)=>{
    const supabase = createClient(supabaseUrl, supabaseKey,{
    global:{
        headers:{
            Authorization:`Bearer ${supabaseAccessToken}`,
        },
    },
});
    return supabase;
}
export default SupabaseClient;