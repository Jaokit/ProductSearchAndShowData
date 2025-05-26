const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const cards = document.querySelectorAll('.card');
const notFound = document.getElementById('notFound');

function toggleInfo(card, event) {
  const isClickOnImage = event.target.tagName === 'IMG' || event.target.tagName === 'MODEL-VIEWER';
  if (!isClickOnImage) return;

  const isActive = card.classList.contains('active');
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));

  if (!isActive) {
    card.classList.add('active');
  }
}

function searchParts() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    cards.forEach(card => {
      card.style.display = 'none';
      card.classList.remove('active');
    });
    notFound.style.display = 'none';
    return;
  }

  let found = false;

  cards.forEach(card => {
    const part = card.getAttribute('data-part').toLowerCase();
    card.classList.remove('active');

    if (part.includes(query)) {
      card.style.display = 'inline-block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  notFound.style.display = !found ? 'block' : 'none';
}

function clearSearch() {
  searchInput.value = '';
  notFound.style.display = 'none';
  cards.forEach(card => {
    card.style.display = 'none';
    card.classList.remove('active');
  });
}

function setupZoom() {
  document.querySelectorAll('.zoom-image').forEach(image => {
    const panzoom = Panzoom(image, {
      maxScale: 4,
      minScale: 1,
      contain: 'outside',
      animate: true,
      duration: 200
    });

    image.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  cards.forEach(card => {
    card.style.display = 'none';
  });
});

searchInput.addEventListener('input', searchParts);
clearBtn.addEventListener('click', clearSearch);
setupZoom();