export default function cronjob(execTime, intervalTime, job) {
  const currentTime = new Date().getTime(); //get current time
  let timeLeft;
  if (currentTime < execTime) {
    //currently earlier than execTime
    timeLeft = execTime - currentTime;
  } else {
    //currently later than execTime, schedule for next job
    timeLeft = execTime + intervalTime - currentTime;
  }
  setTimeout(() => {
    job();
    setInterval(() => {
      job();
    }, intervalTime); //repeat every intervalTime
  }, timeLeft); //wait until execTime
}
