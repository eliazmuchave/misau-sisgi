import {Badge} from "reactstrap";

export default function DaysInProgressBadge({task}){

    const differenceAfterDone = () => {
       const dateDiff = new Date(task.updated) - new Date(task.startDate);
       return Math.ceil( dateDiff/ (1000 * 60 * 60 * 24));
    }

    const differenceInProgress = () => {
        const dateDiff = new Date() - new Date(task.startDate);
        return Math.ceil( dateDiff/ (1000 * 60 * 60 * 24));
    }
    return (
        <>
            <span>

                <i className="fa fa-clock mr-2"></i>
                {task.done? <Badge color = "success"> <strong>{differenceAfterDone()} {differenceAfterDone() != 1? "Dias": "Dia"}</strong></Badge>: null }
                {task.closed? <Badge color = "danger"> <strong>{differenceAfterDone()} {differenceAfterDone() != 1? "Dias": "Dia"}</strong></Badge>: null }
                {(!task.done && !task.closed)?  <strong>{differenceInProgress() } {differenceInProgress() != 1? "Dias": "Dia"} </strong>: null }
            </span>



        </>
    );
}