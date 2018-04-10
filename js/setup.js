'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsCount = 4;

var userProfile = document.querySelector('.setup');
userProfile.classList.remove('hidden');

// Функция, создающая массив случайно сгенерированных объектов
var createWizardsArray = function (names, surnames, coats, eyes, count) {
  var wizardsArray = [];
  for (var i = 0; i < count; i++) {
    var wizard = {};
    wizard.name = names[Math.floor(Math.random() * (names.length - 1))] + ' ' + surnames[Math.floor(Math.random() * (surnames.length - 1))];
    wizard.coatColor = coats[Math.floor(Math.random() * (coats.length - 1))];
    wizard.eyesColor = eyes[Math.floor(Math.random() * (eyes.length - 1))];
    wizardsArray[i] = wizard;
  }
  return wizardsArray;
};

// Функция, создающая DOM-элемент волшебника на основе шаблона и элемента из массива волшебников
var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Функция, отрисовывающая сгенерированные элементы в блок .setup-similar-list
var renderSimilarList = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createWizardElement(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

var similarListElement = userProfile.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsList = createWizardsArray(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS, wizardsCount);
renderSimilarList(wizardsList);

userProfile.querySelector('.setup-similar').classList.remove('hidden');
