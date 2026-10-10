window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 4,
    html: `
        <article class="project-card" id="project-scene-graph">
            <div class="project-copy">
                <p class="card-index">04 <span>RESEARCH · VIDEO UNDERSTANDING</span></p>
                <h3>科研经历：时序场景图预测</h3>
                <p class="project-tagline">让模型不只理解正在发生什么，也能推演对象关系接下来如何变化。</p>
                <p>围绕动态场景图与未来关系预测，我从 8 篇核心论文出发，梳理“结构化表示—时空建模—未来预测—鲁棒性”的研究脉络，并进一步调研长视频理解数据集与评价方式。</p>
                <p>在 SceneSayer 复现过程中，我针对多卡训练中的设备绑定、混合精度和跨卡评测汇总形成工程补丁；在此基础上，继续设计长期场景图记忆的四组对照实验。</p>
                <p class="my-role"><b>我的工作</b>文献与数据集调研、SceneSayer 复现与多卡适配、长视频记忆实验设计。</p>
            </div>
            <div class="project-showcase" aria-label="时序场景图预测项目展示">
                <a class="scene-forecast-preview" href="page2/scene-graph/site/index.html" aria-label="进入时序场景图预测科研经历页面">
                    <div class="scene-preview-head"><span>OBSERVED</span><i></i><span>FORECAST</span></div>
                    <div class="scene-preview-stage" aria-hidden="true">
                        <div class="scene-preview-graph scene-preview-graph--past">
                            <b class="scene-node scene-node--person">P</b>
                            <b class="scene-node scene-node--cup">C</b>
                            <span>near</span>
                        </div>
                        <div class="scene-preview-boundary"><em>NOW</em></div>
                        <div class="scene-preview-graph scene-preview-graph--future">
                            <b class="scene-node scene-node--person">P</b>
                            <b class="scene-node scene-node--cup">C</b>
                            <span>holding</span>
                        </div>
                    </div>
                    <div class="scene-preview-time"><span>00:03</span><span>00:06</span><span>00:09</span></div>
                    <strong>查看研究路径 <span aria-hidden="true">↗</span></strong>
                </a>
            </div>
        </article>`
});
