import type { MetadataRoute } from 'next';
import { business,pages } from '@/config/business';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {if(!business.siteUrl)return [];return ['en','si'].flatMap(lang=>pages.map(page=>({url:`${business.siteUrl}/${lang}/${page?`${page}/`:''}`,alternates:{languages:{en:`${business.siteUrl}/en/${page?`${page}/`:''}`,si:`${business.siteUrl}/si/${page?`${page}/`:''}`}}})));}
