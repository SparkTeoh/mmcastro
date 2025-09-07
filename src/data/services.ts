// 共享的服务数据
export const servicesData = {
  enable: true,
  title: "我们的服务",
  subtitle: "透过预算管理帮助企业实现收入利润双增长",
  services: [
    {
      title: "年度经营预算与战略蓝图<br><small>(Annual Budgeting & Strategic Blueprint)</small>",
      description: "帮您企业\"先画图，再建屋子\"。我们将预算从一个财务部门的任务，升级为整个公司的战略管理工具。通过制定收入、成本、现金三大核心目标，让您的企业告别\"拍脑袋\"决策，为下一年的\"收入利润双增长\"画出清晰的作战地图。",
      coreSolution: "目标不清晰、战略缺失、凭感觉经营的根源问题。",
      icon: "/images/services/icon/infographic.svg",
      image: "/images/services/service1.webp",
      link: "/services/annual-budgeting"
    },
    {
      title: "收入增长引擎设计<br><small>(Revenue Growth Engine Design)</small>",
      description: "增长不能靠运气。我们带您深入\"切市场\"，通过分析客户、产品和渠道，设计差异化的竞争策略。我们将宏大的收入目标，层层分解（细分收入）到每个团队、每个负责人头上，打造一台可预测、可持续的增长引擎。",
      coreSolution: "业绩增长乏力、市场被动、销售目标无法落地。",
      icon: "/images/services/icon/task.svg",
      image: "/images/services/service2.webp",
      link: "/services/revenue-growth"
    },
    {
      title: "利润结构优化与成本管控<br><small>(Profit Structure Optimization & Cost Control)</small>",
      description: "忙了半天不赚钱？问题出在利润结构。我们帮您精准分析变动成本与固定成本，找到提升毛利的关键杠杆。通过建立全员成本意识和管控机制，让您的团队不仅会\"开源\"，更懂得如何\"节流\"，实现利润最大化。",
      coreSolution: "营收高但利润低、\"毛利薄如纸\"、成本失控。",
      icon: "/images/services/icon/leader-board.svg",
      image: "/images/services/service3.webp",
      link: "/services/profit-optimization"
    },
    {
      title: "经营激励与绩效系统<br><small>(Performance-based Incentive System)</small>",
      description: "预算不是老板一个人的事。我们为您设计一套将预算目标与薪酬奖励紧密挂钩的激励系统。从一线员工的超额奖励到管理层的花红分润，让每个员工都从\"为老板打工\"变成\"为自己的钱包奋斗\"，彻底激活团队的内在动力。",
      coreSolution: "员工动力不足、团队文化安逸、\"平均主义\"大锅饭。",
      icon: "/images/services/icon/infographic.svg",
      image: "/images/services/service1.webp",
      link: "/services/performance-incentive"
    },
    {
      title: "现金流管理与资金效率<br><small>(Cash Flow Management & Capital Efficiency)</small>",
      description: "利润是观点，现金是事实。我们帮您建立强大的现金流预测和管理能力，优化应收账款和库存周转。同时，教您善用\"金融杠杆\"，用最少的本金撬动最大的生意，让您的资金效率倍增，企业走得更稳、更远。",
      coreSolution: "公司账面有利润但没现金、资金周转困难、盲目投资。",
      icon: "/images/services/icon/task.svg",
      image: "/images/services/service2.webp",
      link: "/services/cash-flow"
    },
    {
      title: "经营复盘与落地执行系统<br><small>(Business Review & Execution System)</small>",
      description: "再好的蓝图也需要\"施工管理\"。我们帮您建立一套从每日、每周到每月的经营复盘（检查改进）机制。通过可视化的数据看板和结构化的会议流程，确保战略不跑偏，问题能及时发现，让整个团队朝着既定预算目标高效执行。",
      coreSolution: "战略无法落地、会议效率低下、缺乏过程管理和问责机制。",
      icon: "/images/services/icon/leader-board.svg",
      image: "/images/services/service3.webp",
      link: "/services/business-review"
    }
  ]
};

// 首页服务数据配置
export const homeServicesData = {
  enable: true,
  title: "我们的核心服务",
  subtitle: "我们的服务",
  services: servicesData.services // 直接引用共享的服务数据
};
