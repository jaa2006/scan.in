import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Flashlight, Image, ArrowLeft } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

function Scanner() {
  const navigate = useNavigate();
  const { addItem } = useHistory();
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;

    const startScanner = async () => {
      if (!scannerContainerRef.current) return;

      try {
        html5QrCode = new Html5Qrcode("scanner");
        scannerRef.current = html5QrCode;
        
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            // On success
            setScanSuccess(true);
            handleScanSuccess(decodedText);
          },
          (errorMessage) => {
            // On error
            console.log(errorMessage);
          }
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
      }
    };
  }, []);

  const handleScanSuccess = (decodedText: string) => {
    // Stop the scanner
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(err => console.error("Error stopping scanner:", err));
    }

    // Save to history
    addItem(decodedText);

    // Check if the scanned content is a URL
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    if (urlRegex.test(decodedText)) {
      // If it's a URL, ensure it has a protocol
      let url = decodedText;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      // Open the URL in a new tab
      window.open(url, '_blank');
      // Navigate back to home
      navigate('/');
    } else {
      // For non-URL content, navigate to result page
      navigate('/result', { state: { result: decodedText } });
    }
  };

  const handleClose = () => {
    // Stop the scanner and navigate back
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(err => console.error("Error stopping scanner:", err));
    }
    navigate('/');
  };

  const toggleFlashlight = async () => {
    if (!scannerRef.current) return;

    try {
      if (flashlightOn) {
        await scannerRef.current.turnOffFlash();
      } else {
        await scannerRef.current.turnOnFlash();
      }
      setFlashlightOn(!flashlightOn);
    } catch (err) {
      console.error("Flashlight not supported on this device:", err);
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0] && scannerRef.current) {
        const imageFile = target.files[0];
        
        scannerRef.current.stop().then(() => {
          scannerRef.current!.scanFile(imageFile, true)
            .then(decodedText => {
              handleScanSuccess(decodedText);
            })
            .catch(err => {
              console.log(`Error scanning file: ${err}`);
              // Restart the scanner
              startScannerAfterFileError();
            });
        });
      }
    };
    input.click();
  };

  const startScannerAfterFileError = () => {
    if (!scannerRef.current) return;
    
    scannerRef.current.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      },
      (decodedText) => {
        setScanSuccess(true);
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  };

  return (
    <div className="scanner-container">
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <button 
          onClick={handleClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="text-white text-lg font-medium">Back to Home</span>
      </div>

      <div className={`scan-area ${scanSuccess ? 'success-scan' : ''}`}>
        <div id="scanner" ref={scannerContainerRef} className="w-full h-full"></div>
      </div>

      <div className="flex space-x-6 mt-8">
        <button 
          onClick={toggleFlashlight}
          className={`w-12 h-12 flex items-center justify-center rounded-full ${flashlightOn ? 'bg-blue-500' : 'bg-gray-800'} text-white`}
        >
          <Flashlight size={24} />
        </button>
        
        <button 
          onClick={handleFileUpload}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white"
        >
          <Image size={24} />
        </button>
      </div>
    </div>
  );
}

export default Scanner;