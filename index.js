const resButton = document.getElementById("resButton");
const resVowels = document.getElementById("resVowels");
const resConsonants = document.getElementById("resConsonants");
const resLetters = document.getElementById("resLetters");
const resNot = document.getElementById("resNot");
const text = document.getElementById("text");
const btnDelContent = document.querySelector(".btn-styled");

const getExp = (letter) => new RegExp(`${letter}`, "i");

const ruVowelsStr = "аяуюоеёэиы";
const ruConsonantsStr = "БВГДЖЗЙКЛМНПРСТФХЦЧШЩ";

const parse = (text) => {
	const ruL = new RegExp("^[а-яё]", "ig")
	if (text.value === '') throw new Error("Похоже, что была введена пустая строка :с \nПопробуйте ещё раз");
	if (!Boolean(text.value.match(ruL))) throw new Error("Наши алгоритмы пришлы к выводу, что здесь есть символы, отличные от русских букв \nНе расстраивайтесь, вы всегда можете попробовать снова! :)")
	return text.value.replace(/\s/ig, '');
}

const getResult = (text) => {
	const str = parse(text);
	const sum = str.length;
	const arrayLetters = str.split('');
	let vowels = 0;
	let consonants = 0;
	let letter = 0;
	const enL = new RegExp("^[a-z]", "ig")


	arrayLetters.forEach(el => {
		if (el.match(enL)) throw new Error("Наши алгоритмы пришлы к выводу, что здесь есть символы, отличные от русских букв \nНе расстраивайтесь, вы всегда можете попробовать снова! :)");
		const isVowel = ruVowelsStr.match(getExp(el));
		if (isVowel) vowels += 1;
		else if (el === 'ь' || el === 'Ь' || el === 'ъ' || el === 'Ъ') letter += 1;
		else consonants += 1;
	})

	return [vowels, consonants, letter, sum];
};

const errorMsg = document.getElementById("errorMsg");
const errorScreen = document.querySelector(".errorScreen");
const btnClose = document.getElementById("btnClose");

const showError = (msg) => {
	errorMsg.innerText = msg;
	errorScreen.classList.remove('hidden');

};

btnDelContent.addEventListener("click" , () => {
	text.value = ''
	resVowels.innerText = '';
	resConsonants.innerText = '';
	resNot.innerText = '';
	resLetters.innerText = '0';
})

btnClose.addEventListener("click", () => {
	errorScreen.classList.add('hidden');
	text.value = ''
})

resButton.addEventListener("click", () => {
	try {
		const [vowels, consonants, letter, sum] = getResult(text);
		resVowels.innerText = vowels;
		resConsonants.innerText = consonants;
		resNot.innerText = letter;
		resLetters.innerText = sum;
	} catch (e) {
		showError(e.message);
	}
})
