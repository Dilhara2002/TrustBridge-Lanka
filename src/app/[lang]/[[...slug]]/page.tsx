import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { business, pages, type Locale, type Page } from '@/config/business';
import { dictionaries } from '@/content/dictionaries';
import { PageContent } from '@/components/Pages';
export const dynamicParams=false;
export function generateStaticParams(){return pages.map(page=>({slug:page?[page]:[]}));}
type Params=Promise<{lang:string;slug?:string[]}>;
function route(p:{lang:string;slug?:string[]}){if(!['en','si'].includes(p.lang))notFound();const page=(p.slug||[]).join('/');if(!pages.includes(page as Page))notFound();return {locale:p.lang as Locale,page:page as Page};}
export async function generateMetadata({params}:{params:Params}):Promise<Metadata>{const {locale,page}=route(await params);const t=dictionaries[locale];const index=pages.indexOf(page);const title=`${t.nav[index]} | ${business.name}`;const descriptions=[t.intro,t.story,t.servicesIntro,t.vehicleText,t.how,t.safetyIntro,t.formIntro,t.faqTitle,t.contactIntro,t.privacySections[0][1],t.termsSections[0][1],t.bookingSections[0][1],t.destinationNote];const description=descriptions[index];const path=`/${locale}/${page?`${page}/`:''}`;return {title,description,icons:{icon:'/brand/favicon.svg'},...(business.siteUrl?{metadataBase:new URL(business.siteUrl),alternates:{canonical:path,languages:{en:`/en/${page?`${page}/`:''}`,si:`/si/${page?`${page}/`:''}`,'x-default':`/en/${page?`${page}/`:''}`}}}:{}),openGraph:{title,description,type:'website',locale:locale==='en'?'en_LK':'si_LK',siteName:business.name,...(business.siteUrl?{url:business.siteUrl+path,images:[{url:'/images/kandy.webp',width:1600,height:733,alt:t.destinations[0]}]}:{})},twitter:{card:'summary_large_image',title,description},robots:{index:!!business.siteUrl,follow:!!business.siteUrl}};}
export default async function Page({params}:{params:Params}){const {locale,page}=route(await params);return <PageContent locale={locale} page={page}/>;}
