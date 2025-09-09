# MMC Astro 组件结构说明

## 概述

本项目已按照 SparkAstro 的结构重新组织了组件，提供了更好的代码组织和可维护性。

## 目录结构

```
src/components/
├── Icons/                    # 图标组件
│   ├── ArticleIcon.astro    # 文章图标
│   └── VideoIcon.astro      # 视频图标
├── sections/                 # 页面区块组件
│   ├── AboutBelieve.astro   # 关于我们 - 信念部分
│   ├── AboutLicense.astro   # 关于我们 - 许可证部分
│   ├── AboutPrinciple.astro # 关于我们 - 理念部分
│   ├── AboutShowcase.astro  # 关于我们 - 展示部分
│   ├── AboutTeam.astro      # 关于我们 - 团队部分
│   ├── AboutUs.astro        # 关于我们 - 主要部分
│   ├── CallToAction.astro   # 行动号召
│   ├── Customers.astro      # 客户展示
│   ├── Hero.astro           # 首页横幅
│   ├── HomeAbout.astro      # 首页关于我们
│   ├── HowItWorks.astro     # 工作流程
│   ├── LineAnimation.astro  # 线条动画
│   ├── Services.astro       # 服务展示
│   ├── TeamHistory.astro    # 团队历史
│   └── Testimonial.astro    # 客户见证
├── seo/                     # SEO 相关组件
│   └── Seo.astro           # SEO 元数据组件
└── ui/                      # 通用 UI 组件
    ├── Accordion.astro     # 手风琴组件
    ├── AccordionItem.astro # 手风琴子组件
    ├── ArticleCard.astro   # 文章卡片组件
    ├── BusinessForm.astro  # 商业合作表单
    ├── Button.astro        # 按钮组件
    ├── CallToAction.astro  # 行动号召组件
    ├── Card.astro          # 卡片组件
    ├── CustomerLogos.astro # 客户标志展示
    ├── Footer.astro        # 页脚组件
    ├── Form.astro          # 表单组件
    ├── LineAnimation.astro # 线条动画组件
    ├── Marquee.astro       # 跑马灯组件
    ├── Navigation.astro    # 导航组件
    ├── SearchForm.astro    # 搜索表单组件
    ├── SectionTitle.astro  # 区块标题组件
    ├── ServiceCard.astro   # 服务卡片组件
    ├── Social.astro        # 社交链接组件
    ├── StatsCard.astro     # 统计卡片组件
    ├── StatsShowcase.astro # 统计展示组件
    ├── SwiperSlider.astro  # 轮播组件
    ├── Tags.astro          # 标签组件
    ├── TeamCard.astro      # 团队成员卡片
    └── VideoCard.astro     # 视频卡片组件
```

## 组件分类

### 1. UI 组件 (`/ui/`)
通用UI组件，可在多个页面中重复使用：

#### 基础组件
- **Navigation.astro** - 网站导航栏
- **Footer.astro** - 网站页脚
- **Card.astro** - 卡片容器组件
- **SectionTitle.astro** - 区块标题组件
- **Tags.astro** - 标签组件

#### 表单组件
- **Form.astro** - 通用表单组件
- **BusinessForm.astro** - 商业合作表单
- **SearchForm.astro** - 搜索表单组件

#### 展示组件
- **ServiceCard.astro** - 服务卡片组件
- **ArticleCard.astro** - 文章卡片组件
- **TeamCard.astro** - 团队成员卡片
- **VideoCard.astro** - 视频卡片组件
- **StatsCard.astro** - 统计卡片组件
- **StatsShowcase.astro** - 统计展示组件
- **CustomerLogos.astro** - 客户标志展示组件
- **Marquee.astro** - 跑马灯组件

#### 交互组件
- **Accordion.astro** - 手风琴组件
- **AccordionItem.astro** - 手风琴子组件
- **SwiperSlider.astro** - 轮播组件
- **LineAnimation.astro** - 线条动画组件

#### 营销组件
- **Button.astro** - 按钮组件
- **CallToAction.astro** - 行动号召组件

#### 社交组件
- **Social.astro** - 社交媒体链接组件

### 2. 页面区块组件 (`/sections/`)
特定页面的内容区块组件：
- **Hero.astro** - 首页横幅
- **AboutUs.astro** - 关于我们主区块
- **Services.astro** - 服务展示区块
- **Testimonial.astro** - 客户见证区块
- **HowItWorks.astro** - 工作流程区块
- 等等...

### 3. SEO 组件 (`/seo/`)
SEO 相关的组件：
- **Seo.astro** - 处理页面元数据、Open Graph、Twitter Cards 等

### 4. 图标组件 (`/Icons/`)
可复用的图标组件：
- **ArticleIcon.astro** - 文章图标
- **VideoIcon.astro** - 视频图标

## 导入路径示例

### UI 组件导入
```astro
// 基础组件
import Navigation from '../components/ui/Navigation.astro';
import Footer from '../components/ui/Footer.astro';
import Card from '../components/ui/Card.astro';

// 表单组件
import Form from '../components/ui/Form.astro';
import BusinessForm from '../components/ui/BusinessForm.astro';
import SearchForm from '../components/ui/SearchForm.astro';

// 展示组件
import ArticleCard from '../components/ui/ArticleCard.astro';
import TeamCard from '../components/ui/TeamCard.astro';
import StatsShowcase from '../components/ui/StatsShowcase.astro';
import CustomerLogos from '../components/ui/CustomerLogos.astro';
import Marquee from '../components/ui/Marquee.astro';

// 交互组件
import Accordion from '../components/ui/Accordion.astro';
import SwiperSlider from '../components/ui/SwiperSlider.astro';
import LineAnimation from '../components/ui/LineAnimation.astro';

// 营销组件
import Button from '../components/ui/Button.astro';
import CallToAction from '../components/ui/CallToAction.astro';
```

### 页面区块组件导入
```astro
import Hero from '../components/sections/Hero.astro';
import AboutUs from '../components/sections/AboutUs.astro';
import Services from '../components/sections/Services.astro';
```

### SEO 组件导入
```astro
import Seo from '../components/seo/Seo.astro';
```

### 图标组件导入
```astro
import ArticleIcon from '../components/Icons/ArticleIcon.astro';
import VideoIcon from '../components/Icons/VideoIcon.astro';
```

## 使用建议

1. **基础组件**：用于构建页面的基础元素，如导航、页脚、卡片容器等
2. **表单组件**：用于收集用户输入和交互，如联系表单、搜索表单等
3. **展示组件**：用于展示特定类型的内容，如文章、团队、统计数据、客户标志等
4. **交互组件**：提供用户交互功能，如手风琴、轮播图、动画效果等
5. **营销组件**：用于营销和转化，如按钮、行动号召等
6. **页面区块组件**：用于构建特定页面的内容区块
7. **SEO 组件**：在页面头部使用，提供 SEO 元数据
8. **图标组件**：在需要图标的地方使用

## 维护指南

- 新增通用UI组件时，放在 `ui/` 目录，并根据功能分类到相应子类别
- 新增页面特定组件时，放在 `sections/` 目录
- 新增SEO相关功能时，放在 `seo/` 目录
- 新增图标组件时，放在 `Icons/` 目录

## 组件统计

### 当前组件数量
- **基础组件**: 5个
- **表单组件**: 3个  
- **展示组件**: 8个
- **交互组件**: 4个
- **营销组件**: 2个
- **社交组件**: 1个
- **页面区块组件**: 15个
- **SEO组件**: 1个
- **图标组件**: 2个

**总计**: 41个组件
- 新增图标时，放在 `Icons/` 目录
- 保持组件名称的语义化和一致性
