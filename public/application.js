const div = document.getElementById('fetchDiv');

/* 
async function foo () {
    const data = await fetch('https://taras.media/test_elbrus/'); // в массиве индекс 0 - это студии, индекс 1 - 1кк и.д
    const result = await data.json();
    console.log(result);
    div.innerHTML = "средняя стоимость по округу: " + result.result[0].ЦАО[0]; // средняя цена аренды в ЦАО по студиям
}

foo() 
*/

// используем fetch в roomsRouter (здесь всю функцию можно удалить - оставил себе для примера)
async function foo () {
    const data = await fetch('https://taras.media/test_elbrus/'); // в массиве индекс 0 - это студии, индекс 1 - 1кк и.д
    const result = await data.json();

    const arrOkrug = result.result; // массив с объектами
    console.log(arrOkrug);

    arrOkrug.forEach(okrug => {
        console.log(okrug); // объкты
    });

}

/* foo()  */


// прогноз погоды
async function foo_wea () {
    const data = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Москва&appid=51b11e73169c213bec128f589af4d4ff&lang=ru'); 
    const resultFetch = await data.json();
    console.log(resultFetch);
    }
    
 foo_wea() 

 