#!/usr/bin/env node

/**
 * SEO/GEO Testing and Validation Script for MMC Astro
 * 
 * This script tests the SEO and GEO implementation by:
 * 1. Validating content files
 * 2. Checking schema markup
 * 3. Testing technical SEO elements
 * 4. Generating validation reports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(message, 'bright');
  log('='.repeat(60), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

/**
 * Test 1: Validate content files structure
 */
function testContentFiles() {
  logHeader('Testing Content Files Structure');
  
  const contentDir = path.join(__dirname, '../src/pages/content');
  let passedTests = 0;
  let totalTests = 0;
  
  try {
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.astro') && !['index.astro', '[slug].astro'].includes(file));
    
    logInfo(`Found ${files.length} content files to test`);
    
    files.forEach(file => {
      totalTests++;
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Test 1.1: Check for enhanced contentData structure
      if (content.includes('EnhancedContentData') || content.includes('contentData:')) {
        logSuccess(`${file}: Uses enhanced contentData structure`);
        passedTests++;
      } else {
        logWarning(`${file}: Missing enhanced contentData structure`);
      }
      
      // Test 1.2: Check for SEO components import
      totalTests++;
      if (content.includes('FAQSection') || content.includes('HowToSection') || content.includes('AnswerBlock')) {
        logSuccess(`${file}: Imports SEO/GEO components`);
        passedTests++;
      } else {
        logWarning(`${file}: Missing SEO/GEO component imports`);
      }
      
      // Test 1.3: Check for contentData passed to Layout
      totalTests++;
      if (content.includes('contentData={contentData}')) {
        logSuccess(`${file}: Passes contentData to Layout`);
        passedTests++;
      } else {
        logWarning(`${file}: Not passing contentData to Layout`);
      }
    });
    
    log(`\nContent Files Test Results: ${passedTests}/${totalTests} passed`, 
        passedTests === totalTests ? 'green' : 'yellow');
    
  } catch (error) {
    logError(`Failed to test content files: ${error.message}`);
  }
}

/**
 * Test 2: Validate component files
 */
function testComponents() {
  logHeader('Testing SEO/GEO Components');
  
  const componentsToTest = [
    'src/components/ui/FAQSection.astro',
    'src/components/ui/HowToSection.astro',
    'src/components/ui/AnswerBlock.astro',
    'src/components/seo/SEOHead.astro'
  ];
  
  let passedTests = 0;
  let totalTests = componentsToTest.length;
  
  componentsToTest.forEach(componentPath => {
    const fullPath = path.join(__dirname, '..', componentPath);
    
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Check for schema markup
      if (content.includes('itemscope') && content.includes('itemtype')) {
        logSuccess(`${path.basename(componentPath)}: Contains proper schema markup`);
        passedTests++;
      } else {
        logWarning(`${path.basename(componentPath)}: Missing schema markup`);
      }
    } else {
      logError(`${path.basename(componentPath)}: Component file not found`);
    }
  });
  
  log(`\nComponents Test Results: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
}

/**
 * Test 3: Validate technical SEO files
 */
function testTechnicalSEO() {
  logHeader('Testing Technical SEO Implementation');
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test robots.txt
  totalTests++;
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    
    if (robotsContent.includes('GPTBot') && robotsContent.includes('ClaudeBot')) {
      logSuccess('robots.txt: Contains AI crawler directives');
      passedTests++;
    } else {
      logWarning('robots.txt: Missing AI crawler directives');
    }
  } else {
    logError('robots.txt: File not found');
  }
  
  // Test Astro config for sitemap
  totalTests++;
  const configPath = path.join(__dirname, '../astro.config.mjs');
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf-8');
    
    if (configContent.includes('sitemap')) {
      logSuccess('astro.config.mjs: Sitemap integration configured');
      passedTests++;
    } else {
      logWarning('astro.config.mjs: Sitemap integration not found');
    }
  } else {
    logError('astro.config.mjs: File not found');
  }
  
  // Test SEO utilities
  totalTests++;
  const seoUtilsPath = path.join(__dirname, '../src/utils/seo.ts');
  if (fs.existsSync(seoUtilsPath)) {
    logSuccess('SEO utilities: File exists');
    passedTests++;
  } else {
    logError('SEO utilities: File not found');
  }
  
  // Test content types
  totalTests++;
  const contentTypesPath = path.join(__dirname, '../src/types/content.ts');
  if (fs.existsSync(contentTypesPath)) {
    logSuccess('Content types: File exists');
    passedTests++;
  } else {
    logError('Content types: File not found');
  }
  
  log(`\nTechnical SEO Test Results: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
}

/**
 * Test 4: Validate Layout enhancements
 */
function testLayoutEnhancements() {
  logHeader('Testing Layout Enhancements');
  
  const layoutPath = path.join(__dirname, '../src/layouts/Layout.astro');
  let passedTests = 0;
  let totalTests = 0;
  
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    
    // Test for enhanced contentData support
    totalTests++;
    if (layoutContent.includes('EnhancedContentData')) {
      logSuccess('Layout: Supports enhanced contentData');
      passedTests++;
    } else {
      logWarning('Layout: Missing enhanced contentData support');
    }
    
    // Test for schema generation
    totalTests++;
    if (layoutContent.includes('generateContentSchema') || layoutContent.includes('JSON.stringify')) {
      logSuccess('Layout: Includes schema generation');
      passedTests++;
    } else {
      logWarning('Layout: Missing schema generation');
    }
    
    // Test for AI crawler meta tags
    totalTests++;
    if (layoutContent.includes('GPTBot') || layoutContent.includes('ClaudeBot')) {
      logSuccess('Layout: Includes AI crawler meta tags');
      passedTests++;
    } else {
      logWarning('Layout: Missing AI crawler meta tags');
    }
    
    // Test for enhanced Open Graph tags
    totalTests++;
    if (layoutContent.includes('article:author') || layoutContent.includes('article:published_time')) {
      logSuccess('Layout: Includes enhanced Open Graph tags');
      passedTests++;
    } else {
      logWarning('Layout: Missing enhanced Open Graph tags');
    }
    
  } else {
    logError('Layout: File not found');
    totalTests = 4; // Set total tests even if file not found
  }
  
  log(`\nLayout Test Results: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
}

/**
 * Test 5: Validate templates and documentation
 */
function testTemplatesAndDocs() {
  logHeader('Testing Templates and Documentation');
  
  const filesToTest = [
    'CONTENT_CREATION_GUIDE.md',
    'src/templates/article-template.astro',
    'src/templates/howto-template.astro',
    'src/templates/faq-template.astro'
  ];
  
  let passedTests = 0;
  let totalTests = filesToTest.length;
  
  filesToTest.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (fs.existsSync(fullPath)) {
      logSuccess(`${path.basename(filePath)}: File exists`);
      passedTests++;
    } else {
      logError(`${path.basename(filePath)}: File not found`);
    }
  });
  
  log(`\nTemplates and Documentation Test Results: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
}

/**
 * Generate overall test report
 */
function generateTestReport() {
  logHeader('SEO/GEO Implementation Test Summary');
  
  logInfo('Test Categories Completed:');
  log('  1. ✅ Content Files Structure');
  log('  2. ✅ SEO/GEO Components');
  log('  3. ✅ Technical SEO Implementation');
  log('  4. ✅ Layout Enhancements');
  log('  5. ✅ Templates and Documentation');
  
  log('\nNext Steps:', 'bright');
  log('1. Run "npm run build" to test the build process');
  log('2. Test individual pages with Google\'s Rich Results Test');
  log('3. Validate schema markup at schema.org validator');
  log('4. Check mobile responsiveness');
  log('5. Test page load speeds');
  
  log('\nValidation Tools:', 'bright');
  log('• Google Rich Results Test: https://search.google.com/test/rich-results');
  log('• Schema.org Validator: https://validator.schema.org/');
  log('• Google PageSpeed Insights: https://pagespeed.web.dev/');
  log('• Mobile-Friendly Test: https://search.google.com/test/mobile-friendly');
  
  log('\nFor content validation, use the SEO validator utility in your content files.', 'cyan');
}

/**
 * Main test runner
 */
function runTests() {
  log('🚀 Starting SEO/GEO Implementation Tests...', 'bright');
  
  testContentFiles();
  testComponents();
  testTechnicalSEO();
  testLayoutEnhancements();
  testTemplatesAndDocs();
  generateTestReport();
  
  log('\n🎉 All tests completed!', 'green');
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { runTests };