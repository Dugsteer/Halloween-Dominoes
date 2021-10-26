// LOADER, SIDEBAR and ABOUT INFO
const sidey = document.getElementById('sidebar');
const loader = document.getElementById("loaderDiv");
const extra = document.getElementById('info');
const mainpic = document.getElementById('mainpic');
const blue = window.matchMedia("(max-width: 800px)");


// Show and hide about info
function show(){info.classList.toggle('xxc');};
function unshow(){info.classList.remove('xxc');};

//Center the loader wherever the page is
function checkForTop (){loader.style.top = (window.pageYOffset) + "px";}
checkForTop();

//Manage the loader
function stopLoader() {loader.classList.add("stop");}
function startLoader(){loader.classList.remove("stop"); setTimeout(stopLoader, 1000);}
setTimeout(stopLoader, 1000);

//Stop the sidebar appearing on small screens with matchmedia
function myFunction(x) {if (blue.matches) {sidey.classList.remove("block");}}
function toggler() {sidey.classList.toggle("block");}
myFunction(blue);

//GAME FUNCTIONALITY
const container = document.getElementById("contents");
let counter = 0;
let deck = true;
const tiles = [
  ["img/bone.svg", "witch"],
  ["img/witch.svg", "werewolf"],
  ["img/werewolf.svg", "zombie"],
  ["img/zombie.svg", "bat"],
  ["img/bat.svg", "cauldron"],
  ["img/cauldron.svg", "frank"],
  ["img/frankenstein.svg", "ghost"],
  ["img/ghost.svg", "grave"],
  ["img/grave.svg", "monster"],
  ["img/monster.svg", "mummy"],
  ["img/mummy.svg", "pumpkin"],
  ["img/pumpkin.svg", "skeleton"],
  ["img/skeleton.svg", "skull"],
  ["img/skull.svg", "spider"],
  ["img/spider.svg", "bone"],
];

// FISHER-YATES shuffle the tiles
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(tiles);

// Add new domino tile
function newTile() {
  if (deck === false) {
    document.getElementById("gameover").style.visibility = "visible";
  } else if (deck === true) {
    container.insertAdjacentHTML(
      "afterbegin",
      `<div id="domino${counter}" class="domino" style="display: flex;
  position: absolute;
  top: 5px;
  left: 30px;
  align-items: center;
  justify-content: center;
  background: grey;
  border-radius: 5px;
  justify-content: center;
  box-shadow: 2px 2px 4px -1px 594f73;
  width: 320px;
  height: 90px">
    <div id="domleft" class="domleft"><img src="${tiles[counter][0]}"></div>
    <div id="domright" class="domright">${tiles[counter][1]}</div>
  </div>`
    );
    window[`domino${counter}`].addEventListener("dblclick", turnem);
    dragElement(window[`domino${counter}`]);

    if (counter < tiles.length - 1) {
      counter++;
    } else {
      deck = false;
    }
  }
}

// Drag domino function
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Rotate domino function
function turnem(e) {
  let checkforimage = e.target;
  let item = e.target.parentElement;

  // Make sure the clicked element is not an image
  if (checkforimage.tagName === "IMG"){
    return false;
  } else if (item.style.transform === "rotate(-90deg)") {
    item.style.transform = "rotate(0deg)";
  } else if (item.style.transform === "rotate(0deg)") {
    item.style.transform = "rotate(90deg)";
  } else if (item.style.transform === "rotate(90deg)") {
    item.style.transform = "rotate(-180deg)";
  } else {
    item.style.transform = "rotate(-90deg)";
  }
}