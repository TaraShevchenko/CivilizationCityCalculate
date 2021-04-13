const $root = document.querySelector('.root .container .row');
const $rootChild = document.querySelector('.root .container .row .city_add_wrapper');

const buttonImages = ['assets/images/smile-solid.svg', 'assets/images/cog-solid.svg', 'assets/images/long-arrow-alt-up-solid.svg', 'assets/images/trash-solid.svg'];
const infoImages = ['assets/images/smile-solid.svg', 'assets/images/cog-solid.svg', 'assets/images/Lv.svg', 'assets/images/coins-solid.svg'];

function User(smile, cog, level, coins) {
    this.smile = smile;
    this.cog = cog;
    this.level = level;
    this.coins = coins;
}

const cites = [];


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


function cityCommunicate(param, num, i) {
    cites[i].param = true;

    const $cityInfo = document.querySelectorAll('.city__info');
    const $cityInfoItem = createElement('div', `city__info-item city__info-item-${param}`);

    $cityInfo[i].appendChild($cityInfoItem);
    const $cityInfoItemImage = createElement('img');
    $cityInfoItemImage.setAttribute('src', `${infoImages[num]}`);

    $cityInfoItem.appendChild($cityInfoItemImage);
}

//function cityGenerate ------------------------------------------------------------------------------------------------

let $cityCoins = document.querySelectorAll('.city__info-item-coins');
let $addSmileButton = document.querySelectorAll('.addSmile');
let $addCogButton = document.querySelectorAll('.addCog');
let $upLevelButton = document.querySelectorAll('.upLevel');
let $citySmile = document.querySelectorAll('.city__info-item-smile');
let $cityCog = document.querySelectorAll('.city__info-item-cog');
let $cityLevel = document.querySelectorAll('.city__info-item-level');

function cityGenerate() {

    let newCity = new User(false, false, 1, 2)

    const $cityWrapper = createElement('div', 'col-md-4 col-sm-6 col-12');

    $root.insertBefore($cityWrapper, $rootChild);

    const $city = createElement('div', `city cityCard${cityId}`);

    $cityWrapper.appendChild($city);

    const $citySwitcher = createElement('div', 'city__switcher');
    const $citySwitcherCheckbox = createElement('input', 'citySwitch', 'id', `switch${cityId}`);
    $citySwitcherCheckbox.setAttribute('type', 'checkbox');
    $citySwitcherCheckbox.setAttribute('checked', 'checked');
    const $citySwitcherLabel = createElement('label', '', 'for', `switch${cityId}`);

    $city.appendChild($citySwitcher);
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

    let i = 0;

    for (let item in newCity) {

        if (newCity[item] >= 1) {
            const $cityInfoItem = createElement('div', 'city__info-item');

            $cityInfo.appendChild($cityInfoItem);

            const $cityInfoItemImage = createElement('img');
            $cityInfoItemImage.setAttribute('src', `${infoImages[i]}`);

            $cityInfoItem.appendChild($cityInfoItemImage);

            const $cityInfoItemText = createElement('div');

            if (i === 0) {

            }
            if (i === 1) {

            }
            if (i === 2) {
                $cityInfoItemText.innerText = newCity.level;
                $cityInfoItemText.classList.add('city__info-item-level');
            }
            if (i === 3) {
                $cityInfoItemText.innerText = newCity.coins;
                $cityInfoItemText.classList.add('city__info-item-coins');
            }

            $cityInfoItem.appendChild($cityInfoItemText);
        }
        i++;
    }


    const $cityBtnGroup = createElement('div', 'city__btn-group');

    $city.appendChild($cityBtnGroup);

    for (let i = 0; i < buttonImages.length; i++) {
        const $cityBtn = createElement('button', 'btn btn-primary city__btn');
        const $cityBtnImage = createElement('img');
        $cityBtnImage.setAttribute('src', `${buttonImages[i]}`);

        if (i === 0) {
            $cityBtn.classList.add('addSmile');
        }
        if (i === 1) {
            $cityBtn.classList.add('addCog');
        }
        if (i === 2) {
            $cityBtn.classList.add('upLevel');
        }
        if (i === 3) {
            $cityBtn.classList.add('deleteCity');
        }

        $cityBtnGroup.appendChild($cityBtn);
        $cityBtn.appendChild($cityBtnImage);
    }

    cites.push(newCity);

    $cityCoins = document.querySelectorAll('.city__info-item-coins');
    $addSmileButton = document.querySelectorAll('.addSmile');
    $addCogButton = document.querySelectorAll('.addCog');
    $upLevelButton = document.querySelectorAll('.upLevel');
    $citySmile = document.querySelectorAll('.city__info-item-smile');
    $cityCog = document.querySelectorAll('.city__info-item-cog');
    $cityLevel = document.querySelectorAll('.city__info-item-level');
    cityId = cityId + 1;
}

const addCity = document.querySelector('.city_add');

let smileFormula;
let cogFormula;
function coinsFormulaIfs(i) {
    if (cites[i].smile) {
        smileFormula = 2;
    }else {
        smileFormula = 0;
    }

    if (cites[i].cog) {
        cogFormula = 2;
    }else {
        cogFormula = 1;
    }

    cites[i].coins = (cites[i].level * 2 + smileFormula) * cogFormula;
    $cityCoins[i].innerText = `${cites[i].coins}`;

    console.log(cites[i]);
}

addCity.addEventListener('click', function () {
    cityGenerate();

    for (let i = 0; i < $addSmileButton.length; i++) {
        $addSmileButton = document.querySelectorAll('.addSmile');
        $citySmile = document.querySelectorAll('.city__info-item-smile');
        $addSmileButton[i].addEventListener('click', function () {
            console.log($citySmile)
            if (cites[i].smile === false) {
                cites[i].smile = true;
                cityCommunicate('smile', 0, `${i}`);

                coinsFormulaIfs(i);
            } else {
                cites[i].smile = false;
                $citySmile[i].remove();

                coinsFormulaIfs(i);
            }
        })
    }

    for (let i = 0; i < $addCogButton.length; i++) {

        $addCogButton = document.querySelectorAll('.addCog');
        $cityCog = document.querySelectorAll('.city__info-item-cog');

        $addCogButton[i].addEventListener('click', function () {
            if (cites[i].cog === false) {

                cites[i].cog = true;
                cityCommunicate('cog', 1, `${i}`);

                coinsFormulaIfs(i);
            } else {
                cites[i].cog = false;
                $cityCog[i].remove();

                coinsFormulaIfs(i);
            }
        })
    }

    for (let i = 0; i < $upLevelButton.length; i++) {


        $upLevelButton[i].addEventListener('click', function () {

            $upLevelButton = document.querySelectorAll('.upLevel');
            $cityLevel = document.querySelectorAll('.city__info-item-level');

            if (cites[i].level < 4) {
                cites[i].level = cites[i].level + 1;
                $cityLevel[i].innerText = `${cites[i].level}`;

                coinsFormulaIfs(i);
            } else {
                cites[i].level = 1;
                $cityLevel[i].innerText = `${cites[i].level}`;

                coinsFormulaIfs(i);
            }
        })
    }

});



// for (let i = 0; i < removeCityButton.length; i++) {
//     removeCityButton[i].addEventListener('click', function () {
//         if (cites[i].smile === false) {
//             cites[i].smile = true;
//             cityCommunicate('smile', 0, `${i}`)
//         }else {
//             const $cityInfoItem = document.querySelectorAll('.city__info-item-smile');
//             $cityInfoItem[i].remove();
//             cites[i].smile = false;
//         }
//         console.log(cites[i].smile)
//     })
// }

//function calculate----------------------------------------------------------------------------------------------------

function calculateGold() {
    let allResult = 0;
    for (let i = 0; i < cites.length; i++) {
        const citySwitch = document.querySelectorAll('input[type=checkbox]');

        if (citySwitch[i].checked) {
            let resultCity = 0;

            resultCity = resultCity + cites[i].coins;

            allResult = resultCity + allResult
        }
    }

    alert(`Ты заработал ${allResult} золота.`)
}

const calculate = document.querySelector('.calculate');

calculate.addEventListener('click', function () {
    calculateGold()
})





