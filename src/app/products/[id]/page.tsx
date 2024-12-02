import ProductDetail from '@/components/ProductDetail';

// This is a mock data for demonstration. In a real application,
// you would fetch this data from an API or database
const mockProduct = {
  id: 'H4-2151',
  name: 'SALVER',
  code: 'H4-2151#',
  designer: 'Hanne Willmann',
  description: '这款休闲躺椅表达出其卓越的木艺，它富有生机的曲线舒适贴合人体靠背曲线，放松小腿舒享躺卧。摆设在客厅休闲极简富有生活情调，同时也可以在露台或者其他种类的户外空间。',
  features: [
    '黑橡色/咖啡色脚架可选',
    '高品质面料选择',
    '座垫采用高密度海绵',
  ],
  colors: [
    {
      category: '面料',
      subcategory: '亚麻',
      colors: [
        { name: '浅灰', value: '#E5E5E5' },
        { name: '米白', value: '#F5F5DC' },
        { name: '亚麻色', value: '#FAF0E6' },
        { name: '象牙白', value: '#FFFFF0' },
        { name: '淡米色', value: '#FDF5E6' }
      ]
    },
    {
      category: '面料',
      subcategory: '绒布',
      colors: [
        { name: '浅棕', value: '#D2B48C' },
        { name: '深蓝', value: '#000080' },
        { name: '深棕', value: '#8B4513' },
        { name: '米灰', value: '#E8E8E8' }
      ]
    },
    {
      category: '面料',
      subcategory: '花格布',
      colors: [
        { name: '黑白格', value: 'repeating-linear-gradient(45deg, #000 0, #000 5px, #fff 5px, #fff 10px)' },
        { name: '灰白条', value: 'repeating-linear-gradient(90deg, #808080 0, #808080 5px, #fff 5px, #fff 10px)' },
        { name: '蓝灰格', value: 'repeating-linear-gradient(45deg, #4682B4 0, #4682B4 5px, #808080 5px, #808080 10px)' }
      ]
    }
  ],
  images: [
    {
      src: '/H4-2151/1.png',
      alt: 'SALVER沙发主视图'
    },
    {
      src: '/H4-2151/2.png',
      alt: 'SALVER沙发细节图1'
    },
    {
      src: '/6e52b947bd323bf2cc781b9689bd67e4.mp4',
      alt: 'SALVER沙发细节图2'
    },
    {
      src: '/H4-2151/5.png',
      alt: 'SALVER沙发细节图3'
    },
    {
      src: '/H4-2151/6.png',
      alt: 'SALVER沙发展示图'
    }
  ],
  specs: {
    '材质': '高密度海绵、实木框架',
    '尺寸': '340cm x 200cm x 75cm (长x宽x高)',
    '座高': '42cm',
    '靠背高': '75cm'
  }
};

export default function ProductPage() {
  // In a real application, you would fetch the product data based on the id
  // const product = await getProduct(params.id);
  // console.log(params.id);
  
  return <ProductDetail product={mockProduct} />;
}
