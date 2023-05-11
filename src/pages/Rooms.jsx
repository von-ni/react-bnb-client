import { Link } from 'react-router-dom';
import { roomType } from '../data-room';

export default function Rooms() {
  return (
    <div className="container-room">
      <div>
        <h1>Room Type</h1>
      </div>
      <div>
        <h6>Click to discover more details.</h6>
      </div>
      <nav>
        <div className="gallery">
          {roomType.map((x, i) => (
            <Link key={i} className="gallery-item" to={'/rooms/' + x.name}>
              <img className="gallery-image" src={x.source} alt={x.name} />
              <p className="romm-name">{x.name}</p>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
