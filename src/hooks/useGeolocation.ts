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
  isCustom?: boolean;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=pt`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || '';
      const state = data.principalSubdivisionCode || data.principalSubdivision || '';
      const country = data.countryName || '';
      if (city) {
        const stateFormatted = state.replace('BR-', '');
        return stateFormatted ? `${city}, ${stateFormatted}` : `${city}, ${country}`;
      }
    }
  } catch (e) {
    console.warn('BigDataCloud geocode failed:', e);
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
      { headers: { 'Accept-Language': 'pt-BR,pt;q=0.9' } }
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.municipality || addr.state_district;
      const state = addr.state || addr.country || '';
      if (city) {
        return state ? `${city}, ${state}` : city;
      }
    }
  } catch (e) {
    console.warn('Nominatim geocode failed:', e);
  }

  return `Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)}`;
}

export function useGeolocation() {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: -23.5505,
    lng: -46.6333,
    accuracy: 15,
    city: 'Carregando localização GPS...',
    active: false,
    error: null,
    loading: true,
    permissionState: 'unknown',
  });

  const setCustomCity = useCallback((cityName: string, customLat?: number, customLng?: number) => {
    setUserLocation(prev => ({
      ...prev,
      city: cityName,
      lat: customLat ?? prev.lat,
      lng: customLng ?? prev.lng,
      active: true,
      isCustom: true,
      error: null,
      loading: false,
    }));
  }, []);

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
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        // Fetch real city name via reverse geocoding
        const detectedCity = await reverseGeocode(latitude, longitude);

        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          city: detectedCity,
          active: true,
          error: null,
          loading: false,
          permissionState: 'granted',
          isCustom: false,
        });
      },
      (err) => {
        console.warn('GPS position error:', err.message);
        setUserLocation(prev => ({
          ...prev,
          active: false,
          loading: false,
          city: prev.isCustom ? prev.city : 'Localização não obtida',
          error: err.code === err.PERMISSION_DENIED
            ? 'Permissão de GPS negada. Permita o acesso à localização no navegador.'
            : 'Não foi possível obter o GPS automático.',
          permissionState: err.code === err.PERMISSION_DENIED ? 'denied' : 'unknown',
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 3000,
      }
    );
  }, []);

  useEffect(() => {
    requestGps();
  }, [requestGps]);

  return { userLocation, requestGps, setCustomCity };
}

