import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { formSchema } from "../schema";

const initialFormState = {
	name: "",
	size: "",
	hasPepperoni: false,
	hasOnion: false,
	hasMushroom: false,
	hasBananaPeppers: false,
	specialText: "",
};

const initialErrorState = {
	name: "",
	size: "",
};

export const Order = () => {
	const [formValues, setFormValues] = useState(initialFormState);
	const [errors, setErrors] = useState(initialErrorState);

	useEffect(() => {}, [formValues]);

	const onChange = (e) => {
		if (e.target.type === "checkbox") {
			const currentValue = formValues[e.target.name];
			setFormValues({ ...formValues, [e.target.name]: !currentValue });
		} else {
			setFormValues({ ...formValues, [e.target.name]: e.target.value });
		}
		if (e.target.name === "name" || e.target.name === "size") {
			Yup.reach(formSchema, e.target.name)
				.validate(e.target.value)
				.then((valid) => {
					console.log(valid);
					setErrors({
						...errors,
						[e.target.name]: "",
					});
				})
				.catch((err) => {
					console.log(err.errors);
					setErrors({
						...errors,
						[e.target.name]: err.errors[0],
					});
				});
		}
	};

	const submitForm = (e) => {
		e.preventDefault();
		axios.post("https://reqres.in/api/orders", formValues).then((res) => {
			console.log(res);
		});
	};
	return (
		<>
			<h1>Order</h1>
			<form id="pizza-form">
				<input
					name="name"
					onChange={onChange}
					value={formValues.name}
					id="name-input"
				/>
				{errors.name && <p>{errors.name}</p>}
				<select
					name="size"
					onChange={onChange}
					id="size-dropdown"
					value={formValues.size}
				>
					<option value="" disabled={true}>
						Select A Size
					</option>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
				<div>
					<input
						onChange={onChange}
						type="checkbox"
						checked={formValues.hasPepperoni}
						value="Pepperoni"
						name="hasPepperoni"
					/>
					<label for="hasPepperoni">Pepperoni</label>
				</div>
				<div>
					<input
						onChange={onChange}
						type="checkbox"
						checked={formValues.hasBananaPeppers}
						value="Banana Pepper"
						name="hasBananaPeppers"
					/>
					<label for="hasBananaPeppers">Banana Peppers</label>
				</div>
				<div>
					<input
						onChange={onChange}
						type="checkbox"
						checked={formValues.hasMushroom}
						value="Mushroom"
						name="hasMushroom"
					/>
					<label for="hasMushroom">Mushroom</label>
				</div>
				<div>
					<input
						onChange={onChange}
						type="checkbox"
						checked={formValues.hasOnion}
						value="Onion"
						name="hasOnion"
					/>
					<label for="hasOnion">Onion</label>
				</div>

				<input
					onChange={onChange}
					value={formValues.specialText}
					id="special-text"
					name="specialText"
				/>
			</form>
			<button id="order-button" onClick={submitForm}>
				Submit
			</button>
		</>
	);
};
