interface SelectOption {
  label: string;
  value: string;
}

export default function Select({
  options,
  label,
  name,
  selectSort,
}: {
  options: SelectOption[];
  label: string;
  name: string;
  selectSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <select
        onChange={selectSort}
        name={name}
        className="select m-2 w-44 border p-2"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
