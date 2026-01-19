import { useParams, useNavigate } from 'react-router-dom';
import './ImagePage.css';

function ImagePage() {
  const { url } = useParams();
  const navigate = useNavigate();
  
  const decodedUrl = decodeURIComponent(url || '');

  return (
    <div className="image-page-container">
      <div className="image-page-card">
        <button 
          onClick={() => navigate('/')} 
          className="back-btn"
        >
          ← Назад в Галерею
        </button>
        
        <div className="full-image-container">
          <img 
            src={decodedUrl} 
            alt="Dog" 
            className="full-dog-image"
          />
        </div>
      </div>
    </div>
  );
}

export default ImagePage;

