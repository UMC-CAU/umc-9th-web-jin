import './App.css'
import RandomNumberGenerater from './components/RandomNumberGenerater'
import Counter from './components/Counter'

function App() {

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 100
    }}
    >
    <Counter />
    <RandomNumberGenerater />
    </div>
  );
}

export default App;
