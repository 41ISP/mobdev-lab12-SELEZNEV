import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [dogUrls, setDogUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const urls = [];
      for (let i = 0; i < 4; i++) {
        const response = await fetch('https://random.dog/woof.json');
        const data = await response.json();
        urls.push(data.url);
      }
      setDogUrls(urls);
    } catch (err) {
      setError('Не удалось загрузить собак. Попробуйте снова!');
      console.error('Error fetching dogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (url) => {
    navigate(`/image/${encodeURIComponent(url)}`);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div className="home-container">
      <div className="dog-card">
        <h1 className="title">🐕 Галерея Случайных Собак 🐕</h1>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Загрузка ваших пушистых друзей...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
            <button onClick={fetchDogs} className="retry-btn">Попробовать снова</button>
          </div>
        ) : (
          <>
            <div className="dog-grid">
              {dogUrls.map((url, index) => (
                <div 
                  key={index} 
                  className="dog-grid-item"
                  onClick={() => handleImageClick(url)}
                >
                  <img 
                    src={url} 
                    alt={`Dog ${index + 1}`} 
                    className="dog-grid-image"
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={fetchDogs} 
              className="fetch-btn"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : '🐾 Получить Новых Собак 🐾'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

