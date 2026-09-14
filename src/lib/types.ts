import type { Info } from 'lucide-astro';
import type { SiDiscord } from '@icons-pack/react-simple-icons';

type LucideIconComponent = typeof Info;
type SimpleIconComponent = typeof SiDiscord;

export type IconComponent = LucideIconComponent | SimpleIconComponent;

export interface ISidebarItem {
  label: string;
  slug?: string;
  items?: ISidebarItem[];
  icon?: IconComponent;
}
