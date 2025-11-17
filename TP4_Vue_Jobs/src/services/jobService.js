
import jobsData from'../../emplois.json';

const STORAGE_KEY  = 'jobs';
export function getJobs(){
    const storedJobs =localStorage.getItem(STORAGE_KEY);
    return storedJobs ? JSON.parse(storedJobs) : jobsData.emplois;

}
export function saveJobs(jobs){
    localStorage.setItem(STORAGE_KEY ,JSON.stringify(jobs));

}

