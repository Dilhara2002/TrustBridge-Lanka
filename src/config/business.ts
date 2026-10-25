export const business = {
 name: 'TrustBridge Lanka', founder: 'Ishan Wijesinghe', location: 'Kandy, Sri Lanka',
 phone: '+94723201365', whatsapp: 'https://wa.me/94723201365', email: 'wijesinghelageishan@gmail.com',
 facebook: 'https://www.facebook.com/share/1C6Ut69VRK/?mibextid=wwXIfr', status: 'accepting-planning-enquiries',
 siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || '',
 vehicles: [{id:'axio',name:'Toyota Axio Hybrid 2016',image:'/images/vehicles/axio.jpg'}, {id:'wagon-r',name:'Suzuki Wagon R Stingray Hybrid 2018',image:'/images/vehicles/wagon-r.jpg'}],
 destinationIds: ['kandy','anuradhapura','mihintale','kelaniya','kataragama'] as const,
 packages: ['blessing','premium','sacred','custom'] as const,
};
export type Locale = 'en' | 'si';
export const pages = ['', 'about', 'packages', 'vehicles', 'how-it-works', 'safety', 'quote', 'faq', 'contact', 'privacy', 'terms', 'booking', 'credits'] as const;
export type Page = typeof pages[number];
