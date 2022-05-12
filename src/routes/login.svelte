<script>
	import { onMount, onDestroy } from 'svelte';
  import { signin, googleSignin } from '../stores/authStore.js';
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';
	
	let emailAddress = "";
	let emailAddressInput = null;
	
	let password = "";
	let passwordInput = null;
	
	onMount(() => {
		emailAddressInput.focus();
	});
	
	const handleOnSubmit = async (evt) => {
		try {
      await signin(emailAddress, password)
      goto('/')
    } catch (err) {
      console.log(`Failed to sign in: ${err}`)
    }
	};

  const handleGoogle = async (evt) => {
    try {
      await googleSignin()
      goto('/')
    } catch (err) {
      console.log(`Failed to sign in: ${err}`)
    }
  }
	
	const handleOnChange = (evt) => {
		// Cannot dynamically update the `type` attribute via a two-way binding to the `type` attribtue.
		// Error: 'type' attribute cannot be dynamic if input uses two-way binding.
		passwordInput.setAttribute('type', evt.target.checked ? 'text' : 'password' );
	}
</script>

<style>
	.form__group {
		margin-bottom: 0.875rem; 
	}
	
	.form__group__label {
		margin-bottom: 0.5rem;
	}
	
	.form__group__input {
		margin-bottom: 0;
	}
	
	.form__group--check {
		display: flex;
		align-items: center;
	}
	
	.form__group__checkbox {
		margin-bottom: 0;
	}
	
	.form__group--check > .form__group__label {
		margin-bottom: 0;
	}
	
	.form__group--check > .form__group__checkbox {
		margin-right: 0.5rem;
	}
</style>

<h1>
	Login
</h1>
<form class="form" on:submit|preventDefault={handleOnSubmit}>
	<div class="form__group">
		<label class="form__group__label" for="emailAddress">E-Mail Address</label>
		<input class="form__group__input" type="email" id="emailAddress" bind:this={emailAddressInput} bind:value={emailAddress} required />
	</div>
	<div class="form__group">
		<label class="form__group__label" for="password">Password</label>
		<input class="form__group__input" type="password" id="password" bind:this={passwordInput} bind:value={password} required />
	</div>
	<div class="form__group form__group--check">
		<input class="form__group__checkbox" type="checkbox" id="showPassword" on:change={handleOnChange} />
		<label class="form__group__label" for="showPassword">Show Password</label>
	</div>
	<button type="submit">Submit</button>
</form><br />

<button on:click={handleGoogle}>Google</button><br /><br />

<a href='/signup'>Sign up</a>