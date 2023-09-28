console.log("Let's get this party started!");

const form = document.getElementById("search-form");
const searchTermInput = document.getElementById("search-term");
const resultData = document.getElementById("result-data");
const resultsContainer = document.querySelector(".results");
const gifArray = [];
const randomNumber = Math.floor(Math.random() * 10);

form.addEventListener("submit", function (e) {
	e.preventDefault();

	//Gets the user's search term
	const searchTerm = searchTermInput.value;

	//Makes the API request using Axios
	axios
		.get(
			`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
		)
		.then(function (response) {
			const gifs = response.data.data[randomNumber];
			gifArray.push(gifs);
			displayGIFs();
			// displayGIFs(response.data.data);
			//grabs the first GIF
			// const gifURL = response.data.data[0].images.fixed_height.url;
			// const gifTitle = response.data.data[0].title;
			//Creates a new image element for the GIF
			// const img = document.createElement("img");
			// img.src = gifURL;
			// img.alt = gifTitle;
			// //Appens the image to results container
			// resultsContainer.innerHTML = ""; //Clears previous results
			// resultsContainer.appendChild(img);
			//Logs the response data
			// console.log(response.data);

			//DIsplays the response data in the results section
			// resultData.textContent = JSON.stringify(response.data, null, 2);
			//TEST STUFF THAT DID NOT WORK
		})
		.catch(function (error) {
			console.error(error);
		});
});

function displayGIFs() {
	//Clears previous results
	resultsContainer.innerHTML = "";

	//Loops through the GIFs in the response and displays each one
	gifArray.forEach(function (gif, index) {
		const gifURL = gif.images.fixed_height.url;
		const gifTitle = gif.title;

		//creates a container div for each GIF and its delete button
		const containerDiv = document.createElement("div");
		containerDiv.classList.add("gif-container");

		//Creates a new image element for the GIFS
		const img = document.createElement("img");
		img.src = gifURL;
		img.alt = gifTitle;

		//Creates the delete button for each GIF
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", function () {
			gifArray.splice(index, 1);
			displayGIFs();
		});

		//Append image and delete button
		//Append the image to the results container
		containerDiv.appendChild(img);
		containerDiv.appendChild(deleteButton);

		//Appends the container div to the results container
		resultsContainer.appendChild(containerDiv);
	});
}
