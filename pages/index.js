import Head from 'next/head';
import Link from 'next/link';
import { JobCard } from '../components/JobCard';
import { getJobs, deleteJob } from '../features/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const dispatch = useDispatch();

  const { jobs, isLoading } = useSelector((state) => state.jobState);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleDeleteJob = (jobID) => {
    dispatch(deleteJob(jobID));
  };

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h2 className="text-center text-3xl">Dashboard</h2>
        <div className="px-20  3xl:columns-5 2xl:columns-4 xl:columns-3 lg:columns-2 gap-0">
          {jobs.map((job, index) => {
            return (
              <JobCard job={job} key={index} deleteJob={handleDeleteJob} />
            );
          })}
        </div>
      </main>
    </div>
  );
}
