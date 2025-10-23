/**
 * Icon Mapping Utilities
 * Maps purpose values and text placeholders to Lucide icons
 */

import {
  Gamepad2,
  Briefcase,
  Code,
  Palette,
  GraduationCap,
  Building2,
  Globe,
  BarChart3,
  Settings,
  Play,
  Plane,
  Wallet,
  Goal,
  Lightbulb,
  CircleCheckBig,
  MessageCircleWarning,
  MessageSquare,
  ChartColumnStacked,
  User,
  CircleDollarSign,
  XCircle,
  HelpCircle,
  Trophy
} from 'lucide-react';

// Purpose to Icon mapping
const PURPOSE_ICONS = {
  'gaming': Gamepad2,
  'work-office': Briefcase,
  'programming': Code,
  'content-creation': Palette,
  'student': GraduationCap,
  'business': Building2,
  'casual': Globe,
  'data-science': BarChart3,
  'engineering': Settings,
  'media-consumption': Play,
  'travel': Plane,
  'budget': Wallet
};

// Text placeholder to Icon mapping
const TEXT_ICON_MAP = {
  '[TARGET]': Goal,
  '[LIGHTBULB]': Lightbulb,
  '[CHECK]': CircleCheckBig,
  '[ALERT]': MessageCircleWarning,
  '[MESSAGE]': MessageSquare,
  '[CHART]': ChartColumnStacked,
  '[USER]': User,
  '[DOLLAR]': CircleDollarSign,
  '[X]': XCircle,
  '[QUESTION]': HelpCircle,
  '[TROPHY]': Trophy
};

/**
 * Get icon component for purpose
 * @param {string} purpose - Purpose value
 * @returns {Component} Lucide icon component
 */
export function getPurposeIcon(purpose) {
  return PURPOSE_ICONS[purpose] || Goal;
}

/**
 * Get icon component for text placeholder
 * @param {string} placeholder - Text placeholder
 * @returns {Component} Lucide icon component
 */
export function getTextIcon(placeholder) {
  return TEXT_ICON_MAP[placeholder] || Lightbulb;
}

/**
 * Get all available purpose icons
 * @returns {Object} Map of purpose to icon
 */
export function getAllPurposeIcons() {
  return PURPOSE_ICONS;
}

/**
 * Get all text icon mappings
 * @returns {Object} Map of placeholder to icon
 */
export function getAllTextIcons() {
  return TEXT_ICON_MAP;
}
