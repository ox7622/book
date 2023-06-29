
import './App.css';
import Book from '../Book/Book';
import { useCallback, useEffect, useState } from 'react';
import { book } from '../../constants/data';
import { moviesApi } from '../../utils/MoviesApi';
function App() {

  const [message, setMessage] = useState('');
  const [error, sendError] = useState('');
  const [data, setData] = useState({});
  useEffect(() => {
    const bookData = window.localStorage.getItem('apiDat');
    if (bookData) {
      setData(JSON.parse(bookData));
    } else {
      getData();
    }


  }, [])

  const getData = useCallback(async () => {
    try {
      const data = await moviesApi.getMoviesData();
      if (data) {
        window.localStorage.setItem('apiDat', JSON.stringify(data));
        setData(data);
      }
      window.localStorage.setItem('book', JSON.stringify(book));

    }
    catch (err) {
      sendError(err)
    }
    finally {

    }


  }, [])

  return (
    <div className="App">

      <Book message={message} setMessage={setMessage} error={error} sendError={sendError} data={data} />
    </div>
  );
}

export default App;
