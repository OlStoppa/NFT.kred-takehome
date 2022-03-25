import { useState, SetStateAction } from 'react';

interface Props {
  options: number[];
  change: React.Dispatch<SetStateAction<number>>;
  currentCount: number;
}

const Dropdown = ({ options, change, currentCount }: Props) => {
  const [open, toggle] = useState(false);

  const handleChange = (opt: typeof options[0]) => {
    change(opt);
    toggle(false);
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={() => toggle(!open)}
      >
        Select Total
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{ display: open ? 'block' : 'none' }}
      >
        {
          options.map(opt =>
            <li
              key={opt}
              onClick={() => handleChange(opt)}
              className={`dropdown-item ${opt === currentCount ? 'active' : ''}`}
            >
              {opt}
            </li>)
        }
      </ul>
    </div>
  )
}

export default Dropdown;