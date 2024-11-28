import Link from 'next/link';
import Image from 'next/image';

type Category = {
  id: string;
  name: string;
  thumbnail: string;
};

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    thumbnail: 'https://store.celeprime.com/electronics/category-thumb.jpg'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    thumbnail: 'https://store.celeprime.com/fashion/category-thumb.jpg'
  },
  {
    id: 'home',
    name: 'Home & Living',
    thumbnail: 'https://store.celeprime.com/home/category-thumb.jpg'
  },
  {
    id: 'sports',
    name: 'Sports',
    thumbnail: 'https://store.celeprime.com/sports/category-thumb.jpg'
  }
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/category/${category.id}`}
          className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="aspect-[4/3] w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image 
              src={category.thumbnail}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              unoptimized 
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-semibold text-white">
              {category.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
