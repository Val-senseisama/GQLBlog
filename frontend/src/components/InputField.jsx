const InputField = ({ label, id, name, type = "text", onChange, value }) => {
	return (
		<div>
			<input
				className='mt-3 p-2'
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={label}
			/>
		</div>
	);
};

export default InputField;