window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 3,
    html: `
        <article class="project-card" id="project-research-agent">
            <div class="project-copy">
                <p class="card-index">03 <span>DATA · AGENT</span></p>
                <h3>科研成果数据治理与智能核验 Agent</h3>
                <p class="project-tagline">让科研成果从“被收集”，走向“有证据地可信”。</p>
                <p>我参与构建了一条面向科研成果的数据生产线，将论文与专利的采集、清洗、作者匹配、摘要补全、证据核验和质量门禁串联起来。不确定的结果不会直接进入正式数据库，而是保留来源与问题，等待进一步复核。</p>
                <p>项目文件中包含 6,190 条论文记录、3,849 条专利记录，以及由确定性程序、Agent 辅助和人工门禁组成的处理流程。自动化在这里不仅意味着更快，也意味着每一次补全、拒绝和写入都有依据可查。</p>
                <p class="my-role"><b>我的工作</b>数据清洗与补全脚本、论文作者身份匹配、技术摘要生成、核验 Agent 的数据合同与安全边界、交付前质量检查。</p>
            </div>
            <div class="project-showcase" aria-label="科研成果数据治理项目展示与入口">
                <div class="agent-audit-preview" aria-label="论文记录核验流程预览">
                    <div class="agent-preview-head"><span>L000001</span><b>ACCEPT</b></div>
                    <p>Scour Protection Effects of a Geotextile Mattress…</p>
                    <ol>
                        <li><i>✓</i><span>候选记录</span><em>已读取</em></li>
                        <li><i>✓</i><span>正式来源</span><em>一致</em></li>
                        <li><i>✓</i><span>作者匹配</span><em>谢立全</em></li>
                        <li><i>✓</i><span>摘要补全</span><em>完成</em></li>
                        <li><i>✓</i><span>质量门禁</span><em>通过</em></li>
                    </ol>
                </div>
                <div class="project-web-links"><a href="page2/research-agent/site/index.html">查看核验过程 <span>↗</span></a></div>
            </div>
        </article>`
});
