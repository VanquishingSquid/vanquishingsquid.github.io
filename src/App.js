import Main from './Content/Main';

import { useId, useRef, useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const renderPage = () => {
    switch(currentPage) {
      default:
        return <Main setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;