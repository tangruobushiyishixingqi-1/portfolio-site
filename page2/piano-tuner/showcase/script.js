(() => {
    const stages = [
        {
            label: 'STAGE 01 · KEY MAPPING', state: '等待击键', note: 'A4', frequency: '440.0 Hz',
            deviation: '0.0 cents', pointer: 50, title: '找到 A4 对应弦组',
            description: '在 88 键键盘上选择目标琴键，同时高亮内部结构图中的弦组与弦轴位置。',
            motor: 8, motorState: '未启动'
        },
        {
            label: 'STAGE 02 · AUDIO INPUT', state: '正在监听', note: 'A4', frequency: '439.3 Hz',
            deviation: '−2.8 cents', pointer: 37, title: '采集一次稳定的琴音',
            description: '等待音量与基频稳定，过滤起音瞬态和明显环境噪声，再进入偏差判断。',
            motor: 8, motorState: '锁定'
        },
        {
            label: 'STAGE 03 · PITCH ANALYSIS', state: '偏低', note: 'A4', frequency: '439.3 Hz',
            deviation: '−2.8 cents', pointer: 37, title: '目标琴弦需要轻微拧紧',
            description: '将检测频率与目标频率比较，并结合拍音趋势输出方向明确的调律建议。',
            motor: 22, motorState: '待确认'
        },
        {
            label: 'STAGE 04 · MOTOR CONTROL', state: '微调中', note: 'A4', frequency: '439.8 Hz',
            deviation: '−0.8 cents', pointer: 46, title: '执行受限角度微调',
            description: '步进电机按小步长转动；每次动作后暂停，避免一次调整过量并等待张力稳定。',
            motor: 72, motorState: '顺时针 · 0.3°'
        },
        {
            label: 'STAGE 05 · VERIFICATION', state: '稳定', note: 'A4', frequency: '440.0 Hz',
            deviation: '+0.1 cents', pointer: 51, title: '再次击键并完成复检',
            description: '重新采集琴音，确认偏差进入目标范围；若结果回弹，则返回微调阶段继续迭代。',
            motor: 100, motorState: '完成'
        }
    ];

    const tabs = [...document.querySelectorAll('[data-stage]')];
    const setText = (id, value) => { document.getElementById(id).textContent = value; };

    const activateStage = index => {
        const stage = stages[index];
        if (!stage) return;
        tabs.forEach((tab, tabIndex) => {
            const active = tabIndex === index;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
        });
        setText('stage-label', stage.label);
        setText('stage-state', stage.state);
        setText('note-name', stage.note);
        setText('note-frequency', stage.frequency);
        setText('deviation-value', stage.deviation);
        setText('stage-title', stage.title);
        setText('stage-description', stage.description);
        setText('motor-state', stage.motorState);
        document.getElementById('deviation-pointer').style.left = `${stage.pointer}%`;
        document.getElementById('motor-progress').style.width = `${stage.motor}%`;
    };

    tabs.forEach((tab, index) => tab.addEventListener('click', () => activateStage(index)));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = [...document.querySelectorAll('.reveal')];
    if (!reduceMotion && 'IntersectionObserver' in window) {
        document.documentElement.classList.add('reveal-ready');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
        reveals.forEach(element => observer.observe(element));
    } else {
        reveals.forEach(element => element.classList.add('is-visible'));
    }
})();
