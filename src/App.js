import { Routes, Route, useLocation } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <main>
      <div className='container'>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            {/* Says in V6 of React Routes no need for keyword/attribute 'exact'
            because it's routes match exactly by default
        */}
            <Route path='/' element={<Search />} />
            <Route path='/user/:username' element={<User />} />
          </Routes>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
