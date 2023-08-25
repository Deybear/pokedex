import './App.css';
import Header from './components/Header';
import AppRouter from './router/AppRouter';

function App() 
{
  return (

    <div className="App">

      <AppRouter/>
      <Header/>

    </div>
    
  );
}

export default App;
