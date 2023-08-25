import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from "../../hooks/fetch-hook.js";

const requestConfig = {
  url: 'https://react-http-51865-default-rtdb.firebaseio.com/tasks.json',
  method: 'POST',
  body: "",
  headers: {
    'Content-Type': 'application/json',
  }
};

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTask } = useHttp();
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText};
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    requestConfig.body = JSON.stringify({text: taskText})
    sendTask(requestConfig, createTask.bind(null, taskText));
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
