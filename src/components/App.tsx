import '../styles/App.css';
import FileComponent from './FileComponent';
import WorkspaceSearch from './WorkspaceSearch';

function App() {
  return (
    <div className="App">
      <div className="mt-5 container h-100 w-100">
        <div className="mx-auto my-auto">
          <WorkspaceSearch/>
        </div>
      </div>
    </div>
  );
}

export default App;
