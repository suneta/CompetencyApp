import '../scss/punk.css';
import 'jquery';
import 'jquery.cycle2';
import 'jquery.cycle2.carousel';
const request = new XMLHttpRequest();
var op = {};
request.open('GET', 'https://api.punkapi.com/v2/beers', true);
request.onload = function() {
  // Begin accessing JSON data here
  const containerDiv = document.getElementById('accordion');
  const divCarousel = document.getElementById('divCarousel');

  const divCarouselVis5 = document.getElementById('divCarouselVis5');
  const data = JSON.parse(this.response);

  op = data;

  if (request.status >= 200 && request.status < 400) {
    data.forEach(beer => {
      const container = document.createElement('div');
      container.setAttribute('class', 'panel');
      containerDiv.appendChild(container);
      const outerDiv = document.createElement('div');
      outerDiv.setAttribute('class', 'header');
      const innerDiv = document.createElement('div');
      innerDiv.setAttribute('class', 'body');
      container.appendChild(outerDiv);
      container.appendChild(innerDiv);
      outerDiv.textContent = beer.name;
      container.appendChild(innerDiv);
      outerDiv.textContent = beer.name;
      //innerDiv.textContent = beer.tagline+' '+beer.first_brewed;
      const img = document.createElement('IMG');
      img.setAttribute('src', beer.image_url);
      img.setAttribute('width', '100');
      img.setAttribute('height', '100');
      img.setAttribute('alt', 'The Pulpit Rock');
      innerDiv.appendChild(img);

      const detaildiv = document.createElement('div');
      detaildiv.setAttribute('class', 'detail');
      innerDiv.appendChild(detaildiv);

      const h3 = document.createElement('h3');
      detaildiv.appendChild(h3);
      h3.textContent = beer.tagline;

      const sm = document.createElement('small');
      detaildiv.appendChild(sm);
      sm.textContent = beer.first_brewed;

      const p = document.createElement('p');
      detaildiv.appendChild(p);
      p.textContent = beer.description;

      const carouselImg = document.createElement('IMG');
      carouselImg.setAttribute('src', beer.image_url);
      carouselImg.setAttribute('alt', beer.name);
      carouselImg.setAttribute('width', '300');
      carouselImg.setAttribute('height', '300');
      divCarousel.appendChild(carouselImg);

      const carouselImgSingle = document.createElement('IMG');
      carouselImgSingle.setAttribute('src', beer.image_url);
      carouselImgSingle.setAttribute('alt', beer.name);
      carouselImgSingle.setAttribute('width', '300');
      carouselImgSingle.setAttribute('height', '300');
      divCarouselVis5.appendChild(carouselImgSingle);

      bindCTAGrid(beer);
    });
    $('.slideshow-1').cycle({ fx: 'fade' });
    $('.slideshow').cycle();
  } else {
    console.log('error');
  }
  initAccordion(document.getElementById('accordion'));
};
request.send();

function bindCTAGrid(beer) {
  const ctaGrid = document.getElementById('ctaGrid');
  const newCtaGrid = document.createElement('div');
  newCtaGrid.setAttribute('class', 'col-xs-12 col-sm-6 col-md-4 col-lg-4');
  newCtaGrid.innerHTML =
    '<div class="box-row">' +
    '<div class="data-grid">' +
    '<div class="data-img"> <img src="' +
    beer.image_url +
    '" alt="" class="img-fluid" width="33%" height="400">' +
    '</div>' +
    '<div class="data-title"> ' +
    beer.name +
    '</div>' +
    '<div class="data-text">' +
    '<p> ' +
    '<b>Alcohol volume:</b> ' +
    beer.abv +
    '</br>' +
    beer.description +
    ' </p>' +
    '</div>' +
    '</div>' +
    '</div>';

  ctaGrid.appendChild(newCtaGrid);
}

$('#btn').click(function(e) {
  if (e.target.value == 'Highest To Lowest') {
    var d = op.sort(function(a, b) {
      return b.abv - a.abv;
    });
    $('#btn').val('Lowest To Highest');
  } else {
    debugger;
    var d = op.sort(function(a, b) {
      return a.abv - b.abv;
    });
    $('#btn').val('Highest To Lowest');
  }
  const ctaGrid = document.getElementById('ctaGrid');
  ctaGrid.innerHTML = '';
  d.forEach(beer => {
    bindCTAGrid(beer);
  });
});

function initAccordion(accordionElem) {
  // when panel is clicked, handlePanelClick is called.
  function handlePanelClick(event) {
    showPanel(event.currentTarget);
  }
  // Hide currentPanel and show new panel.
  function showPanel(panel) {
    // Hide current one. First time it will be null.
    const expandedPanel = accordionElem.querySelector('.active');
    if (
      expandedPanel != null &&
      panel.className == expandedPanel.className &&
      panel.className === 'panel active'
    ) {
      panel.classList.remove('active');
    } else if (
      expandedPanel != null &&
      panel.className == expandedPanel.className &&
      panel.className === 'panel'
    ) {
      panel.classList.add('active');
    } else if (expandedPanel) {
      expandedPanel.classList.remove('active');
      panel.classList.add('active');
    } else {
      panel.classList.add('active');
    }
  }

  const allPanelElems = accordionElem.querySelectorAll('.panel');
  for (let i = 0, len = allPanelElems.length; i < len; i++) {
    allPanelElems[i].addEventListener('click', handlePanelClick);
  }

  // By Default Show first panel
  showPanel(allPanelElems[0]);
}
