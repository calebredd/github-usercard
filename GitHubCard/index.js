/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
var heart = document.querySelector(".header").querySelector("p");
heart.addEventListener("click", function() {
  return document.location.reload();
});
let handle = prompt("What is your github handle?");
if (handle == "") {
  handle = "calebredd";
}
// console.log(handle);
axios
  .get(`https://api.github.com/users/${handle}`)
  .then(response => {
    // console.log(response.data);
    cardCreator(response.data);
  })
  .catch(err => {
    console.log("Error:" + err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios
  .get(`https://api.github.com/users/${handle}/followers`)
  .then(response => {
    response.data.forEach(function(e) {
      followersArray.push(e.login);
      axios
        .get(e.url)
        .then(response => {
          cardCreator(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
    // followers();
  })
  .catch(err => {
    console.log(err);
  });

const followersArray = [];

/*
//If I did the way the instructions said to using the followersArray[]:
function followers() {
  followersArray.forEach(function(username) {
    return axios
      .get(`https://api.github.com/users/${username}`)
      .then(response => {
        cardCreator(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
*/

cardCreator = function(data) {
  var cards = document.querySelector(".cards");
  var card = document.createElement("div");
  var img = document.createElement("img");
  var cardInfo = document.createElement("div");
  var name = document.createElement("h3");
  var username = document.createElement("p");
  var location = document.createElement("p");
  var profile = document.createElement("p");
  var userPageLink = document.createElement("a");
  var followers = document.createElement("p");
  var following = document.createElement("p");
  var bio = document.createElement("p");

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  profile.appendChild(userPageLink);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  img.src = data.avatar_url;
  name.textContent = data.name;
  username.textContent = data.login;
  location.textContent = "Location: " + data.location;
  profile.textContent = "Profile: ";
  userPageLink.href = data.html_url;
  userPageLink.textContent = data.html_url;
  followers.textContent = "Followers: " + data.followers;
  following.textContent = "Following: " + data.following;
  bio.textContent = data.bio;
  return cards.appendChild(card);
};

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
