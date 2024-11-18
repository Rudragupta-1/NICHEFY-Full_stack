import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase credentials are missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getJobs(token) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*");

    if (error) {
      console.error("Error fetching jobs:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in Supabase query:", error);
    return null;
  }
}
