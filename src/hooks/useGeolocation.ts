import { useState, useEffect, useCallback } from 'react';

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number | null;
  city: string;
  active: boolean;
  error: string | null;
  loading: boolean;
  permissionState: 'prompt' | 'granted' | 'denied' | 'unknown';
}

export function useGeolocation() {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: -23.5505, // Default São Paulo center
    lng: -46.6333,
    accuracy: 15,
    city: 'São Paulo, SP',
    active: false,
    error: null,
    loading: true,
    permissionState: 'unknown',
  });

  const requestGps = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setUserLocation(prev => ({
        ...prev,
        active: false,
        loading: false,
        error: 'Navegador não possui suporte a GPS Geolocation.',
      }));
      return;
    }

    setUserLocation(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          city: 'Localização Atual (GPS Ativo)',
          active: true,
          error: null,
          loading: false,
          permissionState: 'granted',
        });
      },
      (err) => {
        console.warn('GPS position error:', err.message);
        setUserLocation(prev => ({
          ...prev,
          active: false,
          loading: false,
          error: err.code === err.PERMISSION_DENIED
            ? 'Permissão de GPS negada. Ative a localização no seu navegador.'
            : 'Não foi possível obter a localização GPS em tempo real.',
          permissionState: err.code === err.PERMISSION_DENIED ? 'denied' : 'unknown',
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }, []);

  useEffect(() => {
    // Attempt initial GPS fetch
    requestGps();

    // Listen for continuous updates
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setUserLocation(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
            accuracy: Math.round(accuracy),
            city: 'Sinal GPS em Tempo Real',
            active: true,
            error: null,
            loading: false,
            permissionState: 'granted',
          }));
        },
        () => {},
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [requestGps]);

  return { userLocation, requestGps };
}
