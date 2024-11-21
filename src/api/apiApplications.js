import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials are missing.");
  }
const supabase = createClient(supabaseUrl, supabaseKey);
// - Apply to job ( candidate )
export async function applyToJob(token, _, jobData) {
//   const supabase = await SupabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) throw new Error("Error uploading Resume");

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}

// - Edit Application Status ( recruiter )
export async function updateApplicationStatus(token, { job_id }, status) {
    // const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("job_id", job_id)
      .select();
  
    if (error || data.length === 0) {
      console.error("Error Updating Application Status:", error);
      return null;
    }
  
    return data;
  }