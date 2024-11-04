
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

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