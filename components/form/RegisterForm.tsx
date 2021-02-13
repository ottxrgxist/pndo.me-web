import { Stack, InputRightElement, Button, InputGroup, FormControl,
	Input, 
	Text} from '@chakra-ui/react'
import { useState, SyntheticEvent } from 'react'

interface Props {
	formAction: (event: SyntheticEvent<HTMLFormElement>) => any
};

export const RegisterForm: React.FunctionComponent<Props> = (props) => {

	const [show, setShow] = useState(false);
	const [error, setError] = useState(null);
	const handleClick = () => setShow(!show);
	

	const send = async (event: SyntheticEvent<HTMLFormElement>) => {
		const res = await props.formAction(event);
		console.log(res);
		
		if(res && res.status == 400){
			// setError(JSON.parse(res.data));
			setError(res.data);
		}
	};

	return (
		<form onSubmit={send}>
			<Stack>
				<FormControl isRequired>
					<Input size="md" placeholder="Email" variant="flushed"
						name="email"/>
				</FormControl>
				<FormControl isRequired>
					<Input size="md" placeholder="Username" variant="flushed"
						name="username"/>
				</FormControl>
				<FormControl isRequired>
					<InputGroup size="md">
						<Input pr="4.5rem" type={show ? "text" : "password"}
							placeholder="Password" variant="flushed"
							name="password"/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm"
								_focus={{ boxShadow: "none" }}
								onClick={handleClick}>
							{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Text color="red.400">
						{ error ? error : null}
					</Text>
				</FormControl>
				<Button type="submit" value="submit">
					Register
				</Button>
			</Stack>
		</form>
	)
}