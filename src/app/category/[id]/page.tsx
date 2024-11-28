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
        title: 'Smart Watch'
      },
      {
        id: 'e2',
        src: 'https://store.celeprime.com/electronics/product2.jpg',
        title: 'Wireless Earbuds'
      },
      {
        id: 'e3',
        src: 'https://store.celeprime.com/electronics/product3.jpg',
        title: 'Smartphone'
      }
    ]
  },
  fashion: {
    title: 'Fashion',
    photos: [
      {
        id: 'f1',
        src: 'https://store.celeprime.com/fashion/product1.jpg',
        title: 'Leather Bag'
      },
      {
        id: 'f2',
        src: 'https://store.celeprime.com/fashion/product2.jpg',
        title: 'Summer Dress'
      },
      {
        id: 'f3',
        src: 'https://store.celeprime.com/fashion/product3.jpg',
        title: 'Sneakers'
      }
    ]
  },
  home: {
    title: 'Home & Living',
    photos: [
      {
        id: 'h1',
        src: 'https://store.celeprime.com/home/product1.jpg',
        title: 'Modern Sofa'
      },
      {
        id: 'h2',
        src: 'https://store.celeprime.com/home/product2.jpg',
        title: 'Table Lamp'
      },
      {
        id: 'h3',
        src: 'https://store.celeprime.com/home/product3.jpg',
        title: 'Dining Set'
      }
    ]
  },
  sports: {
    title: 'Sports',
    photos: [
      {
        id: 's1',
        src: 'https://store.celeprime.com/sports/product1.jpg',
        title: 'Running Shoes'
      },
      {
        id: 's2',
        src: 'https://store.celeprime.com/sports/product2.jpg',
        title: 'Yoga Mat'
      },
      {
        id: 's3',
        src: 'https://store.celeprime.com/sports/product3.jpg',
        title: 'Fitness Equipment'
      }
    ]
  }
};

export default function CategoryPage({ params }: { params: { id: string } }) {
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
