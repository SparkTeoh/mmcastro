import fs from 'fs';
import path from 'path';

export async function GET({ url }) {
  try {
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    const itemsPerPage = 9;

    // 获取所有 Astro 内容文件
    const contentFilesPath = path.join(process.cwd(), 'src/content');
    let allContentArticles = [];

    if (fs.existsSync(contentFilesPath)) {
      const contentFiles = fs.readdirSync(contentFilesPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.astro'))
        .map(dirent => dirent.name);
      
      allContentArticles = contentFiles.map(file => {
        const filePath = path.join(contentFilesPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // 提取 frontmatter 中的 contentData
        const frontmatterMatch = fileContent.match(/---([\s\S]*?)---/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          
          // 提取 contentData 对象
          const contentDataMatch = frontmatter.match(/const contentData = \{([\s\S]*?)\};/);
          if (contentDataMatch) {
            try {
              // 构建一个可解析的 JavaScript 对象字符串
              const contentDataStr = contentDataMatch[0]
                .replace('const contentData = ', '')
                .replace(/;$/, '')
                .replace(/new Date\('([^']+)'\)/g, '"$1"') // 将 new Date() 转换为字符串
                .replace(/new Date\(\)/g, `"${new Date().toISOString()}"`);
              
              // 使用 eval 来解析对象（注意：这在生产环境中需要谨慎使用）
              const contentData = eval('(' + contentDataStr + ')');
              
              return {
                ...contentData,
                isAstro: true,
                url: `/content/${file.replace('.astro', '')}`,
                contentType: 'astro',
                isExternal: false,
                description: contentData.summary,
                pubDate: new Date(contentData.pubDate)
              };
            } catch (error) {
              console.warn(`Error parsing contentData from ${file}:`, error);
              return null;
            }
          }
        }
        
        // 如果没有找到 contentData，返回默认数据
        return {
          title: file.replace('.astro', '').replace(/-/g, ' '),
          summary: 'MMC 内容文章',
          author: 'MMC Financial',
          pubDate: new Date(),
          tags: ['MMC', '财务'],
          type: '专业内容',
          isAstro: true,
          url: `/content/${file.replace('.astro', '')}`,
          contentType: 'astro',
          isExternal: false,
          featured: false
        };
      }).filter(Boolean); // 过滤掉 null 值
    }

    // 按日期排序，最新的在前面
    const allContent = allContentArticles.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).valueOf() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).valueOf() : 0;
      return dateB - dateA;
    });

    // 分页
    const totalPages = Math.ceil(allContent.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedContent = allContent.slice(startIndex, endIndex);

    return new Response(JSON.stringify({
      posts: paginatedContent,
      totalPages,
      currentPage: page,
      totalItems: allContent.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
