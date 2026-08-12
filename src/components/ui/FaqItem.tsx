import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Acordeón sin librería de animación: el alto se anima con el truco de
 * `grid-template-rows: 0fr → 1fr`, que es GPU-friendly y no cuesta bytes.
 */
export default function FaqItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden transition-colors duration-200 ${
        isOpen ? 'border-accent-main/25' : ''
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full px-5 sm:px-6 py-4 min-h-[56px] flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-main"
        >
          <span className="font-semibold text-text-main group-hover:text-accent-main transition-colors duration-150 text-sm sm:text-base">
            {question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-5 h-5 text-accent-main shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-200 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-text-muted text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
