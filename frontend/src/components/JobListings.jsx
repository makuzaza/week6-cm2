import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const API_BASE = import.meta.env.VITE_API_URL;

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome
        ? `${API_BASE}/api/jobs?_limit=3`
        : `${API_BASE}/api/jobs`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
        setAllJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (query.trim() === '') {
      setJobs(allJobs);
      return;
    }

    const filtered = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.salary.toString().toLowerCase().includes(query) ||
        job.company.description.toLowerCase().includes(query) ||
        job.company.contactEmail.toLowerCase().includes(query) ||
        job.company.contactPhone.toLowerCase().includes(query)
    );

    setJobs(filtered);
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {!isHome && (
          <div className='mb-6 text-center'>
            <input
              type='text'
              placeholder='Search...'
              className='border rounded w-full md:w-1/2 py-2 px-4'
              onChange={handleSearch}
            />
          </div>      
        )}

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
