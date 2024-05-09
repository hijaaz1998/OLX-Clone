function App() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editableId, setEditableId] = useState(null);
    const [editedText, setEditedText] = useState('');
  
    const addNewTodo = () => {
      if (toDo.trim() === '') {
        setErrorMessage('Please enter a task!');
        return;
      }
  
      if (toDos.some(todo => todo.text === toDo)) {
        setErrorMessage('This task already exists!');
        return;
      }
  
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo('');
      setErrorMessage('');
    };