import {Badge} from "reactstrap";

export default function WorkflowStatusBadge({task}){

    return (
        <>
            {(!task.done && ! task.closed)? task?.currentStatus: null }
            {(task.done)? <Badge color="success"> <strong>Concluído</strong></Badge>: null }
            {(!task.done &&  task.closed)? <Badge color="danger"> <strong>Fechado</strong></Badge>: null }

        </>
    );


}