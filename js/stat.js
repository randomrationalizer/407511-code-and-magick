'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_GAP = 40;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;
var barHeight = CLOUD_HEIGHT - CLOUD_GAP - 3 * TEXT_HEIGHT - 3 * GAP;

var renderCloud = function (ctx, x, y, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = '#4d557c';
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMessage = function (ctx, text, x, y, сolor) {
  ctx.fillStyle = сolor;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderBarText = function (ctx, text, i, y, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, CLOUD_X + CLOUD_GAP + i * (BAR_WIDTH + BAR_GAP), y);
};

var getRandomColor = function () {
  return 'hsl(240, ' + Math.floor(100 * Math.random()) + '%, ' + Math.floor(100 * Math.random()) + '%)';
};

var renderBar = function (ctx, i, player, heightInPx) {
  ctx.fillStyle = getRandomColor();
  if (player === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  ctx.fillRect(
      CLOUD_X + CLOUD_GAP + i * (BAR_WIDTH + BAR_GAP),
      CLOUD_GAP + 2 * TEXT_HEIGHT + 2 * GAP + barHeight - heightInPx,
      BAR_WIDTH,
      heightInPx
  );
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderMessage(
      ctx,
      'Ура, вы победили!',
      CLOUD_X + CLOUD_GAP,
      CLOUD_GAP,
      '#000');
  renderMessage(
      ctx,
      'Список результатов:',
      CLOUD_X + CLOUD_GAP,
      CLOUD_GAP + TEXT_HEIGHT,
      '#000'
  );
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderBarText(ctx, names[i], i, CLOUD_HEIGHT - GAP, '#000');
    var currentBarHeight = (barHeight * times[i]) / maxTime;
    renderBar(ctx, i, names[i], currentBarHeight);
    renderBarText(
        ctx,
        Math.floor(times[i]),
        CLOUD_GAP + 2 * TEXT_HEIGHT + GAP + barHeight - currentBarHeight,
        '#000'
    );
  }
};
