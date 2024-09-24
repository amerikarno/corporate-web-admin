import { useEffect, useState } from 'react';
import './Alert.css';
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";

interface AlertProps {
    type: string;
    message?: string;
    onClose: () => void;
}
// const Alert = ({ type, message, onClose }: AlertProps) => {
const Alert = ({ type, onClose }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const alertClass = `alert alert-${type} ${isVisible ? 'fade-in' : 'fade-out'}`;

  useEffect(() => {
    // Set a timer to close the alert after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for the fade-out animation to complete
    }, 5000);

    // Clear the timer if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="alert-overlay">
      <div className={alertClass}>
        <div className="alert-title">
          {type === 'success' ? <FaRegCircleCheck className="alert-icon" /> : <FaRegCircleXmark className="alert-icon" />}
          <span className="alert-title-text">{type === 'success' ? "Verification Selected" : "Something went wrong"}</span>
        </div>
        <div className="alert-loader"></div>
        {/* <span className="alert-message">{message}</span> */}
        <button className="alert-close" data-testid="closeAlert" onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}>&times;</button>
      </div>
    </div>
  );
};

export default Alert;