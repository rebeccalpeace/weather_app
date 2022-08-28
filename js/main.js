
{
    let form = document.getElementById('weatherInfo');
    console.log(form);

    // function to handle the submit event
    async function handleSubmit(event){
        event.preventDefault();
        let inputCity = event.target.city.value;
        console.log(inputCity);
        let cityInfo = await getCityInfo(inputCity);
        if (Object.keys(cityInfo).length === 0){
            errorDiv = document.createElement('div');
            errorDiv.className = 'text-center mt-5 fw-bold'
            errorDiv.innerHTML = 'Invalid response. Please enter a city.'
            document.getElementById('weatherCard').append(errorDiv)
        } else {
            let cityImg = await getCityImg(inputCity);
            buildCityCard(cityInfo, cityImg);
        }
        event.target.city.value = '';
    }


    async function getCityInfo(city){
        res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myWeatherKey}`);
        let data = await res.json();
        if (res.status === 200){
            return data
        } else {
            return {}
        }

    }

    async function getCityImg(city){
        res = await fetch(`https://api.unsplash.com/photos/random/?query=${city}&orientation=portrait&client_id=${myUnsplashKey}`);
        let data = await res.json();
        return data;
    }



    function buildCityCard(cityInfo, cityImg){
        // create a card div
        let card = document.createElement('div');
        card.className = 'card mt-5 mb-3 ms-auto me-auto';
        card.style = 'width: 75%; border: solid black 3px; box-shadow: 5px 10px #ffc107';

        // create inner div
        let innerCard = document.createElement('div');
        innerCard.className = 'row g-0';
        card.append(innerCard);

        // create image div
        let imageDiv = document.createElement('div');
        imageDiv.className = 'col-md-4';
        imageDiv.style = 'border-right: solid black 3px;'
        innerCard.append(imageDiv);

        // create image
        let image = document.createElement('img');
        image.className = `img-fluid rounded-start`;
        image.src = `${cityImg['urls']['raw']}&format=auto`;
        imageDiv.append(image);

        // create div for weather info
        let infoDiv = document.createElement('div');
        infoDiv.className = 'col-md-8';
        innerCard.append(infoDiv);

        // create div for card body
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        infoDiv.append(cardBody);

        // create h4 for City name
        let cityHeader = document.createElement('h3');
        cityHeader.className = 'card-title text-center mt-1 mb-3 fw-bold';
        cityHeader.innerHTML = cityInfo['name'];
        cardBody.append(cityHeader);

        //create p for description
        let p1 = document.createElement('p');
        p1.className = 'card-text fs-5 mt-1';
        p1.innerHTML = `<strong>Description:</strong> ${cityInfo['weather'][0]['description']}`;
        cardBody.append(p1);

        let p2 = document.createElement('p');
        p2.className = 'card-text fs-5';
        p2.innerHTML = `<strong>Low:</strong> ${Math.round(((cityInfo['main']['temp_min']-273.15)*1.8)+32)}\u00B0F`;
        cardBody.append(p2);

        let p3 = document.createElement('p');
        p3.className = 'card-text fs-5';
        p3.innerHTML = `<strong>High:</strong> ${Math.round(((cityInfo['main']['temp_max']-273.15)*1.8)+32)}\u00B0F`;
        cardBody.append(p3);

        let p4 = document.createElement('p');
        p4.className = 'card-text fs-5';
        p4.innerHTML = `<strong>Current:</strong> ${Math.round(((cityInfo['main']['temp']-273.15)*1.8)+32)}\u00B0F`;
        cardBody.append(p4);

        let p5 = document.createElement('p');
        p5.className = 'card-text fs-5';
        p5.innerHTML = `<strong>Feels like:</strong> ${Math.round(((cityInfo['main']['feels_like']-273.15)*1.8)+32)}\u00B0F`;
        cardBody.append(p5);

        let p6 = document.createElement('p');
        p6.className = 'card-text fs-5';
        p6.innerHTML = `<strong>Humidity:</strong> ${cityInfo['main']['humidity']}%`;
        cardBody.append(p6);

        let display = document.getElementById('weatherCard');
        display.innerHTML = '';
        display.append(card)

    }

    form.addEventListener('submit', handleSubmit);
}

{

}