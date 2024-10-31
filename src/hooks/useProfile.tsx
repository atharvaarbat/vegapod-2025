import { useState, useEffect } from 'react';

type UseProfileReturn = {
  profile: string;
  setProfile: (newProfile: string) => void;
};

const useProfile = (): UseProfileReturn => {
  const [profile, setProfileState] = useState<string>(() => {
    // Get the initial profile from localStorage, defaulting to "General"
    return localStorage.getItem('profile') || 'General';
  });

  // Function to update the profile both in state and in localStorage
  const setProfile = (newProfile: string) => {
    setProfileState(newProfile);
    localStorage.setItem('profile', newProfile);
  };

  useEffect(() => {
    // Keep profile in sync if localStorage changes from another tab or window
    const handleStorageChange = () => {
      const storedProfile = localStorage.getItem('profile') || 'General';
      setProfileState(storedProfile);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { profile, setProfile };
};

export default useProfile;
