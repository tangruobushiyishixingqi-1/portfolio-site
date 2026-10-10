window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 6,
    html: `
        <article class="project-card" id="project-red-mansion">
            <div class="project-copy">
                <p class="card-index">06 <span>LITERATURE · SIMULATION</span></p>
                <h3>《红楼梦》人物关系模拟</h3>
                <p class="project-tagline">如果故事的顺序发生变化，人物的关系将走向哪里？</p>
                <p>我做了一个围绕宝玉与黛玉关系变化的互动模拟程序。程序将小说中的十二个重要事件作为可调整的输入，通过细胞自动机模型模拟关系演变，并用粒子群优化寻找不同事件顺序下的结果。</p>
                <p>界面会展示关系变化过程，也能生成关系网络图。这个项目把文学阅读里的一个假设，变成了可以调整条件、观察变化的模型。</p>
            </div>
            <div class="project-showcase" aria-label="红楼梦人物关系模拟项目展示与入口">
                <svg class="project-art dream-art" viewBox="0 0 120 64" role="img" aria-label="人物关系网络预览"><path d="M19 18L58 30 96 15M19 18L34 50 58 30 91 49 96 15M34 50L91 49"/><circle cx="19" cy="18" r="7"/><circle cx="58" cy="30" r="9"/><circle cx="96" cy="15" r="7"/><circle cx="34" cy="50" r="6"/><circle cx="91" cy="49" r="6"/></svg>
                <div class="project-web-links"><a href="page2/red-mansion/site/index.html">打开网页模拟 <span>↗</span></a></div>
            </div>
        </article>`
});
