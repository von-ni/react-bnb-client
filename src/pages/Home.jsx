import noBgLogo from '../img/logo-no-background.png';
import Rooms from './Rooms';

export default function Home() {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <img
          src="https://www.treehugger.com/thmb/IAlZGVzhRLGZL_E0zSv7qbzyGRA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          alt="Logo"
        />
        <img
          src={noBgLogo}
          style={{
            width: '20%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          alt="Logo"
        />
      </div>
      <Rooms />
    </div>
  );
}
