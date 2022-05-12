<script>
	import { useForm, Hint, HintGroup, validators, required, minLength, email } from "svelte-use-form";
  import { signup } from '../stores/authStore.js';
  import { goto } from '$app/navigation';

  let emailAddress = '';
  let password = '';
	const passwordMatch = (value, form) => {
    if (value !== form.values.password) {
			return { passwordMatch: true };
	  }
  }

  const containNumbers = numbers => {
    return function(value) {
      if (value.replace(/[^0-9]/g,"").length < numbers) {
        return { containNumbers: numbers };
      }
    }
  }

	const form = useForm();

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await signup(emailAddress, password)
      goto('/')
    } catch (err) {
      console.log(`Failed to signup: ${err}`)
    }
  }
	
	const requiredMessage = "This field is required";
</script>
<main>
	<form use:form>
		<h1>
			Registration
		</h1>
		<label for="email">Email</label><br />
		<input type="email" name="email" use:validators={[required, email]} bind:value={emailAddress} />
		<HintGroup for="email">
			<Hint on="required">{requiredMessage}</Hint>
			<Hint on="email" hideWhenRequired>This must be a valid email</Hint>	
		</HintGroup><br />

		<label for="password">Password</label><br />
		<input type="password" name="password" use:validators={[required, minLength(5), containNumbers(2)]} bind:value={password} />
		<HintGroup for="password">
			<Hint on="required">{requiredMessage}</Hint>
			<Hint on="minLength" hideWhenRequired let:value>This field must have at least {value} characters.</Hint>	
			<Hint on="containNumbers" hideWhen="minLength" let:value>
				This field must contain at least {value} numbers.
			</Hint>	
		</HintGroup><br />

		<label for="passwordConfirmation">Password Confirmation</label><br />
		<input type="password" name="passwordConfirmation" use:validators={[required, passwordMatch]} />
		<HintGroup for="passwordConfirmation">
			<Hint on="required">{requiredMessage}</Hint>
			<Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>	
		</HintGroup><br /><br />

		<button disabled={!$form.valid} on:click|preventDefault={handleSubmit}>
			Submit
		</button>
		<div>
			Already have an account? <span><a href='login'>Login</a></span>
		</div>
	</form>
	<!-- <pre>
		{JSON.stringify($form, null, 1)}
	</pre> -->
</main>
	

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
	
	main {
		display: flex;
		justify-content: space-around;
	}
	
	pre {
		height: 80vh;
		overflow: auto;
		font-size: 12px;
	}
</style>