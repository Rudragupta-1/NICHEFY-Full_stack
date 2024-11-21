import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase credentials are missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);


export async function getJobs(token,{location,comapny_id,searchQuery}) {
  if(location){
    query=query.eq("location",location);
  }
  if(comapny_id){
    query=query.eq("company_id",comapny_id);
  }
  if(searchQuery){
    query=query.ilike("title",`%${searchQuery}%`);
  }
  
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*,company:companies(name,logo_url), saved:saved_jobs(id)");

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


export async function saveJob(token, { alreadySaved }, saveData) {
  // const supabase = await SupabaseClient(token);

  if (alreadySaved) {
    // If the job is already saved, remove it
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return data;
    }

    return data;
  } else {
    // If the job is not saved, add it to saved jobs
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
}

// Read single job
export async function getSingleJob(token, { job_id }) {
  // const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  // const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

  // - post job
  export async function addNewJob(token, _, jobData) {
    // const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error Creating Job");
    }
  
    return data;
  }