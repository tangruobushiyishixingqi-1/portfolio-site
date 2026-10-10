window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 5,
    html: `
        <article class="project-card" id="project-piano-tuner">
            <div class="project-copy">
                <p class="card-index">05 <span>VIBE CODING · HARDWARE</span></p>
                <h3>钢琴智能调律 App</h3>
                <p class="project-tagline">让听音、判断与电机微调，组成一条可以被看见的调律流程。</p>
                <p>这是一款配合步进电机硬件使用的钢琴调律工具。应用通过麦克风分析音高与拍音，判断琴弦偏高或偏低，再向硬件发送拧紧、拧松或保持指令，辅助用户逐步完成调音。</p>
                <p>界面将 88 键键盘、弦轴定位、硬件控制、频率分析和重锤复检串成完整流程，并提供模拟模式，在没有真实麦克风和硬件时也能体验全部步骤。</p>
                <p class="my-role"><b>我的工作</b>以 Vibe Coding 的方式完成产品流程、调律状态机、音频分析、硬件通信适配与交互界面。</p>
            </div>
            <div class="project-showcase" aria-label="钢琴智能调律项目展示与入口">
                <div class="project-art piano-art" aria-label="钢琴键盘与调律指针预览"><span></span><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div class="project-web-links"><a href="page2/piano-tuner/showcase/index.html">查看项目方案 <span>↗</span></a></div>
            </div>
        </article>`
});
