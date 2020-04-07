import React from 'react';
import {useState, useEffect} from 'react';

export const usePosition = () : {position, error} => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  
  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { position, error};
}

export const BrowserLocation = () => {
    const { position, error } = usePosition();

    return (
        <code>
            latitude: {position.latitude}<br/>
            longitude: {position.longitude}<br/>
            error: {error}
        </code>        
    )
}
