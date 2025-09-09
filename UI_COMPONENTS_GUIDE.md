# MMC Astro 新增 UI 组件使用指南

## 概述

基于 SparkAstro 的优秀组件，我们为 MMC Astro 创建了以下新的 UI 组件，这些组件都采用了 MMC 的品牌风格和设计语言。

## 新增组件列表

### 1. Accordion & AccordionItem - 手风琴组件

用于展示步骤流程或 FAQ 内容。

```astro
---
import Accordion from '../components/ui/Accordion.astro';
---

<Accordion />
```

**特点：**
- 自动展示 6 个步骤（需求分析、方案设计、系统实施等）
- 点击展开/收起内容
- 响应式设计
- MMC 品牌色彩

### 2. ArticleCard - 文章卡片组件

用于内容中心展示文章内容。

```astro
---
import ArticleCard from '../components/ui/ArticleCard.astro';

const article = {
  title: "利润预算管理最佳实践",
  summary: "本文介绍了企业利润预算管理的核心要点...",
  author: "MMC Financial",
  pubDate: new Date('2024-01-20'),
  tags: ['预算管理', '财务管理', '企业咨询'],
  type: '专业内容',
  slug: 'profit-budget-management'
};
---

<ArticleCard article={article} />
```

**特点：**
- 支持多种内容类型（文章、视频、专业内容等）
- 自动格式化日期
- 标签展示
- 作者头像支持

### 3. BusinessForm - 商业合作表单

专业的商业合作申请表单。

```astro
---
import BusinessForm from '../components/ui/BusinessForm.astro';
---

<BusinessForm />
```

**特点：**
- 4 种合作类型选择（咨询服务、企业培训、系统实施、战略合作）
- 完整的联系信息收集
- 项目预算范围选择
- 智能表单验证

### 4. SearchForm - 搜索表单

用于内容搜索功能。

```astro
---
import SearchForm from '../components/ui/SearchForm.astro';
---

<SearchForm />
```

**特点：**
- 简洁的搜索界面
- 自动提交到 `/content` 页面
- 响应式设计
- MMC 品牌样式

### 5. SwiperSlider - 轮播组件

用于展示客户见证或重要内容。

```astro
---
import SwiperSlider from '../components/ui/SwiperSlider.astro';
---

<SwiperSlider />
```

**特点：**
- 自动轮播客户见证
- 响应式设计（移动端 1 列，桌面端 2 列）
- 自动播放功能
- 自定义导航按钮

### 6. TeamCard - 团队成员卡片

用于展示团队成员信息。

```astro
---
import TeamCard from '../components/ui/TeamCard.astro';

const teamMember = {
  pic: "/images/team/member1.jpg",
  name: "张经理",
  role: "财务顾问",
  description: "拥有15年财务管理经验，专注于企业预算优化和利润提升。",
  link: "https://linkedin.com/in/zhang-manager"
};
---

<TeamCard {...teamMember} />
```

**特点：**
- 圆形头像设计
- LinkedIn 链接支持
- 响应式布局
- 专业描述展示

### 7. VideoCard - 视频卡片组件

用于展示视频内容。

```astro
---
import VideoCard from '../components/ui/VideoCard.astro';

const video = {
  title: "企业预算管理入门指南",
  description: "本视频将为您详细介绍企业预算管理的基础知识和实践技巧。",
  videoId: "dQw4w9WgXcQ",
  duration: "15:30",
  publishDate: "2024-01-15",
  views: "1.2K"
};
---

<VideoCard {...video} />
```

**特点：**
- YouTube 视频支持
- 自动生成缩略图
- 播放按钮覆盖层
- 视频信息展示（时长、发布日期、观看次数）

### 8. StatsCard & StatsShowcase - 统计展示组件

用于展示公司核心成就和关键数据。

```astro
---
import StatsCard from '../components/ui/StatsCard.astro';
import StatsShowcase from '../components/ui/StatsShowcase.astro';

// 单个统计卡片
const stat = {
  number: "18年+",
  title: "专业经验",
  description: "2008年获得大马证监会(SC)\nCapital Market Services License\n合法提供财务规划服务,18年迭代的方法论。",
  highlight: "您面临的挑战,我们早有成熟解决方案。"
};
---

<!-- 单个统计卡片 -->
<StatsCard {...stat} />

<!-- 完整的统计展示 -->
<StatsShowcase />
```

**特点：**
- 大数字突出显示
- 多行描述文本支持
- 高亮文本区域
- 响应式三列布局
- 悬停动画效果

## 使用建议

### 1. 在页面中使用

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/ui/Navigation.astro';
import Accordion from '../components/ui/Accordion.astro';
import SwiperSlider from '../components/ui/SwiperSlider.astro';
import Footer from '../components/ui/Footer.astro';
---

<Layout title="服务流程">
  <Navigation />
  <main>
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">我们的服务流程</h2>
        <Accordion />
      </div>
    </section>
    
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">客户见证</h2>
        <SwiperSlider />
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

### 2. 在内容中心使用

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/ui/Navigation.astro';
import SearchForm from '../components/ui/SearchForm.astro';
import ArticleCard from '../components/ui/ArticleCard.astro';
import Footer from '../components/ui/Footer.astro';

// 获取文章数据
const articles = await getCollection('content');
---

<Layout title="内容中心">
  <Navigation />
  <main>
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-8">内容中心</h1>
        <div class="max-w-md mx-auto mb-12">
          <SearchForm />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard article={article} />
          ))}
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

### 3. 在联系页面使用

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/ui/Navigation.astro';
import BusinessForm from '../components/ui/BusinessForm.astro';
import Footer from '../components/ui/Footer.astro';
---

<Layout title="联系我们">
  <Navigation />
  <main>
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <h1 class="text-4xl font-bold text-center mb-8">商业合作</h1>
          <BusinessForm />
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

## 样式定制

所有组件都使用了 MMC 的品牌色彩：

- **主色调 (Primary)**: `#024340` (深绿色)
- **强调色 (Accent)**: `#B4A180` (金色)
- **文本色**: `#374151` (深灰色)
- **背景色**: `#ffffff` (白色)

如需自定义样式，可以通过以下方式：

1. **修改 CSS 变量**：
```css
:root {
  --primary: #024340;
  --accent: #B4A180;
  --text-default: #374151;
}
```

2. **添加自定义类名**：
```astro
<ArticleCard article={article} className="custom-article-card" />
```

## 注意事项

1. **SwiperSlider 组件**需要安装 Swiper 依赖：
```bash
npm install swiper
```

2. **VideoCard 组件**需要有效的 YouTube 视频 ID

3. **所有组件**都支持响应式设计，在移动端和桌面端都有良好的显示效果

4. **表单组件**目前只提供前端展示，实际提交功能需要后端支持

## 9. Button - 按钮组件

### 功能说明
基于 globals.css 按钮样式的通用按钮组件，支持多种变体和尺寸。

### 使用方法
```astro
---
import Button from '../components/ui/Button.astro';
---

<!-- 主要按钮 -->
<Button variant="primary" size="md">点击我</Button>

<!-- 轮廓按钮 -->
<Button variant="outline" size="lg">了解更多</Button>

<!-- 链接按钮 -->
<Button href="/contact" variant="primary">联系我们</Button>

<!-- 禁用按钮 -->
<Button variant="primary" disabled>不可点击</Button>
```

### 参数说明
- `variant`: 按钮样式 ('primary' | 'outline' | 'outline-transparent' | 'secondary')
- `size`: 按钮尺寸 ('sm' | 'md' | 'lg')
- `href`: 链接地址（可选，有则渲染为链接）
- `type`: 按钮类型 ('button' | 'submit' | 'reset')
- `disabled`: 是否禁用
- `className`: 自定义样式类

### 特点
- 支持多种样式变体
- 三种尺寸选择
- 可作为按钮或链接使用
- 完整的无障碍访问支持
- 悬停和焦点状态

## 10. Marquee - 跑马灯组件

### 功能说明
可自定义的跑马灯滚动组件，用于展示客户标志或其他内容。

### 使用方法
```astro
---
import Marquee from '../components/ui/Marquee.astro';

const items = [
  { name: "客户1", logo: "/images/logo1.png", alt: "客户1" },
  { name: "客户2", logo: "/images/logo2.png", alt: "客户2" },
  { name: "客户3", logo: "/images/logo3.png", alt: "客户3" }
];
---

<Marquee 
  items={items}
  duration="20s"
  pauseOnHover={true}
  reverse={false}
/>
```

### 参数说明
- `items`: 展示项目数组
- `elementWidth`: 元素宽度（默认 "11.25rem"）
- `elementWidthSmall`: 小屏幕元素宽度（默认 "7.5rem"）
- `duration`: 动画持续时间（默认 "20s"）
- `pauseOnHover`: 悬停时暂停（默认 false）
- `reverse`: 反向滚动（默认 false）

### 特点
- 平滑的滚动动画
- 可自定义滚动速度和方向
- 响应式设计
- 支持悬停暂停
- 渐变边缘效果

## 11. CustomerLogos - 客户标志展示

### 功能说明
展示合作客户标志的完整组件，包含标题和跑马灯展示。

### 使用方法
```astro
---
import CustomerLogos from '../components/ui/CustomerLogos.astro';
---

<CustomerLogos 
  title="他们选择了MMC预算管理课程"
  description="与这些具有前瞻视野的企业一同，掌握驱动利润增长的预算罗盘。"
/>
```

### 参数说明
- `title`: 标题文本
- `description`: 描述文本
- `customers`: 客户数据数组（可选，有默认值）
- `className`: 自定义样式类

### 特点
- 左右分栏布局
- 内置跑马灯功能
- 渐变边缘效果
- 响应式设计
- 可自定义客户数据

## 12. LineAnimation - 线条动画组件

### 功能说明
基于 GSAP 的线条动画效果组件，用于页面背景装饰。

### 使用方法
```astro
---
import LineAnimation from '../components/ui/LineAnimation.astro';
---

<LineAnimation 
  hasCustomBackground={false}
  className="my-custom-class"
/>
```

### 参数说明
- `hasCustomBackground`: 是否有自定义背景（默认 false）
- `className`: 自定义样式类

### 特点
- 基于 GSAP 的流畅动画
- 随机线条选择
- 渐变色彩效果
- 自动循环播放
- 性能优化

## 13. CallToAction - 行动号召组件

### 功能说明
用于引导用户采取行动的营销组件，包含标题、描述、按钮和图片。

### 使用方法
```astro
---
import CallToAction from '../components/ui/CallToAction.astro';
---

<CallToAction 
  title="明年赚多少，算了才知道。"
  subtitle="你准备好实现利润增长了吗？"
  description="别再凭感觉设定目标。与我们的预算专家进行一次一对一的战略沟通..."
  buttonText="点击预约60分钟战略通话"
  buttonHref="/contact/"
/>
```

### 参数说明
- `title`: 主标题
- `subtitle`: 副标题
- `description`: 描述文本
- `buttonText`: 按钮文本
- `buttonHref`: 按钮链接
- `imageSrc`: 图片地址
- `imageAlt`: 图片描述
- `badgeText`: 徽章文本
- `badgeSubtext`: 徽章副文本

### 特点
- 左右分栏布局
- 背景装饰元素
- 动画徽章效果
- 响应式设计
- 完整的营销元素

## 更新日志

- **2024-01-20**: 创建所有新组件
- 所有组件都基于 SparkAstro 的设计，但完全适配了 MMC 的品牌风格
- 支持中文界面和本地化内容
- **2024-01-25**: 新增 5 个遗漏的 UI 组件
- 添加 Button、Marquee、CustomerLogos、LineAnimation、CallToAction 组件
- 完善组件分类和使用指南
