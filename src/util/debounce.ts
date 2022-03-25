export function debounce(func: Function, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (e: unknown) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func(e); }, timeout);
  };
}