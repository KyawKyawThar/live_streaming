import { LucideIcon } from 'lucide-react';

export type SettingsTabs = {
  value: string;
  Icon?: LucideIcon;
  label: string | JSX.Element;
  Page: JSX.Element;
};
