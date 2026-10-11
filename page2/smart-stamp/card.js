window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 1,
    html: `
        <article class="project-card" id="project-smart-stamp">
            <div class="project-copy">
                <p class="card-index">01 <span>MINI PROGRAM · BLUETOOTH</span></p>
                <h3>智能印章处理器</h3>
                <p class="project-tagline">从一张图片，到一枚可以带走的印章。</p>
                <p>这是一个连接图像处理与实体打印的微信小程序。用户上传图片后，程序将自动提取出黑白线稿，用户可以预览处理结果、手动调整细节，再通过蓝牙将图像发送到打印设备，完成从屏幕到纸面的输出。</p>
                <p>我负责小程序端的主要开发，并完成服务接入、蓝牙通信与分包传输等工作。调试过程中，我把上传、编辑、预览和打印串成一条完整流程，也处理了设备通信和页面状态之间的衔接。</p>
                <p class="my-role"><b>我的工作</b>小程序开发、Canvas 图像呈现与编辑、蓝牙打印调用、服务接入和部署调试。</p>
            </div>
            <div class="project-showcase" aria-label="智能印章项目展示与入口">
                <div class="project-art stamp-art" aria-label="印章点阵预览"><span>印</span><i>32 × 32</i></div>
                <div class="project-web-links"><a href="page2/smart-stamp/site/index.html?v=20261011-1">打开网页模拟 <span>↗</span></a></div>
            </div>
        </article>`
});
