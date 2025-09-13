import React from 'react';

export interface Assessment {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

export interface BasketItem {
  assessment: Assessment;
  quantity: number;
}