import type { SpecGroup } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * Ficha técnica organizada por categoria.
 * Valores numéricos/técnicos em IBM Plex Mono — assinatura visual da marca.
 */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.title}
          className="border border-brand-navy/10 bg-white chamfer"
        >
          <h3 className="border-b-2 border-brand-orange bg-neutral-bg px-5 py-3 font-display text-base font-bold text-brand-navy">
            {group.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">{group.title}</caption>
              <tbody>
                {group.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-brand-navy/5 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-2/5 px-5 py-3 text-left align-top font-medium text-neutral-muted"
                    >
                      {row.label}
                    </th>
                    <td
                      className={cn(
                        "px-5 py-3 text-neutral-text",
                        row.mono && "font-mono font-medium text-brand-navy"
                      )}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
