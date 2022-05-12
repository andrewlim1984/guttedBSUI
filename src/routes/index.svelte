<script>
  import { authStore, signout } from '../stores/authStore.js';
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';
  import { onDestroy, onMount } from 'svelte';
  import { Row, Col, FormGroup, Input, Container } from 'sveltestrap';
  import ThemeSwitch from '../components/themeSwitch.svelte';

  let loggedIn, location;
  
  const unsubscribe = authStore.subscribe(async ({ firebaseControlled, isLoggedIn, user }) => {
    if (browser && firebaseControlled && !isLoggedIn) {
      goto(`http://app.${location}/login`)
    }

    if (firebaseControlled && isLoggedIn) {
      let token = await user.getIdToken(true);
      loggedIn = true;
    }
  })

  onMount(() => {
    console.log(window.location)
    let fullLocation = window.location.host.split('.');
    if (fullLocation[0] !== 'app') {
      if (fullLocation[0] === 'www') fullLocation.shift();
      location = fullLocation.join('.')
      goto(`http://app.${location}`)
    } else {
      fullLocation.shift();
      location = fullLocation.join('.')
    }
  })

  onDestroy(() => {
    unsubscribe();
  })
</script>

<Container fluid>
  <Row>
    <Col xs=6>
      {#if loggedIn}
        <div>LoggedIn</div>
        <button on:click={signout}>logout</button>
      {:else}
        <div>Please wait...</div>
      {/if}
    </Col>
    <Col xs=6 style={'align: right'}>
      <ThemeSwitch />
    </Col>
  </Row>
</Container>

