# MMC Astro 内容创建指南 - SEO & GEO 优化版

## 概述

本指南将帮助您创建既符合传统SEO要求，又针对AI搜索引擎（如ChatGPT、Perplexity、Google AI Overviews）优化的高质量内容。

## 增强的 contentData 结构

### 完整的 contentData 模板

```typescript
const contentData: EnhancedContentData = {
  // === 基础字段（必填） ===
  title: "您的文章标题（30-60字符）",
  summary: "文章摘要，简洁描述文章主要内容（120-160字符）",
  author: "MMC Financial",
  pubDate: new Date('2024-01-20'),
  tags: ['标签1', '标签2', '标签3'], // 3-5个相关标签
  type: '专业内容', // 或 '案例分析', '技术展示', '行业洞察'
  featured: false, // 是否为推荐内容
  
  // === SEO 优化字段 ===
  metaDescription: "专门为搜索引擎优化的描述（120-160字符）",
  focusKeywords: ["主要关键词", "次要关键词", "长尾关键词"], // 1-5个关键词
  
  // === GEO 优化字段 ===
  schemaType: "Article", // 'Article' | 'HowTo' | 'FAQPage'
  faqSections: [ // 可选：FAQ部分
    {
      question: "用户常问的问题？",
      answer: "直接、完整的答案，适合AI提取和引用。"
    }
  ],
  howToSteps: [ // 可选：操作步骤
    {
      name: "步骤标题",
      text: "详细的步骤说明，清晰易懂。"
    }
  ],
  
  // === E-E-A-T 信号字段 ===
  authorCredentials: ["相关资质", "专业经验", "认证信息"],
  sources: ["权威来源1", "参考资料2", "行业报告3"]
};
```

### 字段说明和最佳实践

#### 基础字段优化
- **title**: 30-60字符，包含主要关键词，吸引用户点击
- **summary**: 120-160字符，简洁概括文章价值
- **tags**: 选择3-5个精准标签，有助于内容分类和搜索

#### SEO字段优化
- **metaDescription**: 专门为搜索引擎编写，包含关键词和行动号召
- **focusKeywords**: 选择1-5个相关关键词，避免关键词堆砌

#### GEO字段优化
- **schemaType**: 根据内容类型选择合适的Schema类型
- **faqSections**: 回答用户常见问题，便于AI提取
- **howToSteps**: 提供清晰的操作指导

## 内容结构最佳实践

### 1. Answer-First 写作结构

每个主要章节都应该采用"答案优先"的结构：

```astro
<AnswerBlock 
  question="用户会问的具体问题？"
  directAnswer="直接、完整的答案，AI可以直接引用。"
  detailedExplanation="详细解释，提供更多背景信息和实例。"
/>
```

### 2. 语义化HTML结构

```astro
<article class="content-article" itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">{contentData.title}</h1>
    <meta itemprop="datePublished" content={contentData.pubDate.toISOString()} />
    <meta itemprop="author" content={contentData.author} />
  </header>
  
  <main>
    <!-- 使用正确的标题层级 -->
    <h2>主要章节标题</h2>
    <h3>子章节标题</h3>
    
    <!-- 使用语义化列表 -->
    <ul>
      <li>要点1</li>
      <li>要点2</li>
    </ul>
    
    <!-- 使用表格展示数据 -->
    <table>
      <thead>
        <tr><th>项目</th><th>数值</th></tr>
      </thead>
      <tbody>
        <tr><td>数据1</td><td>值1</td></tr>
      </tbody>
    </table>
  </main>
</article>
```

### 3. 组件使用指南

#### FAQ组件
```astro
<FAQSection 
  faqs={contentData.faqSections!}
  title="常见问题"
  class="my-12"
/>
```

#### How-To组件
```astro
<HowToSection 
  steps={contentData.howToSteps!}
  title="操作指南"
  totalTime="30分钟"
  difficulty="medium"
  class="my-12"
/>
```

#### Answer Block组件
```astro
<AnswerBlock 
  question="具体问题"
  directAnswer="直接答案"
  detailedExplanation="详细说明"
  level={2}
/>
```

## 内容模板

### 1. 专业文章模板

```astro
---
import Layout from "../../layouts/Layout.astro";
import Navigation from "../../components/ui/Navigation.astro";
import Footer from "../../components/ui/Footer.astro";
import FAQSection from "../../components/ui/FAQSection.astro";
import AnswerBlock from "../../components/ui/AnswerBlock.astro";
import type { EnhancedContentData } from "../../types/content";

const contentData: EnhancedContentData = {
  title: "您的文章标题",
  summary: "文章摘要",
  author: "MMC Financial",
  pubDate: new Date('2024-01-20'),
  tags: ['财务规划', '企业管理'],
  type: '专业内容',
  featured: false,
  
  metaDescription: "SEO优化的描述",
  focusKeywords: ["关键词1", "关键词2"],
  schemaType: "Article",
  
  faqSections: [
    {
      question: "常见问题？",
      answer: "详细答案"
    }
  ],
  
  authorCredentials: ["专业资质"],
  sources: ["权威来源"]
};
---

<Layout title={contentData.title} contentData={contentData}>
  <Navigation />
  
  <main class="min-h-screen bg-gradient-to-br from-theme-light to-white pt-20">
    <article class="container mx-auto px-4 py-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-bold text-primary mb-4">
          {contentData.title}
        </h1>
        <p class="text-xl text-text-default max-w-3xl mx-auto">
          {contentData.summary}
        </p>
        <div class="flex items-center justify-center space-x-4 mt-6">
          <span class="text-sm text-gray-500">作者：{contentData.author}</span>
          <span class="text-sm text-gray-500">
            发布时间：{contentData.pubDate.toLocaleDateString("zh-CN")}
          </span>
        </div>
      </header>

      <div class="prose prose-lg max-w-4xl mx-auto">
        <!-- Answer-First 内容块 -->
        <AnswerBlock 
          question="核心问题？"
          directAnswer="直接答案"
          detailedExplanation="详细解释"
        />
        
        <!-- 主要内容 -->
        <h2>主要章节</h2>
        <p>内容段落...</p>
        
        <!-- FAQ部分 -->
        {contentData.faqSections && (
          <FAQSection 
            faqs={contentData.faqSections} 
            class="my-12"
          />
        )}
        
        <!-- E-E-A-T信号 -->
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3 class="text-lg font-semibold text-primary mb-4">专业资质与参考</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-800 mb-2">专业认证</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                {contentData.authorCredentials?.map(credential => (
                  <li>• {credential}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">参考资料</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                {contentData.sources?.map(source => (
                  <li>• {source}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  </main>

  <Footer />
</Layout>
```

### 2. How-To指南模板

```astro
const contentData: EnhancedContentData = {
  // ... 基础字段
  schemaType: "HowTo",
  howToSteps: [
    {
      name: "第一步：准备工作",
      text: "详细说明第一步需要做什么"
    },
    {
      name: "第二步：执行操作",
      text: "详细说明第二步的具体操作"
    }
  ]
};
```

### 3. FAQ页面模板

```astro
const contentData: EnhancedContentData = {
  // ... 基础字段
  schemaType: "FAQPage",
  faqSections: [
    {
      question: "问题1？",
      answer: "详细答案1"
    },
    {
      question: "问题2？",
      answer: "详细答案2"
    }
  ]
};
```

## SEO & GEO 检查清单

### 内容创建前
- [ ] 确定目标关键词和用户意图
- [ ] 研究用户常问的问题
- [ ] 选择合适的Schema类型
- [ ] 准备权威来源和参考资料

### 内容创建中
- [ ] 使用Answer-First结构
- [ ] 包含FAQ部分（如适用）
- [ ] 使用语义化HTML标签
- [ ] 添加适当的内部链接
- [ ] 优化图片alt文本

### 内容创建后
- [ ] 检查标题长度（30-60字符）
- [ ] 检查meta描述长度（120-160字符）
- [ ] 验证Schema标记
- [ ] 测试移动端显示
- [ ] 检查页面加载速度

## 常见错误避免

### SEO错误
- ❌ 标题过长或过短
- ❌ 关键词堆砌
- ❌ 缺少meta描述
- ❌ 标题层级混乱

### GEO错误
- ❌ 答案不够直接
- ❌ 内容块过长，不利于AI提取
- ❌ 缺少FAQ部分
- ❌ Schema标记不正确

### 内容质量错误
- ❌ 缺少权威来源
- ❌ 信息过时
- ❌ 缺少实际案例
- ❌ 语言不够清晰

## 性能优化建议

1. **图片优化**: 使用WebP格式，添加详细的alt文本
2. **代码分割**: 按需加载组件
3. **缓存策略**: 合理设置缓存头
4. **压缩**: 启用Gzip/Brotli压缩

## 更新和维护

- 定期更新内容数据和统计信息
- 监控搜索排名和AI引用情况
- 根据用户反馈调整FAQ部分
- 保持技术信息的时效性

通过遵循这些指南，您可以创建既符合传统SEO要求，又能被AI系统有效理解和引用的高质量内容。