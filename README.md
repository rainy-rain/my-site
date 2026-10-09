# 个人网站 · 深蓝简约版

一个零依赖的静态个人网站。没有构建步骤、没有 npm 安装、没有框架 —— 三个文件直接用浏览器打开就能看，也能直接上线。

```
my-site/
├── index.html    页面内容（你要改的主要就是这个文件）
├── styles.css    深蓝主题样式（配色集中在最上面的 :root）
├── script.js     滚动淡入 + 导航高亮（一般不用动）
└── README.md     本文件
```

---

## 1. 本地预览

**最快的方式**：直接双击 `index.html`，用浏览器打开。

**更接近线上环境的方式**（推荐，能正确解析相对路径）：在 `my-site` 目录下起一个本地服务器：

```bash
# 有 Python
python -m http.server 8000

# 有 Node.js
npx serve .

# 有 VS Code：装 Live Server 插件，右键 index.html → Open with Live Server
```

然后浏览器访问 `http://localhost:8000`。

---

## 2. 改内容：搜索替换这些占位文字

打开 `index.html`，把下面这些占位内容换成你自己的。建议用编辑器的全局查找替换（Ctrl+H）逐个过一遍：

| 占位内容 | 位置 | 说明 |
|---|---|---|
| `你的名字` | 标题、导航、首屏、页脚 | 出现 4 次，全部替换 |
| `你的职业 / 身份，比如：前端工程师 · 独立开发者` | 首屏副标题 | 一行说清你是谁 |
| `用一两句话介绍你自己……` | 首屏描述 | 首屏的那段话 |
| `your@email.com` | 首屏按钮、联系区 | 出现 2 次 |
| `@yourname` | 联系区 | GitHub 和 X 两处 |
| `https://github.com/yourname` | 联系区 | 换成你的真实主页 |
| `项目名称一/二/三` | 项目区 | 卡片标题 |
| `你的城市`、`你的技术方向`、`开放合作 / 在职 / 学习ing` | 关于区右侧 | 三个小事实 |

**改配色**：打开 `styles.css`，最上面的 `:root` 就是全部颜色变量：

```css
--bg:      #0a1420;   /* 页面底色，越深越沉稳 */
--surface: #0f1e2e;   /* 卡片底色 */
--border:  #1c344c;   /* 描边 */
--text:    #e8f0fa;   /* 主文字 */
--muted:   #8ba3c0;   /* 次要文字 */
--accent:  #4f9cf9;   /* 强调色，想换风格改这一个就够 */
```

只改 `--accent` 就能整体换风格，比如换成青色 `#4fd1c5`、紫色 `#a78bfa`。

**加项目卡片**：复制 `index.html` 里任意一个 `<a class="card">...</a>` 整块，粘在下面改文字即可，网格会自动排布。

---

## 3. 免费上线（三选一）

### 方案 A：Netlify Drop —— 最快，适合先看效果

1. 打开 <https://app.netlify.com/drop>
2. 把整个 `my-site` 文件夹**拖进页面**
3. 几秒后得到一个 `https://xxxx.netlify.app` 的公网地址，谁都能访问

不需要注册就能先试（想保留站点再注册免费账号）。之后想更新，再拖一次新文件夹即可。

### 方案 B：GitHub Pages —— 免费且长期稳定，推荐

1. 注册/登录 GitHub
2. 新建一个 **public** 仓库
   - 想让地址是 `https://<你的用户名>.github.io` → 仓库名必须**正好**是你的用户名，例如 `zhangsan.github.io`
   - 想要 `https://<你的用户名>.github.io/<仓库名>` → 仓库名随便取，例如 `mysite`
3. 把 `index.html`、`styles.css`、`script.js` 上传上去
   - 网页操作：仓库页 → **Add file** → **Upload files** → 把三个文件拖进去 → **Commit changes**
4. 进入仓库 **Settings** → 左侧 **Pages**
5. **Source** 选 `Deploy from a branch`，**Branch** 选 `main`、目录选 `/ (root)`，点 **Save**
6. 等 1～2 分钟，刷新 Pages 页面，顶部会出现你的网址

> 注意：`README.md` 不需要上传也可以（上传了也无妨，Pages 会忽略）。
> 之后更新网站：重新上传覆盖同名文件，等一分钟自动生效。

### 方案 C：Vercel

1. 把文件推到 GitHub 仓库
2. 打开 <https://vercel.com>，用 GitHub 登录
3. **Add New → Project**，选中该仓库，直接 Deploy（框架选 `Other`，不需要配置构建命令和输出目录）

---

## 4. 绑定自己的域名（可选）

三个平台都支持免费绑定自有域名（域名本身要自己买，一年几十块）：

- **Netlify**：Site settings → Domain management → Add custom domain，然后按提示到域名商处加一条 CNAME 记录
- **Vercel**：Project → Settings → Domains
- **GitHub Pages**：在仓库 Settings → Pages → Custom domain 填域名；同时在域名商处配置 CNAME 指向 `<你的用户名>.github.io`

启用 HTTPS 三个平台都是一键、免费（Let's Encrypt 自动签发）。

---

## 5. 已内置的细节

- **响应式**：手机上自动单列排版
- **深色适配**：本身就是暗色设计，无需额外处理
- **无障碍**：键盘 Tab 焦点有清晰描边；开启系统「减少动效」时自动关闭动画
- **渐进增强**：JS 加载失败时内容依然完整可见，不会白屏
- **无外部依赖**：不请求任何 CDN、字体或统计脚本，打开即完整呈现，也不泄露访问者数据

---

## 6. 后续可以加的

按需要再做，都是加分项：

- 博客（想写文章的话，可以再加 Markdown 驱动的方案）
- 深/浅色主题切换按钮
- 项目卡片配图
- 一个真实的 `favicon.ico`（现在浏览器标签页用的是默认图标）
