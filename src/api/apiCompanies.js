import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials are missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
export async function getCompanies(token) {
    // const supabase = await supabaseClient(token);
    const { data, error } = await supabase.from("companies").select("*");

    if (error) {
        console.error("Error fetching Companies:", error);
        return null;
    }

    return data;
}