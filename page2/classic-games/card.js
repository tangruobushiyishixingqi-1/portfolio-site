window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 7,
    html: `
        <article class="project-card" id="project-classic-games">
            <div class="project-copy">
                <p class="card-index">07 <span>C++ · GAMES</span></p>
                <h3>算法与游戏：汉诺塔 / 扫雷</h3>
                <p class="project-tagline">一个练习如何移动，一个练习如何判断。</p>
                <p>我用 C++ 实现了两个经典小游戏。汉诺塔提供递归与栈模拟等求解方式，也能通过动画观察圆盘移动，或亲自尝试完成挑战；扫雷则包含不同尺寸与难度的棋盘，支持翻格、标记和计时。</p>
                <p>一个把规则展开成清晰的步骤，一个把信息藏进每一次选择里。它们是我从算法练习走向完整交互程序的两次尝试。</p>
                <p class="my-role"><b>项目内容</b>汉诺塔多种求解与演示模式、图形化移动过程、手动操作；扫雷多种难度、鼠标操作、地雷标记、计时与棋盘状态管理。</p>
            </div>
            <div class="project-showcase" aria-label="经典游戏项目展示与入口">
                <div class="project-art hanoi-art" aria-label="汉诺塔动画预览"><i class="tower tower-a"><b></b><b></b><b></b></i><i class="tower tower-b"><b></b></i><i class="tower tower-c"></i></div>
                <div class="project-web-links">
                    <a href="page2/classic-games/hanoi/index.html?v=20261010">打开汉诺塔 <span>↗</span></a>
                    <a href="page2/classic-games/minesweeper/index.html?v=20261010">打开扫雷 <span>↗</span></a>
                </div>
            </div>
        </article>`
});
