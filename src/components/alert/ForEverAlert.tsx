import { useState } from 'react';
import './ForEverAlert.css';
import { FaRegCircleCheck } from "react-icons/fa6";
import { TApproveResponse } from '@/pages/todoList/corporateAccountOpening/corporateAccountOpening';
import { Card } from '../ui/card';

interface AlertProps {
    type: string;
    message?: string;
    onClose: () => void;
    info:TApproveResponse;
}
// const Alert = ({ type, message, onClose }: AlertProps) => {
const Alert = ({ type, onClose,info }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const alertClass = `alert alert-${type} ${isVisible ? 'fade-in' : 'fade-out'}`;


  return (
    <div className="alert-overlay">
      <div className={alertClass}>
        <div className="alert-title">
          <FaRegCircleCheck className="alert-icon" />
          <span className="alert-title-text">Approve Successful</span>
        </div>
        <div className="alert-loader"></div>
        {/* <span className="alert-message">{message}</span> */}
        <button className="alert-close" data-testid="closeAlert" onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}>&times;</button>
        <div className="w-[600px] absolute bg-white top-24 p-4 rounded-b-[20px]">
          <Card className="flex p-4  space-y-4 jurify-center flex-col">
            <span className="flex space-x-4"><span className="font-bold">Corporate name:</span> <span>{info.name}</span></span>
            <span className=""><span className="font-bold">Corporate code:</span> <span>{info.corporateCode}</span></span>
            <span className=""><span className="font-bold">Username:</span> <span>{info.username}</span></span>
            <span className=""><span className="font-bold">Password:</span> <span>{info.password}</span></span>
          </Card>
      </div>
      </div>
    </div>
  );
};

export default Alert;