import { reactive } from "vue";

type Options = {
  maxOffsetPx?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function useMouseMotion(options: Options = {}) {
  const maxOffsetPx = options.maxOffsetPx ?? 18;

  const offset = reactive({ x: 0, y: 0 });

  function onMouseMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement | null;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const nx = rect.width ? (e.clientX - cx) / (rect.width / 2) : 0;
    const ny = rect.height ? (e.clientY - cy) / (rect.height / 2) : 0;

    offset.x = clamp(nx, -1, 1) * maxOffsetPx;
    offset.y = clamp(ny, -1, 1) * maxOffsetPx;
  }

  function onMouseLeave() {
    offset.x = 0;
    offset.y = 0;
  }

  return { offset, onMouseMove, onMouseLeave };
}

