import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

interface IFashMessageProps {
    duration: number
}

const FlashMessage: React.FunctionComponent<IFashMessageProps> = function ({ duration }) {
  const { flashMessages, popFlashMessage } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      popFlashMessage();
    }, duration);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      {flashMessages.length > 0 && (
      <div className="pt-3">
        {flashMessages.map(({ message, type }) => (
          <div key={message} className={`alert alert-${type}`} role="alert">
            {message}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default FlashMessage;
