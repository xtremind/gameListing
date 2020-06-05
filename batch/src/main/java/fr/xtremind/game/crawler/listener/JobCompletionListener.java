package fr.xtremind.game.crawler.listener;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;

public class JobCompletionListener extends JobExecutionListenerSupport {

	@Override
	public void afterJob(JobExecution jobExecution) {
		ExitStatus exitStatus = jobExecution.getExitStatus() ;
		System.out.println("BATCH JOB exitStatus " + exitStatus);
		BatchStatus batchStatus = jobExecution.getStatus();
		System.out.println("BATCH JOB batchStatus " + batchStatus);


        if(exitStatus == ExitStatus.COMPLETED ){
            System.exit(0);
        }

        if(exitStatus == ExitStatus.FAILED ){
            System.exit(4);
		}
		
		if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
			System.out.println("BATCH JOB COMPLETED SUCCESSFULLY");
			//System.exit(0);
		} else if(jobExecution.getStatus() == BatchStatus.FAILED){
			System.out.println("BATCH JOB ERROR");
			//System.exit(-1);
			//job failure
		}
	}

}
