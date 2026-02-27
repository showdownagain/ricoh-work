import { useMemo } from 'react'

const modules = [
  '用户管理',
  '智能报备',
  '权限管理',
  '内容管理',
  '商品管理',
  '订单管理',
]

export default function App() {
  const buildTime = useMemo(() => new Date().toLocaleString('zh-CN'), [])

  return (
    <main className="app-shell">
      <header className="card">
        <h1>理光中国后台管理系统（Demo）</h1>
        <p>最小可运行骨架已就绪，可在此基础上继续联调与迭代。</p>
      </header>

      <section className="card">
        <h2>当前已挂载模块（占位）</h2>
        <ul>
          {modules.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section className="card meta">
        <span>Vite + React 18 + TypeScript</span>
        <span>启动时间：{buildTime}</span>
      </section>
    </main>
  )
}
