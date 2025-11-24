import React, { useState } from 'react';

interface AccordionProps {
  type?: 'single' | 'multiple';
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultValue?: string;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

// Simple Accordion implementation
export const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  className = ''
}) => {
  return <div className={className}>{children}</div>;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ 
  children, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className={className}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        marginBottom: '8px',
        overflow: 'hidden'
      }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === AccordionTrigger) {
            return React.cloneElement(child, { 
              onClick: () => setIsOpen(!isOpen) 
            } as any);
          }
          if (child.type === AccordionContent) {
            return React.cloneElement(child, { 
              isOpen 
            } as any);
          }
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ 
  children, 
  className = '',
  onClick 
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '16px',
        fontWeight: '500',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {children}
      <span style={{ fontSize: '12px', color: '#666' }}>▼</span>
    </button>
  );
};

export const AccordionContent: React.FC<AccordionContentProps> = ({ 
  children, 
  className = '',
  isOpen = false 
}) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className={className}
      style={{ 
        padding: '0 16px 16px 16px', 
        borderTop: '1px solid #e5e7eb',
        color: '#666'
      }}
    >
      {children}
    </div>
  );
};