// Example usage of SEO/GEO validation utilities

import { validateContent, generateValidationReport, testAIQueryCompatibility } from './seo-validator';
import type { EnhancedContentData } from '../types/content';

// Example content data for testing
const exampleContentData: EnhancedContentData = {
  title: "企业财务规划的重要性与实施策略",
  summary: "深入探讨企业财务规划在现代商业环境中的关键作用，以及如何制定有效的财务策略来推动业务增长和风险管理。",
  author: "MMC Financial",
  pubDate: new Date('2024-01-15'),
  tags: ['财务规划', '企业管理', '预算控制', '风险管理'],
  type: '专业内容',
  featured: true,
  
  // SEO fields
  metaDescription: "了解企业财务规划的核心要素和最佳实践。MMC Financial专业团队分享如何通过科学的财务规划实现30%利润提升，包括预算管理、现金流控制和风险管理策略。",
  focusKeywords: ["企业财务规划", "预算管理", "现金流管理", "财务策略"],
  
  // GEO fields
  schemaType: "FAQPage",
  faqSections: [
    {
      question: "什么是企业财务规划？",
      answer: "企业财务规划是一个系统性的过程，包括预算管理、现金流控制、风险评估和投资决策，旨在帮助企业实现长期财务目标和可持续发展。"
    },
    {
      question: "财务规划对企业有什么好处？",
      answer: "有效的财务规划可以帮助企业控制成本、优化资源配置、降低财务风险、提高盈利能力。根据MMC的经验，科学的财务规划平均可以帮助企业实现30%的利润提升。"
    }
  ],
  
  // E-E-A-T signals
  authorCredentials: ["18年财务规划经验", "500+成功案例", "马来西亚注册财务顾问"],
  sources: [
    "马来西亚中小企业发展银行财务管理指南",
    "亚洲企业财务规划最佳实践研究报告"
  ]
};

// Example of poor content data for comparison
const poorContentData: EnhancedContentData = {
  title: "财务", // Too short
  summary: "关于财务的内容", // Too short and vague
  author: "MMC Financial",
  pubDate: new Date('2024-01-15'),
  tags: [], // No tags
  type: '专业内容',
  featured: false,
  
  // Missing SEO fields
  schemaType: "FAQPage",
  // Missing FAQ sections despite FAQPage schema type
  
  // Missing E-E-A-T signals
};

/**
 * Run validation examples
 */
export function runValidationExamples() {
  console.log('🔍 Running SEO/GEO Validation Examples...\n');
  
  // Test good content
  console.log('=== Testing Well-Optimized Content ===');
  const goodResult = validateContent(exampleContentData);
  console.log(generateValidationReport(goodResult));
  
  // Test AI query compatibility
  const aiCompatibility = testAIQueryCompatibility(exampleContentData);
  console.log('=== AI Query Compatibility Test ===');
  console.log(`Score: ${aiCompatibility.score}/100`);
  aiCompatibility.feedback.forEach(feedback => console.log(feedback));
  
  // Test poor content
  console.log('\n=== Testing Poorly-Optimized Content ===');
  const poorResult = validateContent(poorContentData);
  console.log(generateValidationReport(poorResult));
  
  // Test AI query compatibility for poor content
  const poorAICompatibility = testAIQueryCompatibility(poorContentData);
  console.log('=== AI Query Compatibility Test (Poor Content) ===');
  console.log(`Score: ${poorAICompatibility.score}/100`);
  poorAICompatibility.feedback.forEach(feedback => console.log(feedback));
}

/**
 * Validate a specific content file
 */
export function validateContentFile(contentData: EnhancedContentData): void {
  console.log('🔍 Validating Content...\n');
  
  const result = validateContent(contentData);
  console.log(generateValidationReport(result));
  
  const aiCompatibility = testAIQueryCompatibility(contentData);
  console.log('=== AI Query Compatibility ===');
  console.log(`Score: ${aiCompatibility.score}/100`);
  aiCompatibility.feedback.forEach(feedback => console.log(feedback));
  
  // Provide actionable recommendations
  if (result.score < 80) {
    console.log('\n📋 Recommended Actions:');
    
    if (result.errors.length > 0) {
      console.log('1. Fix all errors first (these are critical issues)');
    }
    
    if (result.warnings.length > 0) {
      console.log('2. Address warnings to improve SEO performance');
    }
    
    if (result.suggestions.length > 0) {
      console.log('3. Consider implementing suggestions for better GEO optimization');
    }
    
    console.log('4. Test your content with Google\'s Rich Results Test');
    console.log('5. Validate schema markup at schema.org validator');
  } else {
    console.log('\n🎉 Great job! Your content is well-optimized for both SEO and GEO.');
  }
}

// Run examples if this file is executed directly
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  runValidationExamples();
}