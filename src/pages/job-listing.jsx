import React, { useEffect } from "react";
import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";

const JobListing = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    if (!session) {
      console.warn("Session is undefined. Ensure the user is logged in.");
      return;
    }

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      if (!supabaseAccessToken) {
        throw new Error("Supabase token could not be retrieved.");
      }

      const data = await getJobs(supabaseAccessToken);
      console.log("Jobs data:", data);
      console.log(import.meta.env.VITE_SUPABASE_URL)
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [session]);

  return <div>JobListing</div>;
};

export default JobListing;
