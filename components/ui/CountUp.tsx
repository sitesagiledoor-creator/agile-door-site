"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que conta até o valor final quando entra na tela, uma vez só.
 *
 * Regra de ouro deste componente: **na dúvida, mostra o número certo.**
 * `contando === null` significa "não estou animando" e renderiza o valor
 * final — é o estado do servidor, o de antes de entrar na tela, o de quem
 * pediu menos movimento e o do fim da animação. Qualquer falha (observer que
 * não dispara, JS estrangulado, erro no meio) cai nesse estado. O contrário
 * — começar em zero e depender da animação para chegar ao valor — deixaria
 * uma informação falsa na página se algo não rodasse.
 *
 * A contagem é decorativa: quem usa leitor de tela recebe o texto final
 * completo pelo `sr-only` de quem chama, e este trecho fica `aria-hidden`.
 */
export function CountUp({
  to,
  durationMs = 1400,
}: {
  to: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [contando, setContando] = useState<number | null>(null);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let travaFinal = 0;

    function anima() {
      const inicio = performance.now();
      function passo(agora: number) {
        const progresso = Math.min(1, (agora - inicio) / durationMs);
        // easeOutExpo: dispara rápido e assenta no fim, como contador de painel
        const suave = progresso === 1 ? 1 : 1 - Math.pow(2, -10 * progresso);
        // volta a null no fim: a partir daí quem manda é o valor final
        setContando(progresso === 1 ? null : Math.round(suave * to));
        if (progresso < 1) frame = requestAnimationFrame(passo);
      }
      setContando(0);
      frame = requestAnimationFrame(passo);

      // O navegador estrangula requestAnimationFrame em aba oculta ou sob
      // carga. Sem esta trava a contagem congelaria num número parcial.
      travaFinal = window.setTimeout(() => setContando(null), durationMs + 600);
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return;
        observador.disconnect();
        anima();
      },
      { threshold: 0.15 }
    );
    observador.observe(alvo);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(travaFinal);
    };
  }, [to, durationMs]);

  return <span ref={ref}>{contando ?? to}</span>;
}
