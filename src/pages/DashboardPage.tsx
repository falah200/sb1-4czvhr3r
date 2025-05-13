import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Package, Users, Settings, LogOut, BarChart3, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const statistics = [
    { title: 'إجمالي المنتجات', value: '24', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { title: 'الطلبات الجديدة', value: '12', icon: ShoppingCart, color: 'bg-green-100 text-green-600' },
    { title: 'الزوار اليوم', value: '156', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'إجمالي المبيعات', value: '1,240 ريال', icon: BarChart3, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md py-8 px-4 hidden md:block">
        <div className="flex items-center justify-center mb-10">
          <Store className="h-8 w-8 text-primary-600 ml-2" />
          <h1 className="text-2xl font-bold text-gray-800">متجري</h1>
        </div>
        
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center py-2 px-4 rounded-lg bg-primary-50 text-primary-700">
            <BarChart3 className="h-5 w-5 ml-3" />
            <span className="font-medium">لوحة التحكم</span>
          </Link>
          
          <Link to="/products" className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
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
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">مرحباً، {currentUser?.name}</h1>
            <p className="text-gray-600">
              إليك نظرة عامة عن متجرك اليوم
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 ml-2">
              {currentUser?.subscription === 'weekly' && 'الاشتراك الأسبوعي'}
              {currentUser?.subscription === 'monthly' && 'الاشتراك الشهري'}
              {currentUser?.subscription === 'yearly' && 'الاشتراك السنوي'}
            </span>
            <Link to="/subscription" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              تغيير الخطة
            </Link>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <div className={`rounded-full p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">النشاط الأخير</h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start border-b border-gray-100 pb-4">
                <div className={`rounded-full p-2 ${
                  index === 0 ? 'bg-green-100 text-green-600' : 
                  index === 1 ? 'bg-blue-100 text-blue-600' : 
                  'bg-amber-100 text-amber-600'
                } mr-4`}>
                  {index === 0 ? <ShoppingCart className="h-5 w-5" /> : 
                   index === 1 ? <Package className="h-5 w-5" /> : 
                   <Users className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {index === 0 ? 'تم تلقي طلب جديد #1234' : 
                     index === 1 ? 'تمت إضافة منتج جديد "قميص قطني"' : 
                     'عميل جديد قام بالتسجيل'}
                  </p>
                  <p className="text-sm text-gray-600">منذ {index + 1} ساعات</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm">
            عرض كل النشاطات
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;