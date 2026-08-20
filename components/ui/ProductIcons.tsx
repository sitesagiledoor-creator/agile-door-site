import {
  Briefcase,
  Building2,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  Headphones,
  Hotel,
  LayoutPanelTop,
  Link2,
  Lock,
  MoveHorizontal,
  Plane,
  PlugZap,
  Radio,
  Ruler,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Stethoscope,
  Store,
  Thermometer,
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
  "move-horizontal": MoveHorizontal,
  ruler: Ruler,
  cpu: Cpu,
  thermometer: Thermometer,
  link: Link2,
  lock: Lock,
  plane: Plane,
  flask: FlaskConical,
  "shopping-bag": ShoppingBag,
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
