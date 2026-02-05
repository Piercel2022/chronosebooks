import type { Category } from './types';

export const categories: Category[] = [
  {
    id: "quick-wins",
    name: "Quick Wins",
    description: "Get results in under 30 minutes",
    productTypes: ["checklists", "cheat-sheets"],
    icon: "⚡",
    color: "#10B981"
  },
  {
    id: "deep-dives",
    name: "Deep Dives",
    description: "Comprehensive mastery resources",
    productTypes: ["workbooks", "ebooks"],
    icon: "📚",
    color: "#3B82F6"
  },
  {
    id: "ready-to-use",
    name: "Ready-to-Use",
    description: "Plug-and-play templates",
    productTypes: ["templates"],
    icon: "🎯",
    color: "#8B5CF6"
  },
  {
    id: "step-by-step",
    name: "Step-by-Step",
    description: "Guided implementation plans",
    productTypes: ["how-to-guides"],
    icon: "🗺️",
    color: "#F59E0B"
  }
];