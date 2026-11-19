const categories = ["Electronics", "Grocery", "Clothing", "Other"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <label className="filter">
      <span>Filter category</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="All">All categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}