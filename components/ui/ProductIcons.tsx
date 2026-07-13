import {
  Briefcase,
  Building2,
  Factory,
  Gauge,
  Headphones,
  Hotel,
  LayoutPanelTop,
  PlugZap,
  Radio,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Store,
  VolumeOff,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/products";

const icons: Record<IconName, LucideIcon> = {
  "volume-off": VolumeOff,
  gauge: Gauge,
  "plug-zap": PlugZap,
  "layout-panel-top": LayoutPanelTop,
  "shield-check": ShieldCheck,
  radio: Radio,
  store: Store,
  building: Building2,
  briefcase: Briefcase,
  stethoscope: Stethoscope,
  factory: Factory,
  hotel: Hotel,
  sliders: SlidersHorizontal,
  "scan-line": ScanLine,
  headphones: Headphones,
};

export function ProductIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
