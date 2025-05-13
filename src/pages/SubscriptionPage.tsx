import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PlanProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  recommended?: boolean;
  onClick: () => void;
}

const SubscriptionPlan: React.FC<PlanProps> = ({ 
  title, 
  price, 
  duration, 
  features, 
  recommended = false,
  onClick
}) => {
  return (
    <div 
      className={`card p-6 flex flex-col h-full ${
        recommended 
          ? 'border-2 border-primary-500 relative transform hover:-translate-y-2' 
          : 'border border-gray-200 hover:-translate-y-1'
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-4 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
          <Star className="h-4 w-4 mr-1" />
          موصى به
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 mr-1">/ {duration}</span>
        </div>
      </div>
      
      <div className="flex-grow">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-primary-600 ml-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={onClick}
        className={`btn w-full ${
          recommended ? 'btn-primary' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        اختر الخطة
      </button>
    </div>
  );
};

const SubscriptionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSubscription } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateSubscription(plan);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  const weeklyFeatures = [
    'إضافة حتى 50 منتج',
    'التحليلات الأساسية',
    'الدعم عبر البريد الإلكتروني',
    'تخصيص محدود للمتجر',
  ];
  
  const monthlyFeatures = [
    'إضافة حتى 200 منتج',
    'تحليلات متقدمة',
    'دعم فني على مدار الساعة',
    'تخصيص كامل للمتجر',
    'خاصية البحث المتقدم',
  ];
  
  const yearlyFeatures = [
    'عدد غير محدود من المنتجات',
    'تحليلات احترافية',
    'دعم فني أولوي',
    'تخصيص كامل للمتجر',
    'خاصية البحث المتقدم',
    'دعم متعدد اللغات',
    'تكامل مع أنظمة الدفع المتعددة',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">اختر خطة الاشتراك المناسبة لك</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            نقدم لك مجموعة من الخطط لتناسب احتياجات متجرك، اختر الخطة المناسبة وابدأ رحلتك مع منصة متجري الآن
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <SubscriptionPlan
              title="الاشتراك الأسبوعي"
              price="99 ريال"
              duration="أسبوع"
              features={weeklyFeatures}
              onClick={() => handleSelectPlan('weekly')}
            />
            
            <SubscriptionPlan
              title="الاشتراك الشهري"
              price="299 ريال"
              duration="شهر"
              features={monthlyFeatures}
              recommended={true}
              onClick={() => handleSelectPlan('monthly')}
            />
            
            <SubscriptionPlan
              title="الاشتراك السنوي"
              price="2999 ريال"
              duration="سنة"
              features={yearlyFeatures}
              onClick={() => handleSelectPlan('yearly')}
            />
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            جميع الخطط تشمل 14 يومًا تجريبية. يمكنك إلغاء اشتراكك في أي وقت.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;