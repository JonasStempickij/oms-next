import Head from 'next/head';
import { useRouter } from 'next/router';
import { JobCard } from '../components/JobCard';
import { getJobs, deleteJob } from '../features/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { jobs, isLoading } = useSelector((state) => state.jobState);
  const { userId } = useSelector((state) => state.authState);

  useEffect(() => {
    if (!userId) router.push('/login');
    dispatch(getJobs());
  }, [dispatch, router, userId]);

  const handleDeleteJob = (jobID) => {
    dispatch(deleteJob(jobID));
  };

  return (
    <div className="">
      <Head>
        <title>OMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-10 flex flex-col gap-10">
        <SearchForm />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="self-center md:columns-2 xl:columns-3 2xl:columns-4">
            {jobs.map((job, index) => {
              return (
                <JobCard job={job} key={index} deleteJob={handleDeleteJob} />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
