(() => {
    const buttons = [...document.querySelectorAll('.stage-button')];
    const status = document.getElementById('record-status');
    const doi = document.getElementById('field-doi');
    const author = document.getElementById('field-author');
    const summary = document.getElementById('field-summary');
    const gateTitle = document.getElementById('gate-title');
    const gateVerdict = document.getElementById('gate-verdict');
    const gateNote = document.getElementById('gate-note');

    if (!buttons.length || !status || !doi || !author || !summary || !gateTitle || !gateVerdict || !gateNote) return;

    const stages = [
        {
            status: '待处理',
            doi: '待核验',
            author: 'Liquan Xie',
            summary: '空缺',
            confirmed: [],
            title: '原始候选已冻结',
            verdict: 'STATE A',
            note: '候选值只是待核验数据。此时不会覆盖正式库，也不会把缺失字段当作事实。'
        },
        {
            status: '核验中',
            doi: '10.3390/su12083482 · 正式页面已确认',
            author: 'Liquan Xie',
            summary: '空缺',
            confirmed: ['doi'],
            title: '正式证据与候选 DOI 一致',
            verdict: 'EVIDENCE',
            note: '证据 URL、访问时间和字段判断被一同保存；搜索摘要只能用于定位，不能直接作为最终结论。'
        },
        {
            status: '已匹配',
            doi: '10.3390/su12083482 · 正式页面已确认',
            author: '谢立全 · 校内教师身份闭合',
            summary: '空缺',
            confirmed: ['doi', 'author'],
            title: '英文作者与师资库完成匹配',
            verdict: 'MATCHED',
            note: '姓名标准化只生成候选，最终匹配还要结合单位、论文主题和已有身份信息。'
        },
        {
            status: '已补全',
            doi: '10.3390/su12083482 · 正式页面已确认',
            author: '谢立全 · 校内教师身份闭合',
            summary: '通过水槽试验研究带浮板土工织物垫对海底管线局部冲刷的防护作用。',
            confirmed: ['doi', 'author', 'summary'],
            title: '技术摘要仅依据原始摘要生成',
            verdict: 'ENRICHED',
            note: '模型输出先进入候选层；缺少原文依据、长度异常或字段冲突时会进入人工复核。'
        },
        {
            status: 'ACCEPT',
            doi: '10.3390/su12083482 · 正式页面已确认',
            author: '谢立全 · 校内教师身份闭合',
            summary: '通过水槽试验研究带浮板土工织物垫对海底管线局部冲刷的防护作用。',
            confirmed: ['doi', 'author', 'summary'],
            title: '证据、字段与规则门禁全部通过',
            verdict: 'ACCEPT',
            note: '只有证据充分且结构校验通过的记录才能进入交付层；不确定项保持 HOLD，明确冲突才会 REJECT。'
        }
    ];

    const setFieldState = (element, confirmed) => {
        element.classList.toggle('is-confirmed', confirmed);
        element.classList.toggle('is-pending', !confirmed);
    };

    const render = (index) => {
        const stage = stages[index];
        buttons.forEach((button, buttonIndex) => {
            const active = buttonIndex === index;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        status.textContent = stage.status;
        doi.textContent = stage.doi;
        author.textContent = stage.author;
        summary.textContent = stage.summary;
        gateTitle.textContent = stage.title;
        gateVerdict.textContent = stage.verdict;
        gateNote.textContent = stage.note;

        setFieldState(doi, stage.confirmed.includes('doi'));
        setFieldState(author, stage.confirmed.includes('author'));
        setFieldState(summary, stage.confirmed.includes('summary'));
    };

    buttons.forEach((button, index) => button.addEventListener('click', () => render(index)));
})();
