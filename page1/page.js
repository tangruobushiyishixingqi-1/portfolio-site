(() => {
    const root = document.getElementById('page1-root');
    if (!root) return;

    root.innerHTML = `
        <main class="home" id="top" aria-labelledby="name">
            <div class="sky">
                <div class="cloud cloud--blue"></div>
                <div class="cloud cloud--rose"></div>
                <div class="cloud cloud--sage"></div>
                <div class="starlight starlight--one"></div>
                <div class="starlight starlight--two"></div>
                <div class="stars">
                    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>
                <div class="silver-sparkles" aria-hidden="true">
                    <i></i><i></i><i></i><i></i><i></i><i></i>
                </div>
                <svg class="top-feather top-feather--left" viewBox="0 0 120 260" fill="none" aria-hidden="true">
                    <path d="M99 12C45 44 17 105 23 170c4 42 30 69 42 78 2-35 11-62 28-91 22-38 28-91 6-145Z" fill="currentColor" fill-opacity=".13"/>
                    <path d="M24 244c16-73 43-137 78-232M39 196l-24-32m37 1-31-35m45 1L42 91m57 6L72 67m34 1L83 38" stroke="currentColor" stroke-opacity=".4" stroke-width="1.1" stroke-linecap="round"/>
                </svg>
                <svg class="top-feather top-feather--right" viewBox="0 0 120 260" fill="none" aria-hidden="true">
                    <path d="M99 12C45 44 17 105 23 170c4 42 30 69 42 78 2-35 11-62 28-91 22-38 28-91 6-145Z" fill="currentColor" fill-opacity=".13"/>
                    <path d="M24 244c16-73 43-137 78-232M39 196l-24-32m37 1-31-35m45 1L42 91m57 6L72 67m34 1L83 38" stroke="currentColor" stroke-opacity=".4" stroke-width="1.1" stroke-linecap="round"/>
                </svg>
                <a class="feather-link feather-link--upper" href="#projects" aria-label="打开项目页">
                    <svg class="feather" viewBox="0 0 120 260" fill="none" aria-hidden="true">
                        <path d="M99 12C45 44 17 105 23 170c4 42 30 69 42 78 2-35 11-62 28-91 22-38 28-91 6-145Z" fill="currentColor" fill-opacity=".16"/>
                        <path d="M24 244c16-73 43-137 78-232M39 196l-24-32m37 1-31-35m45 1L42 91m57 6L72 67m34 1L83 38" stroke="currentColor" stroke-opacity=".36" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                    <span class="feather-label">项目</span>
                </a>
                <a class="feather-link feather-link--lower" href="#interests" aria-label="打开爱好页">
                    <svg class="feather feather--lower" viewBox="0 0 120 260" fill="none" aria-hidden="true">
                        <path d="M99 12C45 44 17 105 23 170c4 42 30 69 42 78 2-35 11-62 28-91 22-38 28-91 6-145Z" fill="currentColor" fill-opacity=".16"/>
                        <path d="M24 244c16-73 43-137 78-232M39 196l-24-32m37 1-31-35m45 1L42 91m57 6L72 67m34 1L83 38" stroke="currentColor" stroke-opacity=".36" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                    <span class="feather-label">爱好</span>
                </a>
            </div>

            <header class="topline">
                <p>PERSONAL JOURNAL <span>—</span> 2029 FALL</p>
                <span class="topline-mark" aria-hidden="true">✳</span>
            </header>

            <section class="intro">
                <p class="eyebrow"><span></span> something about me</p>
                <h1 id="name">WDQL</h1>
                <p class="school">同济大学 <b>·</b> 启迪书院 <b>·</b> 数据科学与大数据技术</p>
                <div class="verse">
                    <span class="quote-mark" aria-hidden="true">“</span>
                    <p>我渴望有人暴烈地爱我至死不渝</p>
                </div>
                <div class="bio">
                    <p>向来恬然自若，<br>偶尔亦复自疑。</p>
                    <p>在每个深夜思考人生意义，<br>点完外卖方觉人间值得。</p>
                    <p>情绪上头，爆更万字小说，<br>灵光一现，代码敲出火花。</p>
                    <p>烧香沏茶、窗外远山含黛，<br>默默做一名无情键修。</p>
                </div>
            </section>

            <footer class="bottomline">
                <span class="location">在代码、文字与日常之间漫游</span>
                <a class="scroll-cue" href="#projects" aria-label="继续向下浏览">
                    <span>SCROLL TO EXPLORE</span>
                    <i aria-hidden="true">↓</i>
                </a>
                <span class="page-number">01 <i></i> 03</span>
            </footer>
        </main>`;
})();
