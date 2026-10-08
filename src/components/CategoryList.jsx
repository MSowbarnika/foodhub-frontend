export default function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="categories">
      {["All", ...categories].map((c) => (
        <button key={c} className={`chip ${selected === c ? "active" : ""}`} onClick={() => onSelect(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}