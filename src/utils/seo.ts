// SEO and GEO utility functions for MMC Astro

import type { EnhancedContentData } from '../types/content';

/**
 * Generate optimized title for SEO
 */
export function generateSEOTitle(contentData: EnhancedContentData, siteName: string = "MMC Financial"): string {
  const title = contentData.title;
  
  // Ensure title is within optimal length (30-60 characters)
  if (title.length > 60) {
    console.warn(`Title "${title}" is ${title.length} characters, consider shortening for better SEO`);
  }
  
  if (title.length < 30) {
    console.warn(`Title "${title}" is ${title.length} characters, consider lengthening for better SEO`);
  }
  
  return `${title} | ${siteName}`;
}

/**
 * Generate optimized meta description
 */
export function generateMetaDescription(contentData: EnhancedContentData): string {
  const description = contentData.metaDescription || contentData.summary;
  
  // Ensure description is within optimal length (120-160 characters)
  if (description.length > 160) {
    console.warn(`Meta description is ${description.length} characters, consider shortening for better SEO`);
    return description.substring(0, 157) + '...';
  }
  
  if (description.length < 120) {
    console.warn(`Meta description is ${description.length} characters, consider lengthening for better SEO`);
  }
  
  return description;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(url: URL, path?: string): string {
  const baseURL = url.origin;
  const pathname = path || url.pathname;
  
  // Remove trailing slash except for root
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  return `${baseURL}${cleanPath}`;
}

/**
 * Generate structured data for articles
 */
export function generateArticleSchema(contentData: EnhancedContentData, url: string) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": contentData.schemaType || "Article",
    "headline": contentData.title,
    "description": contentData.metaDescription || contentData.summary,
    "author": {
      "@type": "Person",
      "name": contentData.author,
      ...(contentData.authorCredentials && { 
        "jobTitle": contentData.authorCredentials.join(", ") 
      })
    },
    "datePublished": contentData.pubDate.toISOString(),
    "dateModified": contentData.pubDate.toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "MMC Financial",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mmcfin.com/MMCFavicon.png",
        "width": 32,
        "height": 32
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": contentData.focusKeywords?.join(", ") || contentData.tags.join(", "),
    "articleSection": contentData.type,
    "wordCount": estimateWordCount(contentData.summary),
    "inLanguage": "zh-CN"
  };

  // Add FAQ schema if present
  if (contentData.faqSections && contentData.faqSections.length > 0) {
    return {
      ...baseSchema,
      "@type": "FAQPage",
      "mainEntity": contentData.faqSections.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // Add HowTo schema if present
  if (contentData.howToSteps && contentData.howToSteps.length > 0) {
    return {
      ...baseSchema,
      "@type": "HowTo",
      "name": contentData.title,
      "description": contentData.metaDescription || contentData.summary,
      "step": contentData.howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        ...(step.image && { "image": step.image })
      })),
      "totalTime": "PT30M", // Default 30 minutes, should be customizable
      "supply": [], // Can be added if needed
      "tool": [] // Can be added if needed
    };
  }

  return baseSchema;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MMC Financial",
    "alternateName": ["MMC Financial Planning", "MMC", "MMC Financial Malaysia", "MMC 财务规划"],
    "url": "https://mmcfin.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mmcfin.com/MMCFavicon.png",
      "width": 32,
      "height": 32
    },
    "image": "https://mmcfin.com/images/contact/MMCOffice.webp",
    "description": "MMC Financial是马来西亚领先的财务规划公司，专业提供企业利润预算管理、财务规划咨询、现金流管理等服务。18年专业经验，500+成功案例，帮助客户实现30%+利润提升。",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "59.20, Exchange 106, Tun Razak Exchange (TRX)",
      "addressLocality": "Kuala Lumpur",
      "postalCode": "55188",
      "addressCountry": "MY"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+6011-27368039",
        "contactType": "customer service",
        "email": "admin@mmcfin.com",
        "availableLanguage": ["Chinese", "English", "Malay"]
      }
    ],
    "sameAs": [
      "https://www.facebook.com/mmc",
      "https://www.instagram.com/mmc",
      "https://www.linkedin.com/company/mmc"
    ],
    "foundingDate": "2008",
    "numberOfEmployees": "10-50",
    "serviceArea": {
      "@type": "Country",
      "name": "Malaysia"
    }
  };
}

/**
 * Estimate word count from text
 */
function estimateWordCount(text: string): number {
  return text.split(/\s+/).length;
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(contentData: EnhancedContentData, url: string, imageUrl?: string) {
  return {
    "og:type": "article",
    "og:title": contentData.title,
    "og:description": contentData.metaDescription || contentData.summary,
    "og:url": url,
    "og:site_name": "MMC Financial",
    "og:locale": "zh_CN",
    "og:image": imageUrl || "https://mmcfin.com/images/contact/MMCOffice.webp",
    "article:author": contentData.author,
    "article:published_time": contentData.pubDate.toISOString(),
    "article:section": contentData.type,
    "article:tag": contentData.tags.join(",")
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(contentData: EnhancedContentData, url: string, imageUrl?: string) {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": contentData.title,
    "twitter:description": contentData.metaDescription || contentData.summary,
    "twitter:url": url,
    "twitter:image": imageUrl || "https://mmcfin.com/images/contact/MMCOffice.webp"
  };
}

/**
 * Validate content data for SEO compliance
 */
export function validateContentForSEO(contentData: EnhancedContentData): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Title validation
  if (!contentData.title) {
    errors.push("Title is required");
  } else {
    if (contentData.title.length < 30) {
      warnings.push(`Title is ${contentData.title.length} characters, consider lengthening (30-60 recommended)`);
    }
    if (contentData.title.length > 60) {
      warnings.push(`Title is ${contentData.title.length} characters, consider shortening (30-60 recommended)`);
    }
  }

  // Meta description validation
  const description = contentData.metaDescription || contentData.summary;
  if (description.length < 120) {
    warnings.push(`Meta description is ${description.length} characters, consider lengthening (120-160 recommended)`);
  }
  if (description.length > 160) {
    warnings.push(`Meta description is ${description.length} characters, consider shortening (120-160 recommended)`);
  }

  // Keywords validation
  if (contentData.focusKeywords && contentData.focusKeywords.length > 5) {
    warnings.push(`Too many focus keywords (${contentData.focusKeywords.length}), consider limiting to 3-5`);
  }

  // Tags validation
  if (!contentData.tags || contentData.tags.length === 0) {
    warnings.push("No tags specified, consider adding 3-5 relevant tags");
  } else if (contentData.tags.length > 8) {
    warnings.push(`Too many tags (${contentData.tags.length}), consider limiting to 3-8`);
  }

  // GEO validation
  if (contentData.schemaType === 'FAQPage' && (!contentData.faqSections || contentData.faqSections.length === 0)) {
    errors.push("Schema type is FAQPage but no FAQ sections provided");
  }

  if (contentData.schemaType === 'HowTo' && (!contentData.howToSteps || contentData.howToSteps.length === 0)) {
    errors.push("Schema type is HowTo but no how-to steps provided");
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors
  };
}

/**
 * Generate robots meta tag content
 */
export function generateRobotsMetaTag(
  index: boolean = true,
  follow: boolean = true,
  imageIndex: boolean = true,
  snippet: boolean = true
): string {
  const directives: string[] = [];
  
  directives.push(index ? 'index' : 'noindex');
  directives.push(follow ? 'follow' : 'nofollow');
  
  if (imageIndex) {
    directives.push('max-image-preview:large');
  } else {
    directives.push('noimageindex');
  }
  
  if (snippet) {
    directives.push('max-snippet:-1');
    directives.push('max-video-preview:-1');
  } else {
    directives.push('nosnippet');
  }
  
  return directives.join(', ');
}