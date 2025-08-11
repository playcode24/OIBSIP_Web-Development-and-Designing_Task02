/* Basic interactivity: typewriter, mobile nav, modal, contact form fallback */
document.addEventListener('DOMContentLoaded', ()=>{

  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typewriter effect
  const words = ["UI/UX Developer", "Web Developer", "Java • HTML • CSS", "GenAI enthusiast"];
  const el = document.getElementById('type');
  let widx=0, ch=0, forward=true;
  function typeTick(){
    const word = words[widx];
    if(forward){
      ch++;
      el.textContent = word.slice(0,ch);
      if(ch === word.length){ forward=false; setTimeout(typeTick, 900); return; }
    }else{
      ch--;
      el.textContent = word.slice(0,ch);
      if(ch === 0){ forward=true; widx=(widx+1)%words.length; }
    }
    setTimeout(typeTick, 70);
  }
  typeTick();

  // Mobile nav
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  burger.addEventListener('click', ()=> navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex');

  // Project modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc  = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project-actions button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const data = JSON.parse(btn.getAttribute('data-project'));
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=> { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Contact form: fallback that opens mail client with prefilled text (safer than sending from client)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio inquiry';
    const message = document.getElementById('message').value.trim();

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // fallback: open mail client
    window.location.href = `mailto:pattnaikcsit24@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });

  // Resume button hint: if you upload resume.pdf to repo root and set link to '/resume.pdf' it will be downloadable
  const resumeBtn = document.getElementById('resumeBtn');
  resumeBtn.addEventListener('click', (e)=>{
    if(resumeBtn.getAttribute('href') === '#'){
      e.preventDefault();
      alert('To enable resume download: upload your resume as "resume.pdf" in the project folder and replace the Resume button href with "./resume.pdf". If you want, I can do this for you — upload the file.');
    }
  });

});
