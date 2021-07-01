const $root = document.querySelector('.root .container .row');
const $rootChild = document.querySelector('.root .container .row .city_add_wrapper');

const buttonImages = ['assets/images/smile-solid.svg', 'assets/images/cog-solid.svg', 'assets/images/long-arrow-alt-up-solid.svg', 'assets/images/trash-solid.svg'];
const infoImages = ['assets/images/smile-solid.svg', 'assets/images/cog-solid.svg', 'assets/images/Lv.svg', 'assets/images/coins-solid.svg'];

function User(smile, cog, level, coins, cityId) {
    this.smile = smile;
    this.cog = cog;
    this.level = level;
    this.coins = coins;
    this.cityId = cityId;
}

let cites = [];
let cityId = 0;

//Automation -----------------------------------------------------------------------------------------------------------

DOMTokenList.prototype.addMany = function (classes) {
    var classes = classes.split(' '),
        i = 0,
        ii = classes.length;

    for (i; i < ii; i++) {
        this.add(classes[i]);
    }
}

function createElement(tag, className, attributeName, attributeValue) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.addMany(className);
    }
    if (attributeName && attributeValue) {
        $tag.setAttribute(attributeName, attributeValue);
    }
    return $tag;
}

function coinsFormulaIfs(i) {
    let smileFormula;
    let cogFormula;

    if (cites[i].smile) {
        smileFormula = 2;
    } else {
        smileFormula = 0;
    }

    if (cites[i].cog) {
        cogFormula = 2;
    } else {
        cogFormula = 1;
    }

    cites[i].coins = (cites[i].level * 2 + smileFormula) * cogFormula;
    $cityCoinsText[i].innerText = `${cites[i].coins}`;
}

//function cityGenerate ------------------------------------------------------------------------------------------------

function cityGenerate() {

    let newCity = new User(false, false, 1, 2, cityId)

    const $cityWrapper = createElement('div', 'col-md-4 col-sm-6 col-12 cityWrapper');

    $root.insertBefore($cityWrapper, $rootChild);

    const $city = createElement('div', `city cityCard${cityId}`);

    $cityWrapper.appendChild($city);

    const $cityTop = createElement('div', 'city__top');

    const $citySwitcher = createElement('div', 'city__switcher');
    const $citySwitcherCheckbox = createElement('input', 'citySwitch', 'id', `switch${cityId}`);
    $citySwitcherCheckbox.setAttribute('type', 'checkbox');
    $citySwitcherCheckbox.setAttribute('checked', 'checked');
    const $citySwitcherLabel = createElement('label', '', 'for', `switch${cityId}`);
    $cityTop.appendChild($citySwitcher);

    const $cityName = createElement('div', 'city__name');
    const $inputGroup = createElement('div', 'input-group');
    const $inputGroupInput = createElement('input', 'input', 'type', 'text');
    $inputGroupInput.setAttribute('name', `name`);
    $inputGroupInput.setAttribute('id', `name`);
    const $inputGroupLabel = createElement('label', 'label', 'for', `name`);
    $inputGroupLabel.innerText = 'City name';

    $city.appendChild($cityTop);

    $cityTop.appendChild($citySwitcher);
    $cityTop.appendChild($cityName);

    $cityName.appendChild($inputGroup);
    $inputGroup.appendChild($inputGroupInput);
    $inputGroup.appendChild($inputGroupLabel);

    $citySwitcher.appendChild($citySwitcherCheckbox);
    $citySwitcher.appendChild($citySwitcherLabel);


    const $cityImage = createElement('div', 'city__image');
    const $cityImageItem = createElement('img');
    $cityImageItem.setAttribute('src', 'assets/images/city.png');
    $cityImageItem.setAttribute('alt', 'city');

    $city.appendChild($cityImage);
    $cityImage.appendChild($cityImageItem);

    const $cityInfo = createElement('div', 'city__info');

    $city.appendChild($cityInfo);

    for (let i = 0; i < infoImages.length; i++) {
        const $cityInfoItem = createElement('div', 'city__info-item');

        $cityInfo.appendChild($cityInfoItem);

        const $cityInfoItemImage = createElement('img');
        $cityInfoItemImage.setAttribute('src', `${infoImages[i]}`);

        $cityInfoItem.appendChild($cityInfoItemImage);

        const $cityInfoItemText = createElement('div');
        $cityInfoItem.appendChild($cityInfoItemText);

        switch (i) {
            case 0:
                $cityInfoItem.classList.add('citySmile');
                $cityInfoItem.style.display = 'none';
                break;
            case 1:
                $cityInfoItem.classList.add('cityCog');
                $cityInfoItem.style.display = 'none';
                break;
            case 2:
                $cityInfoItemText.innerText = newCity.level;
                $cityInfoItemText.classList.add('cityLvText');
                break;
            case 3:
                $cityInfoItemText.innerText = newCity.coins;
                $cityInfoItemText.classList.add('cityCoinsText');
                break;
        }


    }

    const $cityBtnGroup = createElement('div', 'city__btn-group');

    $city.appendChild($cityBtnGroup);

    for (let i = 0; i < buttonImages.length; i++) {
        const $cityBtn = createElement('button', 'btn btn-primary city__btn');
        const $cityBtnImage = createElement('img');
        $cityBtnImage.setAttribute('src', `${buttonImages[i]}`);

        switch (i) {
            case 0:
                $cityBtn.classList.add('addSmile');
                break;
            case 1:
                $cityBtn.classList.add('addCog');
                break;
            case 2:
                $cityBtn.classList.add('upLevel');
                break;
            case 3:
                $cityBtn.classList.add('deleteCity');
                break;
        }

        $cityBtnGroup.appendChild($cityBtn);
        $cityBtn.appendChild($cityBtnImage);
    }

    cites.push(newCity);

    cityId = cityId + 1;


    console.log('create', cites)
}

//function cityCommunication -------------------------------------------------------------------------------------------

let test = [];

const $addCity = document.querySelector('.city_add');
$addCity.addEventListener('click', function () {
    cityGenerate();

    const $cityCard = document.querySelectorAll('.cityWrapper');

    const $addSmile = document.querySelectorAll('.addSmile');
    const $addCog = document.querySelectorAll('.addCog');
    const $upLevel = document.querySelectorAll('.upLevel');
    const $deleteCity = document.querySelectorAll('.deleteCity');

    const $citySmile = document.querySelectorAll('.citySmile');
    const $cityCog = document.querySelectorAll('.cityCog');
    const $cityLevelText = document.querySelectorAll('.cityLvText');
    const $cityCoinsText = document.querySelectorAll('.cityCoinsText');



    for (let i = 0; i < $addSmile.length; i++) {
        if (i >= test.length) {
            $addSmile[i].addEventListener('click', function () {
                if (cites[i].smile === false) {
                    cites[i].smile = true;
                    $citySmile[i].style.display = "block";
                    coinsFormulaIfs(i);
                } else {
                    cites[i].smile = false;
                    $citySmile[i].style.display = "none";
                    coinsFormulaIfs(i);
                }
            })
        }
    }

    for (let i = 0; i < $addCog.length; i++) {
        if (i >= test.length) {
            $addCog[i].addEventListener('click', function () {
                if (cites[i].cog === false) {
                    cites[i].cog = true;
                    $cityCog[i].style.display = "block";
                    coinsFormulaIfs(i);
                } else {
                    cites[i].cog = false;
                    $cityCog[i].style.display = "none";
                    coinsFormulaIfs(i);
                }
            })
        }
    }

    for (let i = 0; i < $upLevel.length; i++) {
        if (i >= test.length) {
            $upLevel[i].addEventListener('click', function () {
                if (cites[i].level < 4) {
                    cites[i].level = cites[i].level + 1;
                    $cityLevelText[i].innerText = cites[i].level;
                    coinsFormulaIfs(i);
                } else {
                    cites[i].level = 1;
                    $cityLevelText[i].innerText = '1'
                    coinsFormulaIfs(i);
                }
            })
        }
    }


    for (let i = 0; i < $deleteCity.length; i++) {
        if (i >= test.length) {
            test.push(i);
            console.log(test);

            $deleteCity[i].addEventListener('click', function () { 
                $cityCard[i].remove();
                const newCities = cites.slice(i + 1);
                console.log(newCities);
                cites = newCities;
                console.log(cites);
            })
        }
    }
});

//function calculate----------------------------------------------------------------------------------------------------

function calculateGold() {
    let allResult = 0;
    for (let i = 0; i < cites.length; i++) {
        const citySwitch = document.querySelectorAll('input[type=checkbox]');
        if (citySwitch) {
            if (citySwitch[i].checked) {
                let resultCity = 0;

                resultCity = resultCity + cites[i].coins;
                allResult = resultCity + allResult;
            }
        }
    }

    alert(`Ты заработал ${allResult} золота.`)
}

const calculate = document.querySelector('.calculate');
calculate.addEventListener('click', function () {
    calculateGold()
})





