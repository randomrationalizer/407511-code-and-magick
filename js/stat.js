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

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + CLOUD_GAP, CLOUD_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_GAP, CLOUD_GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + CLOUD_GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT - GAP);

    ctx.fillStyle = 'hsl(240, ' + Math.floor(100 * Math.random()) + '%, ' + Math.floor(100 * Math.random()) + '%)';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    var currentBarHeight = (barHeight * times[i]) / maxTime;
    ctx.fillRect(CLOUD_X + CLOUD_GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_GAP + 2 * TEXT_HEIGHT + 2 * GAP + barHeight - currentBarHeight, BAR_WIDTH, currentBarHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + CLOUD_GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_GAP + 2 * TEXT_HEIGHT + GAP + barHeight - currentBarHeight);
  }
};
