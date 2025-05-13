import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, Package, Users, Settings, LogOut, BarChart3, 
  ShoppingCart, Search, Plus, Trash2, Edit, Filter 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

const ProductsPage: React.FC = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'قميص أبيض',
      price: 120,
      category: 'ملابس',
      stock: 25,
      imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'حذاء رياضي',
      price: 250,
      category: 'أحذية',
      stock: 18,
      imageUrl: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      name: 'ساعة ذكية',
      price: 500,
      category: 'إلكترونيات',
      stock: 10,
      imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '4',
      name: 'سماعات لاسلكية',
      price: 300,
      category: 'إلكترونيات',
      stock: 15,
      imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // For the product form
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: '',
  });
  
  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        imageUrl: product.imageUrl,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        imageUrl: '',
      });
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => 
        prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p)
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
      };
      setProducts(prev => [...prev, newProduct]);
    }
    
    setIsModalOpen(false);
  };
  
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md py-8 px-4 hidden md:block">
        <div className="flex items-center justify-center mb-10">
          <Store className="h-8 w-8 text-primary-600 ml-2" />
          <h1 className="text-2xl font-bold text-gray-800">متجري</h1>
        </div>
        
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <BarChart3 className="h-5 w-5 ml-3" />
            <span className="font-medium">لوحة التحكم</span>
          </Link>
          
          <Link to="/products" className="flex items-center py-2 px-4 rounded-lg bg-primary-50 text-primary-700">
            <Package className="h-5 w-5 ml-3" />
            <span className="font-medium">المنتجات</span>
          </Link>
          
          <Link to="/orders" className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <ShoppingCart className="h-5 w-5 ml-3" />
            <span className="font-medium">الطلبات</span>
          </Link>
          
          <Link to="/customers" className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Users className="h-5 w-5 ml-3" />
            <span className="font-medium">العملاء</span>
          </Link>
          
          <Link to="/settings" className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5 ml-3" />
            <span className="font-medium">الإعدادات</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-200 mt-8">
          <button 
            onClick={logout}
            className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
          >
            <LogOut className="h-5 w-5 ml-3" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">المنتجات</h1>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث عن منتج..."
                className="input-field pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <button 
              onClick={() => handleOpenModal()}
              className="btn btn-primary flex items-center justify-center"
            >
              <Plus className="h-5 w-5 ml-1" />
              إضافة منتج
            </button>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنتج
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السعر
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التصنيف
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المخزون
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={product.imageUrl} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price} ريال</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="text-indigo-600 hover:text-indigo-900 ml-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">لا توجد منتجات</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {editingProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-field"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    السعر (ريال)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="input-field"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    التصنيف
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="input-field"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    المخزون
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="input-field"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    className="input-field"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {formData.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">معاينة الصورة:</p>
                    <img 
                      src={formData.imageUrl} 
                      alt="معاينة المنتج" 
                      className="h-20 w-20 object-cover rounded-md border border-gray-200" 
                    />
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-4 space-x-reverse">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={handleCloseModal}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;