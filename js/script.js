document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.menu-toggle');
  const panel = document.getElementById('localMenu');

  function toggleMenu(){
    const open = panel.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open){
      const firstLink = panel.querySelector('a');
      if(firstLink) firstLink.focus();
    }
  }

  btn.addEventListener('click', toggleMenu);

  document.addEventListener('click', (e) => {
    if(!panel.contains(e.target) && e.target !== btn && panel.classList.contains('is-open')){
      panel.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && panel.classList.contains('is-open')){
      panel.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
      btn.focus();
    }
  });
});
