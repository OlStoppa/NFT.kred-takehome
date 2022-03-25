import { useMemo } from 'react';
import { debounce } from '../util/debounce';

const Search = ({ action }: { action: Function }) => {

  const debouncedEvent = useMemo(() => {
    const eventHandler = (search: string) => {
      action(search);
    }
    return debounce((e: any) => eventHandler(e), 300)
  }, [action]);

  return (
    <div>
      <input placeholder="Search" onChange={(e) => debouncedEvent(e.target.value)} />
    </div>
  )
}

export default Search;