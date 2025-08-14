import { useState, useRef, useEffect } from 'react'
import QRCodeStyling from 'qr-code-styling'
import './App.css'

function App() {
  const [url, setUrl] = useState('https://gemini.google.com');
  const [dotColor, setDotColor] = useState('#F9FAFB');
  const [backgroundColor, setBackgroundColor] = useState('#1F2937');
  const [dotStyle, setDotStyle] = useState('rounded');

  const ref = useRef(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    if (ref.current) {
        const qrInstance = new QRCodeStyling({
            width: 260,
            height: 260,
            data: url,
            dotsOptions: { color: dotColor, type: dotStyle },
            backgroundOptions: { color: backgroundColor },
            imageOptions: { crossOrigin: 'anonymous', margin: 20 }
        });
        // Clear previous QR code before appending a new one
        ref.current.innerHTML = '';
        qrInstance.append(ref.current);
        setQrCode(qrInstance);
    }
  }, []);

  useEffect(() => {
    if (qrCode) {
      qrCode.update({
        data: url,
        dotsOptions: { color: dotColor, type: dotStyle },
        backgroundOptions: { color: backgroundColor }
      });
    }
  }, [url, dotColor, backgroundColor, dotStyle, qrCode]);

  const onDownloadClick = () => {
    if (qrCode) {
      qrCode.download({ name: 'qrtist-code', extension: 'png' });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <div className="qr-panel">
          <div className="qr-code-container" ref={ref}></div>
        </div>
        <div className="controls-panel">
          <h1>QRtist</h1>
          <div className="control-group">
            <label>Your URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-base"
            />
          </div>
          <div className="control-group">
            <label>Dot Color</label>
            <div className="color-input-wrapper">
               <input 
                  type="color" 
                  value={dotColor} 
                  onChange={(e) => setDotColor(e.target.value)} 
                />
                <span>{dotColor}</span>
            </div>
          </div>
          <div className="control-group">
            <label>Background Color</label>
             <div className="color-input-wrapper">
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)} 
                />
                <span>{backgroundColor}</span>
             </div>
          </div>
          <div className="control-group">
            <label>Dot Style</label>
            <select 
              value={dotStyle} 
              onChange={(e) => setDotStyle(e.target.value)}
              className="input-base"
            >
              <option value="rounded">Rounded</option>
              <option value="dots">Dots</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy Rounded</option>
              <option value="square">Square</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>
          <button className="download-btn" onClick={onDownloadClick}>
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
