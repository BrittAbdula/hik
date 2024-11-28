interface Tag {
  id: string;
  label: string;
}

interface TagListProps {
  tags: Tag[];
  selectedTag: string;
  onSelectTag: (tagId: string) => void;
}

export default function TagList({ tags, selectedTag, onSelectTag }: TagListProps) {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-4 py-2 flex gap-6 overflow-x-auto scrollbar-hide">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onSelectTag(tag.id)}
            className={`
              text-sm font-mono whitespace-nowrap transition-colors
              ${selectedTag === tag.id 
                ? 'text-white' 
                : 'text-white/50 hover:text-white/80'
              }
            `}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
