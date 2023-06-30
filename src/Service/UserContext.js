import React, { createContext, useEffect, useState } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await localStorage.getItem('userId');
        if (storedUserId) {
          setUserId(parseInt(storedUserId));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, []);

  const updateUser = async (id) => {
    try {
      setUserId(id);
      await localStorage.setItem('userId', id.toString());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
