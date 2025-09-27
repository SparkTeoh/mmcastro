// SEO and GEO validation utilities for MMC Astro

import type { EnhancedContentData } from '../types/content';

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0-100
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
}

export interface ValidationError {
  type: 'seo' | 'geo' | 'technical' | 'content';
  field: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ValidationWarning {
  type: 'seo' | 'geo' | 'technical' | 'content';
  field: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export interface ValidationSuggestion {
  type: 'seo' | 'geo' | 'technical' | 'content';
  field: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Comprehensive SEO and GEO validation
 */
export function validateContent(contentData: EnhancedContentData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: ValidationSuggestion[] = [];
  let score = 100;

  // === BASIC CONTENT VALIDATION ===
  
  // Title validation
  if (!contentData.title) {
    errors.push({
      type: 'seo',
      field: 'title',
      message: 'Title is required',
      severity: 'high'
    });
    score -= 20;
  } else {
    if (contentData.title.length < 30) {
      warnings.push({
        type: 'seo',
        field: 'title',
        message: `Title is ${contentData.title.length} characters. Recommended: 30-60 characters`,
        impact: 'medium'
      });
      score -= 5;
    }
    if (contentData.title.length > 60) {
      warnings.push({
        type: 'seo',
        field: 'title',
        message: `Title is ${contentData.title.length} characters. Recommended: 30-60 characters`,
        impact: 'medium'
      });
      score -= 5;
    }
  }

  // Summary validation
  if (!contentData.summary) {
    errors.push({
      type: 'content',
      field: 'summary',
      message: 'Summary is required',
      severity: 'high'
    });
    score -= 15;
  }

  // === SEO VALIDATION ===
  
  // Meta description validation
  const description = contentData.metaDescription || contentData.summary;
  if (description) {
    if (description.length < 120) {
      warnings.push({
        type: 'seo',
        field: 'metaDescription',
        message: `Meta description is ${description.length} characters. Recommended: 120-160 characters`,
        impact: 'medium'
      });
      score -= 5;
    }
    if (description.length > 160) {
      warnings.push({
        type: 'seo',
        field: 'metaDescription',
        message: `Meta description is ${description.length} characters. Recommended: 120-160 characters`,
        impact: 'medium'
      });
      score -= 5;
    }
  } else {
    warnings.push({
      type: 'seo',
      field: 'metaDescription',
      message: 'Meta description not provided, using summary instead',
      impact: 'low'
    });
    score -= 3;
  }

  // Focus keywords validation
  if (!contentData.focusKeywords || contentData.focusKeywords.length === 0) {
    warnings.push({
      type: 'seo',
      field: 'focusKeywords',
      message: 'No focus keywords specified. Recommended: 1-5 keywords',
      impact: 'medium'
    });
    score -= 8;
  } else {
    if (contentData.focusKeywords.length > 5) {
      warnings.push({
        type: 'seo',
        field: 'focusKeywords',
        message: `Too many focus keywords (${contentData.focusKeywords.length}). Recommended: 1-5 keywords`,
        impact: 'low'
      });
      score -= 3;
    }
  }

  // Tags validation
  if (!contentData.tags || contentData.tags.length === 0) {
    warnings.push({
      type: 'seo',
      field: 'tags',
      message: 'No tags specified. Recommended: 3-8 relevant tags',
      impact: 'medium'
    });
    score -= 5;
  } else {
    if (contentData.tags.length > 8) {
      warnings.push({
        type: 'seo',
        field: 'tags',
        message: `Too many tags (${contentData.tags.length}). Recommended: 3-8 tags`,
        impact: 'low'
      });
      score -= 2;
    }
  }

  // === GEO VALIDATION ===
  
  // Schema type validation
  if (!contentData.schemaType) {
    warnings.push({
      type: 'geo',
      field: 'schemaType',
      message: 'Schema type not specified. Defaulting to Article',
      impact: 'low'
    });
    score -= 3;
  }

  // FAQ validation for FAQPage schema
  if (contentData.schemaType === 'FAQPage') {
    if (!contentData.faqSections || contentData.faqSections.length === 0) {
      errors.push({
        type: 'geo',
        field: 'faqSections',
        message: 'Schema type is FAQPage but no FAQ sections provided',
        severity: 'high'
      });
      score -= 15;
    } else {
      if (contentData.faqSections.length < 3) {
        suggestions.push({
          type: 'geo',
          field: 'faqSections',
          message: `Only ${contentData.faqSections.length} FAQ items. Consider adding more (3-8 recommended)`,
          priority: 'medium'
        });
      }
      
      // Validate individual FAQ items
      contentData.faqSections.forEach((faq, index) => {
        if (!faq.question || faq.question.length < 10) {
          warnings.push({
            type: 'geo',
            field: `faqSections[${index}].question`,
            message: 'FAQ question is too short or missing',
            impact: 'medium'
          });
          score -= 2;
        }
        
        if (!faq.answer || faq.answer.length < 20) {
          warnings.push({
            type: 'geo',
            field: `faqSections[${index}].answer`,
            message: 'FAQ answer is too short or missing',
            impact: 'medium'
          });
          score -= 2;
        }
      });
    }
  }

  // HowTo validation for HowTo schema
  if (contentData.schemaType === 'HowTo') {
    if (!contentData.howToSteps || contentData.howToSteps.length === 0) {
      errors.push({
        type: 'geo',
        field: 'howToSteps',
        message: 'Schema type is HowTo but no how-to steps provided',
        severity: 'high'
      });
      score -= 15;
    } else {
      if (contentData.howToSteps.length < 3) {
        warnings.push({
          type: 'geo',
          field: 'howToSteps',
          message: `Only ${contentData.howToSteps.length} steps. Consider adding more (3-10 recommended)`,
          impact: 'medium'
        });
        score -= 3;
      }
      
      // Validate individual steps
      contentData.howToSteps.forEach((step, index) => {
        if (!step.name || step.name.length < 5) {
          warnings.push({
            type: 'geo',
            field: `howToSteps[${index}].name`,
            message: 'Step name is too short or missing',
            impact: 'medium'
          });
          score -= 2;
        }
        
        if (!step.text || step.text.length < 20) {
          warnings.push({
            type: 'geo',
            field: `howToSteps[${index}].text`,
            message: 'Step description is too short or missing',
            impact: 'medium'
          });
          score -= 2;
        }
      });
    }
  }

  // === E-E-A-T VALIDATION ===
  
  // Author credentials validation
  if (!contentData.authorCredentials || contentData.authorCredentials.length === 0) {
    suggestions.push({
      type: 'geo',
      field: 'authorCredentials',
      message: 'No author credentials provided. Adding credentials improves E-E-A-T signals',
      priority: 'medium'
    });
    score -= 5;
  }

  // Sources validation
  if (!contentData.sources || contentData.sources.length === 0) {
    suggestions.push({
      type: 'geo',
      field: 'sources',
      message: 'No sources provided. Adding authoritative sources improves trustworthiness',
      priority: 'medium'
    });
    score -= 5;
  }

  // === TECHNICAL VALIDATION ===
  
  // Publication date validation
  if (!contentData.pubDate) {
    errors.push({
      type: 'technical',
      field: 'pubDate',
      message: 'Publication date is required',
      severity: 'medium'
    });
    score -= 10;
  } else {
    const now = new Date();
    const pubDate = new Date(contentData.pubDate);
    
    if (pubDate > now) {
      warnings.push({
        type: 'technical',
        field: 'pubDate',
        message: 'Publication date is in the future',
        impact: 'low'
      });
    }
  }

  // Author validation
  if (!contentData.author) {
    errors.push({
      type: 'technical',
      field: 'author',
      message: 'Author is required',
      severity: 'medium'
    });
    score -= 10;
  }

  // === SUGGESTIONS FOR IMPROVEMENT ===
  
  // General GEO suggestions
  if (!contentData.faqSections || contentData.faqSections.length === 0) {
    suggestions.push({
      type: 'geo',
      field: 'faqSections',
      message: 'Consider adding FAQ sections to improve AI discoverability',
      priority: 'medium'
    });
  }

  // Content structure suggestions
  if (contentData.summary && contentData.summary.length > 200) {
    suggestions.push({
      type: 'content',
      field: 'summary',
      message: 'Consider shortening summary for better readability',
      priority: 'low'
    });
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  return {
    isValid: errors.length === 0,
    score,
    errors,
    warnings,
    suggestions
  };
}

/**
 * Generate validation report
 */
export function generateValidationReport(result: ValidationResult): string {
  let report = `\n=== SEO/GEO Validation Report ===\n`;
  report += `Overall Score: ${result.score}/100\n`;
  report += `Status: ${result.isValid ? '✅ VALID' : '❌ INVALID'}\n\n`;

  if (result.errors.length > 0) {
    report += `🚨 ERRORS (${result.errors.length}):\n`;
    result.errors.forEach((error, index) => {
      report += `${index + 1}. [${error.type.toUpperCase()}] ${error.field}: ${error.message} (${error.severity})\n`;
    });
    report += '\n';
  }

  if (result.warnings.length > 0) {
    report += `⚠️  WARNINGS (${result.warnings.length}):\n`;
    result.warnings.forEach((warning, index) => {
      report += `${index + 1}. [${warning.type.toUpperCase()}] ${warning.field}: ${warning.message} (${warning.impact} impact)\n`;
    });
    report += '\n';
  }

  if (result.suggestions.length > 0) {
    report += `💡 SUGGESTIONS (${result.suggestions.length}):\n`;
    result.suggestions.forEach((suggestion, index) => {
      report += `${index + 1}. [${suggestion.type.toUpperCase()}] ${suggestion.field}: ${suggestion.message} (${suggestion.priority} priority)\n`;
    });
    report += '\n';
  }

  if (result.isValid && result.score >= 90) {
    report += '🎉 Excellent! Your content is well-optimized for both SEO and GEO.\n';
  } else if (result.score >= 80) {
    report += '👍 Good optimization! Consider addressing the warnings and suggestions above.\n';
  } else if (result.score >= 60) {
    report += '⚡ Needs improvement. Please address the errors and warnings above.\n';
  } else {
    report += '🔧 Significant optimization needed. Please address all issues above.\n';
  }

  return report;
}

/**
 * Validate schema markup JSON
 */
export function validateSchemaMarkup(schema: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!schema['@context']) {
    errors.push('Missing @context property');
  } else if (schema['@context'] !== 'https://schema.org') {
    errors.push('Invalid @context value. Should be "https://schema.org"');
  }

  if (!schema['@type']) {
    errors.push('Missing @type property');
  }

  // Validate based on schema type
  if (schema['@type'] === 'Article') {
    if (!schema.headline) errors.push('Article missing headline');
    if (!schema.author) errors.push('Article missing author');
    if (!schema.datePublished) errors.push('Article missing datePublished');
  }

  if (schema['@type'] === 'FAQPage') {
    if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
      errors.push('FAQPage missing mainEntity array');
    } else {
      schema.mainEntity.forEach((item: any, index: number) => {
        if (item['@type'] !== 'Question') {
          errors.push(`FAQ item ${index + 1} should have @type "Question"`);
        }
        if (!item.name) {
          errors.push(`FAQ item ${index + 1} missing name (question)`);
        }
        if (!item.acceptedAnswer || item.acceptedAnswer['@type'] !== 'Answer') {
          errors.push(`FAQ item ${index + 1} missing valid acceptedAnswer`);
        }
      });
    }
  }

  if (schema['@type'] === 'HowTo') {
    if (!schema.name) errors.push('HowTo missing name');
    if (!schema.step || !Array.isArray(schema.step)) {
      errors.push('HowTo missing step array');
    } else {
      schema.step.forEach((step: any, index: number) => {
        if (step['@type'] !== 'HowToStep') {
          errors.push(`Step ${index + 1} should have @type "HowToStep"`);
        }
        if (!step.name) {
          errors.push(`Step ${index + 1} missing name`);
        }
        if (!step.text) {
          errors.push(`Step ${index + 1} missing text`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Test content against common AI query patterns
 */
export function testAIQueryCompatibility(contentData: EnhancedContentData): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 100;

  // Test for answer-first structure
  if (!contentData.faqSections || contentData.faqSections.length === 0) {
    feedback.push('❌ No FAQ sections found. AI systems prefer direct Q&A format.');
    score -= 20;
  } else {
    feedback.push(`✅ Found ${contentData.faqSections.length} FAQ sections - good for AI extraction.`);
  }

  // Test for conversational queries
  const hasConversationalKeywords = contentData.focusKeywords?.some(keyword => 
    keyword.includes('如何') || keyword.includes('什么是') || keyword.includes('怎么')
  );
  
  if (!hasConversationalKeywords) {
    feedback.push('⚠️  Consider including conversational keywords (如何, 什么是, 怎么) for better AI matching.');
    score -= 10;
  } else {
    feedback.push('✅ Contains conversational keywords - good for AI query matching.');
  }

  // Test for step-by-step content
  if (contentData.howToSteps && contentData.howToSteps.length > 0) {
    feedback.push(`✅ Contains ${contentData.howToSteps.length} how-to steps - excellent for AI instruction queries.`);
  } else {
    feedback.push('💡 Consider adding step-by-step instructions if applicable.');
    score -= 5;
  }

  // Test for authority signals
  if (contentData.authorCredentials && contentData.authorCredentials.length > 0) {
    feedback.push('✅ Author credentials provided - good for E-E-A-T signals.');
  } else {
    feedback.push('⚠️  No author credentials found. Adding credentials improves trustworthiness.');
    score -= 10;
  }

  if (contentData.sources && contentData.sources.length > 0) {
    feedback.push('✅ Sources provided - good for factual verification.');
  } else {
    feedback.push('⚠️  No sources found. Adding authoritative sources improves credibility.');
    score -= 10;
  }

  return { score: Math.max(0, score), feedback };
}