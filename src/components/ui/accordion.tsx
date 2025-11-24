import React, { useState, createContext, useContext } from 'react';

interface AccordionContextType {
  type: 'single' | 'multiple';
  openItems: Set<string>;
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
  type: 'single' | 'multiple';
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultValue?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  type,
  children,
  className = '',
  collapsible = false,
  defaultValue = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultValue ? [defaultValue] : [])
  );

  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (type === 'single') {
        newSet.clear();
        if (!prev.has(value) || collapsible) {
          newSet.add(value);
        }
      } else {
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          newSet.add(value);
        }
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
      <div className={`space-y-4 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  className = '',
}) => {
  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className = '',
}) => {
  const context = useContext(AccordionContext);
  const [value, setValue] = useState('');

  if (!context) {
    throw new Error('AccordionTrigger must be used within Accordion');
  }

  // Get the value from the parent AccordionItem
  const handleClick = () => {
    // We'll need to get the value from the parent somehow
    // For now, let's use a simpler approach
    context.toggleItem(value);
  };

  return (
    <button
      className={`flex justify-between items-center w-full px-6 py-4 text-left font-medium hover:bg-gray-50 ${className}`}
      onClick={handleClick}
    >
      {children}
      <span className="text-gray-400">+</span>
    </button>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = '',
}) => {
  const context = useContext(AccordionContext);
  
  if (!context) {
    throw new Error('AccordionContent must be used within Accordion');
  }

  // For now, just show the content - we'll need to properly implement the open/close logic
  return (
    <div className={`px-6 pb-4 text-gray-600 ${className}`}>
      {children}
    </div>
  );
};