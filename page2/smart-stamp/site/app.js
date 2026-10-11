(() => {
  const SERVICE_DEFAULT = '4FAFC201-1FB5-459E-8FCC-C5C9C331914B';
  const CHAR_DEFAULT = 'BEB5483E-36E1-4688-B7F5-EA07361B26A8';
  const $ = (id) => document.getElementById(id);
  const imageInput = $('image-input');
  const workCanvas = $('work-canvas');
  const workCtx = workCanvas.getContext('2d', { willReadFrequently: true });
  let sourceFile = null;
  let mode = 'default';
  let grid = null;
  let drawing = false;
  let lastCell = '';
  let bleDevice = null;
  let bleServer = null;
  let bleCharacteristic = null;
  let readyResolve = null;
  let readyReject = null;

  const log = (message) => {
    const box = $('ble-log');
    box.textContent = `${new Date().toLocaleTimeString()} ${message}\n${box.textContent}`.slice(0, 5000);
  };
  const setStatus = (message) => { $('status').textContent = message; };
  const dimensions = () => ({
    width: Math.max(8, Math.min(512, Math.round(Number($('width').value) || 32))),
    height: Math.max(8, Math.min(512, Math.round(Number($('height').value) || 32))),
  });
  const showResult = (title) => {
    $('result-panel').hidden = false;
    $('result-title').textContent = title;
    $('result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.querySelectorAll('.tab').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((tab) => tab.classList.toggle('active', tab === button));
      document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === `${button.dataset.view}-view`));
      if (button.dataset.view === 'draw') {
        $('result-panel').hidden = true;
        $('bluetooth-step').textContent = '02';
      } else {
        $('result-panel').hidden = false;
        $('bluetooth-step').textContent = '04';
      }
    });
  });
  document.querySelectorAll('.mode').forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode;
      document.querySelectorAll('.mode').forEach((item) => item.classList.toggle('active', item === button));
      const recommended = mode === 'improved' ? 5 : 6.67;
      $('recommended').textContent = recommended.toFixed(2).replace(/0$/, '');
      $('thickness').value = recommended;
      $('thickness-out').value = Number(recommended).toFixed(1);
    });
  });
  $('thickness').addEventListener('input', (event) => { $('thickness-out').value = Number(event.target.value).toFixed(1); });
  $('resize-toggle').addEventListener('change', (event) => {
    $('width').disabled = $('height').disabled = !event.target.checked;
  });

  imageInput.addEventListener('change', () => {
    sourceFile = imageInput.files && imageInput.files[0];
    if (!sourceFile) return;
    const url = URL.createObjectURL(sourceFile);
    $('source-preview').src = url;
    $('source-preview-wrap').hidden = false;
    $('upload-label').textContent = sourceFile.name;
    $('generate').disabled = false;
    setStatus('图片已就绪。');
  });

  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve(image);
      };
      image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('图片读取失败')); };
      image.src = url;
    });
  }

  function gaussianBlur(source, width, height, passes) {
    let input = new Float32Array(source);
    for (let pass = 0; pass < passes; pass++) {
      const horizontal = new Float32Array(input.length);
      const output = new Float32Array(input.length);
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const left = input[y * width + Math.max(0, x - 1)];
        const center = input[y * width + x];
        const right = input[y * width + Math.min(width - 1, x + 1)];
        horizontal[y * width + x] = (left + center * 2 + right) / 4;
      }
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const top = horizontal[Math.max(0, y - 1) * width + x];
        const center = horizontal[y * width + x];
        const bottom = horizontal[Math.min(height - 1, y + 1) * width + x];
        output[y * width + x] = (top + center * 2 + bottom) / 4;
      }
      input = output;
    }
    return input;
  }

  function extractEdges(gray, width, height, currentMode) {
    const blurred = gaussianBlur(gray, width, height, currentMode === 'improved' ? 2 : 1);
    const magnitudes = new Float32Array(width * height);
    const histogram = new Uint32Array(256);
    let samples = 0;
    for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
      const offset = y * width + x;
      const topLeft = blurred[offset - width - 1];
      const top = blurred[offset - width];
      const topRight = blurred[offset - width + 1];
      const left = blurred[offset - 1];
      const right = blurred[offset + 1];
      const bottomLeft = blurred[offset + width - 1];
      const bottom = blurred[offset + width];
      const bottomRight = blurred[offset + width + 1];
      const gx = -topLeft + topRight - left * 2 + right * 2 - bottomLeft + bottomRight;
      const gy = -topLeft - top * 2 - topRight + bottomLeft + bottom * 2 + bottomRight;
      const magnitude = Math.min(255, Math.hypot(gx, gy));
      magnitudes[offset] = magnitude;
      histogram[Math.round(magnitude)]++;
      samples++;
    }
    const target = samples * (currentMode === 'improved' ? .72 : .78);
    let threshold = currentMode === 'improved' ? 14 : 18;
    let cumulative = 0;
    for (let value = 0; value < histogram.length; value++) {
      cumulative += histogram[value];
      if (cumulative >= target) { threshold = Math.max(threshold, value); break; }
    }
    const raw = new Uint8Array(width * height);
    for (let i = 0; i < raw.length; i++) raw[i] = magnitudes[i] >= threshold ? 1 : 0;
    const cleaned = new Uint8Array(raw.length);
    for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
      const offset = y * width + x;
      if (!raw[offset]) continue;
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if ((dx || dy) && raw[offset + dy * width + dx]) neighbors++;
      }
      if (neighbors >= (currentMode === 'improved' ? 2 : 1) || magnitudes[offset] >= threshold * 1.6) cleaned[offset] = 1;
    }
    return cleaned;
  }

  function resizeEdgeMask(source, sourceWidth, sourceHeight, targetWidth, targetHeight) {
    if (sourceWidth === targetWidth && sourceHeight === targetHeight) return source;
    const output = new Uint8Array(targetWidth * targetHeight);
    for (let y = 0; y < targetHeight; y++) for (let x = 0; x < targetWidth; x++) {
      const x0 = Math.floor(x * sourceWidth / targetWidth);
      const x1 = Math.max(x0 + 1, Math.ceil((x + 1) * sourceWidth / targetWidth));
      const y0 = Math.floor(y * sourceHeight / targetHeight);
      const y1 = Math.max(y0 + 1, Math.ceil((y + 1) * sourceHeight / targetHeight));
      let edgePixels = 0;
      let pixels = 0;
      for (let sy = y0; sy < y1; sy++) for (let sx = x0; sx < x1; sx++) {
        edgePixels += source[sy * sourceWidth + sx];
        pixels++;
      }
      if (edgePixels >= Math.max(1, Math.ceil(pixels * .035))) output[y * targetWidth + x] = 1;
    }
    return output;
  }

  function dilateMask(source, width, height, radius) {
    if (radius <= 0) return source;
    const output = new Uint8Array(source.length);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      if (!source[y * width + x]) continue;
      for (let dy = -radius; dy <= radius; dy++) for (let dx = -radius; dx <= radius; dx++) {
        const px = x + dx;
        const py = y + dy;
        if (px >= 0 && py >= 0 && px < width && py < height && dx * dx + dy * dy <= radius * radius) {
          output[py * width + px] = 1;
        }
      }
    }
    return output;
  }

  async function processImageLocally(file, outputSize, currentMode, thicknessScale) {
    const image = await loadImageFile(file);
    const processSize = 384;
    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = sourceCanvas.height = processSize;
    const sourceContext = sourceCanvas.getContext('2d', { willReadFrequently: true });
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    const sx = (image.naturalWidth - side) / 2;
    const sy = (image.naturalHeight - side) / 2;
    sourceContext.drawImage(image, sx, sy, side, side, 0, 0, processSize, processSize);
    const pixels = sourceContext.getImageData(0, 0, processSize, processSize).data;
    const gray = new Uint8Array(processSize * processSize);
    for (let i = 0; i < gray.length; i++) {
      const offset = i * 4;
      gray[i] = Math.round(pixels[offset] * .299 + pixels[offset + 1] * .587 + pixels[offset + 2] * .114);
    }
    const width = outputSize ? outputSize.width : processSize;
    const height = outputSize ? outputSize.height : processSize;
    let mask = resizeEdgeMask(extractEdges(gray, processSize, processSize, currentMode), processSize, processSize, width, height);
    const baseWidth = currentMode === 'improved' ? 4 : 3;
    const averageScale = (width + height) / (processSize * 2);
    const radius = Math.max(0, Math.min(6, Math.round(baseWidth * Math.max(.25, thicknessScale) * averageScale / 2)));
    mask = dilateMask(mask, width, height, radius);
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputContext = outputCanvas.getContext('2d');
    const outputImage = outputContext.createImageData(width, height);
    for (let i = 0; i < mask.length; i++) {
      const value = mask[i] ? 0 : 255;
      const offset = i * 4;
      outputImage.data[offset] = outputImage.data[offset + 1] = outputImage.data[offset + 2] = value;
      outputImage.data[offset + 3] = 255;
    }
    outputContext.putImageData(outputImage, 0, 0);
    const blob = await new Promise((resolve, reject) => {
      outputCanvas.toBlob((value) => value ? resolve(value) : reject(new Error('无法生成线稿图片')), 'image/png');
    });
    return { blob, width, height };
  }

  $('generate').addEventListener('click', async () => {
    if (!sourceFile) return;
    const button = $('generate');
    button.disabled = true;
    button.textContent = '处理中…';
    setStatus('正在本地生成线稿…');
    try {
      const size = $('resize-toggle').checked ? dimensions() : null;
      const result = await processImageLocally(sourceFile, size, mode, Number($('thickness').value));
      await imageBlobToGrid(result.blob, result.width, result.height);
      $('result-panel').hidden = false;
      $('result-title').textContent = size ? '印章预览' : '线稿结果';
      $('result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setStatus('图片处理成功。');
    } catch (error) {
      setStatus(`处理失败：${error.message}。请更换图片后重试。`);
    } finally {
      button.disabled = !sourceFile;
      button.textContent = '生成图片';
    }
  });

  function imageBlobToGrid(blob, width, height) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        const w = Math.max(1, Math.min(512, Math.round(width || image.naturalWidth)));
        const h = Math.max(1, Math.min(512, Math.round(height || image.naturalHeight)));
        workCanvas.width = w; workCanvas.height = h;
        workCtx.imageSmoothingEnabled = true;
        workCtx.drawImage(image, 0, 0, w, h);
        const pixels = workCtx.getImageData(0, 0, w, h).data;
        grid = Array.from({ length: h }, (_, y) => Array.from({ length: w }, (_, x) => {
          const offset = (y * w + x) * 4;
          const luminance = pixels[offset] * .299 + pixels[offset + 1] * .587 + pixels[offset + 2] * .114;
          return luminance > 127 ? 1 : 0;
        }));
        URL.revokeObjectURL(url);
        renderGrid($('result-grid'));
        $('grid-size').textContent = `${w} × ${h}`;
        resolve();
      };
      image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('线稿图片解码失败')); };
      image.src = url;
    });
  }

  function renderGrid(canvas) {
    if (!grid || !canvas) return;
    const rows = grid.length;
    const cols = grid[0].length;
    const cellSize = Math.max(3, Math.min(12, Math.floor(900 / Math.max(rows, cols))));
    const ratio = window.devicePixelRatio || 1;
    canvas.width = cols * cellSize * ratio;
    canvas.height = rows * cellSize * ratio;
    canvas.style.aspectRatio = `${cols} / ${rows}`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) { ctx.fillStyle = '#111'; ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); }
    }
    if (cellSize >= 5) {
      ctx.strokeStyle = 'rgba(140,140,140,.28)'; ctx.lineWidth = .5;
      for (let x = 0; x <= cols; x++) { ctx.beginPath(); ctx.moveTo(x * cellSize, 0); ctx.lineTo(x * cellSize, rows * cellSize); ctx.stroke(); }
      for (let y = 0; y <= rows; y++) { ctx.beginPath(); ctx.moveTo(0, y * cellSize); ctx.lineTo(cols * cellSize, y * cellSize); ctx.stroke(); }
    }
  }

  function toggleAt(canvas, event) {
    if (!grid) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / rect.width * grid[0].length);
    const y = Math.floor((event.clientY - rect.top) / rect.height * grid.length);
    if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return;
    const key = `${x}:${y}`;
    if (lastCell === key) return;
    grid[y][x] = grid[y][x] ? 0 : 1;
    lastCell = key;
    renderGrid($('result-grid'));
    renderGrid($('grid'));
  }
  [$('result-grid'), $('grid')].forEach((canvas) => {
    canvas.addEventListener('pointerdown', (event) => { if (!grid) return; drawing = true; lastCell = ''; canvas.setPointerCapture(event.pointerId); toggleAt(canvas, event); });
    canvas.addEventListener('pointermove', (event) => { if (drawing) toggleAt(canvas, event); });
    canvas.addEventListener('pointerup', () => { drawing = false; lastCell = ''; });
    canvas.addEventListener('pointercancel', () => { drawing = false; lastCell = ''; });
  });

  function blankGrid(width, height) {
    grid = Array.from({ length: height }, () => Array(width).fill(1));
    renderGrid($('grid'));
    renderGrid($('result-grid'));
    $('grid-size').textContent = `${width} × ${height}`;
  }
  function drawDimensions() {
    const width = Math.max(8, Math.min(128, Math.round(Number($('draw-width').value) || 32)));
    const height = Math.max(8, Math.min(128, Math.round(Number($('draw-height').value) || 32)));
    $('draw-width').value = width; $('draw-height').value = height;
    blankGrid(width, height);
  }
  $('draw-width').addEventListener('change', drawDimensions);
  $('draw-height').addEventListener('change', drawDimensions);
  $('reset-grid').addEventListener('click', drawDimensions);
  blankGrid(32, 32);

  function gridPngBlob() {
    if (!grid) throw new Error('没有可保存的点阵');
    workCanvas.width = grid[0].length; workCanvas.height = grid.length;
    const ctx = workCanvas.getContext('2d');
    const imageData = ctx.createImageData(workCanvas.width, workCanvas.height);
    for (let y = 0; y < grid.length; y++) for (let x = 0; x < grid[0].length; x++) {
      const value = grid[y][x] ? 255 : 0;
      const offset = (y * grid[0].length + x) * 4;
      imageData.data[offset] = imageData.data[offset + 1] = imageData.data[offset + 2] = value;
      imageData.data[offset + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return new Promise((resolve) => workCanvas.toBlob(resolve, 'image/png'));
  }
  $('download').addEventListener('click', async () => {
    if (!grid) return;
    const blob = await gridPngBlob();
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'stamp.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('reset').addEventListener('click', () => {
    blankGrid(32, 32); $('result-panel').hidden = false; setStatus('可以重新选择图片并生成。');
  });

  function setBleButtons(connected) {
    $('connect').disabled = connected;
    $('disconnect').disabled = !connected;
    $('gpio-high').disabled = $('gpio-low').disabled = $('print').disabled = !connected;
  }
  setBleButtons(false);
  function onNotification(event) {
    const text = new TextDecoder().decode(event.target.value).trim();
    log(`设备通知：${text}`);
    if (text === 'READY' && readyResolve) { readyResolve(); readyResolve = readyReject = null; }
    if (text.startsWith('ERROR') && readyReject) { readyReject(new Error(text)); readyResolve = readyReject = null; }
  }
  $('connect').addEventListener('click', async () => {
    try {
      if (!navigator.bluetooth) throw new Error('当前浏览器不支持 Web Bluetooth。');
      const service = $('service-uuid').value.trim() || SERVICE_DEFAULT;
      const characteristic = $('characteristic-uuid').value.trim() || CHAR_DEFAULT;
      $('ble-status').textContent = '请选择印章设备…';
      bleDevice = await navigator.bluetooth.requestDevice({ filters: [{ services: [service.toLowerCase()] }], optionalServices: [service.toLowerCase()] });
      bleDevice.addEventListener('gattserverdisconnected', () => { bleServer = bleCharacteristic = null; setBleButtons(false); $('ble-status').textContent = '设备已断开。'; log('设备连接已断开。'); });
      bleServer = await bleDevice.gatt.connect();
      const gattService = await bleServer.getPrimaryService(service);
      bleCharacteristic = await gattService.getCharacteristic(characteristic);
      if (bleCharacteristic.properties.notify) { await bleCharacteristic.startNotifications(); bleCharacteristic.addEventListener('characteristicvaluechanged', onNotification); }
      setBleButtons(true);
      $('ble-status').textContent = `已连接：${bleDevice.name || 'AI 自动印章'}`;
      log(`已连接 ${bleDevice.name || 'AI 自动印章'}`);
    } catch (error) { $('ble-status').textContent = `连接失败：${error.message}`; log(`连接失败：${error.message}`); }
  });
  $('disconnect').addEventListener('click', () => { if (bleDevice?.gatt?.connected) bleDevice.gatt.disconnect(); });
  async function writePacket(bytes) {
    if (!bleCharacteristic) throw new Error('请先连接蓝牙设备');
    if (bleCharacteristic.properties.write) await bleCharacteristic.writeValueWithResponse(bytes);
    else await bleCharacteristic.writeValueWithoutResponse(bytes);
  }
  $('gpio-high').addEventListener('click', async () => { try { await writePacket(new TextEncoder().encode('1')); log('发送 GPIO 高电平指令'); } catch (e) { log(e.message); } });
  $('gpio-low').addEventListener('click', async () => { try { await writePacket(new TextEncoder().encode('0')); log('发送 GPIO 低电平指令'); } catch (e) { log(e.message); } });

  function toPrinterBytes() {
    if (!grid || grid.length !== 32 || grid[0].length !== 32) throw new Error('打印机只接受 32 × 32 点阵，请将宽高设置为 32。');
    const bytes = new Uint8Array(128);
    for (let row = 0; row < 32; row++) for (let col = 0; col < 32; col++) {
      if (grid[row][col] === 1) {
        const bitIndex = row * 32 + col;
        bytes[Math.floor(bitIndex / 8)] |= 1 << (7 - bitIndex % 8);
      }
    }
    return bytes;
  }
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  $('print').addEventListener('click', async () => {
    const progress = $('progress');
    try {
      const bytes = toPrinterBytes();
      $('print').disabled = true; progress.hidden = false; progress.value = 0;
      $('ble-status').textContent = '正在发送打印数据…';
      await writePacket(new Uint8Array([0x01, 0x01, 0x20, 0x20, 0x14, 0x00, 0x80]));
      for (let sequence = 0; sequence < 8; sequence++) {
        const packet = new Uint8Array(19);
        packet[0] = 0x02; packet[1] = sequence; packet[2] = 16;
        packet.set(bytes.slice(sequence * 16, (sequence + 1) * 16), 3);
        await writePacket(packet); progress.value = (sequence + 1) * 8;
        await pause(30);
      }
      let checksum = 0; bytes.forEach((byte) => { checksum = (checksum + byte) & 0xffff; });
      await writePacket(new Uint8Array([0x03, 0x08, checksum >> 8, checksum & 0xff]));
      progress.value = 80;
      await new Promise((resolve, reject) => {
        readyResolve = resolve; readyReject = reject;
        setTimeout(() => { if (readyReject) { readyResolve = readyReject = null; reject(new Error('等待设备 READY 超时')); } }, 10000);
      });
      await writePacket(new Uint8Array([0x04, 0x10]));
      progress.value = 100; $('ble-status').textContent = '打印命令已发送。'; log('点阵发送完成，打印命令已发送。');
    } catch (error) { $('ble-status').textContent = `发送失败：${error.message}`; log(`发送失败：${error.message}`); }
    finally { $('print').disabled = !bleCharacteristic; }
  });
})();
