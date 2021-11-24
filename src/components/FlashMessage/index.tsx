import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface IFashMessageProps {
    duration: number
}

const FlashMessage: React.FunctionComponent<IFashMessageProps> = function ({ duration }) {
  const { flashMessages, popFlashMessage } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flashMessages.length > 0) {
        popFlashMessage();
      }
    }, duration);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashMessages]);

  return (
    <div>
      {flashMessages.length > 0 && (
      <div className="pt-3">
        {flashMessages.map(({ message, type }) => (
          <div key={`${message}-${Math.random()}`} className={`alert alert-${type}`} role="alert">
            {message}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default FlashMessage;
