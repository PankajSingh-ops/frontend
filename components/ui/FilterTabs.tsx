"use client";

import { useRef, useEffect } from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  ariaLabel?: string;
}

export function FilterTabs({
  tabs,
  activeTab,
  onChange,
  className = "",
  ariaLabel = "Category Filters",
}: FilterTabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the active tab into view on small screens
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  // Keyboard navigation for role="tablist"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let targetIndex = -1;
    if (e.key === "ArrowRight") {
      targetIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== -1) {
      e.preventDefault();
      const targetTab = tabs[targetIndex];
      onChange(targetTab.id);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      if (buttons && buttons[targetIndex]) {
        buttons[targetIndex].focus();
      }
    }
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={ariaLabel}
        className="flex items-center gap-2 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1 border-b border-line/40"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`snap-start whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(47,123,255,0.45)] border border-primary-glow font-semibold"
                  : "bg-surface/60 text-muted hover:text-white hover:bg-surface-2 border border-line/50 hover:border-line"
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-surface-2 text-muted group-hover:text-text"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
