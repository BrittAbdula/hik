import { notFound } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';

// This would typically come from your database or API
const categoryData = {
  electronics: {
    title: 'Electronics',
    photos: [
      {
        id: 'e1',
        src: 'https://store.celeprime.com/electronics/product1.jpg',
        title: 'Smart Watch',
        aspectRatio: 1,
      },
      {
        id: 'e2',
        src: 'https://store.celeprime.com/electronics/product2.jpg',
        title: 'Wireless Earbuds',
        aspectRatio: 1,
      },
      {
        id: 'e3',
        src: 'https://store.celeprime.com/electronics/product3.jpg',
        title: 'Smartphone',
        aspectRatio: 1,
      }
    ]
  },
  fashion: {
    title: 'Fashion',
    photos: [
      {
        id: 'f1',
        src: 'https://store.celeprime.com/fashion/product1.jpg',
        title: 'Leather Bag',
        aspectRatio: 1,
      },
      {
        id: 'f2',
        src: 'https://store.celeprime.com/fashion/product2.jpg',
        title: 'Summer Dress',
        aspectRatio: 1,
      },
      {
        id: 'f3',
        src: 'https://store.celeprime.com/fashion/product3.jpg',
        title: 'Sneakers',
        aspectRatio: 1,
      }
    ]
  },
  home: {
    title: 'Home & Living',
    photos: [
      {
        id: 'h1',
        src: 'https://store.celeprime.com/home/product1.jpg',
        title: 'Modern Sofa',
        aspectRatio: 1,
      },
      {
        id: 'h2',
        src: 'https://store.celeprime.com/home/product2.jpg',
        title: 'Table Lamp',
        aspectRatio: 1,
      },
      {
        id: 'h3',
        src: 'https://store.celeprime.com/home/product3.jpg',
        title: 'Dining Set',
        aspectRatio: 1,
      }
    ]
  },
  sports: {
    title: 'Sports',
    photos: [
      {
        id: 's1',
        src: 'https://store.celeprime.com/sports/product1.jpg',
        title: 'Running Shoes',
        aspectRatio: 1,
      },
      {
        id: 's2',
        src: 'https://store.celeprime.com/sports/product2.jpg',
        title: 'Yoga Mat',
        aspectRatio: 1,
      },
      {
        id: 's3',
        src: 'https://store.celeprime.com/sports/product3.jpg',
        title: 'Fitness Equipment',
        aspectRatio: 1,
      }
    ]
  }
};

type Props = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function CategoryPage({ params }: Props) {
  const category = categoryData[params.id as keyof typeof categoryData];
  
  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.title}
          </h1>
          <p className="text-lg text-gray-600">
            Browse our collection of {category.title.toLowerCase()} products
          </p>
        </header>
        <PhotoGallery photos={category.photos} />
      </div>
    </main>
  );
}
