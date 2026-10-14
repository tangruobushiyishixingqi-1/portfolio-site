window.portfolioProjects = window.portfolioProjects || [];
window.portfolioProjects.push({
    order: 1,
    html: `
        <article class="project-card" id="project-smart-stamp">
            <div class="project-copy">
                <p class="card-index">01 <span>MINI PROGRAM · BLUETOOTH</span></p>
                <div class="stamp-story-heading">
                    <h3>智能印章处理器</h3>
                    <button class="stamp-story-toggle" type="button" aria-expanded="false" aria-controls="stamp-product-story" data-story-toggle>
                        一则极其抽象的产品叙事（展开）
                    </button>
                </div>
                <div class="stamp-product-story" id="stamp-product-story" hidden>
                    <p>2026年5月17日，小帅和小美正在庆祝他们的恋爱纪念日。</p>
                    <p>小美被一家情侣T恤定制吸引了目光，但她认为直接打印图片太突兀且大众了，便问老板能不能打印黑白像素风格的图片。</p>
                    <p>老板吧唧了一下嘴，“美女，将彩色图片转化成黑白像素，首先需要精细的提取线稿的能力，之后再以特殊的方法压缩成马赛克，这个嘛，既然你们小年轻的提要求了，我这个当月老的肯定要满足，就是这个价格……”</p>
                    <p>他转向小帅：“帅哥，她美吗？”</p>
                    <p>“你爱她吗？”</p>
                    <p>“爱她就实现她的愿望，支付这笔5200r的定制费吧！”</p>
                    <p>小帅欲哭无泪：“亲爱的，我的钱都用于购买codex plus了，你知道的，我需要它来帮我写高程大作业。”</p>
                    <p>小美恨铁不成钢：“你这没用的家伙，连汉诺塔都玩不明白，我们分手吧！”</p>
                    <p>小帅望着小美离开的背影，泪流满面。他狠狠剜了老板一眼，发誓一定要写出“生成黑白像素风格图片”的代码。</p>
                    <p>他搂着键盘，独自度过了5.20，在那个他们曾一起通宵的教室敲下一行行代码、拼接一件件硬件。</p>
                    <p>他幻想着自己拿着1k欧的戒指向她求婚，<br>物是人非事事休，欲语泪先流。</p>
                    <p>……</p>
                    <p>终于——他成功了！</p>
                    <p>auto-dot-matrix-stamp诞生了！这是一款可以将彩色图片处理成黑白像素点的程序，并且支持用户diy格子的黑白。</p>
                    <p>代码首次跑通的时间是凌晨三点，小帅对着控制台痛哭流涕——一年前、此时、此地，他坐在她身旁，听她唱《C语言情诗》。</p>
                    <p>今天月亮很圆，一如往昔，他无意识地瞥了瞥身旁，椅子是空的。</p>
                    <p>哦，忘记了，他们已经分手了。</p>
                    <p>……</p>
                    <p>小帅高高捧起做好的印章，这一次，他要夺回属于他的一切！</p>
                    <div class="stamp-story-interview">
                        <p><b>事后采访</b></p>
                        <p>Q：小帅你好，请问通过制作这个印章，你最大的感触是什么？</p>
                        <p>小帅：Cline真好用，我爱vibe coding。<br>and亲爱的，这次我会稳稳的接住你。</p>
                    </div>
                </div>
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
