import { useEffect } from "react";

/**
 * Хук для обработки клика вне указанного ref.
 * @param {React.RefObject} ref - ссылка на DOM-элемент
 * @param {function} handler - функция, вызываемая при клике вне ref
 * @param {boolean} active - включен ли слушатель (например, только при редактировании)
 */
export const useClickOutside = (ref, handler, active = true) => {
  useEffect(() => {
    if (!active) return;

    const listener = (event) => {
      // если клик внутри элемента — игнорируем
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, active]);
};
