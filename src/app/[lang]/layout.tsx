import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer, hasAsset } from '@/components/Shared';
import { business } from '@/config/business';
import '@/styles/globals.css';
export function generateStaticParams(){return [{lang:'en'},{lang:'si'}];}
export default async function LocaleLayout({children,params}:{children:ReactNode;params:Promise<{lang:string}>}){const {lang}=await params;if(lang!=='en'&&lang!=='si')notFound();const schema={'@context':'https://schema.org','@type':'Organization',name:business.name,founder:{'@type':'Person',name:business.founder},email:business.email,telephone:business.phone,sameAs:[business.facebook],...(business.siteUrl?{url:business.siteUrl}:{})};return <html lang={lang} data-scroll-behavior="smooth"><body><Header locale={lang} logo={hasAsset('/brand/trustbridge-logo.png')}/><main id="main">{children}</main><Footer locale={lang}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></body></html>;}
