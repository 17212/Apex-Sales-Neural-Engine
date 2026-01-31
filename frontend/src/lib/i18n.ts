// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - i18n Configuration (Multi-language Support)
// ═══════════════════════════════════════════════════════════════════════════════

export type Locale = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'tr';

export const locales: Record<Locale, { name: string; nativeName: string; dir: 'rtl' | 'ltr'; flag: string }> = {
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  en: { name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇺🇸' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr', flag: '🇫🇷' },
  es: { name: 'Spanish', nativeName: 'Español', dir: 'ltr', flag: '🇪🇸' },
  de: { name: 'German', nativeName: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
};

export const defaultLocale: Locale = 'ar';

// Translation keys
export const translations = {
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.inbox': 'صندوق الوارد',
    'nav.orders': 'الطلبات',
    'nav.products': 'المنتجات',
    'nav.customers': 'العملاء',
    'nav.analytics': 'التحليلات',
    'nav.broadcast': 'الرسائل الجماعية',
    'nav.training': 'تدريب البوت',
    'nav.channels': 'القنوات',
    'nav.settings': 'الإعدادات',
    'nav.team': 'الفريق',
    'nav.invoices': 'الفواتير',
    'nav.reports': 'التقارير',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.search': 'بحث',
    'common.filter': 'فلتر',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.loading': 'جاري التحميل...',
    'common.noData': 'لا توجد بيانات',
    'common.success': 'تم بنجاح',
    'common.error': 'حدث خطأ',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بك',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.totalOrders': 'إجمالي الطلبات',
    'dashboard.totalCustomers': 'إجمالي العملاء',
    'dashboard.conversionRate': 'معدل التحويل',
    'dashboard.activeBots': 'البوتات النشطة',
    
    // Orders
    'orders.new': 'طلب جديد',
    'orders.pending': 'قيد الانتظار',
    'orders.processing': 'قيد المعالجة',
    'orders.shipped': 'تم الشحن',
    'orders.delivered': 'تم التوصيل',
    'orders.cancelled': 'ملغي',
    
    // Bot
    'bot.active': 'البوت نشط',
    'bot.paused': 'البوت متوقف',
    'bot.training': 'تدريب البوت',
    
    // Analytics
    'analytics.revenue': 'الإيرادات',
    'analytics.orders': 'الطلبات',
    'analytics.customers': 'العملاء',
    'analytics.conversion': 'معدل التحويل',
    'analytics.aiPrediction': 'توقعات الذكاء الاصطناعي',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.inbox': 'Inbox',
    'nav.orders': 'Orders',
    'nav.products': 'Products',
    'nav.customers': 'Customers',
    'nav.analytics': 'Analytics',
    'nav.broadcast': 'Broadcast',
    'nav.training': 'Bot Training',
    'nav.channels': 'Channels',
    'nav.settings': 'Settings',
    'nav.team': 'Team',
    'nav.invoices': 'Invoices',
    'nav.reports': 'Reports',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.success': 'Success',
    'common.error': 'Error occurred',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.totalOrders': 'Total Orders',
    'dashboard.totalCustomers': 'Total Customers',
    'dashboard.conversionRate': 'Conversion Rate',
    'dashboard.activeBots': 'Active Bots',
    
    // Orders
    'orders.new': 'New Order',
    'orders.pending': 'Pending',
    'orders.processing': 'Processing',
    'orders.shipped': 'Shipped',
    'orders.delivered': 'Delivered',
    'orders.cancelled': 'Cancelled',
    
    // Bot
    'bot.active': 'Bot Active',
    'bot.paused': 'Bot Paused',
    'bot.training': 'Bot Training',
    
    // Analytics
    'analytics.revenue': 'Revenue',
    'analytics.orders': 'Orders',
    'analytics.customers': 'Customers',
    'analytics.conversion': 'Conversion Rate',
    'analytics.aiPrediction': 'AI Predictions',
  },
  fr: {
    'nav.dashboard': 'Tableau de bord',
    'nav.inbox': 'Boîte de réception',
    'nav.orders': 'Commandes',
    'nav.products': 'Produits',
    'nav.customers': 'Clients',
    'nav.settings': 'Paramètres',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'dashboard.welcome': 'Bienvenue',
  },
  es: {
    'nav.dashboard': 'Panel de control',
    'nav.inbox': 'Bandeja de entrada',
    'nav.orders': 'Pedidos',
    'nav.products': 'Productos',
    'nav.customers': 'Clientes',
    'nav.settings': 'Configuración',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'dashboard.welcome': 'Bienvenido',
  },
  de: {
    'nav.dashboard': 'Dashboard',
    'nav.inbox': 'Posteingang',
    'nav.orders': 'Bestellungen',
    'nav.products': 'Produkte',
    'nav.customers': 'Kunden',
    'nav.settings': 'Einstellungen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'dashboard.welcome': 'Willkommen',
  },
  tr: {
    'nav.dashboard': 'Kontrol Paneli',
    'nav.inbox': 'Gelen Kutusu',
    'nav.orders': 'Siparişler',
    'nav.products': 'Ürünler',
    'nav.customers': 'Müşteriler',
    'nav.settings': 'Ayarlar',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'dashboard.welcome': 'Hoş geldiniz',
  },
};

// Translation hook helper
export function getTranslation(locale: Locale, key: string): string {
  const localeTranslations = translations[locale] as Record<string, string>;
  return localeTranslations?.[key] || translations.en[key as keyof typeof translations.en] || key;
}
