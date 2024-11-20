import React, { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import { useSession, useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import Jobcard from "@/components/job-card";

const JobListing = () => {
  const[searchQuery,setSearchQuery]=useState("");
  const[location,setLocation]=useState("");
  const[company_id,setCompany_id]=useState("");
  const {isLoaded}=useUser();

const{
  fn:fnJobs,
  data:jobs,
  loading:loadingJobs
}=useFetch(getJobs,{
  location,
  company_id,
  searchQuery,
});

console.log(jobs);

  useEffect(() => {
    if(isLoaded) fnJobs();
  }, []);
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return <div>
    <h1 className="greadient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

    {/* {Add Filters} */}

    {loadingJobs==false && (
      <BarLoader className="mt-4" width={"100%"} color="#36d7b7"/>
    )}

    {loadingJobs==false &&(
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.length?(
          jobs.map((job)=>{
            return <Jobcard key={job.id} job={job} savedInit={job?.saved?.length>0}/>
          })
        )
      :(
        <div>No Jobs Found </div>
      )
      }
        </div>
    )}
  </div>
};

export default JobListing;
