(() => {
    const root = document.getElementById('page3-root');
    if (!root) return;

    root.innerHTML = `
        <section class="destination-page interests-page" id="interests" aria-labelledby="interests-title">
            <header class="destination-heading">
                <a class="back-home" href="#top">↑ <span>回到首页</span></a>
                <h2 id="interests-title">爱好</h2>
                <p class="page-kicker"> WHAT I LOVE</p>
            </header>
            <div class="interest-list">
                <article class="interest-card">
                    <p class="interest-number">01 / READ</p>
                    <h3>阅读 <span>“却顾所来径，苍苍横翠微。”</span></h3>
                    <p>脚步无法到达的地方，书籍可以；岁月尚未揭晓的答案，阅读可以。</p>
                    <p>儿时《青铜葵花》让我理解苦难中的温情与坚韧；后来《诗经》让我窥见古代礼俗与人情幽微。年岁渐长，才慢慢看清鲁迅笔下那个“吃人”的社会，理解先生以笔为剑的大义，也终于读懂“侠之大者，为国为民”。</p>
                </article>
                <article class="interest-card">
                    <p class="interest-number">02 / WRITE</p>
                    <h3>写作 <span>“文章千古事，得失寸心知。”</span></h3>
                    <p>我写小说，也写随笔。</p>
                    <p>小说里的角色替我去爱、去恨、去错过、去美满……他们情深不寿，他们恨海情天，他们小满胜万全。</p>
                    <p>随笔里，我反复咀嚼心事，探索自己内心深处的声音，并不时回顾，去反思与总结。</p>
                    <a class="interest-entry" href="./page3/writing/index.html">查看文章 <span aria-hidden="true">→</span></a>
                </article>
                <article class="interest-card">
                    <p class="interest-number">03 / WANDER</p>
                    <h3>四处走走 <span>“人生到处知何似，应似飞鸿踏雪泥。”</span></h3>
                    <p>喜欢在一座城市漫无目的地闲逛，不赶景点，也不急着抵达哪里。</p>
                    <p>随机做上一班地铁，看来来往往的人群，随心选一站下车。沿着江边走上一段，在陌生街区转个弯，听微风拂过的声音。生命心安处常在，也偏爱计划之外的夕阳晚霞。</p>
                </article>
            </div>
            <a class="next-page-link" href="#top">回到首页 <span>↑</span></a>
        </section>`;
})();
