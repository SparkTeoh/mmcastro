# MMC Astro 内容系统使用指南

## 概述

MMC Astro 内容系统是一个专门为展示 .astro 内容文件而设计的系统，参考了 SparkAstro 的 blog 设计，但只支持 .astro 文件格式。

## 功能特性

- ✅ 只支持 .astro 文件内容
- ✅ 搜索功能（标题、内容、标签）
- ✅ 分页功能
- ✅ 标签筛选
- ✅ 响应式设计
- ✅ 与 MMC 品牌风格一致

## 文件结构

```
src/
├── pages/
│   ├── content/               # 内容文件目录
│   │   ├── index.astro        # 内容中心主页面
│   │   ├── [slug].astro       # 动态路由处理器
│   │   ├── financial-planning.astro
│   │   ├── budget-optimization.astro
│   │   └── cash-flow-management.astro
│   └── api/
│       └── content.js         # API 端点（分页支持）
└── components/
    └── Navigation.astro       # 已更新，包含内容中心链接
```

## 如何添加新内容

### 1. 创建内容文件

在 `src/pages/content/` 目录下创建新的 `.astro` 文件，例如 `my-article.astro`：

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';

const contentData = {
  title: "文章标题",
  summary: "文章摘要，用于在内容列表中显示",
  author: "MMC Financial",
  pubDate: new Date('2024-01-20'),
  tags: ['标签1', '标签2', '标签3'],
  type: '专业内容',
  featured: false  // 是否推荐
};
---

<Layout title={contentData.title}>
  <Navigation />
  
  <main class="min-h-screen bg-gradient-to-br from-theme-light to-white pt-20">
    <article class="container mx-auto px-4 py-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-bold text-primary mb-4">{contentData.title}</h1>
        <p class="text-xl text-text-default max-w-3xl mx-auto">{contentData.summary}</p>
        <div class="flex items-center justify-center space-x-4 mt-6">
          <span class="text-sm text-gray-500">作者：{contentData.author}</span>
          <span class="text-sm text-gray-500">发布时间：{contentData.pubDate.toLocaleDateString('zh-CN')}</span>
        </div>
      </header>

      <div class="prose prose-lg max-w-4xl mx-auto">
        <!-- 在这里添加你的文章内容 -->
        <h2>章节标题</h2>
        <p>文章内容...</p>
      </div>
    </article>
  </main>

  <Footer />
</Layout>
```

### 2. contentData 对象说明

每个内容文件必须包含 `contentData` 对象，包含以下字段：

- `title`: 文章标题
- `summary`: 文章摘要（用于列表显示）
- `author`: 作者名称
- `pubDate`: 发布日期（Date 对象）
- `tags`: 标签数组
- `type`: 内容类型
- `featured`: 是否为推荐内容（boolean）

## 访问内容

- **内容中心首页**: `/content`
- **具体内容页面**: `/content/[文件名]`（不包含 .astro 扩展名）

例如：
- 文件：`src/pages/content/financial-planning.astro`
- 访问地址：`/content/financial-planning`

## 搜索功能

用户可以通过以下方式搜索内容：

1. **标题搜索**: 搜索文章标题中的关键词
2. **内容搜索**: 搜索文章摘要中的关键词
3. **标签搜索**: 点击标签或搜索标签名称
4. **组合搜索**: 支持多关键词搜索

## 分页功能

- 每页显示 9 个内容
- 支持"加载更多"按钮
- 自动检测是否还有更多内容

## 样式定制

内容系统使用 MMC 的品牌色彩：

- 主色调：`#024340` (primary)
- 强调色：`#B4A180` (accent)
- 背景：渐变从 `#F9FBFF` 到白色

## 技术实现

### 内容解析

系统通过以下方式解析内容：

1. 扫描 `src/pages/content/` 目录下的所有 `.astro` 文件
2. 过滤掉 `index.astro` 和 `[slug].astro` 等系统文件
3. 提取每个文件的 frontmatter 中的 `contentData` 对象
4. 使用 `eval()` 解析 JavaScript 对象（生产环境需要谨慎使用）
5. 按发布日期排序

### API 端点

`/api/content` 端点支持分页查询：

```
GET /api/content?page=1
```

返回 JSON 格式：
```json
{
  "posts": [...],
  "totalPages": 2,
  "currentPage": 1,
  "totalItems": 15
}
```

## 注意事项

1. **安全性**: 当前使用 `eval()` 解析 contentData，生产环境建议使用更安全的解析方法
2. **性能**: 大量内容文件可能影响构建时间，建议定期优化
3. **SEO**: 每个内容页面都有完整的 SEO 元数据
4. **响应式**: 所有页面都支持移动端访问

## 未来改进

- [ ] 添加内容分类功能
- [ ] 实现更安全的内容解析方法
- [ ] 添加内容预览功能
- [ ] 支持内容草稿状态
- [ ] 添加内容统计功能

## 支持

如有问题或建议，请联系开发团队。
