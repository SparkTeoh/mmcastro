// Enhanced ContentData interface for SEO and GEO optimization

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface EnhancedContentData {
  // Existing fields
  title: string;
  summary: string;
  author: string;
  pubDate: Date;
  tags: string[];
  type: string;
  featured: boolean;
  
  // SEO fields
  metaDescription?: string;
  focusKeywords?: string[];
  
  // GEO fields
  faqSections?: FAQItem[];
  howToSteps?: HowToStep[];
  
  // Schema type
  schemaType?: 'Article' | 'HowTo' | 'FAQPage';
  
  // E-E-A-T signals
  authorCredentials?: string[];
  sources?: string[];
}

// Legacy support - for backward compatibility
export interface ContentData {
  title: string;
  summary: string;
  author: string;
  pubDate: Date;
  tags: string[];
  type: string;
  featured: boolean;
}

// Content creation guidelines
export const CONTENT_GUIDELINES = {
  SEO: {
    titleLength: { min: 30, max: 60 },
    metaDescriptionLength: { min: 120, max: 160 },
    focusKeywordsCount: { min: 1, max: 5 }
  },
  GEO: {
    answerFirstStructure: "Start each section with a direct, complete answer followed by detailed explanation",
    faqRecommendations: "Include 3-8 frequently asked questions relevant to the content",
    howToSteps: "Break down processes into clear, actionable steps (3-10 steps recommended)"
  },
  EEAT: {
    authorCredentials: "Include relevant qualifications, certifications, or experience",
    sources: "Cite authoritative sources to support claims and statistics"
  }
} as const;

// Schema type recommendations based on content
export const getRecommendedSchemaType = (content: Partial<EnhancedContentData>): 'Article' | 'HowTo' | 'FAQPage' => {
  if (content.howToSteps && content.howToSteps.length > 0) {
    return 'HowTo';
  }
  if (content.faqSections && content.faqSections.length > 0) {
    return 'FAQPage';
  }
  return 'Article';
};

// Validation helpers
export const validateContentData = (data: EnhancedContentData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Required fields validation
  if (!data.title || data.title.length < CONTENT_GUIDELINES.SEO.titleLength.min) {
    errors.push(`Title must be at least ${CONTENT_GUIDELINES.SEO.titleLength.min} characters`);
  }
  
  if (data.title && data.title.length > CONTENT_GUIDELINES.SEO.titleLength.max) {
    errors.push(`Title should not exceed ${CONTENT_GUIDELINES.SEO.titleLength.max} characters`);
  }
  
  if (data.metaDescription && data.metaDescription.length < CONTENT_GUIDELINES.SEO.metaDescriptionLength.min) {
    errors.push(`Meta description should be at least ${CONTENT_GUIDELINES.SEO.metaDescriptionLength.min} characters`);
  }
  
  if (data.metaDescription && data.metaDescription.length > CONTENT_GUIDELINES.SEO.metaDescriptionLength.max) {
    errors.push(`Meta description should not exceed ${CONTENT_GUIDELINES.SEO.metaDescriptionLength.max} characters`);
  }
  
  if (data.focusKeywords && data.focusKeywords.length > CONTENT_GUIDELINES.SEO.focusKeywordsCount.max) {
    errors.push(`Focus keywords should not exceed ${CONTENT_GUIDELINES.SEO.focusKeywordsCount.max} items`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};