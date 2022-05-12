<script>
  import { onMount } from 'svelte';
  import { FormGroup, Input } from 'sveltestrap';
  let theme = 'light';

  onMount(async () => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      theme = storedTheme;
    } else {
      localStorage.setItem('theme', theme);
    }
    toggleTheme(theme);
  })
  
  const toggleTheme = theme => {
    const r = document.querySelector(':root');
    const rs = getComputedStyle(r);
    if (theme === 'light') {
      r.style.setProperty('--background-color', '#ffffff');
      r.style.setProperty('--text-color', '#292b2c');
      r.style.setProperty('--hilight-color', '#0275d8');
      r.style.setProperty('--stroke-opacity', 1);
      r.style.setProperty('--bb-stroke', 'purple');
      r.style.setProperty('--bb-tracker', 'purple');
    } else {
      r.style.setProperty('--background-color', '#1F2227');
      r.style.setProperty('--text-color', '#c0c0c0');
      r.style.setProperty('--hilight-color', '#8db4d6');
      r.style.setProperty('--stroke-opacity', 0.2);
      r.style.setProperty('--bb-stroke', 'violet');
      r.style.setProperty('--bb-tracker', 'violet');
    }
    localStorage.setItem('theme', theme);
  }

  const handleChange = e => {
    e.preventDefault();
    theme = e.target.checked ? 'dark' : 'light';
    toggleTheme(theme);

  }
</script>


<FormGroup style={'float:right;'}>
  <Input on:change={handleChange} checked={theme === 'dark'} id="c1" type="switch" label="Dark Mode" />
</FormGroup>