import { createContext, useContext, useEffect, useState } from 'react';
import type { Card } from '../types/types';
import { db } from '../config/firebase-config';
import { onValue, ref, set } from 'firebase/database';
import { useAuthContext } from './AuthContext';

interface CardContextType {
  cardData: Card | null;
  loading: boolean;
  createCard: (card: Card) => Promise<void>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within CardProvider');
  }
  return context;
};

export const CardProvider = ({
  children,
  uid,
}: {
  children: React.ReactNode;
  uid?: string;
}) => {
  const { user } = useAuthContext();
  const [cardData, setCardData] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUid = uid || user?.uid;

  useEffect(() => {
    if (!currentUid) {
      setLoading(false);
      setCardData(null);
      return;
    }

    const cardRef = ref(db, `cards/${currentUid}`);
    const unsubscribe = onValue(cardRef, (snapshot) => {
      setCardData(snapshot.val());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUid]);

  const createCard = async (card: Card) => {
    if (!user) throw new Error('User not authenticated');
    if (user.uid !== card.ownerId)
      throw new Error('Cannot save card for another user');

    setLoading(true);
    try {
      const cardRef = ref(db, `cards/${user.uid}`);
      await set(cardRef, card);
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
