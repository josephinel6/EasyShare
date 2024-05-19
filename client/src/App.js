import './App.css';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Welcome />
      </div>
    </Provider>
  );
}

export default App;
