import { createContext, useContext, useEffect, useState } from 'react';
import type { Card } from '../types/types';
import { db } from '../config/firebase-config';
import { onValue, ref, set } from 'firebase/database';
import { useAuthContext } from './AuthContext';

interface CardContextType {
  cardData: Card | null;
  loading: boolean;
  createCard: (userId: string, card: Card) => Promise<void>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error(
      'useCardContext must be used within an CardContextProvider'
    );
  }
  return context;
};

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();
  const [cardData, setCardData] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cardRef = ref(db, `cards/${user?.uid}`);

    const unsubscribe = onValue(cardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCardData(data);
      } else {
        setCardData(null);
      }
    });

    setLoading(false);
    return () => unsubscribe();
  }, [user?.uid]);

  const createCard = async (userId: string, card: Card) => {
    try {
      const cardsRef = ref(db, `cards/${userId}`);
      await set(cardsRef, card);
    } catch (error) {
      console.error('Error creando tarjeta:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CardContext.Provider value={{ cardData, loading, createCard }}>
      {children}
    </CardContext.Provider>
  );
};
