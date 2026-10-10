const observationRange = document.querySelector('#observation-range');
const observationLabel = document.querySelector('#observe-label');
const observedRelation = document.querySelector('#observed-relation');
const futureRelation = document.querySelector('#future-relation');
const labCaption = document.querySelector('#lab-caption');
const frames = [...document.querySelectorAll('.frame-strip i')];

const observationStates = {
    30: { observed: 'far from', future: 'approaching', caption: '只观察到较短前缀：person 与 cup 距离较远，未来仍有较高不确定性。' },
    40: { observed: 'approaching', future: 'near', caption: 'person 正在接近 cup，模型开始捕捉关系变化的方向。' },
    50: { observed: 'near', future: 'holding', caption: '观察到 person 靠近 cup，模型需要预测关系是否将转变为 holding。' },
    60: { observed: 'reaching', future: 'holding', caption: '更多历史揭示了伸手动作，未来 holding 的关系假设变得更明确。' },
    70: { observed: 'holding', future: 'lifting', caption: '观察前缀已经包含 holding，预测目标转向关系接下来如何继续变化。' },
    80: { observed: 'lifting', future: 'using', caption: '观察越接近结尾，短期预测线索更充分，但剩余未来也更短。' }
};

function updateObservation(value) {
    const state = observationStates[value];
    const seenCount = Math.max(1, Math.round((value / 100) * frames.length));

    observationLabel.textContent = `观察 ${value}%`;
    observedRelation.textContent = state.observed;
    futureRelation.textContent = state.future;
    labCaption.textContent = state.caption;
    frames.forEach((frame, index) => frame.classList.toggle('is-seen', index < seenCount));
}

observationRange?.addEventListener('input', (event) => updateObservation(Number(event.target.value)));

const groupContent = {
    ss: { name: 'S-S · 短视频基线', description: '用短视频场景图微调，只输入当前短片段图，建立基础比较线。' },
    sl: { name: 'S-L · 仅增加历史', description: '仍用短视频场景图微调，但推理时加入长期 memory，检验历史上下文本身是否有效。' },
    ls: { name: 'L-S · 仅增加长程监督', description: '用保留跨片段实体与关系变化的长视频场景图微调，但推理时只输入当前图。' },
    ll: { name: 'L-L · 完整方案', description: '同时使用长视频连续监督与长期 memory，检验两者是否共同延长有效预测跨度。' }
};

const groupButtons = [...document.querySelectorAll('.matrix-cell')];
const groupName = document.querySelector('#group-name');
const groupDescription = document.querySelector('#group-description');
const horizonButtons = [...document.querySelectorAll('[data-horizon]')];
const readoutQuestion = document.querySelector('#readout-question');
let selectedHorizon = 15;

function updateQuestion() {
    readoutQuestion.textContent = `在 ${selectedHorizon} 秒跨度上比较关系预测、状态变化与实体一致性。`;
}

groupButtons.forEach((button) => {
    button.addEventListener('click', () => {
        groupButtons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        const content = groupContent[button.dataset.group];
        groupName.textContent = content.name;
        groupDescription.textContent = content.description;
    });
});

horizonButtons.forEach((button) => {
    button.addEventListener('click', () => {
        horizonButtons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        selectedHorizon = Number(button.dataset.horizon);
        updateQuestion();
    });
});

updateObservation(Number(observationRange?.value || 50));
updateQuestion();
