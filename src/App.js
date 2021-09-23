import './App.css';
import DisplayTable from './component/DisplayTable';
import ToDoFormInput from './component/ToDoFormInput';

function App() {
  return (
    <div className="App">
      <ToDoFormInput />
      <DisplayTable />
    </div>
  );
}

export default App;
